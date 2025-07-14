<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tasks')->insert([
            [
                'title' => 'Prepare Saplings',
                'status' => 'new',
                'priority' => 'high',
                'due_date' => '2025-08-01',
                'event_id' => 1,
                'created_by' => 1,
                'assigned_to' => 2,
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Distribute Gloves',
                'status' => 'processing',
                'priority' => 'medium',
                'due_date' => '2025-08-05',
                'event_id' => 2,
                'created_by' => 1,
                'assigned_to' => 3,
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Set Up Tents',
                'status' => 'complete',
                'priority' => 'low',
                'due_date' => '2025-08-10',
                'event_id' => 3,
                'created_by' => 1,
                'assigned_to' => 4,
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Design Posters',
                'status' => 'new',
                'priority' => 'medium',
                'due_date' => '2025-08-15',
                'event_id' => 4,
                'created_by' => 1,
                'assigned_to' => 5,
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Supply Water Bottles',
                'status' => 'new',
                'priority' => 'high',
                'due_date' => '2025-08-20',
                'event_id' => 5,
                'created_by' => 1,
                'assigned_to' => 2,
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
