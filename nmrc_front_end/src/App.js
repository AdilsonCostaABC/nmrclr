import React  from 'react';

import {BrowserRouter as Router,Redirect, Route, Switch} from 'react-router-dom';

import MasterLayout  from "./layouts/admin/MasterLayout";
import Home from './components/frontend/Home';
import Login from './components/frontend/auth/Login';
import Login2 from './components/frontend/auth/Login2';
import Register from './components/frontend/auth/Register';
import axios from 'axios';
import './index.css';
import AdminPrivateRoute from './AdminPrivateRoute';
import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';



axios.defaults.baseURL="http://localhost:8000/";
//to accept  json format
axios.defaults.headers.post['Accept']='appllication/json';
axios.defaults.headers.post['Content-Type']='appllication/json';

axios.defaults.withCredentials = true;
//To authorize Bearer Token
axios.interceptors.request.use(function (config){
  const token=localStorage.getItem('auth_token');
  config.headers.Authorization = token ?  `Bearer ${token}` :'';
  return config;
});

function App() {
  return (
    <div className="App">
      
      <Router>
        <Switch>
          <Route   path="/login" component={Login} />
          <Route exact path="/" component={Login2}/>
          <Route  path="/login2" component={Login2}/>
          {/* Route for 403 and 403 in AdminPrivateRoute */}
          <Route path="/403" component={Page403}/>
          <Route path="/404" component={Page404}/>
          {/* <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} /> */}
          {/* if there is user logged in, do not allow to 
           from url to go to login or register */}
          <Route path="/login" >
            {localStorage.getItem('auth_token') ? <Redirect to='/admin/dashboard' />:<Login />}
          </Route>
          <Route path="/register"> 
            {localStorage.getItem('auth_token') ? <Redirect to='/admin/dashboard' />:<Register />}
          </Route>
            
          {/* This route name is Admin created in route.js file */}
          {/*Any component that will be shared will also be shared with routes.js file.
          
          and it will also go to Master and check over there cause of {...props}*/}
          {/* <Route path="/admin" name="Admin" render={(props)=> <MasterLayout{...props} />} /> */}

          {/* From here in leads to adminPrivate */}
          <AdminPrivateRoute path="/admin"  name="Admin" />

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
