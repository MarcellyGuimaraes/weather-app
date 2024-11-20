<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WeatherQuery;

class WeatherController extends Controller
{
    public function index()
    {
        // Obtém todos os dados do banco de dados
        $dados = WeatherQuery::all(); // Substitua 'Model' pelo nome do seu modelo
        return response()->json($dados);
    }
}
