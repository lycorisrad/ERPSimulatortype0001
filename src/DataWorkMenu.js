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
import Dropdown from 'react-multilevel-dropdown';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import DataWorkOrder from './DataWorkOrder';
import DataWorkEnterstorage from './DataWorkEnterstorage';
import DataWorkICSorting from './DataWorkICSorting';
import DataWorkMarking from './DataWorkMarking';
import DataWorkPacking from './DataWorkPacking';
import DataWorkQC from './DataWorkQC';
import DataWorkQCSorting from './DataWorkQCSorting';
import DataWorkRepair from './DataWorkRepair';
import DataWorkShip from './DataWorkShip';
import DataWorkSMT from './DataWorkSMT';
import DataWorkSPD from './DataWorkSPD';
import DataWorkTEST from './DataWorkTEST';

class DataWorkMenu extends Component{
      constructor(props){
          super(props);
          this.state={
            data:[],
            casedID:"",
            uncasedID:"",
          }
      }
      getOption =()=>{
        axios.get("http://localhost:3003/posts")
        .then(res=>{
          this.setState({
            data:res.data
          })
        })
      }
      componentDidMount(){
        this.getOption();
      }
      handleChangecasedID=(e,values)=>{
          this.setState({
              casedID:values.casedID
          })
      }
      handleChangeuncasedID=(e,values)=>{
          this.setState({
            uncasedID : values.uncasedID
          })
      }
      render(){
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
          return (
              <div>
     <Box
     display="flex"
     alignItems="flex-start"
     pl={1}
     m={1}
     bgcolor="background.paper"
     css={{ height: 100 }}
     >
      <Box pl={12.5} mt={2}>
              未結案:
        </Box>
        <Box pl={1}>
        <Autocomplete
                  inputValue={this.state.uncasedID}
                  disabled={this.state.showadd || this.state.showEdit}
                  onInputChange={this.handleChangeuncasedID}
                  options={this.state.data}   
                  getOptionLabel={(option) => option.uncasedID}
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
        <Box pb={3} pl={15}>
            <Icon fontSize='large'>ERP系統模擬</Icon>
            </Box>
            <Box pl={20} mt={2}>
              已結案:
            </Box> 
            <Box pl={1}>
        <Autocomplete
                  inputValue={this.state.casedID}
                  disabled={this.state.showadd || this.state.showEdit}
                  onInputChange={this.handleChangecasedID}
                  options={this.state.data}
                  getOptionLabel={(option) => option.casedID}
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
     <Router>
     <Box
         display="flex"
         alignItems="flex-start"
         pl={10}
         mt={-7}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
          <Dropdown.Item>
          <Link to="/">
          <ThemeProvider theme={theme}>
          <Typography variant="h6">工單</Typography>
          </ThemeProvider>
          </Link>
          </Dropdown.Item>
          <Dropdown.Item>
          <Link to="/DataWorkShip">
          <ThemeProvider theme={theme}>
          <Typography variant="h6">進貨</Typography>
          </ThemeProvider>
          </Link>
          </Dropdown.Item>
          <Dropdown.Item>
          <Link to="/DataWorkSMT">
          <ThemeProvider theme={theme}>
          <Typography variant="h6">SMT</Typography>
          </ThemeProvider>
          </Link>
          </Dropdown.Item>
          <Dropdown.Item>
          <Link to="/DataWorkSPD">
          <ThemeProvider theme={theme}>
          <Typography variant="h6">SPD</Typography>
          </ThemeProvider>
          </Link>
          </Dropdown.Item>
          <Dropdown.Item>
          <Link to="/DataWorkTEST">
          <ThemeProvider theme={theme}>
          <Typography variant="h6">測試</Typography>
          </ThemeProvider>
          </Link>
          </Dropdown.Item>
          <Dropdown.Item>
          <Link to="/DataWorkRepair">
          <ThemeProvider theme={theme}>
          <Typography variant="h6">維修</Typography>
          </ThemeProvider>
          </Link>
          </Dropdown.Item>
          <Dropdown.Item>
          <Link to="/DataWorkQC">
          <ThemeProvider theme={theme}>
          <Typography variant="h6">QC</Typography>
          </ThemeProvider>
          </Link>
          </Dropdown.Item>
          <Dropdown.Item>
          <Link to="/DataWorkMarking">
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Marking</Typography>
          </ThemeProvider>
          </Link>
          </Dropdown.Item>
          <Dropdown.Item>
          <Link to="/DataWorkPacking">
          <ThemeProvider theme={theme}>
          <Typography variant="h6">包裝</Typography>
          </ThemeProvider>
          </Link>
          </Dropdown.Item>
          <Dropdown.Item>
          <Link to="/DataWorkEnterstorage">
          <ThemeProvider theme={theme}>
          <Typography variant="h6">入庫</Typography>
          </ThemeProvider>
          </Link>
          </Dropdown.Item>
         </Box>
         <div>
         <Box
         display="flex"
         alignItems="flex-start"
         pl={1}
         mt={-7}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
         <Route exact path="/" component={DataWorkOrder}/>
         <Route path="/DataWorkEnterstorage" component={DataWorkEnterstorage}/>
         <Route path="/DataWorkICSorting" component={DataWorkICSorting}/>
         <Route path="/DataWorkMarking" component={DataWorkMarking}/>
         <Route path="/DataWorkPacking" component={DataWorkPacking}/>
         <Route path="/DataWorkQC" component={DataWorkQC}/>
         <Route path="/DataWorkQCSorting" component={DataWorkQCSorting}/>
         <Route path="/DataWorkRepair" component={DataWorkRepair}/>
         <Route path="/DataWorkShip" component={DataWorkShip}/>
         <Route path="/DataWorkSMT" component={DataWorkSMT}/>
         <Route path="/DataWorkSPD" component={DataWorkSPD}/>
         <Route path="/DataWorkTEST" component={DataWorkTEST}/>
         </Box>
         </div>
     </Router>
              </div>
          )
      }
}
export default DataWorkMenu