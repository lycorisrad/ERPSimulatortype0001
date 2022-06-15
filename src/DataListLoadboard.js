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
class DataListLoadboard extends Component{
   constructor(props){
       super(props);
       this.state={ 
        data:[],
        IDdata:[],
        IDdata2:[],
        listvendor:[],
        listproductnumber:[],
        listspecies:[],
        modal:null,

        confirmdelete:false,
        showadd:false,
        showEdit:false,
        buttonadd:"新增",
        buttonText:"修改",
        buttonsave:"儲存",

        id:"",
        processnumber:"",
        vendor:"",
        pono:"",
        applicationperson:"",
        applicationdate:{
            date:""
            },
        productpartnumber:"",
        amount:"",
        Dataview:{
            storageclass:"",
            buynumber:"",
            productcodename:"",
            amount1:"",
            returnbackamount:"",
            returnedamount:"",
            consumetype:"",
            type:"",
            storageconfirm:false,
            storageconfirmtime:"",
            enterconfirm:false,
            enterconfirmtime:"",
            
            enterstoragetime:"",
            entertype:"",
            buynumber2:"",
            storageclass2:"",
            productcodename2:"",
            enteramount:"",
            enterperson:"",
            package:false,
            storagemanager:false,
            enternumber:"",
            storageconfirmtime2:"",
        }
    }
    this.handlevendorChange = this.handlevendorChange.bind(this)

   }
   handlecancel=()=>{
    this.state.data.map((item,index)=>{
        if(this.state.id === item.id ){
            this.setState({
                IDdata:item.data,
                IDdata2:item.data2,
                id:item.id,
                processnumber:item.processnumber,
                vendor:item.vendor,
                pono:item.pono,
                applicationperson:item.applicationperson,
                applicationdate:item.applicationdate,
                productpartnumber:item.productpartnumber,
                amount:item.amount,
            })
        }
        else {
            this.setState({
                IDdata:"",
                IDdata2:"",
                id:"",
                processnumber:"",
                vendor:"",
                pono:"",
                applicationperson:"",
                applicationdate:"",
                productpartnumber:"",
                amount:"",
            })
        }
        return true;
    })
    this.setState({
        showadd:false,
        showEdit:false,
    })
 }
 showvalue =()=>{
     console.log(this.state.listvendor)
     console.log(this.state.listproductnumber)
 }
 handledelete=()=>{
    this.setState({
        confirmdelete:!this.state.confirmdelete
    })
 }
 handleChangeproductpartnumber =(e,newInputValue)=>{
    if(this.state.showadd ==true || this.state.showEdit ==true){
    this.setState({
        productpartnumber:newInputValue
    })
}
}

handleChangeapplicationdate =(e)=>{
    if(this.state.showadd || this.state.showEdit){
        this.setState({
            applicationdate:e.target.value
        })
    }
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
 getCareerPosts(){
     axios
     .all([
         axios.get("http://localhost:3003/listvendor"),
         axios.get("http://localhost:3003/listproductnumber")
     ])
     .then(
         axios.spread((listvendor,listproductnumber)=>{
             let vendordata = listvendor.data;
             let productnumberdata = listproductnumber.data;
             this.setState({
                 listvendor : vendordata,
                 listproductnumber : productnumberdata
             })
         })
     )
 }
   getOption=()=>{
    axios.get('/posts')
    .then(res=>{
        this.setState({
            data:res.data
        })
    })
}
clear =(e)=>{
    e.target.value="";
}
getlistvendor=()=>{
     axios.get('/listvendor')
     .then(res=>{
         this.setState({
           listvendor : res.data
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
getlistspecies=()=>{
    axios.get('/listspecies')
    .then(res=>{
       this.setState({
           listspecies:res.data
       })
    })
}
componentDidMount(){
    this.getOption();
    this.getlistvendor();
    this.getlistproductnumber();
    this.getlistspecies();
}

handlevendorChange(e , newInputValue){
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
        if(values.id == item.id){
            this.setState({
        IDdata:item.data,
        IDdata2:item.data2,
        id:item.id,
        processnumber:item.processnumber,
        vendor:item.vendor,
        pono:item.pono,
        applicationperson:item.applicationperson,
        applicationdate:item.applicationdate,
        productpartnumber:item.productpartnumber,
        amount:item.amount,
            })
        }
        return true
    })
}
Delete =()=>{
    axios.delete(`posts/${this.state.id}`)
    this.setState({
        id:"",
        processnumber:"",
        vendor:"",
        pono:"",
        applicationperson:"",
        applicationdate:{
            date:""
            },
        productpartnumber:"",
        amount:"",
         IDdata:[],
        IDdata2:[],
        confirmdelete:!this.state.confirmdelete
    })
}
PUT=()=>{
   axios.put(`posts/${this.state.id}`,
   {
        id:this.state.id,
        processnumber:this.state.processnumber,
        vendor:this.state.vendor,
        pono:this.state.pono,
        applicationperson:this.state.applicationperson,
        applicationdate:{
            date:this.state.applicationdate
        },
        productpartnumber:this.state.productpartnumber,
        amount:this.state.amount,
       data :
       this.state.IDdata,
       data2 : 
       this.state.IDdata2,
  }
)
}

POST=()=>{//此為直接傳送至jsondata的動作
     axios.post("/posts",
     {
        id:this.state.id,
        processnumber:this.state.processnumber,
        vendor:this.state.vendor,
        pono:this.state.pono,
        applicationperson:this.state.applicationperson,
        applicationdate:{
            date:this.state.applicationdate
        },
        productpartnumber:this.state.productpartnumber,
        amount:this.state.amount,
       data :
       this.state.IDdata,
       data2 :
       this.state.IDdata2
    })
 }
 ADD=()=>{
     this.setState({
        id:"",
        processnumber:"",
        vendor:"",
        pono:"",
        applicationperson:"",
        applicationdate:{
            date:"",
        },
        productpartnumber:"",
        amount:"",
       IDdata:[],
       IDdata2:[],
       showadd:!this.state.showadd
     })
   
 }
 clear =(e)=>{
     e.target.value="";
 }
 render(){
     const tableColumns=[
         {
             title:"倉別",
             field:"storageclass",
         },{
             title:"採購單號",
             field:"buynumber",
         },{
            title:"產品代號",
            field:"productcodename",
         },{
            title:"數量",
            field:"amount1",
         },{
            title:"退回數量",
            field:"returnbackamount",
         },{
            title:"實退數量",
            field:"returnedamount",
         },{
            title:"耗用類型",
            field:"consumetype",
         },{
            title:"Type",
            field:"type",
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
            title:"倉管確認時間",
            field:"storageconfirmtime",
            editComponent:
            (({value,onChange})=>(
                <TextField
                    name="storageconfirmtime"
                    floatingLabelText="倉管確認時間"
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
            title:"入庫確認",
            field:"enterconfirm",
            editComponent: 
            (props)=>{
                console.log(props);
                return(
                <Checkbox
                    value={this.state.enterconfirm}
                    checked={props.value}
                    name="enterconfirm"
                    onChange={(e)=>props.onChange(e.target.checked)}
                />
                )
            },
            render: (rowdata)=>(
              <Checkbox checked={rowdata.enterconfirm} readOnly />
            )
         },{
            title:"入庫確認時間",
            field:"enterconfirmtime",
            editComponent:
            (({value,onChange})=>(
                <TextField
                    name="enterconfirmtime"
                    floatingLabelText="入庫確認時間"
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
     const axiosenterspeices = this.state.listspecies.map((item,index)=>{
         return <select value={this.state.enterspeices}>
             <option key={index} value={item.enterspeices}>
             {item.enterspeices}
             </option>
         </select>
     })
    const tableColumns2=[
        {
            title:"入庫時間",
            field:"entertime",
        },{
            title:"入庫種類",
            field:"enterspeices",
            editComponent:({value,onChange})=>(
                <div>
                <input 
                list ="enterspeices"
                value={value}
                placeholder={this.state.enterspeices}
                onChange={(e)=>onChange(e.target.value)}
                onClick={this.clear}
                onFocus={this.clear}
                />
                <datalist id="enterspeices">
                    {axiosenterspeices}
                </datalist>
                </div>

            )
        },{
            title:"採購單號",
            field:"buynumber"
        },{
            title:"倉別",
            field:"storageclass"
        },{
            title:"產品代號",
            field:"productcodename"
        },{
            title:"入庫數量",
            field:"amount2"
        },{
            title:"入庫人員",
            field:"entermember"
        },{
            title:"包裝",
            field:"package",
            editComponent: 
            (props)=>{
                console.log(props);
                return(
                <Checkbox
                    value={this.state.package}
                    checked={props.value}
                    name="package"
                    onChange={(e)=>props.onChange(e.target.checked)}
                />
                )
        },
        render: (rowdata)=>(
            <Checkbox checked={rowdata.package} readOnly />
          )
        },{
            title:"倉管",
            field:"storage",
            editComponent: 
            (props)=>{
                console.log(props);
                return(
                <Checkbox
                    value={this.state.storage}
                    checked={props.value}
                    name="storage"
                    onChange={(e)=>props.onChange(e.target.checked)}
                />
                )
        },
        render: (rowdata)=>(
            <Checkbox checked={rowdata.storage} readOnly />
          )
        },{
            title:"入庫單號",
            field:"enternumber"
        },{
            title:"倉管確認時間",
            field:"storageconfirmdate",
            editComponent:
            (({value,onChange})=>(
                <TextField
                name="storageconfirmdate"
                floatingLabelText="倉管確認時間"
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
     <Modal isOpen={this.state.confirmdelete} toggle={this.handledelete} >
        <ModalHeader>警告</ModalHeader>
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
          <Box pl={29.7}>
       單號查詢 : 
       </Box>
       <Box pl={1} mt={-2}>
       <Autocomplete
            inputValue={this.state.id}
            disabled={this.state.showadd}
            options={this.state.data}
            getOptionLabel={(option) => option.id}
            style={{ width: 145 }}
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
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box pl={30}>
            製程單號 :
          </Box>
          <Box pl={1}>
          <TextField
           name="id"
           disabled={this.state.showEdit}
           value={this.state.id}
           onChange = {this.handleChange}
           style={{width:'75%'}}
           />
          </Box>
          <Box pl={5}>
            廠商 :
          </Box>
          <Box pl={1} mt={-2}>
          <Autocomplete
                  inputValue={this.state.vendor}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            vendor:newValue.vendor
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          vendor:e.target.value
                   })
                    }
                  }}
                  options={this.state.listvendor}
                   
                  getOptionLabel={(option) => option.vendor}
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
     <Box pl={25}>
       PO NO :
     </Box>
     <Box pl={1}>
          <TextField
           name="pono"
           value={this.state.pono}
           onChange = {this.handleChange}
           style={{width:'75%'}}
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
          <Box pl={32}>
              開單人 :
          </Box>
           <Box pl={1}>
          <TextField
           name="applicationperson"
           onChange = {this.handleChange}
           value={this.state.applicationperson}
           style={{width:'75%'}}
           />
          </Box>
          <Box pl={1}>
             開單時間 : 
          </Box>
          <Box pl={1}>
     <TextField
        name="applicationdate"
        floatingLabelText="填表時間"
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
             <Box pl={30}>
             產品料號 : 
          </Box> 
          <Box pl={1} mt={-2}>
          <Autocomplete
                  freeSolo
                  inputValue={this.state.productpartnumber}
                  onInputChange={this.handleChangeproductpartnumber}
                  options={this.state.listproductnumber}
                  filterOptions={(options, state) => options}
                  getOptionLabel={(option) => option.productpartnumber}
                  style={{ width: 145 }}
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
             <Box pl={34}>
             數量 : 
          </Box> 
          <Box pl={1}>
          <TextField
           name="amount"
           onChange = {this.handleChange}
           value={this.state.amount}
           style={{width:'75%'}}
           />
          </Box>
          </Box>
          <Box
         display="flex"
         alignItems="flex-start"
         pl={130}
         mt={-7}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
         <Box pl={2}>
         <button onClick={this.showvalue}>檢查</button>
         </Box>
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
   <button disabled={this.state.showEdit == true || this.state.showadd == true} onClick={this.ADD}>
       {this.state.buttonadd}
   </button>
    </Box>
    <Box pl={2}>
    <button disabled={this.state.showadd == true ||this.state.showEdit == true} onClick={this.handleshowEdit}>
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
                 title ="耗用項目"
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
                 title ="耗用項目"
                 />
            </Fragment>}

            {this.state.showEdit == true || this.state.showadd == true ? 
        <Fragment>
            <Table
             columns={tableColumns2}
             data={this.state.IDdata2}
             options ={{search:false,actionsColumnIndex:-1}}
             title ="入庫項目"
             editable={{
                 onRowAdd:(newData)=>
                 new Promise((resolve,reject)=>{
                     setTimeout(()=>{
                         this.setState(
                             {
                              IDdata2 :[...this.state.IDdata2,newData],
                              Dataview:{...newData}
                             })
                             resolve();
                     },10)
                 }),
                 onRowUpdate:(newData,oldData)=>
                    new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                            console.log("new: ",newData);

                            const dataUpdate=[...this.state.IDdata2];
                            const index = oldData.tableData.id;
                            dataUpdate[index]=newData;
                            this.setState({
                                Dataview:{...newData},
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
        </Fragment>: 
        <Fragment>
        <Table
             columns={tableColumns2}
             data ={this.state.IDdata2}
             options ={{search: false,actionsColumnIndex:-1}}
             title ="入庫項目"
             />
        </Fragment>}  
        </div>
    )
 }
}
export default DataListLoadboard