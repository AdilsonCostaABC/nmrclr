import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Route, Redirect,useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import MasterLayout from './layouts/admin/MasterLayout';

//...rest is used to get/access the routes from routes.js file 
function AdminPrivateRoute({...rest}){
    //to check if the user has token to be allowed to access admin pages
    
    // //just to helpe Authenticated to be set to true.
    
    // //Use effect so that it(the api-checking authenticated) can not be loading and loading too many times
    const history = useHistory();
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setloading] = useState(true);
    
    useEffect(() => {
        axios.get(`/api/checkingAuthenticated`).then(res=>{
                if (res.status===200) {
                    setAuthenticated(true);
                }
                setloading(false);
        });

        return () => {
            setAuthenticated(false);
        };
    }, []);
    //to direct to login, when the user isn't authenticated, to not loading 
    //undefined :will check for format error
    axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
        //401(unauthorized) is the error that is being thrown when the user isn't authenticated
            if(err.response.status===401){
                 swal("Unauthorized",err.response.data.message,"warning");
                 history.push('/');
            }
            return Promise.reject(err);
    });
    //to send message when a user that is not admin is try to acess admin pages from url.
    axios.interceptors.response.use(function(response){
            return response;
        },function(error){
            //formatin 403 error, the type of error that is thrown from 
            //laravel in ApiAdminMiddler when the user is not admin, access denied
            if (error.response.status===403) {
                swal("Forbidden",error.response.data.message,"warning");
                history.push('/403');
            }
            else if (error.response.status===404) {//page not found
                swal("404 error ","url/page not found",'warning');
                history.push('/404');
            }
            return Promise.reject(error);
            
        }
    );

   if (loading) {
       return <h1>Loading...</h1>
   }

    return(
        <Route {...rest}
        //to render all the datas and components
            render={ ({props,location}) =>
                Authenticated?   
                // localStorage.getItem('auth_token')?   
                (<MasterLayout {...props} />):
                (<Redirect to={{pathname: "/login",state:{from:location} }} />)
            }

        />
    );
    

}

export default AdminPrivateRoute;