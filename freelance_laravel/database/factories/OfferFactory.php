<?php

namespace Database\Factories;

use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'datumZakljucenja' => $this->faker->date(),
            'cenaPonude' => $this->faker->numberBetween($min = 100, $max = 1000),
            'statusNaplate' => $this->faker->randomElement($array= 
                array('Placeno','Nije placeno','U toku obrade')),
            'service_id' => Service::factory(),
            'taken_by_user_id' => User::factory(),
            'sold_by_user_id' => User::factory(),
            
        ];
    }
}
