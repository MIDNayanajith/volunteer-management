<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\Task;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    // Register function - FIXED: Added missing status code
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name'=> 'required|string|max:255',
            'email'=> 'required|email|unique:users,email',
            'password'=> 'required|string|max:12|min:8',
        ]);

        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()], 422);
        }

        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=> Hash::make($request->password),
            'user_type'=>3,
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message'=>'User Registered',
            'user'=>$user,
            'token'=>$token
        ], 201);
    }

    // FIXED: Added dashboard method that was missing
    public function dashboard(Request $request)
    {
        try{
            $user = JWTAuth::parseToken()->authenticate();
        }
        catch(\Tymon\JWTAuth\Exceptions\TokenInvalidException $e){
            return response()->json(['error'=>'Token Invalid'], 401);
        }
        catch(\Tymon\JWTAuth\Exceptions\TokenExpiredException $e){
            return response()->json(['error'=>'Token Expired'], 401);
        }

        return response()->json([
            'login_message'=>'Login successfully',
            'user'=>$user,
            'dashboard_message'=>'Welcome to volunteer dashboard'
        ]);
    }
    public function getVolunteers()
{
    $volunteers = User::where('user_type', 3)
                      ->where('is_delete', 0)
                      ->get();

    if ($volunteers->count() > 0) {
        return response()->json([
            'status' => 200,
            'data' => $volunteers
        ], 200);
    }

    return response()->json([
        'status' => 404,
        'message' => 'No volunteers found'
    ], 404);
}
    public function getProfile()
{
    try {
        $user = JWTAuth::parseToken()->authenticate();
    } catch (\Exception $e) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Add any additional profile data you might have
    $profileData = [
        'name' => $user->name,
        'email' => $user->email,
        'created_at' => $user->created_at,
        // Add other fields if available
    ];

    return response()->json([
        'status' => 200,
        'profile' => $profileData
    ], 200);
}

    public function getVolunteerStats()
{
    $userId = auth()->user()->id;

    $totalTasks = Task::where('assigned_to', $userId)
                      ->where('is_delete', 0)
                      ->count();

    $completedTasks = Task::where('assigned_to', $userId)
                          ->where('status', 'complete')
                          ->where('is_delete', 0)
                          ->count();

    $pendingTasks = Task::where('assigned_to', $userId)
                        ->whereIn('status', ['new', 'processing'])
                        ->where('is_delete', 0)
                        ->count();

    $averageRating = Feedback::where('volunteer_id', $userId)
                             ->where('is_delete', 0)
                             ->avg('rating');

    return response()->json([
        'status' => 200,
        'stats' => [
            'totalTasks' => $totalTasks,
            'completedTasks' => $completedTasks,
            'pendingTasks' => $pendingTasks,
            'averageRating' => $averageRating ? round($averageRating, 1) : 0
        ]
    ], 200);
}
}
