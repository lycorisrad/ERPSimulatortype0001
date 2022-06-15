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
import Faker from "faker";
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ReactTable from "react-table";
class Sqltest2 extends Component{
     constructor(props){
         super(props);
         this.state={
            data:[],
            IDdata:[],
            id : "",
            showadd:false,
            showEdit:false,
            dataview:{
                title:"",
                name:"",
                surname:"",
            }
        }
   }
   Delete=()=>{
       axios.delete(`posts/${this.state.id}`)
       this.setState({
           id:"",
           IDdata:[],
       })
   }
   All_unlocked=()=>{
       
   }
   PUT=()=>{
       axios.put(`http://localhost:3003/posts/${this.state.id}`,
       {
           id:this.state.id,
           data :
           this.state.IDdata
       }
       )
   }
   POST=()=>{
       axios.post("http://localhost:3003/posts",
         {
             id:this.state.id,
             data : 
             this.state.IDdata,
         }
       )
   }
   ADD=()=>{
       
       this.setState({
           id:"",
           IDdata:[],
       })
   }
   handleChange=(e)=>{
      const name = e.target.name
      const value = e.target.value
      this.setState({
          [name]:value
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
               
            })
        }
        return true;
    })
}
    getOption=()=>{
        const timer  = setInterval(()=>{
            axios.get('http://localhost:3003/posts')
            .then(res=>{
             this.setState(prev => {
                 return {
                     ...prev,
                     data: res.data
                 };
             });
            });
            console.log("更新測試中")
        },10000);
       
    }
    componentDidMount(){
        this.getOption();
    }
 
    render(){
        const Columns=[
            {
                title: "標題",
                field:"title"
            },
            {
                title: "名稱",
                field: "name"
            },
            {
                title: "Surname",
                field: "surname"
            }
        ]
        return (
            <div>
             <Button
          variant="raised"
          style={{ marginTop: "10px" }}
          onClick={this.onClickHandler}
        >
        
         Refresh
        </Button>
        <Box
          display="flex"
          alignItems="flex-start"
          pl={1}
          mt={1}
          bgcolor="background.paper"
          css={{ height: 100 }}
        >
            <Box>
         ID
          </Box>
          <Box >
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
         display="flex"
         alignItems="flex-start"
         pl={80}
         mt={-4}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
          <Box pl={2}>
          <button 
    onClick={this.PUT}>
    儲存
    </button>
          </Box>
          <Box pl={2}>
   <button 
   onClick={this.ADD}>
      新增
   </button>
    </Box>
    </Box>
        <Box
          display="flex"
          alignItems="flex-start"
          pl={1}
          mt={10}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
           <TableContainer  style={{width:1880 ,maxHeight : 400,border: "5px solid rgba(224, 224, 224, 1)"}}>
           <Table
                 columns={Columns}
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="重包"
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
        </Box>
        
            </div>
        )
    }
}
export default Sqltest2