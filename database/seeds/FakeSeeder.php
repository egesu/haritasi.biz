<?php

use Illuminate\Database\Seeder;

class FakeSeeder extends Seeder
{
    public function run()
    {
        factory(App\Model\Category::class, 5)->create();
        factory(App\Model\Point::class, 5000)->create();
    }
}
