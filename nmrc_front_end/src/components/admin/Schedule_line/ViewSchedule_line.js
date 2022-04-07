// import * as React from 'react';
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
// import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@mui/material/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
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

import DirectionsIcon from '@mui/icons-material/Directions';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {makeStyles} from '@material-ui/core/styles';
import { ClassNames } from '@emotion/react';
import {Avatar,Grid,TablePagination,TableFooter} from '@material-ui/core';

function ViewSchedule_line() {
     
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
    const [schedule_lineInput, setschedule_lineInput] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        axios.get(`/api/view-schedule_line`).then(res=>{
                // console.log(res.data.feeding_plan);
                if (res.data.status===200) {
                    setschedule_lineInput(res.data.schedule_line);
                }
                setloading(false);
        });
    }, []);
    //delete function 
    const deleteSchedule_line=(e,id)=>{
        e.preventDefault();

        const thisClicked=e.currentTarget;
        //to Change the text in button delete
        thisClicked.innerText="Deleting";

        axios.delete(`/api/delete-schedule_line/${id}`).then(res=>{
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

    var viewSchedule_lineMaterialTable="";
    var a=1;

    if (loading) {
        return <h4>Loading View Schedule Line...</h4>
    }
    else
    {
        viewSchedule_lineMaterialTable=
        <div>
              
               <Paper
                
                sx={{ ml: 20,p: '2px 20px', display: 'flex', alignItems: 'center', width: 700 }}
               >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <TextField
                            sx={{ ml: 2, flex: 1 }}
                            id="standard-search"
                            label="Search schedule Line"
                            type="search"
                            variant="standard"
                            color="warning"
                            onChange={event => setQuery(event.target.value)}
                            placeholder="Search schedule Line"
                        />
                        <IconButton  
                        sx={{ p: '10px' }}
                         aria-label="search"
                         >
                            <SearchIcon />
                        </IconButton>
                       
                </Paper>

            <Paper sx={{ml:20,mt:1,width:700}}>  
            <TableContainer component={Paper}
                sx={{width:700,margin:'0px'}} 
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
                                <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Line Description</TableCell>
                                <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Schedule Name</TableCell>
                                <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Edit</TableCell>
                                <TableCell sx={{color:'white',fontWeight:'bold',backgroundColor:'#00022E'}}>Delete</TableCell>
                                
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {
                            schedule_lineInput.filter(schedule_line => {
                            if (query==='')
                            {
                                return schedule_line;
                            } else if ( schedule_line.line_desc.toLowerCase().includes(query.toLowerCase()) ) {
                                return schedule_line;
                            }
                            }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((schedule_line, index) => (  
                                <TableRow
                                    key={schedule_line.id}
                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    sx={{background:'white','&:hover':{background:'#e63946',color:'#00022E'}}}
                                >
                                            
                                        <TableCell >

                                        <Grid container>
                                                <Grid item lg={12}>  
                                                   {a++}
                                                </Grid>
                                        </Grid>
                                        </TableCell>
                                        <TableCell sx={{fontWeight:'bold',color:'#00022E'}}>{schedule_line.line_desc}</TableCell>
                                        <TableCell>{schedule_line.schedule.name}</TableCell>
                                        
                                        <TableCell>
                                            <Link style={{textDecoration:'none'}} to={`edit-schedule_line/${schedule_line.id}`}>
                                                    <Button
                                                        size="small"
                                                        type="button"
                                                        fullWidth
                                                        variant="contained"
                                                        sx={{background:'#00022E',mt:-2,mb:0,'&:hover': {background:'white',color:'#00022E'}}}   
                                                    >
                                                        <Icon fontSize="small">edittwotone</Icon>
                                                    </Button>
                                            </Link>  
                                        </TableCell>
                                        <TableCell >
                                                <Link>
                                                    <Button
                                                        size="small"
                                                        type="button"
                                                        fullWidth
                                                        variant="contained"
                                                        sx={{ background: '#00022E', mt: -2,mb:0, '&:hover': { background: 'white', color:'#00022E'}}}
                                                        onClick={(e)=>deleteSchedule_line(e,schedule_line.id )}
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
                        rowsPerPageOptions={[5, 10,15]}
                        component="div"
                        count={schedule_lineInput.length }
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
                    <h4 className="text-white"> Schedule  Line list
                    <Link style={{ textDecoration: 'none' }} to="/admin/add-schedule" className="float-end">
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
                        {viewSchedule_lineMaterialTable}
                      
                </div>
            </div>
        </div>
    )
}
export default ViewSchedule_line;