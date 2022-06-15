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

  class Axiostest7 extends Component{
     constructor(props){
         super(props);
        
         this.state={
             data:[],
             IDdata:[],
             listvendor:[],      
             listbuynumber:[],
             modal:null,

             showadd:false,
             showEdit:false,
             buttonadd:"新增",
             buttonText:"修改",
             buttonsave:"儲存",


             id:"",
             applicationdate:
             {
                 date:""
             },
             vendor:"",
             fuck1:"",
             fuck2:"",
             DataView:{
                testvalue:false,
                 buynumber:"",
                 a:"",
                 b:"",
             }
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
        if(this.state.showEdit == true){
            this.setState({
                buttonText:"修改"
            })
        }
        else {
            this.setState({
                buttonText:"取消"
            })
        }
    }
    }
     
    handleChangedate=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                applicationdate:e.target.value
            })
        }
    }
     handleChange=(e)=>{
         const name = e.target.name
         const value= e.target.value
         if(this.state.showadd ==true || this.state.showEdit ==true){
         this.setState({
              [name]:value,
         })
        }
        }
    //重點在IDdata 想辦法把 tabledata去掉
    handleconsole=()=>{
            console.log(this.state.IDdata);
            console.log(this.state.data);
            console.log(this.state.id);
            console.log(this.state.vendor);
            console.log(this.state.listvendor);
            console.log(this.state.listbuynumber);
            console.log(this.state.applicationdate);
            console.log(this.state.buynumber);
            console.log(this.state.testvalue);
        }
     getlistvendor=()=>{
         axios.get("/listvendor")
         .then(res=>{
             this.setState({
                listvendor:res.data
             })
         })
     }
     getlistclass =()=>{
         axios.get("/listclass")
         .then(res=>{
             this.setState({
                 listbuynumber:res.data
             })
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
     componentDidMount(){
         this.getOption();
         this.getlistvendor();
         this.getlistclass();
     }
     handleChangeID=(e,values)=>{
         this.setState({
             id:values.id
         })
         this.state.data.map((item,index)=>{
              if(values.id == item.id){
                  this.setState({
                      IDdata:item.data,
                      id:item.id,
                      applicationdate:item.applicationdate,
                      vendorconfirm:item.vendorconfirm,
                      vendor: item.vendor,
                      fuck1:item.fuck1,
                      fuck2:item.fuck2,
                  })
                  item.data.map((item,index)=>{
                      this.setState({
                          buynumber:item.buynumber,
                          testvalue : item.testvalue
                      })
                  })
              }
              return true
         })
     }
    
    
     
     Delete =()=>{
         axios.delete(`posts/${this.state.id}`,{
            id:this.state.id,
            fuck1:this.state.fuck1,
            fuck2:this.state.fuck2,
            applicationdate : this.state.applicationdate,
        
            vendor:this.state.vendor,
            data :
            this.state.IDdata,
         })
         this.setState({
              id: "",
              fuck1:"",
              fuck2:"",
              vendor:"",
              testvalue:"",
              a:"",
              b:"",
              IDdata:[],
         })
     }
     PUT=()=>{
        axios.put(`posts/${this.state.id}`,
        {
            id:this.state.id,
            fuck1:this.state.fuck1,
            fuck2:this.state.fuck2,
            applicationdate : this.state.applicationdate,
            vendor:this.state.vendor,
         
            data :
            this.state.IDdata,
       }
     )
     }
     POST=()=>{//此為直接傳送至jsondata的動作
          axios.post("/posts",
          {
            id:this.state.id,
            fuck1:this.state.fuck1,
            fuck2:this.state.fuck2,
            applicationdate : this.state.applicationdate,
            vendor:this.state.vendor,
            data :
            this.state.IDdata,
         })
      }
      ADD=()=>{
          this.setState({
            id:"",
            fuck1:"",
            fuck2:"",
            applicationdate : {
                date: ""
             },
            vendor:"",
            IDdata:[],
            showadd:!this.state.showadd
          })
        if(this.state.showadd == true){
            this.setState({
                buttonadd:"新增"
            })
        }
        else{
            this.setState({
                buttonadd:"取消"
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
      clear =(e)=>{
          e.target.value="";
      }
     render(){  
        const axiosbuynumber = this.state.listbuynumber.map((item,index)=>{
            return <select value={this.state.buynumber}><option key={index} value={item.vendor}>{item.buynumber}</option></select>
        })
         const columns=[
             {
                 title:"採購單號",
                 field:"buynumber",
                 editComponent:
                 ({value,onChange})=>(
                    <div>
                     <input 
                     list ="buynumber"
                     value={value}
                     placeholder={this.state.buynumber}
                     onChange={(e)=>onChange(e.target.value)}
                     onFocus={this.clear}
                     />
                     <datalist id="buynumber">
                         {axiosbuynumber}
                     </datalist>
                     </div>
                 )
             },
             {
                 title:"資料A",
                 field:"a"
             },{
                  title:"資料B",
                  field:"b"
             },{
                 title:"測試",
                 field:"testvalue",
                 editComponent:
                   (props)=>{
                       console.log(props);
                       return(
                       <Checkbox
                           value={this.state.testvalue}
                           checked={props.value}
                           name="testvalue"
                           onChange={(e)=>props.onChange(e.target.checked)}
                       />
                       )
                   },
                   render: (rowdata)=>(
                     <Checkbox checked={rowdata.testvalue} readOnly />
                   )
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
          <Box pl={12}>
       ID : 
       </Box>
       <Box pl={1}>
       <Autocomplete
            disabled={this.state.showadd}
            options={this.state.data}
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
       <Box pl={1}>
       <TextField
           name="id"
           value={this.state.id}
           onChange={this.handleChange}
           style={{width:'75%'}}
           />
       </Box>
       
       <Box pl={1}>
       fuck1 : 
       </Box>
       <Box pl={1}>
       <TextField
           name="fuck1"
           value={this.state.fuck1}
           onChange={this.handleChange}
           style={{width:'75%'}}
           />
       </Box>
       <Box pl={1}>
       fuck2 : 
       </Box>
       <Box pl={1}>
       <TextField
           name="fuck2"
           value={this.state.fuck2}
           onChange={this.handleChange}
           style={{width:'75%'}}
           />
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
    </Box>
     <Box
     display="flex"
     alignItems="flex-start"
     p={1}
     m={1}
     bgcolor="background.paper"
     css={{ height: 100 }}
     > 
     <Box pl={5}>
         廠商 :
     </Box>
       <Box pl={1}>
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
           <Box pl ={5}>
           填表時間 :
           </Box>
           <Box pl={1}>
      <TextField
        name="date"
        label="date"
        floatingLabelText="填表時間"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangedate}
        floatingLabelFixed
        style={{ width: '80%' }}
        value={this.state.applicationdate.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
           </Box>
           </Box>
     
    {this.state.showEdit == true || this.state.showadd == true ? 
        <Fragment>
            <Table
             columns={columns}
             data={this.state.IDdata}
             options ={{search:false,actionsColumnIndex:-1}}
             title ="耗用項目"
             editable={{
                 onRowAdd:(newData)=>
                 new Promise((resolve,reject)=>{
                     setTimeout(()=>{
                        console.log("Addnew: ",newData);
                         this.setState(
                             {
                              IDdata :[...this.state.IDdata,newData],
                              DataView:{...newData}
                             })
                             resolve() 
                            
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
                                DataView:{...newData},
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
        </Fragment> :
        <Fragment>
            <Table 
              columns={columns}
              data ={this.state.IDdata}
              options ={{search:false,actionsColumnIndex:-1}}
              title ="耗用項目"
            />
        </Fragment>}
            </div>
        )
     }
}
export default Axiostest7