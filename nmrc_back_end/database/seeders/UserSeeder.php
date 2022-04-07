<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'name' => 'Adilson Da Costa',
            'email' => 'adilson2022@abc.com',
            'phone_number'=>'0816435424',
            'role_as'=>1,
            'password' => Hash::make('123456789')
        ]);
    }
}
