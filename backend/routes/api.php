<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MedecinController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/ping', fn () => response()->json(['status' => 'ok']));

Route::get('/medecins', [MedecinController::class, 'index']);
Route::post('/medecins', [MedecinController::class, 'store']);
Route::put('/medecins/{id}', [MedecinController::class, 'update']);
Route::delete('/medecins/{id}', [MedecinController::class, 'destroy']);
