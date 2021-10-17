<?php

namespace App\Providers;

use App\Faker\AnimalSpeciesProvider;
use App\Faker\PetNameProvider;
use Faker\Factory;
use Faker\Generator;
use Illuminate\Support\ServiceProvider;

class FakerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register(): void
    {
        $this->app->singleton(Generator::class, function () {
            $faker = Factory::create();
            $faker->addProvider(new AnimalSpeciesProvider($faker));
            $faker->addProvider(new PetNameProvider($faker));
            return $faker;
        });
    }
}
