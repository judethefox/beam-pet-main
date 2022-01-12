<?php

namespace App\Faker;

use Faker\Provider\Base;

class AnimalSpeciesProvider extends Base
{
    protected static $animalSpecies = [
        'shrimp',
        'cat',
        'dog',
        'fish',
        'turtle',
        'snake',
        'tarantula',
        'lizard',
        'bird',
        'horse',
        'guinea pig',
        'sheep',
        'rabbit',
        'ferret',
    ];
    public function animalSpecies(): string
    {
        return static::randomElement(static::$animalSpecies);
    }
}
