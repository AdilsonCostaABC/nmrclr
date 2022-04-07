import swal from 'sweetalert';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import {
    makeStyles,
} from "@material-ui/core";
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

function AddPharmacist() {



    const [pharmacistInput, setpharmacistInput] = useState({

        first_name: '',
        last_name: '',
        tel_no: '',
        mobile_no: '',
        email: '',
        updated_by: '',
        error_list: [],

    });

    const handleInput = (e) => {
        // e.persist();
        setpharmacistInput({ ...pharmacistInput, [e.target.name]: e.target.value })

    }

    const submitPharmacist = (e) => {
        e.preventDefault();
        const data = {
          
            first_name:pharmacistInput.first_name,
            last_name:pharmacistInput.last_name,
            tel_no: pharmacistInput.tel_no,
            mobile_no: pharmacistInput.mobile_no,
            email: pharmacistInput.email,
            updated_by: localStorage.getItem('auth_name'),
        }
        console.log(data);
        axios.post(`/api/store-pharmacist`, data).then(res => {
            console.log(localStorage.getItem('email'));
            console.log('hello');
            if (res.data.status === 200) {
                console.log('api yes');
                swal({
                    title: "Adding Pharmacist",
                    text: res.data.message,
                    icon: "success",
                    button: "ok",
                });
                setpharmacistInput({
                    ...pharmacistInput,
                    first_name: '',
                    last_name: '',
                    tel_no: '',
                    mobile_no: '',
                    email: '',
                    updated_by: '',
                    error_list: [],
                    });

                document.getElementById('PHARMACIST').reset();
            } else if (res.data.status === 400) {
                setpharmacistInput({ ...pharmacistInput, error_list: res.data.errors });
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
                    <h4 className="text-white">Add Pharmacist
                        <Link style={{ textDecoration: 'none' }} to="/admin/view-pharmacist" className="float-end">
                            <Button
                                type=""
                                fullWidth
                                variant="contained"
                                sx={{ background: '#00022E', mt: 0, mb: 2, '&:hover': { background: 'white', color: '#00022E' } }}
                            >
                                View
                            </Button>

                        </Link></h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitPharmacist} id="PHARMACIST">
                        <div className="tab-content" id="myTabContent">
                            <div className="row ">
                                <div className="col-md-3 form-group mb-3">
                                    <FormControl variant="standard" sx={{ ml: 5, minWidth: 250 }}>
                                        <TextField
                                            id="first_name"
                                            label="First Name"
                                            variant="standard"
                                            type="text"
                                            autoComplete="first name"
                                            name="first_name"
                                            onChange={handleInput}
                                            value={pharmacistInput.first_name}
                                            color="warning"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoFocus
                                            sx={{ minWidth: 400 }}
                                        />
                                        <span className="text-danger">{pharmacistInput.error_list.first_name}</span>
                                    </FormControl>
                                    
                                    {/* <span className="text-danger">{pharmacistInput.error_list.name}</span> */}
                                    <FormControl variant="standard" sx={{ mt: 1, ml: 5, minWidth: 250 }}>
                                        <TextField
                                            id="tel_no"
                                            label="Tel No"
                                            variant="standard"
                                            type="text"
                                            autoComplete="tel no"
                                            name="tel_no"
                                            onChange={handleInput}
                                            value={pharmacistInput.tel_no}
                                            color="warning"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoFocus
                                            sx={{ minWidth: 400 }}
                                        />
                                        <span className="text-danger">{pharmacistInput.error_list.tel_no}</span>
                                    </FormControl>

                                    <FormControl variant="standard" sx={{ ml: 5, minWidth: 250 }}>

                                        <TextField
                                            id="email"
                                            label="Email"
                                            variant="standard"
                                            type="text"
                                            autoComplete="email"
                                            name="email"
                                            onChange={handleInput}
                                            value={pharmacistInput.email}
                                            color="warning"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoFocus
                                            sx={{ minWidth: 400 }}
                                        />
                                        <span className="text-danger">{pharmacistInput.error_list.email}</span>
                                    </FormControl>


                                    <span className="text-danger">{pharmacistInput.error_list.email}</span>



                                </div>
                                <br />

                                <div className="col-md-3 form-group mb-3">

                                    <FormControl variant="standard" sx={{ ml: 30, minWidth: 250 }}>

                                        <TextField
                                            id="last_name"
                                            label="Last Name"
                                            variant="standard"
                                            type="text"
                                            autoComplete="last name"
                                            name="last_name"
                                            onChange={handleInput}
                                            value={pharmacistInput.last_name}
                                            color="warning"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoFocus
                                            sx={{ minWidth: 400 }}
                                        />
                                        <span className="text-danger">{pharmacistInput.error_list.last_name}</span>
                                    </FormControl>

                                        
                                    <FormControl variant="standard" sx={{mt:1, ml: 30, minWidth: 250 }}>

                                        <TextField
                                            id="mobile_no"
                                            label="Mobile No"
                                            variant="standard"
                                            type="text"
                                            autoComplete="mobile no"
                                            name="mobile_no"
                                            onChange={handleInput}
                                            value={pharmacistInput.mobile_no}
                                            color="warning"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoFocus
                                            sx={{ minWidth: 400 }}
                                        />
                                        <span className="text-danger">{pharmacistInput.error_list.mobile_no}</span>
                                    </FormControl>
                                    

                                    
                                </div>



                            </div>
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ background: '#00022E', mt: 3, mb: 2, '&:hover': { background: '#323457' } }}
                        >
                            Save
                        </Button>
                        <Button
                            type="reset"
                            fullWidth
                            variant="contained"
                            sx={{ background: '#00022E', mt: 0, mb: 2, '&:hover': { background: '#323457' } }}
                        >
                            Cancel
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddPharmacist;