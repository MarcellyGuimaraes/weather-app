<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('weather_queries', function (Blueprint $table) {
            $table->id('weather_query_id');
            $table->string('city'); 
            $table->float('temperature'); 
            $table->string('description'); 
            $table->float('humidity'); 
            $table->float('wind_speed'); 
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weather_queries');
    }
};
