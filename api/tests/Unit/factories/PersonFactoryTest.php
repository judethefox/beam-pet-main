<?php

namespace Tests\Unit\factories;

use App\Models\Person;
use Tests\TestCase;

class PersonFactoryTest extends TestCase
{
    public function testPersonFactory(): void
    {
        $person = Person::factory()->make();

        $fakePersonArray = $person->toArray();

        $this->assertEquals(['name', 'description'], array_keys($fakePersonArray));
        $this->assertNotEmpty($person->name);
        $this->assertNotEmpty($person->description);
        $this->assertEmpty($person->pets);
    }
}
