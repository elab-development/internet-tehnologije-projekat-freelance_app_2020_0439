<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'=>"Administrator aplikacije",
            'email'=>"admin@gmail.com",
            'password' =>  Hash::make("admin123"),
            'isAdmin' => true,
            'remember_token' => Str::random(10),
        ]);

        User::factory()->times(5)->create();
    }
}
