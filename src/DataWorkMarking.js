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

class DataWorkMarking extends Component{
     constructor(props){
         super(props);
         this.state={
            data:[],
            IDdata:[],
            IDdata2:[],
            IDdata3:[],
            IDdata4:[],
            
            listprintfactory:[],
            listproperty:[],
            listoperator:[],
            listsetperson:[],
            listsigner:[],

            modal:null,
           
            confirmdelete:false,
            showadd:false,
            showEdit:false,
            buttonText:"修改",
            buttonsave:"儲存",

            description:"",
            unprintamount:"",
            printedamount:"",
            
            unreturnamount:"",
            returnedamount:"",
            totalprintamount:"",

            Dataview:{
                serialnumber:"",
                printfactory:"",
                amount:"",
                sendtime:"",
                property:"",
                operator:"",
                setperson:"",
                description:"",
                applicationperson:"",
            },
            Dataview2:{
                serialnumber:"",
                printfactory:"",
                amount:"",
                sendtime:"",
                property:"",
                operator:"",
                setperson:"",
                description:"",
                applicationperson:"",
            },
            Dataview3:{
                printfactory:"",
                returnamount:"",
                returntime:"",
                signer:"",
                applicationperson:"",
            },
            Dataview4:{
                printfactory:"",
                returnamount:"",
                returntime:"",
                signer:"",
                applicationperson:"",
            }
         }
        }
        getAllOption=()=>{
            axios.all([
                axios.get("http://localhost:3003/listprintfactory"),
                axios.get("http://localhost:3003/listproperty"),
                axios.get("http://localhost:3003/listoperator"),
                axios.get("http://localhost:3003/listsetperson"),
                axios.get("http://localhost:3003/listsigner"),
            ])
            .then(
                axios.spread((
                    res,res1,res2,res3,res4
                )=>{
                    this.setState({
                       listprintfactory:res.data,
                       listproperty:res1.data,
                       listoperator:res2.data,
                       listsetperson:res3.data,
                       listsigner:res4.data,
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
                    description:item.description,
                    unprintamount:item.unprintamount,
                    printedamount:item.printedamount,
                    
                    unreturnamount:item.unreturnamount,
                    returnedamount:item.returnedamount,
                    totalprintamount:item.totalprintamount,
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
                    unprintamount:this.state.unprintamount,
                    printedamount:this.state.printedamount,
                    
                    unreturnamount:this.state.unreturnamount,
                    returnedamount:this.state.returnedamount,
                    totalprintamount:this.state.totalprintamount,
                data :
                this.state.IDdata,
                data2 : 
                this.state.IDdata2,
                data3:
                this.state.IDdata3,
                data4:
                this.state.IDdata4,
           })}
           handlecancel=()=>{
            this.state.data.map((item,index)=>{
                if(this.state.id === item.id ){
                    this.setState({
                        IDdata:item.data,
                        IDdata2:item.data2,
                        IDdata3:item.data3,
                        IDdata4:item.data4,
                        description:this.state.description,
                        unprintamount:this.state.unprintamount,
                        printedamount:this.state.printedamount,
                        
                        unreturnamount:this.state.unreturnamount,
                        returnedamount:this.state.returnedamount,
                        totalprintamount:this.state.totalprintamount,
                    })
                }
                else {
                    this.setState({
                        IDdata:"",
                        IDdata2:"",
                        IDdata3:"",
                        IDdata4:"",

                        description:"",
                        unprintamount:"",
                        printedamount:"",
                        
                        unreturnamount:"",
                        returnedamount:"",
                        totalprintamount:"",
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
                minHeight:'100px',
                  resize:'auto',
                  padding:'9px',
                  boxSizing:'border-box',
                  fontSize:'15px',
                  width:'200px'
               }
            const Columns=[
              
                {
                    title:"流水號",
                    field:"serialnumber",
                },{
                    title:"打印廠",
                    field:"printfactory",
                    editComponent:({value,onChange})=>(
                        <Box mt={-2}>
                        <Autocomplete
                        freeSolo
                        inputValue={value}
                        onChange={
                            (event,newValue)=>{
                                if(newValue){
                                    onChange(
                                   newValue.printfactory
                                )}
                            }
                        }
                        onInputChange={(e)=>onChange(e.target.value)}
                        options={this.state.listprintfactory}    
                        getOptionLabel={(option) => option.printfactory}
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
                },{
                    title:"送出時間",
                    field:"sendtime",
                    editComponent:
                    (({value,onChange})=>(
                  <TextField
                  name="sendtime"
                  floatingLabelText="送出時間"
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
                },{
                    title:"填表人",
                    field:"applicationperson",
                }
            ]
            const Columns2=[
               
                {
                    title:"打印廠",
                    field:"printfactory",
                    editComponent:({value,onChange})=>(
                        <Box mt={-2}>
                        <Autocomplete
                        freeSolo
                        inputValue={value}
                        onChange={
                            (event,newValue)=>{
                                if(newValue){
                                    onChange(
                                   newValue.applicationperson
                                )}
                            }
                        }
                        onInputChange={(e)=>onChange(e.target.value)}
                        options={this.state.listapplicationperson}    
                        getOptionLabel={(option) => option.applicationperson}
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
                }, {
                    title:"送回數量",
                    field:"returnamount",
                }, {
                    title:"送回時間",
                    field:"returntime",
                    editComponent:
                    (({value,onChange})=>(
                  <TextField
                  name="returntime"
                  floatingLabelText="送回時間"
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
                }, {
                    title:"簽收人",
                    field:"signer",
                    editComponent:({value,onChange})=>(
                        <Box mt={-2}>
                        <Autocomplete
                        freeSolo
                        inputValue={value}
                        onChange={
                            (event,newValue)=>{
                                if(newValue){
                                    onChange(
                                   newValue.signer
                                )}
                            }
                        }
                        onInputChange={(e)=>onChange(e.target.value)}
                        options={this.state.listsigner}    
                        getOptionLabel={(option) => option.signer}
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
                }, {
                    title:"填表人",
                    field:"applicationperson",
                },
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
                 options ={{search:false,actionsColumnIndex:-1,paging: true}}
                 title ="首發"
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
                 title ="首發"
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
          pl={200}
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
          pl={190}
          mt={2}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">未發打印數量 :</Typography>
          </ThemeProvider>
          <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">已發打印數量 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          </Box>
          <Box
         display="flex"
         alignItems="flex-start"
         pl={206}
         mt={-12}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
             <Box >
          <TextField
           name="unprintamount"
           value={this.state.unprintamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
            <Box >
          <TextField
           name="printedamount"
           value={this.state.printedamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           </Box>
           </Box>
         </Box>
         <Box
          display="flex"
          alignItems="flex-start"
          pl={1}
          mt={35}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                {this.state.showEdit == true || this.state.showadd == true ? 
                    <Fragment>
            <TableContainer  style={{width:1500 ,maxHeight : 500,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns}
                 data={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1,paging: true}}
                 title ="重發"
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
                 title ="重發"
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
          pl={1}
          mt={55}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                {this.state.showEdit == true || this.state.showadd == true ? 
                    <Fragment>
            <TableContainer  style={{width:1200 ,maxHeight : 500,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns2}
                 data={this.state.IDdata3}
                 options ={{search:false,actionsColumnIndex:-1,paging: true}}
                 title ="重回"
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
            <TableContainer style={{maxHeight : 500 ,width:1200,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="重回"
                 columns={Columns2}
                 data ={this.state.IDdata3}
                 options ={{search:false,actionsColumnIndex:-1,paging: true}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
            <Box
          display="flex"
          alignItems="flex-start"
          pl={160}
          mt={-5}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              <Box pl={2}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">未回數量 :</Typography>
          </ThemeProvider>
          <Box >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">已回數量 :</Typography>
          </ThemeProvider>
          <Box >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">總需發打印數量 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          </Box>
          </Box>
          <Box
         display="flex"
         alignItems="flex-start"
         pl={173}
         mt={-13}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
             <Box >
          <TextField
           name="unreturnamount"
           value={this.state.unreturnamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
            <Box >
          <TextField
           name="returnedamount"
           value={this.state.returnedamount}
           onChange ={this.handleChange}
           style={{width:'50%'}}
           />
           <Box pl={8}>
          <TextField
           name="totalprintamount"
           value={this.state.totalprintamount}
           onChange ={this.handleChange}
           style={{width:'70%'}}
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
            <TableContainer  style={{width:1200 ,maxHeight : 500,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns2}
                 data={this.state.IDdata4}
                 options ={{search:false,actionsColumnIndex:-1,paging: true}}
                 title ="重回"
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
            <TableContainer style={{maxHeight : 500 ,width:1200,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="重回"
                 columns={Columns2}
                 data ={this.state.IDdata4}
                 options ={{search:false,actionsColumnIndex:-1,paging: true}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
            <Box
         display="flex"
         alignItems="flex-start"
         pl={170}
         mt={-60}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
          <Box mt={1}>
         <button 
    disabled={
     !(this.state.showEdit && !this.state.showadd)
  &&!(!this.state.showEdit && this.state.showadd)
            } 
    onClick={this.handlesave}>
    儲存
    </button>
         </Box>
         <Box pl={1} mt={1}>
    <button disabled={this.state.showadd == true ||this.state.showEdit == true} onClick={this.handleshowEdit}>
       {this.state.buttonText}
    </button>
    </Box>
    <Box mt={1} pl={1}>
    <button disabled={!(this.state.showEdit && !this.state.showadd)
  &&!(!this.state.showEdit && this.state.showadd)
          } onClick={this.handlecancel}>取消</button>
    </Box>
         </Box>
                </div>
                )
        }
}
export default DataWorkMarking