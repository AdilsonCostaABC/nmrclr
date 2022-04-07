<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\pharmacist;
use Illuminate\Support\Facades\Validator;

class pharmacistController extends Controller
{
    //
    public function store(Request $request)
    {
        $validator=validator::make($request->all(),[           
            'first_name'=>'required',
            'last_name'=>'required',
            'tel_no'=>'required',
            'mobile_no'=>'required',
            'email'=>'required',
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $pharmacist= new pharmacist;
            $pharmacist->first_name=$request->input('first_name');
            $pharmacist->last_name=$request->input('last_name');
            $pharmacist->tel_no=$request->input('tel_no');
            $pharmacist->mobile_no=$request->input('mobile_no');
            $pharmacist->email=$request->input('email');
            $pharmacist->updated_by=$request->input('updated_by');
            $pharmacist->save();
    
            return response()->json([
                'status'=>200,
                'message'=>'Pharmacist  added successfully!',
            ]);
        }
    }

    public function viewPharmacist(){
        $pharmacist=pharmacist::all();
        return response()->json([
            'status'=>200,
            'pharmacist'=>$pharmacist,
        ]);
    }
    
}
