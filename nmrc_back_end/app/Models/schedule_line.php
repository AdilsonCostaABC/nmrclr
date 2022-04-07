<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\schedule;


class schedule_line extends Model
{
    use HasFactory;
    protected $table='schedule_lines';
    protected $fillable=[
            'schedule_id',
            'line_desc',
            'updated_by'     
    ];


    protected $with=['schedule'];
    public function schedule(){
        return $this->belongsTo(schedule::class,'schedule_id','id');
    }
}
