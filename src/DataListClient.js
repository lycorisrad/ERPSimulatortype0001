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
             askfortransfervendor:null,
             askfortransfervendor_yes:null,
             askfordeletecustomer:null,
             askfordeletecustomer_yes:null,

             add_btn_enabled: false,
             del_btn_enabled:true,
             save_btn_enabled:true,
             id_btn_enabled:false,
             edit_btn_enabled:false,
             Command24:true,

             confirmdelete:false,
             canceledit:false,
             showadd:false,
             showEdit:false,
             buttonadd:"新增",
             buttonText:"修改",
             buttonsave:"儲存",

         DataView:{
            id:"",
            customer_no:"",
            customer_name:"",
            contact_people:"",
            uniform_no:"",
            fax:"",
            tel:"",
            customer_address:"",
            payment:"",
            ship_address:"",
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
                    customer_no:item.id,
                    customer_name:item.customer_name,
                    contact_people:item.contact_people,
                    uniform_no:item.uniform_no,
                    fax:item.fax,
                    tel:item.tel,
                    customer_address:item.customer_address,
                    payment:item.payment,
                    ship_address:item.ship_address,
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
                    customer_name:item.customer_name,
                    contact_people:item.contact_people,
                    uniform_no:item.uniform_no,
                    fax:item.fax,
                    tel:item.tel,
                    customer_address:item.customer_address,
                    payment:item.payment,
                    ship_address:item.ship_address,
                })
            }
         
        })
        this.setState({
            showEdit:false,
            showadd:false
        })
     }
     handlesave=()=>{
         this.setState({
             showadd:false,
             showEdit:false,

             add_btn_enabled:true,
             id_btn_enabled:true,
             save_btn_enabled:false,
             del_btn_enabled:true,
             edit_btn_enabled:true,
             
         })
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
            this.setState({
                showEdit:true,
                id_btn_enabled:false,
                save_btn_enabled:true,
                del_btn_enabled:true,
                edit_btn_enabled:false,
                //Command24_enabled:false,
            })
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
        if((this.state.showadd === true && (this.state.customer_no !== null)) || this.state.customer_no === ""){
            this.setState({
                showadd:false
            })
        }
        else if(this.state.showadd === true){
            this.setState({
                showadd: false,
                showEdit: false,
            })
            /*
             更新表單
               DoCmd.SetWarnings False
               DeleteSQL = "DELETE FROM dbo_customer1 WHERE [seq] = " & seq.value
               DoCmd.RunSQL DeleteSQL
               DoCmd.SetWarnings True
               all_locked
            */
        }
        else if(this.state.showEdit === true){
               this.setState({
                   showEdit : false
               })
               /*
                If Me.Dirty = True Then
                Me.Undo
               */
        }
        else {
            this.setState({
                askfordeletecustomer:!this.state.askfordeletecustomer
            })
            if(this.state.askfordeletecustomer_yes === true){
                /*
            DoCmd.SetWarnings False
            DeleteSQL = "DELETE FROM dbo_customer1 WHERE [customer_no] = '" & customer_no.value & "'"
            DoCmd.RunSQL DeleteSQL
            DoCmd.SetWarnings True
            all_locked
                */
            }
        }
        this.setState({
            id_btn_enabled:true,
            add_btn_enabled:true,
            save_btn_enabled:false,
            del_btn_enabled:true,
            edit_btn_enabled:true,

        })
        axios.delete(`posts/${this.state.id}`,{
            id:this.state.id,
            customer_name:this.state.customer_name,
            contact_people:this.state.contact_people,
            uniform_no:this.state.uniform_no,
            fax:this.state.fax,
            tel:this.state.tel,
            customer_address:this.state.customer_address,
            payment:this.state.payment,
            ship_address:this.state.ship_address,
          
        })
        this.setState({
            confirmdelete:!this.state.confirmdelete,
            id:"",
            customer_name:"",
            contact_people:"",
            uniform_no:"",
            fax:"",
            tel:"",
            customer_address:"",
            payment:"",
            ship_address:"",
        })
    }
    
    PUT=()=>{
       axios.put(`posts/${this.state.id}`,
       {
        id:this.state.id,
            customer_name:this.state.customer_name,
            contact_people:this.state.contact_people,
            uniform_no:this.state.uniform_no,
            fax:this.state.fax,
            tel:this.state.tel,
            customer_address:this.state.customer_address,
            payment:this.state.payment,
            ship_address:this.state.ship_address,
      }
    )
    }
    POST=()=>{//此為直接傳送至jsondata的動作
         axios.post("/posts",
         {
            id:this.state.id,
            customer_name:this.state.customer_name,
            contact_people:this.state.contact_people,
            uniform_no:this.state.uniform_no,
            fax:this.state.fax,
            tel:this.state.tel,
            customer_address:this.state.customer_address,
            payment:this.state.payment,
            ship_address:this.state.ship_address,
        })
     }
     ADD=()=>{
         this.setState({
            id:"",
            customer_name:"",
            contact_people:"",
            uniform_no:"",
            fax:"",
            tel:"",
            customer_address:"",
            payment:"",
            ship_address:"",
            showadd:!this.state.showadd,
            add_btn_enabled: false,
            del_btn_enabled:true,
            save_btn_enabled:true,
            id_btn_enabled:false,
            edit_btn_enabled:false,
         })
       
     }
     customer_no_AfterUpdate =()=>{
         this.setState({
            customer_no : this.state.customer_no.toUpperCase()     
        })
        const temp_customer_no = this.state.customer_no
        if(this.state.showadd === true){
            /**Set temp = CurrentDb.OpenRecordset("SELECT dbo_customer1.customer_no From dbo_customer1 WHERE dbo_customer1.customer_no = '" & customer_no.value & "'")
    If temp.RecordCount > 0 Then
        MsgBox ("此客戶代號已存在，請選擇此客戶代號！！")
        
        Form_dbo_customer.del_btn_Click
    
        Dim rs As Object

        Set rs = Me.Recordset.Clone
        rs.FindFirst "[customer_no] = '" & temp_customer_no & "'"
        Me.Bookmark = rs.Bookmark
    End If
    temp.Close
    */
        }
     }
     askfordeletecustomer=()=>{
         this.setState({
             askfordeletecustomer:!this.state.askfordeletecustomer
         })
     }
     askfordeletecustomer_yes=()=>{
         this.setState({
             askfordeletecustomer_yes:!this.state.askfordeletecustomer_yes
         })
     }
     askfortransfervendor=()=>{
         this.setState({
             askfortransfervendor:!this.state.askfortransfervendor
         })
     }
     askfortransfervendor_yes=()=>{
         this.setState({
             askfortransfervendor_yes:!this.state.askfortransfervendor_yes
         })
     }
     Command24=()=>{
         if(this.state.askfortransfervendor_yes === true){
              /*
               DoCmd.SetWarnings False
    insertsql = "INSERT INTO dbo_vendor1 (vendor_no,vendor_name,contact_people,uniform_no,vendor_address,tel,fax,payment) VALUES ("
    insertsql = insertsql & "'" & customer_no.value & "',"
    insertsql = insertsql & "'" & customer_name.value & "',"
    insertsql = insertsql & "'" & contact_people.value & "',"
    insertsql = insertsql & "'" & uniform_no.value & "',"
    insertsql = insertsql & "'" & customer_address.value & "',"
    insertsql = insertsql & "'" & tel.value & "',"
    insertsql = insertsql & "'" & fax.value & "',"
    insertsql = insertsql & "'" & payment.value & "')"
    DoCmd.RunSQL insertsql
    DoCmd.SetWarnings True
              */
         }

     }
     closeallmodal=()=>{
         this.setState({
             askfortransfervendor : false
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
         <Modal isOpen={this.state.askfortransfervendor} toggle={this.askfortransfervendor} >
            <ModalHeader>錯誤</ModalHeader>
            <ModalBody>
            是否轉為廠商資料?
            </ModalBody>
          <ModalFooter>
          <div>
           <button onClick={this.askfortransfervendor_yes}>確定</button>
           <button onClick={this.closeallmodal}>取消</button>
          </div>
          </ModalFooter>
         </Modal>
         <Modal isOpen={this.state.askfortransfervendor} toggle={this.Delete} >
            <ModalHeader>錯誤</ModalHeader>
            <ModalBody>
            是否刪除[客戶代號] : {this.state.customer_no} ，[客戶名稱]： {this.state.customer_name} 的相關記錄？
            </ModalBody>
          <ModalFooter>
          <div>
           <button onClick={this.askfortransfervendor_yes}>刪除</button>
           <button onClick={this.closeallmodal}>取消</button>
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
           <Box pl= {15}>
            <button onClick={this.askfortransfervendor}>轉單</button>
           </Box>
           <Box pl={1}>
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
                     name="customer_name"
                     variant="outlined"
                     onChange={this.handleChange} 
                     value={this.state.customer_name}
                     style ={{width: '75%'}}
                 />
                 </Box>
                 </Box>
                   <Box pl={-2}>
                     聯絡人
                     <Box>
                     <TextField
                     name="contact_people"
                     variant="outlined"
                     onChange={this.handleChange} 
                     value={this.state.contact_people}
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
                     name="uniform_no"
                     variant="outlined"
                     onChange={this.handleChange} 
                     value={this.state.uniform_no}
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
                     name="tel"
                     variant="outlined"
                     onChange={this.handleChange} 
                     value={this.state.tel}
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
                     name="customer_address"
                     variant="outlined"
                     onChange={this.handleChange} 
                     value={this.state.customer_address}
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
            name="ship_address"
            className = "form-control"
            value={this.state.ship_address}
            onChange={this.handleChange} 
          />
                 </Box>
                 </Box>
    
             </div>
         )
     }
}
export default DataListClient