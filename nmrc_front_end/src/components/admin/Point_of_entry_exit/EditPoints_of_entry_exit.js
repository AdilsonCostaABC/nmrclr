
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

function EditPoints_of_entry_exit(props){

    const [loading, setloading] = useState(true);
    const history=useHistory();
    const [points_of_entry_exitInput, setpoints_of_entry_exitInput] = useState([]);
    const [error, setError] = useState([]);
     

     // to fetch the data from laravel
     useEffect(() => {
        const points_of_entry_exit_id=props.match.params.id;
        axios.get(`/api/edit-points_of_entry_exit/${points_of_entry_exit_id}`).then(res=>{
            console.log(res.data.region);
            if (res.data.status===200) {
                setpoints_of_entry_exitInput(res.data.points_of_entry_exit);
            }
            else if(res.data.status===404){
                swal("Error",res.data.message,"error");
                history.push('/admin/view-point_of_entry_exit');
                
            }
            setloading(false)

        });
     }, [props.match.params.id,history]);

    const [regionInput,setregionInput] = useState([]);
    
    useEffect(() => {
        axios.get('/api/view-region').then(res=>{
            if (res.data.status===200) {
                setregionInput(res.data.region);
            }
        });
    }, [])
   

    const handleInput=(e)=>{
        //to assure consistent usage of the pooled events
        e.persist();
        setpoints_of_entry_exitInput({...points_of_entry_exitInput,[e.target.name]:e.target.value});
    }

    const updatePoints_of_entry_exit=(e)=>{
        //to stop the page reload
        e.preventDefault();
        //taking id from parameter/url after click edit
         const points_of_entry_exit_id=props.match.params.id;
         const data=points_of_entry_exitInput;
        //sending the data to api
        axios.put(`/api/update-points_of_entry_exit/${points_of_entry_exit_id}`,data).then(res=>{
            if (res.data.status===200) {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/admin/view-point_of_entry_exit');
            }else if(res.data.status===422){
                swal("All fields are mandatory","","error");
                setError(res.data.errors);
            }
            else if (res.data.status===404){
                swal("Error",res.data.message,"error");
                history.push('/admin/view-point_of_entry_exit');
            }

        });
    }

    const useStyles = makeStyles((theme) => ({

        TextField: {
            color: "#a2d2ff",
        }

    }));
    if (loading) {
        return <h4>Loading  Edit Point of Entry/Exit...</h4>
    }
    return (
        <div className="container-fluid px-4 py-5">

            <div className="card mt-4">
                <div className="card-header bg-danger">
                    <h4 className="text-white">Edit Point of Entry/Exit
                    <Link style={{ textDecoration: 'none' }} to="/admin/view-point_of_entry_exit" className="float-end">
                        <Button
                            type=""
                            fullWidth
                            variant="contained"
                            sx={{ background: '#00022E', mt: 0, mb: 2, '&:hover': { background: 'white', color:'#00022E' }}}
                        >
                            Back
                        </Button>
                        
                    </Link></h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updatePoints_of_entry_exit} id="REGION">
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
                                        value={points_of_entry_exitInput.name}
                                        color="warning"
                                        margin="normal"
                                        required
                                        fullWidth
                                        autoFocus
                                    /> 
                                    {/* <span className="text-danger">{points_of_entry_exitInput.error_list.name}</span> */}
                                </div>
                                <div className="col-md-3 form-group mb-3">
                                <FormControl variant="standard" sx={{ m: 2, minWidth: 250 }}>
                                    <InputLabel style={{ color: '#e63946' }}  id="region_id">Region</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-standard-label"
                                        id="region_id"
                                        name="region_id"
                                        type="text"
                                        value={points_of_entry_exitInput.region_id}
                                        onChange={handleInput}
                                        label="Region"
                                        color="warning"
                                        margin="normal"
                                        required
                                        fullWidth
                                        autoFocus
                                        style={{width:"250px"}}
                                    >
                                        {
                                                regionInput.map((item)=>{
                                                    return(
                                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                                    )
                                                })
                                            }
    
                                    </Select>
                                </FormControl>
                                    {/* <span className="text-danger">{points_of_entry_exitInput.error_list.name}</span> */}
                                </div>

                            </div>
                        </div>
                       
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ background: '#00022E', mt: 3, mb: 2, '&:hover': { background: '#323457' } }}
                        >
                            Update
                        </Button>
                       
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditPoints_of_entry_exit;