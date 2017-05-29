<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends ApiController
{
    public function index(Request $request)
    {
        $user = Auth::user();
        if(!$user) {
            return response('', 401);
        } else {
            return response()->json($user);
        }
    }

    public function store(Request $request)
    {
        $result = Auth::attempt([
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ]);

        if(false === $result){
            return response()->json(['error' => 'NOT_FOUND'], 404);
        }

        return response()->json(Auth::user());
    }

    public function destroy()
    {
        Auth::logout();
        return response('', 204);
    }
}
