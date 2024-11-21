<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\WeatherQuery;

class WeatherController extends Controller
{
    public function index()
    {
        $dados = WeatherQuery::all();
        return response()->json($dados);
    }

    public function getWeatherApi(Request $request)
    {
        $request->validate([
            'city' => 'required|string'
        ]);

        $city = $request->input('city');

        try {
            // Realiza a consulta na API do OpenWeatherMap
            $response = Http::get('https://api.openweathermap.org/data/2.5/weather', [
                'q' => $city . ',BR',
                'appid' => env('OPENWEATHER_API_KEY'),
                'units' => 'metric',
                'lang' => 'pt',
            ]);

            // Se não encontrar cidade no Brasil, tenta sem especificar o país
            if (!$response->successful()) {
                $response = Http::get('https://api.openweathermap.org/data/2.5/weather', [
                    'q' => $city,
                    'appid' => env('OPENWEATHER_API_KEY'),
                    'units' => 'metric',
                    'lang' => 'pt',
                ]);
            }

            // Verifica se a resposta foi bem-sucedida
            if ($response->successful()) {
                $data = $response->json();

                // Cria o campo de localização (cidade, estado e país juntos)
                $location = $data['name'];
                if (isset($data['sys']['state'])) {
                    $location .= ', ' . $data['sys']['state'];
                }
                $location .= ', ' . $data['sys']['country'];

                // Armazena a consulta no banco de dados
                WeatherQuery::create([
                    'city' => $city,
                    'temperature' => $data['main']['temp'],
                    'description' => $data['weather'][0]['description'],
                    'humidity' => $data['main']['humidity'],
                    'wind_speed' => $data['wind']['speed'],
                    'user_id' => $request->user()->id,
                ]);

                // Retorna os dados de clima em formato JSON, incluindo cidade, estado e país juntos
                return response()->json([
                    'location' => $location,  // Cidade, estado e país combinados
                    'temperature' => $data['main']['temp'],
                    'weather' => $data['weather'][0],
                    'clouds' => $data['clouds']['all'],
                    'humidity' => $data['main']['humidity'],
                    'wind_speed' => $data['wind']['speed'],
                ]);
            } else {
                return response()->json(['error' => 'Cidade não encontrada'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao consultar a API de clima: ' . $e->getMessage()], 500);
        }
    }
}
