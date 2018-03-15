<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Model\Category::class, function(Faker\Generator $faker) {
    return [
        'name' => $faker->words(3, true),
        'description' => $faker->sentence,
        'color_code' => $faker->hexcolor,
        'icon' => function() {
            $availableIcons = [
                'cutlery',
                'home',
                'tint',
                'inbox',
                'leaf',
                'star',
            ];
            return $availableIcons[array_rand($availableIcons)];
        }
    ];
});

$factory->define(App\Model\Point::class, function(Faker\Generator $faker) {
    return [
        'title' => $faker->sentence,
        'description' => $faker->text(5000),
        'category_id' => function() {
            return App\Model\Category::inRandomOrder()->first()->id;
        },
        'added_by_id' => 1,
        // 'latitude' => $faker->randomFloat(8, 36, 42),
        // 'longitude' => $faker->randomFloat(8, 26, 45),
        'latitude' => $faker->randomFloat(8, -85, 85),
        'longitude' => $faker->randomFloat(8, -180, 180),
    ];
});
