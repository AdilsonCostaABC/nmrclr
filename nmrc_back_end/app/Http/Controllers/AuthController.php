<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        $validator=validator::make($request->all(),[
            'name'=>'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8',
            'phone_number'=>'required|max:191',
            'confirm_password'=>'required|min:8',
            
        ]);
        if($validator->fails()){
            # code...
            return response()->json([
                'validations_errors'=>$validator->errors(),
            ]);

        }else if ($request->password==$request->confirm_password) {
                $user=User::create([
                    'name'=>$request->name,
                    'email'=>$request->email,
                    'phone_number'=>$request->phone_number,
                    'role_as'=>0,
                    'password'=>Hash::make($request->password),
                ]);
                   //generating the token
                $token=$user->createToken($user->email.'_token')->plainTextToken;
                return response()->json([
                    'status'=>200,
                    'username'=>$user->name,
                    'token'=>$token,
                    'message'=>'Registered Sucessfully',
                ]);
            }
            else{
                return response()->json([
                    'status'=>100,
                    'message'=>'Those passwords didn’t match. Try again',
                ]);
            }            
        
    }
   
    public function login(Request $request){
        $validator=Validator::make($request->all(),[
            'email'=>'required|max:191',
            'password'=>'required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'validations_errors'=>$validator->errors(),
            ]);

        } else {
             
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status'=>300,
                    'message'=>'The provided credentials are incorrect.',
                ]);
    
            }
            else{
                //creatin condition if the user that is logging in is admin or normal user
                //role_as is the attribute created under user table in phpMyAdmin, is, it's not crea-
                //ted in the model, if I loose the db or send the project to someone it won't have that 
                //attribute
                if ($user->role_as==1) {//1 means admin
                    $role='admin';//for admin
                    # code...
                    //the token tokenCan('server:admin') was generated in ApiAdminMiddleware.php
                    $token=$user->createToken($user->email.'_Admintoken', ['server:admin'])->plainTextToken;
                } else {
                    $role='';//for normal user 
                    # code...
                    // this token is for normal user [''] means null
                    $token=$user->createToken($user->email.'_token',[''])->plainTextToken;
                }

                
                
                return response()->json([
                    'status'=>400,
                    'username'=>$user->name,
                    'email'=>$user->email,
                    'token'=>$token,
                    'message'=>'Logged in Sucessfully',
                    'role'=>$role,
                ]);
            }
        }
        

    }

    public function logout(){
            auth()->user()->tokens()->delete();
            return response()->json([
                'status'=>400,
                'message'=>'Logged out Successfully',
            ]);
    }

// To change password
    public function changePassWord(Request $request){
            $validator=validator::make($request->all(),[
                'old_password'=>'required|min:8',
                'password'=>'required|min:8',
                'confirm_password'=>'required|min:8',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status'=>422,
                    'validations_errors'=>$validator->errors(),
                ]);

            } else {
                    //getting the user details that is logged in using the email/username logged in.
                    $user = User::where('email', $request->email)->first();

                    //Checking if the old password is the same as the one stored.
                    if (!$user || !Hash::check($request->old_password, $user->password)) {
                        return response()->json([
                            'status'=>300,
                            'wrongOld_password'=>'The provided old password is incorrect.',
                        ]);
            
                    }
                    else{
                        //cheching new password
                       if ($request->password==$request->confirm_password) {
                                $user->password=Hash::make($request->password);
                                $user->save();
                                return response()->json([
                                    'status'=>400,
                                    'username'=>$user->name,
                                    'message'=>'Password changed Sucessfully',
                                ]);
                        }
                        else{
                            return response()->json([
                                'status'=>100,
                                'passwordDontMatch'=>'Those passwords didn’t match. Try again',
                            ]);
                        }          
                        
                    }
            }
    }
}
