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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
function AddSupplier() {

    const [townList,settownList] = useState([]);
    useEffect(() => {
        axios.get('/api/view-town').then(res=>{
            if (res.data.status===200) {
                settownList(res.data.town);
            }
        });
    }, []);

    const [supplierInput, setsupplierInput] = useState({
        
        company_name: '',
        physical_address: '',
        town_id: '',
        contact_person: '',
        tel_no: '',
        mobile_no: '',
        email: '',
        status: '',
        updated_by: '',
        error_list: [],

    });

    const handleInput = (e) => {
        // e.persist();
        setsupplierInput({ ...supplierInput, [e.target.name]: e.target.value })

    }

    const submitSupplier = (e) => {
        e.preventDefault();
        const data = {
            company_name: supplierInput.company_name,
            physical_address:supplierInput.physical_address,
            town_id:supplierInput.town_id,
            contact_person:supplierInput.contact_person,
            tel_no:supplierInput.tel_no,
            mobile_no:supplierInput.mobile_no,
            email:supplierInput.email,
            status:supplierInput.status,
            updated_by: localStorage.getItem('auth_name'),
        }
            console.log(data);
        axios.post(`/api/store-supplier`, data).then(res => {
            console.log(localStorage.getItem('email'));
            console.log('hello');
            if (res.data.status === 200) {
                console.log('api yes');
                swal({
                    title: "Adding Supplier",
                    text: res.data.message,
                    icon: "success",
                    button: "ok",
                });
                setsupplierInput({...supplierInput,
                    company_name: '',
                    physical_address: '',
                    town_id: '',
                    contact_person: '',
                    tel_no: '',
                    mobile_no: '',
                    email: '',
                    status: '',
                    updated_by: '',
                    error_list: [],
                });
                  
                document.getElementById('SUPPLIER').reset();
            } else if (res.data.status === 400) {
                setsupplierInput({ ...supplierInput, error_list: res.data.errors });
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
                    <h4 className="text-white">Add Supplier
                    <Link style={{ textDecoration: 'none' }} to="/admin/view-supplier" className="float-end">
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
                    <form onSubmit={submitSupplier} id="SUPPLIER">
                        <div className="tab-content" id="myTabContent">
                            <div className="row ">
                                <div className="col-md-3 form-group mb-3">
                                    <FormControl variant="standard" sx={{ ml:5,minWidth: 250 }}>
                                        <TextField
                                            id="company_name"
                                            label="Company/Business Name" 
                                            variant="standard"
                                            type="text"
                                            autoComplete="company name"
                                            name="company_name"
                                            onChange={handleInput}
                                            value={supplierInput.company_name}
                                            color="warning"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoFocus
                                            sx={{minWidth: 400 }}
                                        /> 
                                        <span className="text-danger">{supplierInput.error_list.company_name}</span>
                                    </FormControl>
                                    <FormControl variant="standard" sx={{ mt:1,ml:5, minWidth: 250 }}>
                                        <InputLabel style={{ color: '#e63946' }}  id="region_id">Town</InputLabel>
                                        <Select
                                            // labelId="demo-simple-select-standard-label"
                                            id="town_id"
                                            name="town_id"
                                            type="text"
                                            value={supplierInput.town_id}
                                            onChange={handleInput}
                                            label="Town"
                                            color="warning"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoFocus
                                            style={{width:"400px"}}
                                        >
                                            {
                                                    townList.map((item)=>{
                                                        return(
                                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                                        )
                                                    })
                                                }
        
                                        </Select>
                                    </FormControl>
                                    {/* <span className="text-danger">{supplierInput.error_list.name}</span> */}
                                    <FormControl variant="standard" sx={{ mt: 1,ml:5, minWidth: 250 }}>
                                        <TextField
                                            id="tel_no"
                                            label="Tel No" 
                                            variant="standard"
                                            type="text"
                                            autoComplete="tel no"
                                            name="tel_no"
                                            onChange={handleInput}
                                            value={supplierInput.tel_no}
                                            color="warning"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoFocus
                                            sx={{minWidth: 400 }}
                                        /> 
                                        <span className="text-danger">{supplierInput.error_list.tel_no}</span>
                                    </FormControl>
                                    
                                    <FormControl variant="standard" sx={{ml:5, minWidth: 250 }}>

                                        <TextField
                                            id="email"
                                            label="Email" 
                                            variant="standard"
                                            type="text"
                                            autoComplete="email"
                                            name="email"
                                            onChange={handleInput}
                                            value={supplierInput.email}
                                            color="warning"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoFocus
                                            sx={{minWidth: 400}}
                                        /> 
                                        <span className="text-danger">{supplierInput.error_list.email}</span>
                                    </FormControl>


{/* <span className="text-danger">{supplierInput.error_list.name}</span> */}
                                  
                                
                                    
                                </div>
                                <br/>

                                <div className="col-md-3 form-group mb-3">

                                <FormControl variant="standard" sx={{ml:30, minWidth: 250 }}>

                                    <TextField
                                        id="physical_address"
                                        label="Physical Address" 
                                        variant="standard"
                                        type="text"
                                        autoComplete="physical address"
                                        name="physical_address"
                                        onChange={handleInput}
                                        value={supplierInput.physical_address}
                                        color="warning"
                                        margin="normal"
                                        required
                                        fullWidth
                                        autoFocus
                                        sx={{minWidth: 400}}
                                    /> 
                                    <span className="text-danger">{supplierInput.error_list.physical_address}</span>
                          </FormControl>
                                    
                          <FormControl variant="standard" sx={{ mt: -1,ml:30, minWidth: 250 }}>

                            <TextField
                                id="contact_person"
                                label="Contact Person" 
                                variant="standard"
                                type="text"
                                autoComplete="contact person"
                                name="contact_person"
                                onChange={handleInput}
                                value={supplierInput.contact_person}
                                color="warning"
                                margin="normal"
                                required
                                fullWidth
                                autoFocus
                                sx={{minWidth: 400 }}
                            /> 
                            <span className="text-danger">{supplierInput.error_list.contact_person}</span>
                         </FormControl> 
                                
                                   

                                   
                                    <FormControl variant="standard" sx={{ml:30, minWidth: 250 }}>

                                        <TextField
                                            id="mobile_no"
                                            label="Mobile No" 
                                            variant="standard"
                                            type="text"
                                            autoComplete="mobile no"
                                            name="mobile_no"
                                            onChange={handleInput}
                                            value={supplierInput.mobile_no}
                                            color="warning"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoFocus
                                            sx={{minWidth: 400}}
                                        /> 
                                        <span className="text-danger">{supplierInput.error_list.mobile_no}</span>
                                    </FormControl>
                                   
                                    <FormControl
                                        color="warning"
                                        
                                    >
                                            <FormLabel 
                                             sx={{ ml:10,mt:2}} >
                                                Status
                                            </FormLabel>
                                            <RadioGroup
                                      
                                                row
                                                name="status"
                                                onChange={handleInput}
                                                value={supplierInput.status}
                                                sx={{ ml:30,width:200}}    
                                            >
                                               
                                                <FormControlLabel   value="Active" control={<Radio  color="warning"/>} label="Active" />
                                                <FormControlLabel value="Inactive" control={<Radio color="warning" />} label="Inactive" />
                                                
                                            </RadioGroup>
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
export default AddSupplier;