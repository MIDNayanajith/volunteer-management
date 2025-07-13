<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Protected admin routes
Route::middleware(['auth:api', 'user.type:1'])->group(function () {
    Route::post('/admin/register', [AdminController::class, 'register']);
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
});

// Protected volunteer routes
Route::middleware(['auth:api', 'user.type:3'])->group(function () {
    Route::post('/register', [UserController::class, 'register']); // FIXED: This should be public
    Route::get('/volunteer/dashboard', [UserController::class, 'dashboard']);
});

// Common protected routes
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

// BETTER APPROACH - Move volunteer registration to public
Route::post('/register', [UserController::class, 'register']); // Public volunteer registration
