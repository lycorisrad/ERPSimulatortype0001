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
  import TextareaAutosize from '@material-ui/core/TextareaAutosize';
class DataListbollowinreturn extends Component{
    constructor(props){
      super(props);
      this.state={
        data:[],
        IDdata:[],
        IDdata2:[],
        listvendorandclient:[],
        liststorageclass:[],
        listlevel:[],
        listproductcodename:[],
        listpcbno:[],
        listtype:[],
        modal:null,

        confirmdelete:false,
        showadd:false,
        showEdit:false,
        buttonadd:"新增",
        buttonText:"修改",
        buttonsave:"儲存",

        id:"",
        bollowINnumber:"",
        bollowINdate:{
          date:""
        },
        applicationPerson:"",
        description:"",
        vendorandclient:"",
        applicationdate:{
          date:""
        },
        titlebollowINnumber:"",
        titlereturnnumber:"",
        Dataview:{
          item:"",
          storageclass:"",
          level:"",
          buynumber:"",
          productcodename:"",
          pcbno:"",
          type:"",
          bollowamount:"",
          unbollowamount:"",
          description1:"",
          returnback:"",
          bollowinstorageconfirm:false,
          bollowinstorageconfirmdate:"",
  
          item2:"",
          storageclass2:"",
          level2:"",
          buynumber2:"",
          productcodename2:"",
          pcbno2:"",
          returnbackPass:"",
          returnbackFail:"",
          returnbackWaitingtest:"",
          description2:"",
          returnbackstorageconfirm:false,
          returnbackstorageconfirmdate:"",
        }
      }
    }
    getOption=()=>{
        axios.get('/posts')
        .then(res=>{
          this.setState({
            data:res.data
          })
        })
    }
    getlistvendorandclient=()=>{
       axios.get('/listvendorandclient')
       .then(res=>{
         this.setState({
          listvendorandclient:res.data
         })
       })
    }
    getliststorageclass=()=>{
      axios.get('/liststorageclass')
      .then(res=>{
        this.setState({
          liststorageclass:res.data
        })
      })
    }
    getlistlevel=()=>{
      axios.get('/listlevel')
      .then(res=>{
        this.setState({
          listlevel:res.data
        })
      })
    }
    getlistproductcodename=()=>{
      axios.get('/listproductcodename')
      .then(res=>{
        this.setState({
          listproductcodename:res.data
        })
      })
    }
    getlistpcbno=()=>{
      axios.get('/listpcbno')
      .then(res=>{
        this.setState({
          listpcbno:res.data
        })
      })
    }
    getlisttype=()=>{
      axios.get('/listtype')
      .then(res=>{
        this.setState({
          listtype:res.data
        })
      })
    }
    componentDidMount(){
       this.getOption();
       this.getlisttype();
       this.getlistvendorandclient();
       this.getlistlevel();
       this.getlistpcbno();
       this.getlistproductcodename();
       this.getliststorageclass();
    }
    handlecancel=()=>{
      this.state.data.map((item,index)=>{
          if(this.state.id === item.id){
              this.setState({
                IDdata:item.data, 
                IDdata2:item.data2,
                id:item.id,
                bollowINnumber:item.bollowINnumber,
                bollowINdate:item.bollowINdate,
                applicationPerson:item.applicationPerson,
                description:item.description,
                vendorandclient:item.vendorandclient,
                applicationdate:item.applicationdate,
                titlebollowINnumber:item.titlebollowINnumber,
                titlereturnnumber:item.titlereturnnumber, 
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
  showvalue=()=>{
      console.log(this.state.vendor)
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
     getOption=()=>{
      axios.get('/posts')
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
           IDdata:item.data, 
           IDdata2:item.data2,
           id:item.id,
           bollowINnumber:item.bollowINnumber,
           bollowINdate:item.bollowINdate,
           applicationPerson:item.applicationPerson,
           description:item.description,
           vendorandclient:item.vendorandclient,
           applicationdate:item.applicationdate,
           titlebollowINnumber:item.titlebollowINnumber,
           titlereturnnumber:item.titlereturnnumber, 
          })
    
      }
      return true;
    })
  }
  Delete =()=>{
    axios.delete(`posts/${this.state.id}`)
    this.setState({
      id:"",
        bollowINnumber:"",
        bollowINdate:{
          date:""
        },
        applicationPerson:"",
        description:"",
        vendorandclient:"",
        applicationdate:{
          date:""
        },
        titlebollowINnumber:"",
        titlereturnnumber:"",
        IDdata:[], 
        IDdata2:[],
        confirmdelete:!this.state.confirmdelete
    })
}
PUT=()=>{
   axios.put(`posts/${this.state.id}`,
   {
    id:this.state.id,
    bollowINnumber:this.state.bollowINnumber,
    bollowINdate:{
      date:this.state.bollowINdate
    },
    applicationPerson:this.state.applicationPerson,
    description:this.state.description,
    vendorandclient:this.state.vendorandclient,
    applicationdate:{
      date:this.state.applicationdate
    },
    titlebollowINnumber:this.state.titlebollowINnumber,
    titlereturnnumber:this.state.titlereturnnumber, 
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
      bollowINnumber:this.state.bollowINnumber,
      bollowINdate:{
        date:this.state.bollowINdate
      },
      applicationPerson:this.state.applicationPerson,
      description:this.state.description,
      vendorandclient:this.state.vendorandclient,
      applicationdate:{
        date:this.state.applicationdate
      },
      titlebollowINnumber:this.state.titlebollowINnumber,
      titlereturnnumber:this.state.titlereturnnumber,
       data :
       this.state.IDdata,
       data2 :
       this.state.IDdata2
    })
 }
 ADD=()=>{
     this.setState({
      id:"",
      bollowINnumber:"",
      bollowINdate:{
        date:""
      },
      applicationPerson:"",
      description:"",
      vendorandclient:"",
      applicationdate:{
        date:""
      },
      titlebollowINnumber:"",
      titlereturnnumber:"",
       IDdata:[],
       IDdata2:[],
       showadd:!this.state.showadd
     }) 
 }
 clear =(e)=>{
   e.target.value="";
 }
 handlevendorandclientChange=(e,newInputValue)=>{
        if(this.state.showadd ==true || this.state.showEdit ==true){
            this.setState({
              vendorandclient:newInputValue
            })
        }
    }
    handleChangedate = (e,newInputValue)=>{
      if(this.state.showadd ==true || this.state.showEdit ==true){
        this.setState({
          bollowINdate:newInputValue
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
     clear =(e)=>{
        e.target.value="";
    }
  render(){
       const axiosstorageclass = this.state.liststorageclass.map((item,index)=>{
        return <select value={this.state.storageclass}>
        <option key={index} value={item.storageclass}>
        {item.storageclass}
        </option>
    </select>
       }) 
        const axioslevel = this.state.listlevel.map((item,index)=>{
          return <select value={this.state.level}>
        <option key={index} value={item.level}>
        {item.level}
        </option>
    </select>
        })
        const axiosproductcodename = this.state.listproductcodename.map((item,index)=>{
          return <select value={this.state.productcodename}>
          <option key={index} value={item.productcodename}>
          {item.productcodename}
          </option>
      </select>
        })
        const axiospcbno = this.state.listpcbno.map((item,index)=>{
          return <select value={this.state.pcbno}>
          <option key={index} value={item.pcbno}>
          {item.pcbno}
          </option>
          </select>
        })
        const axiostype = this.state.listtype.map((item,index)=>{
          return <select value={this.state.type}>
          <option key={index} value={item.type}>
          {item.type}
          </option>
          </select>
        })
       const tableColumns=[
         {
           title:"Item",
           field:"item"
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
                {axiosstorageclass}
            </datalist>
            </div>
        )
         },{
           title:"等級",
           field:"level",
           editComponent:({value,onChange})=>(
            <div>
            <input 
            list ="level"
            value={value}
            placeholder={this.state.level}
            onChange={(e)=>onChange(e.target.value)}
            onClick={this.clear}
            onFocus={this.clear}
            />
            <datalist id="level">
                {axioslevel}
            </datalist>
            </div>
        )
         },{
           title:"採購單號",
           field:"buynumber",
         },{
           title:"產品代號",
           field:"productcodename",
           editComponent:({value,onChange})=>(
            <div>
                    <input 
                    list ="productcodename"
                    value={value}
                    placeholder={this.state.productcodename}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="productcodename">
                        {axiosproductcodename}
                    </datalist>
                    </div>
        )
         },{
           title:"Pcb No",
           field:"pcbno",
           editComponent:({value,onChange})=>(
            <div>
            <input 
            list ="pcbno"
            value={value}
            placeholder={this.state.pcbno}
            onChange={(e)=>onChange(e.target.value)}
            onClick={this.clear}
            onFocus={this.clear}
            />
            <datalist id="pcbno">
                {axiospcbno}
            </datalist>
            </div>
        )
         },{
           title:"Type",
           field:"type",
           editComponent:({value,onChange})=>(
            <div>
            <input 
            list ="type"
            value={value}
            placeholder={this.state.type}
            onChange={(e)=>onChange(e.target.value)}
            onClick={this.clear}
            onFocus={this.clear}
            />
            <datalist id="type">
                {axiostype}
            </datalist>
            </div>
        )
         },{
           title:"借入數量",
           field:"bollowamount"
         },{
           title:"未歸還數量",
           field:"unbollowamount"
         },{
           title:"備註",
           field:"description1"
         },{
           title:"歸還",
           field:"returnback",
           editComponent:
           (({onChange})=>(
             <button >歸還</button>
           ))
         },{
           title:"借入倉管確認",
           field:"bollowinstorageconfirm",
           editComponent:
           (props)=>{
             return (
              <Checkbox
              value={this.state.bollowinstorageconfirm}
              checked={props.value}
              name="bollowinstorageconfirm"
              onChange={(e)=>props.onChange(e.target.checked)}
          />
             )
           },
           render:(rowdata)=>(
             <Checkbox checked={rowdata.bollowinstorageconfirm} readOnly/>
           )
         },{
           title:"借入倉管確認時間",
           field:"bollowinstorageconfirmdate",
           editComponent:  
           (({value,onChange})=>(
            <TextField
                    name="bollowinstorageconfirmdate"
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
       const tableColumns2=[
        {
          title:"Item",
          field:"item2"
        },{
          title:"倉別",
          field:"storageclass2",
        },{
          title:"等級",
          field:"level2",
          editComponent:({value,onChange})=>(
            <div>
            <input 
            list ="level2"
            value={value}
            placeholder={this.state.level2}
            onChange={(e)=>onChange(e.target.value)}
            onClick={this.clear}
            onFocus={this.clear}
            />
            <datalist id="level2">
                {axioslevel}
            </datalist>
            </div>
       )
        },{
          title:"採購單號",
          field:"buynumber2",
        },{
          title:"產品代號",
          field:"productcodename2",
        },{
          title:"Pcb No",
          field:"pcbno2",
        },{
          title:"歸還數量(Pass)",
          field:"returnbackPass"
        },{
          title:"歸還數量(Fail)",
          field:"returnbackFail"
        },{
          title:"歸還數量(待測)",
          field:"returnbackWaitingtest"
        },{
          title:"備註",
          field:"description2",
          editComponent:
           (({onChange})=>{
            <TextareaAutosize
                 maxRows={4}
                 value={this.state.description2}
                 name="description2"
                 onChange={(e)=>onChange(e.target.value)}
                />
           })
          
        },{
          
          title:"歸還倉管確認",
          field:"returnbackstorageconfirm",
          editComponent:
          (props)=>{
            return(
            <Checkbox
                value={this.state.returnbackstorageconfirm}
                checked={props.value}
                name="returnbackstorageconfirm"
                onChange={(e)=>props.onChange(e.target.checked)}
            />
            )
        },
        render: (rowdata)=>(
          <Checkbox checked={rowdata.returnbackstorageconfirm} readOnly />
        )},{
          title:"歸還倉管確認時間",
          field:"returnbackstorageconfirmdate",
          editComponent: 
          (({value,onChange})=>(
            <TextField
                name="returnbackstorageconfirmdate"
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
           借入單號查詢 : 
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
              <Box pl={40}>
                  借入單號 :
                </Box>
                <Box pl={1}>
                <TextField
               disabled={this.state.showEdit}
               name="id"
               value={this.state.id}
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
               <Box pl={40}>
                  借入日期 :
                </Box>
                <Box pl={1}>
                <TextField
        name="bollowINdate"
        InputLabelProps={{ shrink: true, required: true }}
        type="date"
        onChange={this.handleChangedate}
        floatingLabelFixed
        style={{ width: '95%' }}
        value={this.state.bollowINdate.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
                </Box>
                <Box pl={15}>
                  填表人 :
                </Box>
                <Box pl={1}>
                <TextField
               name="applicationPerson"
               value={this.state.applicationPerson}
               onChange = {this.handleChange}
               style={{width:'75%'}}
               />
                </Box>
                <Box pl={5}>
                  備註 :
                </Box>
                <Box pl={1}>
                <TextareaAutosize
                 maxRows={4}
                 value={this.state.description}
                 onChange = {this.handleChange}
                 name="description"
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
                <Box pl={39}>
                  廠商/客戶 :
                </Box>
                <Box pl={1} mt={-2}>
                <Autocomplete
                  inputValue={this.state.vendorandclient}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            vendorandclient:newValue.vendorandclient
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          vendorandclient:e.target.value
                   })
                    }
                  }}
                  options={this.state.listvendorandclient}
                   
                  getOptionLabel={(option) => option.vendorandclient}
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
         <Box pl={14}>
                  填表時間 :
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
              <Box pl={36}>
               文中借入單號 :
              </Box>
              <Box pl={1}>
              <TextField
               name="titlebollowINnumber"
               onChange = {this.handleChange}
               value={this.state.titlebollowINnumber}
               style={{width:'75%'}}
               />
              </Box>
              <Box pl={4}>
              文中歸還單號 :
              </Box>
              <Box pl={1}>
              <TextField
               name="titlereturnnumber"
               onChange = {this.handleChange}
               value={this.state.titlereturnnumber}
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
                     title ="借入Item"
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
                     title ="借入Item"
                     />
                </Fragment>}
    
                {this.state.showEdit == true || this.state.showadd == true ? 
            <Fragment>
                <Table
                 columns={tableColumns2}
                 data={this.state.IDdata2}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="歸還Item"
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
                 title ="歸還Item"
                 />
            </Fragment>} 
      </div>
    )
  }
  
}
export default DataListbollowinreturn