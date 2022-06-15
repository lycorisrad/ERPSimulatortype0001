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
import Popper from "@material-ui/core/Popper";
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
  import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class DataListscrapped extends Component{
      constructor(props){
          super(props); 
         this.state={
             data:[],
             IDdata:[],
             listvendorcodename:[],
             modal:null,

             confirmdelete:false,
             showadd:false,
             showEdit:false,
             buttonadd:"新增",
             buttonText:"修改",
             buttonsave:"儲存",

             id:"",
             applicationperson : "",
             description:"",
             scrappeddate:{
                 date:""
             },
             applicationdate:{
                 date:""
             },
             vendorcodename:"",
             Dataview:{
                 storageclass:"",
                 level:"",
                 buynumber:"",
                 productnumber:"",
                 productname:"",
                 pcbno:"",
                 amount:"",
                 PassorFail:"",
                 storageconfirm:false,
                 storageconfirmdate:"",
             }
         }
      }
      getoption=()=>{
          axios.get("/posts")
          .then(res=>{
              this.setState({
                  data:res.data
              })
          })
      }
      getlistvendorcodename =()=>{
          axios.get("/listvendorcodename")
          .then(res=>{
              this.setState({
                listvendorcodename : res.data
              })
          })
      }
        componentDidMount(){
            this.getoption();
            this.getlistvendorcodename();
        }
        handleChangevendorcodename=(e,newInputValue)=>{
            if(this.state.showadd ==true || this.state.showEdit ==true){
                this.setState({
                    vendorcodename:newInputValue
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
       handleChangescrappeddate=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                scrappeddate:e.target.value
            })
        }
       }
      handleChangeID=(e,values)=>{
          this.setState({
              id:values.id
          })
          this.state.data.map((item)=>{
              if(values.id === item.id){
                  this.setState({
                    id:item.id,
                    applicationperson : item.applicationperson,
                    description:item.description,
                    scrappeddate:item.scrappeddate,
                    applicationdate:item.applicationdate,
                    vendorcodename:item.vendorcodename,
                  })
              }
          })
      }
      clear =(e)=>{
        e.target.value="";
    }
    handlecancel=()=>{
     this.state.data.map((item,index)=>{
         if(this.state.id === item.id){
             this.setState({
                 IDdata:item.data,
                 id:item.id,
                 applicationperson : item.applicationperson,
                 description:item.description,
                 scrappeddate:item.scrappeddate,
                 applicationdate:item.applicationdate,
                 vendorcodename:item.vendorcodename,
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
     handleChange=(e)=>{
        const name = e.target.name
        const value = e.target.value
        if(this.state.showadd ==true || this.state.showEdit ==true){
        this.setState({
            [name]:value
        })
       }
    }
    Delete =()=>{
        axios.delete(`posts/${this.state.id}`)
        this.setState({
            id:"",
            applicationperson : "",
            description:"",
            scrappeddate:{
                date:""
            },
            applicationdate:{
                date:""
            },
            vendorcodename:"",
             IDdata:[],
            confirmdelete:!this.state.confirmdelete
        })
    }
    PUT=()=>{
       axios.put(`posts/${this.state.id}`,
       {
        id:this.state.id,
        applicationperson : this.state.applicationperson,
        description:this.state.description,
        scrappeddate:this.state.scrappeddate,
        applicationdate:this.state.applicationdate,
        vendorcodename:this.state.vendorcodename,
           data :
           this.state.IDdata,

      }
    )
    }
    
    POST=()=>{//此為直接傳送至jsondata的動作
         axios.post("/posts",
         {
            id:this.state.id,
            applicationperson : this.state.applicationperson,
            description:this.state.description,
            scrappeddate:this.state.scrappeddate,
            applicationdate:this.state.applicationdate,
            vendorcodename:this.state.vendorcodename,
           data :
           this.state.IDdata,
        })
     }
     ADD=()=>{
         this.setState({
            id:"",
            applicationperson : "",
            description:"",
            scrappeddate:{
                date:""
            },
            applicationdate:{
                date:""
            },
            vendorcodename:"",
           IDdata:[],
           showadd:!this.state.showadd
         })
       
     }
      render(){
         
          const tableColumns=[

              {
                  title:"倉別",
                  field:"storageclass"
              },{
                  title:"等級",
                  field:"level"
              },{
                  title:"採購單號",
                  field:"buynumber"
              },{
                  title:"產品代號",
                  field:"productnumber"
              },{
                  title:"品名規格",
                  field:"productname"
              },{
                title:"PCB NO",
                field:"pcbno"
              },{
                  title:"數量",
                  field:"amount"
              },{
                  title:"Pass_Fail", 
                  field:"PassorFail",
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
         const options = this.state.listvendorcodename.map((option) => {
             const filterOption = option.vendorcodename;
             return {
                 filterOption: /0A001/.test(filterOption) ? '個人' : filterOption,
                 filterOption: /0A003/.test(filterOption) ? '個人詩曼特' : filterOption,  
                 ...option
             }
         })

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
             <Box pl={1} mt={-2}>
             <Autocomplete
            disabled={this.state.showadd}
            options={this.state.data}
            inputValue={this.state.id}
            getOptionLabel={(option) => option.id}
            style={{ 
             width: 150, 
            }}
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
            display ="flex"
            alignItems="flex-start"
            p={4}
            mt={-11}
            bgcolor="background.paper"
            css={{height:100}}
            >
                <Box pl={32}>
                  報廢單號 :
                </Box>
                <Box pl={1}>
                    <TextField
                      name="id"
                      disabled={this.state.showEdit}
                      onChange={this.handleChange}
                      value={this.state.id}
                      style={{width:'75%'}}
                    />
                </Box>
                <Box pl={5}>
                    開單人 :
                </Box>
              <Box pl={1}>
               <TextField
                 name="applicationperson"
                 value={this.state.applicationperson}
                 onChange={this.handleChange}
                 style={{width:'75%'}}
               />
              </Box>
              <Box pl={5}>
                備註 :
              </Box>
              <Box pl={1}></Box>
              <TextareaAutosize
                 maxRows={4}
                 value={this.state.description}
                 onChange={this.handleChange}
                 name="description"
                />
              </Box>
            <Box 
            display ="flex"
            alignItems="flex-start"
            p={4}
            mt={-7}
            bgcolor="background.paper"
            css={{height:100}}
            >
            <Box pl={32}>
                報廢日期 :
            </Box>
            <Box pl={1}>
            <TextField
        name="scrappeddate"
        InputLabelProps={{ shrink: true, required: true }}
        type="date"
        onChange={this.handleChangescrappeddate}
        floatingLabelFixed
        style={{ width: '95%' }}
        value={this.state.scrappeddate.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
            </Box>
            <Box pl={8}>
                開單時間 :
            </Box>
            <Box pl={1}>
            <TextField
        name="applicationdate"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangeapplicationdate}
        floatingLabelFixed
        style={{ width: '75%' }}
        value={this.state.applicationdate.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
            </Box>
            </Box>  
            <Box 
            display ="flex"
            alignItems="flex-start"
            p={4}
            mt={-7}
            bgcolor="background.paper"
            css={{height:100}}
            >
             <Box pl={32}>
                 客戶代號 :
             </Box>
             <Box pl={1} mt={-2}>
             <Autocomplete
                  id="grouped-demo"
                  inputValue={this.state.vendorcodename}
                  onInputChange={this.handleChangevendorcodename}
                  options={options.sort((a,b)=> -b.filterOption.localeCompare(a.filterOption))}
                  groupBy={(option)=> option.filterOption}
                  filterOptions={(options, state) => options}
                  getOptionLabel={(option) => {return option.vendorcodename}}
                  style={{ width: 145}}
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
         pl={85}
         mt={-1}
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
                 title ="報廢明細"
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
                 title ="報廢明細"
                 />
            </Fragment>}
              </div>
          )
      }
}
export default DataListscrapped