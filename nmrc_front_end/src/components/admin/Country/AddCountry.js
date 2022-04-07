// import React from 'react';
// import axios from 'axios';
import swal from 'sweetalert';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import {
    makeStyles,
} from "@material-ui/core";
import Button from '@mui/material/Button';

function AddCountry() {
    const [CountryInput, setCountryInput] = useState({
        name: '',
        error_list: [],

    });

    const handleInput = (e) => {
        e.persist();
        setCountryInput({ ...CountryInput, [e.target.name]: e.target.value })

    }

    const submitCountry = (e) => {
        e.preventDefault();
        const data = {
            name: CountryInput.name,
            updated_by: localStorage.getItem('auth_name'),
        }

        axios.post(`/api/store-country`, data).then(res => {
            console.log(localStorage.getItem('email'));
            console.log('hello');
            if (res.data.status === 200) {
                console.log('api yes');
                swal({
                    title: "Adding Country",
                    text: res.data.message,
                    icon: "success",
                    button: "ok",
                });
                setCountryInput({...CountryInput,
                    name:'',
                    error_list:[],
                });
                  
                document.getElementById('COUNTRY').reset();
            } else if (res.data.status === 400) {
                setCountryInput({ ...CountryInput, error_list: res.data.errors });
            }
        });

    }

    const useStyles = makeStyles((theme) => ({

        TextField: {
            color: "#a2d2ff",
        }

    }));

    return (
        <div className="container-fluid px-4 py-5">

            <div className="card mt-4">
                <div className="card-header bg-danger">
                    <h4 className="text-white">Add country
                    <Link style={{ textDecoration: 'none' }} to="/admin/view-country" className="float-end">
                        <Button
                            type=""
                            fullWidth
                            variant="contained"
                            sx={{ background: '#00022E', mt: 0, mb: 2, '&:hover': { background: 'white', color:'#00022E' } }}
                        >
                            View
                        </Button>
                        
                    </Link></h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitCountry} id="COUNTRY">
                        <div className="tab-content" id="myTabContent">
                            <div className="row ">
                                <div className="col-md-3 form-group mb-3">
                                    <TextField
                                        id="name"
                                        label="Country name" 
                                        variant="standard"
                                        type="text"
                                        autoComplete="current-password"
                                        name="name"
                                        onChange={handleInput}
                                        value={CountryInput.name}
                                        color="warning"
                                        margin="normal"
                                        required
                                        fullWidth
                                        autoFocus
                                    /> 
                                    <span className="text-danger">{CountryInput.error_list.name}</span>
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
export default AddCountry;