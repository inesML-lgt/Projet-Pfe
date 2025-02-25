<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class AuthAdminController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $accessToken = JWTAuth::claims([
            'exp' => Carbon::now()->addMinutes(5)->timestamp,
        ])->fromUser(Auth::user());

        $refreshToken = JWTAuth::claims([
            'exp' => Carbon::now()->addDays(7)->timestamp, 
        ])->fromUser(Auth::user());

        return response()->json([
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
        ]);
    }

    public function refresh(Request $request)
    {
        try {
            $refreshToken = JWTAuth::parseToken()->refresh();

            $newAccessToken = JWTAuth::claims([
                'exp' => Carbon::now()->addMinutes(5)->timestamp,
            ])->fromUser(Auth::user());

            $newRefreshToken = JWTAuth::claims([
                'exp' => Carbon::now()->addDays(7)->timestamp,
            ])->fromUser(Auth::user());

            return response()->json([
                'access_token' => $newAccessToken,
                'refresh_token' => $newRefreshToken,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid refresh token'], 401);
        }
    }
    public function detailsAdmin(Request $request)
    {
        $admin_details = Admin::all();
        return response()->json($admin_details);
    }
}