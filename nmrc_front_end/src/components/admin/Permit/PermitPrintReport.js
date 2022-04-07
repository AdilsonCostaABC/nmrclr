import axios from 'axios';
import React,{Fragment,useState,useEffect} from 'react';
import { Text, View,PDFViewer,Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import logo from './IMG-20210421-WA0103.jpg'
import Paper from '@mui/material/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DatePicker from '@mui/lab/DatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function PermitPrintReport(props) {
     
    // const [query, setQuery] = useState("");
    // const [query1, setQuery1] = useState("");
    const borderColor = '#90e5fc';
    // const [value, setValue] = React.useState([null, null]);


   
    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Helvetica',
            fontSize: 11,
            paddingTop: 30,
            paddingLeft:60,
            paddingRight:60,
            lineHeight: 1.5,
            flexDirection: 'column',
        }, 
        logo: {
            width: 74,
            height: 55,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
        //title
        ,
        titleContainer:{
            flexDirection: 'row',
            marginTop: 24,
        },
        reportTitle:{
            
            color:'#d50000',
            letterSpacing: 4,
            fontSize: 20,
            textAlign: 'center',
            textTransform: 'uppercase',
            marginLeft:50
        
        },
        invoiceNoContainer: {
          flexDirection: 'row',
          marginTop: 36,
          marginLeft: 320,
         
      },
      invoiceDateContainer: {
          flexDirection: 'row',
          justifyContent: 'flex-end'
      },
      invoiceDate: {
              fontSize: 12,
              fontStyle: 'bold',
        
      },
      label: {
          width: 100,
          
      },
      headerContainer: {
        marginTop: 20,
        
    },
    billTo: {
        marginTop: 15,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique',
        fontSize: 18,
        color:'#00022E',
        
    },
  tableContainer: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      marginTop: 24,
      borderWidth: 1,
      borderColor: '#bff0fd',
      height: 300,
  },
  row:{
    flexDirection: 'column',
    alignItems: 'left',
    height: 270,
    fontStyle: 'bold',
    marginLeft:-20    
},
  row2:{
    flexDirection: 'column',
    alignItems: 'left',
    height: 250,
    fontStyle: 'bold',
    
},
description: {
   
    fontStyle: 'bold',
    width: '130%',
    textAlign: 'left',
    
    marginLeft: "20%",
    borderLeftColor: borderColor,
    borderLeftWidth: 1,
    height: 24,
    borderBottomColor:borderColor,
    borderBottomWidth: 1,
    backgroundColor: '#bff0fd',
},
qty: {
    width: '320%',
    textAlign: 'left',
    paddingLeft: 8,
    marginLeft: "28%",
    borderLeftColor: borderColor,
    borderLeftWidth: 1,
    height: 24,
    borderBottomColor:borderColor,
    borderBottomWidth: 1,
    fontSize:'8px'
    
},


     });



    const [loading, setloading] = useState(true);
    const [permitList, setpermitList] = useState([]);

    useEffect(() => {
        const permit_id=props.match.params.id;
        // axios.get(`/api/view-report`).then(res=>{
        axios.get(`/api/print-permit-report/${permit_id}`).then(res=>{
                console.log(res.data.signoff_permit);
                
                if (res.data.status===200) {
                    setpermitList(res.data.signoff_permit);
                }
                setloading(false);
        });
    }, []);
     
    

    var permit_report="";
    if (loading) {
        return <h4>Loading permit to be printed...</h4>
    }
    else
    {
        
        permit_report= 
        // permit_report= permitList.filter(permit => {
           
           
        //     if (query==='')
        //     {
        //         return permit;
        //     }else if ( ( permit.permit_date===query) || ( permit.permit_date>=query &&  permit.permit_date<=query1) || (permit.company.comp_name.toLowerCase().includes(query.toLowerCase())) || (permit.permit_no.toLowerCase().includes(query.toLowerCase())) || (permit.points_of_entry_exit.name.toLowerCase().includes(query.toLowerCase()))   ) {
        //         return permit;
        //     }            

        // }).map((permit, index) => (                  
           
            <Page size="A4" style={styles.page}>
                    <Image style={styles.logo} src={logo} />
                
                    <View style={styles.titleContainer}>
                        <Text style={styles.reportTitle}>NMRC Permit Application </Text>
                    </View>
                    <Fragment>
                        <View style={styles.invoiceNoContainer}>
                            <Text style={styles.label}>Permit No:</Text>
                            <Text style={styles.invoiceDate}>{permitList.permit_no}</Text>
                        </View >
                        <View style={styles.invoiceDateContainer}>
                            <Text style={styles.label}>Date: </Text>
                            <Text >{permitList.permit_date}</Text>
                        </View >
                    </Fragment>
                
                    <View style={styles.headerContainer}>
                        <Text style={styles.billTo}>Company</Text>
                        <Text>{permitList.company.comp_name}</Text>
                    
                    </View>
                
                
                    <View style={styles.tableContainer}>

                        <Fragment>  
                        <View style={styles.row} >
                            <Text style={styles.description}>Check digit</Text>
                            
                            <Text style={styles.description}>Supplier</Text>
                            
                            <Text style={styles.description}>Pharmacisty</Text>
                            
                            <Text style={styles.description}>Valide from </Text>
                            
                            <Text style={styles.description}>To</Text>
                        
                            <Text style={styles.description}>Point of Entry</Text>
                            
                            <Text style={styles.description}>Purpose</Text>
                            
                            <Text style={styles.description}>Status</Text>
            
                            <Text style={styles.description}>Applicant</Text>
            
                            <Text style={styles.description}>Id</Text>
                            
                        </View>
                        </Fragment>

                        <Fragment> 
                        <View style={styles.row2} >
                            
                            <Text style={styles.qty}>{permitList.check_digit}</Text>
                            
                            <Text style={styles.qty}>{permitList.supplier.company_name}</Text>
                            
                            <Text style={styles.qty}>  {permitList.pharmacist.first_name+" "+permitList.pharmacist.last_name}</Text>
                            <Text style={styles.qty}>{permitList.valid_from}</Text>

                            <Text style={styles.qty}>{permitList.valid_to}</Text>

                            <Text style={styles.qty}>{permitList.points_of_entry_exit.name}</Text>
                           
                            <Text style={styles.qty}>{permitList.purpose_use}</Text>

                            <Text style={styles.qty}>{permitList.permit_status}</Text>

                            <Text style={styles.qty}>{permitList.company.comp_name}</Text>

                            <Text style={styles.qty}>{permitList.id}</Text>
                        </View>
                        </Fragment>
                    </View>
                </Page>

        // ))

       
        


    }    
    return (
        <div>
            {/* <div >

            
            <Paper
            
                sx={{ mb:2, mt: 2 , ml:4,p: '2px 20px', display: 'flex', alignItems: 'center', width: 1000 }}
                >
                        <IconButton sx={{ ml:1,p: '10px' }} aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                         <TextField
                            sx={{ ml: 1, flex: 1 }}
                            id="standard-search"
                            label="Search Permit  by No/Company/POE"
                            type="search"
                            variant="standard"
                            color="warning"
                            onChange={event => setQuery(event.target.value)}
                            placeholder="Search Permit  by No/Company/POE"
                        />
                        <IconButton  
                        sx={{ p: '10px' }}
                         aria-label="search"
                         >
                            <SearchIcon />
                        </IconButton>

                        {/* <FormControl variant="standard" sx={{ ml:1,mr:1, minWidth: 150 }}>
                            <InputLabel style={{ color: '#e63946' }}  id="programme_id">Status update</InputLabel>
                            <Select
                                id="status_update"
                                name="status_update"
                                type="text"
                                onChange={event => setQuery(event.target.value)}
                                label="Status update"
                                color="warning"
                                margin="normal"
                                required
                                fullWidth
                                autoFocus
                            >
                                <MenuItem value={""}>None</MenuItem>
                                <MenuItem value={"Started"}>Started</MenuItem>
                                <MenuItem value={"Not started"}>Not started</MenuItem>
                                <MenuItem value={"Delayed"}>Delayed</MenuItem>
                                <MenuItem value={"Ontrack"}>Ontrack</MenuItem>
                                <MenuItem value={"Completed"}>Completed</MenuItem>

                            </Select>
                        </FormControl> */}
{/* 
                   
                        
                                   <LocalizationProvider dateAdapter={AdapterDateFns}>
                                   <TextField 
                                      type="date"
                                      color="warning"
                                      name="iniDate"
                                   
                                      onChange={event => setQuery(event.target.value)}
                                      
                                   /> 
                                    </LocalizationProvider>
                                    <label sx={{ ml: 2 }}> to </label>
                                   <LocalizationProvider dateAdapter={AdapterDateFns}>
                                   <TextField 
                                      type="date"
                                      color="warning"
                                      name="endDate"
                                   
                                    onChange={event => setQuery1(event.target.value)}
                                   /> 
                                    </LocalizationProvider>
                </Paper> */}

                
                {/* </div>   */} 

            <Fragment>
                <PDFViewer width="1000" height="600" className="app" >
                    <Document>
                        {permit_report}
                       
                    </Document>  
                </PDFViewer>
            </Fragment>
        </div>
            
            
            )
            
}
export default PermitPrintReport;