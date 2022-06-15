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

class DataWorkTEST extends Component{
     constructor(props){
         super(props);
         this.state={
             data:[],
             IDdata:[],
             IDdata2:[],
             IDdata3:[],
             IDdata4:[],
             
             listtestcondition:[],
             listtestpassmark:[],
             listclass:[],
             listfrequency:[],
             listtestprogram:[],
             listtestperson:[],
             modal:null,
           
             confirmdelete:false,
             showadd:false,
             showEdit:false,
             buttonText:"修改",
             buttonsave:"儲存",
             firstPass:"",
             firstFail:"",
             firstPassrate:"",

             reAmount:"",
             rePass:"",
             reFail:"",
             rePassrate:"",

             againAmount:"",
             againPass:"",
             againFail:"",
             againPassagain:"",

             otherAmount:"",
             otherPass:"",
             otherFail:"",
             otherPassrate:"",

             totalPassAmount:"",
             totalFailAmount:"",
             totalPassrate:"",
             description:"",

             Dataview:{
                 starttime:"",
                 endtime:"",
                 amount:"",
                 Pass:"",
                 Fail:"",
                 passrate:"",
                 testcondition:"",
                 testpassmark:"",
                 class:"",     
                 frequency:"",
                 testprogram:"",
                 testperson:"",
                 applicationperson:"",
             },
             Dataview2:{
                starttime:"",
                endtime:"",
                amount:"",
                Pass:"",
                Fail:"",
                passrate:"",
                testcondition:"",
                testpassmark:"",
                class:"",     
                frequency:"",
                testprogram:"",
                testperson:"",
                applicationperson:"",
            },
            Dataview3:{
                starttime:"",
                endtime:"",
                amount:"",
                Pass:"",
                Fail:"",
                passrate:"",
                testcondition:"",
                testpassmark:"",
                class:"",     
                frequency:"",
                testprogram:"",
                testperson:"",
                applicationperson:"",
            },
            Dataview4:{
                starttime:"",
                endtime:"",
                amount:"",
                Pass:"",
                Fail:"",
                passrate:"",
                testcondition:"",
                testpassmark:"",
                class:"",     
                frequency:"",
                testprogram:"",
                testperson:"",
                applicationperson:"",
            }
         }
     }

     getAllOption=()=>{
         axios.all([
            axios.get("http://localhost:3003/listtestcondition"),
            axios.get("http://localhost:3003/listtestpassmark"),
            axios.get("http://localhost:3003/listclass"),
            axios.get("http://localhost:3003/listfrequency"),
            axios.get("http://localhost:3003/listtestprogram"),
            axios.get("http://localhost:3003/listtestperson"),
         ])
         .then(
            axios.spread((
                res,res1,res2,res3,res4,res5
            )=>{ 
                this.setState({
             listtestcondition:res.data,
             listtestpassmark:res1.data,
             listclass:res2.data,
             listfrequency:res3.data,
             listtestprogram:res4.data,
             listtestperson:res5.data,
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
        if(this.state.showadd ==true || this.state.showEdit ==true){
        this.setState({
            [name]:value
        })
       }
    }
    handleChangeID=(e,values)=>{
        this.state.data.map((item,index)=>{
            if(values.id == item.id){
                this.setState({
                    IDdata:item.data,
                    IDdata2:item.data2,
                    IDdata3:item.data3,
                    IDdata4:item.data4,
                    firstPass:item.firstPass,
                    firstFail:item.firstFail,
                    firstPassrate:item.firstPassrate,
       
                    reAmount:item.reAmount,
                    rePass:item.rePass,
                    reFail:item.reFail,
                    rePassrate:item.rePassrate,
       
                    againAmount:item.againAmount,
                    againPass:item.againPass,
                    againFail:item.againFail,
                    againPassagain:item.againPassagain,
       
                    otherAmount:item.otherAmount,
                    otherPass:item.otherPass,
                    otherFail:item.otherFail,
                    otherPassrate:item.otherPassrate,
       
                    totalPassAmount:item.totalPassAmount,
                    description:item.description,
                })
            }
            return true
        })
    }
    handlesave=()=>{
        if(this.state.showadd === true){
            this.setState({
                showadd:false,
            })
        }
        else if(this.state.showEdit === true){
            this.PUT()
            this.setState({
                showEdit:false,
                buttonText:"修改"
            })
        }
        }
        PUT=()=>{
            axios.put(`http://localhost:3003/data/${this.state.id}`,
            {
                firstPass:this.state.firstPass,
                firstFail:this.state.firstFail,
                firstPassrate:this.state.firstPassrate,
   
                reAmount:this.state.reAmount,
                rePass:this.state.rePass,
                reFail:this.state.reFail,
                rePassrate:this.state.rePassrate,
   
                againAmount:this.state.againAmount,
                againPass:this.state.againPass,
                againFail:this.state.againFail,
                againPassagain:this.state.againPassagain,
   
                otherAmount:this.state.otherAmount,
                otherPass:this.state.otherPass,
                otherFail:this.state.otherFail,
                otherPassrate:this.state.otherPassrate,
   
                totalPassAmount:this.state.totalPassAmount,
                description:this.state.description,
                data :
                this.state.IDdata,
                data2 : 
                this.state.IDdata2,
                data3:
                this.state.IDdata3,
                data4:
                this.state.IDdata4
           })}
           handlecancel=()=>{
            this.state.data.map((item,index)=>{
                if(this.state.id === item.id ){
                    this.setState({
                        IDdata:item.data,
                        IDdata2:item.data2,
                        IDdata3:item.data3,
                        IDdata4:item.data4,
                        firstPass:item.firstPass,
                        firstFail:item.firstFail,
                        firstPassrate:item.firstPassrate,
           
                        reAmount:item.reAmount,
                        rePass:item.rePass,
                        reFail:item.reFail,
                        rePassrate:item.rePassrate,
           
                        againAmount:item.againAmount,
                        againPass:item.againPass,
                        againFail:item.againFail,
                        againPassagain:item.againPassagain,
           
                        otherAmount:item.otherAmount,
                        otherPass:item.otherPass,
                        otherFail:item.otherFail,
                        otherPassrate:item.otherPassrate,
           
                        totalPassAmount:item.totalPassAmount,
                        description:item.description,
                    })
                }
                else {
                    this.setState({
                        IDdata:"",
                        IDdata2:"",
                        IDdata3:"",
                        IDdata4:"",
                        firstPass:"",
                        firstFail:"",
                        firstPassrate:"",    
                        reAmount:"",
                        rePass:"",
                        reFail:"",
                        rePassrate:"",
                        againAmount:"",
                        againPass:"",
                        againFail:"",
                        againPassagain:"",    
                        otherAmount:"",
                        otherPass:"",
                        otherFail:"",
                        otherPassrate:"",
                        totalPassAmount:"",
                        description:"",
                    })
                }
                return true;
            })
            this.setState({
                showadd:false,
                showEdit:false,
            })
         }
         handleshowEdit=()=>{
            if(this.state.vendorconfirm === true){
                 this.setState({
                     modal:!this.state.modal
                 })
            }
            else{
            this.setState({
                showEdit:!this.state.showEdit
            })
        }
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
        const descriptionstyle={
            minHeight:'200px',
              resize:'auto',
              padding:'9px',
              boxSizing:'border-box',
              fontSize:'15px',
              width:'450px'
           }
        const Columns=[
            { 
                title:"開始時間",
                field:"starttime",
                editComponent:
                (({value,onChange})=>(
              <TextField
              name="starttime"
              floatingLabelText="開始時間"
              InputLabelProps={{ shrink: true, required: true }}
              type="datetime-local"
              onChange={(e)=>onChange(e.target.value)}
              floatingLabelFixed
              style={{ width: '80%' }}
              value={value}
              InputLabelProps={{
                 shrink: true,
               }}
            />
            ))
            },{
                title:"結束時間",
                field:"endtime",
                editComponent:
                (({value,onChange})=>(
              <TextField
              name="endtime"
              floatingLabelText="結束時間"
              InputLabelProps={{ shrink: true, required: true }}
              type="datetime-local"
              onChange={(e)=>onChange(e.target.value)}
              floatingLabelFixed
              style={{ width: '80%' }}
              value={value}
              InputLabelProps={{
                 shrink: true,
               }}
            />
            ))
            },{
                title:"數量",
                field:"amount"
            },{
                title:"PASS",
                field:"Pass"
            },{
                title:"FAIL",
                field:"Fail"
            },{
                title:"良率",
                field:"passrate"
            },{
                title:"測試條件",
                field:"testcondition",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.testcondition
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listtestcondition}    
                    getOptionLabel={(option) => option.testcondition}
                    style={{ width: 100 }}
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
                )
            },{
                title:"測試平台",
                field:"testpassmark",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.testpassmark
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listtestpassmark}    
                    getOptionLabel={(option) => option.testpassmark}
                    style={{width: 100 }}
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
                )
            },{
                title:"組別",
                field:"class",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.class
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listclass}    
                    getOptionLabel={(option) => option.class}
                    style={{width: 100 }}
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
                )
            },{
                title:"頻率",
                field:"frequency",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.frequency
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listfrequency}    
                    getOptionLabel={(option) => option.frequency}
                    style={{width: 100 }}
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
                )
            },{
                title:"測試程式",
                field:"testprogram",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.testprogram
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listtestprogram}    
                    getOptionLabel={(option) => option.testprogram}
                    style={{width: 100 }}
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
                )
            },{
                title:"測試人員",
                field:"testperson",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.testperson
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listtestperson}    
                    getOptionLabel={(option) => option.testperson}
                    style={{width: 100 }}
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
                )
            },{
                title:"填表人",
                field:"applicationperson"
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
                {this.state.showEdit == true || this.state.showadd == true ? 
                    <Fragment>
            <TableContainer  style={{width:1500 ,maxHeight : 500,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="初測"
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
            <TableContainer style={{maxHeight : 500 ,width:1500,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="初測"
                 columns={Columns}
                 data ={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
            <Box
          display="flex"
          alignItems="flex-start"
          pl={200}
          mt={-5}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
           <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Pass :</Typography>
          </ThemeProvider>
          <Box pl={1.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Fail :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={0.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">良率 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          </Box>
             <Box
          display="flex"
          alignItems="flex-start"
          pl={207}
          mt={-13}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <Box >
          <TextField
           name="firstPass"
           value={this.state.firstPass}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           <Box >
          <TextField
           name="firstFail"
           value={this.state.firstFail}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           <Box>
          <TextField
           name="firstPassrate"
           value={this.state.firstPassrate}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           </Box>
           </Box>
          </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={1}
          mt={50}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                {this.state.showEdit == true || this.state.showadd == true ? 
                    <Fragment>
            <TableContainer  style={{width:1500 ,maxHeight : 500,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns}
                 data={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="覆測"
                 editable={{
                     onRowAdd:(newData)=>
                     new Promise((resolve,reject)=>{
                         setTimeout(()=>{
                             this.setState(
                                 {
                                    IDdata2 :[...this.state.IDdata2,newData],
                                    Dataview2:{...newData}
                                 })
                                 resolve();
                         },10)
                     }),
                     onRowUpdate:(newData,oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dataUpdate=[...this.state.IDdata2];
                                const index = oldData.tableData.id;
                                dataUpdate[index]=newData;
                                this.setState({
                                  Dataview2:{...newData},
                                  IDdata2:[...dataUpdate]
                                });
                                resolve();
                            },10);
                        }),
                        onRowDelete:(oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dataDelete =[...this.state.IDdata2];
                                const index=oldData.tableData.id;
                                dataDelete.splice(index,1);
                                this.setState({
                                  IDdata2:[...dataDelete]
                                });
                                resolve();
                            },10);
                        })
                 }}
                />
                </TableContainer>
            </Fragment>:
            <Fragment>
            <TableContainer style={{maxHeight : 500 ,width:1500,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="覆測"
                 columns={Columns}
                 data ={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
            <Box
          display="flex"
          alignItems="flex-start"
          pl={195}
          mt={-8}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
           <Box >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">覆測數量 :</Typography>
          </ThemeProvider>
           <Box pl={4.3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Pass :</Typography>
          </ThemeProvider>
          <Box pl={1.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Fail :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={0.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">良率 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          </Box>
          </Box>
             <Box
          display="flex"
          alignItems="flex-start"
          pl={207}
          mt={-13}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box >
          <TextField
           name="reAmount"
           value={this.state.reAmount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           <Box>
           <TextField
           name="rePass"
           value={this.state.rePass}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           <Box>
          <TextField
           name="reFail"
           value={this.state.reFail}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
            <Box >
          <TextField
           name="rePassrate"
           value={this.state.rePassrate}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
            </Box>
                </Box>
           </Box>
           </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={1}
          mt={50}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                {this.state.showEdit == true || this.state.showadd == true ? 
                    <Fragment>
            <TableContainer  style={{width:1500 ,maxHeight : 500,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns}
                 data={this.state.IDdata3}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="重測(不計算總量率)"
                 editable={{
                     onRowAdd:(newData)=>
                     new Promise((resolve,reject)=>{
                         setTimeout(()=>{
                             this.setState(
                                 {
                                    IDdata3 :[...this.state.IDdata3,newData],
                                    Dataview3:{...newData}
                                 })
                                 resolve();
                         },10)
                     }),
                     onRowUpdate:(newData,oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dataUpdate=[...this.state.IDdata3];
                                const index = oldData.tableData.id;
                                dataUpdate[index]=newData;
                                this.setState({
                                  Dataview3:{...newData},
                                  IDdata3:[...dataUpdate]
                                });
                                resolve();
                            },10);
                        }),
                        onRowDelete:(oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dataDelete =[...this.state.IDdata3];
                                const index=oldData.tableData.id;
                                dataDelete.splice(index,1);
                                this.setState({
                                  IDdata3:[...dataDelete]
                                });
                                resolve();
                            },10);
                        })
                 }}
                />
                </TableContainer>
            </Fragment>:
            <Fragment>
            <TableContainer style={{maxHeight : 500 ,width:1500,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="重測(不計算總量率)"
                 columns={Columns}
                 data ={this.state.IDdata3}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
            <Box
          display="flex"
          alignItems="flex-start"
          pl={195}
          mt={-8}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
           <Box >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">重測數量 :</Typography>
          </ThemeProvider>
           <Box pl={4.3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Pass :</Typography>
          </ThemeProvider>
          <Box pl={1.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Fail :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={0.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">良率 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          </Box>
          </Box>
             <Box
          display="flex"
          alignItems="flex-start"
          pl={207}
          mt={-13}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box >
          <TextField
           name="againAmount"
           value={this.state.againAmount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           <Box>
           <TextField
           name="againPass"
           value={this.state.againPass}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           <Box>
          <TextField
           name="againFail"
           value={this.state.againFail}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
            <Box >
          <TextField
           name="againPassagain"
           value={this.state.againPassagain}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
            </Box>
                </Box>
           </Box>
           </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={1}
          mt={50}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                {this.state.showEdit == true || this.state.showadd == true ? 
                    <Fragment>
            <TableContainer  style={{width:1500 ,maxHeight : 500,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns}
                 data={this.state.IDdata4}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="其他(Fail入維修)"
                 editable={{
                     onRowAdd:(newData)=>
                     new Promise((resolve,reject)=>{
                         setTimeout(()=>{
                             this.setState(
                                 {
                                    IDdata4 :[...this.state.IDdata4,newData],
                                    Dataview4:{...newData}
                                 })
                                 resolve();
                         },10)
                     }),
                     onRowUpdate:(newData,oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dataUpdate=[...this.state.IDdata4];
                                const index = oldData.tableData.id;
                                dataUpdate[index]=newData;
                                this.setState({
                                  Dataview4:{...newData},
                                  IDdata4:[...dataUpdate]
                                });
                                resolve();
                            },10);
                        }),
                        onRowDelete:(oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dataDelete =[...this.state.IDdata4];
                                const index=oldData.tableData.id;
                                dataDelete.splice(index,1);
                                this.setState({
                                  IDdata4:[...dataDelete]
                                });
                                resolve();
                            },10);
                        })
                 }}
                />
                </TableContainer>
            </Fragment>:
            <Fragment>
            <TableContainer style={{maxHeight : 500 ,width:1500,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="其他(Fail入維修)"
                 columns={Columns}
                 data ={this.state.IDdata4}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
            <Box
          display="flex"
          alignItems="flex-start"
          pl={195}
          mt={-8}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
           <Box >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">其他數量 :</Typography>
          </ThemeProvider>
           <Box pl={4.3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Pass :</Typography>
          </ThemeProvider>
          <Box pl={1.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Fail :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={0.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">良率 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          </Box>
          </Box>
             <Box
          display="flex"
          alignItems="flex-start"
          pl={207}
          mt={-13}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box >
          <TextField
           name="otherAmount"
           value={this.state.otherAmount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           <Box>
           <TextField
           name="otherPass"
           value={this.state.otherPass}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           <Box>
          <TextField
           name="otherFail"
           value={this.state.otherFail}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
            <Box >
          <TextField
           name="otherPassrate"
           value={this.state.otherPassrate}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
            </Box>
                </Box>
           </Box>
           </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={65}
          mt={50}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              <Box >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">總Pass數量 :</Typography>
          </ThemeProvider>
           <Box pl={1.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">總Fail數量 :</Typography>
          </ThemeProvider>
          <Box pl={6.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">良率 :</Typography>
          </ThemeProvider>
          </Box>
                </Box>
           </Box>
           </Box>
           <Box
          display="flex"
          alignItems="flex-start"
          pl={80}
          mt={-13}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box >
          <TextField
           name="totalPassAmount"
           value={this.state.totalPassAmount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           <Box>
           <TextField
           name="totalFailAmount"
           value={this.state.totalFailAmount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           <Box>
          <TextField
           name="totalPassrate"
           value={this.state.totalPassrate}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
 
                </Box>
           </Box>
           </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={100}
          mt={-12}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              <Box pl={1}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">備註 :</Typography>
          </ThemeProvider>
           </Box>
           <Box pl={1} mt={1}>
            <textarea
          style={descriptionstyle}
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
         pl={165}
         mt={-7}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
         <Box pl={4}>
         <button 
    disabled={
     !(this.state.showEdit && !this.state.showadd)
  &&!(!this.state.showEdit && this.state.showadd)
            } 
    onClick={this.handlesave}>
    儲存
    </button>
    <Box mt={1}>
    <button disabled={this.state.showadd == true ||this.state.showEdit == true} onClick={this.handleshowEdit}>
       {this.state.buttonText}
    </button>
    </Box>
    <Box mt={1}>
    <button disabled={!(this.state.showEdit && !this.state.showadd)
  &&!(!this.state.showEdit && this.state.showadd)
          } onClick={this.handlecancel}>取消</button>
    </Box>
         </Box>
    </Box>
         
            </div> 
        )
     }
} 
export default DataWorkTEST