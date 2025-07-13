<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'email'=> 'required|email',
            'password'=> 'required|max:12|min:8',
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user) {
            return response()->json(['error'=>'Invalid Email'], 401);
        }

        if(!Hash::check($request->password, $user->password)) {
            return response()->json(['error'=>'Incorrect Password!'], 401);
        }

        // FIXED: Check if user is deleted
        if($user->is_delete == 1) {
            return response()->json(['error'=>'Account is disabled'], 401);
        }

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message'=>'Login Successfully!',
            'user'=>$user->makeHidden(['password']),
            'token'=>$token
        ], 200); // FIXED: Changed from 201 to 200 for login
    }

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
            'dashboard_message'=>'Welcome to your dashboard'
        ]);
    }

    public function logout(Request $request)
    {
        try {
            $token = JWTAuth::getToken();
            if (!$token) {
                return response()->json(['error' => 'Token not provided!'], 401);
            }
            JWTAuth::invalidate($token);
            return response()->json(['message' => 'Logout Successfully!']);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Failed to Logout'], 401);
        }
    }
}
