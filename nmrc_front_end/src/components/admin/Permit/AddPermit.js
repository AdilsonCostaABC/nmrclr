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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import {makeStyles} from '@material-ui/core/styles';
// import { ClassNames } from '@emotion/react';
import {Avatar,Grid,TablePagination,TableFooter} from '@material-ui/core';
import Paper from '@mui/material/Paper';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';




function AddPermit() {

    var a=1;
    const [query, setQuery] = useState("");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const [value1, setValue1] = React.useState(new Date());
    const [value2, setValue2] = React.useState(new Date());
    const [value3, setValue3] = React.useState(new Date());
    
    
    
    
    const [schedule_lineList, setschedule_lineList] = useState([]);
    
    useEffect(() => {
        axios.get(`/api/view-schedule_line`).then(res=>{
            // console.log(res.data.feeding_plan);
            if (res.data.status===200) {
                setschedule_lineList(res.data.schedule_line);
            }
            // setloading(false);
        });
    }, []);

    const [points_of_entry_exitList,setpoints_of_entry_exitList] = useState([]);
    
    useEffect(() => {
        axios.get(`/api/view-points_of_entry_exit`).then(res=>{
                if (res.data.status===200) {
                    
                    setpoints_of_entry_exitList(res.data.points_of_entry_exit);
                }
        });
    }, []);

    const [companyList,setcompanyList] = useState([]);
    useEffect(() => {
        axios.get('/api/view-company').then(res=>{
            if (res.data.status===200) {
                setcompanyList(res.data.company);
            }
        });
    }, []);

    const [pharmacistList,setpharmacistList] = useState([]);
    useEffect(() => {
        axios.get('/api/view-pharmacist').then(res=>{
            if (res.data.status===200) {
                setpharmacistList(res.data.pharmacist);
            }
        });
    }, []);

    const [supplierList,setsupplierList] = useState([]);
    useEffect(() => {
        axios.get('/api/view-supplier').then(res=>{
            if (res.data.status===200) {
                setsupplierList(res.data.supplier);
            }
        });
    }, []);


    const [townList,settownList] = useState([]);
    useEffect(() => {
        axios.get('/api/view-town').then(res=>{
            if (res.data.status===200) {
                settownList(res.data.town);
            }
        });
    }, []);

    
    const [permitInput, setpermitInput] = useState({
            // check_digit:'',  
            // permit_no:'',
            permit_date:'',
            comp_id:'',
            sup_id:'',
            pharma_id:'',
            valid_from:'',
            valid_to:'',
            poe_id:'',
            purpose_use:'',
            schedule_id:'',
            schedule_line_id:'',
            prep_desc:'',
            unit_weight:'',
            uom_desc:'',
            x_line_qty:'',
            y_line_qty:'',
            total_weight:'',
            error_list: [],
    });

    const handleInput = (e) => {
        // e.persist();
        setpermitInput({ ...permitInput, [e.target.name]: e.target.value })
    }
   
    const [picture,setpicture] = useState([]);
    const handleImage = (e) => {
        // e.persist();
        setpicture({image:e.target.files[0]})
    }

    const submitSupportDocuments = (e) => {

    }
    
    const submitPermit = (e) => {
        e.preventDefault();
        const data = {
            
            // check_digit:permitInput.check_digit,
            // permit_no:permitInput.permit_no,
            permit_date:value3,
            comp_id:permitInput.comp_id,
            sup_id:permitInput.sup_id,
            pharma_id:permitInput.pharma_id,
            valid_from:value1,
            valid_to:value2,
            poe_id:permitInput.poe_id,
            purpose_use:permitInput.purpose_use,
            schedule_id:permitInput.schedule_id,
            
            updated_by:localStorage.getItem('auth_name'),
        }
            console.log(data);
        axios.post(`/api/store-permit`, data).then(res => {
            console.log(localStorage.getItem('email'));
            console.log('hello');
            if (res.data.status === 200) {
                console.log('api yes');
                // to store the id for line detail and support document
                localStorage.removeItem('permit_id');
                localStorage.setItem('permit_id',res.data.permitId);
                
                
                swal({
                    title: "Adding Permit",
                    text: res.data.message,
                    icon: "success",
                    button: "ok",
                });
                setpermitInput({...permitInput,
                    // check_digit:'',  
                    // permit_no:'',
                    permit_date:'',
                    comp_id:'',
                    sup_id:'',
                    pharma_id:'',
                    valid_from:'',
                    valid_to:'',
                    poe_id:'',
                    purpose_use:'',
                    error_list: [],
                });
                  
                document.getElementById('PERMIT').reset();
            } else if (res.data.status === 400) {
                setpermitInput({ ...permitInput, error_list: res.data.errors });
            }
        });



    }
    
    const [permit_lineList,setpermit_lineList] = useState([]);
    
    const SubmitPermit_line = (e) => {
        e.preventDefault();
        const data = {
            permit_id:localStorage.getItem('permit_id'),
            schedule_line_id:permitInput.schedule_line_id,
            prep_desc:permitInput.prep_desc,
            unit_weight:permitInput.unit_weight,
            uom_desc:permitInput.uom_desc,
            x_line_qty:permitInput.x_line_qty,
            y_line_qty:permitInput.y_line_qty,
            total_weight:permitInput.total_weight,
            updated_by:localStorage.getItem('auth_name'),
        }
            console.log(data);
        axios.post(`/api/store-permit_line`, data).then(res => {
            console.log(localStorage.getItem('email'));
            console.log('hello_permitline');
            if (res.data.status === 200) {
                console.log('api yes permitline');    
                setpermit_lineList(res.data.view_perrmit_line);
                swal({
                    title: "Adding Permit Line",
                    text: res.data.message,
                    icon: "success",
                    button: "ok",
                });

                setpermitInput({...permitInput,
                    schedule_id:'',
                    schedule_line_id:'',
                    prep_desc:'',
                    unit_weight:'',
                    uom_desc:'',
                    x_line_qty:'',
                    y_line_qty:'',
                    total_weight:'',
                    error_list: [],
                });

                
                  
                document.getElementById('PERMITLINE').reset();
            } else if (res.data.status === 400) {
                setpermitInput({ ...permitInput, error_list: res.data.errors });
            }
        });

        
    

    }

    // useEffect(() => {
    //     axios.get('/api/view-permit_line').then(res=>{
    //         if (res.data.status===200) {
    //             setpermit_lineList(res.data.permit_line);
    //         }
    //     });
    // }, []);
    
    // const classes = useStyles();
    return (
        <div className="container-fluid px-4 py-0">

            <div className="card mt-4">
                <div className="card-header bg-danger">
                    <h4 className="text-white">Add Permit Application</h4>
                </div>
                <div className="card-body">
                      <div className="tab-content " id="myTabContent">
                            <ul className="nav nav-tabs border-bottom-0" id="myTab" role="tablist">
                                
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active " id="home-tab" data-bs-toggle="tab" data-bs-target="#Step1" type="button" role="tab" aria-controls="home" aria-selected="true">
                                            <Button
                                                type=""
                                                fullWidth
                                                variant="contained"
                                                sx={{ background:'#00022E',mr:-2, ml:-2, mb: -2,mt:-3,width:'290px',height:'60px',borderRadius:'0PX', '&:hover': { background: '#DC3545', color:'WHITE' } }}
                                            >
                                                 Step 1: Permit Header Details
                                            </Button>
                                               
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#Step2" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">
                                                
                                                <Button
                                                type=""
                                                fullWidth
                                                variant="contained"
                                                sx={{ background: '#00022E',mr:-2, ml:-2, mb: -2,mt:-3,width:'290px',height:'60px',borderRadius:'0PX', '&:hover': { background: '#DC3545', color:'WHITE' } }}
                                                >
                                                 Step 2: Line Details
                                               </Button>
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#Step3" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">
                                                
                                                <Button
                                                type=""
                                                fullWidth
                                                variant="contained"
                                                sx={{ background:'#00022E',mr:-2, ml:-2, mb: -2,mt:-3,width:'290px',height:'60px',borderRadius:'0PX', '&:hover': { background: '#DC3545', color:'WHITE' } }}
                                                >
                                                 Step 3: Supporting Documents(Optional)
                                               </Button>
                                            </button>
                                        </li>
                                        
                                        
                            </ul>
                            <div className="tab-pane card-body fade show active" id="Step1" role="tabpanel" aria-labelledby="home-tab">
                                {/* <h1 className="Color">Step 1</h1> */}
                                <Button
                                    type=""
                                    fullWidth
                                    variant="contained"
                                    sx={{ background: '#00022E',mr:-2, ml:-13, mb: -2,mt:-3,width:'800px',height:'15px',borderRadius:'0PX', '&:hover': { background: '#DC3545 ', color:'WHITE' } }}
                                >
                                    Header Details
                                </Button>
                                <form onSubmit={submitPermit} id="PERMIT">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="row ">
                                            <div className="col-md-3 form-group mb-3">
                                                    {/* <FormControl variant="standard" sx={{ mt:-3, minWidth: 290 }}>
                                                        <TextField
                                                            id="check_digit"
                                                            label="Check digit" 
                                                            variant="standard"
                                                            type="text"
                                                            autoComplete="Check Digit"
                                                            // name="check_digit"
                                                            // onChange={handleInput}
                                                            // value={permitInput.check_digit}
                                                            color="warning"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            autoFocus
                                                            /> 
                                                    </FormControl> */}
                                                    {/* <span className="text-danger">{permitInput.error_list.check_digit}</span> */}
                                                
                                                    <FormControl variant="standard" sx={{ mt:1,minWidth: 290 }}>
                                                            <InputLabel style={{ color: '#e63946' }}  id="comp_id">Company</InputLabel>
                                                            <Select
                                                                // labelId="demo-simple-select-standard-label"
                                                                id="comp_id"
                                                                name="comp_id"
                                                                type="text"
                                                                value={permitInput.comp_id}
                                                                onChange={handleInput}
                                                                label="Company"
                                                                color="warning"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                autoFocus
                                                                style={{width:"290px"}}
                                                            >
                                                                {
                                                                        companyList.map((item)=>{
                                                                            return(
                                                                                <MenuItem value={item.id}>{item.comp_name}</MenuItem>
                                                                            )
                                                                        })
                                                                    }
                            
                                                            </Select>
                                                        <span className="text-danger">{permitInput.error_list.comp_id}</span>
                                                    </FormControl>
                                                    <FormControl variant="standard" sx={{ mt:4, minWidth: 290 }}>
                                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                                <DatePicker
                                                                    disablePast
                                                                    label="Valid from "
                                                                    name="valid_from"
                                                                    openTo="year"
                                                                    views={['year', 'month', 'day']}
                                                                    value={value1}
                                                                    onChange={(newValue) => {
                                                                        setValue1(newValue);
                                                                    }}
                                                                    renderInput={(params) => <TextField color="warning" {...params} />}
                                                                    />
                                                                </LocalizationProvider>
                                                                <span className="text-danger">{permitInput.error_list.valid_from}</span>

                                                                 
                                                    </FormControl>
                                                    <FormControl variant="standard" sx={{mt:3,minWidth: 290}}>
                                                        <TextField
                                                        id="outlined-multiline-static"
                                                        label="Purpose of use"
                                                        multiline
                                                        rows={3}
                                                        style={{width:"590px"}}
                                                        color="warning"
                                                        name="purpose_use"
                                                        type="text"
                                                        value={permitInput.purpose_use}
                                                        onChange={handleInput}
                                                        />
                                                     </FormControl>    
                                            </div>

                                            <br/>
                                            <div className="col-md-3 form-group mb-3">
                                                    {/* <FormControl variant="standard" sx={{ mt:-3,ml:9.5, minWidth: 290 }}>
                                                        <TextField
                                                            id="permit_no"
                                                            label="Permit No" 
                                                            variant="standard"
                                                            type="text"
                                                            autoComplete="Permit No"
                                                            // name="permit_no"
                                                            // onChange={handleInput}
                                                            // value={permitInput.permit_no}
                                                            color="warning"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            autoFocus
                                                            /> 
                                                    </FormControl> */}
                                                    {/* <span className="text-danger">{permitInput.error_list.permit_no}</span> */}
                                                
                                                    
                                                    <FormControl variant="standard" sx={{ ml:10,mt:1,minWidth: 290 }}>
                                                            <InputLabel style={{ color: '#e63946' }}  id="sup_id">Supplier</InputLabel>
                                                            <Select
                                                                // labelId="demo-simple-select-standard-label"
                                                                id="sup_id"
                                                                name="sup_id"
                                                                type="text"
                                                                value={permitInput.sup_id}
                                                                onChange={handleInput}
                                                                label="Supplier"
                                                                color="warning"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                autoFocus
                                                                style={{width:"290px"}}
                                                            >
                                                                {
                                                                        supplierList.map((item)=>{
                                                                            return(
                                                                                <MenuItem value={item.id}>{item.company_name}</MenuItem>
                                                                            )
                                                                        })
                                                                    }
                            
                                                            </Select>
                                                        <span className="text-danger">{permitInput.error_list.sup_id}</span>
                                                    </FormControl>
                                                
                                                    <FormControl variant="standard" sx={{ ml:10,mt:4, minWidth: 290 }}>
                                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                                <DatePicker
                                                                    disablePast
                                                                    label="To"
                                                                    name="valid_to"
                                                                    openTo="year"
                                                                    views={['year', 'month', 'day']}
                                                                    value={value2}
                                                                    onChange={(newValue) => {
                                                                        setValue2(newValue);
                                                                    }}
                                                                    renderInput={(params) => <TextField color="warning" {...params} />}
                                                                    />
                                                                </LocalizationProvider>
                                                                <span className="text-danger">{permitInput.error_list.valid_to}</span>

                                                            
                                                    </FormControl>
                                                
                                                    
                                                
                                            </div>

                                            <br/>
                                            <div className="col-md-3 form-group mb-3">
                                            
                                                
                                                
                                                    
                                                    <FormControl variant="standard" sx={{mt:1,ml:19.5,minWidth: 290 }}>
                                                            <InputLabel style={{ color: '#e63946' }}  id="comp_id">Pharmacist</InputLabel>
                                                            <Select
                                                                // labelId="demo-simple-select-standard-label"
                                                                id="pharma_id"
                                                                name="pharma_id"
                                                                type="text"
                                                                value={permitInput.pharma_id}
                                                                onChange={handleInput}
                                                                label="Pharmacist"
                                                                color="warning"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                autoFocus
                                                                style={{width:"290px"}}
                                                            >
                                                                {
                                                                        pharmacistList.map((item)=>{
                                                                            return(
                                                                                <MenuItem value={item.id}>{item.first_name+" "+item.last_name}</MenuItem>
                                                                            )
                                                                        })
                                                                    }
                            
                                                            </Select>
                                                        <span className="text-danger">{permitInput.error_list.pharma_id}</span>
                                                    </FormControl>
                                                
                                                    <FormControl variant="standard" sx={{ mt:4,ml:19.5,minWidth:290 }}>
                                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                                <DatePicker
                                                                    // disableFuture
                                                                    label="Permit Date "
                                                                    name="permit_date"
                                                                    openTo="year"
                                                                    views={['year', 'month', 'day']}
                                                                    value={value3}
                                                                    onChange={(newValue) => {
                                                                        setValue3(newValue);
                                                                    }}
                                                                    renderInput={(params) => <TextField color="warning" {...params} />}
                                                                    />
                                                                </LocalizationProvider>
                                                                <span className="text-danger">{permitInput.error_list.permit_date}</span>

                                                            
                                                    </FormControl>

                                                    <FormControl variant="standard" sx={{mt:9,ml:19.5,minWidth: 290 }}>
                                                            <InputLabel style={{ color: '#e63946' }}  id="comp_id">Point of Entry/Exit</InputLabel>
                                                            <Select
                                                                // labelId="demo-simple-select-standard-label"
                                                                id="poe_id"
                                                                name="poe_id"
                                                                type="text"
                                                                value={permitInput.poe_id}
                                                                onChange={handleInput}
                                                                label="Point of Entry/Exit"
                                                                color="warning"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                autoFocus
                                                                style={{width:"290px"}}
                                                            >
                                                                {
                                                                        points_of_entry_exitList.map((item)=>{
                                                                            return(
                                                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                                                            )
                                                                        })
                                                                    }
                            
                                                            </Select>
                                                        <span className="text-danger">{permitInput.error_list.poe_id}</span>
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
                            <div className="tab-pane card-body  fade" id="Step2" role="tabpanel" aria-labelledby="seo-tags-tab">
                                {/* <h1 className="Color">Step 2</h1> */}
                                <Button
                                    type=""
                                    fullWidth
                                    variant="contained"
                                    sx={{ background: '#00022E',mr:-2, ml:-13, mb: -2,mt:-3,width:'800px',height:'15px',borderRadius:'0PX', '&:hover': { background: '#00022E ', color:'WHITE' } }}
                                >
                                    Line details
                                </Button>
                                <form onSubmit={SubmitPermit_line} id="PERMITLINE">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="row ">
                                            <div className="col-md-3 form-group mb-3">
                                                    <FormControl variant="standard" sx={{ mt:2, minWidth: 290 }}>
                                                    <InputLabel style={{ color: '#e63946' }}  id="schedule_id">Name of Substance</InputLabel>
                                                            <Select
                                                                // labelId="demo-simple-select-standard-label"
                                                                id="schedule_line_id"
                                                                name="schedule_line_id"
                                                                type="text"
                                                                value={permitInput.schedule_line_id}
                                                                onChange={handleInput}
                                                                label="Name of Substance"
                                                                color="warning"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                autoFocus
                                                                
                                                            >
                                                                {
                                                                        schedule_lineList.map((item)=>{
                                                                            return(
                                                                                <MenuItem value={item.id}>{item.line_desc}</MenuItem>
                                                                            )
                                                                        })
                                                                    }
                            
                                                            </Select>
                                                    </FormControl>
                                                    <span className="text-danger">{permitInput.error_list.comp_reg_no}</span>
                                                
                                                    
                                                    <FormControl variant="standard" sx={{mt:-2, minWidth: 290 }}>
                                                        <TextField
                                                                id="prep_desc"
                                                                label="preparation" 
                                                                variant="standard"
                                                                type="text"
                                                                autoComplete="preparation"
                                                                name="prep_desc"
                                                                onChange={handleInput}
                                                                value={permitInput.prep_desc}
                                                                color="warning"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                autoFocus
                                                                /> 
                                                    </FormControl>
                                                    <span className="text-danger">{permitInput.error_list.prep_desc}</span>
                                                    <FormControl variant="standard" sx={{mt:-2, minWidth: 290 }}>
                                                        <TextField
                                                                id="total_weight"
                                                                label="Total Qty of Controlled Substances content" 
                                                                variant="standard"
                                                                type="text"
                                                                autoComplete="preparation"
                                                                name="total_weight"
                                                                onChange={handleInput}
                                                                value={permitInput.total_weight}
                                                                color="warning"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                autoFocus
                                                                /> 
                                                    </FormControl>
                                                    <span className="text-danger">{permitInput.error_list.prep_desc}</span>
                                            </div>

                                            <br/>
                                            <div className="col-md-3 form-group mb-3">
                                                    <FormControl variant="standard" sx={{ mt:0,ml:9.5, minWidth: 290 }}>
                                                    <TextField
                                                                id="unit_weight"
                                                                label="Unit Weight" 
                                                                variant="standard"
                                                                type="text"
                                                                autoComplete="unit weight"
                                                                name="unit_weight"
                                                                onChange={handleInput}
                                                                value={permitInput.unit_weight}
                                                                color="warning"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                autoFocus
                                                                /> 
                                                            
                                                    </FormControl>
                                                    <span className="text-danger">{permitInput.error_list.comp_name}</span>
                                                
                                                    
                                                    <FormControl variant="standard" sx={{mt:-3,ml:9.5,minWidth: 290 }}>
                                                        <TextField
                                                                id="uom_desc"
                                                                label="Unit of Measure" 
                                                                variant="standard"
                                                                type="text"
                                                                autoComplete="Unit of Measure"
                                                                name="uom_desc"
                                                                onChange={handleInput}
                                                                value={permitInput.uom_desc}
                                                                color="warning"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                autoFocus
                                                                /> 
                                                    </FormControl>
                                                    <span className="text-danger">{permitInput.error_list.physical_address}</span>
                                            </div>
                                            <br/>
                                            <div className="col-md-3 form-group mb-3">
                                                    <FormControl variant="standard" sx={{ mt:0,ml:19.5, minWidth:290 }}>
                                                        <TextField
                                                            id="x_line_qty"
                                                            label="Qty of Preparation X" 
                                                            variant="standard"
                                                            type="text"
                                                            autoComplete="Qty of Preparation X"
                                                            name="x_line_qty"
                                                            onChange={handleInput}
                                                            value={permitInput.x_line_qty}
                                                            color="warning"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            autoFocus
                                                            /> 
                                                    </FormControl>
                                                    <FormControl variant="standard" sx={{ mt:-3,ml:19.5, minWidth:290 }}>
                                                        <TextField
                                                            id="y_line_qty"
                                                            label="Qty of Preparation Y" 
                                                            variant="standard"
                                                            type="text"
                                                            autoComplete="Qty of Preparation Y"
                                                            name="y_line_qty"
                                                            onChange={handleInput}
                                                            value={permitInput.y_line_qty}
                                                            color="warning"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            autoFocus
                                                            /> 
                                                    </FormControl>
                                                    <span className="text-danger">{permitInput.error_list.y_line_qty}</span>
                                                    
                                            </div>
                                            <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        sx={{height:35, ml:0,mt:2,background: '#00022E', mb: 2, '&:hover': { background: '#DC3545' } }}
                                                    >
                                                        Add
                                            </Button>

                                            <Paper
                
                                                sx={{ ml: 1,mb:2,p: '2px 20px', display: 'flex', alignItems: 'center', width: 700 }}
                                             >
                                                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                                                        <MenuIcon />
                                                    </IconButton>
                                                    <TextField
                                                        sx={{ ml: 2, flex: 1 }}
                                                        id="standard-search"
                                                        label="Search Permit Line by Substance/Preparation/UOM"
                                                        type="search"
                                                        variant="standard"
                                                        color="warning"
                                                        onChange={event => setQuery(event.target.value)}
                                                        placeholder="Search Permit Line by substance/Preparation/UOM"
                                                    />
                                                    <IconButton  
                                                    sx={{ p: '10px' }}
                                                    aria-label="search"
                                                    >
                                                        <SearchIcon />
                                                    </IconButton>
                                                
                                            </Paper>
                                            <Paper sx={{ml:0,mt:-1}}>

                                                        <TableContainer component={Paper}
                                                            sx={{margin:'0px'}} 
                                                        >
                                                            <Table 
                                                            
                                                                sx={{}} aria-label="simple table"
                                                            >
                                                                <TableHead>
                                                                    <TableRow>
                                                                            <TableCell
                                                                                sx={{color:'white',fontWeight:'bold',
                                                                                // backgroundColor:'#e63946'
                                                                                backgroundColor:'#00022E'
                                                                                }} >
                                                                                No
                                                                            </TableCell>
                                                                            <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Substance</TableCell>
                                                                            <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Preparation</TableCell>
                                                                            <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Unit Weight</TableCell>
                                                                            <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>UOM</TableCell>
                                                                            <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Qty of X</TableCell>
                                                                            <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Qty of Y</TableCell>
                                                                            <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Total Qty of controlled Substances Content</TableCell>
                                                                            {/* <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Edit</TableCell> */}
                                                                            <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Delete</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                


                                                                        {
                                                                        
                                                                        permit_lineList.filter(permit_line => {
                                                                        if (query==='')
                                                                        {
                                                                            return permit_line;
                                                                        } else if ( permit_line.schedule_line.line_desc.toLowerCase().includes(query.toLowerCase()) || permit_line.prep_desc.toLowerCase().includes(query.toLowerCase()) || permit_line.uom_desc.toLowerCase().includes(query.toLowerCase()) ) {
                                                                            return permit_line;
                                                                        }
                                                                        }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((permit_line, index) => (  
                                                                            <TableRow
                                                                                key={permit_line.id}
                                                                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                sx={{background:'white','&:hover':{background:'#e63946',color:'#00022E'}}}
                                                                            >
                                                                                        {/* <TableCell component="th" scope="row">
                                                                                            {town.id}
                                                                                        </TableCell> */}
                                                                                    <TableCell >

                                                                                    <Grid container>
                                                                                            {/* <Grid item lg={11}>
                                                                                                <Avatar alt={town.name+"AA"} src='.'/>
                                                                                            </Grid>  */}
                                                                                            <Grid item lg={12}>  
                                                                                                    {/* {town.id}
                                                                                                    */}
                                                                                                    {a++}
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </TableCell>
                                                                                    <TableCell sx={{fontWeight:'bold',color:'#00022E'}}>{permit_line.schedule_line.line_desc}</TableCell>
                                                                                    <TableCell>{permit_line.prep_desc}</TableCell>
                                                                                    <TableCell>{permit_line.unit_weight}</TableCell>
                                                                                    <TableCell>{permit_line.uom_desc}</TableCell>
                                                                                    <TableCell>{permit_line.x_line_qty}</TableCell>
                                                                                    <TableCell>{permit_line.y_line_qty}</TableCell>
                                                                                    <TableCell >{permit_line.total_weight}</TableCell>

                                                                                    <TableCell >
                                                                                            <Link>
                                                                                                <Button
                                                                                                    size="small"
                                                                                                    type="button"
                                                                                                    fullWidth
                                                                                                    variant="contained"
                                                                                                    sx={{ background: '#00022E', mt: -2,mb:0, '&:hover': { background: 'white', color:'#00022E' } }}
                                                                                                    // onClick={(e)=>deleteTown(e,town.id )}
                                                                                                >
                                                                                                    <DeleteIcon    fontSize="small"/>
                                                                                                </Button>
                                                                                            </Link>
                                                                                    </TableCell>
                                                                    
                                                                            </TableRow>
                                                                            
                                                                        ))
                                                                        }

                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                        <TableFooter
                                                        >
                                                                <TablePagination
                                                                    rowsPerPageOptions={[3,6,9]}
                                                                    component="div"
                                                                    count={permit_lineList.length}
                                                                    rowsPerPage={rowsPerPage}
                                                                    page={page}
                                                                    onPageChange={handleChangePage}
                                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                                    
                                                                />
                                                        </TableFooter>
                                                        </Paper>  

                                                    
                                        </div>

                                        
                                    </div>
                                
                                    
                                    
                                </form>
                            </div>    
                            <div className="tab-pane card-body fade" id="Step3" role="tabpanel" aria-labelledby="seo-tags-tab">
                                {/* <h1 className="Color">Step 3</h1> */}
                                <Button
                                    type=""
                                    fullWidth
                                    variant="contained"
                                    sx={{ background: '#00022E',mr:-2, ml:-13, mb: -2,mt:-3,width:'800px',height:'15px',borderRadius:'0PX', '&:hover': { background: '#00022E ', color:'WHITE' } }}
                                >
                                    Supporting Documents
                                </Button>
                                <form onSubmit={submitSupportDocuments} id="COMPANY">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="row ">
                                            <div className="col-md-3 form-group mb-3">
                                                <label
                                                     style={{ color: '#e63946' }}
                                                >
                                                    {/* Image */}
                                                </label>
                                                    <FormControl variant="standard" sx={{ mt:-3, minWidth: 290 }}>
                                                        <TextField
                                                            id="comp_reg_no"
                                                            label="" 
                                                            variant="standard"
                                                            type="file"
                                                            // autoComplete=""
                                                            name="comp_reg_no"
                                                            onChange={handleInput}
                                                            value={permitInput.comp_reg_no}
                                                            color="warning"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            autoFocus
                                                            /> 
                                                    </FormControl>
                                                    <span className="text-danger">{permitInput.error_list.comp_reg_no}</span>
                                                
                                                    
                                                    
                                            </div>

                                            <br/>
                                            {/* <div className="col-md-3 form-group mb-3">
                                                    <FormControl variant="standard" sx={{ mt:-3,ml:9.5, minWidth: 290 }}>
                                                        <TextField
                                                            id="comp_name"
                                                            label="Company Name" 
                                                            variant="standard"
                                                            type="text"
                                                            autoComplete="company name"
                                                            name="comp_name"
                                                            onChange={handleInput}
                                                            value={permitInput.comp_name}
                                                            color="warning"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            autoFocus
                                                            /> 
                                                    </FormControl>
                                                    <span className="text-danger">{permitInput.error_list.comp_name}</span>
                                                
                                                   
                                            </div> */}

                                            
                                            

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
            </div>
        </div>
    )
}
export default AddPermit;