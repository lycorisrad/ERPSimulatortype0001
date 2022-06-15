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

class DataWorkSMT extends Component{
    constructor(props){
        super(props);
        this.state={
          data:[],
          IDdata:[],
          IDdata2:[],

          listSMTfactory:[],
          listSMTtype:[],
          listprincipal:[],
          listbackupboard:[],
          modal:null,
           
          confirmdelete:false,
          showadd:false,
          showEdit:false,
          buttonText:"修改",
          buttonsave:"儲存",
          
          id:"",
          description:"",
          ungiveamount:"",
          givedamount:"",
          totalamount:"",
          
          Dataview:{
            SMTfactory:"",
            SMTtype:"",
            amount:"",
            issuedate:"",
            principal:"",
            applicationperson:"",
            backupboard:"",
            backupEEPROM:false,
            EEamount:"",
            ICamount:"",
            ICreturnback:"",
            PCBamount:"",
            PCBreturn:"",
            Feeding:"",
            UnFeeding:"",
            errorboard:"",
            Feedingconfirm:false,
            Feedingconfirmdate:"",
            enterstorageconfirm : false,
            enterstorageconfirmdate:"",
          },
          Dataview2:{
            consumenumber:"",
            consumetype:"",
            productnumber:"",
            amount:"",
           
          }

        }
    }
    getAllOption=()=>{
        axios.all([
            axios.get("http://localhost:3003/listSMTfactory"),
            axios.get("http://localhost:3003/listSMTtype"),
            axios.get("http://localhost:3003/listprincipal"),
            axios.get("http://localhost:3003/listbackupboard"),
        ])
        .then(
            axios.spread((
                res,res1,res2,res3,
            )=>{
                this.setState({
                    listSMTfactory:res.data,
                    listSMTtype:res1.data,
                    listprincipal:res2.data,
                    listbackupboard:res3.data,
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
                    IDdata2:item.Dataview2,
                    description:item.description,
                    ungiveamount:item.ungiveamount,
                    givedamount:item.givedamount,
                    totalamount:item.totalamount, 
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
                description:this.state.description,
                ungiveamount:this.state.ungiveamount,
                givedamount:this.state.givedamount,
                totalamount:this.state.totalamount,
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
                        description:this.state.description,
                        ungiveamount:this.state.ungiveamount,
                        givedamount:this.state.givedamount,
                        totalamount:this.state.totalamount,
                    })
                }
                else {
                    this.setState({
                        IDdata:"",
                        IDdata2:"",
                        description:"",
                        ungiveamount:"",
                        givedamount:"",
                        totalamount:"",
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
        const Columns =[
             {
                title:"SMT廠",
                field:"SMTfactory",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.SMTfactory
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listSMTfactory}    
                    getOptionLabel={(option) => option.SMTfactory}
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
                )
             },{
                title:"SMT類型",
                field:"SMTtype",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.SMTtype
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listSMTtype}    
                    getOptionLabel={(option) => option.SMTtype}
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
                )       
             },{
                 title:"數量",
                 field:"amount"
             },{
                title:"發料時間",
                field:"issuedate",
                editComponent:
                  (({value,onChange})=>(
                <TextField
                name="issuedate"
                floatingLabelText="發料時間"
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
                title:"負責人",
                field:"principal",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.principal
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listprincipal}    
                    getOptionLabel={(option) => option.principal}
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
                )
            },{
                title:"填表人",
                field:"applicationperson"
            },{
                title:"備板",
                field:"backupboard",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.backupboard
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listbackupboard}    
                    getOptionLabel={(option) => option.backupboard}
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
                )
            },{
                    title:"備EEPROM",
                    field:"backupEEPROM",
                   
                },{
                    title:"EE 數量",
                    field:"EEamount"
                },{
                    title:"IC 數量",
                    field:"ICamount"
                },{
                    title:"退回IC",
                    field:"ICreturnback"
                },{
                    title:"PCB數量",
                    field:"PCBamount"
                },{
                    title:"退回PCB",
                    field:"PCBreturn"
                },{
                    title:"上料",
                    field:"Feeding"
                },{
                    title:"未上",
                    field:"UnFeeding"
                },{
                    title:"壞版",
                    field:"errorboard"
                },{
                    title:"發料確認",
                    field:"Feedingconfirm",
                    editComponent: 
                    (props)=>{
                        return(
                        <Checkbox
                            value={this.state.Feedingconfirm}
                            checked={props.value}
                            name="Feedingconfirm"
                            onChange={(e)=>props.onChange(e.target.checked)}
                        />
                        )
                },
                render: (rowdata)=>(
                    <Checkbox checked={rowdata.Feedingconfirm} readOnly />
                  )
                },{
                    title:"發料確認時間",
                    field:"Feedingconfirmdate",
                    editComponent:
                    (({value,onChange})=>(
                  <TextField
                  name="Feedingconfirmdate"
                  floatingLabelText="發料確認時間"
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
                    title:"入庫確認",
                    field:"enterstorageconfirm", 
                    editComponent: 
                    (props)=>{
                        return(
                        <Checkbox
                            value={this.state.enterstorageconfirm}
                            checked={props.value}
                            name="enterstorageconfirm"
                            onChange={(e)=>props.onChange(e.target.checked)}
                        />
                        )
                },
                render: (rowdata)=>(
                    <Checkbox checked={rowdata.enterstorageconfirm} readOnly />
                  )
                },{
                    title:"入庫時間",
                    field:"enterstorageconfirmdate", 
                    editComponent:
                    (({value,onChange})=>(
                  <TextField
                  name="enterstorageconfirmdate"
                  floatingLabelText="入庫時間"
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
        const Columns2=[
            {
                title:"耗用單號",
                field:"consumenumber"
            },{
                title:"耗用類別",
                field:"consumetype"
            },{
                title:"產品單號",
                field:"productnumber"
            },{
                title:"數量",
                field:"amount"
            }
        ]
        return (
            <div className ="content">
            {this.state.showEdit == true || this.state.showadd == true ? 
          <Fragment>
            <TableContainer  style={{width:1900 ,maxHeight : 700,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="發料"
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
            <TableContainer style={{maxHeight : 700 ,width:1900,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="發料"
                 columns={Columns}
                 data ={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 />
                 </TableContainer>
            </Fragment>}
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
            <TableContainer  style={{width:700 ,maxHeight : 700,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns2}
                 data={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="耗用Item"
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
                                console.log("new: ",newData);

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
            <TableContainer style={{maxHeight : 700 ,width:700,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="耗用Item"
                 columns={Columns2}
                 data ={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
            <Box
          display="flex"
          alignItems="flex-start"
          pl={105}
          mt={-15}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">備註 :</Typography>
          </ThemeProvider>
          <Box mt={1}>
            <textarea
          name="description"
          className = "form-control"
          onChange = {this.handleChange}
          value={this.state.description}
             />
            </Box>
          </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={100}
          mt={1}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">未發數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="ungiveamount"
           value={this.state.ungiveamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
          </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={100}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">已發數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="givedamount"
           value={this.state.givedamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
          </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={102.5}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">總數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="totalamount"
           value={this.state.totalamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
          </Box>
          </Box>
          <Box
         display="flex"
         alignItems="flex-start"
         pl={130}
         mt={-7}
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
            </div>
        )
    }

}
export default DataWorkSMT