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
class DataListconsume extends Component{
   constructor(props){
       super(props);
       this.state={
          IDdata:[],
          data:[],
          listworknumber:[],
          listconsume:[],
          modal:null,

          confirmdelete:false,
          showadd:false,
          showEdit:false,
          buttonadd:"新增",
          buttonText:"修改",
          buttonsave:"儲存",
        
          id:"",
          worknumber:"",
          applicationdate:{
              date:""
          },
          consumedate:{
              date:""
          },
          applicationperson:"",
          modifydate:{
              date:""
          },
          description:"",
          Dataview:{
              storageclass:"",
              level:"",
              buynumber:"",
              consumetype:"",
              productname:"",
              amount:"",
              type:"",
              storageconfirm:"",
              storageconfirmdate:"",
          }
       }
   }

   handleChangeapplicationdate = (e)=>{
    if(this.state.showadd || this.state.showEdit){
        this.setState({
            applicationdate:e.target.value
        })
    }
   }
   handleChangeconsumedate=(e)=>{
    if(this.state.showadd || this.state.showEdit){
        this.setState({
            consumedate:e.target.value
        })
    }
   }
   handleChangemodifydate = (e) =>{
    if(this.state.showadd || this.state.showEdit){
        this.setState({
            modifydate:e.target.value
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
   getlistworknumber =()=>{
       axios.get('/listworknumber')
       .then(res=>{
           this.setState({
            listworknumber:res.data,
           })
       })
   }
   getlistconsume=()=>{
       axios.get('/listconsume')
       .then(res=>{
           this.setState({
            listconsume:res.data
           })
       })
   }
  componentDidMount(){
      this.getOption();
      this.getlistconsume();
      this.getlistworknumber();
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
                 worknumber:item.worknumber,
                 applicationdate:item.applicationdate,
                 consumedate:item.consumedate,
                 applicationperson:item.applicationperson,
                 modifydate:item.modifydate,
                 description:item.description,
             })
         }
     })
    }
    handlecancel=()=>{
        this.state.data.map((item,index)=>{
            if(this.state.id === item.id){
                this.setState({
                    IDdata:item.data,
                    id:item.id,
                    worknumber:item.worknumber,
                    applicationdate:item.applicationdate,
                    consumedate:item.consumedate,
                    applicationperson:item.applicationperson,
                    modifydate:item.modifydate,
                    description:item.description,
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
          worknumber:"",
          applicationdate:{
              date:""
          },
          consumedate:{
              date:""
          },
          applicationperson:"",
          modifydate:{
              date:""
          },
          description:"",
             IDdata:[],
            confirmdelete:!this.state.confirmdelete
        })
    }
    PUT=()=>{
       axios.put(`posts/${this.state.id}`,
       {
        id:this.state.id,
        worknumber:this.state.worknumber,
        applicationdate:{
            date:this.state.applicationdate
        },
        consumedate:{
            date:this.state.consumedate
        },
        applicationperson:this.state.applicationperson,
        modifydate:{
            date:this.state.date
        },
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
            worknumber:this.state.worknumber,
            applicationdate:{
                date:this.state.applicationdate
            },
            consumedate:{
                date:this.state.consumedate
            },
            applicationperson:this.state.applicationperson,
            modifydate:{
                date:this.state.date
            },
            description:this.state.description,
               data :
               this.state.IDdata,
        })
     }
     ADD=()=>{
         this.setState({
            id:"",
          worknumber:"",
          applicationdate:{
              date:""
          },
          consumedate:{
              date:""
          },
          applicationperson:"",
          modifydate:{
              date:""
          },
          description:"",
           IDdata:[],
           showadd:!this.state.showadd
         })
       
     }
     clear =(e)=>{
        e.target.value="";
    }
    handleChangeworknumber=(e,newInputValue)=>{
        if(this.state.showadd ==true || this.state.showEdit ==true){
            this.setState({
                worknumber:newInputValue
            })
        }
    }
    render(){
        const defaultProps = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '8rem', height: '1.5rem' },
            borderColor: 'text.primary',
          };
        const axiosconsumetype = this.state.listconsume.map((item,index)=>{
            return <select value={this.state.consumetype}>
             <option key={index} value={item.consumetype}>
             {item.consumetype}
             </option>
             </select>
        })
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
                title:"耗用類型",
                field:"consumetype",
                editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="consumetype"
                    value={value}
                    placeholder={this.state.consumetype}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="consumetype">
                        {axiosconsumetype}
                    </datalist>
                    </div>
                )
            },{
                title:"產品代號",
                field:"productname"
            },{
                title:"數量",
                field:"amount"
            },{
                title:"Type",
                field:"type"
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
           單號查詢: 
           </Box>
           <Box pl={1} mt={-3}>
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
            display ="flex"
            alignItems="flex-start"
            p={4}
            mt={-11}
            bgcolor="background.paper"
            css={{height:100}}
            >
                <Box 
                pl={1} 
                display="flex" 
                justifyContent="center" 
                border={1} 
                {...defaultProps}>
                    耗用單號
                </Box>
                <Box pl={7}>
                <Box 
                pl={1} 
                display="flex" 
                justifyContent="center" 
                border={1} 
                {...defaultProps}>
                    工單單號
                </Box>
                </Box>
                <Box pl={7}>
                <Box 
                pl={1} 
                display="flex" 
                justifyContent="center" 
                border={1} 
                {...defaultProps}>
                    填表日期
                    </Box>
                </Box>
            </Box>
            <Box 
            display ="flex"
            alignItems="flex-start"
            p={4}
            mt={-8}
            bgcolor="background.paper"
            css={{height:100}}
            >
            <Box pl={1}>
            <TextField
               name="id"
               value={this.state.id}
               disabled={this.state.showEdit}
               style={{width:'65%'}}
               onChange = {this.handleChange}
               />
               </Box>
            <Box ></Box>
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
                <Box pl={9}>  
        <TextField
        name="applicationdate"
        floatingLabelText="填表日期"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangeapplicationdate}
        floatingLabelFixed
        style={{ width: '55%' }}
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
            mt={-9}
            bgcolor="background.paper"
            css={{height:100}}
            >
                <Box 
                pl={1} 
                display="flex" 
                justifyContent="center" 
                border={1} 
                {...defaultProps}>
                    耗用日期
                </Box>
                <Box pl={7}>
                <Box 
                pl={1} 
                display="flex" 
                justifyContent="center" 
                border={1} 
                {...defaultProps}>
                    填表人
                </Box>
                </Box>
                <Box pl={7}>
                <Box 
                pl={1} 
                display="flex" 
                justifyContent="center" 
                border={1} 
                {...defaultProps}>
                    修改日期
                </Box>
                </Box>
            </Box>
            <Box 
            display ="flex"
            alignItems="flex-start"
            p={1}
            mt={-5}
            bgcolor="background.paper"
            css={{height:100}}
            >
           <Box pl={4}>
               <TextField
        name="consumedate"
        InputLabelProps={{ shrink: true, required: true }}
        type="date"
        onChange={this.handleChangeconsumedate}
        floatingLabelFixed
        style={{ width: '85%' }}
        value={this.state.consumedate}
        InputLabelProps={{
           shrink: true,
         }}
      />
      </Box>
            <Box pl={6}>
            <TextField
               name="applicationperson"
               value={this.state.applicationperson}
               onChange={this.handleChange}
               style={{width:'65%'}}
               />
              </Box>
              <Box>
           <TextField
        name="modifydate"
        floatingLabelText="修改日期"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangemodifydate}
        floatingLabelFixed
        style={{ width: '55%' }}
        value={this.state.modifydate}
        InputLabelProps={{
           shrink: true,
         }}
      />
      </Box>
            </Box>
            <Box 
            display ="flex"
            alignItems="flex-start"
            p={1}
            mt={-6}
            bgcolor="background.paper"
            css={{height:100}}
            >
                <Box pl={30}>
                  備 註
                </Box>
            </Box>
            <Box 
            display ="flex"
            alignItems="flex-start"
            pl={23}
            mt={-7}
            bgcolor="background.paper"
            css={{height:100}}
            >
                <TextareaAutosize
                 maxRows={4}
                 value={this.state.description}
                 onChange={this.handleChange}
                 name="description"
                />
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
    <Box >
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
            </Box>
          </div>
        )
    }
}
export default DataListconsume