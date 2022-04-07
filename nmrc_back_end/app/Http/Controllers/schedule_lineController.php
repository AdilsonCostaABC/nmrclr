<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\schedule_line;
use Illuminate\Support\Facades\Validator;

class schedule_lineController extends Controller
{
    //
    public function store(Request $request)
    {
        $validator=validator::make($request->all(),[
            'schedule_id'=>'required',
            'line_desc'=>'required',
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $schedule_line= new schedule_line;
            $schedule_line->schedule_id=$request->input('schedule_id');
            $schedule_line->line_desc=$request->input('line_desc');
            $schedule_line->updated_by=$request->input('updated_by');
            $schedule_line->save();
    
            return response()->json([
                'status'=>200,
                'message'=>'Schedule line  added successfully!',
            ]);
        }
    }

    public function viewSchedule_line(){
        $schedule_line=schedule_line::all();
        return response()->json([
            'status'=>200,
            'schedule_line'=>$schedule_line,
        ]);
    }
}
