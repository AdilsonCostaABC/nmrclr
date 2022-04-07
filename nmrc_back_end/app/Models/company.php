<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\town;

class company extends Model
{
    use HasFactory;
    protected $fillable=[
        'appl_ref_no',
        'tin',
        'comp_name',
        'postal_address',
        'physical_address',
        'town_id',
        'contact_person',
        'tel_no',
        'mobile_no',
        'email',
        'reg_date',
        // 'num_apply',
        'updated_by',
        'updated_datetime',
        'comp_reg_no',       
    ];
    
    protected $with=['town'];
    public function town(){
        return $this->belongsTo(town::class,'town_id','id');
    }
}
