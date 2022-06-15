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
import Faker from "faker";
class Sqltest extends Component{
    constructor(props){
      super(props);
       this.state ={
         users:[],
         columns:[],
         maxData:10,
         delay:5,
         iteration: 500,
       }
       Faker.locale = "fr_CA";
       this.onClickHandler = this.onClickHandler.bind(this);
    }
    generateColumns() {
      this.setState({
        columns: [
          { Header: "Title", accessor: "title" },
          {
            Header: "Name",
            accessor: "name",
            filterMethod: (filter, row) => {
              return row[filter.id].includes(filter.value);
            }
          },
          { Header: "Surname", accessor: "surname" },
        ]
      });
    }
  
    generateUsers(){
      for(let i =0 ; i < this.state.maxData ; i++){
        const user = {
          title: Faker.name.title(),
          name:Faker.name.firstName(),
          surname:Faker.name.lastName(),

        }
        this.setState(prev =>({
          users:[...prev.users,user]
        }));
      }
    }
    componentDidMount(){
      this.generateUsers();
    }
    onClickHandler(){
      this.setState({users : [] });
      this.generateUsers();
    }
    updateInputValue(e){
      switch(e.target.id){
         case "delay":
            this.setState({
              delay: e.target.value
            });
              break;
         case "iteration":
            this.setState({
              iteration: e.target.value
            });
            break;
          default:
            break;
      }
    }
    render(){
       if(Object.entries(this.state.columns).length === 0) this.generateColumns();
        return(
          <div>
            <Button
              variant="raised"
              style={{marginTop: "10px"}}
              onClick={this.onClickHandler}
            >
              更新
            </Button>
          </div>
        )
      }

}
export default Sqltest