<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('password123'),
                'user_type' => 1,
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Volunteer 1',
                'email' => 'vol1@example.com',
                'password' => Hash::make('password123'),
                'user_type' => 3,
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Volunteer 2',
                'email' => 'vol2@example.com',
                'password' => Hash::make('password123'),
                'user_type' => 3,
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Volunteer 3',
                'email' => 'vol3@example.com',
                'password' => Hash::make('password123'),
                'user_type' => 3,
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Volunteer 4',
                'email' => 'vol4@example.com',
                'password' => Hash::make('password123'),
                'user_type' => 3,
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
