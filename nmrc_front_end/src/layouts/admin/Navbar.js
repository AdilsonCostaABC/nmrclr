
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router';

import {Link} from 'react-router-dom';

const pages = ['', '', ''];
const settings = ['Profile', 'Accounrtyuytt', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
                // swal({
                //     title: "Logout",
                //     text:res.data.message,
                //     icon: "success",
                //     button: "ok",
                //     });
                    history.push('/');
                    //it will go to path exact 
                    // history.go(0)
            }

        });
    }

  return (
    <AppBar position="fixed" style={{ background: '#2E3B55' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={localStorage.getItem('auth_name')}>
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
              {/* {settings.map((setting) => ( */}
                {/* <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{
                            setting
                            // setting==="Logout"? console.log("truee"):console.log("falseee")
                  }</Typography>
                </MenuItem> */}
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" onClick={logoutSubmit}>
                            Logout
                  </Typography>
                </MenuItem>
            
                <MenuItem >
                  <Typography textAlign="center">
                            <Link style={{ textDecoration: 'none', color:'black' }}  to="/admin/ChangePassword" >
                                User Profile
                           </Link>
                  </Typography>
                  
                </MenuItem>
                
              {/* ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;


// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   CssBaseline,
//   Typography,
//   makeStyles,
// } from "@material-ui/core";
// import { Link } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   navlinks: {
//     marginLeft: theme.spacing(10),
//     display: "flex",
//   },
//  logo: {
//     flexGrow: "1",
//     cursor: "pointer",
//   },
//   link: {
//     textDecoration: "none",
//     color: "white",
//     fontSize: "15px",
//     marginLeft: theme.spacing(5),
//     "&:hover": {
//       color: "yellow",
//       borderBottom: "1px solid white",
//     },
//   },
  

// }));




// function Navbar() {
//   const classes = useStyles();

//   return (
//     <AppBar position="fixed" style={{ background: '#2E3B55' }}>
//       <CssBaseline />
//       <Toolbar>
//         <Typography variant="h4" className={classes.logo}>
//         {localStorage.getItem('auth_name')}
//         </Typography>
//           <div className={classes.navlinks}>
//             <Link to="/" className={classes.link}>
//               Home
//             </Link>
//             <Link to="/about" className={classes.link}>
//               About
//             </Link>
//             <Link to="/contact" className={classes.link}>
//               Contact
//             </Link>
//             <Link to="/login" className={classes.link}>
//               Login
//             </Link>
//             <Link to="/register" className={classes.link}>
//               Register
//             </Link>
//             <Link to="/admin/ChangePassword" className={classes.link}>
//               change password
//             </Link>
//           </div>
//       </Toolbar>
//     </AppBar>
//   );
// }
// export default Navbar;