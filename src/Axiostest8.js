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
import Axiostest7 from './Axiostest7';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';

class Axiostest8 extends Component{
    constructor(props){
        super(props);
        this.state={
           vendor : "",
           vendor2: "",
           open:false,
           listvendor:[],
           listclass:[],
        }
    }
    handleCheck=()=>{
        console.log(this.state.vendor);
        console.log(this.state.vendor2);
    }
    handleInputChange=(e,newInputValue)=>{
        this.setState({
         vendor:newInputValue
        })
    }
    getlistvendor=()=>{
        axios.get("/listvendor")
        .then(res=>{
            this.setState({
                listvendor : res.data
            })
        })
    }
    getlistclass=()=>{
        axios.get("/listclass")
        .then(res=>{
            this.setState({
                listclass : res.data
            })
        })
    }
    componentDidMount(){
        this.getlistvendor();
        this.getlistclass();
    }
    render(){
        return (
            <div>
                <Autocomplete
                  id="combo-box-demo"
                  freeSolo
                  inputValue={this.state.vendor}
                  onInputChange={this.handleInputChange}
                  options={this.state.listvendor}
                  filterOptions={(options, state) => options}
                  getOptionLabel={(option) => (option.vendor ? option.vendor : "")}
                  style={{ width: 100 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullWidth />
                  )}
                />
                 
                <button onClick={this.handleCheck}>檢查</button>
                </div>
              );
            }
}
export default Axiostest8

  