// import React from 'react';
// import './../../index.css';
// import React from 'react';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Bar, Doughnut} from 'react-chartjs-2';
//To help the chart to be displayed cause of versions compatiblity
// import {Chart, ArcElement} from 'chart.js'
// Chart.register(ArcElement);
import { Chart, registerables } from 'chart.js';
import Paper from '@mui/material/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import swal from 'sweetalert';

Chart.register(...registerables);


function Dashboard() {

    
    
    
    const [loading, setloading] = useState(true);
    const [SystemData, setSystemData] = useState([]);
    const [SystemData1, setSystemData1] = useState([]);
    const [SystemData2, setSystemData2] = useState([]);
    const [SystemData3, setSystemData3] = useState([]);
    const [SystemData4, setSystemData4] = useState([]);
    const [SystemData5, setSystemData5] = useState([]);
    const [SystemData6, setSystemData6] = useState([]);
    const [SystemData7, setSystemData7] = useState([]);
    

    

    const [query, setQuery] = useState("");
     
    useEffect(() => {
        axios.get(`/api/systemData`).then(res=>{
                console.log(res.data);
                
                if (res.data.status===200) {
                    setSystemData(res.data.Permits);
                    setSystemData1(res.data.PermitNotVerified);
                    setSystemData2(res.data.PermitsVerified);
                    setSystemData3(res.data.PermitsApproved);
                    setSystemData4(res.data.PermitsSignedoff);
                    setSystemData5(res.data.PermitsRejected);
                    setSystemData6(res.data.Suppliers);
                    setSystemData7(res.data.Pharmacists);
                    
                }
                // setloading(false);
        });
    }, []);

    const data1={
        labels:["Permits","Permits Not Verified","Permits Verified","Permits Approved","Permits Signedoff"," Permits Rejected","Suppliers","Pharmacists"],
        datasets:[{
            label: 'System Data',
            data:[SystemData,SystemData1,SystemData2,SystemData3,SystemData4,SystemData5,SystemData6,SystemData7],
            backgroundColor:[
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(100, 100, 100, 0.8)',
                'rgba(150, 255, 55, 0.8)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(100, 100, 100, 0.8)',
                'rgba(150, 255, 55, 0.8)'
              ],
              borderWidth: 1,
        }]
        
    
    };
    

    // var graphs="";
    // if (loading) {
    //     return <h4>Loading dashboard...</h4>
    // }
    // else
    // {
    //     graphs=(
    //             <h1>yes yes yes yes yes</h1> 
    //         )
    // }
       
return (
    //  <div className="dashAdmin" ></div>
    <div>
             {/* <h1> I am Dashboard</h1>  */}
             <div style={{width:"700px", padding:"50px"}}>
                <Bar data={data1}/>
            </div>
            <div style={{width:"400px", paddingLeft:"50px"}}>
                <Doughnut data={data1}/>
            </div>
            {/*
            <Paper
            
                sx={{ mb:2, mt: 2 , ml:4,p: '2px 20px', display: 'flex', alignItems: 'center', width: 700 }}
                >
                        <IconButton sx={{ ml:1,p: '10px' }} aria-label="menu">
                            <MenuIcon />
                        </IconButton>

                         
                        <TextField
                            sx={{ ml: 1, flex: 1 }}
                            id="standard-search"
                            label="Search by institution"
                            type="search"
                            variant="standard"
                            color="warning"
                            onChange={event => setQuery(event.target.value)}
                            placeholder="Search by institution"
                        />
                       
                        <form onSubmit={GraphByInstitution} 
                          sx={{ display: 'flex', width: 100 }}
                        >
                            
                            <Button
                            type="submit"
                            
                            variant="contained"
                            sx={{ background: '#00022E', ml:2,mt: 3, mb: 2, '&:hover': { background: '#191b42', color:'white' } }}
                           >
                            ok
                           </Button>
                        </form>
           </Paper> 
           <div style={{marginLeft:"100px",width:"700px", padding:"50px"}}>
                <Bar data={data3}/>
            </div>
             
            */}
        </div>
    )
}
export default Dashboard;

