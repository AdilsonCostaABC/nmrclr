<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\town;

class supplier extends Model
{
    use HasFactory;
    protected $table='suppliers';
    protected $fillable=[
        'company_name',
        'physical_address',
        'town_id',
        'contact_person',
        'tel_no',
        'mobile_no',
        'email',
        'status',
        'reg_date',
        'updated_by'       
    ];
   
    

    protected $with=['town'];
    public function town(){
        return $this->belongsTo(town::class,'town_id','id');
    }
}
