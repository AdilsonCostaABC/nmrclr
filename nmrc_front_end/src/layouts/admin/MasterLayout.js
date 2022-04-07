import Reac from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import logoS4 from './IMG-20210421-WA0103.jpg';
import image1 from './m3.jpg';
import { useState } from "react"; 
import clsx from "clsx";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { styles } from "./post";
import { useHistory } from 'react-router';
import React from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { ProSidebar, SubMenu, SidebarContent } from 'react-pro-sidebar';
import {
  makeStyles,
} from "@material-ui/core";
import '../../assets/admin/css/styles.css'; 
import '../../assets/admin/js/scripts'; 
import routes from '../../routes/routes';
import Navbar from './Navbar'; 
import Sidebar from './Siderbar';
import Footer from './Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GridViewIcon from '@mui/icons-material/GridView';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import ViewListIcon from '@mui/icons-material/ViewList';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DescriptionIcon from '@mui/icons-material/Description';

import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PrintIcon from '@mui/icons-material/Print';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PublicIcon from '@mui/icons-material/Public';
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import NfcIcon from '@mui/icons-material/Nfc';
import LanguageIcon from '@mui/icons-material/Language';
import CancelIcon from '@mui/icons-material/Cancel';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        color: "#000133",

      },
      appBar: {
        background: "#00022E",
        color: "white",
      },
      icon: {
        padding: "10px",
      },
      title: {
        margin: "auto",
      },
      container: {
        display: "flex",
        flex: 1,
      },
      drawer: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        // backgroundImage: `url(${image1})`,
        // style={{ height: 120, width: 120, borderRadius: 0 , marginTop:20 }}
       

        background: "#a2d2ff",
        position: "static",
        transition: "width .6s",
        color: "white",
        // paddingRight: '295px',
        paddingRight: '45px',
        paddingLeft: '0px',
        paddingTop:'10px',
        
      },
      closed: {
        width: "0px",
      },
      logo: {
        // width: "150px",
        width:'50px'
        // height: "30px",
      },
      opened: {
        width: "295px",
      },
      main: {
        flex: 1,
        background: "#f7f5f5",
        color: "black",
      },
      footer: {
        background: "#00022E",
        height: "50px",
        color: "white",
      },
      MenuItem:{
        width:300
      }

      
    
    }));
    
const MasterLayout=()=>{
  
  const classes = useStyles();
  const [isOpened, setIsOpened] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);  
  const [open2, setOpen2] = React.useState(false);  
  const [open3, setOpen3] = React.useState(false);  
  const [open4, setOpen4] = React.useState(false);  
  const [open5, setOpen5] = React.useState(false);  

   const handleClick=(e)=>{
    setOpen(!open);
  };
   const handleClick2=(e)=>{
    setOpen2(!open2);
  };
   const handleClick3=(e)=>{
    setOpen3(!open3);
  };
   const handleClick4=(e)=>{
    setOpen4(!open4);
  };
   const handleClick5=(e)=>{
    setOpen5(!open5);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const history=useHistory();
  const logoutSubmit=(e)=>{
        e.preventDefault() ;
        axios.post(`/api/logout`).then(res=>{
            if (res.data.status===400) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('email');
                history.push('/');
                   
            }

        });
    }

    return (
        <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => setIsOpened(!isOpened)}
              className={classes.icon}
            >
              {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: {xs: 'none', md: 'flex' } }}
            >
                {/* LOGO  */}
                <div className={classes.logo}>
                    <img   src={logoS4}  />
                </div>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              {/* do not remove it */}
              
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip 
            title={localStorage.getItem('auth_name')}
            >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={localStorage.getItem('auth_name')} src="/static/images/avatar/2.jpg" />
                
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
           
                <MenuItem >
                  <Typography textAlign="center">
                            <Link style={{ textDecoration: 'none', color:'black' }}  to="/admin/ChangePassword" >
                                User Profile
                           </Link>
                  </Typography>
                </MenuItem>
            
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" onClick={logoutSubmit}>
                            Logout
                  </Typography>
                </MenuItem>
            </Menu>

          </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <div className={classes.container}>
          <Drawer
            
            variant="permanent"
            classes={{
              paper: clsx(classes.drawer, {
                [classes.closed]: !isOpened,
                [classes.opened]: isOpened,
              }),
            }}
            
          >
              <div className="ddd">
              <MenuItem 
                style={{ width:300}}
              >
                    <DashboardIcon   fontSize="medium" color="white" />    
                      <Link  style={{ margin: '8px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/Dashboard" >
                          Dashboard
                      </Link>
              </MenuItem>
             
              <MenuItem 
                onClick={handleClick}
                style={{ width:300}}
              >
                    <PlaylistAddIcon  fontSize="medium" color="white" />    
                      <Link   style={{ margin: '8px',marginBottom: '5px',textDecoration: 'none', color:'white' }} to="/admin"  >
                          Licence Application
                      </Link>
                      {open ? <ExpandLess /> : <ExpandMore />}
              </MenuItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                  
                     <MenuItem 
                       style={{ width:300}}
                     >
                            <DescriptionIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin" >
                                License Approve
                            </Link>
                      </MenuItem>
                     <MenuItem 
                        style={{ width:300}}
                     >
                            <DescriptionIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin" >
                                License Application
                            </Link>
                      </MenuItem>
                     <MenuItem 
                        style={{ width:300}}
                     >
                            <DescriptionIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin" >
                                Sign-Off Approved Licenses
                            </Link>
                      </MenuItem>
                     <MenuItem 
                        style={{ width:300}}
                     >
                            <PrintIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin" >
                                License Print
                            </Link>
                      </MenuItem>
                     <MenuItem
                        style={{ width:300}}
                     >
                            <DescriptionIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin" >
                                Issue Notice of Payment
                            </Link>
                      </MenuItem>
                      <MenuItem 
                          style={{ width:300}}
                      >
                            <DescriptionIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin" >
                                Receive Payment
                            </Link>
                      </MenuItem>
                     <MenuItem 
                        style={{ width:300}}
                     >
                            <ReceiptIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin" >
                                Reports
                            </Link>
                      </MenuItem>
                      <MenuItem 
                          style={{ width:300}}
                      >
                            <ConfirmationNumberIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin" >
                                License Verify
                            </Link>
                      </MenuItem>
                      
            
              </Collapse>


              <MenuItem 
                onClick={handleClick2}
                style={{ width:300}}
              >
                    {/* <ReceiptIcon   fontSize="medium" color="white" />  */}
                    <ViewListIcon   fontSize="medium" color="white" /> 
                      <Link   style={{ margin: '8px',marginBottom: '5px',textDecoration: 'none', color:'white' }} to="/admin"  >
                          Permit Application
                      </Link>
                      {open2 ? <ExpandLess /> : <ExpandMore />}
              </MenuItem>
             
              <Collapse in={open2} timeout="auto" unmountOnExit>
                      
                      <MenuItem
                          style={{ width:300}}
                      >
                            <FactCheckIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/view-permit-not-approved" >
                                Permit Approve
                            </Link>
                      </MenuItem>
                      <MenuItem 
                        style={{ width:300}}
                      >
                            <CancelIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/rejected-permit" >
                                Cancellled Permit Application
                            </Link>
                      </MenuItem>
                      <MenuItem
                           style={{ width:300}}
                      >
                            <AssignmentIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/add-permit" >
                                Permit Application
                            </Link>
                      </MenuItem>
                      <MenuItem 
                        style={{ width:300}}
                      >
                            <AssignmentTurnedInIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/view-permit-not-signedoff" >
                                Sign-Off Approved Permits
                            </Link>
                      </MenuItem>
                      <MenuItem 
                         style={{ width:300}}
                      >
                            <PrintIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/PermitPrint" >
                                Permit Print
                            </Link>
                      </MenuItem>
                      <MenuItem 
                        style={{ width:300}}
                      >
                            <ReceiptIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/Report" >
                                Report
                            </Link>
                      </MenuItem>
                      <MenuItem 
                          style={{ width:300}}

                      >
                            <ConfirmationNumberIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/view-permit-not-verified" >
                                Permit Verify
                            </Link>
                      </MenuItem>
              </Collapse>
              </div>
              <MenuItem 
                onClick={handleClick3}
                style={{ width:300}}
              >
                    <SettingsSuggestIcon   fontSize="medium" color="white" /> 
                      <Link   style={{ margin: '8px',marginBottom: '5px',textDecoration: 'none', color:'white' }} to="/admin"  >
                          System Setup
                      </Link>
                      {open3 ? <ExpandLess /> : <ExpandMore />}
              </MenuItem>

              <Collapse in={open3} timeout="auto" unmountOnExit>
                     
                      <MenuItem 
                         onClick={handleClick4}
                         style={{ width:300}}

                      >
                            <LanguageIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin" >
                              Country,Region,Town
                            </Link>
                            {open4 ? <ExpandLess /> : <ExpandMore />}
                      </MenuItem>
                      <Collapse in={open4} timeout="auto" unmountOnExit>
                          <MenuItem 
                              style={{ width:300}}
                          >
                                <PublicIcon style={{ marginLeft: '64px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                                <Link  style={{marginLeft: '32px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/add-country" >
                                    Country
                                </Link>
                          </MenuItem>
                          <MenuItem 
                              style={{ width:300}}
                          >
                                <NfcIcon style={{ marginLeft: '64px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                                <Link  style={{marginLeft: '32px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/add-region" >
                                    Region
                                </Link>
                          </MenuItem>
                          <MenuItem 
                              style={{ width:300}}
                          >
                                <LocationCityIcon style={{ marginLeft: '64px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                                <Link  style={{marginLeft: '32px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/add-town" >
                                    Town
                                </Link>
                          </MenuItem>
                      </Collapse>
                      <MenuItem 
                         style={{ width:300}}
                      >
                            <DoorFrontIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/add-point_of_entry_exit" >
                                Point of Entry/Exit
                            </Link>
                      </MenuItem>
                      <MenuItem 
                          style={{ width:300}}
                      >
                            <BusinessIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/add-company" >
                                Company
                            </Link>
                      </MenuItem>

                      <MenuItem 
                         onClick={handleClick5}
                         style={{ width:300}}
                      >
                            <ScheduleIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin" >
                                    Schedule
                            </Link>
                            {open5 ? <ExpandLess /> : <ExpandMore />}
                      </MenuItem>
                      <Collapse in={open5} timeout="auto" unmountOnExit>
                          <MenuItem
                              style={{ width:300}}
                          >
                                <CalendarViewMonthIcon style={{ marginLeft: '64px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                                <Link  style={{marginLeft: '32px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/add-schedule" >
                                    Schedule
                                </Link>
                          </MenuItem>
                          <MenuItem 
                              style={{ width:300}}
                          >
                                <CalendarViewWeekIcon style={{ marginLeft: '64px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                                <Link  style={{marginLeft: '32px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/add-schedule_line" >
                                    Schedule Line
                                </Link>
                          </MenuItem>
                      </Collapse>

                    
                      <MenuItem 
                          style={{ width:300}}
                      >
                            <PeopleAltIcon style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/add-supplier" >
                                NMRC Suppliers
                            </Link>
                      </MenuItem>
                      <MenuItem
                          style={{ width:300}}
                      >
                            <PeopleOutlineIcon  style={{ marginLeft: '32px',marginBottom: '5px'}}   fontSize="medium" color="white" />
                            <Link  style={{marginLeft: '16px',marginBottom: '5px',textDecoration: 'none', color:'white' }}  to="/admin/add-pharmacist" >
                                NMRC Pharmacist
                            </Link>
                      </MenuItem>
              </Collapse>
                  
            
          </Drawer>

          
          <main className={classes.main}>
          
          <Switch>
                       {
                            //looping the routes
                            routes.map((route,idx)=>{
                                    return(
                                        route.component && (
                                            <Route
                                                key={idx}
                                                // path is the routes in file routes
                                                path={route.path}
                                                // is the exact set to true in routes file
                                                exact={route.exact}
                                                // name of component ex: dashboard, profile
                                                name={route.name}
                                                render={(props)=>(
                                                        <route.component {...props} />
                                                )}
                                            />
                                        )
                                    )
                            })
                        }
                         {/* Anything inside app.js file in admin route can be redirect */}
                        <Redirect from="/admin" to="/admin/dashboard" />
                     </Switch>
          </main>
        </div>
        <div className={classes.footer}>
          <Typography variant="h6">Copyright &copy; NMRC Version 1.1 {new Date().getFullYear()}</Typography>
        </div>
      </div>
    );
}

export default MasterLayout;

