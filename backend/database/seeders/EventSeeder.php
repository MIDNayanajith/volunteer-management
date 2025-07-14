<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('events')->insert([
            [
                'name' => 'Tree Planting Campaign',
                'date' => '2025-08-01',
                'location' => 'Galle',
                'description' => 'Planting trees to promote reforestation.',
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Beach Cleanup Drive',
                'date' => '2025-08-05',
                'location' => 'Matara Beach',
                'description' => 'Removing plastic waste from the beach.',
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Blood Donation Camp',
                'date' => '2025-08-10',
                'location' => 'Colombo',
                'description' => 'Organized in collaboration with local hospitals.',
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Community Awareness Program',
                'date' => '2025-08-15',
                'location' => 'Kandy',
                'description' => 'Promoting hygiene and health awareness.',
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'River Cleaning Event',
                'date' => '2025-08-20',
                'location' => 'Mahaweli River',
                'description' => 'Clean up operation along the river banks.',
                'is_delete' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
