import React from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router';

import {Link} from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
// import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "15px",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
  

}));




function Navbar() {
  const classes = useStyles();

  const history=useHistory();
  const logoutSubmit=(e)=>{
        e.preventDefault() ;
        axios.post(`/api/logout`).then(res=>{
            if (res.data.status===400) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal({
                    title: "Logout",
                    text:res.data.message,
                    icon: "success",
                    button: "ok",
                    });
                    // history.push('/');
                    //it will go to path exact 
                    history.go(0)
            }

        });
    }

    var AuthButtons="";
    if (!localStorage.getItem('auth_token')) {
       AuthButtons=(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link "  to="/login"><span className="Lnav">Login</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " to="/register"><span className="Lnav">Register</span></Link>
                </li>
            </ul>
       );
    } else {
        AuthButtons=(
            <li className="nav-item">
                <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white">Logout</button>
            </li>
        );
    }


  return (
    <AppBar position="static" style={{ background: '#2E3B55' }}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
        {"Welcome "+localStorage.getItem('auth_name')}
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/login2" className={classes.link}>
              Login2
            </Link>
            <Link to="/contact" className={classes.link}>
              Contact
            </Link>
            <Link to="/login" className={classes.link}>
              Login
            </Link>
            <Link to="/register" className={classes.link}>
              Register
            </Link>
            <Link to="/" className={classes.link} onClick={logoutSubmit}>
              Logout
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;



// import axios from 'axios';
// import React from 'react';
// import swal from 'sweetalert';
// import { useHistory } from 'react-router';

// import {Link} from 'react-router-dom';

// import LogoMakr_7oFEsY from './LogoMakr_7oFEsY.png';

// function Navbar(){
    
//     // to hide login, register, and logout when not need
//     const history=useHistory();
//     const logoutSubmit=(e)=>{
//         e.preventDefault();
//         axios.post(`/api/logout`).then(res=>{
//             if (res.data.status===400) {
//                 localStorage.removeItem('auth_token');
//                 localStorage.removeItem('auth_name');
//                 swal({
//                     title: "Logout",
//                     text:res.data.message,
//                     icon: "success",
//                     button: "ok",
//                     });
//                     // history.push('/');
//                     //it will go to path exact 
//                     history.go(0)
//             }

//         });
//     }

//     var AuthButtons="";
//     if (!localStorage.getItem('auth_token')) {
//        AuthButtons=(
//             <ul className="navbar-nav">
//                 <li className="nav-item">
//                     <Link className="nav-link "  to="/login"><span className="Lnav">Login</span></Link>
//                 </li>
//                 <li className="nav-item">
//                     <Link className="nav-link " to="/register"><span className="Lnav">Register</span></Link>
//                 </li>
//             </ul>
//        );
//     } else {
//         AuthButtons=(
//             <li className="nav-item">
//                 <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white">Logout</button>
//             </li>
//         );
//     }

//     return(
//         <nav className="navbar sb-topnav  navbar-expand">
//             <div className="container-fluid ms-auto">
//             <Link className="nav-link " aria-current="page" to="/">
//                 <span className="Lnav">
//                     <div className="NavPick">
//                         <img src={LogoMakr_7oFEsY}  />
//                     </div>
//                 </span>
//             </Link>
               
//                 {/* <a className="navbar-brand mr-auto" href="#"></a> */}
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             <Link className="nav-link " aria-current="page" to="/"><span className="Lnav">Home</span></Link>
//                         </li>
//                         {
//                             AuthButtons
//                         }
                        
//                     </ul>
                    
//                 </div>
//             </div>
// </nav>
//     );
// }

// export default Navbar;