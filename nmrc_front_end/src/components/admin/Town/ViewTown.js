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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {makeStyles} from '@material-ui/core/styles';
import { ClassNames } from '@emotion/react';
import {Avatar,Grid,TablePagination,TableFooter} from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';


function ViewTown() {
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const [loading, setloading] = useState(true);
    const [townList, settownList] = useState([]);
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
        axios.get(`/api/view-town`).then(res=>{
                // console.log(res.data.feeding_plan);
                if (res.data.status===200) {
                    
                    settownList(res.data.town);
                }
                setloading(false);
        });
    }, []);
    //delete function 
    const deleteTown=(e,id)=>{
        e.preventDefault();
        
        const thisClicked=e.currentTarget;
        //to Change the text in button delete
        thisClicked.innerText="Deleting";

        axios.delete(`/api/delete-town/${id}`).then(res=>{
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
    var viewTown_HTMLTABLE="";
    var a=1;
    if (loading) {
        return <h4>Loading View Town...</h4>
    }
    else
    {
        
        viewTown_HTMLTABLE=
            <div>
              
            <Paper
                component="form"
                sx={{ml:1,p: '2px 20px', display: 'flex', alignItems: 'center', width: 900 }}
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
                    placeholder="Search Town by name/Region/Country"
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

                    <FormControl variant="standard" sx={{ ml:0,mt:2,mb:2,mr:0, minWidth: 250 }}>
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

        <Paper sx={{ml:1,mt:1,width:900}}>

                <TableContainer component={Paper}
                    sx={{width:900,margin:'0px'}} 
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
                                    <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Town</TableCell>
                                    <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Region</TableCell>
                                    <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Country</TableCell>
                                    <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Edit</TableCell>
                                    <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        


                                {
                                
                                townList.filter(town => {
                                if (query==='')
                                {
                                    return town;
                                } else if ( town.name.toLowerCase().includes(query.toLowerCase()) || town.region.name.toLowerCase().includes(query.toLowerCase()) || town.region.country.name.toLowerCase().includes(query.toLowerCase())) {
                                    return town;
                                }
                                }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((town, index) => (  
                                    <TableRow
                                        key={town.id}
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
                                            <TableCell sx={{fontWeight:'bold',color:'#00022E'}}>{town.name}</TableCell>
                                                <TableCell>
                                                    {town.region.name}
                                                </TableCell>
                                                
                                                    {
                                                                /* 

                                                                    <TableCell>
                                                                        <Typography
                                                                                sx={{
                                                                                    fontWeight:'bold',
                                                                                    fontSize:'0.75rem',
                                                                                    color:'white',
                                                                                    backgroundColor:'blue',
                                                                                    borderRadius:8,
                                                                                    spadding:'3px 10px',
                                                                                    display:'inline-block'
                                                                                }}
                                                                                style={{
                                                                                    backgroundColor:
                                                                                    ((town.region.country.name==='Namibia' && 'blue') ||
                                                                                    (town.region.country.name==='Angola' && 'red')) 
                                                                                    
                                                                                    
                                                                                    }}
                                                                                >
                                                                                    {town.region.name}
                                                                        </Typography>
                                                                    </TableCell> 

                                                                */
                                                    }


                                            <TableCell >
                                                        {
                                                            town.region.country.name
                                                        }
                                            </TableCell>

                                            {
                                                    /* 
                                                            <TableCell >
                                                                <Typography color="primary" variane="subtitle2">
                                                                    {town.region.country.name}
                                                                </Typography>
                                                                <Typography color="textSecondary" variane="body2">
                                                                    {town.region.country.name}
                                                                </Typography>
                                                            </TableCell> 
                                                    */
                                            }

                                            <TableCell>
                                            <Tooltip title={"Edit"}>

                                                <Link style={{ textDecoration:'none' }} to={`edit-town/${town.id}`} >
                                                        <Button
                                                            size="small"
                                                            type="button"
                                                            fullWidth
                                                            variant="contained"
                                                            sx={{ background: '#00022E',mt:-2,mb:0, '&:hover': { background: 'white', color:'#00022E' } }}
                                                            
                                                        >
                                                            <Icon fontSize="small">edittwotone </Icon>
                                                        </Button>
                                                </Link>  
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell >
                                            <Tooltip title={"Delete"}>

                                                    <Link>
                                                        <Button
                                                            size="small"
                                                            type="button"
                                                            fullWidth
                                                            variant="contained"
                                                            sx={{ background: '#00022E', mt: -2,mb:0, '&:hover': { background: 'white', color:'#00022E' } }}
                                                            onClick={(e)=>deleteTown(e,town.id )}
                                                        >
                                                            <DeleteIcon    fontSize="small"/>
                                                        </Button>
                                                    </Link>
                                           </Tooltip>
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
                            rowsPerPageOptions={[5, 10,15]}
                            component="div"
                            count={townList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            
                        />
                </TableFooter>
        </Paper>  
    
</div>
        
    }

    
    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header   bg-danger">
                    <h4 className="text-white"> Town list
                    <Link style={{ textDecoration: 'none' }} to="/admin/add-town" className="float-end">
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
                    {viewTown_HTMLTABLE}
                </div>                
            </div>
        </div>
    )
}
export default ViewTown;