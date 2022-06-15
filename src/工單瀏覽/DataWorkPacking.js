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

class DataWorkPacking extends Component{
     constructor(props){
         super(props);
         this.state={
             data:[],
             IDdata:[],
             IDdata2:[],
      
             listproperty:[],
             listworkproject:[],
             listoperator:[],
             modal:null,
           
             confirmdelete:false,
             showadd:false,
             showEdit:false,
             buttonText:"修改",
             buttonsave:"儲存",
             ICpackingamount:"",
             Modulepackingamount:"",

             Dataview:{
                starttime:"",
                endtime:"",
                property:"",
                workproject:"",
                amount:"",
                operator:"",
                description:"", 
             },
           
             Dataview2:{
                starttime:"",
                endtime:"",
                property:"",
                workproject:"",
                amount:"",
                operator:"",
                description:"", 
             }
         }
     }
     getAllOption=()=>{
         axios.all([
             axios.get("http://localhost:3003/listproperty"),
             axios.get("http://localhost:3003/listworkproject"),
             axios.get("http://localhost:3003/listoperator"),
         ])
         .then(
             axios.spread((
                 res,res1,res2
             )=>{
                 this.setState({
                    listproperty:res.data,
                    listworkproject:res1.data,
                    listoperator:res2.data,
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
                    ICpackingamount:item.ICpackingamount,
                    Modulepackingamount:item.Modulepackingamount,
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
                ICpackingamount:this.state.ICpackingamount,
                Modulepackingamount:this.state.Modulepackingamount,
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
                        ICpackingamount:item.ICpackingamount,
                    Modulepackingamount:item.Modulepackingamount,
                    })
                }
                else {
                    this.setState({
                        IDdata:"",
                        IDdata2:"",
                        ICpackingamount:item.ICpackingamount,
                        Modulepackingamount:item.Modulepackingamount,
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
                    
                    />
                    ))
                   },
                   { 
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
        
                />
                ))
               },
               { 
                title:"性質",
                field:"property",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.property
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listproperty}    
                    getOptionLabel={(option) => option.property}
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
           },  { 
            title:"作業項目",
            field:"workproject",
            editComponent:({value,onChange})=>(
                <Box mt={-2}>
                <Autocomplete
                freeSolo
                inputValue={value}
                onChange={
                    (event,newValue)=>{
                        if(newValue){
                            onChange(
                           newValue.workproject
                        )}
                    }
                }
                onInputChange={(e)=>onChange(e.target.value)}
                options={this.state.listworkproject}    
                getOptionLabel={(option) => option.workproject}
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
            title:"數量",
            field:"amount",
        },
        {
            title:"作業員",
            field:"operator",
            editComponent:({value,onChange})=>(
                <Box mt={-2}>
                <Autocomplete
                freeSolo
                inputValue={value}
                onChange={
                    (event,newValue)=>{
                        if(newValue){
                            onChange(
                           newValue.operator
                        )}
                    }
                }
                onInputChange={(e)=>onChange(e.target.value)}
                options={this.state.listoperator}    
                getOptionLabel={(option) => option.operator}
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
            title:"備註",
            field:"description",
            editComponent:({value,onChange})=>(
                <TextField
                name="description"
                value={value}
                onChange ={(e)=>onChange(e.target.value)}
                style={{width:'100%'}}
                />
            )
        }
               ]
               return (
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
            <TableContainer  style={{width:1880 ,maxHeight : 400,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="首包"
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
            <TableContainer style={{maxHeight : 500,width:1880,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="首包"
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
          pl={15}
          mt={50}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Module包裝數量 :</Typography>
          </ThemeProvider>
          <Box pl={5.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">IC包裝數量 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={35}
          mt={-13}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                <Box >
          <TextField
           name="Modulepackingamount"
           value={this.state.Modulepackingamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
             <Box >
          <TextField
           name="ICpackingamount"
           value={this.state.ICpackingamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           </Box>
           </Box>
          </Box>
          <Box
         display="flex"
         alignItems="flex-start"
         pl={130}
         mt={-18}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
          <Box>
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
          <Box
          display="flex"
          alignItems="flex-start"
          pl={1}
          mt={10}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              {this.state.showEdit == true || this.state.showadd == true ? 
                    <Fragment>
            <TableContainer  style={{width:1880 ,maxHeight : 400,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns}
                 data={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="重包"
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
            <TableContainer style={{maxHeight : 500,width:1880,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="重包"
                 columns={Columns}
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
export default DataWorkPacking