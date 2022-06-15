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

class DataWorkICSorting extends Component{
      constructor(props){
          super(props);
          this.state={
            data:[],
            IDdata:[],
            IDdata2:[],
            
            listbin:[],
            listbenckmark:[],
            listtestcondition:[],
            listfrequency:[],
            listgroupclass:[],
            listtestprogram:[],
            listcapability:[],
            listtestperson:[],
            modal:null,
           
            confirmdelete:false,
            showadd:false,
            showEdit:false,
            buttonText:"修改",
            buttonsave:"儲存",

            throughPass:"",
            throughFail:"",
            throughPassrate:"",

            reworkPass:"",
            reworkFail:"",
            reworkPassrate:"",

            Dataview:{
                Lotno:"",
                bin:"",
                pass:"",
                passrate:"",
                starttime:"",
                benckmark:"",
                testcondition:"",
                frequency:"",
                dutamount:"",
                applicationperson:"",
                amount:"",
                groupclass:"",
                fail:"",
                endtime:"",
                testprogram:"",
                retest:false,
                capability:"",
                testperson:"",
            },
            Dataview2:{
                Lotno:"",
                bin:"",
                pass:"",
                passrate:"",
                starttime:"",
                benckmark:"",
                testcondition:"",
                frequency:"",
                dutamount:"",
                applicationperson:"",
                amount:"",
                groupclass:"",
                fail:"",
                endtime:"",
                testprogram:"",
                retest:false,
                capability:"",
                testperson:"",
            }
          }
      }
      getAllOption=()=>{
          axios.all([
            axios.get("http://localhost:3003/listbin"),
            axios.get("http://localhost:3003/listbenckmark"), 
            axios.get("http://localhost:3003/listtestcondition"), 
            axios.get("http://localhost:3003/listfrequency"), 
            axios.get("http://localhost:3003/listgroupclass"), 
            axios.get("http://localhost:3003/listtestprogram"), 
            axios.get("http://localhost:3003/listcapability"), 
            axios.get("http://localhost:3003/listtestperson"),
        ])
        .then(
            axios.spread((
                res,res1,res2,res3,res4,res5,res6,res7
            )=>{
                this.setState({
                    listbin:res.data,
                    listbenckmark:res1.data,
                    listtestcondition:res2.data,
                    listfrequency:res3.data,
                    listgroupclass:res4.data,
                    listtestprogram:res5.data,
                    listcapability:res6.data,
                    listtestperson:res7.data,
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
                    throughPass:item.throughPass,
                    throughFail:item.throughFail,
                    throughPassrate:item.throughPassrate,
        
                    reworkPass:item.reworkPass,
                    reworkFail:item.reworkFail,
                    reworkPassrate:item.reworkPassrate,
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
                throughPass:this.state.throughPass,
                throughFail:this.state.throughFail,
                throughPassrate:this.state.throughPassrate,
    
                reworkPass:this.state.reworkPass,
                reworkFail:this.state.reworkFail,
                reworkPassrate:this.state.reworkPassrate,
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
                        throughPass:item.throughPass,
                        throughFail:item.throughFail,
                        throughPassrate:item.throughPassrate,
            
                        reworkPass:item.reworkPass,
                        reworkFail:item.reworkFail,
                        reworkPassrate:item.reworkPassrate,
                    })
                }
                else {
                    this.setState({
                        IDdata:"",
                        IDdata2:"",
                        throughPass:"",
                    throughFail:"",
                    throughPassrate:"",
        
                    reworkPass:"",
                    reworkFail:"",
                    reworkPassrate:"",
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
                    title:"Lot No",
                    field:"Lotno",
                },
                {
                    title:"數量",
                    field:"amount",
                },{
                    title:"Bin",
                    field:"bin",
                    editComponent:({value,onChange})=>(
                        <Box mt={3}mt={-2}>
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
                    field:"groupclass",
                    editComponent:({value,onChange})=>(
                        <Box mt={3}mt={-2}>
                        <Autocomplete
                        freeSolo
                        inputValue={value}
                        onChange={
                            (event,newValue)=>{
                                if(newValue){
                                    onChange(
                                   newValue.groupclass
                                )}
                            }
                        }
                        onInputChange={(e)=>onChange(e.target.value)}
                        options={this.state.listgroupclass}    
                        getOptionLabel={(option) => option.groupclass}
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
                    title:"Pass",
                    field:"pass",
                },{
                    title:"Fail",
                    field:"fail",
                },{
                    title:"良率",
                    field:"passrate",
                },{
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
                    title:"測試平台",
                    field:"benckmark",
                    editComponent:({value,onChange})=>(
                        <Box mt={3}mt={-2}>
                        <Autocomplete
                        freeSolo
                        inputValue={value}
                        onChange={
                            (event,newValue)=>{
                                if(newValue){
                                    onChange(
                                   newValue.benckmark
                                )}
                            }
                        }
                        onInputChange={(e)=>onChange(e.target.value)}
                        options={this.state.listbenckmark}    
                        getOptionLabel={(option) => option.benckmark}
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
                        <Box mt={3}mt={-2}>
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
                    title:"測試條件",
                    field:"testcondition",
                    editComponent:({value,onChange})=>(
                        <Box mt={3}mt={-2}>
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
                    title:"頻率",
                    field:"frequency",
                    editComponent:({value,onChange})=>(
                        <Box mt={3}mt={-2}>
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
                    title:"容量",
                    field:"capability",
                    editComponent:({value,onChange})=>(
                        <Box mt={3}mt={-2}>
                        <Autocomplete
                        freeSolo
                        inputValue={value}
                        onChange={
                            (event,newValue)=>{
                                if(newValue){
                                    onChange(
                                   newValue.capability
                                )}
                            }
                        }
                        onInputChange={(e)=>onChange(e.target.value)}
                        options={this.state.listcapability}    
                        getOptionLabel={(option) => option.capability}
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
                    title:"Dut數量",
                    field:"dutamount",
                },{
                    title:"測試人員",
                    field:"testperson",
                    editComponent:({value,onChange})=>(
                        <Box mt={3}mt={-2}>
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
                },
            ]
            return (
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
            <TableContainer  style={{width:1700 ,maxHeight : 600,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 stickyHeader
                 columns={Columns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="直通"
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
            <TableContainer style={{maxHeight : 600 ,width:1700,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="直通"
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
         pl={215}
         mt={1}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
             <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Pass :</Typography>
          </ThemeProvider>
          <Box pl={1.5} mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Fail :</Typography>
          </ThemeProvider>
          </Box>
           <Box pl={0.5} mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">良率 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={222}
         mt={-10}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
              <Box >
          <TextField
           name="throughPass"
           value={this.state.throughPass}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
                 <Box mt={3}>
          <TextField
           name="throughFail"
           value={this.state.throughFail}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           </Box>
           <Box mt={3}>
          <TextField
           name="throughPassrate"
           value={this.state.throughPassrate}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           </Box>
           </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={222}
         mt={35}
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
          mt={1}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                  {this.state.showEdit == true || this.state.showadd == true ? 
                   
                    <Fragment>
            <TableContainer  style={{width:1700 ,maxHeight : 600,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 stickyHeader
                 columns={Columns}
                 data={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="重工"
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
            <TableContainer style={{maxHeight : 600 ,width:1700,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="重工"
                 columns={Columns}
                 data ={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1,paging: true}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
            <Box
         display="flex"
         alignItems="flex-start"
         pl={215}
         mt={1}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
             <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Pass :</Typography>
          </ThemeProvider>
          <Box pl={1.5} mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Fail :</Typography>
          </ThemeProvider>
          </Box>
           <Box pl={0.5} mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">良率 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={222}
         mt={-10}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
              <Box >
          <TextField
           name="reworkPass"
           value={this.state.reworkPass}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
                 <Box mt={3}>
          <TextField
           name="reworkFail"
           value={this.state.reworkFail}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           </Box>
           <Box mt={3}>
          <TextField
           name="reworkPassrate"
           value={this.state.reworkPassrate}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           </Box>
           </Box>
         </Box>
                </div>
            )
        }
        
}
export default DataWorkICSorting