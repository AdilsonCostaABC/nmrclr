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

function AddSchedule_line() {

    const [scheduleList,setscheduleList] = useState([]);
    useEffect(() => {
        axios.get('/api/view-schedule').then(res=>{
            if (res.data.status===200) {
                setscheduleList(res.data.schedule);
            }
        });
    }, []);

    const [schedule_lineInput, setschedule_lineInput] = useState({
        schedule_id:'',
        line_desc:'',
        error_list: [],

    });

    const handleInput = (e) => {
        // e.persist();
        setschedule_lineInput({ ...schedule_lineInput, [e.target.name]: e.target.value })

    }

    const submitSchedule_line = (e) => {
        e.preventDefault();
        const data = {
            schedule_id: schedule_lineInput.schedule_id,
            line_desc: schedule_lineInput.line_desc,
            updated_by: localStorage.getItem('auth_name'),
        }
            console.log(data);
        axios.post(`/api/store-schedule_line`, data).then(res => {
            console.log(localStorage.getItem('email'));
            console.log('hello');
            if (res.data.status === 200) {
                console.log('api yes');
                swal({
                    title: "Adding Schedule Line",
                    text: res.data.message,
                    icon: "success",
                    button: "ok",
                });
                setschedule_lineInput({...schedule_lineInput,
                    schedule_id:'',
                    line_desc:'',
                    error_list: [],
                });
                  
                document.getElementById('SCHEDULE_LINE').reset();
            } else if (res.data.status === 400) {
                setschedule_lineInput({ ...schedule_lineInput, error_list: res.data.errors });
            }
        });

    }
    return (
        <div className="container-fluid px-4 py-5">

            <div className="card mt-4">
                <div className="card-header bg-danger">
                    <h4 className="text-white">Add Schedule Line
                    <Link style={{ textDecoration: 'none' }} to="/admin/view-schedule_line" className="float-end">
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
                    <form onSubmit={submitSchedule_line} id="SCHEDULE_LINE">
                        <div className="tab-content" id="myTabContent">
                            <div className="row ">
                                <div className="col-md-3 form-group mb-3">
                                    <TextField
                                        id="line_desc"
                                        label="Line Description" 
                                        variant="standard"
                                        type="text"
                                        autoComplete="Line Description"
                                        name="line_desc"
                                        onChange={handleInput}
                                        value={schedule_lineInput.line_desc}
                                        color="warning"
                                        margin="normal"
                                        required
                                        fullWidth
                                        autoFocus
                                    /> 
                                    <span className="text-danger">{schedule_lineInput.error_list.line_desc}</span>
                                </div>
                                <div className="col-md-3 form-group mb-3">
                                <FormControl variant="standard" sx={{ m: 2, minWidth: 250 }}>
                                    <InputLabel style={{ color: '#e63946' }}  id="schedule_id">Schedule</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-standard-label"
                                        id="schedule_id"
                                        name="schedule_id"
                                        type="text"
                                        value={schedule_lineInput.schedule_id}
                                        onChange={handleInput}
                                        label="Schedule"
                                        color="warning"
                                        margin="normal"
                                        required
                                        fullWidth
                                        autoFocus
                                        style={{width:"250px"}}
                                    >
                                        {
                                                scheduleList.map((item)=>{
                                                    return(
                                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                                    )
                                                })
                                            }
    
                                    </Select>
                                </FormControl>
                                    {/* <span className="text-danger">{schedule_lineInput.error_list.name}</span> */}
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
export default AddSchedule_line;