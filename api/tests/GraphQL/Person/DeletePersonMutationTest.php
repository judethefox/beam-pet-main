<?php

namespace Tests\GraphQL\Person;

use App\Models;
use Tests\GraphQL\GraphQLTestCase;
use Tests\GraphQL\TestResponse;

class DeletePersonMutationTest extends GraphQLTestCase
{
    public function mutation(array $variables): TestResponse
    {
        return $this->graphQL('
            mutation DeletePerson($id: ID!) {
                deletePerson(id: $id) {
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

        $personId = $person->id;

        $response = $this->mutation([
            'id' => $person->id,
        ]);

        $response->assertJson([
            'data' => [
                'deletePerson' => [
                    'id' => $personId
                ]
            ]
        ]);
    }
}
