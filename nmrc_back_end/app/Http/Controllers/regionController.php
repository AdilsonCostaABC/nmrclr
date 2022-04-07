<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\region;
use Illuminate\Support\Facades\Validator;

class regionController extends Controller
{
    //
    public function store(Request $request)
    {
        $validator=validator::make($request->all(),[
            'name'=>'required',
            'country_id'=>'required',
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $region= new region;
            $region->name=$request->input('name');
            $region->country_id=$request->input('country_id');
            $region->updated_by=$request->input('updated_by');
            $region->save();
    
            return response()->json([
                'status'=>200,
                'message'=>'Region  added successfully!',
            ]);
        }
    }

    public function viewRegion(){
        $region=region::all();
        return response()->json([
            'status'=>200,
            'region'=>$region,
        ]);
    }

    public function edit($id){
        $region=region::find($id);
        if ($region) {
            # code...
            return response()->json([
                'status'=>200,
                'region'=>$region,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No region Id found',
            ]);
        }
    }

    public function update(Request $request,$id){

        $validator=validator::make($request->all(),[
            'name'=>'required|max:191',
            'country_id'=>'required',
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $region=region::find($id);
            if ($region) {
                # code...
                $region->name=$request->input('name');
                $region->country_id=$request->input('country_id');
                $region->save();
        
                return response()->json([
                    'status'=>200,
                    'message'=>'Region Updated Successfully!',
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'No Region ID found',
                ]);
            }
        }
    }

    public function destroy($id){
        $region=region::find($id);
        if ($region) {
            # code...
            $region->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Region deleted successfully!',
            ]);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'No region id found',
            ]);
        }
    }
}
