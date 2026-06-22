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

Route::get('/debug-db', function () {
    return response()->json([
        'default_connection' => config('database.default'),
        'env_db_connection'  => env('DB_CONNECTION'),
        'pgsql_database'     => config('database.connections.pgsql.database'),
        'pgsql_host'         => config('database.connections.pgsql.host'),
    ]);
});