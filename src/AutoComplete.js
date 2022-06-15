import React, { Component,createRef } from 'react';
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
import { Form,Input,Menu,Dropdown} from 'antd';
import { PropTypes } from 'prop-types';
import "./styles.css";
import Select from 'react-select'
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
import { DropDownMenu } from 'material-ui';

const FormItem = Form.Item
class AutoComplete extends Component {
   constructor(props){
       super(props);
       this.state={
           listvendor:[],
        vendor:{},
       }
   }
   getOption=()=>{
       axios.get("/listvendor")
       .then(res=>{
           this.setState({
               listvendor:res.data
           })
       })
   }
   componentDidMount(){
    this.getOption();
    }
    getcheck =()=>{
        console.log(this.state.listvendor)
        console.log(this.state.vendor)
    }

   handleChange=(e)=>{
       const name= e.target.name
       const value = e.target.value
       this.setState({
           vendor:value
       })
   }
   clear =(e)=>{
       e.target.value="";
   }
   render(){
       const axiosvendor = this.state.listvendor.map((item ,index)=>{
             return <select value={this.state.vendor} ><option key={index} value ={item.vendor}>{item.vendor}</option></select>
        })
       return(
           <div>
            <input 
             list="opts"
             value={this.state.vendor}
             onChange={this.handleChange}
             onFocus={this.clear}
             />
            <datalist id="opts">
             {axiosvendor}
            </datalist>
            <button onClick={this.getcheck}>檢查</button>
           </div>
       )
   }
}

export default AutoComplete;