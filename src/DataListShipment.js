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
//銷貨-->出貨//
class DataListShipment extends Component{
     constructor(props){
         super(props);
         this.state={
           data:[],
           IDdata:[],
           listvendor:[],
           listlocal:[],
           listship:[],
           modal:null,

           confirmdelete:false,
           showadd:false,
           showEdit:false,
           buttonadd:"新增",
           buttonText:"修改",
           buttonsave:"儲存",

           id:"",
           BEandInvoice:"",
           shipdate:{
            date:""
            },
           shipelocal:"",
           vendornumber:"",
           US: false,
           NT: false,
           ship: "",
           description:"",
           storageconfirm:false,
           storageconfirmdate:{
            date:""
           },
           Dataview:{
               storageclass:"",
               buynumber:"",
               worknumber:"",
               level:"",
               ordernumber:"",
               PONO:"",
               InvoiceNo:"",
               productnumber:"",
               PCBNO:"",
               amount:"",
               type:"",
               price:"",
               exchangerate:"",
               orderItem:"",
           }
        }
     }
     handlecancel=()=>{
        this.state.data.map((item,index)=>{
            if(this.state.id === item.id){
                this.setState({
                    id:item.id,
                    BEandInvoice:item.BEandInvoice,
                    shipdate:item.shipdate,
                    shipelocal:item.shipelocal,
                    vendornumber:item.vendornumber,
                    US: item.US,
                    NT: item.NT,
                    ship: item.ship,
                    description:item.description,
                    storageconfirm:item.storageconfirm,
                    storageconfirmdate:item.storageconfirmdate,
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
   
     getOption=()=>{
         axios.get('/posts')
         .then(res=>{
             this.setState({
                 data : res.data
             })
         })
     }
     getlistvendor =()=>{
         axios.get('/listvendor')
         .then(res=>{
             this.setState({
                listvendor:res.data
             })
         })
     }
     getlistlocal =()=>{
         axios.get('/listlocal')
         .then(res=>{
             this.setState({
                listlocal:res.data
             })
         })
     }
     getlistship=()=>{
         axios.get('/listship')
         .then(res=>{
             this.setState({
                listship:res.data
             })
         })
     }
    
     componentDidMount(){
         this.getOption();
         this.getlistlocal();
         this.getlistship();
         this.getlistvendor();
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
     handleChangeID=(e ,values)=>{
        this.setState({
            id:values.id
        })
        this.state.data.map((item,index)=>{
            if(values.id === item.id){
                       this.setState({
                        IDdata : item.data,
                        id :item.id,
                        BEandInvoice:item.BEandInvoice,
                        shipdate:item.shipdate,
                        shipelocal:item.shipelocal,
                        vendornumber:item.vendornumber,
                        US: item.US,
                        NT: item.NT,
                        ship: item.ship,
                        description:item.description,
                        storageconfirm:item.storageconfirm,
                        storageconfirmdate: item.storageconfirmdate,
                    })
            } 
           return true;
         })
     }
     handledelete=()=>{
        this.setState({
            confirmdelete:!this.state.confirmdelete
        })
     }
     Delete =()=>{
        axios.delete(`posts/${this.state.id}`,{
            id:this.state.id,
           BEandInvoice:this.state.BEandInvoice,
           shipdate:this.state.shipdate,
           shipelocal:this.state.shipelocal,
           vendornumber:this.state.vendornumber,
           US: this.state.US,
           NT: this.state.NT,
           ship: this.state.ship,
           description:this.state.description,
           storageconfirm:this.state.storageconfirm,
           storageconfirmdate:this.state.storageconfirmdate,
           data :
           this.state.IDdata,
        })
        this.setState({
            confirmdelete:!this.state.confirmdelete,
            id:"",
            BEandInvoice:"",
            shipdate:{
             date:""
             },
            shipelocal:"",
            vendornumber:"",
            US: false,
            NT: false,
            ship: "",
            description:"",
            storageconfirm:false,
            storageconfirmdate:{
             date:""
            },
             IDdata:[],
        })
    }
    PUT=()=>{
       axios.put(`posts/${this.state.id}`,
       {
        id:this.state.id,
        BEandInvoice:this.state.BEandInvoice,
        shipdate:this.state.shipdate,
        shipelocal:this.state.shipelocal,
        vendornumber:this.state.vendornumber,
        US: this.state.US,
        NT: this.state.NT,
        ship: this.state.ship,
        description:this.state.description,
        storageconfirm:this.state.storageconfirm,
        storageconfirmdate:this.state.storageconfirmdate,
        data :
        this.state.IDdata,
      }
    )
    }
    POST=()=>{//此為直接傳送至jsondata的動作
         axios.post("/posts",
         {
            id:this.state.id,
           BEandInvoice:this.state.BEandInvoice,
           shipdate:this.state.shipdate,
           shipelocal:this.state.shipelocal,
           vendornumber:this.state.vendornumber,
           US: this.state.US,
           NT: this.state.NT,
           ship: this.state.ship,
           description:this.state.description,
           storageconfirm:this.state.storageconfirm,
           storageconfirmdate:this.state.storageconfirmdate,
           data :
           this.state.IDdata,
        })
     }
     ADD=()=>{
         this.setState({
            id:"",
            BEandInvoice:"",
            shipdate:{
                date:""
            },
            shipelocal:"",
            vendornumber:"",
            US: "",
            NT: "",
            ship: "",
            description:"",
            storageconfirm:"",
            storageconfirmdate:{
                date:""
            },
           IDdata:[],
           showadd:!this.state.showadd
         })
       
     }
     clear =(e)=>{
        e.target.value="";
    }
    handleChangeshipdate=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                shipdate:e.target.value
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
      Detected=()=>{
          console.log(this.state.DataView)
      }
     render(){
         const tableColumns=[
             {
                 title:"倉別",
                 field:"storageclass"
             }, 
            {
                 title:"採購單號",
                 field:"buynumber",
             },{
                 title:"工單單號",
                 field:"worknumber",
             },{
                 title:"等級",
                 field:"level"
             },{
                 title:"訂購單號",
                 field:"ordernumber"
             },{
                 title:"PO NO",
                 field:"PONO",
             },{
                 title:"Invoice No.",
                 field:"InvoiceNo",
             },{
                 title:"產品代號",
                 field:"productnumber",
             },{
                 title:"PCB NO",
                 field:"PCBNO",
             },{
                 title:"數量",
                 field:"amount",
             },{
                 title:"Type",
                 field:"type",
             },{
                 title:"單價",
                 field:"price"
             },{
                 title:"匯率",
                 field:"exchangerate"
             },{
                 title:"Order Item",
                 field:"orderItem"
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
   mt={1}
   bgcolor="background.paper"
   css={{ height: 100 }}
   >
       <Box pl={1} mt={-3}>
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
   mt={-8}
   bgcolor="background.paper"
   css={{ height: 100 }}
   >
   <Box pl={32}>
    銷貨單號 :
   </Box>
   <Box pl={1}>
   <TextField
    name="id"
    disabled={this.state.showEdit}
    value={this.state.id}
    onChange ={this.handleChange}
    style={{width:'75%'}}
    />
   </Box>
   <Box pl={23}>
    B/E and Invoice : 
   </Box>
   <Box pl={1}>
<TextField
name="BEandInvoice"
value={this.state.BEandInvoice}
onChange ={this.handleChange}
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
<Box pl={4} display="flex" justifyContent="center">
<Box pl= {1} mt={-1} border={1} >
倉管確認 : 
<Box pl={1.5} mt ={-1}>
<Checkbox
            value = {this.state.storageconfirm}
            checked = {this.state.storageconfirm}
            onChange={this.handleChecked}
            name ="storageconfirm"
        />
</Box>
</Box>
</Box>
<Box pl={17.5}>
出貨日期 :
</Box>
<Box pl={1}>
<TextField
        name="shipdate"
        InputLabelProps={{ shrink: true, required: true }}
        type="date"
        onChange={this.handleChangeshipdate}
        floatingLabelFixed
        style={{ width: '95%' }}
        value={this.state.shipdate.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
</Box>
<Box pl={34} >
出貨地區 :
</Box>
<Box pl={1} mt={-2}>
<Autocomplete
                  inputValue={this.state.shipelocal}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            shipelocal:newValue.shipelocal
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          shipelocal:e.target.value
                   })
                    }
                  }}
                  options={this.state.listlocal}
              
                  getOptionLabel={(option) => option.shipelocal}
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
mt={-7}
bgcolor="background.paper"
css={{ height: 100 }}
>
<Box pl={1} mt={5}>
倉庫確認時間
<Box pr={-1} >
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



<Box >
客戶代號 :
</Box>
<Box pl={1} mt={-2}>
<Autocomplete
                  inputValue={this.state.vendornumber}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            vendornumber:newValue.vendornumber
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                            vendornumber:e.target.value
                   })
                    }
                  }}
                  options={this.state.listvendor}
              
                  getOptionLabel={(option) => option.vendornumber}
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
<Box 
pl={42}  
display="flex" 
justifyContent="center">
    <Box pl= {2} mb={2} border={1} >
      美金 : 
      <Checkbox
            value = {this.state.US}
            checked = {this.state.US}
            name ="US"
            onChange={this.handleChecked}
        />
      台幣 :
     <Checkbox
            value = {this.state.NT}
            checked = {this.state.NT}
            name ="NT"
            onChange={this.handleChecked}
        />
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
  <Box pl={35.5} >
Ship :
</Box>
<Box mt={-2} pl={1}>
<Autocomplete
                  inputValue={this.state.ship}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            ship:newValue.ship
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          ship:e.target.value
                   })
                    }
                  }}
                  options={this.state.listship}
                   
                  getOptionLabel={(option) => option.ship}
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
<Box pl={39} >
備註 : 
</Box>
<Box pl={1} mt={1}>
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
         pl={130}
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
                 title ="出貨明細"
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
                 title ="出貨明細"
                 />
            </Fragment>}
      </div>
      )     
    }
     
}
export default DataListShipment