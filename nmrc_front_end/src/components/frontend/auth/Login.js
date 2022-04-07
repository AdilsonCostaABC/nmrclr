
import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router';
import '../../../index.css';
import Icon from '@material-ui/core/Icon';


function Login(){ 
    
    const history=useHistory();
    const [loginInput, setLogin] = useState({
        'email':'',
        'password':'', 
        'error_list':[],
    });

    const handleInput=(e) =>{
        e.persist();
        setLogin({...loginInput,[e.target.name ]:e.target.value});

    }
    
    const loginSubmit=(e)=>{
        e.preventDefault();
        const data={
            email:loginInput.email,
            password:loginInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post(`api/login`,data).then(res =>{
                        if (res.data.status===400 ) {
                            localStorage.setItem('auth_token',res.data.token);
                            localStorage.setItem('auth_name',res.data.username);
                            localStorage.setItem('email',res.data.email);
                            swal({
                                title: "Login",
                                text:res.data.message,
                                icon: "success",
                                button: "ok",
                              });
                              //checking if the user is admin or normal user
                              if (res.data.role==='admin') {
                                   history.push('/admin/dashboard');
                              } else {
                                history.push('/');
                              }
                            
                        } else if(res.data.status===300){
                            swal({
                                title: "Credentials",
                                text:res.data.message,
                                icon: "warning",
                                button: "ok",
                              });
                        }
                        else{
                            setLogin({...loginInput,error_list:res.data.validations_errors});
                        }

                    });
        });            

    }

    return(
        <div className="Im">
            <Navbar />
            <div className="container py-5 " id="OP" >
                <div className="row justify-content-center ">
                    <div className="col-md-6 " >
                        <div className="card "  id="loginBgColor" >
                            <div className="card-header" id="H">
                                    LOGIN
                            </div>   
                            <div className="card-body"  >
                        
                                <form onSubmit={loginSubmit} > 
                                    <div className="BoxesLongin">
                                        <div className="wrap-input100">
                                        
                                            <input type="email" name="email"  onChange={handleInput}  value={loginInput.email} placeholder="Email address"  className="input100"  />
                                            
                                            <span class="symbol-input100">
                                                <Icon  fontSize="medium" fontcolor="blue" >email </Icon>
                                            </span>
                                            
                                        </div>
                                       <span className="text-danger">{loginInput.error_list.email}</span>
                                    </div>
                                    
                                     <div>
                                        <div className="wrap-input100">
                                            <input  type="password" name="password" onChange={handleInput}  value={loginInput.password}  placeholder="password" className="input100"  />
                                            <span class="symbol-input100">
                                                <Icon  fontSize="medium">lock</Icon>
                                            </span>
                                            
                                        </div>
                                        <span className="text-danger">{loginInput.error_list.password}</span>
                                     </div>
                                    
                                   
                                    <div className="container-login100-form-btn">
                                         <button type="submit" className="login100-form-btn" >Sign In</button> 
                                    </div>
                                </form>
                            </div>
                        
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
    
    );
}

export default Login;