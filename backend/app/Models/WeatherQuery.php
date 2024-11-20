<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WeatherQuery extends Model
{
    // Define os campos que são atribuíveis em massa
    protected $fillable = [
        'city', 
        'temperature', 
        'description', 
        'humidity', 
        'wind_speed', 
        'user_id'
    ];

    // Define o relacionamento com a model User (caso você tenha autenticação)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
