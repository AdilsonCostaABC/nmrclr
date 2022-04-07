<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\permit;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class permitController extends Controller
{
    //
    public function store(Request $request)
    {
        $validator=validator::make($request->all(),[           

            // 'check_digit'=>'required',
            // 'permit_no'=>'required',
            'permit_date'=>'required',
            'comp_id'=>'required',
            'sup_id'=>'required',
            'pharma_id'=>'required',
            'valid_from'=>'required',
            'valid_to'=>'required',
            'poe_id'=>'required',
            'purpose_use'=>'required',
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $permit= new permit;
            // $permit->check_digit=$request->input('check_digit');
            // $permit->permit_no=$request->input('permit_no');
            $permit->permit_date=$request->input('permit_date');
            $permit->comp_id=$request->input('comp_id');
            $permit->sup_id=$request->input('sup_id');
            $permit->pharma_id=$request->input('pharma_id');
            $permit->valid_from=$request->input('valid_from');
            $permit->valid_to=$request->input('valid_to');
            $permit->poe_id=$request->input('poe_id');
            $permit->purpose_use=$request->input('purpose_use');
            //automatic data
            $permit->permit_status="Not Verified";
            $now = Carbon::now();
            $permit->updated_datetime=$now;
            $permit->updated_by=$request->input('updated_by');
            $permit->orig_user=$request->input('updated_by');
            $permit->save();
            
                 $countid=$permit->id;
                $permit=permit::find($countid);
                $permit->check_digit=1375+$countid;
                $permit->permit_no=1444+$countid;
                $permit->save();
            //updateable data
            // 'veri_reject_reason',
            // 'cancel_reason',
            // 'approve_reject_reason'
            return response()->json([
                'status'=>200,
                'message'=>'Permit Application  added successfully!'.$permit->id,
                'permitId'=>$permit->id
            ]);
        }
    }



    public function viewPermitRejected(){
        // $permit=permit::all();
        $permit=permit::where('permit_status',"Rejected")->get();
        
        return response()->json([
            'status'=>200,
            'rejected'=>$permit,
        ]);
    }

    //verify

    public function viewPermitNoVerified(){
        // $permit=permit::all();
        $permit=permit::where('permit_status',"Not Verified")->get();
        
        return response()->json([
            'status'=>200,
            'permitNotVerified'=>$permit,
        ]);
    }
      

    public function verifyPermit($id){

        $permit=permit::find($id);
        if ($permit) {
            # code...
            return response()->json([
                'status'=>200,
                'verify_permit'=>$permit,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No Permit not verified not found Id found',
            ]);
        }
    }

    
    public function updatePermitNotVerified(Request $request,$id){

        $validator=validator::make($request->all(),[
            'check_digit'=>'required',
            'permit_no'=>'required',
            'permit_date'=>'required',
            'comp_id'=>'required',
            'sup_id'=>'required',
            'pharma_id'=>'required',
            'valid_from'=>'required',
            'valid_to'=>'required',
            'poe_id'=>'required',
            'purpose_use'=>'required',
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $permit=permit::find($id);
            if ($permit) {
                # code...
                
                $permit->check_digit=$request->input('check_digit');
                $permit->permit_no=$request->input('permit_no');
                $permit->permit_no=$request->input('permit_no');
                $permit->permit_date=$request->input('permit_date');
                $permit->comp_id=$request->input('comp_id');
                $permit->sup_id=$request->input('sup_id');
                $permit->pharma_id=$request->input('pharma_id');
                $permit->valid_from=$request->input('valid_from');
                $permit->valid_to=$request->input('valid_to');
                $permit->poe_id=$request->input('poe_id');
                $permit->purpose_use=$request->input('purpose_use');
                //automatic data
                // $permit->permit_status="Not Verified";
                // $now = Carbon::now();
                // $permit->updated_datetime=$now;
                $permit->updated_by=$request->input('updated_by');
                // $permit->orig_user=$request->input('updated_by');
                $permit->save();
                return response()->json([
                    'status'=>200,
                    'message'=>'Permit Application  updated successfully!'
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'No Permit Application not verified ID found',
                ]);
            }
        }
    }

    public function submitPermitForApproval(Request $request,$id){

        $validator=validator::make($request->all(),[
            'check_digit'=>'required',
            'permit_no'=>'required',
            'permit_date'=>'required',
            'comp_id'=>'required',
            'sup_id'=>'required',
            'pharma_id'=>'required',
            'valid_from'=>'required',
            'valid_to'=>'required',
            'poe_id'=>'required',
            'purpose_use'=>'required',
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $permit=permit::find($id);
            if ($permit) {
                # code...
                $permit->permit_status="Verified";
                $permit->save();
        
                return response()->json([
                    'status'=>200,
                    'message'=>'Permit Application Verified successfully!'
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'No Permit Application not verified ID found',
                ]);
            }
        }
    }

    public function rejectPermitNotVerified(Request $request,$id){

        $validator=validator::make($request->all(),[
            
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $permit=permit::find($id);
            if ($permit) {
                # code...
                $permit->veri_reject_reason=$request->input('veri_reject_reason');
                $permit->permit_status="Rejected";
                $permit->save();
        
                return response()->json([
                    'status'=>200,
                    'message'=>'Permit Application Rejected successfully!'
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'No Permit Application not verified to reject ID found',
                ]);
            }
        }
    }
    //approve

    public function viewPermitNotApproved(){
        // $permit=permit::all();
        $permit=permit::where('permit_status',"Verified")->get();
        
        return response()->json([
            'status'=>200,
            'permitNotApproved'=>$permit,
        ]);
    }

    public function approvePermit($id){

        $permit=permit::find($id);
        if ($permit) {
            # code...
            return response()->json([
                'status'=>200,
                'approve_permit'=>$permit,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No Permit not approved not found Id found',
            ]);
        }
    }


    public function updatePermitNotApproved(Request $request,$id){

        $validator=validator::make($request->all(),[
            'check_digit'=>'required',
            'permit_no'=>'required',
            'permit_date'=>'required',
            'comp_id'=>'required',
            'sup_id'=>'required',
            'pharma_id'=>'required',
            'valid_from'=>'required',
            'valid_to'=>'required',
            'poe_id'=>'required',
            'purpose_use'=>'required',
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $permit=permit::find($id);
            if ($permit) {
                # code...
                
                $permit->check_digit=$request->input('check_digit');
                $permit->permit_no=$request->input('permit_no');
                $permit->permit_date=$request->input('permit_date');
                $permit->comp_id=$request->input('comp_id');
                $permit->sup_id=$request->input('sup_id');
                $permit->pharma_id=$request->input('pharma_id');
                $permit->valid_from=$request->input('valid_from');
                $permit->valid_to=$request->input('valid_to');
                $permit->poe_id=$request->input('poe_id');
                $permit->purpose_use=$request->input('purpose_use');
                //automatic data
                // $permit->permit_status="Not Verified";
                // $now = Carbon::now();
                // $permit->updated_datetime=$now;
                $permit->updated_by=$request->input('updated_by');
                // $permit->orig_user=$request->input('updated_by');
                $permit->save();
        
                return response()->json([
                    'status'=>200,
                    'message'=>'Permit Application  updated successfully!'
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'No Permit Application not approved ID found',
                ]);
            }
        }
    }

    public function submitPermitForSignoff(Request $request,$id){

        $validator=validator::make($request->all(),[
            'check_digit'=>'required',
            'permit_no'=>'required',
            'permit_date'=>'required',
            'comp_id'=>'required',
            'sup_id'=>'required',
            'pharma_id'=>'required',
            'valid_from'=>'required',
            'valid_to'=>'required',
            'poe_id'=>'required',
            'purpose_use'=>'required',
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $permit=permit::find($id);
            if ($permit) {
                # code...
                $permit->permit_status="Approved";
                $permit->save();
        
                return response()->json([
                    'status'=>200,
                    'message'=>'Permit Application Approved successfully!'
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'No Permit Application not approved ID found',
                ]);
            }
        }
    }
   


    public function rejectPermitNotApproved(Request $request,$id){

        $validator=validator::make($request->all(),[
            
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $permit=permit::find($id);
            if ($permit) {
                # code...
                $permit->approve_reject_reason=$request->input('approve_reject_reason');
                $permit->permit_status="Rejected";
                $permit->save();
        
                return response()->json([
                    'status'=>200,
                    'message'=>'Permit Application Rejected successfully!'
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'No Permit Application not approved to reject ID found',
                ]);
            }
        }
    }
//Signedoff

    public function viewReport(){
        // $permit=permit::all();
        $permit=permit::where('permit_status',"Signedoff")->get();
        
        return response()->json([
            'status'=>200,
            'report'=>$permit,
        ]);
    }

    public function viewPermitNotSignedoff(){
        // $permit=permit::all();
        $permit=permit::where('permit_status',"Approved")->get();
        
        return response()->json([
            'status'=>200,
            'permitNotSignedoff'=>$permit,
        ]);
    }

    public function signoffPermit($id){

        $permit=permit::find($id);
        if ($permit) {
            # code...
            return response()->json([
                'status'=>200,
                'signoff_permit'=>$permit,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No Permit not signeoff not found Id found',
            ]);
        }
    }


    public function submitPermitSignedoff(Request $request,$id){

        $validator=validator::make($request->all(),[
            'check_digit'=>'required',
            'permit_no'=>'required',
            'permit_date'=>'required',
            'comp_id'=>'required',
            'sup_id'=>'required',
            'pharma_id'=>'required',
            'valid_from'=>'required',
            'valid_to'=>'required',
            'poe_id'=>'required',
            'purpose_use'=>'required',
            
        ]);
        if ($validator->fails()) {
            # code...
            return response()->json([
                'status'=>422,
                'errors'=>$validator->errors(),
            ]);
        } else {
            # code...
            $permit=permit::find($id);
            if ($permit) {
                # code...
                $permit->permit_status="Signedoff";
                $permit->save();
        
                return response()->json([
                    'status'=>200,
                    'message'=>'Permit Application Signedoff successfully!'
                ]);
            }
            else{
                return response()->json([
                    'status'=>404,
                    'message'=>'No Permit Application not signedoff ID found',
                ]);
            }
        }
    }
}
