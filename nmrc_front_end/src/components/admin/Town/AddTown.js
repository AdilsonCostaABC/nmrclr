import swal from 'sweetalert';
import React, { useState,useEffect} from 'react';
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

function AddTown() {

    const [regionList,setregionList] = useState([]);
    useEffect(() => {
        axios.get('/api/view-region').then(res=>{
            if (res.data.status===200) {
                setregionList(res.data.region);
            }
        });
    }, []);

    const [townInput, settownInput] = useState({
        name: '',
        region_id:'',
        error_list: [],

    });

    const handleInput = (e) => {
        // e.persist();
        settownInput({ ...townInput, [e.target.name]: e.target.value })

    }

    const submitTown = (e) => {
        e.preventDefault();
        const data = {
            name: townInput.name,
            region_id: townInput.region_id,
            updated_by: localStorage.getItem('auth_name'),
        }
            console.log(data);
        axios.post(`/api/store-town`, data).then(res => {
            console.log(localStorage.getItem('email'));
            console.log('hello');
            if (res.data.status === 200) {
                console.log('api yes');
                swal({
                    title: "Adding Town",
                    text: res.data.message,
                    icon: "success",
                    button: "ok",
                });
                settownInput({...townInput,
                    name:'',
                    region_id:'',
                    error_list:[],
                });
                  
                document.getElementById('TOWN').reset();
            } else if (res.data.status === 400) {
                settownInput({ ...townInput, error_list: res.data.errors });
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
                    <h4 className="text-white">Add Town
                    <Link style={{ textDecoration: 'none' }} to="/admin/view-town" className="float-end">
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
                    <form onSubmit={submitTown} id="TOWN">
                        <div className="tab-content" id="myTabContent">
                            <div className="row ">
                                <div className="col-md-3 form-group mb-3">
                                    <TextField
                                        id="name"
                                        label="name" 
                                        variant="standard"
                                        type="text"
                                        autoComplete="name"
                                        name="name"
                                        onChange={handleInput}
                                        value={townInput.name}
                                        color="warning"
                                        margin="normal"
                                        required
                                        fullWidth
                                        autoFocus
                                    /> 
                                    <span className="text-danger">{townInput.error_list.name}</span>
                                </div>
                                <div className="col-md-3 form-group mb-3">
                                <FormControl variant="standard" sx={{ m: 2, minWidth: 250 }}>
                                    <InputLabel style={{ color: '#e63946' }}  id="region_id">Region</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-standard-label"
                                        id="region_id"
                                        name="region_id"
                                        type="text"
                                        value={townInput.region_id}
                                        onChange={handleInput}
                                        label="Country"
                                        color="warning"
                                        margin="normal"
                                        required
                                        fullWidth
                                        autoFocus
                                        style={{width:"150px"}}
                                    >
                                        {
                                                regionList.map((item)=>{
                                                    return(
                                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                                    )
                                                })
                                            }
    
                                    </Select>
                                </FormControl>
                                    {/* <span className="text-danger">{townInput.error_list.name}</span> */}
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
export default AddTown;