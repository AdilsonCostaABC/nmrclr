// import React from 'react';
// import axios from 'axios';
import swal from 'sweetalert';
import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import { makeStyles } from '@material-ui/core';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';




function AddCompany() {

    const [value, setValue] = React.useState(new Date());
    const [townList,settownList] = useState([]);
    useEffect(() => {
        axios.get('/api/view-town').then(res=>{
            if (res.data.status===200) {
                settownList(res.data.town);
            }
        });
    }, []);

    const [companyInput, setcompanyInput] = useState({
            comp_reg_no:'',  
            comp_name:'',
            appl_ref_no:'',
            postal_address:'',
            physical_address:'',
            contact_person:'',
            tel_no:'',
            mobile_no:'',
            email:'',
            town_id:'',
            reg_date:'',
            tin:'',
            // 'num_apply',
             error_list: [],

    });

    const handleInput = (e) => {
        // e.persist();
        setcompanyInput({ ...companyInput, [e.target.name]: e.target.value })

    }

    const submitCompany = (e) => {
        e.preventDefault();
        const data = {
            comp_reg_no:companyInput.comp_reg_no,  
            comp_name:companyInput.comp_name,
            appl_ref_no:companyInput.appl_ref_no,
            postal_address:companyInput.postal_address,
            physical_address:companyInput.physical_address,
            contact_person:companyInput.contact_person,
            tel_no:companyInput.tel_no,
            mobile_no:companyInput.mobile_no,
            email:companyInput.email,
            town_id:companyInput.town_id,
            // reg_date:companyInput.reg_date,
            reg_date:value,
            tin:companyInput.tin,
            updated_by: localStorage.getItem('auth_name'),
        }
            console.log(data);
        axios.post(`/api/store-company`, data).then(res => {
            console.log(localStorage.getItem('email'));
            console.log('hello');
            if (res.data.status === 200) {
                console.log('api yes');
                swal({
                    title: "Adding Company",
                    text: res.data.message,
                    icon: "success",
                    button: "ok",
                });
                setcompanyInput({...companyInput,
                    comp_reg_no:'',  
                    comp_name:'',
                    appl_ref_no:'',
                    postal_address:'',
                    physical_address:'',
                    contact_person:'',
                    tel_no:'',
                    mobile_no:'',
                    email:'',
                    town_id:'',
                    reg_date:'',
                    tin:'',
                    // 'num_apply',
                    error_list: [],
                });
                  
                document.getElementById('COMPANY').reset();
            } else if (res.data.status === 400) {
                setcompanyInput({ ...companyInput, error_list: res.data.errors });
            }
        });

    }
    
    // const classes = useStyles();
    return (
        <div className="container-fluid px-4 py-0">

            <div className="card mt-4">
                <div className="card-header bg-danger">
                    <h4 className="text-white">Add Company
                    <Link style={{ textDecoration: 'none' }} to="/admin/view-workplan" className="float-end">
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
                    <form onSubmit={submitCompany} id="COMPANY">
                        <div className="tab-content" id="myTabContent">
                            <div className="row ">
                                <div className="col-md-3 form-group mb-3">
                                        <FormControl variant="standard" sx={{ mt:-3, minWidth: 290 }}>
                                            <TextField
                                                id="comp_reg_no"
                                                label="Company Registration No" 
                                                variant="standard"
                                                type="text"
                                                autoComplete="company registration no"
                                                name="comp_reg_no"
                                                onChange={handleInput}
                                                value={companyInput.comp_reg_no}
                                                color="warning"
                                                margin="normal"
                                                required
                                                fullWidth
                                                autoFocus
                                                /> 
                                        </FormControl>
                                        <span className="text-danger">{companyInput.error_list.comp_reg_no}</span>
                                    
                                        
                                        <FormControl variant="standard" sx={{mt:0, minWidth: 290 }}>
                                            <TextField
                                                    id="postal_address"
                                                    label="Postal Address" 
                                                    variant="standard"
                                                    type="text"
                                                    autoComplete="postal address"
                                                    name="postal_address"
                                                    onChange={handleInput}
                                                    value={companyInput.postal_address}
                                                    color="warning"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    autoFocus
                                                    /> 
                                        </FormControl>
                                        <span className="text-danger">{companyInput.error_list.postal_address}</span>
                                    
                                         <FormControl variant="standard" sx={{ mt:0, minWidth: 290 }}>
                                            <TextField
                                                    id="tel_no"
                                                    label="Tel No" 
                                                    variant="standard"
                                                    type="text"
                                                    autoComplete=""
                                                    name="tel_no"
                                                    onChange={handleInput}
                                                    value={companyInput.tel_no}
                                                    color="warning"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    autoFocus
                                                    /> 
                                         </FormControl>
                                         <span className="text-danger">{companyInput.error_list.tel_no}</span>

                                     
                                         <FormControl variant="standard" sx={{ mt:6,minWidth: 290 }}>
                                                <InputLabel style={{ color: '#e63946' }}  id="region_id">Town</InputLabel>
                                                <Select
                                                    // labelId="demo-simple-select-standard-label"
                                                    id="town_id"
                                                    name="town_id"
                                                    type="text"
                                                    value={companyInput.town_id}
                                                    onChange={handleInput}
                                                    label="Town"
                                                    color="warning"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    autoFocus
                                                    style={{width:"290px"}}
                                                >
                                                    {
                                                            townList.map((item)=>{
                                                                return(
                                                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                                                )
                                                            })
                                                        }
                
                                                </Select>
                                             <span className="text-danger">{companyInput.error_list.town_id}</span>
                                        </FormControl>
                                       
                                </div>

                                <br/>
                                <div className="col-md-3 form-group mb-3">
                                        <FormControl variant="standard" sx={{ mt:-3,ml:9.5, minWidth: 290 }}>
                                            <TextField
                                                id="comp_name"
                                                label="Company Name" 
                                                variant="standard"
                                                type="text"
                                                autoComplete="company name"
                                                name="comp_name"
                                                onChange={handleInput}
                                                value={companyInput.comp_name}
                                                color="warning"
                                                margin="normal"
                                                required
                                                fullWidth
                                                autoFocus
                                                /> 
                                        </FormControl>
                                        <span className="text-danger">{companyInput.error_list.comp_name}</span>
                                    
                                        
                                        <FormControl variant="standard" sx={{mt:0,ml:9.5,minWidth: 290 }}>
                                            <TextField
                                                    id="physical_address"
                                                    label="Physical Address" 
                                                    variant="standard"
                                                    type="text"
                                                    autoComplete="physical address"
                                                    name="physical_address"
                                                    onChange={handleInput}
                                                    value={companyInput.physical_address}
                                                    color="warning"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    autoFocus
                                                    /> 
                                        </FormControl>
                                        <span className="text-danger">{companyInput.error_list.physical_address}</span>
                                    
                                         <FormControl variant="standard" sx={{ mt:0,ml:9.5, minWidth: 290 }}>
                                            <TextField
                                                    id="mobile_no"
                                                    label="Mobile No" 
                                                    variant="standard"
                                                    type="text"
                                                    autoComplete="mobile no"
                                                    name="mobile_no"
                                                    onChange={handleInput}
                                                    value={companyInput.mobile_no}
                                                    color="warning"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    autoFocus
                                                    /> 
                                         </FormControl>
                                         <span className="text-danger">{companyInput.error_list.mobile_no}</span>

                                     
                                         <FormControl variant="standard" sx={{ mt:4,ml:9.5, minWidth: 290 }}>
                                                <TextField
                                                    id="tin"
                                                    label="Tin" 
                                                    variant="standard"
                                                    type="text"
                                                    autoComplete="tin"
                                                    name="tin"
                                                    onChange={handleInput}
                                                    value={companyInput.tin}
                                                    color="warning"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    autoFocus
                                                    /> 
                                             <span className="text-danger">{companyInput.error_list.tin}</span>
                                                       
                                        </FormControl>
                                       
                                </div>

                                <br/>
                                <div className="col-md-3 form-group mb-3">
                                        <FormControl variant="standard" sx={{ mt: -3,ml:19.5, minWidth:290 }}>
                                            <TextField
                                                id="appl_ref_no"
                                                label="Applied Reference No" 
                                                variant="standard"
                                                type="text"
                                                autoComplete="applied reference no"
                                                name="appl_ref_no"
                                                onChange={handleInput}
                                                value={companyInput.appl_ref_no}
                                                color="warning"
                                                margin="normal"
                                                required
                                                fullWidth
                                                autoFocus
                                                /> 
                                        </FormControl>
                                        <span className="text-danger">{companyInput.error_list.appl_ref_no}</span>
                                    
                                        
                                        <FormControl variant="standard" sx={{mt:0,ml:19.5,minWidth:290 }}>
                                            <TextField
                                                    id="contact_person"
                                                    label="Contact Person" 
                                                    variant="standard"
                                                    type="text"
                                                    autoComplete="contact person"
                                                    name="contact_person"
                                                    onChange={handleInput}
                                                    value={companyInput.contact_person}
                                                    color="warning"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    autoFocus
                                                    /> 
                                        </FormControl>
                                        <span className="text-danger">{companyInput.error_list.contact_person}</span>
                                    
                                         <FormControl variant="standard" sx={{ mt:0,ml:19.5, minWidth: 290 }}>
                                            <TextField
                                                    id="email"
                                                    label="Email" 
                                                    variant="standard"
                                                    type="text"
                                                    autoComplete="email"
                                                    name="email"
                                                    onChange={handleInput}
                                                    value={companyInput.email}
                                                    color="warning"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    autoFocus
                                                    /> 
                                         </FormControl>
                                         <span className="text-danger">{companyInput.error_list.email}</span>

                                     
                                         <FormControl variant="standard" sx={{ mt:5,ml:19.5, minWidth: 290 }}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    {/* <TextField 
                                                        type="date"
                                                        color="warning"
                                                        name="iniDate"
                                                        value={workplanInput.iniDate}
                                                        onChange={event => setQuery(event.target.value)}
                                                        
                                                    />  */}
                                                      <DatePicker
                                                        disableFuture
                                                        label="Registration Date"
                                                        name="reg_date"
                                                        openTo="year"
                                                        views={['year', 'month', 'day']}
                                                        value={value}
                                                        onChange={(newValue) => {
                                                            setValue(newValue);
                                                        }}
                                                        renderInput={(params) => <TextField color="warning" {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                    <span className="text-danger">{companyInput.error_list.reg_date}</span>

                                                
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
export default AddCompany;