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
import { AutoComplete } from 'material-ui';
import Icon from '@material-ui/core/Icon';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class DataWorkShip extends Component{
     constructor(props){
         super(props);
        this.state={
           data:[],
           IDdata:[],
           listtype:[],

           id:"",
           
           showadd:false,
        showEdit:false,
        buttonadd:"新增",
        buttonText:"修改",
        buttonsave:"儲存",

            ICshouldreceive:0,
            ICreceived:0,
            ICunreceive:0,

            SMTICshouldreceive:0,
            SMTICreceived:0,
            SMTICunreceive:0,

            REPAIRICshouldreceive:0,
            REPAIRICreceived:0,
            REPAIRICunreceive:0,

            MODULEICshouldreceive:0,
            MODULEICreceived:0,
            MODULEICunreceive:0,

            unshipamount:0,
            shipedamount:0,
            total:0,
            ICrepair:0,

            description:"",
            Dataview:{
                type:"",
           storageclass:"",
           level:"",
           buynumber:"",
           productnumber:"",
           pcbno:"",
           amount:"",
           shiptime:"",
           person:"",
           pickingnumber:"",
           storageclassconfirm:false,
           storageclassconfirmdate:"",
            }
        }
     }
     handleChange=(e)=>{
        const name = e.target.name
        const value = e.target.value
        if(this.state.showadd ==true || this.state.showEdit ==true){
        this.setState({
            [name]:value
        })
       }
    }
    handleChecked =(e)=>{
        const name = e.target.name
        const value = e.target.checked
        if(this.state.showadd ==true || this.state.showEdit ==true){
        this.setState({
            [name] : value
        })
       }
      }
    getALLOption=()=>{
        axios.all([
            axios.get("http://localhost:3003/data"),
            axios.get("http://localhost:3003/listtype"),
        ])
        .then(
            axios.spread((
                res1,
                res2
            )=>{
                this.setState({
                    data:res1.data,
                    listtype:res2.data
                })
            })
        )
    }
    componentDidMount(){
        this.getALLOption();
    }
    PUT=()=>{
        axios.put(`http://localhost:3003/data/${this.state.id}`,
        {
            id:this.state.id,
            ICshouldreceive:this.state.ICshouldreceive,
            ICreceived:this.state.ICreceived,
            ICunreceive:this.state.ICunreceive,

            SMTICshouldreceive:this.state.SMTICshouldreceive,
            SMTICreceived:this.state.SMTICreceived,
            SMTICunreceive:this.state.SMTICunreceive,

            REPAIRICshouldreceive:this.state.REPAIRICshouldreceive,
            REPAIRICreceived:this.state.REPAIRICreceived,
            REPAIRICunreceive:this.state.REPAIRICunreceive,

            MODULEICshouldreceive:this.state.MODULEICshouldreceive,
            MODULEICreceived:this.state.MODULEICreceived,
            MODULEICunreceive:this.state.MODULEICunreceive,

            unshipamount:this.state.unshipamount,
            shipedamount:this.state.shipedamount,
            total:this.state.total,
            ICrepair:this.state.ICrepair,

            description:this.state.description,
            data:
            this.state.IDdata
        }
        )
    }
    handleChangeID=(e,values)=>{
        this.setState({
            id:values.id
        })
        this.state.data.map((item,index)=>{
            if(values.id == item.id){
                this.setState({
                    id:item.id,
                    IDdata:item.data,
                    ICshouldreceive:item.ICshouldreceive,
                    ICreceived:item.ICreceived,
                    ICunreceive:item.ICunreceive,
        
                    SMTICshouldreceive:item.SMTICshouldreceive,
                    SMTICreceived:item.SMTICreceived,
                    SMTICunreceive:item.SMTICunreceive,
        
                    REPAIRICshouldreceive:item.REPAIRICshouldreceive,
                    REPAIRICreceived:item.REPAIRICreceived,
                    REPAIRICunreceive:item.REPAIRICunreceive,
        
                    MODULEICshouldreceive:item.MODULEICshouldreceive,
                    MODULEICreceived:item.MODULEICreceived,
                    MODULEICunreceive:item.MODULEICunreceive,
        
                    unshipamount:item.unshipamount,
                    shipedamount:item.shipedamount,
                    total:item.total,
                    ICrepair:item.ICrepair,
        
                    description:item.description,
                })
            }
            return true
        })
    }
    render(){
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
        const Columns=[
            {
                title:"Type",
                field:"type",
                editComponent:
                ({value , onChange})=>(
                  <select onChange={(e)=>onChange(e.target.value)}>
                   <option selected value={value}>
                       {value}
                   </option>
                   {this.state.listtype.map(
                       (item)=>
                       item !== value && (
                           <option key ={item.type} value ={item.type}>
                               {item.type}
                           </option>
                       )
                   )}
                  </select>
              )
            },{
                title:"倉別",
                field:"storageclass"
            },{
                title:"等級",
                field:"level"
            },
            {
                title: "採購單號",
                field:"buynumber",
            }
            ,{
                title:"產品代號",
                field:"productnumber"
            }
            ,{
                title:"PCB No",
                field:"pcbno"
            }
            ,{
                title:"數量",
                field:"amount"
            },{
                title:"進貨時間",
                field:"shiptime"
            },{
                title:"填表人",
                field:"person"
            },{
                title:"領料單號",
                field:"pickingnumber"
            },{
                title:"倉管確認",
                field:"storageclassconfirm",
                editComponent: 
                (props)=>{
                    console.log(props);
                    return(
                    <Checkbox
                        value={this.state.storageclassconfirm}
                        checked={props.value}
                        name="storageclassconfirm"
                        onChange={(e)=>props.onChange(e.target.checked)}
                    />
                    )
                },
                render: (rowdata)=>(
                  <Checkbox checked={rowdata.storageconfirm} readOnly />
                )
            },{
                title:"倉管確認時間",
                field:"storageclassconfirmdate",
                editComponent:
                (({value,onChange})=>(
                    <TextField
                        name="storageclassconfirmdate"
                        floatingLabelText="倉管確認時間"
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
            }
        ]
        return (
            <div>
              <Box
          display="flex"
          alignItems="flex-start"
          pl={3}
          mt={1}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <Fragment>
            <TableContainer style={{width:1850 ,maxHeight : 500,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 columns={Columns}
                 data ={this.state.IDdata}
                 options ={{search: false,actionsColumnIndex:-1}}
                 title ="進貨"
                 />
                 </TableContainer>
            </Fragment>
            </Box>
            <Box
          display="flex"
          alignItems="flex-start"
          pl={3}
          mt={60}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          
            <Box pl={7}>
            <ThemeProvider theme={theme}>
          <Typography variant="h6">IC 應領 :</Typography>
          </ThemeProvider>
            </Box>
            <Box pl={1}>
            <TextField
           name="ICshouldreceive"
           value={this.state.ICshouldreceive}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}> <ThemeProvider theme={theme}>
          <Typography variant="h6">實領 :</Typography>
          </ThemeProvider></Box>
            <Box pl={1}>
            <TextField
           name="ICreceived"
           value={this.state.ICreceived}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">未領 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="ICunreceive"
           value={this.state.ICunreceive}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">未進貨數量 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="unshipamount"
           value={this.state.unshipamount}
           style={{width:'30%'}}
           />
           </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={3}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <Box pl={1}> 
            <ThemeProvider theme={theme}>
          <Typography variant="h6">SMT IC 應領 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="SMTICshouldreceive"
           value={this.state.SMTICshouldreceive}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}>
            <ThemeProvider theme={theme}>
          <Typography variant="h6">實領 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="SMTICreceived"
           value={this.state.SMTICreceived}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">未領 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="SMTICunreceive"
           value={this.state.SMTICunreceive}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">已進貨數量 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="shipedamount"
           value={this.state.shipedamount}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}>
              <button  onClick={this.PUT}>儲存</button>
           </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={3}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          
            <Box pl={1.7}>
            <ThemeProvider theme={theme}>
          <Typography variant="h6">維修IC 應領 :</Typography>
          </ThemeProvider>
            </Box>
            <Box pl={1}>
            <TextField
           name="REPAIRICshouldreceive"
           value={this.state.REPAIRICshouldreceive}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}> <ThemeProvider theme={theme}>
          <Typography variant="h6">實領 :</Typography>
          </ThemeProvider></Box>
            <Box pl={1}>
            <TextField
           name="REPAIRICreceived"
           value={this.state.REPAIRICreceived}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">未領 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="REPAIRICunreceive"
           value={this.state.REPAIRICunreceive}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={6}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">總數量 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="total"
           value={this.state.total}
           style={{width:'30%'}}
           />
           </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={3}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          
            <Box pl={1}>
            <ThemeProvider theme={theme}>
          <Typography variant="h6">Module 應領 :</Typography>
          </ThemeProvider>
            </Box>
            <Box pl={1}>
            <TextField
           name="MODULEICunreceive"
           value={this.state.MODULEICunreceive}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}> <ThemeProvider theme={theme}>
          <Typography variant="h6">實領 :</Typography>
          </ThemeProvider></Box>
            <Box pl={1}>
            <TextField
           name="MODULEICreceived"
           value={this.state.MODULEICreceived}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">未領 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="MODULEICunreceive"
           value={this.state.MODULEICunreceive}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={6}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">維修IC :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="ICrepair"
           value={this.state.ICrepair}
           style={{width:'30%'}}
           />
           </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={117}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">備註 :</Typography>
          </ThemeProvider>
          </Box>
          <Box>
          <textarea
          name="description"
          className = "form-control"
          onChange = {this.handleChange}
          value={this.state.description}
             />
          </Box>
          </Box>
            </div>
        )
    }
}
export default DataWorkShip