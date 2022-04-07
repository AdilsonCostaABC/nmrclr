<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\country;
use Illuminate\Support\Facades\Validator;


class countryController extends Controller
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
            $country= new country;
            $country->name=$request->input('name');
            $country->updated_by=$request->input('updated_by');
            $country->save();
    
            return response()->json([
                'status'=>200,
                'message'=>'Country  added successfully!',
            ]);
        }
    }

    public function viewCountry(){
        $country=country::all();
        return response()->json([
            'status'=>200,
            'country'=>$country,
        ]);
    }


    public function edit($id){
        $country=country::find($id);
        if ($country) {
            # code...
            return response()->json([
                'status'=>200,
                'country'=>$country,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No Country Id found',
            ]);
        }
    }
    

    public function update(Request $request,$id){

        $validator=validator::make($request->all(),[
            'name'=>'required|max:191'
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $country=country::find($id);
            if ($country) {
                # code...
                $country->name=$request->input('name');
                $country->save();
        
                return response()->json([
                    'status'=>200,
                    'message'=>'Country Updated Successfully!',
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'No Country ID found',
                ]);
            }
           
        }
    
    }

    public function destroy($id){
        $country=country::find($id);
        if ($country) {
            # code...
            $country->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Country deleted successfully!',
            ]);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'No country id found',
            ]);
        }
    }

}
