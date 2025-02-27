<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthAdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/admin/login', [AuthAdminController::class, 'login']);
Route::post('/admin/login/refresh', [AuthAdminController::class, 'refresh']);
Route::get('/admin/details', [AuthAdminController::class, 'detailsAdmin'])->middleware('jwt.custom');

