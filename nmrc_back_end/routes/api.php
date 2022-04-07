<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\countryController;
use App\Http\Controllers\regionController;
use App\Http\Controllers\townController;
use App\Http\Controllers\points_of_entry_exitController;
use App\Http\Controllers\supplierController;
use App\Http\Controllers\companyController;
use App\Http\Controllers\scheduleController;
use App\Http\Controllers\schedule_lineController;
use App\Http\Controllers\permitController;
use App\Http\Controllers\permit_lineController;

use App\Http\Controllers\outcomeController;
use App\Http\Controllers\outputController;
use App\Http\Controllers\focus_areaController;
use App\Http\Controllers\programmeController;
use App\Http\Controllers\indicatorController;
use App\Http\Controllers\strategyController;
use App\Http\Controllers\npc_ndpController;
use App\Http\Controllers\systemDataController;
use App\Http\Controllers\strategy_programmeController;
use App\Http\Controllers\pharmacistController;
use App\Http\Controllers\SystemData;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::get('systemData',[systemDataController::class,'systemData']);
Route::post('institutionName',[systemDataController::class,'searchInstitutionName']);
//Check if the API is Admin -->'isAPIAdmin'
    //it's coming grom kernel under  protected $routeMiddleware 
Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function () {

    Route::get('/checkingAuthenticated', function (){
        return response()->json(['message'=>'You are in','status'=>200],200);//
    });    
    //Change Password 
    Route::post('change-password',[AuthController::class,'changePassWord']);
    //country
    Route::post('store-country',[countryController::class,'store']);
    Route::get('view-country',[countryController::class,'viewCountry']);
    Route::delete('delete-country/{id}',[countryController::class,'destroy']);
    Route::get('edit-country/{id}',[countryController::class,'edit']);
    Route::put('update-country/{id}',[countryController::class,'update']);
    //region
    Route::post('store-region',[regionController::class,'store']);
    Route::get('view-region',[regionController::class,'viewRegion']);
    Route::delete('delete-region/{id}',[regionController::class,'destroy']);
    Route::get('edit-region/{id}',[regionController::class,'edit']);
    Route::put('update-region/{id}',[regionController::class,'update']);
    //town
    Route::post('store-town',[townController::class,'store']);
    Route::get('view-town',[townController::class,'viewTown']);
    Route::delete('delete-town/{id}',[townController::class,'destroy']);
    Route::get('edit-town/{id}',[townController::class,'edit']);
    Route::put('update-town/{id}',[townController::class,'update']);
    //points_of_entry_exit
    Route::post('store-points_of_entry_exit',[points_of_entry_exitController::class,'store']);
    Route::get('view-points_of_entry_exit',[points_of_entry_exitController::class,'viewPoints_of_entry_exit']);
    Route::delete('delete-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'destroy']);
    Route::get('edit-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'edit']);
    Route::put('update-points_of_entry_exit/{id}',[townCopoints_of_entry_exitControllerntroller::class,'update']);
    //supplier
    Route::post('store-supplier',[supplierController::class,'store']);
    Route::get('view-supplier',[supplierController::class,'viewSupplier']);
    // Route::delete('delete-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'destroy']);
    // Route::get('edit-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'edit']);
    // Route::put('update-points_of_entry_exit/{id}',[townCopoints_of_entry_exitControllerntroller::class,'update']);

    //pharmacist
    Route::post('store-pharmacist',[pharmacistController::class,'store']);
    Route::get('view-pharmacist',[pharmacistController::class,'viewPharmacist']);
    // Route::delete('delete-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'destroy']);
    // Route::get('edit-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'edit']);
    // Route::put('update-points_of_entry_exit/{id}',[townCopoints_of_entry_exitControllerntroller::class,'update']);
    //company
    Route::post('store-company',[companyController::class,'store']);
    Route::get('view-company',[companyController::class,'viewCompany']);
    // Route::delete('delete-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'destroy']);
    // Route::get('edit-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'edit']);
    // Route::put('update-points_of_entry_exit/{id}',[townCopoints_of_entry_exitControllerntroller::class,'update']);
    //schedule
    Route::post('store-schedule',[scheduleController::class,'store']);
    Route::get('view-schedule',[scheduleController::class,'viewSchedule']);
    // Route::delete('delete-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'destroy']);
    // Route::get('edit-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'edit']);
    // Route::put('update-points_of_entry_exit/{id}',[townCopoints_of_entry_exitControllerntroller::class,'update']);
    //schedule line
    Route::post('store-schedule_line',[schedule_lineController::class,'store']);
    Route::get('view-schedule_line',[schedule_lineController::class,'viewSchedule_line']);
    // Route::delete('delete-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'destroy']);
    // Route::get('edit-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'edit']);
    // Route::put('update-points_of_entry_exit/{id}',[townCopoints_of_entry_exitControllerntroller::class,'update']);
    //permit
    Route::post('store-permit',[permitController::class,'store']);
    // Route::delete('delete-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'destroy']);

    Route::get('view-permitRejected',[permitController::class,'viewPermitRejected']);
    Route::get('view-permitNoVerified',[permitController::class,'viewPermitNoVerified']);
    Route::get('verify-permit/{id}',[permitController::class,'verifyPermit']);
    Route::put('update-permitNotVerified/{id}',[permitController::class,'updatePermitNotVerified']);
    Route::put('reject-permit-not-verified/{id}',[permitController::class,'rejectPermitNotVerified']);
    Route::put('submit-permit-for-approval/{id}',[permitController::class,'submitPermitForApproval']);

    Route::get('view-permitNotApproved',[permitController::class,'viewPermitNotApproved']);
    Route::get('approve-permit/{id}',[permitController::class,'approvePermit']);
    Route::put('update-permitNotApproved/{id}',[permitController::class,'updatePermitNotApproved']);
    Route::put('reject-permit-not-approved/{id}',[permitController::class,'rejectPermitNotApproved']);
    Route::put('submit-permit-for-signoff/{id}',[permitController::class,'submitPermitForSignoff']);
    
    Route::get('view-permitNotSignedoff',[permitController::class,'viewPermitNotSignedoff']);
    Route::get('signoff-permit/{id}',[permitController::class,'signoffPermit']);
    Route::put('submit-permit-signedoff/{id}',[permitController::class,'submitPermitSignedoff']);

    Route::get('view-report',[permitController::class,'viewReport']);
    Route::get('print-permit-report/{id}',[permitController::class,'signoffPermit']);


    //permit Line
    Route::post('store-permit_line',[permit_lineController::class,'store']);
    // Route::get('view-permit_line',[permit_lineController::class,'viewPermitLine']);
    // Route::delete('delete-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'destroy']);
    // Route::get('edit-points_of_entry_exit/{id}',[points_of_entry_exitController::class,'edit']);
    // Route::put('update-points_of_entry_exit/{id}',[townCopoints_of_entry_exitControllerntroller::class,'update']);



    //outcome
    Route::post('store-outcome',[outcomeController::class,'store']);
    Route::delete('delete-outcome/{id}',[outcomeController::class,'destroy']);
    //output
    Route::post('store-output',[outputController::class,'store']);
    Route::delete('delete-output/{id}',[outputController::class,'destroy']);
    //focus area
    Route::post('store-focus_area',[focus_areaController::class,'store']);
    Route::delete('delete-focus_area/{id}',[focus_areaController::class,'destroy']);
    //programme
    Route::post('store-programme',[programmeController::class,'store']);
    Route::delete('delete-programme/{id}',[programmeController::class,'destroy']);
    //indicator
    Route::post('store-indicator',[indicatorController::class,'store']);
    Route::delete('delete-indicator/{id}',[indicatorController::class,'destroy']);
    //strategy
    Route::post('store-strategy',[strategyController::class,'store']);
    Route::delete('delete-strategy/{id}',[strategyController::class,'destroy']);
    //strategy
    Route::post('store-strategy_programme',[strategy_programmeController::class,'store']);
    Route::delete('delete-strategy_programme/{id}',[strategy_programmeController::class,'destroy']);
    //system data
    Route::get('systemData',[SystemData::class,'systemData']);

    
    
    
}); 


//any type of user is able to log out
Route::middleware(['auth:sanctum'])->group(function () {    
    Route::post('logout',[AuthController::class,'logout']); 
    Route::get('view-pilar',[pilarController::class,'viewPilar']);
    Route::get('view-outcome',[outcomeController::class,'viewOutcome']);
    Route::get('view-output',[outputController::class,'viewOutput']);
    Route::get('view-focus_area',[focus_areaController::class,'viewFocusArea']);
    Route::get('view-programme',[programmeController::class,'viewProgramme']);
    Route::get('view-indicator',[indicatorController::class,'viewIndicator']);
    Route::get('view-strategy',[strategyController::class,'viewStrategy']);
    Route::get('view-strategy_programme',[strategy_programmeController::class,'viewStrategyProgramme']);
    //work plan
    Route::post('store-workplan',[npc_ndpController::class,'store']);
    Route::delete('delete-workplan/{id}',[npc_ndpController::class,'destroy']);
    Route::get('view-workplan',[npc_ndpController::class,'viewWorkplan']);


}); 

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    // return $request->user();
// });
