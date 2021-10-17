<?php

namespace Tests\GraphQL\Person;

use App\Models;
use Tests\GraphQL\GraphQLTestCase;
use Tests\GraphQL\TestResponse;

class PeopleQueryTest extends GraphQLTestCase
{
    public function query(): TestResponse
    {
        return $this->graphQL('
            query GetPeople {
                people {
                    id
                    name
                    description
                }
            }
        ');
    }

    /** @test */
    public function it_returns_expected_fields()
    {
        $people = Models\Person::factory()
            ->count(2)
            ->create();

        $response = $this->query();

        $expecting = [
            'data' => [
                'people' => [],
            ],
        ];

        foreach ($people as $person) {
            $expecting['data']['people'][] = [
                'id' => (string) $person->id,
                'name' => (string) $person->name,
                'description' => (string) $person->description,
            ];
        }

        $response->assertJson($expecting);
    }
}
