import React, { Component } from 'react';
import axios from "axios";
import Box from '@material-ui/core/Box';
import Table from "./Table3";
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
import { FastfoodOutlined, FormatListNumbered } from '@material-ui/icons';
import Dropdown from 'react-multilevel-dropdown';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//進貨-->退回//
class Datareturnback extends Component{
     constructor(props){
         super(props);
         this.state={
           data:[],
           IDdata:[],
           listvendor:[],
           listbuynumber:[],
           listworknumber:[],
           listproductnumber:[],
           listPCBNo:[],
           listbollowoutnumber:[],
           modal:null,

           canceledit:false,
           showadd:false,
           showEdit:false,
           buttonadd:"新增",
           buttonText:"修改",
           buttonsave:"儲存",

           id:"",
           returndate:{
               date:""
           },
           person:"",
           persondate:{
               date:""
           },
           storagevendor:"",
           vendor:"",
           description:"",
           Dataview:{
               buynumber:"",
               bollowoutnumber:"",
               worknumber:"",
               productnumber:"",
               PCBNo:"",
               storageclass:"",
               changepackpass:"",
               changepackfail:"",
               changewaittest:"",
               backproductpass:"",
               backproductfail:"",
               backproductwaittest:"",
               enterandreturnpass:"",
               enterandreturnfail:"",
               enterandreturnwaittest:"",
               description1:"",
               storageconfirm:false,
               confirmdate:""
           }
         }
     }
     handlecancel=()=>{
        this.state.data.map((item,index)=>{
            if(this.state.id === item.id){
                this.setState({
                    IDdata:item.data,
                    returndate:item.returndate,
                    person:item.person,
                    persondate:item.persondate,
                    vendor:item.vendor,
                    description:item.description,
                })
            }
            return true;
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
     handleInputChange=(e,newInputValue)=>{
        if(this.state.showadd ==true || this.state.showEdit ==true){
        this.setState({
         vendor:newInputValue
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
                    returndate:item.returndate,
                    person:item.person,
                    persondate:item.persondate,
                    vendor:item.vendor,
                    description:item.description,
                })
            }
            return true;
        })
     }
      handleshow=()=>{
          console.log(this.state.listvendor)
      }
     componentDidMount(){
          this.getOption();
          this.getlistbuynumber();
          this.getlistvendor();
          this.getlistbollowoutnumber();
          this.getlistproductnumber();
          this.getlistworknumber();
          this.getlistPCBNo();
     }
     getOption=()=>{
         axios.get("/posts")
         .then(res=>{
               this.setState({
                   data:res.data
               })
         })
     }
     getlistbuynumber =()=>{
         axios.get("/listbuynumber")
         .then(res=>{
             this.setState({
                listbuynumber:res.data
             })
         })
     }
     getlistvendor=()=>{
         axios.get("/listvendor")
         .then(res=>{
             this.setState({
                 listvendor:res.data
             })
         })
     }
    getlistworknumber=()=>{
        axios.get("/listworknumber")
        .then(res=>{
            this.setState({
                listworknumber:res.data
            })
        })
    }
    getlistproductnumber=()=>{
        axios.get("/listproductnumber")
        .then(res=>{
            this.setState({
                listproductnumber:res.data
            })
        })
    }
    getlistPCBNo=()=>{
        axios.get("/listPCBNo")
         .then(res=>{
             this.setState({
                listPCBNo:res.data
             })
         })
    }
    getlistbollowoutnumber=()=>{
        axios.get("/listbollowoutnumber")
         .then(res=>{
             this.setState({
                listbollowoutnumber:res.data
             })
         })
    }
     Delete =()=>{
        axios.delete(`posts/${this.state.id}`,{
            id:this.state.id,
            returndate:this.state.returndate,
            person:this.state.person,
            persondate:this.state.persondate,
            storagevendor:this.state.storagevendor,
            vendor:this.state.vendor,
            description:this.state.description,
           data :
           this.state.IDdata,
        })
        this.setState({
            id:"",
            returndate:"",
            person:"",
            persondate:"",
            storagevendor:"",
            vendor:"",
            description:"",
             IDdata:[],
        })
    }
    PUT=()=>{
       axios.put(`posts/${this.state.id}`,
       {
        id:this.state.id,
        returndate:this.state.returndate,
        person:this.state.person,
        persondate:this.state.persondate,
        storagevendor:this.state.storagevendor,
        vendor:this.state.vendor,
        description:this.state.description,
           data :
           this.state.IDdata,
      }
    )
    }
    POST=()=>{//此為直接傳送至jsondata的動作
         axios.post("/posts",
         {
            id:this.state.id,
            returndate:this.state.returndate,
            person:this.state.person,
            persondate:this.state.persondate,
            storagevendor:this.state.storagevendor,
            vendor:this.state.vendor,
            description:this.state.description,
           data :
           this.state.IDdata,
        })
     }
     ADD=()=>{
         this.setState({
            id:"",
            returndate:"",
            person:"",
            persondate:"",
            storagevendor:"",
            vendor:"",
            description:"",
           IDdata:[],
           showadd:!this.state.showadd
         })
       
     }
     clear =(e)=>{
        e.target.value="";
    }
    handleChangedate=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                persondate:e.target.value
            })
        }
    }
    handleChangedatetime=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                returndate:e.target.value
            })
        }
    }
     render(){
        const axiosbuynumber = this.state.listbuynumber.map((item,index)=>{
            return <select value={this.state.buynumber}><option key={index} value={item.vendor}>{item.buynumber}</option></select>
        })
        const axiosworknumber = this.state.listworknumber.map((item,index)=>{
            return <select value={this.state.worknumber}>
            <option key={index} value={item.worknumber}>
            {item.worknumber}
            </option>
            </select>
        })
        const axiosproductnumber=this.state.listproductnumber.map((item,index)=>{
            return <select value={this.state.productnumber}>
            <option key={index} value={item.productnumber}>
            {item.productnumber}
            </option>
            </select>
        })
        const axiosPCBNo=this.state.listPCBNo.map((item,index)=>{
            return <select value={this.state.PCBNo}>
            <option key={index} value={item.PCBNo}>
            {item.PCBNo}
            </option>
            </select>
        })
        const axiosbollowoutnumber = this.state.listbollowoutnumber.map((item,index)=>{
            return <select value={this.state.bollowoutnumber}>
            <option key={index} value={item.bollowoutnumber}>
            {item.bollowoutnumber}
            </option>
            </select>
        })
         const tableColumns=[
             {
                 title:"採購單號",
                 field:"buynumber",
                 editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="buynumber"
                    value={value}
                    placeholder={this.state.buynumber}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="buynumber">
                        {axiosbuynumber}
                    </datalist>
                    </div>
                 )
             },{
                 title:"借出單號",
                 field:"bollowoutnumber",
                 editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="bollowoutnumber"
                    value={value}
                    placeholder={this.state.bollowoutnumber}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="bollowoutnumber">
                        {axiosbollowoutnumber}
                    </datalist>
                    </div>
                 )
             },{
                 title:"工單編號",
                 field:"worknumber",
                 editComponent:
                 ({value,onChange})=>(
                    <div>
                    <input 
                    list ="worknumber"
                    value={value}
                    placeholder={this.state.worknumber}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="worknumber">
                        {axiosworknumber}
                    </datalist>
                    </div>
                 )
             },{
                 title:"產品代號",
                 field:"productnumber",
                 editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="productnumber"
                    value={value}
                    placeholder={this.state.productnumber}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="productnumber">
                        {axiosproductnumber}
                    </datalist>
                    </div>
                )
             },{
                 title:"PCB No",
                 field:"PCBNo",
                 editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="PCBNo"
                    value={value}
                    placeholder={this.state.PCBNo}
                    onChange={(e)=>onChange(e.target.value)}
                    onFocus={this.clear}
                    onClick={this.clear}
                    />
                    <datalist id="PCBNo">
                        {axiosPCBNo}
                    </datalist>
                    </div>
                )
             },{
                 title:"倉別",
                 field:"storageclass",
             },{
                 title:"換貨(Pass)",
                 field:"changepackpass",
             },{
                 title:"換貨(Fail)",
                 field:"changepackfail",
             },{
                 title:"換貨(待測)",
                 field:"changewaittest",
             },{
                 title:"備品(Pass)",
                 field:"backproductpass",
             },{
                 title:"備品(Fail)",
                 field:"backproductfail"
              },{
                  title:"備品(待測)",
                  field:"backproductwaittest"
              },{
                  title:"進退(Pass)",
                  field:"enterandreturnpass"
              },{
                  title:"進退(Fail)",
                  field:"enterandreturnfail"
              },{
                  title:"進退(待測)",
                  field:"enterandreturnwaittest"
              },{
                  title:"備註",
                  field:"description1"
              },{
                  title:"倉管確認",
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
                  title:"確認時間",
                  field:"confirmdate",
                  editComponent:
                  (({value,onChange})=>(
                    <TextField
                    name="confirmdate"
                    floatingLabelText="確認時間"
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
         return(
            <div className="content">
            <Modal isOpen={this.state.modal} toggle={this.handleshowEdit} >
            <ModalHeader>錯誤</ModalHeader>
            <ModalBody>
            因倉管已確認
             故無法修改
            </ModalBody>
          <ModalFooter>
          <div></div>
          </ModalFooter>
         </Modal>
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
         mt={-7}
         bgcolor="background.paper"
         css={{ height: 100 }}
         > 
         <Box pl={30}>
              退回單號 : 
          </Box> 
         <Box pl={1}>
         <TextField
           name="id"
           disabled={this.state.showEdit}
           value={this.state.id}
           onChange={this.handleChange}
           style ={{width:'75%'}}
         />
         </Box>
         <Box pl={24} pt={3}>
           廠商 :
         </Box>
         <Box pl={1} pt={-1}>
          <Autocomplete
                  freeSolo
                  inputValue={this.state.vendor}
                  onInputChange={this.handleInputChange}
                  options={this.state.listvendor}
                  filterOptions={(options, state) => options}
                  getOptionLabel={(option) => option.vendor}
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
            退回日期 : 
          </Box>
          <Box pl={1}>
          <TextField
        name="returndate"
        floatingLabelText="填表時間"
        InputLabelProps={{ shrink: true, required: true }}
        type="date"
        onChange={this.handleChangedatetime}
        floatingLabelFixed
        style={{ width: '95%' }}
        value={this.state.returndate.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
          </Box>
          <Box  pl={29} pt={5}>
            備註 :
          </Box>
          <Box pl={1} pt={5}>
          <textarea
            name="description"
            className = "form-control"
            value={this.state.description}
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
         <Box pl={27}>
           開單人/日期 : 
         </Box>
           <Box pl={1}>
           <TextField
              name="person"
              value={this.state.person}
              onChange={this.handleChange}
              style ={{width: '65%'}}
           />
           <Box>
           <TextField
        name="persondate"
        floatingLabelText="填表時間"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangedate}
        floatingLabelFixed
        style={{ width: '100%' }}
        value={this.state.persondate.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
      </Box>
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
    </Box>
         {this.state.showEdit == true || this.state.showadd == true ? 
            <Fragment>
                <Table
                 columns={tableColumns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="退回明細"
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
                 title ="退回明細"
                 />
            </Fragment>}
             </div>
         )
     }
     
}
export default Datareturnback