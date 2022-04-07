
//Change Password
import ChangePassoword  from '../components/admin/ChangePassoword';
//country
import AddCountry  from '../components/admin/Country/AddCountry';
import ViewCountry  from '../components/admin/Country/ViewCountry';
import EditCountry from '../components/admin/Country/EditCountry';
//region
import AddRegion  from '../components/admin/Region/AddRegion';
import ViewRegion  from '../components/admin/Region/ViewRegion';
import EditRegion from '../components/admin/Region/EditRegion';
//town
import AddTown  from '../components/admin/Town/AddTown';
import ViewTown  from '../components/admin/Town/ViewTown';
import EditTown from '../components/admin/Town/EditTown';
//Point of Entry/Exit
import AddPoints_of_entry_exit  from '../components/admin/Point_of_entry_exit/AddPoints_of_entry_exit';
import ViewPoints_of_entry_exit  from '../components/admin/Point_of_entry_exit/ViewPoints_of_entry_exit';
import EditPoints_of_entry_exit from '../components/admin/Point_of_entry_exit/EditPoints_of_entry_exit';
//Supplier
import AddSupplier  from '../components/admin/Supplier/AddSupplier';
// import ViewPoints_of_entry_exit  from '../components/admin/Point_of_entry_exit/ViewPoints_of_entry_exit';
// import EditPoints_of_entry_exit from '../components/admin/Point_of_entry_exit/EditPoints_of_entry_exit';
//Pharmacist
import AddPharmacist  from '../components/admin/Pharmacist/AddPharmacist';
// import ViewPoints_of_entry_exit  from '../components/admin/Point_of_entry_exit/ViewPoints_of_entry_exit';
// import EditPoints_of_entry_exit from '../components/admin/Point_of_entry_exit/EditPoints_of_entry_exit';
//company
import AddCompany  from '../components/admin/Company/AddCompany';
// import ViewPoints_of_entry_exit  from '../components/admin/Point_of_entry_exit/ViewPoints_of_entry_exit';
// import EditPoints_of_entry_exit from '../components/admin/Point_of_entry_exit/EditPoints_of_entry_exit';
//schedule
import AddSchedule  from '../components/admin/Schedule/AddSchedule';
import ViewSchedule  from '../components/admin/Schedule/ViewSchedule';
//schedule line
import AddSchedule_line  from '../components/admin/Schedule_line/AddSchedule_line';
import ViewSchedule_line  from '../components/admin/Schedule_line/ViewSchedule_line';
// import EditPoints_of_entry_exit from '../components/admin/Point_of_entry_exit/EditPoints_of_entry_exit';
//Permit
import AddPermit  from '../components/admin/Permit/AddPermit';
import ViewPermitNotVerified  from '../components/admin/Permit/ViewPermitNotVerified';
import RejectedPermit  from '../components/admin/Permit/RejectedPermit';
import VerifyPermit from '../components/admin/Permit/VerifyPermit';
import ViewPermitNotApproved from '../components/admin/Permit/ViewPermitNotApproved';
import ApprovePermit from '../components/admin/Permit/ApprovePermit';
import ViewPermitNotSignedoff from '../components/admin/Permit/ViewPermitNotSignedoff';
import SignoffPermit from '../components/admin/Permit/SignoffPermit';
import PermitPrint from '../components/admin/Permit/PermitPrint';
import PermitPrintReport from '../components/admin/Permit/PermitPrintReport';


import Report from '../components/admin/Permit/Report';
import Dashboard from '../components/admin/Dashboard';

// //outcome
// import Addoutcome  from '../components/admin/Outcome/Add_outcome';
// import Viewoutcome  from '../components/admin/Outcome/View_outcome';
// //output
// import Addoutput  from '../components/admin/Output/Add_output';
// import Viewoutput  from '../components/admin/Output/View_output';
// //focus area
// import Addfocus_area  from '../components/admin/Focus_area/Add_focus_area';
// import View_focus_area  from '../components/admin/Focus_area/View_focus_area';
// //programme
// import Add_programme  from '../components/admin/Programme/Add_programme';
// import View_programme  from '../components/admin/Programme/View_programme';
// //indicator
// import Add_indicator  from '../components/admin/Indicator/Add_indicator';
// import View_indicator  from '../components/admin/Indicator/View_indicator';
// //strategy
// import Add_strategy  from '../components/admin/Strategy/Add_strategy';
// import View_strategy  from '../components/admin/Strategy/View_strategy';
// //work plan
// import Add_workplan  from '../components/admin/Workplan/Add_workplan';
// import View_workplan  from '../components/admin/Workplan/View_workplan';
// //programme strategy
// import Add_strategy_programme  from '../components/admin/Strategy_Programme/Add_strategy_programme';
// import View_strategy_programme  from '../components/admin/Strategy_Programme/View_strategy_programme';
// //dashboard
// import dahshboard  from '../components/admin/Dashboard';
//report
// import report11  from '../components/admin/Reports/Report11';

const routes=[    
    //Change Password
    { path :'/admin/changePassword',exact:true,name:'ChangePassoword',component:ChangePassoword},
    //country
    { path :'/admin/add-country',exact:true,name:'AddCountry',component:AddCountry},
    { path :'/admin/view-country',exact:true,name:'ViewCountry',component:ViewCountry},
    { path :'/admin/edit-country/:id',exact:true,name:'EditCountry',component:EditCountry},
    //Region
    { path :'/admin/add-region',exact:true,name:'AddRegion',component:AddRegion},
    { path :'/admin/view-region',exact:true,name:'ViewRegion',component:ViewRegion},
    { path :'/admin/edit-region/:id',exact:true,name:'EditRegion',component:EditRegion},
    //town
    { path :'/admin/add-town',exact:true,name:'AddTown',component:AddTown},
    { path :'/admin/view-town',exact:true,name:'ViewTown',component:ViewTown},
    { path :'/admin/edit-town/:id',exact:true,name:'EditTown',component:EditTown},
    //Points_of_entry_exit
    { path :'/admin/add-point_of_entry_exit',exact:true,name:'AddPoints_of_entry_exit',component:AddPoints_of_entry_exit},
    { path :'/admin/view-point_of_entry_exit',exact:true,name:'ViewPoints_of_entry_exit',component:ViewPoints_of_entry_exit},
    { path :'/admin/edit-point_of_entry_exit/:id',exact:true,name:'EditPoints_of_entry_exit',component:EditPoints_of_entry_exit},
    //Supplier
    { path :'/admin/add-supplier',exact:true,name:'AddSupplier',component:AddSupplier},
    // { path :'/admin/view-point_of_entry_exit',exact:true,name:'ViewPoints_of_entry_exit',component:ViewPoints_of_entry_exit},
    // { path :'/admin/edit-point_of_entry_exit/:id',exact:true,name:'EditPoints_of_entry_exit',component:EditPoints_of_entry_exit},
    //Pharmacist
    { path :'/admin/add-pharmacist',exact:true,name:'AddPharmacist',component:AddPharmacist},
    // { path :'/admin/view-point_of_entry_exit',exact:true,name:'ViewPoints_of_entry_exit',component:ViewPoints_of_entry_exit},
    // { path :'/admin/edit-point_of_entry_exit/:id',exact:true,name:'EditPoints_of_entry_exit',component:EditPoints_of_entry_exit},
    //Company
    { path :'/admin/add-company',exact:true,name:'AddCompany',component:AddCompany},
    // { path :'/admin/view-point_of_entry_exit',exact:true,name:'ViewPoints_of_entry_exit',component:ViewPoints_of_entry_exit},
    // { path :'/admin/edit-point_of_entry_exit/:id',exact:true,name:'EditPoints_of_entry_exit',component:EditPoints_of_entry_exit},
    //Schedule
    { path :'/admin/add-schedule',exact:true,name:'AddSchedule',component:AddSchedule},
    { path :'/admin/view-schedule',exact:true,name:'ViewSchedule',component:ViewSchedule},
    // { path :'/admin/edit-point_of_entry_exit/:id',exact:true,name:'EditPoints_of_entry_exit',component:EditPoints_of_entry_exit},
    //Schedule Line
    { path :'/admin/add-schedule_line',exact:true,name:'AddSchedule_line',component:AddSchedule_line},
    { path :'/admin/view-schedule_line',exact:true,name:'ViewSchedule_line',component:ViewSchedule_line},
    // { path :'/admin/edit-point_of_entry_exit/:id',exact:true,name:'EditPoints_of_entry_exit',component:EditPoints_of_entry_exit},
    
    //Permit
    { path :'/admin/add-permit',exact:true,name:'AddPermit',component:AddPermit},
    { path :'/admin/view-permit-not-verified',exact:true,name:'ViewPermitNotVerified',component:ViewPermitNotVerified},
    { path :'/admin/verify-permit/:id',exact:true,name:'VerifyPermit',component:VerifyPermit},
    { path :'/admin/approve-permit/:id',exact:true,name:'ApprovePermit',component:ApprovePermit},
    { path :'/admin/view-permit-not-approved',exact:true,name:'ViewPermitNotApproved',component:ViewPermitNotApproved},
    { path :'/admin/view-permit-not-signedoff',exact:true,name:'ViewPermitNotSignedoff',component:ViewPermitNotSignedoff},
    { path :'/admin/signoff-permit/:id',exact:true,name:'SignoffPermit',component:SignoffPermit},
    { path :'/admin/report',exact:true,name:'Report',component:Report},
    { path :'/admin/rejected-permit',exact:true,name:'RejectedPermit',component:RejectedPermit},
    { path :'/admin/PermitPrint',exact:true,name:'PermitPrint',component:PermitPrint},
    { path :'/admin/permit-print-report/:id',exact:true,name:'PermitPrintReport',component:PermitPrintReport},
    { path :'/admin/Dashboard',exact:true,name:'Dashboard',component:Dashboard},


    
    // //outcome
    // { path :'/admin/add-outcome',exact:true,name:'Addoutcome',component:Addoutcome},
    // { path :'/admin/view-outcome',exact:true,name:'Viewoutcome',component:Viewoutcome},
    // //output
    // { path :'/admin/add-output',exact:true,name:'Addoutput',component:Addoutput},
    // { path :'/admin/view-output',exact:true,name:'Viewoutput',component:Viewoutput},
    // //focus area
    // { path :'/admin/add-focus_area',exact:true,name:'Addfocus_area',component:Addfocus_area},
    // { path :'/admin/view-focus_area',exact:true,name:'View_focus_area',component:View_focus_area},
    // //programme
    // { path :'/admin/add-programme',exact:true,name:'Add_programme',component:Add_programme},
    // { path :'/admin/view-programme',exact:true,name:'View_programme',component:View_programme},
    // //indicator
    // { path :'/admin/add-indicator',exact:true,name:'Add_indicator',component:Add_indicator},
    // { path :'/admin/view-indicator',exact:true,name:'View_indicator',component:View_indicator},
    // //strategy
    // { path :'/admin/add-strategy',exact:true,name:'Add_strategy',component:Add_strategy},
    // { path :'/admin/view-strategy',exact:true,name:'View_strategy',component:View_strategy},
    // //workplan
    // { path :'/admin/add-workplan',exact:true,name:'Add_workplan',component:Add_workplan},
    // { path :'/admin/view-workplan',exact:true,name:'View_workplan',component:View_workplan},
    // //programme strategy
    // { path :'/admin/add-strategy_programme',exact:true,name:'Add_strategy_programme',component:Add_strategy_programme},
    // { path :'/admin/view-strategy_programme',exact:true,name:'View_strategy_programme',component:View_strategy_programme},
    // //dahshboard
    // { path :'/admin/dashboard',exact:true,name:'dahshboard',component:dahshboard},
    // //Report
    // { path :'/admin/report11',exact:true,name:'report11',component:report11},
];
export default routes;