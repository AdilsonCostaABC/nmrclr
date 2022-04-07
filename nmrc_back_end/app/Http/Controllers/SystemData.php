<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class SystemData extends Controller
{
    //
    public function systemData(){
        $qtyPermit=DB::table('permits')->count();
        $qtyPermitsNotVerified=DB::table('permits')->where('permit_status','Not Verified')->count();
        $qtyPermitsVerified=DB::table('permits')->where('permit_status','Verified')->count();
        $qtyPermitsApproved=DB::table('permits')->where('permit_status','Approved')->count();
        $qtyPermitsSignedoff=DB::table('permits')->where('permit_status','Signedoff')->count();
        $qtyPermitsRejected=DB::table('permits')->where('permit_status','Rejected')->count();
        $qtySuppliers=DB::table('suppliers')->count();
        $qtyPharmacists=DB::table('pharmacists')->count();
        
        
        return response()->json([
            'status'=>200,
            'Permits'=>$qtyPermit,
            'PermitNotVerified'=>$qtyPermitsNotVerified,
            'PermitsVerified'=>$qtyPermitsVerified,
            'PermitsApproved'=>$qtyPermitsApproved,
            'PermitsSignedoff'=>$qtyPermitsSignedoff,
            'PermitsRejected'=>$qtyPermitsRejected,
            'Suppliers'=>$qtySuppliers,
            'Pharmacists'=>$qtyPharmacists,
            
        ]);
    }
}
