<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\company;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class companyController extends Controller
{
    //
    public function store(Request $request)
    {
        $validator=validator::make($request->all(),[           
            'appl_ref_no'=>'required',
            'tin'=>'required',
            'comp_name'=>'required',
            'postal_address'=>'required',
            'physical_address'=>'required',
            'town_id'=>'required',
            'contact_person'=>'required',
            'tel_no'=>'required',
            'mobile_no'=>'required',
            'email'=>'required',
            'reg_date'=>'required',
            // 'num_apply',
            // 'updated_datetime'=>'required',
            'comp_reg_no'=>'required',  
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $company= new company;
            $company->appl_ref_no=$request->input('appl_ref_no');
            $company->tin=$request->input('tin');
            $company->comp_name=$request->input('comp_name');
            $company->postal_address=$request->input('postal_address');
            $company->physical_address=$request->input('physical_address');
            $company->town_id=$request->input('town_id');
            $company->contact_person=$request->input('contact_person');
            $company->tel_no=$request->input('tel_no');
            $company->mobile_no=$request->input('mobile_no');
            $company->email=$request->input('email');
            $company->reg_date=$request->input('reg_date');
            $company->updated_by=$request->input('updated_by');
            $company->comp_reg_no=$request->input('comp_reg_no');
            $now = Carbon::now();
            $company->updated_datetime=$now;
            $company->save();

            return response()->json([
                'status'=>200,
                'message'=>'Company  added successfully!',
            ]);
        }
    }
    
    public function viewCompany(){
        $company=company::all();
        return response()->json([
            'status'=>200,
            'company'=>$company,
        ]);
    }
}
