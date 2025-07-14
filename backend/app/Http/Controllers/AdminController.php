<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Task;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name'=> 'required|string|max:255',
            'email'=> 'required|email|unique:users,email',
            'password'=> 'required|string|max:12|min:8',
        ]);

        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()], 422); // FIXED: Added missing comma
        }

        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=> Hash::make($request->password),
            'user_type'=>1,
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message'=>'Admin Registered',
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
            'dashboard_message'=>'Welcome to admin dashboard'
        ]);
    }
       public function getDashboardStats()
    {
        $totalVolunteers = User::where('user_type', 3)
                               ->where('is_delete', 0)
                               ->count();

        $totalEvents = Event::where('is_delete', 0)->count();

        $totalTasks = Task::where('is_delete', 0)->count();

        $completedTasks = Task::where('status', 'complete')
                              ->where('is_delete', 0)
                              ->count();

        return response()->json([
            'status' => 200,
            'stats' => [
                'totalVolunteers' => $totalVolunteers,
                'totalEvents' => $totalEvents,
                'totalTasks' => $totalTasks,
                'completedTasks' => $completedTasks,
            ]
        ], 200);
    }

}
