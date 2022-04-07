<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
//imported cause of Auth in if statement
use Illuminate\Support\Facades\Auth;

class ApiAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        //check if the user is authenticated or not
        if (Auth::check()) {
            # code...
            //once the user is authenticated check the token
            //generating the token---tokenCan('server:admin')
            if (auth()->user()->tokenCan('server:admin')) {
                # code...
                return $next($request);
            } else {
                # code...
                return response()->json([
                    'message'=>'Access Denied! Because you are not an admin.',
                ],403);// 403 is type of error
            }
            
        } else {
            # code...
            return response()->json([
                'status'=>401,
                'message'=>'Please Login First',
            ]);
        }
        
        
    }
}
