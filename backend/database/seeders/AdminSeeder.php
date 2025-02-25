<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::create([
            'first_name' => 'ines',
            'last_name' => 'mlayeh',
            'username' => 'ines',
            'email' => 'ines@isgevent.com',
            'password' => Hash::make('Password123!'),
            'is_staff' => 1,
            'is_admin' => 1,
        ]);
    }
}
