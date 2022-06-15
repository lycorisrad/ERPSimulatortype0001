import React, { Component } from 'react';
import axios from "axios";
import Box from '@material-ui/core/Box';
import Table from './Table3';
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
import { FastfoodOutlined, FormatListNumbered } from '@material-ui/icons';

class DataOutsourceEditForm extends Component{
      constructor(props){
          super(props);
          this.state={
              data:[],
              IDdata:[],
               
              listoutsource:[],

              id:"",
              outsourcevendor:"",
              transferoutconfirm:false,
              outsourcenumber:"",
              outsourcedate:"",
              worknumber:"",
              productnumber:"",
              amount:"",
              process:"",
              price:"",
              cost:"",
               
              ICSorting:false,
              SMT:false,
              PCBCat:false,
              EEPrg:false,
              Testing:false,
              Repair:false,
              Cover:false,
              Marking:false,
              Label:false,
              Packing:false,
              Resorting:false,
              DownGrade:false,
              Reball:false,
              Dismantle:false,
              Dividebin:false,
              
              Dataview:{
                outsourcenumber:"",
                outsourcedate:"",
                worknumber:"",
                process:"",
                productname:"",
                amount:"",
                price:"",
                costs:"",
              }
          }
      }
      getAllOption=()=>{
          axios.all([
               axios.get("http://localhost:3003/data"),
               axios.get("http://localhost:3003/listoutsource")
          ])
          .then(
              axios.spread((
                  res,res1
              )=>{
                  this.setState({
                      data:res.data,
                      listoutsource:res1.data,
                  })
              })
          )
      }
      componentDidMount(){
          this.getAllOption();
      }
      handleChange=(e)=>{
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]:value
        })
    }
    handleChecked =(e)=>{
        const name = e.target.name
        const value = e.target.checked
        this.setState({
            [name] : value
        })
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
              outsourcevendor:item.outsourcevendor,
              transferoutconfirm:item.transferoutconfirm,
              outsourcenumber:item.outsourcenumber,
              outsourcedate:item.outsourcedate,
              worknumber:item.worknumber,
              productnumber:item.productnumber,
              amount:item.amount,
              process:item.process,
              price:item.price,
              cost:item.cost,
               
              ICSorting:item.ICSorting,
              SMT:item.SMT,
              PCBCat:item.PCBCat,
              EEPrg:item.EEPrg,
              Testing:item.Testing,
              Repair:item.Repair,
              Cover:item.Cover,
              Marking:item.Marking,
              Label:item.Label,
              Packing:item.Packing,
              Resorting:item.Resorting,
              DownGrade:item.DownGrade,
              Reball:item.Reball,
              Dismantle:item.Dismantle,
              Dividebin:item.Dividebin,
                })
            }
            return true
        })
    }
    handleclear=()=>{
        this.setState({
            IDdata:"",
            id:"",
      outsourcevendor:"",
      transferoutconfirm:"",
      outsourcenumber:"",
      outsourcedate:"",
      worknumber:"",
      productnumber:"",
      amount:"",
      process:"",
      price:"",
      cost:"",
       
      ICSorting:"",
      SMT:"",
      PCBCat:"",
      EEPrg:"",
      Testing:"",
      Repair:"",
      Cover:"",
      Marking:"",
      Label:"",
      Packing:"",
      Resorting:"",
      DownGrade:"",
      Reball:"",
      Dismantle:"",
      Dividebin:"",
        })
    }
    render(){
        const defaultProps = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '40rem', height: '11.5rem' },
            borderColor: 'text.primary',
          };
          const defaultProps1 = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '15rem', height: '10rem' },
            borderColor: 'text.primary',
          };
        const theme = createTheme();
        theme.typography.h6={
           fontSize: '3rem',
           '@media (min-width:700px)': {
             fontSize: '3rem',
           },
           [theme.breakpoints.up('md')]: {
             fontSize: '1.2rem',
           },
        }
        const description1style={
            minHeight:'50px',
            resize:'auto',
            padding:'9px',
            boxSizing:'border-box',
            fontSize:'15px',
            width:'200px'
           }
           const description2style={
            minHeight:'120px',
            resize:'auto',
            padding:'9px',
            boxSizing:'border-box',
            fontSize:'15px',
            width:'200px'
           }
           const Columns=[
            {
                title:"委外加工單號",
                field:"outsourcenumber"
            },{
                title:"委外日期",
                field:"outsourcedate"
            },{
                title:"工單單號",
                field:"worknumber"
            },{
                title:"製程",
                field:"process"
            },{
                title:"產品名稱",
                field:"productname"
            },{
                title:"數量",
                field:"amount"
            },{
                title:"單價",
                field:"price"
            },{
                title:"金額",
                field:"costs"
            },
           ]
           return(
            <div className ="content">
              <Box
         display="flex"
         alignItems="flex-start"
         pl={1}
         mt={-5}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
             <Box pl={3}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">請選擇委外加工單號 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1} mt={1}>
          <Autocomplete
                  inputValue={this.state.id}
                  onInputChange={this.handleChangeID}
                  options={this.state.data}   
                  getOptionLabel={(option) => option.id}
                  style={{ width: 200 }}
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
         pl={1}
         mt={-5}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
            <Box >
                 {this.state.showEdit == true || this.state.showadd == true ? 
            <Fragment>
            <TableContainer style={{maxHeight :  500,width:1880 ,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={Columns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 title ="委外加工明細"
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
                </TableContainer>
            </Fragment>: 
            <Fragment>
            <TableContainer style={{maxHeight :  500,width:1880 ,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="委外加工明細"
                 columns={Columns}
                 data ={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={80}
         mt={20}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
          <Box pl={20}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">委外加工廠商 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1} mt={-2}>
          <Autocomplete
                  inputValue={this.state.outsourcevendor}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            outsourcevendor:newValue.outsourcevendor
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                            outsourcevendor:e.target.value
                   })
                    }
                  }}
                  options={this.state.listoutsourcevendor}
                   
                  getOptionLabel={(option) => option.outsourcevendor}
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
                <Box pl={20} mt={-1}>
          <Checkbox
            value = {this.state.transferoutconfirm}
            checked = {this.state.transferoutconfirm}
            onChange={this.handleChecked}
            name ="transferoutconfirm"
        />
        </Box>
                <Box >
                <ThemeProvider theme={theme}>
          <Typography variant="h6">轉出確認 </Typography>
          </ThemeProvider>
                </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={60}
         mt={-5}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
               <Box pl={15}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">委外加工單號 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="id"
           value={this.state.id}
           style={{width:'75%'}}
           />
          </Box>
          
          <Box pl={15}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">委外加工日期 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="outsourcedate"
           value={this.state.outsourcedate}
           style={{width:'75%'}}
           />
          </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={65}
         mt={-5}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
               <Box pl={15}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">工單單號 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="worknumber"
           value={this.state.worknumber}
           style={{width:'75%'}}
           />
          </Box>
          
          <Box pl={20}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">產品代號 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="productnumber"
           value={this.state.productnumber}
           style={{width:'75%'}}
           />
          </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={70}
         mt={-5}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
               <Box pl={15}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="amount"
           value={this.state.amount}
           style={{width:'75%'}}
           />
          </Box>
          
          <Box pl={25}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">製程 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="process"
           value={this.state.process}
           style={{width:'75%'}}
           />
          </Box>
         </Box>
         <Box
          display="flex"
          alignItems="flex-start"
          pl={87}
          mt={-4}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
               <Box  border={1} {...defaultProps}>
                    <Box>
                    <Checkbox
            value = {this.state.ICSorting}
            checked = {this.state.ICSorting}
            onChange={this.handleChecked}
            name ="ICSorting"
                 /> 
                 <Box mt={2}>
                    <Checkbox
                     value = {this.state.Resorting}
            checked = {this.state.Resorting}
            onChange={this.handleChecked}
            name ="Resorting"
                 /> 
                    </Box>
                    <Box mt={2}>
                    <Checkbox
            value = {this.state.Repair}
            checked = {this.state.Repair}
            onChange={this.handleChecked}
            name ="Repair"
                 /> 
                    </Box>
                    </Box>
                    <Box pl={15} mt={-20}>
                    <Checkbox
            value = {this.state.SMT}
            checked = {this.state.SMT}
            onChange={this.handleChecked}
            name ="SMT"
                 /> 
                  <Box pl={-1} mt={2}>
                    <Checkbox
            value = {this.state.Cover}
            checked = {this.state.Cover}
            onChange={this.handleChecked}
            name ="Cover"
                 /> 
                    </Box>  
                    <Box pl={-1} mt={2}>
                    <Checkbox
            value = {this.state.DownGrade}
            checked = {this.state.DownGrade}
            onChange={this.handleChecked}
            name ="DownGrade"
                 /> 
                    </Box>
                    </Box>  
                    <Box pl={30} mt={-19.7}>
                    <Checkbox
            value = {this.state.PCBCat}
            checked = {this.state.PCBCat}
            onChange={this.handleChecked}
            name ="PCBCat"
                 /> 
                  <Box pl={-1} mt={9}>
                    <Checkbox
                     value = {this.state.Reball}
            checked = {this.state.Reball}
            onChange={this.handleChecked}
            name ="Reball"
                 /> 
                    </Box>
                    <Box pl={-1} mt={-12.2}>
                    <Checkbox
            value = {this.state.Marking}
            checked = {this.state.Marking}
            onChange={this.handleChecked}
            name ="Marking"
                 /> 
                    </Box>
                    </Box>
                    <Box pl={45} mt={-12.5}>
                    <Checkbox
            value = {this.state.EEPrg}
            checked = {this.state.EEPrg}
            onChange={this.handleChecked}
            name ="EEPrg"
                 /> 
                  <Box pl={-1} mt={9}>
                    <Checkbox
            value = {this.state.Dismantle}
            checked = {this.state.Dismantle}
            onChange={this.handleChecked}
            name ="Dismantle"
                 /> 
                    </Box>
                    <Box pl={-1} mt={-12.2}>
                    <Checkbox
                    value = {this.state.Label}
            checked = {this.state.Label}
            onChange={this.handleChecked}
            name ="Label"
                 /> 
                    </Box>
                    </Box>
                    <Box pl={60} mt={-12.5}>
                    <Checkbox
            value = {this.state.Testing}
            checked = {this.state.Testing}
            onChange={this.handleChecked}
            name ="Testing"
                 /> 
                  <Box pl={-1} mt={9}>
                    <Checkbox
            value = {this.state.Dividebin}
            checked = {this.state.Dividebin}
            onChange={this.handleChecked}
            name ="Dividebin"
                 /> 
                    </Box>
                    <Box pl={-1} mt={-12.2}>
                    <Checkbox
            value = {this.state.Packing}
            checked = {this.state.Packing}
            onChange={this.handleChecked}
            name ="Packing"
                 /> 
                    </Box>
                    </Box>
                    <Box pl={4} mt={-11.7}>
                    <ThemeProvider theme={theme}>
          <Typography variant="h6">IC Sorting</Typography>
          </ThemeProvider>
                  <Box pl={-1} mt={11}>
                  <ThemeProvider theme={theme}>
          <Typography variant="h6">Resorting</Typography>
          </ThemeProvider>
                    </Box>
                    <Box pl={-1} mt={-11.2}>
                    <ThemeProvider theme={theme}>
          <Typography variant="h6">Repair</Typography>
          </ThemeProvider>
                    </Box>
                    </Box>
                    <Box pl={19} mt={-11}>
                    <ThemeProvider theme={theme}>
          <Typography variant="h6">SMT</Typography>
          </ThemeProvider>
                  <Box pl={-1} mt={11}>
                  <ThemeProvider theme={theme}>
          <Typography variant="h6">Down</Typography>
          <Typography variant="h6">Grade</Typography>
          </ThemeProvider>
                    </Box>
                    <Box pl={-1} mt={-15}>
                    <ThemeProvider theme={theme}>
          <Typography variant="h6">Cover</Typography>
          </ThemeProvider>
                    </Box>
                    </Box>
                    <Box pl={34} mt={-11}>
                    <ThemeProvider theme={theme}>
          <Typography variant="h6">PCB Cut</Typography>
          </ThemeProvider>
                  <Box pl={-1} mt={10.5}>
                  <ThemeProvider theme={theme}>
          <Typography variant="h6">植球</Typography>
          </ThemeProvider>
                    </Box>
                    <Box pl={-1} mt={-10.7}>
                    <ThemeProvider theme={theme}>
          <Typography variant="h6">Marking</Typography>
          </ThemeProvider>
                    </Box>
                    </Box>
                    <Box pl={49} mt={-11}>
                    <ThemeProvider theme={theme}>
          <Typography variant="h6">EE Prg</Typography>
          </ThemeProvider>
                  <Box pl={-1} mt={10.5}>
                  <ThemeProvider theme={theme}>
          <Typography variant="h6">拆板</Typography>
          </ThemeProvider>
                    </Box>
                    <Box pl={-1} mt={-10.7}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Label</Typography>
          </ThemeProvider>
                    </Box>
                    </Box>
                    <Box pl={64} mt={-11}>
                    <ThemeProvider theme={theme}>
          <Typography variant="h6">Testing</Typography>
          </ThemeProvider>
                  <Box pl={-1} mt={10.5}>
                  <ThemeProvider theme={theme}>
          <Typography variant="h6">分Bin</Typography>
          </ThemeProvider>
                    </Box>
                    <Box pl={-1} mt={-10.7}>
                    <ThemeProvider theme={theme}>
          <Typography variant="h6">Packing</Typography>
          </ThemeProvider>
                    </Box>
                    </Box>
               </Box>
          </Box>
          <Box
         display="flex"
         alignItems="flex-start"
         pl={60}
         mt={15}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
               <Box pl={15}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">單價 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="price"
           value={this.state.price}
           style={{width:'75%'}}
           />
          </Box>
          
          <Box pl={15}>
              <ThemeProvider theme={theme}>
          <Typography variant="h6">金額 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="cost"
           value={this.state.cost}
           style={{width:'75%'}}
           />
          </Box>
         </Box>
            </div>
           )
    }
}
export default DataOutsourceEditForm