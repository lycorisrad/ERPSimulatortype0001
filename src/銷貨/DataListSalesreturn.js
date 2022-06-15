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
//銷退-->銷折
class DataListSalesreturn extends Component{
    constructor(props){
        super(props);
          const newdate = new Date();
          newdate.setDate(newdate.getDate()+45);

        this.state={
          data:[],
          IDdata:[],
          listvendor:[],
          listship:[],
          listPONo:[],
          listproductnumber:[],
          listPCBNO:[],
          listlevel:[],
          modal:null,

          confirmdelete:false,
          canceledit:false,
          showadd:false,
          showEdit:false,
          buttonadd:"新增",
          buttonText:"修改",
          buttonsave:"儲存",

          id:"",
          salesoff:false,
          salesreturn:false,
          vendor:"",
          date:{
            date1:""
          },
          description:"",
          Dataview:{
              shipnumber:"",
              PONO:"",
              productnumber:"",
              PCBNO:"",
              buynumber:"",
              level:"",
              price:"",
              coupon:"",
              shipamount:"",
              shipreturn:"",
              exchangerate:"",
              domesticandforeign:"",
              usandnt:"",
              storageconfirm:false,
              storageconfirmdate:"",
          }
        }
    }
    handlecancel=()=>{
        this.state.data.map((item,index)=>{
            if(this.state.id === item.id){
                this.setState({
                    IDdata:item.data,
                    id:item.id,
                    salesoff:item.salesoff,
                    salesreturn:item.salesreturn,
                    vendor:item.vendor,
                    date:item.date,
                    description:item.description
                })
            }
            return true;
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
         
     handleChange=(e)=>{
         const name = e.target.name
         const value = e.target.value
         if(this.state.showadd ==true || this.state.showEdit ==true){
         this.setState({
             [name]:value
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
    Delete =()=>{
        axios.delete(`posts/${this.state.id}`,{
            id:this.state.id,
                    salesoff:this.state.salesoff,
                    salesreturn:this.state.salesreturn,
                    vendor:this.state.vendor,
                    date:this.state.date,
                    description:this.state.description,
           data :
           this.state.IDdata,
        })
        this.setState({
            confirmdelete:!this.state.confirmdelete,
            id:"",
            salesoff:"",
            salesreturn:"",
            vendor:"",
            date:"",
            description:"",
             IDdata:[],
        })
    }
    PUT=()=>{
       axios.put(`posts/${this.state.id}`,
       {
        id:this.state.id,
        salesoff:this.state.salesoff,
        salesreturn:this.state.salesreturn,
        vendor:this.state.vendor,
        date:this.state.date,
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
            salesoff:this.state.salesoff,
            salesreturn:this.state.salesreturn,
            vendor:this.state.vendor,
            date:this.state.date,
            description:this.state.description,
           data :
           this.state.IDdata,
        })
     }
     ADD=()=>{
         this.setState({
            id:"",
            salesoff:"",
            salesreturn:"",
            vendor:"",
            date:{
                date1:""
            },
            description:"",
           IDdata:[],
           showadd:!this.state.showadd
         })
       
     }
    getOption=()=>{
        axios.get('/posts')
        .then(res=>{
            this.setState({
                data:res.data
            })
        })
        console.log(this.state.Data)
    }
    getlistvendor=()=>{
        axios.get('/listvendor')
        .then(res=>{
            this.setState({
                listvendor : res.data
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
    getlistPONo=()=>{
        axios.get('/listPONo')
        .then(res=>{
            this.setState({
                listPONo:res.data
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
    getlistPCBNO=()=>{
        axios.get('/listPCBNO')
        .then(res=>{
            this.setState({
                listPCBNO: res.data
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
    componentDidMount(){
        this.getOption();
        this.getlistvendor();
        this.getlistPCBNO();
        this.getlistPONo();
        this.getlistlevel();
        this.getlistproductnumber();
        this.getlistship();
    }
    handleChangedate=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                date:e.target.value
            })
        }
    }
    handledelete=()=>{
        this.setState({
            confirmdelete:!this.state.confirmdelete
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
                      id:item.id,
                      salesoff:item.salesoff,
                      salesreturn:item.salesreturn,
                      vendor:item.vendor,
                      date:item.date,
                      description:item.description
                  })
              }
              return true
          })
    }
    clear =(e)=>{
        e.target.value="";
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
    render(){

        const axiosship=this.state.listship.map((item,index)=>{
            return <select value={this.state.shipnumber}>
            <option key={index} value={item.shipnumber}>
            {item.shipnumber}
            </option>
            </select>
        })
        const axiosPONo = this.state.listPONo.map((item,index)=>{
            return <select value={this.state.PONO}>
            <option key={index} value={item.PONO}>
            {item.PONO}
            </option>
            </select>
        })
        const axioslistproductnumber = this.state.listproductnumber.map((item,index)=>{
            return  <select value={this.state.productnumber}>
            <option key={index} value={item.productnumber}>
            {item.productnumber}
            </option>
            </select>
        })
        const axioslistPCBNO = this.state.listPCBNO.map((item,index)=>{
            return <select value={this.state.PCBNO}>
            <option key={index} value={item.PCBNO}>
            {item.PCBNO}
            </option>
            </select>
        })
        const axioslistlevel = this.state.listlevel.map((item,index)=>{
            return <select value={this.state.level}>
            <option key={index} value={item.level}>
            {item.level}
            </option>
            </select>
        })
        const defaultProps = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '14rem', height: '3rem' },
            borderColor: 'text.primary',
          };
        const tableColumns =[
            {
                title:"銷貨單號",
                 field:"shipnumber",
                 editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="shipnumber"
                    value={value}
                    placeholder={this.state.shipnumber}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="shipnumber">
                        {axiosship}
                    </datalist>
                    </div>
                    )
            },{
                title:"PO No.",
                field:"PONO",
                editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="PONO"
                    value={value}
                    placeholder={this.state.PONO}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="buynumber">
                        {axiosPONo}
                    </datalist>
                    </div>
                    )
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
                        {axioslistproductnumber}
                    </datalist>
                    </div>
                    )
            },{
                title:"PCB No.",
                field:"PCBNO",
                editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="PCBNO"
                    value={value}
                    placeholder={this.state.PCBNO}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="PCBNO">
                        {axioslistPCBNO}
                    </datalist>
                    </div>
                    )
            },{
                title:"採購單號",
                field:"buynumber"
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
                        {axioslistlevel}
                    </datalist>
                    </div>
                    )
            },{
                title:"單價",
                field:"price"
            },{
                title:"折價",
                field:"coupon"
            },{
                title:"銷貨數量",
                field:"shipamount"
            },{
                title:"銷退數量",
                field:"shipreturn"
            },{
                title:"匯率",
                field:"exchangerate"
            },{
                title:"國內/國外",
                field:"domesticandforeign"
            },{
                title:"美金/台幣",
                field:"usandnt"
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
           請選擇銷退/銷折單號 : 
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
         bgcolor="background.paper"
         css={{ height: 100 }}
         > 
         <Box pl={95} mt={-5}>
            銷退/銷折
         </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         p={1}
         mt={-15}
         bgcolor="background.paper"
         css={{ height: 100 }}
         > 
         <Box pl={84.5}>

           <Box border={1} pl={5} {...defaultProps}>
             銷退
             <Checkbox
              value={this.state.salesreturn}
              checked={this.state.salesreturn}
              onChange={this.handleChecked}
              name="salesreturn"
             />
            銷折
            <Checkbox
              value={this.state.salesoff}
              checked={this.state.salesoff}
              onChange={this.handleChecked}
              name="salesoff"
             />
          </Box>
          </Box>
          </Box> 
         <Box
         display="flex"
        alignItems="flex-start"
        p={1}
        mt={-3}
        bgcolor="background.paper"
        css={{ height: 100 }}
        >
        <Box pl={65}>
        銷退/折單號 : 
        </Box>
        <Box pl={1}>
        <TextField
        name="id"
        disabled={this.state.showEdit}
        value={this.state.id}
        style={{width:'75%'}}
        onChange={this.handleChange}
       />
        </Box>
        <Box pl={1}>
         客戶編號 :
        </Box>
        <Box pl={1} mt={-2}>
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
        </Box>
        <Box
              display="flex"
              alignItems="flex-start"
              p={1}
              mt={-7}
              bgcolor="background.paper"
              css={{ height: 100 }}
              >
              <Box pl={72}>
                 日期 : 
              </Box>
              <Box pl={1}>
              <TextField
        name="date"
        floatingLabelText="填表時間"
        InputLabelProps={{ shrink: true, required: true }}
        type="date"
        onChange={this.handleChangedate}
        floatingLabelFixed
        style={{ width: '95%' }}
        value={this.state.date.date1}
        InputLabelProps={{
           shrink: true,
         }}
      />
              </Box>
              <Box pl={9.5}>
                備註 :
              </Box>
              <Box  pl={1}>
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
         pl={135}
         mt={-8}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
         <Box pl={5}>
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
    <button disabled={this.state.showadd == true || this.state.showEdit == true} onClick={this.handleshowEdit}>
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
                 title ="銷退/銷折明細"
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
                 title ="銷退/銷折明細"
                 />
            </Fragment>}
            </div>
        )
    }
}
export default DataListSalesreturn