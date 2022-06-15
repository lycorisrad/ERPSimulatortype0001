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
class DataAddpartnumber extends Component{
     constructor(props){
         super(props);
         this.state={
            data:[],
            showadd :false,

            productcodename:"",
            productspecification:"",
            icdie:"",

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
     handlecancel=()=>{
         this.setState({
            productcodename:"",
            productspecification:"",
            icdie:"",
         })
        }
        handleChange=(e)=>{
            const name = e.target.name
            const value = e.target.value
           
            this.setState({
                [name]:value
            })
           
        }
        POST=()=>{
            axios.post("/posts",
            {
                productcodename:this.state.productcodename,
                productspecification:this.state.productspecification,
                icdie:this.state.icdie,
            })
        }
        handleadd=()=>{
            this.setState({
                showadd:!this.state.showadd
            })
        }
        clear =(e)=>{
            e.target.value="";
        }
     componentDidMount(){
         this.getOption();
     }
     render(){
        const defaultProps = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '8rem', height: '1.5rem' },
            borderColor: 'text.primary',
          };
         return (
            <div className="content">
            <Modal isOpen={this.state.showadd} toggle={this.handleadd} >
      <ModalHeader>警告</ModalHeader>
      <ModalBody>
      確定新增這筆資料嗎?
      </ModalBody>
    <ModalFooter>
    <div>
     <button onClick={this.POST}>確定</button>
     <button onClick={this.handleadd}>取消</button>
    </div>
    </ModalFooter>
   </Modal>
   <Box
         display="flex"
         alignItems="flex-start"
         pl={20}
         mt={1}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
                <Box 
                display="flex" 
                justifyContent="center" 
                border={1} 
                {...defaultProps}>
                    產品代號
                </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={17}
         mt={-8}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
         <Box pl={1}>
              <TextField
              id="outlined-basic" 
              variant="outlined"
               name="productcodename"
               value={this.state.productcodename}
               style={{width:'80%'}}
               onChange = {this.handleChange}
               />
               </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={20}
         mt={-5}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
             <Box 
                display="flex" 
                justifyContent="center" 
                border={1} 
                {...defaultProps}>
                    品名規格
                </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={17}
         mt={-8}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
            <Box pl={1}>
              <TextField
              id="outlined-basic" 
              variant="outlined"
               name="productspecification"
               value={this.state.productspecification}
               style={{width:'80%'}}
               onChange = {this.handleChange}
               />
               </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={20}
         mt={-5}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
             <Box 
                display="flex" 
                justifyContent="center" 
                border={1} 
                {...defaultProps}>
                    IC DIE
                </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={18}
         mt={-8}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
         <Box>
             <TextField
             id="outlined-basic" 
              variant="outlined"
               name="icdie"
               value={this.state.icdie}
               style={{width:'80%'}}
               onChange = {this.handleChange}
               />
               </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={20}
         mt={-1}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
         <Box pl={2}>
          <button onClick ={this.handleadd}>新增</button>
         </Box>
         <Box pl={2}>
           <button onClick ={this.handlecancel}>清除</button>
         </Box>
         </Box>
            </div>
         )
     }
}
export default DataAddpartnumber