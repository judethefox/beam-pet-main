<?php

namespace Database\Factories;

use App\Models\Pet;
use Illuminate\Database\Eloquent\Factories\Factory;

class PetFactory extends Factory
{
    /**
     * @var string
     */
    protected $model = Pet::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->petName(),
            'age' => $this->faker->numberBetween(0, 100),
            'species' => $this->faker->animalSpecies(),
        ];
    }
}
