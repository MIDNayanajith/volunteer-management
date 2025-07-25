<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Protected admin routes
Route::middleware(['auth:api', 'user.type:1'])->group(function () {
    Route::post('/admin/register', [AdminController::class, 'register']);
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/admin/dashboard/stats', [AdminController::class, 'getDashboardStats']);
    Route::get('/admin/getVolunteers', [UserController::class, 'getVolunteers']);
    Route::get('/admin/getTasks', [TaskController::class, 'getTasks']);
    Route::post('/admin/createTask', [TaskController::class, 'createTask']);
    Route::put('/admin/updateTask/{id}', [TaskController::class, 'updateTask']);
    Route::delete('/admin/deleteTask/{id}', [TaskController::class, 'deleteTask']);
    Route::get('/admin/getEvents', [EventController::class, 'getEvents']);
    Route::post('/admin/createEvent', [EventController::class, 'createEvent']);
    Route::put('/admin/updateEvent/{id}', [EventController::class, 'updateEvent']);
    Route::delete('/admin/deleteEvent/{id}', [EventController::class, 'deleteEvent']);

    Route::get('/admin/volunteers-management', [AdminController::class, 'getVolunteersForManagement']);
    Route::get('/admin/feedbacks', [AdminController::class, 'getAllFeedbacks']);




});

// Protected volunteer routes
Route::middleware(['auth:api', 'user.type:3'])->group(function () {
    // Route::post('/register', [UserController::class, 'register']); // FIXED: This should be public
    Route::get('/volunteer/dashboard', [UserController::class, 'dashboard']);
    Route::get('/volunteer/getAssignedTasks', [TaskController::class, 'getAssignedTasks']);

 // Feedback routes for volunteers
    Route::post('/volunteer/feedback', [FeedbackController::class, 'createFeedback']);
    Route::get('/volunteer/feedback/task/{taskId}', [FeedbackController::class, 'getFeedbackByTask']);
    Route::put('/volunteer/feedback/{id}', [FeedbackController::class, 'updateFeedback']);
    Route::delete('/volunteer/feedback/{id}', [FeedbackController::class, 'deleteFeedback']);
    Route::get('/volunteer/feedbacks', [FeedbackController::class, 'getVolunteerFeedbacks']);
    Route::get('/volunteer/getUserEvents', [EventController::class, 'getUserEvents']);

    Route::get('/volunteer/profile', [UserController::class, 'getProfile']);
    Route::get('/volunteer/stats', [UserController::class, 'getVolunteerStats']);
});

// Common protected routes
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

// BETTER APPROACH - Move volunteer registration to public
Route::post('/register', [UserController::class, 'register']); // Public volunteer registration
