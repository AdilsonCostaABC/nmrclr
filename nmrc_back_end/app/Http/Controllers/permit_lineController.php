<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\permit_line;
use Illuminate\Support\Facades\Validator;


class permit_lineController extends Controller
{
    //
    public function store(Request $request)
    {
        $validator=validator::make($request->all(),[
            
            'schedule_line_id'=>'required',
            'prep_desc'=>'required',
            'unit_weight'=>'required',
            'uom_desc'=>'required',
            'x_line_qty'=>'required',
            'y_line_qty'=>'required',
            'total_weight'=>'required',
            
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $permit_line= new permit_line;
            $permit_line->permit_id=$request->input('permit_id');
            $permit_line->schedule_line_id=$request->input('schedule_line_id');
            $permit_line->prep_desc=$request->input('prep_desc');
            $permit_line->unit_weight=$request->input('unit_weight');
            $permit_line->uom_desc=$request->input('uom_desc');
            $permit_line->x_line_qty=$request->input('x_line_qty');
            $permit_line->y_line_qty=$request->input('y_line_qty');
            $permit_line->total_weight=$request->input('total_weight');
            $permit_line->updated_by=$request->input('updated_by');
            
            $permit_line->save();

            $view_perrmit_line=permit_line::where('permit_id',($request->input('permit_id')))->get();

            return response()->json([
                'status'=>200,
                'message'=>'Permit Line added successfully!',
                'view_perrmit_line'=>$view_perrmit_line,
            ]);
        }
    } 
}
