// import * as React from 'react';
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
// import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@mui/material/Button';
import IconButton from '@material-ui/core/IconButton';

import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
// import '../../../Css/FeeddingPlan.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import TextField from '@mui/material/TextField';

function ViewCountry() {

    
    const [loading, setloading] = useState(true);
    const [countryList, setcountryList] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        axios.get(`/api/view-country`).then(res=>{
                // console.log(res.data.feeding_plan);
                if (res.data.status===200) {
                    setcountryList(res.data.country);
                }
                setloading(false);
        });
    }, []);
    //delete function 
    const deleteCountry=(e,id)=>{
        e.preventDefault();

        const thisClicked=e.currentTarget;
        //to Change the text in button delete
        thisClicked.innerText="Deleting";

        axios.delete(`/api/delete-country/${id}`).then(res=>{
            if (res.data.status===200) {
                swal("Success",res.data.message,"success");
                window.location.reload();
            }
            else if(res.data.status===404){
                swal("Success",res.data.message,"success");
                thisClicked.innerText("Delete");
            }

        });

    }

    var viewCountry_HTMLTABLE="";
    if (loading) {
        return <h4>Loading View Country...</h4>
    }
    else
    {
        viewCountry_HTMLTABLE=
        <div>
            
                <Paper
                component="form"
                sx={{ ml: 40,p: '2px 20px', display: 'flex', alignItems: 'center', width: 430 }}
                >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <TextField
                            sx={{ ml: 2, flex: 1 }}
                            id="standard-search"
                            label="Search field"
                            type="search"
                            variant="standard"
                            color="warning"
                            onChange={event => setQuery(event.target.value)}
                            placeholder="Search country"
                        />
                        <IconButton  
                        sx={{ p: '10px' }}
                         aria-label="search"
                         >
                            <SearchIcon />
                        </IconButton>
                       
                </Paper>
                

            {
                    
                    countryList.filter(country => {
                        if (query === '')
                        {
                            return country;
                        } else if (country.name.toLowerCase().includes(query.toLowerCase())) {
                             return country;
                        }
                    }).map((country, index) => (

                        // return(             
                            <Box sx={{
                                width: 200,
                                height: 30,
                                backgroundColor: '',
                                '&:hover': {
                               
                                boxShadow:'1px 1px 15px -2px #00022E, 1px 50px 15px -2px #00022E, 1px 100px 15px -2px #00022E',
                                transform: 'scale(1.1)',
                                },
                                display: 'inline-block',mx:'15px',my:'15px'
                                
                            }}
                            key={index}
                            >
                                <Card  variant="outlined" sx={{ minWidth: 50 }}>
                                    {/* <React.Fragment> */}
                                        <CardContent>
                                            <Typography variant="h6" component="div">
                                                Country No  {country.id}
                                            </Typography>
                                            
                                            <Typography variant="body2">
                                            {country.name}
                                                
                                                <br />
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                    
                                                <Link style={{ textDecoration: 'none' }} to={`edit-country/${country.id}`} >
                                            <Button
                                                size="small"
                                                type="button"
                                                fullWidth
                                                variant="contained"
                                                sx={{ background: '#00022E', mt: 0, mb: 2, '&:hover': { background: '#e63946', color:'#00022E' } }}
                                                
                                            >
                                                    <Icon fontSize="small">edittwotone </Icon>
                                            </Button>
                                                </Link>  

                                            <Link>
                                            <Button
                                                size="small"
                                                type="button"
                                                fullWidth
                                                variant="contained"
                                                sx={{ background: '#00022E', mt: 0, mb: 2, '&:hover': { background: '#e63946', color:'#00022E' } }}
                                                onClick={(e)=>deleteCountry(e,country.id )}
                                            >
                                                <DeleteIcon    fontSize="small"  />
                                            </Button>
                                            </Link>
                                        
                                        </CardActions>
                                </Card>
                            </Box>
                        
                        ))
            }
    
        </div>
        
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header   bg-danger">
                    <h4 className="text-white"> Country list
                    <Link style={{ textDecoration: 'none' }} to="/admin/add-country" className="float-end">
                        <Button
                            type=""
                            fullWidth
                            variant="contained"
                            sx={{ background: '#00022E', mt: 0, mb: 2, '&:hover': { background: 'white', color:'#00022E' } }}
                        >
                            Add
                        </Button>
                        
                    </Link></h4>
                </div>
                <div className="card-body">
                        {viewCountry_HTMLTABLE}
                      
                </div>
            </div>
        </div>
    )
}
export default ViewCountry;