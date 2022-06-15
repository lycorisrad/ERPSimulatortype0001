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

class DataListLoadboardDisassemble extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            IDdata:[],
            listworknumber:[],
            modal:null,

            confirmdelete:false,
            canceledit:false,
            showadd:false,
            showEdit:false,
            buttonadd:"新增",
            buttonText:"修改",
            buttonsave:"儲存",

            id:"",
            assemblenumber:"",
            worknumber:"",
            storageconfirm:false,
            applicationPerson : "",
            applicationdate:{
                date:""
            },
            storageconfirmdate:{
                date:""
            },
            productpartnumber:"",
            passamount:"",
            storageclass:"",
            failamount:"",
            retestamount:"",
            description:"",
            Dataview:{
                storageclass:"",
                productpartnumber1:"",
                buynumber:"",
                passamount:"",
                failamount:"",
                retestamount:"",
            }
        }
    }
    handlecancel=()=>{
        this.state.data.map((item,index)=>{
            if(this.state.id === item.id){
                this.setState({
                    id:item.id,
                    assemblenumber:item.assemblenumber,
                    worknumber:item.worknumber,
                    storageconfirm:item.storageconfirm,
                    applicationPerson : item.applicationPerson,
                    applicationdate:item.applicationdate,
                    storageconfirmdate:item.storageconfirmdate,
                    productpartnumber:item.productpartnumber,
                    passamount:item.passamount,
                    storageclass:item.storageclass,
                    failamount:item.failamount,
                    retestamount:item.retestamount,
                    description:item.description,
                    IDdata : item.data,
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
    handleChangeapplicationdate=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                applicationdate:e.target.value
            })
        }
    }
    handleChangestorageconfirmdate=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                storageconfirmdate:e.target.value
            })
        }
    }
    handleChecked =(e)=>{
        const name = e.target.name
        const value = e.target.checked
        if(this.state.showadd ==true || this.state.showEdit ==true){
        this.setState({
            [name] : value
        })
       }
    }
    handleInputChange=(e,newInputValue)=>{
        if(this.state.showadd ==true || this.state.showEdit ==true){
            this.setState({
                worknumber:newInputValue
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
                    assemblenumber:this.state.assemblenumber,
                    worknumber:this.state.worknumber,
                    storageconfirm:this.state.storageconfirm,
                    applicationPerson : this.state.applicationPerson,
                    applicationdate:this.state.applicationdate,
                    storageconfirmdate:this.state.storageconfirmdate,
                    productpartnumber:this.state.productpartnumber,
                    passamount:this.state.passamount,
                    storageclass:this.state.storageclass,
                    failamount:this.state.failamount,
                    retestamount:this.state.retestamount,
                    description:this.state.description,
           data :
           this.state.IDdata,
        })
        this.setState({
            confirmdelete:!this.state.confirmdelete,
                     id:"",
                    assemblenumber:"",
                    worknumber:"",
                    storageconfirm:"",
                    applicationPerson : "",
                    applicationdate:"",
                    storageconfirmdate:"",
                    productpartnumber:"",
                    passamount:"",
                    storageclass:"",
                    failamount:"",
                    retestamount:"",
                    description:"",
             IDdata:[],
        })
    }
    PUT=()=>{
       axios.put(`posts/${this.state.id}`,
       {
        id:this.state.id,
        assemblenumber:this.state.assemblenumber,
        worknumber:this.state.worknumber,
        storageconfirm:this.state.storageconfirm,
        applicationPerson : this.state.applicationPerson,
        applicationdate:this.state.applicationdate,
        storageconfirmdate:this.state.storageconfirmdate,
        productpartnumber:this.state.productpartnumber,
        passamount:this.state.passamount,
        storageclass:this.state.storageclass,
        failamount:this.state.failamount,
        retestamount:this.state.retestamount,
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
            assemblenumber:this.state.assemblenumber,
            worknumber:this.state.worknumber,
            storageconfirm:this.state.storageconfirm,
            applicationPerson : this.state.applicationPerson,
            applicationdate:this.state.applicationdate,
            storageconfirmdate:this.state.storageconfirmdate,
            productpartnumber:this.state.productpartnumber,
            passamount:this.state.passamount,
            storageclass:this.state.storageclass,
            failamount:this.state.failamount,
            retestamount:this.state.retestamount,
            description:this.state.description,
           data :
           this.state.IDdata,
        })
     }
     ADD=()=>{
         this.setState({
            id:"",
            assemblenumber:"",
            worknumber:"",
            storageconfirm:"",
            applicationPerson : "",
            applicationdate:{
                date:""
            },
            storageconfirmdate:{
                date:""
            },
            productpartnumber:"",
            passamount:"",
            storageclass:"",
            failamount:"",
            retestamount:"",
            description:"",
           IDdata:[],
           showadd:!this.state.showadd
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
    getlistworknumber=()=>{
        axios.get('/listworknumber')
        .then(res=>{
            this.setState({
                listworknumber:res.data
            })
        })
    }
    componentDidMount(){
        this.getOption();
        this.getlistworknumber();
    }
    
    handleChangeID=(e,values)=>{
        this.setState({
            id:values.id
        })
        this.state.data.map((item,index)=>{
            if(values.id === item.id){
                this.setState({
                IDdata:item.data,
                storageclass:item.storageclass,
                productpartnumber1:item.productpartnumber1,
                buynumber:item.buynumber,
                passamount:item.passamount,
                failamount:item.failamount,
                retestamount:item.retestamount,
                })
            }
            return true
        })
    }
    clear =(e)=>{
        e.target.value ="";
    }
    
    render(){
        const defaultProps = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '6rem', height: '4rem' },
            borderColor: 'text.primary',
          };
        const tableColumns=[
            {
             title:"倉別",
             field:"storageclass",
            },
            {
                title:"產品料號",
                field:"productpartnumber1", 
            },{
                title:"採購單號",
                field:"buynumber", 
            },{
                title:"數量(Pass)",
                field:"passamount",
            },{
                title:"數量(Fail)",
                field:"failamount",
            },{
                title:"數量(Retest)",
                field:"retestamount",
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
              mt={-5}
              bgcolor="background.paper"
              css={{ height: 100 }}
              >
              <Box pl={32}>
                 組拆單號 :
              </Box>
              <Box pl={1}>
              <TextField
               name="id"
               disabled={this.state.showEdit}
               value={this.state.id}
               style={{width:'75%'}}
               onChange={this.handleChange}
               />
              </Box>
              <Box pl={10}>
                 工單單號 :
              </Box>
              <Box pl={1} mt={-2}>
              <Autocomplete
                  inputValue={this.state.worknumber}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            worknumber:newValue.worknumber
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          worknumber:e.target.value
                   })
                    }
                  }}
                  options={this.state.listworknumber}
                   
                  getOptionLabel={(option) => option.worknumber}
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
              </Box>
              <Box
              display="flex"
              alignItems="flex-start"
              pl={5}
              p={1}
              mt={-7}
              bgcolor="background.paper"
              css={{ height: 100 }}
              >
                  <Box pl={1.5} mt={-1} border={1} {...defaultProps}>
                   倉管確認
                   <Box  pl={1.5} mt ={-1}>
                  <Checkbox
                      value={this.state.storageconfirm}
                      checked={this.state.storageconfirm}
                      name="storageconfirm"
                      onChange={this.handleChecked}
                  />
                  </Box>
                  </Box>
                  <Box pl={16}>
                   開單人 :
                  </Box>
                  <Box pl={1}>
                  <TextField
                  onChange={this.handleChange}
                 name="applicationPerson"
                 value={this.state.applicationPerson}
                  style={{width:'75%'}}
                />
                  </Box>
                  <Box pl={10}>
                   開單時間 :
                  </Box>
                  <Box pl={1}>
                  <TextField
        name="applicationdate"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangeapplicationdate}
        floatingLabelFixed
        style={{ width: '100%' }}
        value={this.state.applicationdate.date}
        InputLabelProps={{
           shrink: true,
         }}
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
                <Box pl={1} mt={3}>
                倉庫確認時間 :
                <Box pr={1}>
                <TextField
        name="storageconfirmdate"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangestorageconfirmdate}
        floatingLabelFixed
        style={{ width: '100%' }}
        value={this.state.storageconfirmdate.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
                  </Box>
                  </Box>    
                  <Box>
                產品料號 :
                  </Box>
                 <Box>
                 <TextField
                 name="productpartnumber"
                 value={this.state.productpartnumber}
                  style={{width:'75%'}}
                  onChange={this.handleChange}
                />
                 </Box>
                 <Box pl={11}>
                Pass數量 :
                  </Box>
                 <Box pl={1}>
                 <TextField
                 name="passamount"
                 value={this.state.passamount}
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
                  <Box pl={36}>
                      倉別 :
                  </Box>
                  <Box pl={1}>
                  <TextField
                 name="storageclass"
                 value={this.state.storageclass}
                  style={{width:'75%'}}
                  onChange={this.handleChange}
                />
                </Box>
                 <Box pl={11}>
                      Fail數量 :
                  </Box>
                  <Box pl={1}>
                  <TextField
                 name="failamount"
                 value={this.state.failamount}
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
              <Box pl={75}>
                  Retest數量 :
              </Box>
              <Box pl={1}>
              <TextField
                 name="retestamount"
                 value={this.state.retestamount}
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
              <Box pl={80.5}>
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
              </Box>
              <Box
         display="flex"
         alignItems="flex-start"
         pl={135}
         mt={-8}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
         <Box pl={5}>
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
    {this.state.showEdit == true || this.state.showadd == true ? 
            <Fragment>
                <Table
                 columns={tableColumns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="銷退/銷折明細"
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
                 title ="銷退/銷折明細"
                 />
            </Fragment>}
            </div>
        )
    }
    }

export default DataListLoadboardDisassemble