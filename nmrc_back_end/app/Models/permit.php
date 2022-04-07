<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\company;
use App\Models\supplier;
use App\Models\pharmacist;
use App\Models\points_of_entry_exit;

class permit extends Model
{
    use HasFactory;
    protected $table='permits';
    protected $fillable=[
        'check_digit',
        'permit_no',
        'permit_date',
        'comp_id',
        'sup_id',
        'pharma_id',
        'valid_from',
        'valid_to',
        'poe_id',
        'purpose_use',
        //automatic data
        'permit_status',
        'updated_datetime',
        'updated_by',
        'orig_user',
        //updateable data
        'veri_reject_reason',
        'cancel_reason',
        'approve_reject_reason'     
    ];
   

    protected $with=['company','supplier','pharmacist','points_of_entry_exit'];
    public function company(){
        return $this->belongsTo(company::class,'comp_id','id');
    }
    public function supplier(){
        return $this->belongsTo(supplier::class,'sup_id','id');
    }
    public function pharmacist(){
        return $this->belongsTo(pharmacist::class,'pharma_id','id');
    }
    public function points_of_entry_exit(){
        return $this->belongsTo(points_of_entry_exit::class,'poe_id','id');
    }
}
