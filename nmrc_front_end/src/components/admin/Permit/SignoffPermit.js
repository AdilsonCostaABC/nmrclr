
import swal from 'sweetalert';
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link,useHistory} from 'react-router-dom';
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {Box,Grid,Paper,Typography} from '@material-ui/core';
import Modal from 'react-modal';
Modal.setAppElement('#root')

function SignoffPermit(props){
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setloading] = useState(true);
    const history=useHistory();
    const [permitNotSignedoffInput, setpermitNotSignedoffInput] = useState([]);
    const [error, setError] = useState([]);
     
    
     // to fetch the data from laravel
     useEffect(() => {
        const permit_id=props.match.params.id;
        axios.get(`/api/signoff-permit/${permit_id}`).then(res=>{
            // console.log(res.data.signoff_permit);
            if (res.data.status===200) {
                setpermitNotSignedoffInput(res.data.signoff_permit);
            }
            else if(res.data.status===404){
                swal("Error",res.data.message,"error");
                history.push('/admin/view-permit-not-signedoff');
                
            }
            setloading(false)

        });
     }, [props.match.params.id,history]);


     

     const [value1, setValue1] = React.useState(new Date());
     const [value2, setValue2] = React.useState(new Date());
     const [value3, setValue3] = React.useState(new Date());
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
   

     const handleInput=(e)=>{
        //to assure consistent usage of the pooled events
        e.persist();
        setpermitNotSignedoffInput({...permitNotSignedoffInput,[e.target.name]:e.target.value});
    }
   
//change this function
    const updatePermitNotVerified=(e)=>{
        //to stop the page reload
        e.preventDefault();
        //taking id from parameter/url after click edit
         const permit_id=props.match.params.id;
         const data=permitNotSignedoffInput;
        //sending the data to api
        axios.put(`/api/update-permitNotVerified/${permit_id}`,data).then(res=>{
            if (res.data.status===200) {
                swal("Success",res.data.message,"success");
                setError([]);
                // history.push('/admin/view-town');
            }else if(res.data.status===422){
                swal("All fields are mandatory","","error");
                setError(res.data.errors);
            }
            else if (res.data.status===404){
                swal("Error",res.data.message,"error");
                // history.push('/admin/view-town');
            }

        });
    }

    const submitPermitSignedoff=(e)=>{
        //to stop the page reload
        e.preventDefault();
        //taking id from parameter/url after click edit
         const permit_id=props.match.params.id;
         const data=permitNotSignedoffInput;
        //sending the data to api
        axios.put(`/api/submit-permit-signedoff/${permit_id}`,data).then(res=>{
            if (res.data.status===200) {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/admin/view-permit-not-signedoff');
            }else if(res.data.status===422){
                swal("All fields are mandatory","","error");
                setError(res.data.errors);
            }
            else if (res.data.status===404){
                swal("Error",res.data.message,"error");
                // history.push('/admin/view-town');
            }

        });
    }

    
    const [reasonToRejectPermitInput, setreasonToRejectPermitInput] = useState("");
    //change this function
    const RejectPermitNotVerified=(e)=>{
        //to stop the page reload
        e.preventDefault();
        //taking id from parameter/url after click edit
         const permit_id=props.match.params.id;
         const data = {
            veri_reject_reason:reasonToRejectPermitInput
        }
        console.log(data);
        //sending the data to api
        axios.put(`/api/reject-permit-not-verified/${permit_id}`,data).then(res=>{
            if (res.data.status===200) {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/admin/view-permit-not-verified');
            }else if(res.data.status===422){
                swal("All fields are mandatory","","error");
                setError(res.data.errors);
            }
            else if (res.data.status===404){
                swal("Error",res.data.message,"error");
                // history.push('/admin/view-town');
            }

        });
    }

    const useStyles = makeStyles((theme) => ({

        TextField: {
            color: "#a2d2ff",
        }

    }));
    if (loading) {
        return <h4>Loading  Signoff Permit...</h4>
    }
    return (
        <div className="container-fluid px-4 py-0">

            <div className="card mt-4">
                <div className="card-header bg-danger">
                    <h4 className="text-white">Signoff Permit
                    <Link style={{ textDecoration: 'none' }} to="/admin/view-permit-not-signedoff" className="float-end">
                        <Button
                            type=""
                            fullWidth
                            variant="contained"
                            sx={{ background: '#00022E', mt: 0, mb: 2, '&:hover': { background: 'white', color:'#00022E' }}}
                        >
                            Back
                        </Button>
                        
                    </Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updatePermitNotVerified}>
                        <div className="tab-content" id="myTabContent">
                            <div className="row ">
                            
                             {/* Change the modal */}
                             <Modal 
                                    isOpen={modalIsOpen}
                                    //  shouldCloseOnOverlayclick={true}
                                    onRequestClose={()=>setModalIsOpen(false)}
                                    style={
                                        {
                                            overlay:{
                                                // backgroundColor:'#00022E',
                                                top:0,
                                                left:0,
                                                right:0,
                                                bottom:0,
                                                position:'fixed',
                                                
                                            },
                                            content:{
                                                // color:'orange',width:'200',
                                                position:'absolute',
                                                top:'75px',
                                                left:'300px',
                                                right:'300px',
                                                bottom:'350px',
                                                border:'1px solid #ccc',
                                                background:'#fff',
                                                // background:'#00022E',
                                                overflow:'auto',
                                                WebkitOverflowScrolling:'touch',
                                                borderRadius:'4px',
                                                outline:'none',
                                                padding:'20px'                                        
                                            }
                                        } 
                                    }
                                >
                                    <Grid>
                                            <Button
                                                variant="contained"
                                                sx={{ background: '#00022E',mr:-2, ml:1, mb: -2,mt:-5,width:'600px',height:'15px',borderRadius:'0PX','&:hover': { background: '#00022E', color:'WHITE' } }}
                                            >
                                                Reject Permit 
                                            </Button>

                                            <FormControl variant="standard" sx={{ml:15,mt:0,minWidth: 200}}>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Reason For Rejection"
                                                    multiline
                                                    rows={3}
                                                    style={{width:"400px"}}
                                                    color="warning"
                                                    type="text"
                                                    name="veri_reject_reason"
                                                    onChange={event => setreasonToRejectPermitInput(event.target.value)}
                                                />
                                            </FormControl> 
                                            <Grid>   
                                            <Button
                                                size="small"
                                                type="button"
                                                fullWidth
                                                variant="contained"
                                                sx={{ ml:15,width:150,background: '#00022E', mt:-35,mb:-40, '&:hover': { background: '#DC3545', color:'WHITE' } }}
                                                onClick={(e)=>RejectPermitNotVerified(e)}
                                            >
                                                Reject
                                            </Button>

                                            <Button
                                                size="small"
                                                // type="button"
                                                fullWidth
                                                variant="contained"
                                                sx={{ ml:10,width:150,background: '#00022E', mt:-35,mb:-40, '&:hover': { background: '#DC3545', color:'WHITE' } }}
                                                // onClick={(e)=>deleteTown(e,town.id )}
                                                onClick={()=> setModalIsOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                            </Grid>
                                    </Grid>        
                                </Modal>
                        
                            <div className="col-md-3 form-group mb-3">
                                                    {/* <FormControl variant="standard" sx={{ mt:-3, minWidth: 290 }}>
                                                        <TextField
                                                            id="check_digit"
                                                            label="Check digit" 
                                                            variant="standard"
                                                            type="text"
                                                            autoComplete="Check Digit"
                                                            name="check_digit"
                                                            onChange={handleInput}
                                                            value={permitNotSignedoffInput.check_digit}
                                                            color="warning"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            autoFocus
                                                            InputProps={{
                                                                readOnly: true,
                                                              }}
                                                            /> 
                                                    </FormControl> */}
                                                    {/* <span className="text-danger">{permitNotSignedoffInput.error_list.check_digit}</span> */}
                                                
                                                    <FormControl variant="standard" sx={{ mt:1,minWidth: 290 }}>
                                                            <InputLabel style={{ color: '#e63946' }}  id="comp_id">Company</InputLabel>
                                                            <Select
                                                                // labelId="demo-simple-select-standard-label"
                                                                id="comp_id"
                                                                name="comp_id"
                                                                type="text"
                                                                value={permitNotSignedoffInput.comp_id}
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
                                                        {/* <span className="text-danger">{permitNotSignedoffInput.error_list.comp_id}</span> */}
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
                                                                {/* <span className="text-danger">{permitNotSignedoffInput.error_list.valid_from}</span> */}

                                                            
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
                                                        value={permitNotSignedoffInput.purpose_use}
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
                                                            name="permit_no"
                                                            onChange={handleInput}
                                                            value={permitNotSignedoffInput.permit_no}
                                                            color="warning"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            autoFocus
                                                            InputProps={{
                                                                readOnly: true,
                                                              }}
                                                            /> 
                                                    </FormControl> */}
                                                    {/* <span className="text-danger">{permitNotSignedoffInput.error_list.permit_no}</span> */}
                                                
                                                    
                                                    <FormControl variant="standard" sx={{ ml:10,mt:1,minWidth: 290 }}>
                                                            <InputLabel style={{ color: '#e63946' }}  id="sup_id">Supplier</InputLabel>
                                                            <Select
                                                                // labelId="demo-simple-select-standard-label"
                                                                id="sup_id"
                                                                name="sup_id"
                                                                type="text"
                                                                value={permitNotSignedoffInput.sup_id}
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
                                                        {/* <span className="text-danger">{permitNotSignedoffInput.error_list.sup_id}</span> */}
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
                                                                {/* <span className="text-danger">{permitNotSignedoffInput.error_list.valid_to}</span> */}

                                                            
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
                                                                value={permitNotSignedoffInput.pharma_id}
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
                                                        {/* <span className="text-danger">{permitNotSignedoffInput.error_list.pharma_id}</span> */}
                                                    </FormControl>
                                                
                                                    <FormControl variant="standard" sx={{ mt:4,ml:19.5,minWidth:290 }}>
                                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                                <DatePicker
                                                                    // disableFuture
                                                                    readOnly
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
                                                                {/* <span className="text-danger">{permitNotSignedoffInput.error_list.permit_date}</span> */}

                                                            
                                                    </FormControl>


                                                    <FormControl variant="standard" sx={{mt:9,ml:19.5,minWidth: 290 }}>
                                                            <InputLabel style={{ color: '#e63946' }}  id="comp_id">Point of Entry/Exit</InputLabel>
                                                            <Select
                                                                // labelId="demo-simple-select-standard-label"
                                                                id="poe_id"
                                                                name="poe_id"
                                                                type="text"
                                                                value={permitNotSignedoffInput.poe_id}
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
                                                        {/* <span className="text-danger">{permitNotSignedoffInput.error_list.poe_id}</span> */}
                                                    </FormControl>

                                                
                                                  
                                                
                                            </div>


                                            
                            </div>
                             
                        
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ ml:0,width:400,background: '#00022E', mt: 0, mb: 0, '&:hover': { background: '#DC3545', color:'WHITE' } }}
                            >
                                Update
                            </Button>
                            <Link style={{ textDecoration: 'none' }} to="/admin/view-permit-not-signedoff" >
                                <Button
                                    type="reset"
                                    fullWidth
                                    variant="contained"
                                    sx={{ ml:10,width:400,background: '#00022E', mt: 0, mb: 0, '&:hover': { background: '#DC3545', color:'WHITE' } }}
                                >
                                    Cancel updating
                                </Button>
                            </Link>

                            </div>    
                    </form>
                    <Button
                            size="small"
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ ml:0,width:400,background: '#00022E', mt:1,mb:0, '&:hover': { background: '#DC3545', color:'WHITE' } }}
                            // onClick={(e)=>deleteTown(e,town.id )}
                            onClick={()=> setModalIsOpen(true)}
                        >
                            Reject Permit
                        </Button>
                        
                        <Button
                            size="small"
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ ml:10,width:400,background: '#00022E', mt: 1,mb:0, '&:hover': { background: '#DC3545', color:'WHITE' } }}
                            onClick={(e)=>submitPermitSignedoff(e)}
                        >
                            Signoff Permit
                        </Button>
                </div>
            </div>
        </div>
    )
}
export default SignoffPermit;