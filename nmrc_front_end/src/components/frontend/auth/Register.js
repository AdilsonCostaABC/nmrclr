// import * as Yup from 'yup';
// import { useState } from 'react';
// import { Icon } from '@iconify/react';
// import { useFormik, Form, FormikProvider } from 'formik';
// import eyeFill from '@iconify/icons-eva/eye-fill';
// import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// // import { useNavigate } from 'react-router-dom';
// // material
// import '../../../index.css';
// import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
// import { LoadingButton } from '@mui/lab';

// // ----------------------------------------------------------------------
// import illustration_register from './illustration_register.png';
// export default function RegisterForm() {
//   // const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const RegisterSchema = Yup.object().shape({
//     firstName: Yup.string()
//       .min(2, 'Too Short!')
//       .max(50, 'Too Long!')
//       .required('First name required'),
//     lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
//     email: Yup.string().email('Email must be a valid email address').required('Email is required'),
//     password: Yup.string().required('Password is required')
//   });

//   const formik = useFormik({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: ''
//     },
//     validationSchema: RegisterSchema,
//     onSubmit: () => {

//       // navigate('/dashboard', { replace: true });
//     }
//   });

//   const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

//   return (
//     <div className="Imr">  
    
//          <div className="container py-5  " id="OPr">
//              <div className="row justify-content-center Size">
//                  <div className="col-md-6">
//                       <div style={{width:'200px',height:'200px'}}>
//                         <img alt="register" src={illustration_register} />
//                       </div>
//                      {/* <div className="card" id="RegisterBgColor">                         */}
//                      <div className="card" >  
                                        
//                          <div className="form-icon">
//                                  <span><i className="icon icon-user"></i></span>
//                          </div>
//                          <div className="card-body">
//                          <div id="Title">REGISTER</div>

//                                                 <FormikProvider value={formik}>
                                                    
//                                                   <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
//                                                     <Stack spacing={3}>
//                                                       <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//                                                         <TextField
//                                                           fullWidth
//                                                           label="First name"
//                                                           {...getFieldProps('firstName')}
//                                                           error={Boolean(touched.firstName && errors.firstName)}
//                                                           helperText={touched.firstName && errors.firstName}
//                                                         />

//                                                         <TextField
//                                                           fullWidth
//                                                           label="Last name"
//                                                           {...getFieldProps('lastName')}
//                                                           error={Boolean(touched.lastName && errors.lastName)}
//                                                           helperText={touched.lastName && errors.lastName}
//                                                         />
//                                                       </Stack>

//                                                       <TextField
//                                                         fullWidth
//                                                         autoComplete="username"
//                                                         type="email"
//                                                         label="Email address"
//                                                         {...getFieldProps('email')}
//                                                         error={Boolean(touched.email && errors.email)}
//                                                         helperText={touched.email && errors.email}
//                                                       />

//                                                       <TextField
//                                                         fullWidth
//                                                         autoComplete="current-password"
//                                                         type={showPassword ? 'text' : 'password'}
//                                                         label="Password"
//                                                         {...getFieldProps('password')}
//                                                         InputProps={{
//                                                           endAdornment: (
//                                                             <InputAdornment position="end">
//                                                               <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
//                                                                 <Icon icon={showPassword ? eyeFill : eyeOffFill} />
//                                                               </IconButton>
//                                                             </InputAdornment>
//                                                           )
//                                                         }}
//                                                         error={Boolean(touched.password && errors.password)}
//                                                         helperText={touched.password && errors.password}
//                                                       />

//                                                       <LoadingButton
//                                                         fullWidth
//                                                         size="large"
//                                                         type="submit"
//                                                         variant="contained"
//                                                         loading={isSubmitting}
//                                                       >
//                                                         Register
//                                                       </LoadingButton>
//                                                     </Stack>
//                                                   </Form>
//                                                 </FormikProvider>
//                                                 </div>
                      
//                                            </div>
//                                        </div>
                      
//                                    </div>
                      
//                                </div>
//                            </div>
//     );


// }


import React,{useState} from 'react';
import axios from 'axios';

import Navbar from '../../../layouts/frontend/Navbar';
import swal from 'sweetalert';
import { useHistory } from 'react-router';
import '../../../index.css';
import Icon from '@material-ui/core/Icon';


 function Register(){ 
    const history=useHistory(); 

    const [registerInput, setRegister] = useState({

        name:'',
        email:'',
        password:'',
        phone_number:'',
        confirm_password:'',
        error_list:[],
    });
    const handleInput=(e)=>{
        e.persist();
        setRegister({...registerInput,[e.target.name]: e.target.value});
    }
    const registerSubmit=(e)=>{
        e.preventDefault();
        const data ={
            name:registerInput.name,
            email:registerInput.email,
            password:registerInput.password,
            phone_number:registerInput.phone_number,
            confirm_password:registerInput.confirm_password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            // Login...
            axios.post(`/api/register`,data).then(res=>{
            if (res.data.status===200) {
                // localStorage.setItem('auth_token',res.data.token);
                // localStorage.setItem('auth_name',res.data.username);
                swal({
                    title: "Registered",
                    text:res.data.message,
                    icon: "success",
                    button: "ok",
                  });
                  history.push('/login');}
            else if (res.data.status===100){
                swal({
                    title: "Passwords",
                    text:res.data.message,
                    icon: "warning",
                    button: "ok",
                  });
                   
            }     
            else {
                 setRegister({...registerInput,error_list:res.data.validations_errors})
            }

        });
        });
        
    }

    

    return(
        <div className="Imr">
        <Navbar />
        <div className="container py-5  " id="OPr">
            <div className="row justify-content-center Size">
                <div className="col-md-6 ">
                    <div className="card" id="RegisterBgColor">                        
                        <div className="form-icon">
                                <span><i className="icon icon-user"></i></span>
                        </div>
                        <div className="card-body">
                        <div id="Title">REGISTER</div>   
                            <form onSubmit={registerSubmit}>
                                    <div className="BoxesLongin">
                                        <div className="wrap-input100">
                                            
                                            <input type="text" name="name" onChange={handleInput}  value={registerInput.name}  placeholder="Full Name" className="input100"  />
                                            <span class="symbol-input100">
                                                    <Icon  fontSize="medium" fontcolor="blue" >person </Icon>
                                                </span>
                                        </div>
                                        <span className="text-danger">{registerInput.error_list.name}</span>
                                    </div>
                                    <div className="BoxesLongin">
                                        <div className="wrap-input100">
                                    
                                            <input type="email" name="email" onChange={handleInput} value={registerInput.email}  placeholder="Email Address" className="input100"  />
                                                <span class="symbol-input100">
                                                    <Icon  fontSize="medium" fontcolor="blue" >email </Icon>
                                                </span>
                                            
                                        </div>
                                        <span className="text-danger">{registerInput.error_list.email}</span>
                                    </div>
                               

                                    <div className="BoxesLongin">
                                       
                                        <div className="wrap-input100">
                                            {/* <label>Password</label> */}
                                            <input type="password" name="password" onChange={handleInput} value={registerInput.password}  placeholder="Password" className="input100" />
                                            <span class="symbol-input100">
                                                <Icon  fontSize="medium">lock</Icon>
                                            </span>
                                        </div>
                                        <span className="text-danger">{registerInput.error_list.password}</span>
                                    </div>    

                                    <div className="BoxesLongin"> 
                                        <div className="wrap-input100">
                                            {/* <label>Confirm Password</label> */}
                                            <input type="password" name="confirm_password" onChange={handleInput} value={registerInput.confirm_password}  placeholder="Confirm Password" className="input100"  />
                                            <span class="symbol-input100">
                                                <Icon  fontSize="medium">lock</Icon>
                                            </span>
                                        </div>
                                        <span className="text-danger">{registerInput.error_list.confirm_password}</span>
                                    </div>    
                               
                                    <div className="BoxesLongin"> 
                                        <div className="wrap-input100">
                                                   {/* <label>Email</label> */}
                                                     <input type="tel" name="phone_number" onChange={handleInput} value={registerInput.phone_number}  placeholder="Phone Number" className="input100" />
                                                     <span class="symbol-input100">
                                                         <Icon  fontSize="medium">phone</Icon>
                                                     </span>
                                         </div>
                                         <span className="text-danger">{registerInput.error_list.phone_number}</span>
                                     </div>    
                                
                                 <div className="container-login100-form-btn">
                                     <button type="submit" className="login100-form-btn" >Register</button>
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

export default Register;