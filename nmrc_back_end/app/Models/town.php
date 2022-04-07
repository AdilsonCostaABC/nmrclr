<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\region;

class town extends Model
{
    use HasFactory;
    protected $table='towns';
    protected $fillable=[
        'name',
        'region_id',
        'updated_by',        
    ];

    protected $with=['region'];
    public function region(){
        return $this->belongsTo(region::class,'region_id','id');
    }
}
