<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Feedback;
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

    public function getVolunteersForManagement()
{
    $volunteers = User::where('user_type', 3)
        ->where('is_delete', 0)
        ->withCount([
            'assignedTasks as tasks_assigned' => function ($query) {
                $query->where('is_delete', 0);
            },
            'assignedTasks as tasks_completed' => function ($query) {
                $query->where('is_delete', 0)
                    ->where('status', 'complete');
            }
        ])
        ->withAvg('feedbacks as average_rating', 'rating')
        ->get();

    $formattedVolunteers = $volunteers->map(function ($volunteer) {
        return [
            'id' => $volunteer->id,
            'name' => $volunteer->name,
            'email' => $volunteer->email,
            'tasks_assigned' => $volunteer->tasks_assigned,
            'tasks_completed' => $volunteer->tasks_completed,
            'rating' => $volunteer->average_rating ? round($volunteer->average_rating, 1) : 0,
        ];
    });

    return response()->json([
        'status' => 200,
        'volunteers' => $formattedVolunteers
    ], 200);
}

    public function getAllFeedbacks()
{
    $feedbacks = Feedback::with(['task', 'volunteer'])
        ->where('is_delete', 0)
        ->orderBy('created_at', 'desc')
        ->get();

    $formattedFeedbacks = $feedbacks->map(function ($feedback) {
        return [
            'id' => $feedback->id,
            'task_title' => $feedback->task ? $feedback->task->title : 'Task Deleted',
            'volunteer_name' => $feedback->volunteer ? $feedback->volunteer->name : 'Volunteer Deleted',
            'rating' => $feedback->rating,
            'comment' => $feedback->comment,
            'created_at' => $feedback->created_at->toDateTimeString(),
        ];
    });

    return response()->json([
        'status' => 200,
        'feedbacks' => $formattedFeedbacks
    ], 200);
}
}
