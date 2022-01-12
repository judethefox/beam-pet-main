<?php

namespace Tests\GraphQL\Person;

use App\Models;
use Tests\GraphQL\GraphQLTestCase;
use Tests\GraphQL\TestResponse;

class PersonQueryTest extends GraphQLTestCase
{
    public function query(array $variables): TestResponse
    {
        return $this->graphQL('
            query GetPerson($id: ID!) {
                person(id: $id) {
                    id
                    name
                    description
                    pets {
                        id
                        name
                        age
                        species
                    }
                }
            }
        ', $variables);
    }

    /** @test */
    public function it_returns_expected_fields()
    {
        $person = Models\Person::factory()
            ->create();

        $pets = Models\Pet::factory()->count(2)->make();
        $pets->each(function($pet) use($person) {
            $pet->person_id = $person->id;
            $pet->save();
        });

        $response = $this->query([
            'id' => $person->id,
        ]);

        $response->assertJson([
            'data' => [
                'person' => [
                    'id' => (string) $person->id,
                    'name' => (string) $person->name,
                    'description' => (string) $person->description,
                    'pets' => $person->pets->map(static function($pet) {
                        return [
                            'id' => $pet->id,
                            'name'=> $pet->name,
                            'age'=> $pet->age,
                            'species'=> $pet->species,
                        ];
                    })->toArray(),
                ],
            ],
        ]);
    }
}
