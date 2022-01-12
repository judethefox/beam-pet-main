<?php

namespace Database\Seeders;

use App\Models;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Models\Person::factory()
            ->count(4)
            ->create()
            ->each(function ($person) {
                $numberOfPets = random_int(0, 5);
                $pets = Models\Pet::factory()->count($numberOfPets)->make();
                $pets->each(function($pet) use($person) {
                    $pet->person_id = $person->id;
                    $pet->save();
                });
            })
        ;
    }
}
