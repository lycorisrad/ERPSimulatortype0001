import React, { Component } from 'react';
import axios from "axios";
import Box from '@material-ui/core/Box';
import Table from './Table3';
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import { Fragment } from "react";
import{Container, Row, Col, Jumbotron, Button, Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText, Badge, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Formik,Input,Menu } from 'antd';
import { PropTypes } from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {
    MenuItem,
    TableContainer,
    TextField
  } from "@material-ui/core";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Checkbox from "@material-ui/core/Checkbox";
  import InputAdornment from "@material-ui/core/InputAdornment";
import { classes } from 'istanbul-lib-coverage';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiThemeProvider } from 'material-ui/styles';
import { ModalDialog } from 'react-bootstrap';
import { TableRowColumn } from 'material-ui/Table';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { AutoComplete, TableBody} from 'material-ui';
import Icon from '@material-ui/core/Icon';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FormatListNumbered } from '@material-ui/icons';

class DataTransferOrder extends Component{
     constructor(props){
         super(props);
         this.state={
             data:[],
             IDdata:[],
             
             listMotherboard1:[],
             listMotherboard2:[],
             listtestclass:[],

             listproductspecification21:[],
             listclient2:[],
             listShipping2:[],
             listMotherboard21:[],
             listMotherboard22:[],
             listsingleanddual2:[],
             listtestsoftware2:[],
             listtestclass2:[],

             id:"",
             productspecification:"",
             productspecification2:"",
             productspecification3:"",
             productspecification4:"",
             productspecification5:"",
             productspecification6:"",
             productspecification7:"",
             productspecification8:"",
             productspecification9:"",
             vendor:"",
             buynumber:"",
             client:"",
             pono:"",
             amount:"",
             backupamount:"",
             repairIC:"",
             singleanddual:"",
             testsoftware:"",
             process:"",
             Orginial:false,
             ModulePN:"",
             ICPN:"",
             PCBno:"",
             level:"",
             ICSize:"",
             SPDCode:"",
             SPDCL:"",
             POQty:"",
             Motherboard1:"",
             Motherboard2:"",
             ATRNO:"",
             testclass:"",
               
             Module:"",
             IC:"",
             expectshiptime:"",
             
             id2:"",
             productspecification2:"",
             productspecification21:"",
             productspecification22:"",
             productspecification23:"",
             productspecification24:"",
             productspecification25:"",
             productspecification26:"",
             productspecification27:"",
             productspecification28:"",
             vendor2:"",
             buynumber2:"",
             client2:"",
             pono2:"",
             amount2:"",
             backupamount2:"",
             repairIC2:"",
             singleanddual2:"",
             testsoftware2:"",
             process2:"",
             Orginial2:false,
             ModulePN2:"",
             ICPN2:"",
             PCBno2:"",
             level2:"",
             ICSize2:"",
             SPDCode2:"",
             SPDCL2:"",
             Shipping2:"",
             POQty2:"",
             Motherboard21:"",
             Motherboard22:"",
             ATRNO2:"",
             testclass2:"",
             description:"",
             description2:"",
             description3:"",
             description4:"",

             Dataview:{
                 MDHM:"",
                 Qty:"",
                 Remark:"",
             }
         }
     }
     getAllOption=()=>{
        axios.all([
            axios.get("http://localhost:3003/data"),
            axios.get("http://localhost:3003/listMotherboard1"),
            axios.get("http://localhost:3003/listMotherboard2"),
            axios.get("http://localhost:3003/listtestclass"),

            axios.get("http://localhost:3003/listproductspecification21"),
            axios.get("http://localhost:3003/listclient2"),
            axios.get("http://localhost:3003/listShipping2"),
            axios.get("http://localhost:3003/listMotherboard21"),
            axios.get("http://localhost:3003/listMotherboard22"),
            axios.get("http://localhost:3003/listsingleanddual2"),
            axios.get("http://localhost:3003/listtestsoftware2"),
            axios.get("http://localhost:3003/listtestclass2"),
        ])
        .then(
            axios.spread((
                res,res1,res2,res3
                ,res4,res5,res6,res7,res8,res9,res10,res11
            )=>{
                this.setState({
                    data:res.data,
                    listMotherboard1:res1.data,
                    listMotherboard2:res2.data,
                    listtestclass:res3.data,

                    listproductspecification21:res4.data,
                    listclient2:res5.data,
                    listShipping2:res6.data,
                    listMotherboard21:res7.data,
                    listMotherboard22:res8.data,
                    listsingleanddual2:res9.data,
                    listtestsoftware2:res10.data,
                    listtestclass2:res11.data
                })
            })
        )
     }
     componentDidMount(){
         this.getAllOption();
     }
     handleChange=(e)=>{
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]:value
        })
    }
    handleChecked =(e)=>{
        const name = e.target.name
        const value = e.target.checked
        this.setState({
            [name] : value
        })
    }
    handleChangeID=(e,values)=>{
        this.setState({
            id:values.id
          })
        this.state.data.map((item,index)=>{
            if(values.id == item.id){
                this.setState({
                    IDdata:item.data,
                    id:item.id,
                    productspecification:item.productspecification,
                    productspecification2:item.productspecification2,
                    productspecification3:item.productspecification3,
                    productspecification4:item.productspecification4,
                    productspecification5:item.productspecification5,
                    productspecification6:item.productspecification6,
                    productspecification7:item.productspecification7,
                    productspecification8:item.productspecification8,
                    productspecification9:item.productspecification9,
                    vendor:item.vendor,
                    buynumber:item.buynumber,
                    client:item.client,
                    pono:item.pono,
                    amount:item.amount,
                    backupamount:item.backupamount,
                    repairIC:item.repairIC,
                    singleanddual:item.singleanddual,
                    testsoftware:item.testsoftware,
                    process:item.process,
                    Orginial:false,
                    ModulePN:item.ModulePN,
                    ICPN:item.ICPN,
                    PCBno:item.PCBno,
                    level:item.level,
                    ICSize:item.ICSize,
                    SPDCode:item.SPDCode,
                    SPDCL:item.SPDCL,
                    POQty:item.POQty,
                    Motherboard1:item.Motherboard1,
                    Motherboard2:item.Motherboard2,
                    ATRNO:item.ATRNO,
                    testclass:item.testclass,

                    id2:item.id2,
             productspecification2:item.productspecification2,
             productspecification21:item.productspecification21,
             productspecification22:item.productspecification22,
             productspecification23:item.productspecification23,
             productspecification24:item.productspecification24,
             productspecification25:item.productspecification25,
             productspecification26:item.productspecification26,
             productspecification27:item.productspecification27,
             productspecification28:item.productspecification28,
             vendor2:item.vendor2,
             buynumber2:item.buynumber2,
             client2:item.client,
             pono2:item.pono2,
             amount2:item.amount2,
             backupamount2:item.backupamount2,
             repairIC2:item.repairIC2,
             singleanddual2:item.singleanddual2,
             testsoftware2:item.testsoftware2,
             process2:item.process2,
             Orginial2:item.Orginial2,
             ModulePN2:item.ModulePN2,
             ICPN2:item.ICPN2,
             PCBno2:item.PCBno2,
             level2:item.level2,
             ICSize2:item.ICSize2,
             SPDCode2:item.SPDCode2,
             SPDCL2:item.SPDCL2,
             Shipping2:item.Shipping2,
             POQty2:item.POQty2,
             Motherboard21:item.Motherboard21,
             Motherboard22:item.Motherboard22,
             ATRNO2:item.ATRNO2,
             testclass2:item.testclass2,
             description:item.description,
             description2:item.description2,
             description3:item.description3,
             description4:item.description4,
                })
            }
            return true
        })
    }
    handleclear=()=>{
        this.setState({
            id:"",
            IDdata:"",
            productspecification:"",
            productspecification2:"",
            productspecification3:"",
            productspecification4:"",
            productspecification5:"",
            productspecification6:"",
            productspecification7:"",
            productspecification8:"",
            productspecification9:"",
            vendor:"",
            buynumber:"",
            client:"",
            pono:"",
            amount:"",
            backupamount:"",
            repairIC:"",
            singleanddual:"",
            testsoftware:"",
            process:"",
            Orginial:false,
            ModulePN:"",
            ICPN:"",
            PCBno:"",
            level:"",
            ICSize:"",
            SPDCode:"",
            SPDCL:"",
            POQty:"",
            Motherboard1:"",
            Motherboard2:"",
            ATRNO:"",
            testclass:"",

            id2:"",
            productspecification2:"",
            productspecification21:"",
            productspecification22:"",
            productspecification23:"",
            productspecification24:"",
            productspecification25:"",
            productspecification26:"",
            productspecification27:"",
            productspecification28:"",
            vendor2:"",
            buynumber2:"",
            client2:"",
            pono2:"",
            amount2:"",
            backupamount2:"",
            repairIC2:"",
            singleanddual2:"",
            testsoftware2:"",
            process2:"",
            Orginial2:false,
            ModulePN2:"",
            ICPN2:"",
            PCBno2:"",
            level2:"",
            ICSize2:"",
            SPDCode2:"",
            SPDCL2:"",
            Shipping2:"",
            POQty2:"",
            Motherboard21:"",
            Motherboard22:"",
            ATRNO2:"",
            testclass2:"",
            description:"",
            description2:"",
            description3:"",
            description4:"",

        })
    }
    render(){
        const defaultProps = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '23rem', height: '10rem' },
            borderColor: 'text.primary',
          };
          const defaultProps1 = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '15rem', height: '10rem' },
            borderColor: 'text.primary',
          };
        const theme = createTheme();
        theme.typography.h6={
           fontSize: '3rem',
           '@media (min-width:700px)': {
             fontSize: '3rem',
           },
           [theme.breakpoints.up('md')]: {
             fontSize: '1.2rem',
           },
        }
        const description1style={
            minHeight:'50px',
            resize:'auto',
            padding:'9px',
            boxSizing:'border-box',
            fontSize:'15px',
            width:'200px'
           }
           const description2style={
            minHeight:'120px',
            resize:'auto',
            padding:'9px',
            boxSizing:'border-box',
            fontSize:'15px',
            width:'200px'
           }
        const Columns=[
            {
                title:"M/D/H/M",
                field:"MDHM",
                editComponent:(({value,onChange})=>(
                    <TextField
                    name="MDHM"
                    floatingLabelText="M/D/H/M"
                    InputLabelProps={{ shrink: true, required: true }}
                    type="datetime-local"
                    onChange={(e)=>onChange(e.target.value)}
                    floatingLabelFixed
                    style={{ width: '100%' }}
                    value={value}
                    InputLabelProps={{
                       shrink: true,
                     }}
                  />
                          ))
            },{
                title:"Q'ty",
                field:"Qty"
            },{
                title:"Remark",
                field:"Remark",
                editComponent:(({value,onChange})=>(
                    <textarea
                    name="Remark"
                    className = "form-control"
                    onChange = {(e)=>onChange(e.target.value)}
                    value={value}
                       />
                   ))
            }
        ]
        return(
            <div className ="content">
                 <Box
         display="flex"
         alignItems="flex-start"
         pl={1}
         mt={1}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
         <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">請選擇欲轉工單單號 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1} mt={1}>
          <Autocomplete
                  inputValue={this.state.id}
                  onInputChange={this.handleChangeID}
                  options={this.state.data}   
                  getOptionLabel={(option) => option.id}
                  style={{ width: 200 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullWidth 
                  />
                  )}
                />
          </Box>
         </Box>
         <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              <Box pl={3}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">工單單號 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="id"
           value={this.state.id}
           style={{width:'75%'}}
           />
          </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              
              <Box pl={3}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">品名規格 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
          <TextField
           name="productspecification"
           value={this.state.productspecification}
           style={{width:'7%'}}
           />
          <Box pl={1}></Box>
          <TextField
           name="productspecification2"
           value={this.state.productspecification2}
           style={{width:'7%'}}
           />
          <Box pl={1}></Box>
          <TextField
           name="productspecification3"
           value={this.state.productspecification3}
           style={{width:'7%'}}
           />
           <Box pl={1}></Box>
          <TextField
           name="productspecification4"
           value={this.state.productspecification4}
           style={{width:'7%'}}
           />
             <Box pl={15}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">製程 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="process"
           value={this.state.process}
           style={{width:'75%'}}
           />
          </Box>
          <Box pl={20}>
          <Checkbox
            value = {this.state.Orginial}
            checked = {this.state.Orginial}
            onChange={this.handleChecked}
            name ="Orginial"
        />
        </Box>
        <Box pl={1} mt={1}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">Orginial</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <TextField
           name="productspecification5"
           value={this.state.productspecification5}
           style={{width:'7%'}}
           />
              <Box pl={1}></Box>
              <TextField
           name="productspecification6"
           value={this.state.productspecification6}
           
           style={{width:'7%'}}
           />
            <Box pl={1}></Box>
              <TextField
           name="productspecification7"
           value={this.state.productspecification7}
           
           style={{width:'7%'}}
           />
             <Box pl={1}></Box>
              <TextField
           name="productspecification8"
           value={this.state.productspecification8}
           
           style={{width:'7%'}}
           />
             <Box pl={1}></Box>
              <TextField
           name="productspecification9"
           value={this.state.productspecification9}
           
           style={{width:'7%'}}
           />
              <Box pl={7}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">Module P/N :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="ModulePN"
           value={this.state.ModulePN}
           
           style={{width:'7%'}}
           />
             <Box pl={25}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">IC P/N :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="ICPN"
           value={this.state.ICPN}
           style={{width:'7%'}}
           />
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
               <Box pl={4}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">Vendor :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="vendor"
           value={this.state.vendor}
           
           style={{width:'7%'}}
           />
           <Box pl={12}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">採購單號 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="buynumber"
           value={this.state.buynumber}
           
           style={{width:'7%'}}
           />
            <Box pl={24}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">PCB No. :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="PCBno"
           value={this.state.PCBno}
           
           style={{width:'7%'}}
           />
            <Box pl={27}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">等級 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="level"
           value={this.state.level}
           
           style={{width:'7%'}}
           />
           <Box pl={27}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">IC Size :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="ICSize"
           value={this.state.ICSize}
           
           style={{width:'7%'}}
           />
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                <Box pl={7}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">客戶 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="client"
           value={this.state.client}
           
           style={{width:'7%'}}
           />
             <Box pl={14}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">PO No. :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="client"
           value={this.state.client}
           
           style={{width:'7%'}}
           />
            <Box pl={18}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">SPD Code/CL :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="SPDCode"
           value={this.state.SPDCode}
           
           style={{width:'7%'}}
           />
           <Box pl={1}></Box>
              <TextField
           name="SPDCL"
           value={this.state.SPDCL}
           
           style={{width:'7%'}}
           />
             <Box pl={60}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">PO Qty :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="POQty"
           value={this.state.POQty}
           
           style={{width:'7%'}}
           />
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                   <Box pl={7}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">數量/備品/維修IC :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="amount"
           value={this.state.amount} 
           style={{width:'7%'}}
           />
           <Box pl={1}></Box>
              <TextField
           name="backupamount"
           value={this.state.backupamount} 
           style={{width:'7%'}}
           />
           <Box pl={1}></Box>
              <TextField
           name="repairIC"
           value={this.state.repairIC} 
           style={{width:'7%'}}
           />
                 <Box pl={12}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">Motherboard :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.Motherboard1}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            Motherboard1:newValue.Motherboard1
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                            Motherboard1:e.target.value
                   })
                    }
                  }}
                  options={this.state.listMotherboard1}
                   
                  getOptionLabel={(option) => option.Motherboard1}
                  style={{ width: 350 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullWidth 
                  />
                  )}
                />
        </Box>
        <Box pl={49.5}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">ATR NO :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="ATRNO"
           value={this.state.ATRNO} 
           style={{width:'7%'}}
           />
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <Box pl={8}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">Single/Dual :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="singleanddual"
           value={this.state.singleanddual} 
           style={{width:'7%'}}
           />
            <Box pl={4}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">測試軟體 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="testsoftware"
           value={this.state.testsoftware} 
           style={{width:'7%'}}
           />
             <Box pl={35.5} mt={-2}>
        <Autocomplete
                  inputValue={this.state.Motherboard2}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            Motherboard2:newValue.Motherboard2
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                            Motherboard2:e.target.value
                   })
                    }
                  }}
                  options={this.state.listMotherboard2}
                   
                  getOptionLabel={(option) => option.Motherboard2}
                  style={{ width: 350 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullWidth 
                  />
                  )}
                />
        </Box>
        <Box pl={48}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">測試類別 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1} mt={-2}>
          <Autocomplete
                  inputValue={this.state.testclass}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            testclass:newValue.testclass
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                            testclass:e.target.value
                   })
                    }
                  }}
                  options={this.state.listtestclass}
                   
                  getOptionLabel={(option) => option.testclass}
                  style={{ width: 150 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullWidth 
                  />
                  )}
                />
                </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={50}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <FormControl component="fieldset">
            <Box pl={20}>
      <FormLabel component="legend" >請選擇製程</FormLabel>
      </Box>
      <RadioGroup aria-label="gender" name="gender1" value={this.state.bank} 
      onChange={
        (e)=>{
          if(this.state.showadd ==true || this.state.showEdit ==true){
          this.setState({
          bank : e.target.value
      })
        }
      }}>
      <Box border={1} {...defaultProps}>
      <Box pl={3}>
        <FormControlLabel value="3" control={<Radio />} label="3" />
        </Box>
        <Box pl={3}>
        <FormControlLabel value="3+4" control={<Radio />} label="3+4" />
        </Box>
        <Box pl={3}>
        <FormControlLabel value="3+4+5" control={<Radio />} label="3+4+5"/>
        </Box>
      </Box>
      <Box pl={15} mt={-21}>
      <Box>
        <FormControlLabel value="7" control={<Radio />} label="7" />
        </Box>
        <Box>
        <FormControlLabel value="7+8" control={<Radio />} label="7+8" />
        </Box>
        <Box>
        <FormControlLabel value="1+2+3+4+5" control={<Radio />} label="1+2+3+4+5"/>
        </Box>
      </Box>
      <Box pl={30} mt={-18.5}>
      <Box>
        <FormControlLabel value="8" control={<Radio />} label="8" />
        </Box>
        <Box>
        <FormControlLabel value="增加維修IC" control={<Radio />} label="增加維修IC" />
        </Box>
        <Box>
        <FormControlLabel value="0+9" control={<Radio />} label="0+9"/>
        </Box>
      </Box>
      </RadioGroup>
    </FormControl>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={100}
          mt={-12.5}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <FormControl component="fieldset">
            <Box pl={12}>
      <FormLabel component="legend" >轉單數量</FormLabel>
      </Box>
      <RadioGroup aria-label="gender" name="gender1" value={this.state.bank} 
      onChange={
        (e)=>{
          if(this.state.showadd ==true || this.state.showEdit ==true){
          this.setState({
          bank : e.target.value
      })
        }
      }}>
      <Box border={1} {...defaultProps1}>
      <Box pl={3} mt={3}>
      <ThemeProvider theme={theme}>
          <Typography variant="h6">Module :</Typography>
          </ThemeProvider>
        </Box>
        <Box pl={13} mt={-4}>
        <TextField
        name="Module"
        disabled={this.state.Module}
        value={this.state.Module}
        style={{width:'75%'}}
        onChange={this.handleChange}
       />
        </Box>
        <Box pl={8.5} mt={5}>
      <ThemeProvider theme={theme}>
          <Typography variant="h6">IC :</Typography>
          </ThemeProvider>
        </Box>
        <Box pl={13} mt={-4}>
        <TextField
        name="Module"
        disabled={this.state.Module}
        value={this.state.Module}
        style={{width:'75%'}}
        onChange={this.handleChange}
       />
        </Box>
      </Box>
      </RadioGroup>
    </FormControl>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={12}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              <Box pl={3}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">工單單號 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="id2"
           value={this.state.id2}
           style={{width:'75%'}}
           />
          </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              
              <Box pl={3}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">品名規格 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
          <TextField
           name="productspecification2"
           value={this.state.productspecification2}
           style={{width:'7%'}}
           />
          <Box pl={1} mt={-2}>
          <Autocomplete
                  inputValue={this.state.productspecification21}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            productspecification21:newValue.productspecification21
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                            productspecification21:e.target.value
                   })
                    }
                  }}
                  options={this.state.listproductspecification21}
                   
                  getOptionLabel={(option) => option.productspecification21}
                  style={{ width: 150 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullWidth 
                  />
                  )}
                />
                </Box>
          <Box pl={1}></Box>
          <TextField
           name="productspecification22"
           value={this.state.productspecification22}
           style={{width:'7%'}}
           />
           <Box pl={1}></Box>
          <TextField
           name="productspecification23"
           value={this.state.productspecification23}
           style={{width:'7%'}}
           />
             <Box pl={15}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">製程 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="process2"
           value={this.state.process2}
           style={{width:'75%'}}
           />
          </Box>
          <Box pl={20}>
          <Checkbox
            value = {this.state.Orginial2}
            checked = {this.state.Orginial2}
            onChange={this.handleChecked}
            name ="Orginial2"
        />
        </Box>
        <Box pl={1} mt={1}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">Orginial2</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={35} mt={1}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">Marking內容 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <TextField
           name="productspecification24"
           value={this.state.productspecification24}
           style={{width:'7%'}}
           />
              <Box pl={1}></Box>
              <TextField
           name="productspecification25"
           value={this.state.productspecification25}
           
           style={{width:'7%'}}
           />
            <Box pl={1}></Box>
              <TextField
           name="productspecification26"
           value={this.state.productspecification26}
           
           style={{width:'7%'}}
           />
             <Box pl={1}></Box>
              <TextField
           name="productspecification27"
           value={this.state.productspecification27}
           
           style={{width:'7%'}}
           />
             <Box pl={1}></Box>
              <TextField
           name="productspecification28"
           value={this.state.productspecification28}
           
           style={{width:'7%'}}
           />
              <Box pl={5}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">Module P/N :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="ModulePN2"
           value={this.state.ModulePN2}
           
           style={{width:'7%'}}
           />
             <Box pl={25}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">IC P/N :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="ICPN2"
           value={this.state.ICPN2}
           style={{width:'7%'}}
           />
           <Box pl={27} mt={-4}>
            <textarea
           style={description2style}
          name="description"
          className = "form-control"
          onChange = {this.handleChange}
          value={this.state.description}
             />
            </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
               <Box pl={4}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">Vendor :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="vendor2"
           value={this.state.vendor2}
           
           style={{width:'7%'}}
           />
           <Box pl={15}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">採購單號 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="buynumber2"
           value={this.state.buynumber2}
           
           style={{width:'7%'}}
           />
            <Box pl={24}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">PCB No. :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="PCBno2"
           value={this.state.PCBno2}
           style={{width:'7%'}}
           />
            <Box pl={27}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">等級 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="level2"
           value={this.state.level2}
           
           style={{width:'7%'}}
           />
          
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                <Box pl={7}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">客戶 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1} mt={-2}>
          <Autocomplete
                  inputValue={this.state.client2}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            client2:newValue.client2
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          client2:e.target.value
                   })
                    }
                  }}
                  options={this.state.listclient2}
                   
                  getOptionLabel={(option) => option.client2}
                  style={{ width: 150 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullWidth 
                  />
                  )}
                />
                </Box>
             <Box pl={14}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">PO No. :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="pono2"
           value={this.state.pono2}
           
           style={{width:'7%'}}
           />
            <Box pl={18}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">SPD Code/CL :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="SPDCode2"
           value={this.state.SPDCode2}
           
           style={{width:'7%'}}
           />
           <Box pl={1}></Box>
              <TextField
           name="SPDCL2"
           value={this.state.SPDCL2}
           
           style={{width:'7%'}}
           />
              <Box pl={59}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">Date Code :</Typography>
          </ThemeProvider>
          </Box>

          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <Box pl={2}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">Shipping :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1} mt={-2}>
          <Autocomplete
                  inputValue={this.state.Shipping2}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            Shipping2:newValue.Shipping2
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          Shipping2:e.target.value
                   })
                    }
                  }}
                  options={this.state.listShipping2}
                   
                  getOptionLabel={(option) => option.Shipping2}
                  style={{ width: 150 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullWidth 
                  />
                  )}
                />
          </Box>
          <Box pl={13}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">ATR No. :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="ATRNO2"
           value={this.state.ATRNO2}
           
           style={{width:'7%'}}
           />
               <Box pl={19}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">Motherboard :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.Motherboard21}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            Motherboard21:newValue.Motherboard21
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          Motherboard21:e.target.value
                   })
                    }
                  }}
                  options={this.state.listMotherboard21}
                   
                  getOptionLabel={(option) => option.Motherboard21}
                  style={{ width: 350 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullWidth 
                  />
                  )}
                />
        </Box>
        <Box pl={49} mt={-5}>
        <textarea
           style={description1style}
          name="description2"
          className = "form-control"
          onChange = {this.handleChange}
          value={this.state.description2}
             />
        </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              <Box pl={1}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">數量/備品/維修IC :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
              <TextField
           name="amount2"
           value={this.state.amount2} 
           style={{width:'7%'}}
           />
           <Box pl={1}></Box>
              <TextField
           name="backupamount2"
           value={this.state.backupamount2} 
           style={{width:'7%'}}
           />
           <Box pl={1}></Box>
              <TextField
           name="repairIC2"
           value={this.state.repairIC2} 
           style={{width:'7%'}}
           />
               <Box pl={35.5} mt={-2}>
        <Autocomplete
                  inputValue={this.state.Motherboard22}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            Motherboard22:newValue.Motherboard22
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          Motherboard22:e.target.value
                   })
                    }
                  }}
                  options={this.state.listMotherboard22}
                   
                  getOptionLabel={(option) => option.Motherboard22}
                  style={{ width: 350 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullWidth 
                  />
                  )}
                />
        </Box>
         <Box pl={50}>
         Label內容:
         </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <Box pl={7}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">Single/Dual :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1} mt={-2}>
          <Autocomplete
                  inputValue={this.state.singleanddual2}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            singleanddual2:newValue.singleanddual2
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          singleanddual2:e.target.value
                   })
                    }
                  }}
                  options={this.state.listsingleanddual2}
                   
                  getOptionLabel={(option) => option.singleanddual2}
                  style={{ width: 150 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullWidth 
                  />
                  )}
                />
                </Box>
            <Box pl={4}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">測試軟體 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1} mt={-2}>
          <Autocomplete
                  inputValue={this.state.testsoftware2}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            testsoftware2:newValue.testsoftware2
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          testsoftware2:e.target.value
                   })
                    }
                  }}
                  options={this.state.listtestsoftware2}
                   
                  getOptionLabel={(option) => option.testsoftware2}
                  style={{ width: 150 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullWidth 
                  />
                  )}
                />
                </Box>
                <Box pl={20}>
                 {this.state.showEdit == true || this.state.showadd == true ? 
            <Fragment>
            <TableContainer style={{maxHeight :  250,width:700 ,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 title ="Delivery Time"
                 editable={{
                     onRowAdd:(newData)=>
                     new Promise((resolve,reject)=>{
                         setTimeout(()=>{
                             this.setState(
                                 {
                                    IDdata :[...this.state.IDdata,newData],
                                    Dataview:{...newData}
                                 })
                                 resolve();
                         },10)
                     }),
                     onRowUpdate:(newData,oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                console.log("new: ",newData);

                                const dataUpdate=[...this.state.IDdata];
                                const index = oldData.tableData.id;
                                dataUpdate[index]=newData;
                                this.setState({
                                  Dataview:{...newData},
                                  IDdata:[...dataUpdate]
                                });
                                resolve();
                            },10);
                        }),
                        onRowDelete:(oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dataDelete =[...this.state.IDdata];
                                const index=oldData.tableData.id;
                                dataDelete.splice(index,1);
                                this.setState({
                                  IDdata:[...dataDelete]
                                });
                                resolve();
                            },10);
                        })
                 }}
                />
                </TableContainer>
            </Fragment>: 
            <Fragment>
            <TableContainer style={{maxHeight :  250,width:700 ,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="Delivery Time"
                 columns={Columns}
                 data ={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
            <Box pl={18.5} mt={-5}>
        <textarea
           style={description2style}
          name="description3"
          className = "form-control"
          onChange = {this.handleChange}
          value={this.state.description3}
             />
        </Box>
                </Box>
                <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box pl={5}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">預計進貨時間 :</Typography>
          </ThemeProvider>
          </Box> 
          <Box pl={1}>
          </Box>
          <TextField
           name="expectshiptime"
           value={this.state.expectshiptime} 
           style={{width:'7%'}}
           />
           
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box pl={11.5}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">PO Qty :</Typography>
          </ThemeProvider>
          </Box> 
          <Box pl={1}>
          </Box>
          <TextField
           name="POQty2"
           value={this.state.POQty2} 
           style={{width:'7%'}}
           />
           <Box pl={165}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">PO Qty :</Typography>
          </ThemeProvider>
          </Box> 

          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <Box pl={9.5}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">測試類別 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1} mt={-2}>
          <Autocomplete
                  inputValue={this.state.testclass2}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            testclass2:newValue.testclass2
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          testclass2:e.target.value
                   })
                    }
                  }}
                  options={this.state.listtestclass2}
                   
                  getOptionLabel={(option) => option.testclass2}
                  style={{ width: 150 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullWidth 
                  />
                  )}
                />
                </Box>
                <Box pl={161} mt={-3}>
                <textarea
           style={description2style}
          name="description4"
          className = "form-control"
          onChange = {this.handleChange}
          value={this.state.description4}
             />
                </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box pl={14.5}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">等級 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          </Box>
          <TextField
           name="level2"
           value={this.state.level2} 
           style={{width:'7%'}}
           />
           <Box pl={9.5}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">IC Size :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          </Box>
          <TextField
           name="ICSize2"
           value={this.state.ICSize2} 
           style={{width:'7%'}}
           />
          </Box>
            </div>
        )
    }
}
export default DataTransferOrder