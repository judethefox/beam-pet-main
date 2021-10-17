<?php

namespace Tests\GraphQL\Person;

use Tests\GraphQL\GraphQLTestCase;
use Tests\GraphQL\TestResponse;

class CreatePersonMutationTest extends GraphQLTestCase
{
    public function mutation(array $variables): TestResponse
    {
        return $this->graphQL('
            mutation CreatePerson($input: PersonInput!) {
                createPerson(input: $input) {
                  name
                  description
                }
            }
        ', $variables);
    }

    /** @test */
    public function it_returns_expected_fields(): void
    {
        $person = [
            'name' => 'Julie Christmas',
            'description' => 'Monkey business',
        ];

        $response = $this->mutation([
            'input' => $person,
        ]);

        $response->assertJson([
            'data' => [
                'createPerson' => $person
            ]
        ]);
    }
}
