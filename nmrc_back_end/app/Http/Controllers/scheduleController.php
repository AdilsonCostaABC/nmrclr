<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\schedule;
use Illuminate\Support\Facades\Validator;

class scheduleController extends Controller
{
    //
    public function store(Request $request)
    {
        $validator=validator::make($request->all(),[
            'name'=>'required|max:191',
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $schedule= new schedule;
            $schedule->name=$request->input('name');
            $schedule->updated_by=$request->input('updated_by');
            $schedule->save();
    
            return response()->json([
                'status'=>200,
                'message'=>'Schedule  added successfully!',
            ]);
        }
    }

    public function viewSchedule(){
        $schedule=schedule::all();
        return response()->json([
            'status'=>200,
            'schedule'=>$schedule,
        ]);
    }

}
