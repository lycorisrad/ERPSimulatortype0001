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

class DataWorkQC extends Component{
     constructor(props){
         super(props);
         this.state={
             data:[],
             IDdata:[],
             IDdata2:[],
             IDdata3:[],

             listfactoryandoutfactory:[],
             listbin:[],
             listclass:[],
             listretirereason:[],
             listfrequency:[],
             listtestprogram:[],
             listfactoryandoutfactory:[],
             modal:null,
           
             confirmdelete:false,
             showadd:false,
             showEdit:false,
             buttonText:"修改",
             buttonsave:"儲存",
             
             FQCamount:"",
             OQCamount:"",
             IQCamount:"",
             description:"",

             Dataview:{
                 QCnumber:"",
                 amount:"",
                 factoryandoutfactory:"",
                 Lotno:"",
                 bin:"",
                 class:"",
                 QCsamplinginspectionamount:"",
                 QCstarttime:"",
                 QCfinishtime:"",
                 acceptreceive:"",
                 retire:"",
                 retirereason:"",
                 frequency:"",
                 testprogram:"",
                 applicationperson:"",
                 errornumber:"",
                 description:"",
             },
             Dataview2:{
                QCnumber:"",
                amount:"",
                factoryandoutfactory:"",
                Lotno:"",
                bin:"",
                class:"",
                QCsamplinginspectionamount:"",
                QCstarttime:"",
                QCfinishtime:"",
                acceptreceive:"",
                retire:"",
                retirereason:"",
                frequency:"",
                testprogram:"",
                applicationperson:"",
                errornumber:"",
                description:"",
            },
            Dataview3:{
                IQCno:"",
                QCnumber:"",
                amount:"",
                giveQCtime:"",
                factoryandoutfactory:"",
                Lotno:"",
                QCsamplinginspectionamount:"",
                QCsamplinginspectiontime:"",
                QCprereturntime:"",
                QCactuallyreturntime:"",
                acceptreceive:"",
                retire:"",
                retest:"",
                applicationperson:"",
                errornumber:"",
                description:"",
            }
         }
     }
     getAllOption=()=>{
         axios.all([
            axios.get("http://localhost:3003/listfactoryandoutfactory"),
            axios.get("http://localhost:3003/listbin"),
            axios.get("http://localhost:3003/listclass"),
            axios.get("http://localhost:3003/listretirereason"),
            axios.get("http://localhost:3003/listfrequency"),
            axios.get("http://localhost:3003/listtestprogram"),
            axios.get("http://localhost:3003/listfactoryandoutfactory"),
         ])
         .then(
             axios.spread((
                 res,res1,res2,res3,res4,res5,res6
             )=>{
                 this.setState({
                    listfactoryandoutfactory:res.data,
                    listbin:res1.data,
                    listclass:res2.data,
                    listretirereason:res3.data,
                    listfrequency:res4.data,
                    listtestprogram:res5.data,
                    listfactoryandoutfactory:res6.data,
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
                    FQCamount:item.FQCamount,
                    OQCamount:item.OQCamount,
                    IQCamount:item.IQCamount,
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
                FQCamount: this.state.FQCamount,
                OQCamount: this.state.OQCamount,
                IQCamount: this.state.IQCamount,
                description: this.state.description,
                data :
                this.state.IDdata,
                data2 : 
                this.state.IDdata2,
                data3:
                this.state.IDdata3,
           })}
           handlecancel=()=>{
            this.state.data.map((item,index)=>{
                if(this.state.id === item.id ){
                    this.setState({
                        IDdata:item.data,
                        IDdata2:item.data2,
                        IDdata3:item.data3,
                        FQCamount: item.FQCamount,
                        OQCamount: item.OQCamount,
                        IQCamount: item.IQCamount,
                        description: item.description,
                    })
                }
                else {
                    this.setState({
                        IDdata:"",
                        IDdata2:"",
                        IDdata3:"",
                        FQCamount: "",
                        OQCamount: "",
                        IQCamount: "",
                        description: "",
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
                title:"QC編號",
                field:"QCnumber",

               },{
                title:"數量",
                field:"amount",
               },{
                title:"工廠/外包廠",
                field:"factoryandoutfactory",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.factoryandoutfactory
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listfactoryandoutfactory}    
                    getOptionLabel={(option) => option.factoryandoutfactory}
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
                title:"Lot No",
                field:"Lotno",
               },
               {
                title:"Bin",
                field:"bin",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.bin
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listbin}    
                    getOptionLabel={(option) => option.bin}
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
                title:"QC抽驗數量",
                field:"QCsamplinginspectionamount",
               },{
                title:"QC開始時間",
                field:"QCstarttime",
                editComponent:
                (({value,onChange})=>(
              <TextField
              name="QCstarttime"
              floatingLabelText="QC開始時間"
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
                title:"QC完成時間",
                field:"QCfinishtime",
                editComponent:
                (({value,onChange})=>(
              <TextField
              name="QCfinishtime"
              floatingLabelText="QC完成時間"
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
                title:"允收",
                field:"acceptreceive",
                editComponent:
                (props)=>{
                  console.log(props);
                  return(
                  <Checkbox
                      value={this.state.acceptreceive}
                      checked={props.value}
                      name="acceptreceive"
                      onChange={(e)=>props.onChange(e.target.checked)}
                  />
                  )
               },
               render: (rowdata)=>(
              <Checkbox checked={rowdata.acceptreceive} readOnly />
               )
               },{
                title:"判退",
                field:"retire",
                editComponent:
                (props)=>{
                  console.log(props);
                  return(
                  <Checkbox
                      value={this.state.retire}
                      checked={props.value}
                      name="retire"
                      onChange={(e)=>props.onChange(e.target.checked)}
                  />
                  )
               },
               render: (rowdata)=>(
              <Checkbox checked={rowdata.retire} readOnly />
               )
               },{
                title:"判退原因",
                field:"retirereason",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.retirereason
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listretirereason}    
                    getOptionLabel={(option) => option.retirereason}
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
                title:"異常單號",
                field:"errornumber",
               },{
                title:"備註",
                field:"description",
               },
           ]
           const Columns2=[
            {
             title:"IQC No",
             field:"IQCno",
            },{
             title:"QC編號",
             field:"QCnumber",
            },{
             title:"數量",
             field:"amount",
            },{
             title:"送QC時間",
             field:"giveQCtime",
            },
            {
             title:"工廠/外包廠",
             field:"factoryandoutfactory",
             editComponent:({value,onChange})=>(
                <Box mt={-2}>
                <Autocomplete
                freeSolo
                inputValue={value}
                onChange={
                    (event,newValue)=>{
                        if(newValue){
                            onChange(
                           newValue.factoryandoutfactory
                        )}
                    }
                }
                onInputChange={(e)=>onChange(e.target.value)}
                options={this.state.listfactoryandoutfactory}    
                getOptionLabel={(option) => option.factoryandoutfactory}
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
             title:"Lot No",
             field:"Lotno",
            },{
             title:"QC抽驗數量",
             field:"QCsamplinginspectionamount",
            },{
             title:"QC檢驗時間",
             field:"QCsamplinginspectiontime",
             editComponent:
             (({value,onChange})=>(
           <TextField
           name="QCsamplinginspectiontime"
           floatingLabelText="QC檢驗時間"
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
             title:"QC預回時間",
             field:"QCprereturntime",
             editComponent:
             (({value,onChange})=>(
           <TextField
           name="QCprereturntime"
           floatingLabelText="QC預回時間"
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
             title:"QC實際回貨時間",
             field:"QCactuallyreturntime",
             editComponent:
             (({value,onChange})=>(
           <TextField
           name="QCactuallyreturntime"
           floatingLabelText="QC實際回貨時間"
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
             title:"允收",
             field:"acceptreceive",
             editComponent:
             (props)=>{
               console.log(props);
               return(
               <Checkbox
                   value={this.state.acceptreceive}
                   checked={props.value}
                   name="acceptreceive"
                   onChange={(e)=>props.onChange(e.target.checked)}
               />
               )
            },
            render: (rowdata)=>(
           <Checkbox checked={rowdata.acceptreceive} readOnly />
            )
            },{
             title:"判退",
             field:"retire",
             editComponent:
             (props)=>{
               console.log(props);
               return(
               <Checkbox
                   value={this.state.retire}
                   checked={props.value}
                   name="retire"
                   onChange={(e)=>props.onChange(e.target.checked)}
               />
               )
            },
            render: (rowdata)=>(
           <Checkbox checked={rowdata.retire} readOnly />
            )
            },{
             title:"複測",
             field:"retest",
             editComponent:
             (props)=>{
               console.log(props);
               return(
               <Checkbox
                   value={this.state.retest}
                   checked={props.value}
                   name="retest"
                   onChange={(e)=>props.onChange(e.target.checked)}
               />
               )
            },
            render: (rowdata)=>(
           <Checkbox checked={rowdata.retest} readOnly />
            )
            },{
             title:"填表人",
             field:"applicationperson",
            },{
             title:"異常單號",
             field:"errornumber",
            },{
             title:"備註",
             field:"description",
            },
        ]
        return(
            <div className ="content">
                 <Box
          display="flex"
          alignItems="flex-start"
          pl={1}
          mt={15}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
               {this.state.showEdit == true || this.state.showadd == true ? 
                    <Fragment>
                    <TableContainer  style={{width:1880 ,maxHeight : 400,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 title ="FQC"
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
            <TableContainer style={{maxHeight : 400 ,width:1880,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="FQC"
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
          pl={180}
          mt={35}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">已FQC數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box >
          <TextField
           name="FQCamount"
           value={this.state.FQCamount}
           onChange ={this.handleChange}
           style={{width:'100%'}}
           />
           </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={1}
          mt={-5}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
               {this.state.showEdit == true || this.state.showadd == true ? 
                    <Fragment>
            <TableContainer  style={{width:1880 ,maxHeight : 400,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns}
                 data={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 title ="OQC"
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
            <TableContainer style={{maxHeight : 400 ,width:1880,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="OQC"
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
          pl={180}
          mt={35}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">已OQC數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box >
          <TextField
           name="OQCamount"
           value={this.state.OQCamount}
           onChange ={this.handleChange}
           style={{width:'100%'}}
           />
           </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={1}
          mt={-5}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
               {this.state.showEdit == true || this.state.showadd == true ? 
                    <Fragment>
            <TableContainer  style={{width:1880 ,maxHeight : 400,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns2}
                 data={this.state.IDdata3}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 title ="OQC"
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
            <TableContainer style={{maxHeight : 400 ,width:1880,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="IQC"
                 columns={Columns2}
                 data ={this.state.IDdata3}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 />
                 </TableContainer>
            </Fragment>}
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={180}
          mt={35}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">已IQC數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box >
          <TextField
           name="IQCamount"
           value={this.state.IQCamount}
           onChange ={this.handleChange}
           style={{width:'100%'}}
           />
           </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={75}
          mt={-10}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">備註 :</Typography>
          </ThemeProvider>
          </Box>
          <Box >
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
         pl={140}
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
export default DataWorkQC