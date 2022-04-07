<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\region;

class points_of_entry_exit extends Model
{
    use HasFactory;
    protected $table='points_of_entry_exits';
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
