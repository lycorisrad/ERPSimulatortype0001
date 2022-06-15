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
import { FormatListNumbered } from '@material-ui/icons';


var calculator = document.querySelector("form");
class WorkOrderEnterForm extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            IDdata:[],
            
            listtransferoutorder:[],
            listbuynumber:[],
            listlevel:[],
            liststorageclass:[],
            listenterstoragespeicies:[],
            listserialnumber:[],
            listbin:[],
            listfrequency:[],
            listclvalue:[],
            listbenchmark:[],
            listtestprogram:[],
            listcapability:[],
            enterspeciesalarm:false,
            levelalarm:false,
            
            checked:[],

            showenterstorage:false,
            enterstorage:"入庫",

            id:"",
            worknumber:"",
            transferorder:false,
            transferoutorder:"",
            productcodename:"",
            pcbno:"",
            buynumber:"",
            level:"",
            storageclass:"",
            enterstorageamount:"",
            enterstorageperson:"",

            process:"",
            enterstoragespeicies:"",
            serialnumber:"",
            bin:"",
            frequency:"",
            clvalue:"",
            benchmark:"",
            testprogram:"",
            capability:"",
            description:"",
           
            ICSorting:false,
            SMT:false,
            PCBCut:false,
            EEPrg:false,
            Testing:false,
            Repair:false,
            Cover:false,
            Marking:false,
            Label:false,
            Packing:false,
            Resorting:false,
            DowGrade:false,
            Reball:false,
            Dismantle:false,
            dividebin:false,

             Dataview:{
                 workumber:"",
                 productnumber:"",
                 unenterstorageamount:"",
                 pcbno:"",
             }
        }
    }
    getAllOption=()=>{
  
        axios.all([
            axios.get("http://localhost:3003/listtransferoutorder"),
            axios.get("http://localhost:3003/listbuynumber"),
            axios.get("http://localhost:3003/listlevel"),
            axios.get("http://localhost:3003/liststorageclass"),
            axios.get("http://localhost:3003/listenterstoragespeicies"),
            axios.get("http://localhost:3003/listserialnumber"),
            axios.get("http://localhost:3003/listbin"),
            axios.get("http://localhost:3003/listfrequency"),
            axios.get("http://localhost:3003/listclvalue"),
            axios.get("http://localhost:3003/listbenchmark"),
            axios.get("http://localhost:3003/listtestprogram"),
            axios.get("http://localhost:3003/listcapability"),
        ])
        .then(
            axios.spread((
                res,
                res1,
                res2,
                res3,
                res4,
                res5,
                res6,
                res7,
                res8,
                res9,
                res10,
                res11
            )=>{
                this.setState({
                    listtransferoutorder:res.data,
            listbuynumber:res1.data,
            listlevel:res2.data,
            liststorageclass:res3.data,
            listenterstoragespeicies:res4.data,
            listserialnumber:res5.data,
            listbin:res6.data,
            listfrequency:res7.data,
            listclvalue:res8.data,
            listbenchmark:res9.data,
            listtestprogram:res10.data,
            listcapability:res11.data,
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
            worknumber:item.worknumber,
            transferorder:item.transferorder,
            transferoutorder:item.transferoutorder,
            productcodename:item.productcodename,
            pcbno:item.pcbno,
            buynumber:item.buynumber,
            level:item.level,
            storageclass:item.storageclass,
            enterstorageamount:item.enterstorageamount,
            enterstorageperson:item.enterstorageperson,

            process:item.process,
            enterstoragespeicies:item.enterstoragespeicies,
            serialnumber:item.serialnumber,
            bin:item.bin,
            frequency:item.frequency,
            clvalue:item.clvalue,
            benchmark:item.benchmark,
            testprogram:item.testprogram,
            capability:item.capability,
            description:item.description,
           
            ICSorting:item.ICSorting,
            SMT:item.SMT,
            PCBCut:item.PCBCut,
            EEPrg:item.EEPrg,
            Testing:item.Testing,
            Repair:item.Repair,
            Cover:item.Cover,
            Marking:item.Marking,
            Label:item.Label,
            Packing:item.Packing,
            Resorting:item.Resorting,
            DowGrade:item.DowGrade,
            Reball:item.Reball,
            Dismantle:item.Dismantle,
            dividebin:item.dividebin,

                })
            }
            return true
        })
    }
    handlesave=()=>{
        if(this.state.enterspeciesalarm === false && this.state.levelalarm === false){
            this.PUT()
            this.setState({
                buttonText:"入庫"
            })
        }
        }
        PUT=()=>{
            axios.put(`http://localhost:3003/data/${this.state.id}`,
            {
                id:this.state.id,
                worknumber:this.state.worknumber,
                transferorder:this.state.transferorder,
                transferoutorder:this.state.transferoutorder,
                productcodename:this.state.productcodename,
                pcbno:this.state.pcbno,
                buynumber:this.state.buynumber,
                level:this.state.level,
                storageclass:this.state.storageclass,
                enterstorageamount:this.state.enterstorageamount,
                enterstorageperson:this.state.enterstorageperson,
    
                process:this.state.process,
                enterstoragespeicies:this.state.enterstoragespeicies,
                serialnumber:this.state.serialnumber,
                bin:this.state.bin,
                frequency:this.state.frequency,
                clvalue:this.state.clvalue,
                benchmark:this.state.benchmark,
                testprogram:this.state.testprogram,
                capability:this.state.capability,
                description:this.state.description,
               
                ICSorting:this.state.ICSorting,
                SMT:this.state.SMT,
                PCBCut:this.state.PCBCut,
                EEPrg:this.state.EEPrg,
                Testing:this.state.Testing,
                Repair:this.state.Repair,
                Cover:this.state.Cover,
                Marking:this.state.Marking,
                Label:this.state.Label,
                Packing:this.state.Packing,
                Resorting:this.state.Resorting,
                DowGrade:this.state.DowGrade,
                Reball:this.state.Reball,
                Dismantle:this.state.Dismantle,
                dividebin:this.state.dividebin,
            data :
            this.state.IDdata,
        })}
        handlecancel=()=>{
            this.state.data.map((item,index)=>{
                if(this.state.id === item.id ){
                    this.setState({
                        IDdata:item.data,
                        id:item.id,
                        worknumber:item.worknumber,
                        transferorder:item.transferorder,
                        transferoutorder:item.transferoutorder,
                        productcodename:item.productcodename,
                        pcbno:item.pcbno,
                        buynumber:item.buynumber,
                        level:item.level,
                        storageclass:item.storageclass,
                        enterstorageamount:item.enterstorageamount,
                        enterstorageperson:item.enterstorageperson,
            
                        process:item.process,
                        enterstoragespeicies:item.enterstoragespeicies,
                        serialnumber:item.serialnumber,
                        bin:item.bin,
                        frequency:item.frequency,
                        clvalue:item.clvalue,
                        benchmark:item.benchmark,
                        testprogram:item.testprogram,
                        capability:item.capability,
                        description:item.description,
                       
                        ICSorting:item.ICSorting,
                        SMT:item.SMT,
                        PCBCut:item.PCBCut,
                        EEPrg:item.EEPrg,
                        Testing:item.Testing,
                        Repair:item.Repair,
                        Cover:item.Cover,
                        Marking:item.Marking,
                        Label:item.Label,
                        Packing:item.Packing,
                        Resorting:item.Resorting,
                        DowGrade:item.DowGrade,
                        Reball:item.Reball,
                        Dismantle:item.Dismantle,
                        dividebin:item.dividebin,
                    })
                }
                else {
                    this.setState({
                        IDdata:"",
                        id:"",
            worknumber:"",
            transferorder:false,
            transferoutorder:"",
            productcodename:"",
            pcbno:"",
            buynumber:"",
            level:"",
            storageclass:"",
            enterstorageamount:"",
            enterstorageperson:"",

            process:"",
            enterstoragespeicies:"",
            serialnumber:"",
            bin:"",
            frequency:"",
            clvalue:"",
            benchmark:"",
            testprogram:"",
            capability:"",
            description:"",
           
            ICSorting:false,
            SMT:false,
            PCBCut:false,
            EEPrg:false,
            Testing:false,
            Repair:false,
            Cover:false,
            Marking:false,
            Label:false,
            Packing:false,
            Resorting:false,
            DowGrade:false,
            Reball:false,
            Dismantle:false,
            dividebin:false,
                    })
                }
                return true;
            })
            this.setState({
                showadd:false,
                showEdit:false,
            })
         }
        
         handlelevelalarm=()=>{
             this.setState({
                levelalarm:!this.state.levelalarm
             })
         }
         handlealarm=()=>{
            this.setState({
                enterspeciesalarm:!this.state.enterspeciesalarm
            })
         }
         handleshowEdit=()=>{
            if(this.state.level === "" ){
                 this.setState({
                    levelalarm:!this.state.levelalarm
                 })
            }
            else if(this.state.enterstoragespeicies === ""){
                this.setState({
                    enterspeciesalarm:!this.state.enterspeciesalarm
                })
           }
            else{
            this.setState({
                showenterstorage:!this.state.showenterstorage
            })
        }
        }
        render(){
            const defaultProps = {
                bgcolor: 'background.paper',
                m: 1,
                style: { width: '60rem', height: '13rem' },
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
                minHeight:'100px',
                resize:'auto',
                padding:'9px',
                boxSizing:'border-box',
                fontSize:'15px',
                width:'1200px'
               }
            const Columns=[
                {
                    title:"工單單號",
                    field:"workumber",
                },
                {
                    title:"產品代號",
                    field:"productnumber",
                },
                {
                    title:"未入庫數量",
                    field:"unenterstorageamount",
                },
                {
                    title:"PCB No",
                    field:"pcbno",
                },
            ]
            return(
                <div className ="content">
                <Modal isOpen={this.state.enterspeciesalarm} toggle={this.handleshowEdit} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        請輸入入庫種類!
        </ModalBody>
          <ModalFooter>
          <div>
       <button onClick={this.handlealarm}>確定</button>
      </div>
         </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.levelalarm} toggle={this.handleshowEdit} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        請輸入等級!
        </ModalBody>
          <ModalFooter>
          <div>
       <button onClick={this.handlelevelalarm}>確定</button>
      </div>
         </ModalFooter>
          </Modal>
                    <Box
         display="flex"
         alignItems="flex-start"
         pl={80}
         mt={1}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
             <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">請選擇欲入庫工單單號 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
        <Autocomplete
                  inputValue={this.state.id}
                  disabled={this.state.showadd || this.state.showEdit}
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
          pl={15}
          mt={3}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                {this.state.showEdit == true || this.state.showadd == true ? 
                    <Fragment>
            <TableContainer  style={{width:1500 ,maxHeight : 600,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 stickyHeader
                 columns={Columns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="未結工單明細"
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
            <TableContainer style={{maxHeight : 600 ,width:1500,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="未結工單明細"
                 columns={Columns}
                 data ={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1,paging: true}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
            <Box
          display="flex"
          alignItems="flex-start"
          pl={35}
          mt={50}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
               <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">工單單號 :</Typography>
          </ThemeProvider>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">產品代號 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">採購單號 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={4.8} mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">倉別 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">入庫數量 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          <Box pl={55}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">轉單</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={45} >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">轉出工單 :</Typography>
          </ThemeProvider>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">PCB No :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={4} mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">等級 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">入庫人員 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          </Box>
          <Box
         display="flex"
         alignItems="flex-start"
         pl={47}
         mt={-12}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
           <Box mt={-1} >
          <TextField
           name="worknumber"
           value={this.state.worknumber}
           onChange ={this.handleChange}
           style={{width:'100%'}}
           />
           <Box mt={3}>
          <TextField
           name="productcodename"
           value={this.state.productcodename}
           onChange ={this.handleChange}
           style={{width:'150%'}}
           />
           </Box>
           <Box mt={1}>
        <Autocomplete
                  inputValue={this.state.buynumber}
                  onChange={(event,newValue)=>{
                          this.setState({
                            buynumber:newValue.buynumber
                          })
                  }}
                  onInputChange={(e)=>{        
                        this.setState({
                            buynumber:e.target.value
                   })
                  }}
                  options={this.state.listbuynumber}
                   
                  getOptionLabel={(option) => option.buynumber}
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
        <Box >
        <Autocomplete
                  inputValue={this.state.storageclass}
                  onChange={(event,newValue)=>{      
                          this.setState({
                            storageclass:newValue.storageclass
                          })
                  }}
                  onInputChange={(e)=>{
                        this.setState({
                            storageclass:e.target.value
                   })
                  }}
                  options={this.state.liststorageclass}
                   
                  getOptionLabel={(option) => option.storageclass}
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
           <Box mt={1}>
          <TextField
           name="enterstorageamount"
           value={this.state.enterstorageamount}
           onChange ={this.handleChange}
           style={{width:'100%'}}
           />
           </Box>
           </Box>
           <Box pl={25} mt={-1.5}>
          <Checkbox
            value = {this.state.transferorder}
            checked = {this.state.transferorder}
            onChange={this.handleChecked}
            name ="transferorder"
        />
        </Box>
        <Box pl={61} mt={-3}>
        <Autocomplete
                  inputValue={this.state.transferoutorder}
                  onChange={(event,newValue)=>{
                          this.setState({
                            transferoutorder:newValue.transferoutorder
                          })
                  }}
                  onInputChange={(e)=>{
                        this.setState({
                            transferoutorder:e.target.value
                   })
                  }}
                  options={this.state.listtransferoutorder}
                   
                  getOptionLabel={(option) => option.transferoutorder}
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
                  <Box mt={2}>
          <TextField
           name="pcbno"
           value={this.state.pcbno}
           onChange ={this.handleChange}
           style={{width:'100%'}}
           />
           </Box>
           <Box mt={0.5}>
        <Autocomplete
                  inputValue={this.state.level}
                  onChange={(event,newValue)=>{
                          this.setState({
                            level:newValue.level
                          })
                  }}
                  onInputChange={(e)=>{
                        this.setState({
                            level:e.target.value
                   })
                  }}
                  options={this.state.listlevel}
                   
                  getOptionLabel={(option) => option.level}
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
                <Box mt={0.5}>
        <Autocomplete
                  inputValue={this.state.enterstorageperson}
                  onChange={(event,newValue)=>{
                          this.setState({
                            enterstorageperson:newValue.enterstorageperson
                          })
                  }}
                  onInputChange={(e)=>{
                        this.setState({
                            enterstorageperson:e.target.value
                   })
                  }}
                  options={this.state.listenterstorageperson}
                   
                  getOptionLabel={(option) => option.enterstorageperson}
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
         </Box>
      
         <Box 
        pr={15}
        mt={25}
        display="flex" 
        justifyContent="center">
         <Box border={1}  {...defaultProps}>
         <Box pl={5.5} mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">IC Sorting</Typography>
          </ThemeProvider>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">Repair</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">Resorting</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          <Box pl={30} mt={-18}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">SMT</Typography>
          </ThemeProvider>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">Cover</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">DownGrade</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          <Box pl={55} mt={-18}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">PCB Cat</Typography>
          </ThemeProvider>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">Marking</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">植球</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          <Box pl={80} mt={-18}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">EE Prg</Typography>
          </ThemeProvider>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">Label</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">拆板</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          <Box pl={105} mt={-18}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">Testing</Typography>
          </ThemeProvider>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">Packing</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h5">分Bin</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          <Box pl={1} mt={-18.5}>
          <Checkbox
              value={this.state.ICSorting}
              checked={this.state.ICSorting}
              onChange={this.handleChecked}
              name="ICSorting"
             />
          <Box mt={1.5}>
          <Checkbox
              value={this.state.Repair}
              checked={this.state.Repair}
              onChange={this.handleChecked}
              name="Repair"
             />
          </Box>
          <Box mt={2}>
          <Checkbox
              value={this.state.Resorting}
              checked={this.state.Resorting}
              onChange={this.handleChecked}
              name="Resorting"
             />
          </Box>
          </Box>
          <Box pl={25.5} mt={-19}>
          <Checkbox
              value={this.state.SMT}
              checked={this.state.SMT}
              onChange={this.handleChecked}
              name="SMT"
             />
          <Box mt={1.5}>
          <Checkbox
              value={this.state.Cover}
              checked={this.state.Cover}
              onChange={this.handleChecked}
              name="Cover"
             />
          </Box>
          <Box mt={2}>
          <Checkbox
              value={this.state.DowGrade}
              checked={this.state.DowGrade}
              onChange={this.handleChecked}
              name="DowGrade"
             />
          </Box>
          </Box>
          <Box pl={50.5} mt={-19.5}>
          <Checkbox
              value={this.state.PCBCut}
              checked={this.state.PCBCut}
              onChange={this.handleChecked}
              name="PCBCut"
             />
          <Box mt={1.5}>
          <Checkbox
              value={this.state.Marking}
              checked={this.state.Marking}
              onChange={this.handleChecked}
              name="Marking"
             />
          </Box>
          <Box mt={2}>
          <Checkbox
              value={this.state.Reball}
              checked={this.state.Reball}
              onChange={this.handleChecked}
              name="Reball"
             />
          </Box>
          </Box>
          <Box pl={75} mt={-19.5}>
          <Checkbox
              value={this.state.EEPrg}
              checked={this.state.EEPrg}
              onChange={this.handleChecked}
              name="EEPrg"
             />
          <Box mt={1.5}>
          <Checkbox
              value={this.state.Label}
              checked={this.state.Label}
              onChange={this.handleChecked}
              name="Label"
             />
          </Box>
          <Box mt={2}>
          <Checkbox
              value={this.state.Dismantle}
              checked={this.state.Dismantle}
              onChange={this.handleChecked}
              name="Dismantle"
             />
          </Box>
          </Box>
          <Box pl={100} mt={-19.5}>
          <Checkbox
              value={this.state.Testing}
              checked={this.state.Testing}
              onChange={this.handleChecked}
              name="Testing"
             />
          <Box mt={1.5}>
          <Checkbox
              value={this.state.Packing}
              checked={this.state.Packing}
              onChange={this.handleChecked}
              name="Packing"
             />
          </Box>
          <Box mt={2}>
          <Checkbox
              value={this.state.dividebin}
              checked={this.state.dividebin}
              onChange={this.handleChecked}
              name="dividebin"
             />
          </Box>
          </Box>
          </Box>
       </Box>
       <Box
          display="flex"
          alignItems="flex-start"
          pl={40}
          mt={5}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
               <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">製程 :</Typography>
          </ThemeProvider>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">序號 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">頻率 :</Typography>
          </ThemeProvider>
          </Box>
          <Box  mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">測試平台 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">容量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">備註 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          <Box pl={95} >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">入庫種類 :</Typography>
          </ThemeProvider>
          <Box mt={3} pl={5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">BIN :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={4} mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">CL值 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">測試程式 :</Typography>
          </ThemeProvider>
          </Box>
          </Box>
          
          </Box>
          <Box
         display="flex"
         alignItems="flex-start"
         pl={47}
         mt={-12}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
           <Box mt={-1} >
          <TextField
           name="process"
           value={this.state.process}
           style={{width:'100%'}}
           />
           <Box mt={1}>
           <Autocomplete
                  inputValue={this.state.serialnumber}
                  onChange={(event,newValue)=>{
                          this.setState({
                            serialnumber:newValue.serialnumber
                          })
                  }}
                  onInputChange={(e)=>{
                        this.setState({
                            serialnumber:e.target.value
                   })
                  }}
                  options={this.state.listserialnumber}
                   
                  getOptionLabel={(option) => option.serialnumber}
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
           <Box >
        <Autocomplete
                  inputValue={this.state.frequency}
                  onChange={(event,newValue)=>{
                          this.setState({
                            frequency:newValue.frequency
                          })
                  }}
                  onInputChange={(e)=>{
                        this.setState({
                            frequency:e.target.value
                   })
                  }}
                  options={this.state.listfrequency}
                   
                  getOptionLabel={(option) => option.frequency}
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
        <Box pl={5} mt={-1}>
        <Autocomplete
                  inputValue={this.state.benchmark}
                  onChange={(event,newValue)=>{
                          this.setState({
                            benchmark:newValue.benchmark
                          })
                  }}
                  onInputChange={(e)=>{
                        this.setState({
                            benchmark:e.target.value
                   })
                  }}
                  options={this.state.listbenchmark}
                   
                  getOptionLabel={(option) => option.benchmark}
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
           <Box mt={0.5}>
           <Autocomplete
                  inputValue={this.state.capability}
                  onChange={(event,newValue)=>{
                          this.setState({
                            capability:newValue.capability
                          })
                  }}
                  onInputChange={(e)=>{
                        this.setState({
                            capability:e.target.value
                   })
                  }}
                  options={this.state.listcapability}
                   
                  getOptionLabel={(option) => option.capability}
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
      
        <Box pl={86} mt={-3}>
        <Autocomplete
                  inputValue={this.state.enterstoragespeicies}
                  onChange={(event,newValue)=>{
                          this.setState({
                            enterstoragespeicies:newValue.enterstoragespeicies
                          })
                  }}
                  onInputChange={(e)=>{
                        this.setState({
                            enterstoragespeicies:e.target.value
                   })
                  }}
                  options={this.state.listenterstoragespeicies}
                   
                  getOptionLabel={(option) => option.enterstoragespeicies}
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
                  <Box >
                  <Autocomplete
                  inputValue={this.state.bin}
                  onChange={(event,newValue)=>{
                          this.setState({
                            bin:newValue.bin
                          })
                  }}
                  onInputChange={(e)=>{
                        this.setState({
                            bin:e.target.value
                   })
                  }}
                  options={this.state.listbin}
                   
                  getOptionLabel={(option) => option.bin}
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
           <Box mt={0.5}>
        <Autocomplete
                  inputValue={this.state.clvalue}
                  onChange={(event,newValue)=>{
                          this.setState({
                            clvalue:newValue.clvalue
                          })
                  }}
                  onInputChange={(e)=>{
                        this.setState({
                            clvalue:e.target.value
                   })
                  }}
                  options={this.state.listclvalue}
                   
                  getOptionLabel={(option) => option.clvalue}
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
                <Box mt={0.5}>
        <Autocomplete
                  inputValue={this.state.testprogram}
                  onChange={(event,newValue)=>{
                          this.setState({
                            testprogram:newValue.testprogram
                          })
                  }}
                  onInputChange={(e)=>{
                        this.setState({
                            testprogram:e.target.value
                   })
                  }}
                  options={this.state.listtestprogram}
                   
                  getOptionLabel={(option) => option.testprogram}
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
         </Box>
         <Box
          display="flex"
          alignItems="flex-start"
          pl={47}
          mt={20}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
         <Box mt={1}>
           <textarea
           style={description1style}
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
         pl={130}
         mt={1}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
             <Box pl={2}>
    <button  onClick={this.handleshowEdit}>
       {this.state.enterstorage}
    </button>
    </Box>
         </Box>
            </div>
            )
        }
      
}
export default WorkOrderEnterForm