<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CheckUserType
{
    public function handle(Request $request, Closure $next, ...$types)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token Invalid'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token Expired'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token not provided'], 401);
        }

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        // FIXED: Check if user is deleted
        if($user->is_delete == 1) {
            return response()->json(['error' => 'Account is disabled'], 401);
        }

        // FIXED: Convert types to integers for comparison
        $allowedTypes = array_map('intval', $types);

        if (!in_array($user->user_type, $allowedTypes)) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        return $next($request);
    }
}
