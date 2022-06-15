import React, { Component } from 'react';
import axios from "./axios";
import Box from '@material-ui/core/Box';
import Table from './Table3';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";
import classnames from "classnames";
import { Fragment } from "react";
import{Container, Row, Col, Jumbotron, Button, Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText, Badge, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Formik,Input,Menu } from 'antd';
import { PropTypes } from 'prop-types';

import {
    MenuItem,
    TextField
  } from "@material-ui/core";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Checkbox from "@material-ui/core/Checkbox";
  import InputAdornment from "@material-ui/core/InputAdornment";
import { classes } from 'istanbul-lib-coverage';
import { MuiThemeProvider } from 'material-ui/styles';
import { ModalDialog } from 'react-bootstrap';
import { AutoComplete } from 'material-ui';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
class DataListClient extends Component{
     constructor(props){
         super(props);
         this.state={
             data:[],
             listpayment:[],
             modal:null,
         
             confirmdelete:false,
             canceledit:false,
             showadd:false,
             showEdit:false,
             buttonadd:"新增",
             buttonText:"修改",
             buttonsave:"儲存",
         DataView:{
            id:"",
            vendorname:"",
            contactperson:"",
            commonnumber:"",
            fax:"",
            phonenumber:"",
            address:"",
            payment:"",
            shipaddress:"",
         }

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
    getlistpayment=()=>{
        axios.get("/listpayment")
        .then(res=>{
            this.setState({
                listpayment:res.data
            })
        })
    }
     handleChangeID=(e,values)=>{
         this.setState({
             id:values.id
         })
         this.state.data.map((item)=>{
             if(values.id === item.id){
                 this.setState({
                    id:item.id,
                    vendorname:item.vendorname,
                    contactperson:item.contactperson,
                    commonnumber:item.commonnumber,
                    fax:item.fax,
                    phonenumber:item.phonenumber,
                    address:item.address,
                    payment:item.payment,
                    shipaddress:item.shipaddress,
                 })
             }
             return true;
         })
     }
     componentDidMount(){
         this.getOption();
         this.getlistpayment();
     }
     handlecancel=()=>{
        this.state.data.map((item,index)=>{
            if(this.state.id === item.id){
                this.setState({
                    id:item.id,
                    vendorname:item.vendorname,
                    contactperson:item.contactperson,
                    commonnumber:item.commonnumber,
                    fax:item.fax,
                    phonenumber:item.phonenumber,
                    address:item.address,
                    payment:item.payment,
                    shipaddress:item.shipaddress,
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
            if(this.state.storageconfirm === true){
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
             payment:newInputValue
           })
       }
       }
       handledelete=()=>{
        this.setState({
            confirmdelete:!this.state.confirmdelete
        })
     }
     Delete =()=>{
        axios.delete(`posts/${this.state.id}`,{
            id:this.state.id,
            vendorname:this.state.vendorname,
            contactperson:this.state.contactperson,
            commonnumber:this.state.commonnumber,
            fax:this.state.fax,
            phonenumber:this.state.phonenumber,
            address:this.state.address,
            payment:this.state.payment,
            shipaddress:this.state.shipaddress,
          
        })
        this.setState({
            confirmdelete:!this.state.confirmdelete,
            id:"",
            vendorname:"",
            contactperson:"",
            commonnumber:"",
            fax:"",
            phonenumber:"",
            address:"",
            payment:"",
            shipaddress:"",
        })
    }
    PUT=()=>{
       axios.put(`posts/${this.state.id}`,
       {
        id:this.state.id,
            vendorname:this.state.vendorname,
            contactperson:this.state.contactperson,
            commonnumber:this.state.commonnumber,
            fax:this.state.fax,
            phonenumber:this.state.phonenumber,
            address:this.state.address,
            payment:this.state.payment,
            shipaddress:this.state.shipaddress,
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
            fax:this.state.fax,
            phonenumber:this.state.phonenumber,
            address:this.state.address,
            payment:this.state.payment,
            shipaddress:this.state.shipaddress,
        })
     }
     ADD=()=>{
         this.setState({
            id:"",
            vendorname:"",
            contactperson:"",
            commonnumber:"",
            fax:"",
            phonenumber:"",
            address:"",
            payment:"",
            shipaddress:"",
            showadd:!this.state.showadd
         })
       
     }
     render(){
         return (
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
           <Box pl={1}>
            請選擇欲查詢客戶代號 :
           </Box>
           <Box pl={1} mt={-2}>
           <Autocomplete
           freeSolo
            disabled={this.state.showadd || this.state.showEdit}
            options={this.state.data}
            value ={this.state.id}
            getOptionLabel={(option) => option.id}
            style={{ width: 150 }}
            inputValue={this.state.id}
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
           <Box pl={15}>
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
         <Box
display="flex"
alignItems="flex-start"
pl={1}
mt={-3}
bgcolor="background.paper"
css={{ height: 100 }}
> 
         <Box >
                      客戶代號
                      <Box>
                     <TextField
                     name="id"
                     variant="outlined"
                     value={this.state.id}
                     onChange={this.handleChange} 
                     style ={{width: '75%'}}
                 />
                 </Box>
                 </Box>
                
                 <Box>
                     客戶名稱
                     <Box>
                     <TextField
                     name="vendorname"
                     variant="outlined"
                     onChange={this.handleChange} 
                     value={this.state.vendorname}
                     style ={{width: '75%'}}
                 />
                 </Box>
                 </Box>
                   <Box pl={-2}>
                     聯絡人
                     <Box>
                     <TextField
                     name="contactperson"
                     variant="outlined"
                     onChange={this.handleChange} 
                     value={this.state.contactperson}
                     style ={{width: '75%'}}
                 />
                 </Box>
                   </Box>
                   </Box>
                   <Box
display="flex"
alignItems="flex-start"
pl={1}
mt={-2}
bgcolor="background.paper"
css={{ height: 100 }}
> 
                 <Box >
                     統一編號
                     <Box>
                     <TextField
                     name="commonnumber"
                     variant="outlined"
                     onChange={this.handleChange} 
                     value={this.state.commonnumber}
                     style ={{width: '75%'}}
                 />
                 </Box>
                 </Box>
                
                 <Box >
                   傳真
                   <Box>
                   <TextField
                     name="fax"
                     variant="outlined"
                     onChange={this.handleChange} 
                     value={this.state.fax}
                     style ={{width: '75%'}}
                 />
                 </Box>
                 </Box>
                 
                 <Box >
                 電話
                 <Box>
                 <TextField
                     name="phonenumber"
                     variant="outlined"
                     onChange={this.handleChange} 
                     value={this.state.phonenumber}
                     style ={{width: '75%'}}
                 />
                 </Box>
                 </Box>
               </Box>
               <Box
display="flex"
alignItems="flex-start"
pl={1}
mt={-2}
bgcolor="background.paper"
css={{ height: 100 }}
> 
                 <Box >
                地址
                <Box>
                 <TextField
                     name="address"
                     variant="outlined"
                     onChange={this.handleChange} 
                     value={this.state.address}
                     style ={{width: '275%'}}
                 />
                 </Box>
                 </Box>
              </Box>
              <Box
display="flex"
alignItems="flex-start"
p={1}
mt={-2}
bgcolor="background.paper"
css={{ height: 100 }}
> 
                <Box>
                  付款方式
                  <Box>
                  <Autocomplete
                  freeSolo
                  inputValue={this.state.payment}
                  onInputChange={this.handleInputChange}
                  options={this.state.listpayment}
                  filterOptions={(options, state) => options}
                  getOptionLabel={(option) => option.payment}
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
                </Box>
              
                 <Box pl={2}>
                 Ship address
                 <textarea
            name="shipaddress"
            className = "form-control"
            value={this.state.shipaddress}
            onChange={this.handleChange} 
          />
                 </Box>
                 </Box>
    
             </div>
         )
     }
}
export default DataListClient