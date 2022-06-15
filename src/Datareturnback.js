import React, { Component } from 'react';
import axios from "axios";
import Box from '@material-ui/core/Box';
import Table from "./Table3";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import { Fragment } from "react";
import{Container, Row, Col, Jumbotron, Button, Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText, Badge, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Formik,Input,Menu } from 'antd';
import { PropTypes } from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {
    MenuItem,
    TableContainer,
    TextField
  } from "@material-ui/core";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Checkbox from "@material-ui/core/Checkbox";
  import InputAdornment from "@material-ui/core/InputAdornment";
import { classes } from 'istanbul-lib-coverage';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiThemeProvider } from 'material-ui/styles';
import { ModalDialog } from 'react-bootstrap';
import { TableRowColumn } from 'material-ui/Table';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { AutoComplete, TableBody} from 'material-ui';
import Icon from '@material-ui/core/Icon';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FastfoodOutlined, FormatListNumbered, ThreeDRotationSharp } from '@material-ui/icons';
import Dropdown from 'react-multilevel-dropdown';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { saveAs } from 'file-saver';
import { Int } from 'mssql';
import { thisTypeAnnotation } from '@babel/types';

//進貨-->退回//
class Datareturnback extends Component{
     constructor(props){
         super(props);
         this.state={
           data:[],
           IDdata:[],
           incoming_detail:[],
           tabledata:[],
           rowdata:[],
           listvendor:[],
           listpur_no:[],
           listwork_no:[],
           listproduct_no:[],
           listpcb_no:[],
           listloan_no:[],
           modal:null,
           wh_chkmodal:null,
           wh_chkmodaltrue:false,
           
           dropdownType:false,
           inputType:false,
           checkType:false,
           detailType:false,
           
           canceledit:false,
           showadd:false,
           showEdit:false,
           buttonadd:"新增",
           buttonText:"修改",
           buttonsave:"儲存",
           
           temp_dis:"",
           diff_dis_qty:"",
           
           id:"",
           back_no:"",
           back_date:{
               date:""
           },
           marker:"",
           marker_time:{
               date:""
           },
           
           vendor:"",
           remark:"",

           current_date: "",
           current_time: "",
           back_date : "",
           
           rowid:"",
           wh_chk : 0,
           Dataviewreload:"",
           tableData:[],

           Dataview:{
               pur_no:"",
               loan_no:"",
               work_no:"",
               ic_level:"",
               product_no:"",
               pcb_no:"",
               warehouse_no:"",
               change_qty:"",
               change_pass_qty:"",
               change_fail_qty:"",
               change_retest_qty:"",
               spare_qty:"",
               spare_pass_qty:"",
               spare_fail_qty:"",
               spare_retest_qty:"",
               dis_sum:"",
               dis_qty:"",
               dis_fail_qty:"",
               dis_retest_qty:"",
               reject_qty:"",
               back_qty:"",
               remark:"",
               wh_chk:null,
               wh_chk_time:""
           }
         }
     }
     getcurrentDate=()=>{
         const date = new Date().toLocaleDateString();
         const time = new Date().toLocaleTimeString();
         this.setState({
             current_date:date,
             current_time: time, 
             back_date: date
            })
     }
     handleWh_chk=(e)=>{
        if(this.state.Dataview.wh_chk === true){
            this.setState({
                modal:!this.state.modal
            })
        }
        else {
           e.target.value = ""
              }
     }
  
     
     clear=(e)=>{
         e.target.value = ""
     }
     handleconsole=(e)=>{
         console.log(this.state.Dataview)
         console.log(this.state.IDdata)
         console.log(this.state.IDdata.wh_chk)
         console.log(this.state.Dataview.wh_chk)
         console.log(this.state.tabledata)
     }
     handlecancel=()=>{
        this.state.data.map((item,index)=>{
            if(this.state.id === item.id){
                this.setState({
                    IDdata:item.data,
                    back_date:item.back_date,
                    marker:item.marker,
                    marker_time:item.marker_time,
                    vendor:item.vendor,
                    remark:item.remark,
                })
            }
            return true;
        })
        this.setState({
            showadd:false,
            showEdit:false
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
        handleWh_chkmodal=()=>{
            this.setState({
                wh_chkmodal:!this.state.wh_chkmodal
            })
        }
        handleWh_chkmodaltrue=()=>{
            this.setState({
                wh_chkmodaltrue:!this.state.wh_chkmodaltrue
            })
        }
        handleshowEdit=()=>{
            if(this.state.wh_chk === true){
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

     handleChangeID=(e,values)=>{
         this.setState({
             id:values.id
         })
         this.state.data.map((item,index)=>{
            if(values.id === item.id){
                this.setState({
                    IDdata:item.data,
                    back_no: item.id,
                    back_date:item.back_date,
                    marker:item.marker,
                    marker_time:item.marker_time,
                    vendor:item.vendor,
                    remark:item.remark,
                })
            }
            return true;
        })
        
     }
     wh_chk_AfterUpdate=()=>{
         if(this.state.Dataview.wh_chk === false){
             this.setState({
                 modal:!this.state.modal,
                 wh_chk: true
                })
         }
         else {
            this.setState({
                wh_chkmodal:!this.state.wh_chkmodal
            })
            if(this.state.wh_chkmodaltrue === true){
                if( this.state.Dataview.wh_chk === true){
                    if((this.state.Dataview.change_qty || 0) !== 0){

                    }
                }
            }
            
         }
     }
     spare_pass_qty_AfterUpdate=()=>{
         this.show_sumqty();
         this.setState({
             spare_qty : (this.state.Dataview.spare_pass_qty || 0)
             + (this.state.Dataview.spare_fail_qty || 0 ) 
             + (this.state.Dataview.spare_retest_qty || 0) 
         })
         this.getOption();
     }
     spare_fail_qty_AfterUpdate =() =>{
         this.show_sumqty();
         this.setState({
            spare_qty : (this.state.Dataview.spare_pass_qty || 0)
            + (this.state.Dataview.spare_fail_qty || 0 ) 
            + (this.state.Dataview.spare_retest_qty || 0) 
        })
        this.getOption();
     }
     spare_retest_qty_AfterUpdate = () =>{
         this.show_sumqty();
         this.setState({
            spare_qty : (this.state.Dataview.spare_pass_qty || 0)
            + (this.state.Dataview.spare_fail_qty || 0 ) 
            + (this.state.Dataview.spare_retest_qty || 0) 
        })
        this.getOption();
     }
     dis_qty_AfterUpdate=()=>{
         this.show_sumqty();
         this.setState({
             dis_sum: (this.state.Dataview.dis_qty || 0) +
             (this.state.Dataview.dis_fail_qty || 0) + 
             (this.state.Dataview.dis_retest_qty || 0)
         })
         this.getOption();
     }
     dis_qty_GotFocus=()=>{
       this.setState({
           temp_dis: this.state.Dataview.dis_qty || 0
       })
     }
     dis_qty_LostFocus=()=>{
         this.setState({
             diff_dis_qty: (this.state.Dataview.dis_qty || 0) - parseInt(this.state.temp_dis)
         })
     }
     dis_fail_qty_AfterUpdate=()=>{
         this.show_sumqty();
         this.setState({
             dis_sum: (this.state.Dataview.dis_qty || 0) + 
             (this.state.Dataview.dis_fail_qty || 0) + 
             (this.state.Dataview.dis_retest_qty || 0)
         })
     }
     dis_retest_qty_AfterUpdate =()=>{
         this.show_sumqty();
         this.setState({
            dis_sum: (this.state.Dataview.dis_qty || 0) + 
            (this.state.Dataview.dis_fail_qty || 0) + 
            (this.state.Dataview.dis_retest_qty || 0)
        })
     }
     change_retest_qty_AfterUpdate=()=>{
         this.show_sumqty();
         this.setState({
             change_qty : (this.state.Dataview.change_pass_qty || 0)
             + (this.state.Dataview.change_fail_qty || 0 ) 
             + (this.state.Dataview.change_retest_qty || 0) 
         })
         this.getOption();
     }
     change_fail_qty_AfterUpdate=()=>{
         this.show_sumqty();
         this.setState({
             change_qty: (this.state.Dataview.change_pass_qty || 0)
             + (this.state.Dataview.change_fail_qty || 0 ) 
             + (this.state.Dataview.change_retest_qty || 0) 
         })
         this.getOption();
     }
     change_pass_qty_AfterUpdate=()=>{
         this.show_sumqty();
         this.setState({
             change_qty: 
             (this.state.Dataview.change_pass_qty || 0)
              + (this.state.Dataview.change_fail_qty || 0 ) 
              + (this.state.Dataview.change_retest_qty || 0) 
         })
         this.getOption();
     }
     product_no_AfterUpdate=()=>{
         
         
         //之後要改回資料表的方式
         
         this.setState({
            back_qty: parseInt(0),
            change_qty: parseInt(0),
            reject_qty: parseInt(0),
            spare_qty: parseInt(0),
            dis_qty: parseInt(0),
            wh_chk: parseInt(0),
            dis_fail_qty: parseInt(0),
            dis_sum: parseInt(0),
            change_pass_qty: parseInt(0),
            change_fail_qty: parseInt(0),
            spare_pass_qty: parseInt(0),
            spare_fail_qty: parseInt(0),
            dis_retest_qty: parseInt(0),
            change_retest_qty: parseInt(0),
            spare_retest_qty: parseInt(0),  
         })
         
     }
     work_no_AfterUpdate=()=>{
         this.setState({
             back_qty: parseInt(0),
             change_qty: parseInt(0),
             reject_qty: parseInt(0),
             spare_qty: parseInt(0),
             dis_qty: parseInt(0),
             wh_chk: parseInt(0),
             dis_fail_qty: parseInt(0),
             dis_sum: parseInt(0),
             change_pass_qty: parseInt(0),
             change_fail_qty: parseInt(0),
             spare_pass_qty: parseInt(0),
             spare_fail_qty: parseInt(0),
             dis_retest_qty: parseInt(0),
             change_retest_qty: parseInt(0),
             spare_retest_qty: parseInt(0),            
         })
     }
     show_sumqty=()=>{
       this.setState({
           back_qty: 
           (this.state.change_pass_qty || 0) + 
           (this.state.change_fail_qty || 0) + 
           (this.state.reject_qty || 0) + 
           (this.state.spare_pass_qty || 0) + 
           (this.state.spare_fail_qty || 0) + 
           (this.state.dis_qty || 0) + 
           (this.state.dis_fail_qty || 0) +
           (this.state.dis_retest_qty || 0) +
           (this.state.spare_retest_qty || 0) +
           (this.state.change_retest_qty || 0)
       })
     }
      handleshow=()=>{
          console.log(this.state.listvendor)
      }
     componentDidMount(){
          this.getOption();
          this.getlistpur_no();
          this.getlistvendor();
          this.getlistloan_no();
          this.getlistproduct_no();
          this.getlistwork_no();
          this.getlistpcb_no();
          this.getwarehouse_no();
     }
     getOption=()=>{
         axios.get("http://localhost:3003/posts")
          .then(res=>{
               this.setState({
                   data:res.data
               })
         })
         
     }
     getlistpur_no =()=>{
         axios.get("http://localhost:3003/listpur_no")
         .then(res=>{
             this.setState({
                listpur_no:res.data
             })
         })
     }
     getlistvendor=()=>{
         axios.get("http://localhost:3003/listvendor")
         .then(res=>{
             this.setState({
                 listvendor:res.data
             })
         })
     }
    getlistwork_no=()=>{
        axios.get("http://localhost:3003/listwork_no")
        .then(res=>{
            this.setState({
                listwork_no:res.data
            })
        })
    }
    getlistproduct_no=()=>{
        axios.get("http://localhost:3003/listproduct_no")
        .then(res=>{
            this.setState({
                listproduct_no:res.data
            })
        })
    }
    getlistpcb_no=()=>{
        axios.get("http://localhost:3003/listpcb_no")
         .then(res=>{
             this.setState({
                listpcb_no:res.data
             })
         })
    }
    getlistloan_no=()=>{
        axios.get("http://localhost:3003/listloan_no")
         .then(res=>{
             this.setState({
                listloan_no:res.data
             })
         })
    }
    getwarehouse_no=()=>{
        axios.get("http://localhost:3003/incoming_detail")
         .then(res=>{
             this.setState({
                incoming_detail:res.data
             })
         })
    }
     Delete =()=>{
        axios.delete(`http://localhost:3003/posts/${this.state.id}`,{
            id:this.state.id,
            back_date:this.state.back_date,
            marker:this.state.marker,
            marker_time:this.state.marker_time,
            storagevendor:this.state.storagevendor,
            vendor:this.state.vendor,
            remark:this.state.remark,
           data :
           this.state.IDdata,
        })
        this.setState({
            id:"",
            returnndate:"",
            marker:"",
            marker_time:"",
            
            vendor:"",
            remark:"",
             IDdata:[],
        })
    }
    PUT=()=>{
       axios.put(`http://localhost:3003/posts/${this.state.id}`,
       {
        id:this.state.id,
        back_date:this.state.back_date,
        marker:this.state.marker,
        marker_time:this.state.marker_time,
        storagevendor:this.state.storagevendor,
        vendor:this.state.vendor,
        remark:this.state.remark,
           data :
           this.state.IDdata,
      }
    )
    this.getOption();
    }
    POST=()=>{//此為直接傳送至jsondata的動作
         axios.post("http://localhost:3003/posts",
         {
            id:this.state.id,
            back_date:this.state.back_date,
            marker:this.state.marker,
            marker_time:this.state.marker_time,
            storagevendor:this.state.storagevendor,
            vendor:this.state.vendor,
            remark:this.state.remark,
           data :
           this.state.IDdata,
        })
        this.getOption();
     }
     ADD=()=>{
         
         this.setState({
            id:"",
            back_date:"",
            marker:"",
            marker_time:"",
            
            vendor:"",
            remark:"",
           IDdata:[],
           showadd:!this.state.showadd
         })
       
     }
    
    handleChangedate=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                marker_time:e.target.value
            })
        }
    }
    handleChangedatetime=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                back_date:e.target.value
            })
        }
    }
    onDownload = async () => {
        console.log("下載開始");
        const downloadResult = await fetch(
          "https://jsonplaceholder.typicode.com/todos/1"
        );
        const blob = await downloadResult.blob();
        saveAs(blob, "下載.xlsx");
        console.log("下載完成");
      
        console.log("按下按鈕開始");
        const fetchResult = await fetch(
          "https://jsonplaceholder.typicode.com/todos/1"
        );
        const json = await fetchResult.json();
        console.log("按下完成: ", JSON.stringify(json));
      };
     render(){
        const axiospur_no = this.state.listpur_no.map((item,index)=>{
            return <select value={this.state.pur_no}><option key={index} value={item.vendor}>{item.pur_no}</option></select>
        })
        const axioswork_no = this.state.listwork_no.map((item,index)=>{
            return <select value={this.state.work_no}>
            <option key={index} value={item.work_no}>
            {item.work_no}
            </option>
            </select>
        })
        const axiosproduct_no=this.state.listproduct_no.map((item,index)=>{
            return <select value={this.state.product_no}>
            <option key={index} value={item.product_no}>
            {item.product_no}
            </option>
            </select>
        })
        const axiospcb_no=this.state.listpcb_no.map((item,index)=>{
            return <select value={this.state.pcb_no}>
            <option key={index} value={item.pcb_no}>
            {item.pcb_no}
            </option>
            </select>
        })
        const axiosloan_no = this.state.listloan_no.map((item,index)=>{
            return <select value={this.state.loan_no}>
            <option key={index} value={item.loan_no}>
            {item.loan_no}
            </option>
            </select>
        })
         const tableColumns=[
             {
                 title:"採購單號",
                 field:"pur_no",
                 editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="pur_no"
                    value={value}
                    placeholder={this.state.pur_no}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.handleWh_chk}
                    onFocus={this.handleWh_chk}
                    />
                    <datalist id="pur_no">
                        {axiospur_no}
                    </datalist>
                    </div>
                 )
             },{
                 title:"借出單號",
                 field:"loan_no",
                 editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="loan_no"
                    value={value}
                    placeholder={this.state.loan_no}
                    onChange={(e)=>{
                      this.setState({
                          
                      })
                      onChange(e.target.value)
                    }}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="loan_no">
                        {axiosloan_no}
                    </datalist>
                    </div>
                 )
             },{
                 title:"工單編號",
                 field:"work_no",
                 editComponent:
                 ({value,onChange})=>(
                    <div>
                    <input 
                    list ="work_no"
                    value={value}
                    placeholder={this.state.work_no}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="work_no">
                        {axioswork_no}
                    </datalist>
                    </div>
                 )
             },{
                 title:"產品代號",
                 field:"product_no",
                 editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="product_no"
                    value={value}
                    placeholder={this.state.product_no}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="product_no">
                        {axiosproduct_no}
                    </datalist>
                    </div>
                )
             },{
                 title:"PCB No",
                 field:"pcb_no",
                 editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="pcb_no"
                    value={value}
                    placeholder={this.state.pcb_no}
                    onChange={(e)=>onChange(e.target.value)}
                    onFocus={this.clear}
                    onClick={this.clear}
                    />
                    <datalist id="pcb_no">
                        {axiospcb_no}
                    </datalist>
                    </div>
                )
             },{
                 title:"倉別",
                 field:"warehouse_no",
             },{
                 title:"換貨(Pass)",
                 field:"change_pass_qty",
             },{
                 title:"換貨(Fail)",
                 field:"change_fail_qty",
             },{
                 title:"換貨(待測)",
                 field:"change_retest_qty",
             },{
                 title:"備品(Pass)",
                 field:"spare_pass_qty",
             },{
                 title:"備品(Fail)",
                 field:"backproductfail"
              },{
                  title:"備品(待測)",
                  field:"spare_retest_qty"
              },{
                  title:"進退(Pass)",
                  field:"enterandreturnpass"
              },{
                  title:"進退(Fail)",
                  field:"dis_fail_qty"
              },{
                  title:"進退(待測)",
                  field:"dis_retest_qty"
              },{
                  title:"備註",
                  field:"remark"
              },{
                  title:"倉管確認",
                  field:"wh_chk",
                  editComponent:
                  (props)=>{
                    console.log(props);
                    return(
                    <Checkbox
                        value={this.state.wh_chk}
                        checked={props.value}
                        name="wh_chk"
                        onChange={(e)=>props.onChange(e.target.checked)}
                    />
                    )
                },
                render: (rowdata)=>(
                  <Checkbox checked={rowdata.wh_chk} readOnly />
                )
              },{
                  title:"確認時間",
                  field:"wh_chk_time",
                  editComponent:
                  (({value,onChange})=>(
                    <TextField
                    name="wh_chk_time"
                    floatingLabelText="確認時間"
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
            倉管已做確認，禁止修改！！
            </ModalBody>
          <ModalFooter>
          <div>
          <button onClick={this.handleWh_chk}>確定</button>
          </div>
          </ModalFooter>
         </Modal>
         <Modal isOpen={this.state.wh_chkmodal} toggle={this.handleWh_chkmodal} >
            <ModalHeader>警告</ModalHeader>
            <ModalBody>
            確定倉管確認???
            </ModalBody>
          <ModalFooter>
          <div>
          <button onClick={this.handleWh_chkmodaltrue}>確定</button>
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
         mt={-7}
         bgcolor="background.paper"
         css={{ height: 100 }}
         > 
         <Box pl={30}>
              退回單號 : 
          </Box> 
         <Box pl={1}>
         <TextField
           name="id"
           disabled={this.state.showEdit}
           value={this.state.id}
           onChange={this.handleChange}
           style ={{width:'75%'}}
         />
         </Box>
         <Box pl={24} pt={3}>
           廠商 :
         </Box>
         <Box pl={1} pt={-1}>
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
            退回日期 : 
          </Box>
          <Box pl={1}>
          <TextField
        name="back_date"
        floatingLabelText="填表時間"
        InputLabelProps={{ shrink: true, required: true }}
        type="date"
        onChange={this.handleChangedatetime}
        floatingLabelFixed
        style={{ width: '95%' }}
        value={this.state.back_date.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
          </Box>
          <Box  pl={29} pt={5}>
            備註 :
          </Box>
          <Box pl={1} pt={5}>
          <textarea
            name="remark"
            className = "form-control"
            value={this.state.remark}
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
           開單人/日期 : 
         </Box>
           <Box pl={1}>
           <TextField
              name="marker"
              value={this.state.marker}
              onChange={this.handleChange}
              style ={{width: '65%'}}
           />
           <Box>
           <TextField
        name="marker_time"
        floatingLabelText="填表時間"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangedate}
        floatingLabelFixed
        style={{ width: '100%' }}
        value={this.state.marker_time.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
      </Box>
           </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={120}
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
    <Box>
    <button onClick={this.onDownload}>下載</button>
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
                 onRowClick={(event,rowData)=>{
                     console.log(rowData);
                     this.setState({
                         Dataview:rowData,
                         tabledata:rowData.tableData,
                         rowdata:rowData
                     })
                     event.stopPropagation();
                 }}
                 columns={tableColumns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="退回明細"
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
                 title ="退回明細"
                 />
            </Fragment>}
             </div>
         )
     }
     
}
export default Datareturnback