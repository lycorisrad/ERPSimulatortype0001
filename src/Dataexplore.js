import React ,{Component, useLayoutEffect} from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Form,Dropdown,Button,Container } from 'react-bootstrap';
import {CSVLink} from 'react-csv';
import { spacing } from '@material-ui/system';
import Icon from '@material-ui/core/Icon';
import axios from "./axios";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { flexbox } from '@material-ui/system';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { MDBInput } from "mdbreact";
import SvgIcon from '@material-ui/core/SvgIcon';
import { sizing } from '@material-ui/system';
import Select from 'react-select';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';
import DataExploreResult from "./DataExploreResult";
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider
  } from "@material-ui/pickers";
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

class Dataexplore extends Component{
    constructor(props){
        super(props);
        this.state={
            axiosparams:[],
            filteraxiosparams:[],
            storageclass:[],
            level:[],
            pregivedate:[],
            backNumber:[],
            bollowNumber:[],
            actdate:[],
            productnumber:[],
            PCBNo:[],
            numberPrice:[],

            vendor:"",
            buyNumber:"",
            description: "",
            person:"",
            buyNumberDate:"",

            shipping:"",
            actually:"",
            didnotenter:"",
            selectID:null,
            ID: "All"
        }
    }
    
    componentDidMount(){
        this.getOption();
    }
    getOption=async()=>{
        await axios.get("http://localhost:3003/posts")
        .then(res=>{
          this.setState({axiosparams:res.data})
        })
      }
    handleChangeID=(e)=>{
        this.setState({ID: e.target.value})
        this.state.axiosparams.map((item,index)=>{
            if(e.target.value === item.value){
                this.setState({
                    buyNumber:item.buyNumber,
                    description:item.description,
                    person:item.person,
                    buyNumberDate:item.buyNumberDate,
                })
            }
        })
        this.setState({selectID:e.target.value})
    }

    handleChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]:value,
        })
    }
    render(){
      let filteraxiosparams = this.state.axiosparams;
      filteraxiosparams= filteraxiosparams.filter((hotel) =>{
          return (
              hotel.buyNumber === this.state.buyNumber||
              hotel.vendor === this.state.vendor
          );
      });
      if(this.state.buyNumber){
          filteraxiosparams = filteraxiosparams.filter((hotel)=>{
              return (
                  hotel.buyNumber === this.state.buyNumber &&
                  hotel.vendor === this.state.vendor
              )
          })
      }   
      return(
          <div>
           <DataExploreResult axiosparams ={filteraxiosparams} onChange={this.handleChange}/>
          </div>
      )
    }
}
export default Dataexplore