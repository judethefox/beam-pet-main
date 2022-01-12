<?php

namespace Tests\GraphQL\Pet;

use App\Models;
use Tests\GraphQL\GraphQLTestCase;
use Tests\GraphQL\TestResponse;

class CreatePetMutationTest extends GraphQLTestCase
{
    public function mutation(array $variables): TestResponse
    {
        return $this->graphQL('
            mutation CreatePet($input: PetInput!) {
                createPet(input: $input) {
                  name
                  age
                  species
                  person_id
                }
            }
        ', $variables);
    }

    /** @test */
    public function it_returns_expected_fields(): void
    {
        $person = Models\Person::factory()
            ->create();

        $pet = [
            'name' => 'Lake King',
            'age' => 30,
            'species' => 'snail',
            'person_id' => $person->id,
        ];

        $response = $this->mutation([
            'input' => $pet,
        ]);

        $response->assertJson([
            'data' => [
                'createPet' => $pet
            ]
        ]);
    }
}
