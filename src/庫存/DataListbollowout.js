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

class DataListbollowout extends Component{
     constructor(props){
         super(props);
         this.state={
            data:[],
            IDdata:[],
            IDdata2:[],
            listapplication:[],
            listworknumber:[],
            listclientnumber:[],
            modal:null,

            confirmdelete:false,
            showadd:false,
            showEdit:false,
            buttonadd:"新增",
            buttonText:"修改",
            buttonsave:"儲存",


             id:"", 
             bollowdate : {
                 date:""
             },
             bollowoutapplication:"",
             bollowid:"",
             bollowperson:"",
             description:"",
             person:"",
             worknumber:"",
             Dataview:{
                bollowItem: "",
                bollowapplication:"",
                bollowstorageclass:"",
                vendornumber:"",
                buynumber:"",
                level:"",
                type:"",
                productnumber:"",
                pcbno:"",
                bollowoutamount:"",
                unreturnamount:"",
                description1:"",
                return:"",
                bollowoutconfirm:false,
                bollowoutconfirmdate:"",
                
                bollowItem2:"",
                bollowapplication2:"",
                bollowstorageclass2:"",
                vendornumber2:"",
                buynumber2:"",
                level2:"",
                productnumber2:"",
                pcbno2:"",
                pass: "",
                fail: "",
                waitingfortest:"",
                description2:"",
                returnbackconfirm:false,
                returnbackconfirmdate:"",
            }
         }
     }
     getOption=(e)=>{
         axios.get('/posts')
         .then(res=>{
             this.setState({
                 data:res.data
             })
         })
     }
     getlistapplication =(e)=>{
         axios.get('/listapplication')
         .then(res=>{
             this.setState({
                listapplication : res.data
             })
         })
     }
     getlistworknumber =(e)=>{
         axios.get('/listworknumber')
         .then(res=>{
             this.setState({
                listworknumber:res.data
             })
         })
     }
     getlistclientnumber=(e)=>{
         axios.get('/listclientnumber') 
          .then(res=>{
              this.setState({
                listclientnumber : res.data
              })
          })

        }
        componentDidMount(){
            this.getOption();
            this.getlistclientnumber();
            this.getlistapplication();
            this.getlistworknumber();
        }
   clear =(e)=>{
       e.target.value="";
   }
   handlecancel=()=>{
    this.state.data.map((item,index)=>{
        if(this.state.id === item.id){
            this.setState({
                IDdata:item.data,
                IDdata2:item.IDdata2,
             id:item.id, 
             bollowdate : item.bollowdate,
             bollowoutapplication:item.bollowoutapplication,
             bollowid:item.bollowid,
             bollowperson:item.bollowperson,
             description:item.description,
             person:item.person,
             worknumber:item.worknumber,
            })
        }
        return true;
    })
    this.setState({
        showadd:false,
        showEdit:false,
    })
 }
 handledelete=()=>{
    this.setState({
        confirmdelete:!this.state.confirmdelete
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
     handleChangebollowoutapplication=(e,newInputValue)=>{
        if(this.state.showadd ==true || this.state.showEdit ==true){
            this.setState({
                bollowoutapplication:newInputValue
            })
        }
     }
     handleChangeworknumber=(e,newInputValue)=>{
        if(this.state.showadd ==true || this.state.showEdit ==true){
            this.setState({
                worknumber:newInputValue
            })
        }
     }
     handleChangebollowdate =(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                bollowdate:e.target.value
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
   handleID=(e,values)=>{
       this.setState({
           id:values.id
       })
       this.state.data.map((item,index)=>{
           if(values.id === item.id){
               this.setState({
                   IDdata:item.data,
                   IDdata2:item.IDdata2,
                id:item.id, 
                bollowdate : item.bollowdate,
                bollowoutapplication:item.bollowoutapplication,
                bollowid:item.bollowid,
                bollowperson:item.bollowperson,
                description:item.description,
                person:item.person,
                worknumber:item.worknumber,
               })
           }
           return true;
       })
   }
   Delete =()=>{
    axios.delete(`posts/${this.state.id}`)
    this.setState({
        id:"", 
             bollowdate : {
                 date:""
             },
             bollowoutapplication:"",
             bollowid:"",
             bollowperson:"",
             description:"",
             person:"",
             worknumber:"",
         IDdata:[],
        IDdata2:[],
        confirmdelete:!this.state.confirmdelete
    })
}
PUT=()=>{
   axios.put(`posts/${this.state.id}`,
   {
    id:this.state.id, 
    bollowdate : this.state.bollowdate,
    bollowoutapplication:this.state.bollowoutapplication,
    bollowid:this.state.bollowid,
    bollowperson:this.state.bollowperson,
    description:this.state.description,
    person:this.state.peson,
    worknumber:this.state.worknumber,
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
        bollowdate : {
            date:this.state.bollowdate
        },
        bollowoutapplication:this.state.bollowoutapplication,
        bollowid:this.state.bollowid,
        bollowperson:this.state.bollowperson,
        description:this.state.description,
        person:this.state.peson,
        worknumber:this.state.worknumber,
       data :
       this.state.IDdata,
       data2 :
       this.state.IDdata2
    })
 }
 ADD=()=>{
     this.setState({
        id:"", 
        bollowdate : {
            date:""
        },
        bollowoutapplication:"",
        bollowid:"",
        bollowperson:"",
        description:"",
        person:"",
        worknumber:"",
       IDdata:[],
       IDdata2:[],
       showadd:!this.state.showadd
     })
   
 }
   render(){
       const axiosvendornumber = this.state.listclientnumber.map((item,index)=>{
           return <select value={this.state.vendornumber}>
                 <option key={index} value={item.vendornumber}>
                  {item.vendornumber}
                 </option>
           </select>
       })
       const tableColumns=[
           {
               title:"借出Item",
               field:"bollowItem",
           },{
               title:"借出用途",
               field:"bollowapplication",           
           },{
               title:"借出倉別",
               field:"bollowstorageclass",
            },{
                title:"客戶代號",
                field:"vendornumber",
                editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="vendornumber"
                    value={value}
                    placeholder={this.state.vendornumber}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="vendornumber">
                        {axiosvendornumber}
                    </datalist>
                    </div>
                )
             },{
                title:"採購單號",
                field:"buynumber",
             },{
                title:"等級",
                field:"level",
             },{
                title:"Type",
                field:"type",
             },{
                title:"產品代號",
                field:"productnumber",
             },{
                title:"PCB NO",
                field:"pcbno",
             },{
                title:"借出數量",
                field:"bollowoutamount",
             },{
                title:"未歸還數量",
                field:"unreturnamount",
             },{
                title:"備註",
                field:"description1",
             },{
                title:"歸還",
                field:"return",
                editComponent:({onChange})=>(
                    <button>
                        歸還
                    </button>
                )
             },{
                title:"借出倉管確認",
                field:"bollowoutconfirm",
                editComponent:
                (props)=>{
                    return(
                    <Checkbox
                        value={this.state.bollowoutconfirm}
                        checked={props.value}
                        name="bollowoutconfirm"
                        onChange={(e)=>props.onChange(e.target.checked)}
                    />
                    )
                },
                render: (rowdata)=>(
                    <Checkbox checked={rowdata.bollowoutconfirm} readOnly />
                  )
                },
             {
                title:"借出倉管確認時間",
                field:"bollowoutconfirmdate",
                editComponent:
                (({value,onChange})=>(
                    <TextField
                    name="bollowoutconfirmdate"
                    floatingLabelText="借出倉管確認時間"
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
       const tableColumns2 =[
        {
            title:"借出Item",
            field:"bollowItem2",
        },{
            title:"借出用途",
            field:"bollowapplication2",
        },{
            title:"借出倉別",
            field:"bollowstorageclass2",
         },{
             title:"客戶代號",
             field:"vendornumber2",
          },{
             title:"採購單號",
             field:"buynumber2",
          },{
             title:"等級",
             field:"level2",
          },{
            title:"產品代號",
            field:"productnumber2",
          },{
            title:"PCB NO",
            field:"pcbno2",
          },{
            title:"歸還數量(pass)",
            field:"pass",
          },{
            title:"歸還數量(fail)",
            field:"fail",
          },{
            title:"歸還數量(待測)",
            field:"waitingfortest",
          },{
            title:"備註",
            field:"description2",
          },{
            title:"歸還倉管確認",
            field:"returnbackconfirm", 
            editComponent:
            (props)=>{
                console.log(props);
                return(
                <Checkbox
                    value={this.state.returnbackconfirm}
                    checked={props.value}
                    name="returnbackconfirm"
                    onChange={(e)=>props.onChange(e.target.checked)}
                />
                )
        },
        render: (rowdata)=>(
            <Checkbox checked={rowdata.returnbackconfirm} readOnly />
          )
        },{
            title:"歸還倉管確認時間",
            field:"returnbackconfirmdate", 
            editComponent:
            (({value,onChange})=>(
                <TextField
                name="returnbackconfirmdate"
                floatingLabelText="歸還倉管確認時間"
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
         <Box pl={1}>
         <Autocomplete
            freeSolo
            inputValue={this.state.id}
            disabled={this.state.showadd}
            options={this.state.data}
            getOptionLabel={(option) => option.id}
            style={{ width: 145 }}
            disableClearable
            onChange={this.handleID}
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
            借出單號:
         </Box>
         <Box pl={1}>
         <TextField
            name="id"
            disabled={this.state.showEdit}
            value={this.state.id}
            onChange={this.handleChange}
            style={{width : '75%'}}
         />
         </Box>
         <Box pl={15}>
           開單人:
         </Box>
         <Box>
         <TextField
            name="person"
            value={this.state.person}
            onChange={this.handleChange}
            style={{width : '75%'}}
         />
         </Box>
         <Box pl={10}>
           備註:
         </Box>
         <Box pl={1}>
         <textarea
          name ="description"
          className = "form-control"
          value ={this.state.description}
          onChange={this.handleChange}
         />
         </Box>
         </Box>
         <Box
          display ="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{height:100}}
         >
          <Box pl={30}>
             借出時間:
           </Box>
           <Box pl={1}>
           <TextField
        name="bollowdate"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangebollowdate}
        floatingLabelFixed
        style={{ width: '100%' }}
        value={this.state.bollowdate.date}
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
             借出用途:
         </Box>
         <Box pl={1} mt={-2}>
         <Autocomplete
                  freeSolo
                  inputValue={this.state.bollowoutapplication}
                  onInputChange={this.handleChangebollowoutapplication}
                  options={this.state.listapplication}
                  filterOptions={(options, state) => options}
                  getOptionLabel={(option) => option.bollowoutapplication}
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
             工單號碼:
         </Box>
         <Box pl={1} mt={-2}>
         <Autocomplete
                  freeSolo
                  inputValue={this.state.worknumber}
                  onInputChange={this.handleChangeworknumber}
                  options={this.state.listworknumber}
                  filterOptions={(options, state) => options}
                  getOptionLabel={(option) => option.worknumber}
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
         <Box pl={32}>
             借出人:
         </Box>
         <Box pl={1}>
         <TextField
            name="bollowperson"
            value={this.state.bollowperson}
            onChange={this.handleChange}
            style={{width : '75%'}}
         />
         </Box>
         </Box>
        
         <Box
         display="flex"
         alignItems="flex-start"
         pl={85}
         mt={-7}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
    <Box pl={-2}>
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
                 title ="借出明細"
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
                 title ="借出明細"
                 />
            </Fragment>}

            {this.state.showEdit == true || this.state.showadd == true ? 
        <Fragment>
            <Table
             columns={tableColumns2}
             data={this.state.IDdata2}
             options ={{search:false,actionsColumnIndex:-1}}
             title ="歸還明細"
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
             title ="歸還明細"
             />
        </Fragment>}  
         </div>
     )
   }

}
export default DataListbollowout