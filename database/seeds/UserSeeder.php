<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        if(!\App\Model\User::where('email', 'admin@admin.com')->first()) {
            $user = new \App\Model\User();
            $user->name = 'Admin';
            $user->email = 'admin@admin.com';
            $user->password = \Hash::make('123456');
            $user->save();
        }
    }
}
