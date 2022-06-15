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
//銷貨-->訂購表單//
class DataListOrder extends Component{
  constructor(props){
    super(props);
    this.state={
       data:[],
       IDdata:[],
       listvendor:[],
       listproductnumber:[],
       listPassandFail: [],
       liststorageclss:[],
       modal:null,
      
       confirmdelete:false,
       showadd:false,
       showEdit:false,
       buttonadd:"新增",
       buttonText:"修改",
       buttonsave:"儲存",

       id:"",
       date:{
         date1:""
       },
       PONO: "",
       buynumber:"",
       vendor:"",
       description:"",
       Dataview:{
          item:"",
          pregivedate:"",
          productnumber:"",
          price: "",
          amount:"",
          PASSandFail:"",
          outed:"",
          unouted:"",
          storageclass:"",
          exchangerate:"",
          spefiction:"",

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
    handleInputChange=(e,newInputValue)=>{
      if(this.state.showadd ==true || this.state.showEdit ==true){
      this.setState({
       vendor:newInputValue
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

    handleChangeID =(e,values)=>{
      this.setState({
        id:values.id
      })
      this.state.data.map((item,index)=>{
        if(values.id === item.id){
          this.setState({
              IDdata:item.data,
             date:item.date,
             PONO: item.PONO,
             buynumber:item.buynumber,
             vendor:item.vendor,
             description:item.description,
          })
        }
        return true;
      })
    }
    getOption=()=>{
      axios.get("/posts")
      .then(res=>{
        this.setState({
          data:res.data
        })
      })
    }
    getlistPassandFail=()=>{
      axios.get("/listPassandFail")
      .then(res=>{
        this.setState({
          listPassandFail:res.data
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
    getlistvendor=()=>{
      axios.get("/listvendor")
      .then(res=>{
        this.setState({
          listvendor:res.data
        })
      })
    }
    getliststorageclss=()=>{
      axios.get("/liststorageclass")
      .then(res=>{
        this.setState({
          liststorageclass:res.data
        })
      })
    }
    componentDidMount(){
      this.getOption();
      this.getlistvendor();
      this.getlistproductnumber();
      this.getliststorageclss();
      this.getlistPassandFail();
    }
    handledelete=()=>{
      this.setState({
         confirmdelete:!this.state.confirmdelete
      })
   }
    Delete =()=>{
      axios.delete(`posts/${this.state.id}`,{
             id:this.state.id,
             date:this.state.date,
             PONO: this.state.PONO,
             buynumber:this.state.buynumber,
             vendor:this.state.vendor,
             description:this.state.description,
         data :
         this.state.IDdata,
      })
      this.setState({
        id:"",
        date:"",
        PONO: "",
        buynumber:"",
        vendor:"",
        description:"",
           IDdata:[],
      })
  }
  PUT=()=>{
     axios.put(`posts/${this.state.id}`,
     {
      id:this.state.id,
             date:this.state.date,
             PONO: this.state.PONO,
             buynumber:this.state.buynumber,
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
        date:this.state.date,
        PONO: this.state.PONO,
        buynumber:this.state.buynumber,
        vendor:this.state.vendor,
        description:this.state.description,
         data :
         this.state.IDdata,
      })
   }
   ADD=()=>{
       this.setState({
        id:"",
        date:"",
        PONO: "",
        buynumber:"",
        vendor:"",
        description:"",
         IDdata:[],
         showadd:!this.state.showadd
       })
   }
   handleChangedate=(e)=>{
    if(this.state.showadd || this.state.showEdit){
        this.setState({
            date:e.target.value
        })
    }
   }
   clear =(e)=>{
    e.target.value="";
}
    render(){
      const axiosproductnumber = this.state.listproductnumber.map((item,index)=>{
        return <select value={this.state.productnumber}><option key={index} value={item.productnumber}>{item.productnumber}</option></select>
    })
    const axiosPassandFail = this.state.listPassandFail.map((item,index)=>{
      return <select value={this.state.PASSandFail}>
      <option key={index} value={item.PASSandFail}>
      {item.PASSandFail}
      </option>
      </select>
    })
    const axiosstorageclss = this.state.liststorageclss.map((item,index)=>{
      return <select value={this.state.storageclss}>
      <option key={index} value={item.storageclss}>
      {item.storageclss}
      </option>
      </select>
    })
   const tableColumns=[
     {
       title:"Item",
       field:"item",
     },{
       title:"預交日期",
       field:"pregivedate",
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
      title:"單價",
      field:"price",
     },{
      title:"數量",
      field:"amount",
     },{
      title:"Pass/Fail",
      field:"PASSandFail",
      editComponent:({value,onChange})=>(
        <div>
        <input 
        list ="PASSandFail"
        value={value}
        placeholder={this.state.PASSandFail}
        onChange={(e)=>onChange(e.target.value)}
        onClick={this.clear}
        onFocus={this.clear}
        />
        <datalist id="PASSandFail">
            {axiosPassandFail}
        </datalist>
        </div>
    )
     },{
      title:"已出",
      field:"outed",
     },{
      title:"未出",
      field:"unouted",
     },{
      title:"倉別",
      field:"storageclass",
      editComponent:({value,onChange})=>(
        <div>
        <input 
        list ="storageclass"
        value={value}
        placeholder={this.state.storageclass}
        onChange={(e)=>onChange(e.target.value)}
        onClick={this.clear}
        onFocus={this.clear}
        />
        <datalist id="storageclass">
            {axiosstorageclss}
        </datalist>
        </div>
    )
     },{
      title:"匯率",
      field:"exchangerate",
     }
   ]
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
           請選擇欲查詢訂購單號 : 
          </Box>
          <Box pl={1} mt={-2}>
          <Autocomplete
          freeSolo
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
         m={1}
         bgcolor="background.paper"
         css={{ height: 100 }}
         > 
          <Box pl={30}>
           日期 : 
          </Box>
          <Box pl={1}>
          <TextField
        name="date"
        InputLabelProps={{ shrink: true, required: true }}
        type="date"
        onChange={this.handleChangedate}
        floatingLabelFixed
        style={{ width: '90%' }}
        value={this.state.date.date1}
        InputLabelProps={{
           shrink: true,
         }}
      />
          </Box>
          <Box pl={15}>
          PO NO : 
          </Box>
          <Box pl={1}>
          <TextField
         name="PONO"
         value={this.state.PONO}
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
         <Box pl={27}>
         訂購單號 : 
         </Box>
         <Box p={1} >
         <TextField
         name="buynumber"
         value={this.state.buynumber}
         style={{width:'75%'}}
         onChange={this.handleChange}
        />
         </Box>
         <Box pl={7}>
          客戶代號 :
         </Box>
         <Box pl={1} mt={-2}>
         <Autocomplete
                  freeSolo
                  inputValue={this.state.vendor}
                  onInputChange={this.handleInputChange}
                  options={this.state.listvendor}
                  filterOptions={(options, state) => options}
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
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         p={1}
         mt={-6}
         bgcolor="background.paper"
         css={{ height: 100 }}
         > 
         <Box pl={73}>
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
         pl={110}
         mt={-7}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
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
    <Box pl={1}>
   <button disabled={this.state.showEdit == true || this.state.showadd == true} onClick={this.ADD}>
       {this.state.buttonadd}
   </button>
    </Box>
    <Box pl={1}>
    <button disabled={this.state.showadd == true ||this.state.showEdit == true} onClick={this.handleshowEdit}>
       {this.state.buttonText}
    </button>
    </Box>
    <Box pl={1}>
     <button onClick={this.handledelete}>刪除</button>
    </Box>
    <Box pl={1}>
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
                 title ="訂購單明細"
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
                 title ="訂購單明細"
                 />
            </Fragment>}
     </div>
   )
    }
}
export default DataListOrder