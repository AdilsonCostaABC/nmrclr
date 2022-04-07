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

function ViewPoints_of_entry_exit() {

    const [loading, setloading] = useState(true);
    const [points_of_entry_exitList, setpoints_of_entry_exitList] = useState([]);
    const [query, setQuery] = useState("");

    const [countryList,setcountryList] = useState([]);
    useEffect(() => {
        axios.get('/api/view-country').then(res=>{
            if (res.data.status===200) {
                setcountryList(res.data.country);
            }
        });
    }, []);

    const [regionList,setregionList] = useState([]);
    useEffect(() => {
        axios.get('/api/view-region').then(res=>{
            if (res.data.status===200) {
                setregionList(res.data.region);
            }
        });
    }, []);


    useEffect(() => {
        axios.get(`/api/view-points_of_entry_exit`).then(res=>{
                // console.log(res.data.feeding_plan);
                if (res.data.status===200) {
                    
                    setpoints_of_entry_exitList(res.data.points_of_entry_exit);
                }
                setloading(false);
        });
    }, []);
    //delete function 
    const deletePoints_of_entry_exit=(e,id)=>{
        e.preventDefault();
        
        const thisClicked=e.currentTarget;
        //to Change the text in button delete
        thisClicked.innerText="Deleting";

        axios.delete(`/api/delete-points_of_entry_exit/${id}`).then(res=>{
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

    var viewPoints_of_entry_exit_HTMLTABLE="";
    if (loading) {
        return <h4>Loading View Point of entry/exit...</h4>
    }
    else
    {
        
        viewPoints_of_entry_exit_HTMLTABLE=
        <div>
            <Paper
                component="form"
                sx={{ ml:7,p: '2px 20px', display: 'flex', alignItems: 'center', width: 1000 }}
                >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <MenuIcon />
                        </IconButton>

                        <TextField
                            sx={{ ml: 2, flex: 1 }}
                            id="standard-search"
                            label="Search Town"
                            type="search"
                            variant="standard"
                            color="warning"
                            onChange={event => setQuery(event.target.value)}
                            placeholder="Search Point of entry/exit by name/Region/Country"
                        />
                        <IconButton  
                        sx={{ p: '10px' }}
                         aria-label="search"
                         >
                            <SearchIcon />
                        </IconButton>

                        <FormControl variant="standard" sx={{ ml: 2,mt:2,mb:2,mr:1, minWidth: 250 }}>
                                    <InputLabel style={{ color: '#e63946' }}  id="country_id">Search by Region</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-standard-label"
                                        id="region_id"
                                        name="region_id"
                                        type="text"
                                        // value={regionInput.country_id}
                                        onChange={event => setQuery(event.target.value)}
                                        label="Region"
                                        color="warning"
                                        margin="normal"
                                        required
                                        fullWidth
                                        autoFocus
                                        style={{width:"200px"}}
                                    >
                                        <MenuItem value={""}>{"None"}</MenuItem>
                                        {
                                                regionList.map((item)=>{
                                                    return(
                                                        
                                                        <MenuItem value={item.name}>{item.name}</MenuItem>
                                                    )
                                                })
                                            }
    
                                    </Select>
                                </FormControl>

                                <FormControl variant="standard" sx={{ ml: 0,mt:2,mb:2,mr:0, minWidth: 250 }}>
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

                    points_of_entry_exitList.filter(points_of_entry_exit => {
                        if (query==='')
                        {
                            return points_of_entry_exit;
                        } else if ( points_of_entry_exit.name.toLowerCase().includes(query.toLowerCase()) || points_of_entry_exit.region.name.toLowerCase().includes(query.toLowerCase()) || points_of_entry_exit.region.country.name.toLowerCase().includes(query.toLowerCase())) {
                             return points_of_entry_exit;
                        }
                    }).map((points_of_entry_exit, index) => (   
                                       
                        <Box sx={{
                            width: 300,
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
                                        POE No  {points_of_entry_exit.id}
                                        </Typography>
                                        
                                        <Typography variant="body2">
                                        Point of Entry/Exit: {points_of_entry_exit.name}
                                            <br />
                                        </Typography>
                                        <Typography variant="body2">
                                        Region: {points_of_entry_exit.region.name}
                                            <br />
                                        </Typography>
                                        <Typography variant="body2">
                                        Country: {points_of_entry_exit.region.country.name}
                                            <br />
                                        </Typography>
                                        {/* <Typography variant="h6" component="div">
                                        Country: {region.country.name}
                                        </Typography> */}
                                    </CardContent>
                                    <CardActions>
                                   
                                            <Link style={{ textDecoration: 'none' }} to={`edit-point_of_entry_exit/${points_of_entry_exit.id}`} >
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
                                            onClick={(e)=>deletePoints_of_entry_exit(e,points_of_entry_exit.id )}
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
                    <h4 className="text-white"> Point of Entry/Exit list
                    <Link style={{ textDecoration: 'none' }} to="/admin/add-point_of_entry_exit" className="float-end">
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
                        {viewPoints_of_entry_exit_HTMLTABLE}
                      
                </div>
            </div>
        </div>
    )
}
export default ViewPoints_of_entry_exit;