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
class DataListgiveout extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            IDdata:[],
            listvendor:[],
            modal:null,

            confirmdelete:false,
            showadd:false,
            showEdit:false,
            buttonadd:"新增",
            buttonText:"修改",
            buttonsave:"儲存",

             id:"",
            applicationperson:"",
            description:"",
            donatedate:{
                date:""
            },
            applicationtime:{
                date:""
            },
            vendor:"",
            titlenumber:"",
            Dataview:{
                storageclass:"",
                level:"",
                buynumber:"",
                productcodename:"",
                pcbno:"",
                type:"",
                amount:"",
                description1:"",
                storageconfirm : "",
                storageconfirmdate:"",
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
    getlistvendor=()=>{
        axios.get('/listvendor')
        .then(res=>{
            this.setState({
                listvendor:res.data
            })
        })
    }
   
    componentDidMount(){
        this.getOption();
        this.getlistvendor();
    }
    handleChangedonatedate = (e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                donatedate:e.target.value
            })
        }
    }
    handleChangeapplicationtime=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                applicationtime:e.target.value
            })
        }
    }
    handlevendorChange=(e,newInputValue)=>{
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
                id:item.id,
                applicationperson:item.applicantperson,
                description:item.description,
                donatedate:item.donatedate,
                applicationtime:item.applicationtime,
                vendor:item.vendor,
                titlenumber:item.titlenumber,
            })
        }
        return true
        })
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
      handlecancel=()=>{
        this.state.data.map((item,index)=>{
            if(this.state.id === item.id){
                this.setState({
                    IDdata:item.data,
                    id:item.id,
                    applicationperson:item.applicantperson,
                    description:item.description,
                    donatedate:item.donatedate,
                    applicationtime:item.applicationtime,
                    vendor:item.vendor,
                    titlenumber:item.titlenumber,
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
        }}
        Delete =()=>{
          axios.delete(`posts/${this.state.id}`)
          this.setState({
              id:"",
              applicationperson:"",
              description:"",
              donatedate:{
                  date:""
              },
              applicationtime:{
                  date:""
              },
              vendor:"",
              titlenumber:"",
               IDdata:[],
              confirmdelete:!this.state.confirmdelete
          })
      }
      PUT=()=>{
         axios.put(`posts/${this.state.id}`,
         {
          id:this.state.id,
          applicationperson:this.state.applicationperson,
          description:this.state.description,
          donatedate:{
              date:this.state.donatedate
          },
          applicationtime:{
              date:this.state.applicationtime
          },
          vendor:this.state.vendor,
          titlenumber:this.state.titlenumber,
             data :
             this.state.IDdata,
        }
      )
      }
      
      POST=()=>{//此為直接傳送至jsondata的動作
           axios.post("/posts",
           {
              id:this.state.id,
              applicationperson:this.state.applicationperson,
              description:this.state.description,
              donatedate:{
                  date:this.state.donatedate
              },
              applicationtime:{
                  date:this.state.applicationtime
              },
              vendor:this.state.vendor,
              titlenumber:this.state.titlenumber,
             data :
             this.state.IDdata,
      
          })
       }
       ADD=()=>{
           this.setState({
              id:"",
              applicationperson:"",
              description:"",
              donatedate:{
                  date:""
              },
              applicationtime:{
                  date:""
              },
              vendor:"",
              titlenumber:"",
             IDdata:[],
             showadd:!this.state.showadd
           }) 
       }
       clear =(e)=>{
          e.target.value="";
      }
   
    render(){
        const defaultProps = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '8rem', height: '1.5rem' },
            borderColor: 'text.primary',
          };
        const tableColumns=[
            {
              title:"倉別",
              field:"storageclass",
            },{
              title:"等級",
              field:"level",
             },{
              title:"採購單號",
              field:"buynumber"
            },{
              title:"產品代號",
              field:"productnumber"
            },{
              title:"PCB No.",
              field:"pcbno"
            },{
              title:"Type",
              field:"type",
             },{
              title:"數量",
              field:"amount"
            },{
              title:"備註",
              field:"description1"
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
           <Box pl={1} mt={-2}>
           <Autocomplete
            freeSolo
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
                  <Box pl={32}>
                      贈出單號 :
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
                    填表人 :
                  </Box>
                  <Box pl={1}>
                  <TextField
               name="applicationperson"
               value={this.state.applicationperson}
               onChange = {this.handleChange}
               style={{width:'75%'}}
               />
                  </Box>
                  <Box pl={14}></Box>
              <Box 
                display="flex" 
                justifyContent="center" 
                border={1} 
                {...defaultProps}>
                   備註
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
                 贈出日期 :
                 </Box>
                 <Box pl={1}>
                 <TextField
        name="donatedate"
        InputLabelProps={{ shrink: true, required: true }}
        type="date"
        onChange={this.handleChangedonatedate}
        floatingLabelFixed
        style={{ width: '95%' }}
        value={this.state.donatedate.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
                 </Box>
                 <Box pl={8}>
                 填表時間 :
               </Box>
               <Box pl={1}>
               <TextField
        name="applicationtime"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangeapplicationtime}
        floatingLabelFixed
        style={{ width: '100%' }}
        value={this.state.applicationtime.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
      </Box>
      <Box pl={5.5} mt={1}>
             <textarea
          name="description"
          className = "form-control"
          onChange = {this.handleChange}
          value={this.state.description}
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
               客戶名稱 :
               </Box>
               <Box pl={1} mt={-2}>
               <Autocomplete
                  freeSolo
                  inputValue={this.state.vendor}
                  onInputChange={this.handlevendorChange}
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
             文中單號 :
               </Box>
             <Box pl={1}>
             <TextField
              name="titlenumber"
              onChange={this.handleChange}
              value={this.state.titlenumber}
              style={{width:'75%'}}
              />
             </Box>
               </Box>
               <Box
         display="flex"
         alignItems="flex-start"
         pl={80}
         mt={-4}
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
                 title ="贈入Item"
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
                 title ="贈入Item"
                 />
            </Fragment>}
              </div>
          )
    }
}
export default DataListgiveout