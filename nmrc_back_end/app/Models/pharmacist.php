<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pharmacist extends Model
{
    use HasFactory;
    protected $table='pharmacists';
    protected $fillable=[
        'first_name',
        'last_name',
        'tel_no',
        'mobile_no',
        'email',
        'updated_by'       
    ];
}
