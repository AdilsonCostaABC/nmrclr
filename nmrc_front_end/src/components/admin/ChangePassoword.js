// import React from 'react';
// import axios from 'axios';
import swal from 'sweetalert';
import React,{useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import {
      makeStyles,
    } from "@material-ui/core";
 import Button from '@mui/material/Button';

function ChangePassoword(){
    const [ChangePassInput, setChangePassInput] = useState({
        old_password:'',
        password:'',
        confirm_password:'',
        error_list:[],

    });

    const handleInput=(e)=>{
        e.persist();
        setChangePassInput({...ChangePassInput,[e.target.name]:e.target.value})

    }

    const submitChangePass=(e)=>{
        e.preventDefault();
        const data={
            old_password:ChangePassInput.old_password,
            password:ChangePassInput.password,
            confirm_password:ChangePassInput.confirm_password,
            email:localStorage.getItem('email'),
        }

        axios.post(`/api/change-password`,data).then(res=>{
            console.log(localStorage.getItem('email'));
            console.log('hello');
                if (res.data.status===400) {
                    console.log('api yes');
                    swal({
                        title: "Changing Password",
                        text:res.data.message,
                        icon: "success",
                        button: "ok",
                      });
                      document.getElementById('CHANGE_PASSWORD').reset();
                      
                } else if(res.data.status===300) {
                    swal({
                        title: "Old Password",
                        text:res.data.wrongOld_password,
                        icon: "warning",
                        button: "ok",
                      });
                      document.getElementById('CHANGE_PASSWORD').reset();
                } else if(res.data.status===100) {
                    swal({
                        title: "Passwords",
                        text:res.data.passwordDontMatch,
                        icon: "success",
                        button: "ok",
                      });
                      document.getElementById('CHANGE_PASSWORD').reset();
                } else if(res.data.status===422) {
                    setChangePassInput({...ChangePassInput,error_list:res.data.validations_errors});
                }
        });

    }
     
    const useStyles = makeStyles((theme) => ({

        TextField: { 
            color: "#a2d2ff",
          }
        
        }));

    return (
        // const classes = useStyles();
        <div className="container-fluid px-4 py-5">

            <div className="card mt-4">
                <div className="card-header bg-danger">
                        <h4 className="text-white">Change Password</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitChangePass} id="CHANGE_PASSWORD">
                            <div className="tab-content" id="myTabContent">
                                    <div className="row "> 
                                        <div className="col-md-3 form-group mb-3">
                                                <TextField
                                                    id="old_password"
                                                    label="Old password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    name="old_password"
                                                    onChange={handleInput} 
                                                    value={ChangePassInput.old_password}
                                                    color="warning"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    autoFocus
                                                
                                                 />
                                                <span className="text-danger">{ChangePassInput.error_list.old_password}</span>
                                        </div>
                                        <div className="col-md-3 form-group mb-3">
                                                <TextField
                                                    id="outlined-password-input"
                                                    label="Password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    name="password"
                                                    color="warning"
                                                    onChange={handleInput} 
                                                    value={ChangePassInput.password}
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    autoFocus
                                                 />
                                                <span className="text-danger">{ChangePassInput.error_list.password}</span>
                                        </div>
                                        <div className="col-md-3 form-group mb-3">
                                          <TextField
                                                id="outlined-password-input"
                                                label="Confirm password"
                                                type="password"
                                                color="warning"
                                                autoComplete="current-password"
                                                name="confirm_password"
                                                onChange={handleInput} 
                                                value={ChangePassInput.confirm_password}
                                                margin="normal"
                                                required
                                                fullWidth
                                                autoFocus
                                                sx={{ '&:focus': {border:'1px solid red'} }}
                                            />
                                            <span className="text-danger">{ChangePassInput.error_list.confirm_password}</span>
                                        </div>
                                    </div>
                            </div>        
                        {/* <button type="submit" className="btn btn-outline-primary px-4 ">submit</button>
                        <span>{"              "}</span>
                        <button type="reset"  className="btn btn-outline-primary px-4 ">Cancel</button> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ background: '#00022E',mt: 3, mb: 2, '&:hover': {background:'#323457'} }}
                        >
                            Save
                        </Button>
                        <Button
                            type="reset"
                            fullWidth
                            variant="contained"
                            sx={{ background: '#00022E',mt: 0, mb: 2, '&:hover': {background:'#323457'} }}
                        >
                            Cancel
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ChangePassoword;