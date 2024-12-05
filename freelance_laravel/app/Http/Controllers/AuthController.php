<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['Neuspela registracija:', $validator->errors()]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken('TokenRegister')->plainTextToken;

        $odgovor = [
            'Poruka' => 'Uspesna registracija.',
            'User: ' => $user,
            'Token: ' => $token,
        ];

        return response()->json($odgovor);
    }

    //login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['Greska:', $validator->errors()]);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['Greska: ' => 'Neuspesan login.']);
        }

        $user = User::where('email', $request['email'])->firstOrFail();


        $token = $user->createToken('TokenLogin')->plainTextToken;

        $odgovor = [
            'Poruka' => 'Uspesno ste se ulogovali.',
            'User: ' => $user,
            'Vas token za rad: ' => $token,
        ];


        return response()->json($odgovor);
    }

    //logout
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json('Uspesno ste se odjavili.');
    }

    public function resetPassword(Request $request)
    {   
        $request->validate([
            'email' => 'required',
            'new_password' => 'required|string|min:8'
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            $user->password = Hash::make($request->new_password);
            $user->save();

            return response()->json(['poruka' => 'Uspesno resetovana lozinka.']);
        }

        return response()->json(['poruka' => 'Nije pronadjen korisnik sa tim emailom.'], 404);
    }
}
