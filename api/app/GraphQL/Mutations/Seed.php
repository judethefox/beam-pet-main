<?php

namespace App\GraphQL\Mutations;

use App\Models;

class Seed
{
    public function __construct()
    {
        if (env('PLATFORM_ENV') === 'production') {
            return [];
        }
    }

    public function __invoke($root, array $args): array
    {
        $input = collect($args);

        if ($hasPeople = $input->get('hasPeople')) {
            $this->peopleByCount($hasPeople);
        }

        if ($people = $input->get('people')) {
            $this->people([$people]);
        }

        if ($person = $input->get('person')) {
            $this->people($person);
        }

        return Models\Person::all();
    }

    protected function people(array $peopleInput): void
    {
        foreach ($peopleInput as $args) {
            $personInput = collect($args);

            $factory = Models\Person::factory()
                ->state($personInput);

            $factory->create();
        }
    }

    protected function peopleByCount(int $count): void
    {
        Models\Person::factory()
            ->count($count)
            ->create();
    }
}
