<?php

namespace Database\Seeders;

use App\Models\Offer;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfferSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            $takenByUserId = User::inRandomOrder()->first()->id;
            $soldByUserId = User::where('id', '!=', $takenByUserId)->inRandomOrder()->first()->id;

            Offer::factory()->create([
                'service_id' => $i + 1,
                'taken_by_user_id' => $takenByUserId,
                'sold_by_user_id' => $soldByUserId,
                
            ]);
        }
    }
}
