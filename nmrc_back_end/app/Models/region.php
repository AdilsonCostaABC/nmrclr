<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\country;


class region extends Model
{
    use HasFactory;
    protected $table='regions';
    protected $fillable=[
        'name',
        'country_id',
        'updated_by',        
    ];


    protected $with=['country'];
    public function country(){
        return $this->belongsTo(country::class,'country_id','id');
    }
}
