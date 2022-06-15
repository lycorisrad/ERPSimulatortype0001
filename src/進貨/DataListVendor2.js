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
import { FastfoodOutlined, FormatListNumbered } from '@material-ui/icons';
import Dropdown from 'react-multilevel-dropdown';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//進貨-->廠商//
class  DataListVendor2 extends Component{
    constructor(props){
        super(props);

        this.state={
            data:[],
            modal:null,

            confirmdelete:false,
           canceledit:false,
           showadd:false,
           showEdit:false,
           buttonadd:"新增",
           buttonText:"修改",
           buttonsave:"儲存",
            DataView:{
                id : "",
                vendorname:"",
                contactperson:"",
                commonnumber:"",
                vendoraddress:"",
                phonenumber:"",
                fax:"",
                paymethod:"",
            }
           
        }
    }
    handledelete=()=>{
        this.setState({
            confirmdelete:!this.state.confirmdelete
        })
     }
    handlecancel=()=>{
        this.state.data.map((item,index)=>{
            if(this.state.id === item.id){
                this.setState({
                id:item.id,
                vendorname:item.vendorname,
                contactperson:item.contactperson,
                commonnumber:item.commonnumber,
                vendoraddress:item.vendoraddress,
                phonenumber:item.phonenumber,
                fax:item.fax,
                paymethod:item.paymethod,
                })
            }
        })
        this.setState({
            showEdit:false,
            showadd:false
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
    getOption(){
        axios.get("/posts")
        .then(res=>{
            this.setState({
                data:res.data
            })
        })
    }
   
     handleChangeID=(e,values)=>{
         this.setState({
             id:values.id
         })
         this.state.data.map((item,index)=>{
             if(values.id === item.id){
                 this.setState({
                     vendorname:item.vendorname,
                     contactperson:item.contactperson,
                     commonnumber:item.commonnumber,
                     vendoraddress:item.vendoraddress,
                     phonenumber:item.phonenumber,
                     fax : item.fax,
                     paymethod:item.paymethod,
                 })
             }
             return true;
         })
     }
     Delete =()=>{
        axios.delete(`posts/${this.state.id}`,{
            vendorname:this.state.vendorname,
            contactperson:this.state.contactperson,
            commonnumber:this.state.commonnumber,
            vendoraddress:this.state.vendoraddress,
            phonenumber:this.state.phonenumber,
            fax : this.state.fax,
            paymethod:this.state.paymethod,
        })
        this.setState({
            confirmdelete:!this.state.confirmdelete,
            id : "",
                vendorname:"",
                contactperson:"",
                commonnumber:"",
                vendoraddress:"",
                phonenumber:"",
                fax:"",
                paymethod:"",
        })
    }
    PUT=()=>{
       axios.put(`posts/${this.state.id}`,
       {
        id:this.state.id,
        vendorname:this.state.vendorname,
        contactperson:this.state.contactperson,
        commonnumber:this.state.commonnumber,
        vendoraddress:this.state.vendoraddress,
        phonenumber:this.state.phonenumber,
        fax : this.state.fax,
        paymethod:this.state.paymethod,
      }
    )
    }
    POST=()=>{//此為直接傳送至jsondata的動作
         axios.post("/posts",
         {
            id:this.state.id,
            vendorname:this.state.vendorname,
            contactperson:this.state.contactperson,
            commonnumber:this.state.commonnumber,
            vendoraddress:this.state.vendoraddress,
            phonenumber:this.state.phonenumber,
            fax : this.state.fax,
            paymethod:this.state.paymethod,
        })
     }
     ADD=()=>{
         this.setState({
            id : "",
            vendorname:"",
            contactperson:"",
            commonnumber:"",
            vendoraddress:"",
            phonenumber:"",
            fax:"",
            paymethod:"",
            showEdit:!this.state.showadd
         })
     }
    componentDidMount(){
        this.getOption();
    }
    clear =(e)=>{
        e.target.value="";
    }
    render(){
    
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
         <Modal isOpen={this.state.confirmdelete} toggle={this.handledelete} >
            <ModalHeader>錯誤</ModalHeader>
            <ModalBody>
            確定刪除這筆資料嗎?
            </ModalBody>
          <ModalFooter>
          <div>
           <button onClick={this.Delete}>確定</button>
           <button onClick={this.handledelete}>取消</button>
          </div>
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
       <Box mt={2} pl={1}>
       請輸入欲查詢的單號 : 
       </Box>
       <Box pl={1}>
       <Autocomplete
            disabled={this.state.showadd || this.state.showEdit}
            options={this.state.data}
            value ={this.state.id}
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
            )}
           />
       </Box>
</Box>
            <Box
display="flex"
alignItems="flex-start"
p={1}
m={1}
bgcolor="background.paper"
css={{ height: 100 }}
> 
     <Box>
               Vendor代號
               <Box>
               <TextField
               name="id"
               variant="outlined"
               disabled={this.state.showEdit}
               value={this.state.id}
               style ={{width: '75%'}}
               onChange={this.handleChange}
           />
           </Box>
</Box> 
     <Box> 
               Vendor名稱
               <Box >
               <TextField
               name="vendorname"
               variant="outlined"
               value={this.state.vendorname}
               style ={{width: '75%'}}
               onChange={this.handleChange}
           />
             </Box>
               </Box>     
          <Box pl={-2}> 
               聯絡人
               <Box >
               <TextField
               name="contactperson"
               variant="outlined"
               value={this.state.contactperson}
               style ={{width: '75%'}}
               onChange={this.handleChange}
              />
              </Box>
               </Box>    
           <Box pl={-2}>
               統一編號
               <Box>
               <TextField
               name="commonnumber"
               variant="outlined"
               value={this.state.commonnumber}
               style ={{width: '75%'}}
               onChange={this.handleChange}
           />
           </Box>
               </Box>
             </Box>
             <Box
display="flex"
alignItems="flex-start"
p={1}
m={1}
bgcolor="background.paper"
css={{ height: 100 }}
> 
             <Box >
             Vendor地址
             <TextField
               name="vendoraddress"
               variant="outlined"
               value={this.state.vendoraddress}
               style ={{width: '250%'}}
               onChange={this.handleChange}
           />
             </Box>   
          </Box>
          <Box
display="flex"
alignItems="flex-start"
p={1}
m={1}
bgcolor="background.paper"
css={{ height: 100 }}
> 
          <Box>
           電話
           <Box>
           <TextField
               name="phonenumber"
               variant="outlined"
               value={this.state.phonenumber}
               style ={{width: '75%'}}
               onChange={this.handleChange}
           />
           </Box>
           </Box>
          <Box pl={1}>
           傳真
           <Box>
           <TextField
               name="fax"
               variant="outlined"
               value={this.state.fax}
               onChange={this.handleChange}
               style ={{width: '75%'}}
           />
           </Box>
           </Box>
           
         <Box pl={1}>
           付款方式
           <Box>
           <TextField
               name="paymethod"
               variant="outlined"
               value={this.state.paymethod}
               onChange={this.handleChange}
               style ={{width: '75%'}}
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
   <button disabled={this.state.showEdit == true || this.state.showadd == true} onClick={this.ADD}>
       {this.state.buttonadd}
   </button>
    </Box>
    <Box pl={2}>
    <button disabled={this.state.showadd == true || this.state.showEdit == true} onClick={this.handleshowEdit}>
       {this.state.buttonText}
    </button>
    </Box>
    <Box pl={2}>
     <button onClick={this.handledelete}>刪除</button>
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
export default DataListVendor2