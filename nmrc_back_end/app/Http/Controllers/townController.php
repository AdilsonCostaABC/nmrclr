<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\town;
use Illuminate\Support\Facades\Validator;

class townController extends Controller
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
            $town= new town;
            $town->name=$request->input('name');
            $town->region_id=$request->input('region_id');
            $town->updated_by=$request->input('updated_by');
            $town->save();
    
            return response()->json([
                'status'=>200,
                'message'=>'Town added successfully!',
            ]);
        }
    }


    public function viewTown(){
        $town=town::all();
        return response()->json([
            'status'=>200,
            'town'=>$town,
        ]);
    }

    public function edit($id){

        $town=town::find($id);
        if ($town) {
            # code...
            return response()->json([
                'status'=>200,
                'town'=>$town,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No Town Id found',
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
            $town=town::find($id);
            if ($town) {
                # code...
                $town->name=$request->input('name');
                $town->region_id=$request->input('region_id');
                $town->save();
        
                return response()->json([
                    'status'=>200,
                    'message'=>'Town Updated Successfully!',
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'No Town ID found',
                ]);
            }
        }
    }
    
    public function destroy($id){
        $town=town::find($id);
        if ($town) {
            # code...
            $town->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Town deleted successfully!',
            ]);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'No Town id found',
            ]);
        }
    }


}
