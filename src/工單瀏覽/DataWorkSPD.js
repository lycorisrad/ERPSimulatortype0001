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
import MaskedInput from "react-text-mask";
import InputMask from "react-input-mask";
class DataWorkSPD extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            IDdata:[],
            IDdata2:[],
            
            listoperator:[],
            listsetpeson:[],
            modal:null,
             
           showadd:false,
           showEdit:false,
           buttonText:"修改",
           buttonsave:"儲存",

            id:"", 
            unburnedamount:"",
            burnedamount:"",
            totalamount:"",
            description:"",

            Dataview:{
                burningtime:"",
                amount:"",
                pass:"",
                fail:"",
                passrate:"",
                operator:"",
                setperson:"",
                applicationperson:"",
                firstinvoice:"",
            },
            Dataview2:{
                burningtime:"",
                amount:"",
                pass:"",
                fail:"",
                passrate:"",
                operator:"",
                setperson:"",
                applicationperson:"",
            }
        }
    }
    getAllOption=()=>{
        axios.all([
            axios.get("http://localhost:3003/listoperator"),
            axios.get("http://localhost:3003/listsetpeson")
        ]) 
        .then(
            axios.spread((
                res,res1
            )=>{
                this.setState({
                    listoperator:res.data,
                    listsetpeson:res1.data
                })
            })
        )
    }
    PUT=()=>{
        axios.put(`http://localhost:3003/data/${this.state.id}`,
        {
            unburnedamount:this.state.unburnedamount,
            burnedamount:this.state.burnedamount,
            totalamount:this.state.totalamount,
            description:this.state.description,
            data:
            this.state.IDdata,
            data2:
            this.state.IDdata2
        }
        )
    }
    handlecancel=()=>{
        this.state.data.map((item,index)=>{
            if(this.state.id === item.id ){
                this.setState({
                    IDdata:item.data,
                    IDdata2:item.data2,
                    unburnedamount:this.state.unburnedamount,
            burnedamount:this.state.burnedamount,
            totalamount:this.state.totalamount,
            description:this.state.description,
                })
            }
            else {
                this.setState({
                    IDdata:"",
                    IDdata2:"",
                    unburnedamount:"",
            burnedamount:"",
            totalamount:"",
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
                    unburnedamount:item.unburnedamount,
                    burnedamount:item.burnedamount,
                    totalamount:item.totalamount,
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
        const descriptionstyle={
            minHeight:'150px',
              resize:'auto',
              padding:'9px',
              boxSizing:'border-box',
              fontSize:'15px',
              width:'500px'
           }
        const Columns=[
            {
                title:"燒錄時間",
                field:"burningtime",
                editComponent:
                (({value,onChange})=>(
              <TextField
              name="burningtime"
              floatingLabelText="燒錄時間"
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
                title:"數量",
                field:"amount",
            },{
                title:"PASS",
                field:"pass",
            },{
                title:"FAIL",
                field:"fail",
            },{
                title:"良率",
                field:"passrate",
              
            },{
                title:"操作者",
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
                title:"設定者",
                field:"setperson",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.setperson
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listsetperson}    
                    getOptionLabel={(option) => option.setperson}
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
                field:"applicationperson",
            },{
                title:"首件單據",
                field:"invoice",
            },
        ] 
        const Columns1=[
            {
                title:"燒錄時間",
                field:"burningtime",
                editComponent:
                (({value,onChange})=>(
              <TextField
              name="burningtime"
              floatingLabelText="燒錄時間"
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
                title:"數量",
                field:"amount",
            },{
                title:"PASS",
                field:"pass",
            },{
                title:"FAIL",
                field:"fail",
            },{
                title:"良率",
                field:"passrate",
            },{
                title:"操作者",
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
                title:"設定者",
                field:"setperson",
                editComponent:({value,onChange})=>(
                    <Box mt={-2}>
                    <Autocomplete
                    freeSolo
                    inputValue={value}
                    onChange={
                        (event,newValue)=>{
                            if(newValue){
                                onChange(
                               newValue.setperson
                            )}
                        }
                    }
                    onInputChange={(e)=>onChange(e.target.value)}
                    options={this.state.listsetperson}    
                    getOptionLabel={(option) => option.setperson}
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
                field:"applicationperson",
            }
        ]
        return (
            <div className ="content">
            <Box mt={5}></Box>
                 {this.state.showEdit == true || this.state.showadd == true ? 
          <Fragment>
            <TableContainer  style={{width:1900 ,maxHeight : 400,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="工廠"
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
            <TableContainer style={{maxHeight : 400,width:1900,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="工廠"
                 columns={Columns}
                 data ={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 />
                 </TableContainer>
            </Fragment>}
          <Box
          display="flex"
          alignItems="flex-start"
          pl={10}
          mt={15}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">未燒數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="unburnedamount"
           value={this.state.unburnedamount}
           onChange ={this.handleChange}
           style={{width:'100%'}}
           />
          </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={10}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">已燒數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="burnedamount"
           value={this.state.burnedamount}
           onChange ={this.handleChange}
           style={{width:'100%'}}
           />
          </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={12.5}
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
           style={{width:'100%'}}
           />
          </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={55}
          mt={-25}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">備註 :</Typography>
          </ThemeProvider>
          <Box pl={11}></Box>
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
         pl={120}
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
          <Box mt={10}></Box>
          {this.state.showEdit == true || this.state.showadd == true ? 
          <Fragment>
            <TableContainer  style={{width:1900 ,maxHeight : 400,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns1}
                 data={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="重燒"
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
            <TableContainer style={{maxHeight : 400 ,width:1900,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="重燒"
                 columns={Columns1}
                 data ={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 />
                 </TableContainer>
            </Fragment>}
          
            </div>
        )
    }
}
export default DataWorkSPD