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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PreviewIcon from '@mui/icons-material/Preview';
import Tooltip from '@mui/material/Tooltip';


function ViewPermitNotVerified() {
    
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
    const [permitNotVerifiedList, setpermitNotVerifiedList] = useState([]);
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
        axios.get(`/api/view-permitNoVerified`).then(res=>{
                
                if (res.data.status===200) {
                    
                    setpermitNotVerifiedList(res.data.permitNotVerified);
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
    var viewPermitVerify_MATERIALTABLE="";
    var a=1;
    if (loading) {
        return <h4>Loading Permit Verify...</h4>
    }
    else
    {
        
        viewPermitVerify_MATERIALTABLE=
            <div>
              
            <Paper
                component="form"
                sx={{ml:7,p: '2px 20px', display: 'flex', alignItems: 'center', width: 800 }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <MenuIcon />
                </IconButton>

                <TextField
                    sx={{ ml: 2, flex: 1 }}
                    id="standard-search"
                    label="Search Permit not verified by No/Company/POE"
                    type="search"
                    variant="standard"
                    color="warning"
                    onChange={event => setQuery(event.target.value)}
                    placeholder="Search Permit not verified by No/Company/POE"
                />
                <IconButton  
                sx={{ p: '10px' }}
                aria-label="search"
                >
                    <SearchIcon />
                </IconButton>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                   <TextField 
                                      type="date"
                                      color="warning"
                                      onChange={event => setQuery(event.target.value)}
                                   /> 
                </LocalizationProvider>
                  
        
        
            </Paper>

        <Paper sx={{ml:7,mt:1,width:800}}>

                <TableContainer component={Paper}
                    sx={{width:800,margin:'0px'}} 
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
                                    <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Permit NO</TableCell>
                                    <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Company</TableCell>
                                    <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>POE</TableCell>
                                    <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Permit Date</TableCell>
                                    <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>View</TableCell>
                                    
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        


                                {
                                
                                permitNotVerifiedList.filter(permitNotVerified => {
                                if (query==='')
                                {
                                    return permitNotVerified;
                                } else if ( ( permitNotVerified.permit_date===query) || permitNotVerified.permit_no.toLowerCase().includes(query.toLowerCase()) || permitNotVerified.company.comp_name.toLowerCase().includes(query.toLowerCase()) || permitNotVerified.points_of_entry_exit.name.toLowerCase().includes(query.toLowerCase()) ) {
                                    return permitNotVerified;
                                }
                                }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((permitNotVerified, index) => (  
                                    <TableRow
                                        key={permitNotVerified.id}
                                        sx={{background:'white','&:hover':{background:'#e63946',color:'#00022E'}}}
                                    >
                                                
                                            <TableCell >

                                            <Grid container>
                                                  
                                                    <Grid item lg={12}>  
                                                            {/* {permitNotVerified.id} */}
                                                            
                                                            {a++}
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell sx={{fontWeight:'bold',color:'#00022E'}}>{permitNotVerified.permit_no}</TableCell>
                                            <TableCell>{permitNotVerified.company.comp_name}</TableCell>
                                            <TableCell >{permitNotVerified.points_of_entry_exit.name}</TableCell>
                                            <TableCell >{permitNotVerified.permit_date}</TableCell>


                                            <TableCell>
                                            <Tooltip title={"View Permit not verified"}>

                                                <Link style={{ textDecoration:'none' }} to={`verify-permit/${permitNotVerified.id}`} >
                                                        <Button
                                                            size="small"
                                                            type="button"
                                                            fullWidth
                                                            variant="contained"
                                                            sx={{ background: '#00022E',mt:-2,mb:0, '&:hover': { background: 'white', color:'#00022E' } }}
                                                            
                                                        >
                                                            <PreviewIcon fontSize="small"/>
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
                            count={permitNotVerifiedList.length }
                            // count={20}
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
                    <h4 className="text-white">Permit(s) Not Verified
                    {/* <Link style={{ textDecoration: 'none' }} to="/admin/add-town" className="float-end">
                        <Button
                            type=""
                            fullWidth
                            variant="contained"
                            sx={{ background: '#00022E', mt: 0, mb: 2, '&:hover': { background: 'white', color:'#00022E' } }}
                        >
                            Add
                        </Button>
                        
                    </Link> */}
                    </h4>
                </div>
                <div className="card-body">
                    {viewPermitVerify_MATERIALTABLE}
                </div>                
            </div>
        </div>
    )
}
export default ViewPermitNotVerified;