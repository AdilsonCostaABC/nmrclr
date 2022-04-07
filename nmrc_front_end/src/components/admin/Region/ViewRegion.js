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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function ViewRegion() {

    
    const [loading, setloading] = useState(true);
    const [regionList, setregionList] = useState([]);
    const [query, setQuery] = useState("");


    const [countryList,setcountryList] = useState([]);
    useEffect(() => {
        axios.get('/api/view-country').then(res=>{
            if (res.data.status===200) {
                setcountryList(res.data.country);
            }
        });
    }, []);


    useEffect(() => {
        axios.get(`/api/view-region`).then(res=>{
                // console.log(res.data.feeding_plan);
                if (res.data.status===200) {
                    
                    setregionList(res.data.region);
                }
                setloading(false);
        });
    }, []);
    //delete function 
    const deleteRegion=(e,id)=>{
        e.preventDefault();
        
        const thisClicked=e.currentTarget;
        //to Change the text in button delete
        thisClicked.innerText="Deleting";

        axios.delete(`/api/delete-region/${id}`).then(res=>{
            if (res.data.status===200) {
                swal("Success",res.data.message,"success");
                //it will for the row with that id and remove from the table
                // thisClicked.closest("Box").remove();
                
                window.location.reload();
            }
            else if(res.data.status===404){
                swal("Success",res.data.message,"success");
                //it 
                thisClicked.innerText("Delete");
            }

        });

    }

    var viewRegion_HTMLTABLE="";
    if (loading) {
        return <h4>Loading View Region...</h4>
    }
    else
    {
        
        viewRegion_HTMLTABLE=
        <div>
            <Paper
                component="form"
                sx={{ ml:15,p: '2px 20px', display: 'flex', alignItems: 'center', width: 700 }}
                >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <MenuIcon />
                        </IconButton>

                        <TextField
                            sx={{ ml: 2, flex: 1 }}
                            id="standard-search"
                            label="Search Region"
                            type="search"
                            variant="standard"
                            color="warning"
                            onChange={event => setQuery(event.target.value)}
                            placeholder="Search Region by name/country name"
                        />
                        <IconButton  
                        sx={{ p: '10px' }}
                         aria-label="search"
                         >
                            <SearchIcon />
                        </IconButton>

                        <FormControl variant="standard" sx={{ m: 2, minWidth: 250 }}>
                                    <InputLabel style={{ color: '#e63946' }}  id="country_id">Search by Country</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-standard-label"
                                        id="country_id"
                                        name="country_id"
                                        type="text"
                                        // value={regionInput.country_id}
                                        onChange={event => setQuery(event.target.value)}
                                        label="Country"
                                        color="warning"
                                        margin="normal"
                                        required
                                        fullWidth
                                        autoFocus
                                        style={{width:"200px"}}
                                    >
                                        <MenuItem value={""}>{"None"}</MenuItem>
                                        {
                                                countryList.map((item)=>{
                                                    return(
                                                        
                                                        <MenuItem value={item.name}>{item.name}</MenuItem>
                                                    )
                                                })
                                            }
    
                                    </Select>
                                </FormControl>
                       
                </Paper>
            {
                // regionList.map((item)=>{ 

                    regionList.filter(region => {
                        if (query==='')
                        {
                            return region;
                        } else if ( region.name.toLowerCase().includes(query.toLowerCase()) || region.country.name.toLowerCase().includes(query.toLowerCase())) {
                             return region;
                        }
                    }).map((region, index) => (   
                                       
                        <Box sx={{
                            width: 200,
                            height: 50,
                            backgroundColor: '',
                            '&:hover': {
                            //   backgroundColor: '#00022E',
                            //   opacity: [0.9, 0.8, 0.7],
                              boxShadow:'1px 1px 15px -2px #00022E, 1px 50px 15px -2px #00022E, 1px 100px 15px -2px #00022E',
                              transform: 'scale(1.1)',
                            },
                            display: 'inline-block',mx:'15px',my:'15px'
                            
                          }}>
                            <Card variant="outlined" sx={{ minWidth: 30 }}>
                                {/* <React.Fragment> */}
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            Region No  {region.id}
                                        </Typography>
                                        
                                        <Typography variant="body2">
                                            Region:{region.name}
                                            <br />
                                        </Typography>
                                        <Typography variant="body2">
                                        Country: {region.country.name}
                                            <br />
                                        </Typography>
                                        {/* <Typography variant="h6" component="div">
                                        Country: {region.country.name}
                                        </Typography> */}
                                    </CardContent>
                                    <CardActions>
                                   
                                            <Link style={{ textDecoration: 'none' }} to={`edit-region/${region.id}`} >
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
                                            onClick={(e)=>deleteRegion(e,region.id )}
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
                    <h4 className="text-white"> Region list
                    <Link style={{ textDecoration: 'none' }} to="/admin/add-region" className="float-end">
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
                        {viewRegion_HTMLTABLE}
                      
                </div>
            </div>
        </div>
    )
}
export default ViewRegion;