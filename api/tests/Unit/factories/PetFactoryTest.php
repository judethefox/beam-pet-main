<?php

namespace Tests\Unit\factories;

use App\Models\Pet;
use Tests\TestCase;

class PetFactoryTest extends TestCase
{
    public function testPetFactory(): void
    {
        $pet = Pet::factory()->make();

        $fakePetArray = $pet->toArray();

        $this->assertEquals(['name', 'age', 'species'], array_keys($fakePetArray));
        $this->assertNotEmpty($pet->name);
        $this->assertNotEmpty($pet->species);
        $this->assertIsInt($pet->age);
        $this->assertTrue($pet->age <= 100 && $pet->age >= 0);
    }
}
