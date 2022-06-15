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

class DataWorkQCSorting extends Component{
      constructor(props){
          super(props);
          this.state={
              data:[],
              IDdata:[],
              IDdata2:[],
              
              listfactoryandoutfactory:[],
              listbin:[],
              listgroupclass:[],
              listretirereason:[],
              listfrequency:[],
              listtestprogram:[],
              modal:null,
           
              confirmdelete:false,
              showadd:false,
              showEdit:false,
              buttonText:"修改",
              buttonsave:"儲存",
              
              FQCunfqcamount:"",
              FQCretireamount:"",
              FQCfqcedamount:"",
              OQCunoqcamount:"",
              OQCretireamount:"",
              OQCoqcedamount:"",

              Dataview:{
                  qcnumber:"",
                  amount:"",
                  factoryandoutfactory:"",
                  Lotno:"",
                  bin:"",
                  groupclass:"",
                  qcsamplingtestamount:"",
                  qcstarttime:"",
                  qcfinishtime:"",
                  acceptrecieve:false,
                  retire:false,
                  retirereason:"",
                  frequency:"",
                  testprogram:"",
                  applicationperson:"",
                  errornumber:"",
                  description:"",
              },
              Dataview2:{
                qcnumber:"",
                amount:"",
                factoryandoutfactory:"",
                Lotno:"",
                bin:"",
                groupclass:"",
                qcsamplingtestamount:"",
                qcstarttime:"",
                qcfinishtime:"",
                acceptrecieve:false,
                retire:false,
                retirereason:"",
                frequency:"",
                testprogram:"",
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
            axios.get("http://localhost:3003/listgroupclass"),
            axios.get("http://localhost:3003/listretirereason"),
            axios.get("http://localhost:3003/listfrequency"),
            axios.get("http://localhost:3003/listtestprogram"),
        ])
        .then(
            axios.spread((
               res,res1,res2,res3,res4,res5
            )=>{
                this.setState({
                    listfactoryandoutfactory:res.data,
                    listbin:res1.data,
                    listgroupclass:res2.data,
                    listretirereason:res3.data,
                    listfrequency:res4.data,
                    listtestprogram:res5.data,
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
              FQCunfqcamount:item.FQCunfqcamount,
              FQCretireamount:item.FQCretireamount,
              FQCfqcedamount:item.FQCfqcedamount,
              OQCunoqcamount:item.OQCunoqcamount,
              OQCretireamount:item.OQCretireamount,
              OQCoqcedamount:item.OQCoqcedamount,
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
                FQCunfqcamount:this.state.FQCunfqcamount,
                FQCretireamount:this.state.FQCretireamount,
                FQCfqcedamount:this.state.FQCfqcedamount,
                OQCunoqcamount:this.state.OQCunoqcamount,
                OQCretireamount:this.state.OQCretireamount,
                OQCoqcedamount:this.state.OQCoqcedamount,
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
                        FQCunfqcamount:item.FQCunfqcamount,
                        FQCretireamount:item.FQCretireamount,
                        FQCfqcedamount:item.FQCfqcedamount,
                        OQCunoqcamount:item.OQCunoqcamount,
                        OQCretireamount:item.OQCretireamount,
                        OQCoqcedamount:item.OQCoqcedamount,
                    })
                }
                else {
                    this.setState({
                        IDdata:"",
                        IDdata2:"",
                        FQCunfqcamount:"",
                        FQCretireamount:"",
                        FQCfqcedamount:"",
                        OQCunoqcamount:"",
                        OQCretireamount:"",
                        OQCoqcedamount:"",
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
                    title:"QC編號",
                    field:"qcnumber",
                },{
                    title:"數量",
                    field:"amount",
                },{
                    title:"工廠/外包廠",
                    field:"factoryandoutfactory",
                    editComponent:({value,onChange})=>(
                        <Box mt={3}mt={-2}>
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
                    title:"QC抽驗數量",
                    field:"qcsamplingtestamount",
                },{
                    title:"QC開始時間",
                    field:"qcstarttime",
                },{
                    title:"QC完成時間",
                    field:"qcfinishtime",
                },{
                    title:"允收",
                    field:"acceptrecieve",
                },{
                    title:"判退",
                    field:"retire",
                },{
                    title:"判退原因",
                    field:"retirereason",
                    editComponent:({value,onChange})=>(
                        <Box mt={3}mt={-2}>
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
                    title:"填表人",
                    field:"applicationperson",
                },
                {
                    title:"異常單號",
                    field:"errornumber",
                },
                {
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
            <TableContainer  style={{width:1600 ,maxHeight : 600,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 stickyHeader
                 columns={Columns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1}}
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
            <TableContainer style={{maxHeight : 600 ,width:1600,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="FQC"
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
         pl={205}
         mt={1}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
             <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">未FQC數量 :</Typography>
          </ThemeProvider>
          <Box  mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">FQC判退數量 :</Typography>
          </ThemeProvider>
          </Box>
           <Box pl={2.5} mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">已FQC數量 :</Typography>
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
           name="FQCunfqcamount"
           value={this.state.FQCunfqcamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
                 <Box mt={3}>
          <TextField
           name="FQCretireamount"
           value={this.state.FQCretireamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           </Box>
           <Box mt={3}>
          <TextField
           name="FQCfqcedamount"
           value={this.state.FQCfqcedamount}
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
            <TableContainer  style={{width:1600 ,maxHeight : 600,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 stickyHeader
                 columns={Columns}
                 data={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1}}
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
            <TableContainer style={{maxHeight : 600 ,width:1600,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="OQC"
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
         pl={205}
         mt={1}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
             <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">未OQC數量 :</Typography>
          </ThemeProvider>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">OQC判退數量 :</Typography>
          </ThemeProvider>
          </Box>
           <Box pl={2} mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">已OQC數量 :</Typography>
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
           name="OQCunoqcamount"
           value={this.state.OQCunoqcamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
                 <Box mt={3}>
          <TextField
           name="OQCretireamount"
           value={this.state.OQCretireamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           </Box>
           <Box mt={3}>
          <TextField
           name="OQCoqcedamount"
           value={this.state.OQCoqcedamount}
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
export default DataWorkQCSorting