<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\points_of_entry_exit;
use Illuminate\Support\Facades\Validator;

class points_of_entry_exitController extends Controller
{
    //
    public function store(Request $request)
    {
        $validator=validator::make($request->all(),[
            'name'=>'required',
            'region_id'=>'required',
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $points_of_entry_exit= new points_of_entry_exit;
            $points_of_entry_exit->name=$request->input('name');
            $points_of_entry_exit->region_id=$request->input('region_id');
            $points_of_entry_exit->updated_by=$request->input('updated_by');
            $points_of_entry_exit->save();
    
            return response()->json([
                'status'=>200,
                'message'=>'Point of entry or exit added successfully!',
            ]);
        }
    }

    public function viewPoints_of_entry_exit(){
        $points_of_entry_exit=points_of_entry_exit::all();
        return response()->json([
            'status'=>200,
            'points_of_entry_exit'=>$points_of_entry_exit,
        ]);
    }

    public function edit($id){

        $points_of_entry_exit=points_of_entry_exit::find($id);
        if ($points_of_entry_exit) {
            # code...
            return response()->json([
                'status'=>200,
                'points_of_entry_exit'=>$points_of_entry_exit,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No Point of Entry/Exit Id found',
            ]);
        }
    }

    public function update(Request $request,$id){

        $validator=validator::make($request->all(),[
            'name'=>'required|max:191',
            'region_id'=>'required',
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $points_of_entry_exit=points_of_entry_exit::find($id);
            if ($points_of_entry_exit) {
                # code...
                $points_of_entry_exit->name=$request->input('name');
                $points_of_entry_exit->region_id=$request->input('region_id');
                $points_of_entry_exit->save();
        
                return response()->json([
                    'status'=>200,
                    'message'=>'Point of Entry/Exit Updated Successfully!',
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'No Point of Entry/Exit ID found',
                ]);
            }
        }
    }

   

    public function destroy($id){
        $points_of_entry_exit=points_of_entry_exit::find($id);
        if ($points_of_entry_exit) {
            # code...
            $points_of_entry_exit->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Point of Entry/Exit deleted successfully!',
            ]);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'No Point of Entry/Exit id found',
            ]);
        }
    }

}
