<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\schedule_line;
use App\Models\permit;

class permit_line extends Model
{
    use HasFactory;
    protected $table='permit_lines';
    protected $fillable=[
        'permit_id',
        'schedule_line_id',
        'prep_desc',
        'unit_weight',
        'uom_desc',
        'x_line_qty',
        'y_line_qty',
        'total_weight',
        'updated_by',
    ];
    protected $with=['schedule_line','permit'];
    public function schedule_line(){
        return $this->belongsTo(schedule_line::class,'schedule_line_id','id');
    }
    public function permit(){
        return $this->belongsTo(permit::class,'permit_id','id');
    }
}
