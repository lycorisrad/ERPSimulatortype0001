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
import FileSaver, {saveAs} from 'file-saver';


class DataListStorageChange extends Component{
     constructor(props){
         super(props);
         this.state={
             data:[], 
             IDdata:[],
             liststorage:[],
             listproductnumber:[],
             listlevel:[],
             listPCBNO:[],
             modal:null,

           canceledit:false,
           showadd:false,
           showEdit:false,
           buttonadd:"新增",
           buttonText:"修改",
           buttonsave:"儲存",

             id:"",
             worknumber:"",
             changedate:{
                 date:"",
             },
             description:"",
             person:"",
             persondate:{
                 date:"",
             },
             titledividednumber:"",
 
             changeINIC:true,
             changeINModule:false,
             changeINPCB:false,
             changeINLoadboard:false,
             changeOUTIC:true,
             changeOUTModule:false,
             changeOUTPCB:false,
             changeOUTLoadboard:false,
             storageclass1:"",
             productnumber1:"",
             buynumber1:"",
             level1:"",
             ICQtyPass:"0",
             ICQtyFail:"0",
             ICQtyWaiting:"0",
             pcbno1:"",
             pcbPassQty:"0",
             pcbFailQty:"0",
             pcbAssembleQty:"0",
             type:"",

             DataView:{
                 storageclass:"",
                 productnumber:"",
                 buynumber:"",
                 level:"",
                 icdie:"",
                 icamountPass:"",
                 icamountFail:"",
                 icamountwaitingtest:"",
                 pcbno:"",
                 QtyPass:"",
                 QtyFail:"",
                 QtyRetest:"",
                 type1:"",
                 storageclassconfirm:"",
                 description1:"",
             }
         }
     }
     getlistlevel=()=>{
         axios.get('/listlevel')
         .then(res=>{
             this.setState({
                listlevel : res.data
             })
         })
     }
     getlistPCBNO=()=>{
         axios.get('/listPCBNO')
         .then(res=>{
             this.setState({
                listPCBNO:res.data
             })
         })
     }
     getliststorage=()=>{
         axios.get('/liststorage')
         .then(res=>{
             this.setState({
                liststorage:res.data
             })
         })
     }
     getlistproductnumber=()=>{
         axios.get('/listproductnumber')
         .then(res=>{
             this.setState({
                listproductnumber:res.data
             })
         })
     }
    
     getOption=()=>{
         axios.get('/posts')
         .then(res=>{
             this.setState({
                 data:res.data
             })
         })
     }
     componentDidMount(){
         this.getOption();
         this.getlistPCBNO();
         this.getlistlevel();
         this.getlistproductnumber();
         this.getliststorage();
     }
     handlecancel=()=>{
        this.state.data.map((item,index)=>{
            if(this.state.id === item.id){
                this.setState({
                    IDdata:item.data,
                    id:item.id,
                    worknumber:item.worknumber,
                    changedate:item.changedate,
                    description:item.description,
                    person:item.person,
                    persondate:item.persondate,
                    titledividednumber:item.titledividednumber,

                })
            }
            return true;
        })
        this.setState({
            showadd:false,
            showEdit:false
        })
     }
     handlesave=()=>{
        if(this.state.showadd === true){
            this.POST()
            this.setState({
                showadd:false,
                buttonadd:"新增"
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
         this.setState({
             id:values.id
         })
         this.state.data.map((item,index)=>{
             if(values.id === item.id){
                 this.setState({
                     IDdata:item.data,
                     id:item.id,
                     worknumber:item.worknumber,
                     changedate:item.changedate,
                     description:item.description,
                     person:item.person,
                     persondate:item.persondate,
                     titledividednumber:item.titledividednumber,

                 })
             }
             return true
         })
     }
     Delete =()=>{
        axios.delete(`posts/${this.state.id}`,{
            id:this.state.id,
            worknumber:this.state.worknumber,
            changedate:this.state.changedate,
            description:this.state.description,
            person:this.state.person,
            persondate:this.state.persondate,
            titledividednumber:this.state.titledividednumber,
           data :
           this.state.IDdata,
        })
        this.setState({
            id:"",
            worknumber:"",
            changedate:"",
            description:"",
            person:"",
            persondate:"",
            titledividednumber:"",
             IDdata:[],
        })
    }
    PUT=()=>{
       axios.put(`posts/${this.state.id}`,
       {
        id:this.state.id,
        worknumber:this.state.worknumber,
        changedate:this.state.changedate,
        description:this.state.description,
        person:this.state.person,
        persondate:this.state.persondate,
        titledividednumber:this.state.titledividednumber,
      
           data :
           this.state.IDdata,
      }
    )
    }
    POST=()=>{//此為直接傳送至jsondata的動作
         axios.post("/posts",
         {
            id:this.state.id,
            worknumber:this.state.worknumber,
            changedate:this.state.changedate,
            description:this.state.description,
            person:this.state.person,
            persondate:this.state.persondate,
            titledividednumber:this.state.titledividednumber,
          
           data :
           this.state.IDdata,
        })
     }
     ADD=()=>{
         this.setState({
            id:"",
            worknumber:"",
            changedate:"",
            description:"",
            person:"",
            persondate:"",
            titledividednumber:"",
           IDdata:[],
           showadd:!this.state.showadd
         })
       
     }
     handleclear=()=>{
         this.setState({
            id:"",
            worknumber:"",
            changedate:"",
            description:"",
            person:"",
            persondate:"",
            titledividednumber:"",
            IDdata:"",
         })
     }
     render(){
         const axiosID=this.state.data.map((item,index)=>{
             return <option value={item.id}>{item.id}</option>
         })
         const defaultProps = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '22rem', height: '3rem' },
            borderColor: 'text.primary',
          };
        
         const  tableColumns=[
             {
                 title:"倉別",
                 field:"storageclass",
             },{
                title:"產品代號",
                field:"productnumber",
             },{
                title:"採購單號",
                field:"buynumber",
             },{
                title:"等級",
                field:"level",
             },{
                title:"IC Die",
                field:"icdie",
             },{
                title:"IC 數量(Pass)",
                field:"icamountPass",
             },{
                title:"IC 數量(Fail)",
                field:"icamountFail",
             },{
                title:"IC 數量(待測)",
                field:"icamountwaitingtest",
             },{
                title:"PCB NO",
                field:"pcbno",
             },{
                title:"Q'ty Pass",
                field:"QtyPass" ,    
            },{
                title:"Q'ty Fail",
                field:"QtyFail"   
              },{
                  title:"Q'ty Retest(組拆)",
                  field:"QtyRetest"
              },{
                  title:"倉管確認",
                  field:"storageclassconfirm",
                  editComponent: 
                  (({onChange})=>(
                          <Checkbox
                          value ={this.state.storageclassconfirm}
                          checked = {this.state.storageclassconfirm}
                          name ="storageclassconfirm"
                          onChange={(e)=>onChange(e.target.checked)}/>
                  ))
              },{
                  title:"備註",
                  field:"description1"
              }
         ]
         return(
             <div>
             <Box
                display="flex"
         alignItems="flex-start"
         p={1}
         m={1}
         bgcolor="background.paper"
         css={{ height: 100 }}
             >
                 <Box pl={1}>
                 <Autocomplete
            disabled={this.state.showadd}
            options={this.state.data}
            inputValue={this.state.id}
            getOptionLabel={(option) => option.id}
            style={{ width: 150 }}
            disableClearable
            onChange={this.handleChangeID}
            renderInput={(params)=>(
               <TextField
               {...params}
              margin="normal"
              fullWidth
               />
            )
            }
           />
                 </Box>
             </Box>
             <Box
               display="flex"
               alignItems="flex-start"
               p={1}
               mt={-10}
               bgcolor="background.paper"
               css={{ height: 100 }}
              >
                  <Box pl={45}>
                      換貨單號 :
                  </Box>
                  <Box pl={1}>
                  <TextField
                   name="id"
                   value={this.state.id}
                  style={{width:'75%'}}
                  onChange={this.handleChange}
                   />
                  </Box>
                  <Box pl={15}>
                      工單單號 :
                  </Box>
                  <Box pl={1}>
                  <TextField
                   name="worknumber"
                    value={this.state.worknumber}
                    style={{width:'75%'}}
                    onChange={this.handleChange}
                  />
                  </Box>
              </Box>
              <Box
                 display="flex"
               alignItems="flex-start"
               p={1}
               mt={-10}
               bgcolor="background.paper"
               css={{ height: 100 }}
              >
                  <Box pl={45}>
                      換貨日期 :
                  </Box>
                  <Box pl={1}>
                  <TextField
                   name="changedate"
                   value={this.state.changedate}
                  style={{width:'75%'}}
                  onChange={this.handleChange}
                   />
                  </Box>
                  <Box pl={19}>
                      備註 :
                  </Box>
                  <Box pl={1}>
                  <textarea
                   name="description"
                   className = "form-control"
                   value={this.state.description}
                   onChange={this.handleChange}
                  />
                  </Box>
                  <Box pl={8}>
                     文中組拆單號
                  </Box>
              </Box>
              <Box
                 display="flex"
               alignItems="flex-start"
               p={1}
               mt={-10}
               bgcolor="background.paper"
               css={{ height: 100 }}
              >
                  <Box pl={47}>
                      開單人 :
                  </Box>
                  <Box pl={1}>
                  <TextField
                   name="person"
                   value={this.state.person}
                  style={{width:'75%'}}
                  onChange={this.handleChange}
                   />
                  </Box>
                  <Box pl={15}>
                      開單時間 :
                  </Box>
                  <Box pl={1}>
                  <TextField
                   name="persondate"
                   value={this.state.persondate}
                  style={{width:'75%'}}
                  onChange={this.handleChange}
                   />
                  </Box>
                  <Box pl={1}>
                  <TextField
                   name="titledividednumber"
                   value={this.state.titledividednumber}
                   style={{width:'75%'}}
                   onChange={this.handleChange}
                   />
                  </Box>
              </Box>
              <Box
                 display="flex"
               alignItems="flex-start"
               p={1}
               mt={-5}
               bgcolor="background.paper"
               css={{ height: 100 }}
              >
                  <Box pl={50}>
                      換入 :
                  </Box>
                  <Box pl={55}>
                      換出 :
                  </Box>
              </Box>
              <Box
                 display="flex"
               alignItems="flex-start"
               p={1}
               mt={-10}
               bgcolor="background.paper"
               css={{ height: 100 }}
              >
                  <Box 
                  pl={30} 
                  mt={-2.5} 
                  display="flex" 
                  justifyContent="center">
                    <Box pl= {2} mb={2} border={1} {...defaultProps}>
                       <FormControlLabel value={this.state.changeINIC} control={<Radio />} label="INIC" />
                      <FormControlLabel value={this.state.changeINModule} control={<Radio />} label="Module" />
                      <FormControlLabel value={this.state.changeINPCB} control={<Radio />} label="PCB" />
                      <FormControlLabel value={this.state.changeINLoadboard} control={<Radio />} label="Loadboard" />
                      
                    </Box>
                  </Box>

                  <Box 
                  pl={10} 
                  mt={-2.5} 
                  display="flex" 
                  justifyContent="center">
                    <Box pl= {2} mb={2} border={1} {...defaultProps}>
                     
                    <FormControlLabel value={this.state.changeOUTIC} control={<Radio />} label="IC" />
                      <FormControlLabel value={this.state.changeOUTModule} control={<Radio />} label="Module" />
                      <FormControlLabel value={this.state.changeOUTPCB} control={<Radio />} label="PCB" />
                      <FormControlLabel value={this.state.changeOUTLoadboard} control={<Radio />} label="Loadboard" />
                    </Box>
                  </Box>
              </Box>
              <Box
             display="flex"
             alignItems="flex-start"
            p={1}
            mt={-7}
            bgcolor="background.paper"
            css={{ height: 100 }}
            >
            <Box pl={45}>
                倉別 : 
            </Box>
            <Box pl={1}>
            <Autocomplete
                  inputValue={this.state.storageclass1}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            storageclass1:newValue.storageclass1
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          storageclass1:e.target.value
                   })
                    }
                  }}
                  options={this.state.liststorageclass1}
                   
                  getOptionLabel={(option) => option.storageclass1}
                  style={{ width: 150 }}
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
         <Box pl={50}>
                 <TextField
                   name="storageclass1"
                   value={this.state.storageclass1}
                   style={{width:'75%'}}
                   onChange={this.handleChange}
                   />
            </Box>
           </Box>
           <Box
             display="flex"
             alignItems="flex-start"
            p={1}
            mt={-7}
            bgcolor="background.paper"
            css={{ height: 100 }}
            >
            <Box pl={41}>
                產品代號 : 
            </Box>
            <Box pl={1}>
            <Autocomplete
                  inputValue={this.state.productnumber1}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            productnumber1:newValue.productnumber1
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          productnumber1:e.target.value
                   })
                    }
                  }}
                  options={this.state.listproductnumber1}
                   
                  getOptionLabel={(option) => option.productnumber1}
                  style={{ width: 150 }}
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
         <Box pl={50}>
                 <TextField
                   name="productnumber1"
                   value={this.state.productnumber1}
                   style={{width:'75%'}}
                   onChange={this.handleChange}
                   />
            </Box>
            </Box>
            <Box
             display="flex"
             alignItems="flex-start"
            p={1}
            mt={-7}
            bgcolor="background.paper"
            css={{ height: 100 }}
            >
            <Box pl={41}>
                採購單號 : 
            </Box>
            <Box pl={1}>
            <TextField
                   name="buynumber1"
                   value={this.state.buynumber1}
                   style={{width:'75%'}}
                   onChange={this.handleChange}
                   />
            </Box>
         <Box pl={29}>
                 <TextField
                   name="buynumber1"
                   value={this.statebuynumber1}
                   style={{width:'75%'}}
                   onChange={this.handleChange}
                   />
            </Box>
            </Box>
            <Box
             display="flex"
             alignItems="flex-start"
            p={1}
            mt={-7}
            bgcolor="background.paper"
            css={{ height: 100 }}
            >
            <Box pl={45}>
              等級 : 
            </Box>
            <Box pl={1}>
            <Autocomplete
                  inputValue={this.state.level1}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            level1:newValue.level1
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                            level1:e.target.value
                   })
                    }
                  }}
                  options={this.state.listlevel1}
                   
                  getOptionLabel={(option) => option.level1}
                  style={{ width: 150 }}
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
         <Box pl={51}>
                 <TextField
                   name="level1"
                   value={this.state.level1}
                   style={{width:'75%'}}
                   onChange={this.handleChange}
                   />
            </Box>
            </Box>
            <Box
             display="flex"
             alignItems="flex-start"
            p={1}
            mt={-7}
            bgcolor="background.paper"
            css={{ height: 100 }}
            >
            <Box pl={30}>
              IC Qty(Pass/Fail/待測) : 
            </Box>
            <TextField
                   name="ICQtyPass"
                   value={this.state.ICQtyPass}
                   style={{width:'3%'}}
                   onChange={this.handleChange}
                   />
                   <Box pl={1}></Box>
            <TextField
                   name="ICQtyFail"
                   value={this.state.ICQtyFail}
                   style={{width:'3%'}}
                   onChange={this.handleChange}
                   />
            <Box pl={1}>
            <TextField
                   name="ICQtyWaiting"
                   value={this.state.ICQtyWaiting}
                   style={{width:'25%'}}
                   onChange={this.handleChange}
                   />
            </Box>
            <Box pl={12}>
            </Box>
            <TextField
                   name="ICQtyPass"
                   value={this.state.ICQtyPass}
                   style={{width:'3%'}}
                   onChange={this.handleChange}
                   />
                   <Box pl={1}></Box>
            <TextField
                   name="ICQtyFail"
                   value={this.state.ICQtyFail}
                   style={{width:'3%'}}
                   onChange={this.handleChange}
                   />
            <Box pl={1}>
            <TextField
                   name="ICQtyWaiting"
                   value={this.state.ICQtyWaiting}
                   style={{width:'25%'}}
                   onChange={this.handleChange}
                   />
            </Box>
            </Box>
            <Box
             display="flex"
             alignItems="flex-start"
            p={1}
            mt={-5}
            bgcolor="background.paper"
            css={{ height: 100 }}
            >
            <Box pl={42}>
                PCB NO : 
            </Box>
            <Box pl={1}>
            <Autocomplete
                  inputValue={this.state.pcbno1}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            pcbno1:newValue.pcbno1
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          pcbno1:e.target.value
                   })
                    }
                  }}
                  options={this.state.listpcbno1}
                   
                  getOptionLabel={(option) => option.pcbno1}
                  style={{ width: 150 }}
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
         <Box pl={50}>
                 <TextField
                   name="pcbno1"
                   value={this.state.pcbno1}
                   style={{width:'75%'}}
                   onChange={this.handleChange}
                   />
            </Box>
           </Box>
           <Box
             display="flex"
             alignItems="flex-start"
            p={1}
            mt={-7}
            bgcolor="background.paper"
            css={{ height: 100 }}
            >
            <Box pl={16}>
              PCB Pass Q'ty/Fail Q'ty/Assemble Q'ty : 
            </Box>
            <TextField
                   name="pcbPassQty"
                   value={this.state.pcbPassQty}
                   style={{width:'3%'}}
                   onChange={this.handleChange}
                   />
            <Box pl={1}></Box>
            <TextField
                   name="pcbFailQty"
                   value={this.state.pcbFailQty}
                   style={{width:'3%'}}
                   onChange={this.handleChange}
                   />
            <Box pl={1}> 
            <TextField
                   name="pcbAssembleQty"
                   value={this.state.pcbAssembleQty}
                   style={{width:'25%'}}
                   onChange={this.handleChange}
                   />
            </Box>
            <Box pl={12}>
             
            </Box>
            <TextField
                   name="pcbPassQty"
                   value={this.state.pcbPassQty}
                   style={{width:'3%'}}
                   onChange={this.handleChange}
                   />
            <Box pl={1}></Box>
            <TextField
                   name="pcbFailQty"
                   value={this.state.pcbFailQty}
                   style={{width:'3%'}}
                   onChange={this.handleChange}
                   />
            <Box pl={1}> 
            <TextField
                   name="pcbAssembleQty"
                   value={this.state.pcbAssembleQty}
                   style={{width:'25%'}}
                   onChange={this.handleChange}
                   />
            </Box>
            
            </Box>
            <Box
             display="flex"
             alignItems="flex-start"
            p={1}
            mt={-7}
            bgcolor="background.paper"
            css={{ height: 100 }}
            >
            <Box pl={45}>
            type :
            </Box> 
            <Box >
            <div>
            </div>
            </Box>
            <Box pl={55}>
            <TextField
                   name="type"
                   value={this.state.type}
                   style={{width:'75%'}}
                   onChange={this.handleChange}
                   />
            </Box>
            </Box>
            <Box
         display="flex"
         alignItems="flex-start"
         pl={120}
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
    <button onClick={this.handleconsole}>檢查</button>
    <Box pl={2}>
   <button disabled={this.state.showEdit == true} onClick={this.ADD}>
       {this.state.buttonadd}
   </button>
    </Box>
    <Box pl={2}>
    <button disabled={this.state.showadd == true} onClick={this.handleshowEdit}>
       {this.state.buttonText}
    </button>
    </Box>
    <Box pl={2}>
     <button onClick={this.Delete}>刪除</button>
    </Box>
    <Box pl={2}>
    <button disabled={!(this.state.showEdit && !this.state.showadd)
  &&!(!this.state.showEdit && this.state.showadd)
          } onClick={this.handlecancel}>取消</button>
    </Box>
    <Box>
    <button onClick={this.onDownload}>下載</button>
    </Box>
    </Box>
    {this.state.showEdit == true || this.state.showadd == true ? 
            <Fragment>
                <Table
                 columns={tableColumns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="倉庫換貨記錄"
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
            </Fragment>: 
            <Fragment>
            <Table
                 columns={tableColumns}
                 data ={this.state.IDdata}
                 options ={{search: false,actionsColumnIndex:-1}}
                 title ="倉庫換貨記錄"
                 />
            </Fragment>}
             </div>
         )
     }
     
}
export default DataListStorageChange