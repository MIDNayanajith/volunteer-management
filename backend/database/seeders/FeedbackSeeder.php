<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FeedbackSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('feedback')->insert([
            [
                'task_id' => 1,
                'volunteer_id' => 2,
                'rating' => 5,
                'comment' => 'Well organized task and great team!',
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'task_id' => 2,
                'volunteer_id' => 3,
                'rating' => 4,
                'comment' => 'Good experience overall.',
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'task_id' => 3,
                'volunteer_id' => 4,
                'rating' => 5,
                'comment' => 'Loved participating in this event!',
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'task_id' => 4,
                'volunteer_id' => 5,
                'rating' => 3,
                'comment' => 'Could have been managed better.',
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'task_id' => 5,
                'volunteer_id' => 2,
                'rating' => 4,
                'comment' => 'It was a fun and fulfilling experience.',
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
