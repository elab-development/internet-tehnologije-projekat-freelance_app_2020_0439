<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceCategoryController;

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

Route::resource('service-categories', ServiceCategoryController::class);


//vraca sve services koje su datog naziva kategorije
Route::get('services/category', [ServiceController::class, 'getServicesByCategoryName']); 

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('resetPassword',[AuthController::class,'resetPassword']);

//export u csv
Route::get('/exportCSV', [ServiceController::class, 'exportToCSV']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    //samo admin
    Route::post('services', [ServiceController::class, 'store']);
    Route::put('services/{id}', [ServiceController::class, 'update']); 
    Route::patch('services/{id}', [ServiceController::class, 'updateDuzinaIzrade']); 
    Route::delete('services/{id}', [ServiceController::class, 'destroy']);  

    //admin i autentifikovan korisnik
    Route::post('/offers', [OfferController::class, 'store']);
    Route::put('/offers/{id}', [OfferController::class, 'update']);
    Route::delete('/offers/{id}', [OfferController::class, 'destroy']);

    Route::post('logout', [AuthController::class, 'logout']);

});
