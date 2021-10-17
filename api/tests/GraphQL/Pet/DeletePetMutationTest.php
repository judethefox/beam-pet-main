<?php

namespace Tests\GraphQL\Pet;

use App\Models;
use Tests\GraphQL\GraphQLTestCase;
use Tests\GraphQL\TestResponse;

class DeletePetMutationTest extends GraphQLTestCase
{
    public function mutation(array $variables): TestResponse
    {
        return $this->graphQL('
            mutation DeletePet($id: ID!) {
                deletePet(id: $id) {
                  id
                }
            }
        ', $variables);
    }

    /** @test */
    public function it_returns_expected_fields(): void
    {
        $person = Models\Person::factory()
            ->create();

        $pet = Models\Pet::factory()->make();
        $pet->person_id = $person->id;

        $pet->save();

        $petId = $pet->id;

        $response = $this->mutation([
            'id' => $petId,
        ]);

        $response->assertJson([
            'data' => [
                'deletePet' => [
                    'id' => $petId
                ]
            ]
        ]);
    }
}
