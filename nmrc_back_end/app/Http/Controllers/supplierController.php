<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\supplier;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class supplierController extends Controller
{
    //
    public function store(Request $request)
    {
        $validator=validator::make($request->all(),[           
            'company_name'=>'required',
            'physical_address'=>'required',
            'town_id'=>'required',
            'contact_person'=>'required',
            'tel_no'=>'required',
            'mobile_no'=>'required',
            'email'=>'required',
            'status'=>'required',
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $supplier= new supplier;
            $supplier->company_name=$request->input('company_name');
            $supplier->physical_address=$request->input('physical_address');
            $supplier->town_id=$request->input('town_id');
            $supplier->contact_person=$request->input('contact_person');
            $supplier->tel_no=$request->input('tel_no');
            $supplier->mobile_no=$request->input('mobile_no');
            $supplier->email=$request->input('email');
            $supplier->status=$request->input('status');
            $supplier->updated_by=$request->input('updated_by');
            $now = Carbon::now();
            $supplier->reg_date=$now;
            $supplier->save();
    
            return response()->json([
                'status'=>200,
                'message'=>'Supplier  added successfully!',
            ]);
        }
    }
    public function viewSupplier(){
        $supplier=supplier::all();
        return response()->json([
            'status'=>200,
            'supplier'=>$supplier,
        ]);
    }
}
