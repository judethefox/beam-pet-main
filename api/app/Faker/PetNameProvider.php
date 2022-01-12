<?php

namespace App\Faker;

use Faker\Provider\Base;

class PetNameProvider extends Base
{
    protected static $petNames = [
        'Jester',
        'Fuzzy',
        'Rupert',
        'Herb',
        'Snuggle',
        'Cadbury',
        'Charm',
        'Vango',
        'Watson',
        'Jazz',
        'Flash',
        'Mustang',
        'Snoop',
        'Special',
        'Acorn',
        'Lennox',
        'Patsy',
        'Percy',
        'Milkshake',
        'Ezra'
    ];
    public function petName(): string
    {
        return static::randomElement(static::$petNames);
    }
}
