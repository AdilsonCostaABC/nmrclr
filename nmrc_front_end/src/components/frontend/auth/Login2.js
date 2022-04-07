import * as React from  'react';
import {useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../../../layouts/frontend/Navbar';
// import illustration_login from './illustration_login.png';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {/* <Link color="inherit" href="https://mui.com/"> */}
      <Link color="inherit" href="">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {

    const history=useHistory();
    const [loginInput, setLogin] = useState({
        'email':'',
        'password':'', 
        'error_list':[],
    });
    

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Events ",event);

    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password1'),
    });

    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(`api/login`,{
            email: data.get('email'),
            password: data.get('password1'),
          }).then(res =>{
            if (res.data.status===400 ) {
                localStorage.setItem('auth_token',res.data.token);
                localStorage.setItem('auth_name',res.data.username);
                localStorage.setItem('email',res.data.email);
                // swal({
                //     title: "Login",
                //     text:res.data.message,
                //     icon: "success",
                //     button: "ok",
                //   });
                  //checking if the user is admin or normal user
                  if (res.data.role==='admin') {
                       history.push('/admin/dashboard');
                  } else {
                    history.push('/');
                  }
                
            } else if(res.data.status===300){
                swal({
                    title: "Credentials",
                    text:res.data.message,
                    icon: "warning",
                    button: "ok",
                  });
            }
            else{
                setLogin({...loginInput,error_list:res.data.validations_errors});
            }

        });
});     
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            // backgroundImage: 'url(./nust-entrance.jpg)',
            zIndex: 1,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#00022E' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />           
               <span className="text-danger">{loginInput.error_list.email}</span>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
               <span className="text-danger">{loginInput.error_list.password}</span>
               <span className="text-danger"></span>
               
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ background: '#00022E',mt: 3, mb: 2, '&:hover': {background:'#323457'} }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    
  );
}