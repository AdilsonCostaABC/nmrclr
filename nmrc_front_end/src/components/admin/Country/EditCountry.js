
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

function EditCountry(props){

    const [loading, setloading] = useState(true);
    const history=useHistory();
    const [countryInput, setcountryInput] = useState([]);
    const [error, setError] = useState([]);

    // to fetch the data from laravel
    useEffect(() => {
            const country_id=props.match.params.id;
            axios.get(`/api/edit-country/${country_id}`).then(res=>{
                if (res.data.status===200) {
                    setcountryInput(res.data.country);
                }
                else if(res.data.status===404){
                    swal("Error",res.data.message,"error");
                    history.push('/admin/view-country');
                    
                }
                setloading(false)

            });
    }, [props.match.params.id,history]);

    const handleInput=(e)=>{
        //to assure consistent usage of the pooled events
        e.persist();
        setcountryInput({...countryInput,[e.target.name]:e.target.value});
    }
    const updateCountry=(e)=>{
        //to stop the page reload
        e.preventDefault();
        //taking id from parameter/url after click edit
         const country_id=props.match.params.id;
         const data=countryInput;
        //sending the data to api
        axios.put(`/api/update-country/${country_id}`,data).then(res=>{
            if (res.data.status===200) {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/admin/view-country');
            }else if(res.data.status===422){
                swal("All fields are mandatory","","error");
                setError(res.data.errors);
            }
            else if (res.data.status===404){
                swal("Error",res.data.message,"error");
                history.push('/admin/view-country');
            }

        });
    }
    const useStyles = makeStyles((theme) => ({

        TextField: {
            color: "#a2d2ff",
        }

    }));
    if (loading) {
        return <h4>Loading  Edit Country...</h4>
    }
    return (
        <div className="container-fluid px-4 py-5">

            <div className="card mt-4">
                <div className="card-header bg-danger">
                    <h4 className="text-white">Edit country
                    <Link style={{ textDecoration: 'none' }} to="/admin/view-country" className="float-end">
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
                    <form onSubmit={updateCountry} id="COUNTRY">
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
                                        value={countryInput.name}
                                        color="warning"
                                        margin="normal"
                                        required
                                        fullWidth
                                        autoFocus
                                    /> 
                                    {/* <span className="text-danger">{countryInput.error_list.name}</span> */}
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
                        {/* <Button
                            type="reset"
                            fullWidth
                            variant="contained"
                            sx={{ background: '#00022E', mt: 0, mb: 2, '&:hover': { background: '#323457' } }}
                        >
                            Cancel
                        </Button> */}
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditCountry ;