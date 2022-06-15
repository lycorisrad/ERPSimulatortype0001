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

class DataWorkEnterstorage extends Component{
     constructor(props){
         super(props);
         this.state={
            data:[],
            IDdata:[],
            IDdata2:[],
             
            listenterstoragespiecies:[],
            listenterstoragespiecies2:[],
            listenterstorageperson:[],
            listtestprogram:[],
            listbenchmark:[],
            modal:null,
           
            confirmdelete:false,
            showadd:false,
            showEdit:false,
            buttonText:"修改",
            buttonsave:"儲存",

            SMTamount:"",
            Unenterstorageamount:"",
            enteredstorageamount:"",
            totalamount:"",
            RepairICunenterstorageamount:"",
            RepairICenteredstorageamount:"",
            RepairICPassamount:"",
            RepairICFailamount:"",
            RepairICwaitingtestamount:"",
            RepairICunopenamount:"",
            RepairICunuseamount:"",
            RepairICtotalamount:"",
            description:"",
            
            acceptance:"",
            backupproduct:"",
            waitingtest:"",
            returnproduct:"",
            Fail:"",

            Dataview:{
                enterstoragetime:"",
                enterstoragespiecies:"",
                buynumber:"",
                level:"",
                storageclass:"",
                productnumber:"",
                pcbno:"",
                enterstorageamount:"",
                enterstorageperson:"",
                process:"",
                frequency:"",
                testprogram:"",
                benchmark:"",
                applicationperson:"",
                packing:false,
                storageconfirm:false,
                transferorder:false,
                correspondingorder:false,
                transoutorder:"",
                AorMenterstoragenumber:"",
                assemble:""
            },
            Dataview2:{
                enterstoragetime:"",
                enterstoragespiecies:"",
                enterstorageamount:"",
                enterstorageperson:"",
                applicationperson:"",
                transferorder:false,
                transferoutorder:"",
                buynumber:"",
                storageclass:"",
                bollowoutnumber:"",
                packing:false,
                storageconfirm:false,
                storageconfirmtime:"",
            }
         }
     }
     getAllOption=()=>{
         axios.all([
             axios.get("http://localhost:3003/listenterstoragespiecies"),
             axios.get("http://localhost:3003/listenterstoragespiecies2"),
             axios.get("http://localhost:3003/listenterstorageperson"),
             axios.get("http://localhost:3003/listtestprogram"),
             axios.get("http://localhost:3003/listbenchmark"),
         ])
         .then(
             axios.spread((
                 res,res1,res2,res3,res4
             )=>{
                 this.setState({
                    listenterstoragespiecies:res.data,
                    listenterstoragespiecies2:res1.data,
                    listenterstorageperson:res2.data,
                    listtestprogram:res3.data,
                    listbenchmark:res4.data,
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
                    SMTamount:item.SMTamount,
                    Unenterstorageamount:item.Unenterstorageamount,
                    enteredstorageamount:item.enteredstorageamount,
                    totalamount:item.totalamount,
                    RepairICunenterstorageamount:item.RepairICunenterstorageamount,
                    RepairICenteredstorageamount:item.RepairICenteredstorageamount,
                    RepairICPassamount:item.RepairICPassamount,
                    RepairICFailamount:item.RepairICFailamount,
                    RepairICwaitingtestamount:item.RepairICwaitingtestamount,
                    RepairICunopenamount:item.RepairICunopenamount,
                    RepairICunuseamount:item.RepairICunuseamount,
                    RepairICtotalamount:item.RepairICtotalamount,
                    description:item.description,
                    
                    acceptance:item.acceptance,
                    backupproduct:item.backupproduct,
                    waitingtest:item.waitingtest,
                    returnproduct:item.returnproduct,
                    Fail:item.Fail,
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
                SMTamount:this.state.SMTamount,
                Unenterstorageamount:this.state.Unenterstorageamount,
                enteredstorageamount:this.state.enteredstorageamount,
                totalamount:this.state.totalamount,
                RepairICunenterstorageamount:this.state.RepairICunenterstorageamount,
                RepairICenteredstorageamount:this.state.RepairICenteredstorageamount,
                RepairICPassamount:this.state.RepairICPassamount,
                RepairICFailamount:this.state.RepairICFailamount,
                RepairICwaitingtestamount:this.state.RepairICwaitingtestamount,
                RepairICunopenamount:this.state.RepairICunopenamount,
                RepairICunuseamount:this.state.RepairICunuseamount,
                RepairICtotalamount:this.state.RepairICtotalamount,
                description:this.state.description,
                
                acceptance:this.state.acceptance,
                backupproduct:this.state.backupproduct,
                waitingtest:this.state.waitingtest,
                returnproduct:this.state.returnproduct,
                Fail:this.state.Fail,
            data :
            this.state.IDdata,
            data2 : 
            this.state.IDdata2,
        })}
        handlecancel=()=>{
            this.state.data.map((item,index)=>{
                if(this.state.id === item.id ){
                    this.setState({
                        IDdata:item.data,
                        IDdata2:item.data2,
                        SMTamount:item.SMTamount,
                        Unenterstorageamount:item.Unenterstorageamount,
                        enteredstorageamount:item.enteredstorageamount,
                        totalamount:item.totalamount,
                        RepairICunenterstorageamount:item.RepairICunenterstorageamount,
                        RepairICenteredstorageamount:item.RepairICenteredstorageamount,
                        RepairICPassamount:item.RepairICPassamount,
                        RepairICFailamount:item.RepairICFailamount,
                        RepairICwaitingtestamount:item.RepairICwaitingtestamount,
                        RepairICunopenamount:item.RepairICunopenamount,
                        RepairICunuseamount:item.RepairICunuseamount,
                        RepairICtotalamount:item.RepairICtotalamount,
                        description:item.description,
                        
                        acceptance:item.acceptance,
                        backupproduct:item.backupproduct,
                        waitingtest:item.waitingtest,
                        returnproduct:item.returnproduct,
                        Fail:item.Fail,
                    })
                }
                else {
                    this.setState({
                        IDdata:"",
                        IDdata2:"",
                        SMTamount:"",
                        Unenterstorageamount:"",
                        enteredstorageamount:"",
                        totalamount:"",
                        RepairICunenterstorageamount:"",
                        RepairICenteredstorageamount:"",
                        RepairICPassamount:"",
                        RepairICFailamount:"",
                        RepairICwaitingtestamount:"",
                        RepairICunopenamount:"",
                        RepairICunuseamount:"",
                        RepairICtotalamount:"",
                        description:"",
                        
                        acceptance:"",
                        backupproduct:"",
                        waitingtest:"",
                        returnproduct:"",
                        Fail:"",
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
                minHeight:'120px',
                  resize:'auto',
                  padding:'9px',
                  boxSizing:'border-box',
                  fontSize:'15px',
                  width:'350px'
            }
            const Columns=[
                {
                    title:"入庫時間",
                    field:"enterstoragetime",
                    editComponent:
                    (({value,onChange})=>(
                  <TextField
                  name="enterstoragetime"
                  floatingLabelText="入庫時間"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="datetime-local"
                  onChange={(e)=>onChange(e.target.value)}
                  floatingLabelFixed
                  style={{ width: '80%' }}
                  value={value}
                />
                ))
                }, {
                    title:"入庫種類",
                    field:"enterstoragespiecies",
                    editComponent:({value,onChange})=>(
                        <Box mt={3} >
                        <Autocomplete
                        freeSolo
                        inputValue={value}
                        onChange={
                            (event,newValue)=>{
                                if(newValue){
                                    onChange(
                                   newValue.enterstoragespiecies
                                )}
                            }
                        }
                        onInputChange={(e)=>onChange(e.target.value)}
                        options={this.state.listenterstoragespiecies}    
                        getOptionLabel={(option) => option.enterstoragespiecies}
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
                    title:"採購單號",
                    field:"buynumber",
                },{
                    title:"等級",
                    field:"level",
                },{
                    title:"倉別",
                    field:"storageclass",
                },{
                    title:"產品代號",
                    field:"productnumber",
                },{
                    title:"PCB No",
                    field:"pcbno",
                },{
                    title:"入庫數量",
                    field:"enterstorageamount",
                },{
                    title:"入庫人員",
                    field:"enterstorageperson",
                    editComponent:({value,onChange})=>(
                        <Box mt={3}>
                        <Autocomplete
                        freeSolo
                        inputValue={value}
                        onChange={
                            (event,newValue)=>{
                                if(newValue){
                                    onChange(
                                   newValue.enterstorageperson
                                )}
                            }
                        }
                        onInputChange={(e)=>onChange(e.target.value)}
                        options={this.state.listenterstorageperson}    
                        getOptionLabel={(option) => option.enterstorageperson}
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
                    title:"製程",
                    field:"process",
                },{
                    title:"頻率",
                    field:"frequency",
                },{
                    title:"測試程式",
                    field:"testprogram",
                    editComponent:({value,onChange})=>(
                        <Box mt={3}>
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
                    field:"benchmark",
                    editComponent:({value,onChange})=>(
                        <Box mt={3}>
                        <Autocomplete
                        freeSolo
                        inputValue={value}
                        onChange={
                            (event,newValue)=>{
                                if(newValue){
                                    onChange(
                                   newValue.benchmark
                                )}
                            }
                        }
                        onInputChange={(e)=>onChange(e.target.value)}
                        options={this.state.listbenchmark}    
                        getOptionLabel={(option) => option.benchmark}
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
                    title:"填表人",
                    field:"applicationperson",
                },{
                    title:"包裝",
                    field:"packing",
                    editComponent: 
                    (props)=>{
                        console.log(props);
                        return(
                        <Checkbox
                            value={this.state.packing}
                            checked={props.value}
                            name="packing"
                            onChange={(e)=>props.onChange(e.target.checked)}
                        />
                        )
                    },
                    render: (rowdata)=>(
                      <Checkbox checked={rowdata.packing} readOnly />
                    )
                },{
                    title:"倉管",
                    field:"storageconfirm",
                    editComponent: 
                    (props)=>{
                        console.log(props);
                        return(
                        <Checkbox
                            value={this.state.storageconfirm}
                            checked={props.value}
                            name="storageconfirm"
                            onChange={(e)=>props.onChange(e.target.checked)}
                        />
                        )
                    },
                    render: (rowdata)=>(
                      <Checkbox checked={rowdata.storageconfirm} readOnly />
                    )
                },{
                    title:"轉單",
                    field:"transferorder",
                    editComponent: 
                    (props)=>{
                        console.log(props);
                        return(
                        <Checkbox
                            value={this.state.transferorder}
                            checked={props.value}
                            name="transferorder"
                            onChange={(e)=>props.onChange(e.target.checked)}
                        />
                        )
                    },
                    render: (rowdata)=>(
                      <Checkbox checked={rowdata.packing} readOnly />
                    )
                },{
                    title:"轉至對應工單",
                    field:"correspondingorder",
                    editComponent: 
                    (props)=>{
                        console.log(props);
                        return(
                        <Checkbox
                            value={this.state.correspondingorder}
                            checked={props.value}
                            name="correspondingorder"
                            onChange={(e)=>props.onChange(e.target.checked)}
                        />
                        )
                    },
                    render: (rowdata)=>(
                      <Checkbox checked={rowdata.correspondingorder} readOnly />
                    )
                },{
                    title:"轉出工單",
                    field:"transoutorder",
                },
                {
                    title:"A或M入庫單號",
                    field:"AorMenterstoragenumber",
                },{
                    title:"組拆單號",
                    field:"assemble",
                },
            ]
            const Columns2=[
                {
                    title:"入庫時間",
                    field:"enterstoragetime",
                    editComponent:
                    (({value,onChange})=>(
                  <TextField
                  name="enterstoragetime"
                  floatingLabelText="入庫時間"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="datetime-local"
                  onChange={(e)=>onChange(e.target.value)}
                  floatingLabelFixed
                  style={{ width: '80%' }}
                  value={value}
                 
                />
                ))
                },{
                    title:"入庫種類",
                    field:"enterstoragespiecies",
                    editComponent:({value,onChange})=>(
                        <Box mt={3}>
                        <Autocomplete
                        freeSolo
                        inputValue={value}
                        onChange={
                            (event,newValue)=>{
                                if(newValue){
                                    onChange(
                                   newValue.enterstoragespiecies
                                )}
                            }
                        }
                        onInputChange={(e)=>onChange(e.target.value)}
                        options={this.state.listenterstoragespiecies}    
                        getOptionLabel={(option) => option.enterstoragespiecies}
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
                    title:"入庫數量",
                    field:"enterstorageamount",
                },{
                    title:"入庫人員",
                    field:"enterstorageperson",
                    editComponent:({value,onChange})=>(
                        <Box mt={3}>
                        <Autocomplete
                        freeSolo
                        inputValue={value}
                        onChange={
                            (event,newValue)=>{
                                if(newValue){
                                    onChange(
                                   newValue.enterstorageperson
                                )}
                            }
                        }
                        onInputChange={(e)=>onChange(e.target.value)}
                        options={this.state.listenterstorageperson}    
                        getOptionLabel={(option) => option.enterstorageperson}
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
                    title:"填表人",
                    field:"applicationperson",
                },{
                    title:"轉單",
                    field:"transferorder",
                    editComponent: 
                    (props)=>{
                        console.log(props);
                        return(
                        <Checkbox
                            value={this.state.transferorder}
                            checked={props.value}
                            name="transferorder"
                            onChange={(e)=>props.onChange(e.target.checked)}
                        />
                        )
                    },
                    render: (rowdata)=>(
                      <Checkbox checked={rowdata.transferorder} readOnly />
                    )
                },{
                    title:"轉出工單",
                    field:"transferoutorder",
                },{
                    title:"採購單號",
                    field:"buynumber",
                },{
                    title:"倉別",
                    field:"storageclass",
                },{
                    title:"借出單號",
                    field:"bollowoutnumber",
                },{
                    title:"包裝",
                    field:"packing",
                    editComponent: 
                    (props)=>{
                        console.log(props);
                        return(
                        <Checkbox
                            value={this.state.packing}
                            checked={props.value}
                            name="packing"
                            onChange={(e)=>props.onChange(e.target.checked)}
                        />
                        )
                    },
                    render: (rowdata)=>(
                      <Checkbox checked={rowdata.packing} readOnly />
                    )
                },{
                    title:"倉管",
                    field:"storageconfirm",
                    editComponent: 
                    (props)=>{
                        console.log(props);
                        return(
                        <Checkbox
                            value={this.state.storageconfirm}
                            checked={props.value}
                            name="storageconfirm"
                            onChange={(e)=>props.onChange(e.target.checked)}
                        />
                        )
                    },
                    render: (rowdata)=>(
                      <Checkbox checked={rowdata.storageconfirm} readOnly />
                    )
                },{
                    title:"倉管確認時間",
                    field:"storageconfirmtime",
                    editComponent:
                    (({value,onChange})=>(
                  <TextField
                  name="storageconfirmtime"
                  floatingLabelText="倉管確認時間"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="datetime-local"
                  onChange={(e)=>onChange(e.target.value)}
                  floatingLabelFixed
                  style={{ width: '80%' }}
                  value={value}
             
                />
                ))
                },
            ]
            return(
                <div className ="content">
                      <Box
          display="flex"
          alignItems="flex-start"
          pl={1}
          mt={3}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                {this.state.showEdit == true || this.state.showadd == true ? 
                    <Fragment>
            <TableContainer  style={{width:1500 ,maxHeight : 600,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 stickyHeader
                 columns={Columns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="明細"
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
            <TableContainer style={{maxHeight : 600 ,width:1500,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="明細"
                 columns={Columns}
                 data ={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1,paging: true}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
            <Box
         display="flex"
         alignItems="flex-start"
         pl={195}
         mt={-7}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">未入庫數量 :</Typography>
          </ThemeProvider>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">已入庫數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}pl={2}>
            <ThemeProvider theme={theme}>
            <Typography variant="h6">SMT數量 :</Typography>
            </ThemeProvider>
            </Box>
          <Box mt={3}pl={4.7}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">總數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">維修IC入庫數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">未入庫數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">已入庫數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3} pl={2}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Pass數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}pl={3.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Fail數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}pl={2.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">待測數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}pl={2.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">不開數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">未使用數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}pl={5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">總數量 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
         </Box>
         
         <Box
         display="flex"
         alignItems="flex-start"
         pl={209}
         mt={-10}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
          <Box >
          <TextField
           name="Unenterstorageamount"
           value={this.state.Unenterstorageamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           <Box mt={3}>
          <TextField
           name="enteredstorageamount"
           value={this.state.enteredstorageamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
              <Box mt={3}>
          <TextField
           name="SMTamount"
           value={this.state.SMTamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
              <Box mt={3}>
          <TextField
           name="totalamount"
           value={this.state.totalamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
               <Box mt={9}>
          <TextField
           name="RepairICunenterstorageamount"
           value={this.state.RepairICunenterstorageamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
                 <Box mt={3}>
          <TextField
           name="RepairICenteredstorageamount"
           value={this.state.RepairICenteredstorageamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
                 <Box mt={3}>
          <TextField
           name="RepairICPassamount"
           value={this.state.RepairICPassamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
                 <Box mt={3}>
          <TextField
           name="RepairICFailamount"
           value={this.state.RepairICFailamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
                <Box mt={2.4}>
          <TextField
           name="RepairICwaitingtestamount"
           value={this.state.RepairICwaitingtestamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
               <Box mt={2.4}>
          <TextField
           name="RepairICunopenamount"
           value={this.state.RepairICunopenamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
              <Box mt={2.4}>
          <TextField
           name="RepairICunuseamount"
           value={this.state.RepairICunuseamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
             <Box mt={3}>
          <TextField
           name="RepairICtotalamount"
           value={this.state.RepairICtotalamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           </Box>
           </Box>
           </Box>
           </Box>
           </Box>
           </Box>
           
           </Box>
           </Box>
           </Box>
           </Box>
           </Box>
           </Box>
         </Box>

         <Box
         display="flex"
         alignItems="flex-start"
         pl={1}
         mt={60}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
         <Box mt={3}pl={5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">備註 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
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
         pl={55}
         mt={-20}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
          <Box mt={3}pl={5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">驗收入庫數量 :</Typography>
          </ThemeProvider>
          <Box mt={3}pl={20}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">入庫 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}pl={20}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">備品 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}pl={20}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">待測 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          <Box mt={10}pl={20}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">退貨 :</Typography>
          </ThemeProvider>
          <Box mt={3}pl={1}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Fail :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
         </Box>

         <Box
         display="flex"
         alignItems="flex-start"
         pl={87}
         mt={-3}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
              <Box >
          <TextField
           name="acceptance"
           value={this.state.acceptance}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
               <Box mt={3}>
          <TextField
           name="backupproduct"
           value={this.state.backupproduct}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
                <Box mt={3}>
          <TextField
           name="waitingtest"
           value={this.state.waitingtest}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           </Box>
           </Box>
           </Box>
           <Box pl={2}>
          <TextField
           name="returnproduct"
           value={this.state.returnproduct}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
            <Box mt={3}>
          <TextField
           name="Fail"
           value={this.state.Fail}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           </Box>
           </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={200}
         mt={1}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
         <Box pl={2}>
         <button 
    disabled={
     !(this.state.showEdit && !this.state.showadd)
  &&!(!this.state.showEdit && this.state.showadd)
            } 
    onClick={this.handlesave}>
    儲存
    </button>
         </Box>
          <Box pl={2}>
    <button disabled={this.state.showadd == true ||this.state.showEdit == true} onClick={this.handleshowEdit}>
       {this.state.buttonText}
    </button>
    </Box>
    <Box pl={2}>
    <button disabled={!(this.state.showEdit && !this.state.showadd)
  &&!(!this.state.showEdit && this.state.showadd)
          } onClick={this.handlecancel}>取消</button>
    </Box>
    </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={1}
         mt={5}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
                 {this.state.showEdit == true || this.state.showadd == true ? 
                    <Fragment>
            <TableContainer  style={{width:1880 ,maxHeight : 500,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 stickyHeader
                 columns={Columns2}
                 data={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="維修IC入庫明細"
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
            <TableContainer style={{maxHeight : 500 ,width:1880,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="維修IC入庫明細"
                 columns={Columns2}
                 data ={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1,paging: true}}
                 />
                 </TableContainer>
            </Fragment>}
         </Box>
                </div>
            )
        }
}
export default DataWorkEnterstorage