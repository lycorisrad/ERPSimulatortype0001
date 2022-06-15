import React ,{Component} from 'react';
import axios from "./axios";
import Box from '@material-ui/core/Box';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { isThisQuarter } from 'date-fns';
import Table from './Table3';
import { Fragment } from "react";
import MaterialTable  from "material-table";
import Atenas from "react-atenas-components";
import {
    Menu,
    MenuItem,
    Button,
    TextField
  } from "@material-ui/core";
  import { Autocomplete } from "@material-ui/lab";
  import Checkbox from "@material-ui/core/Checkbox";
  import FormGroup from "@material-ui/core/FormGroup";
  import FormControlLabel from "@material-ui/core/FormControlLabel";
import { resolve } from 'q';
class DataList7 extends Component{
   constructor(props){
       super(props);
       this.state={
           axiosparams: [],
           fruitsList : [],
           Data:{
            id:"",
            storageclass :"",   
            level:"",
           }
       }
   }
  getOption=()=>{
      axios.get("http://localhost:3003/posts")
      .then(res=>{
          this.setState({
              axiosparams:res.data
          })
      })
  }
  getComments=()=>{
      axios.get("http://localhost:3003/comments")
      .then(res=>{
          this.setState({
              fruitsList:res.data
          })
      })
  }
  componentDidMount(){
      this.getOption();
      this.getComments();
  }
  handleChange=(e)=>{
      const name=e.target.name;
     const value =e.target.value;
      this.setState({
          [name]:value
      })
  }
  showvalue=()=>{
    console.log(this.state.Data.id);
    console.log(this.state.Data.storageclass);
    console.log(this.state.Data.level)  
   }
  PUT=()=>{
      const product = {...this.state.Data}
      axios.put(`posts/${this.state.Data.id}`,product)
  }
  render(){
      const tableColumns =[
          {title:"Client",field:"id"},

          {title:"Name",field:"storageclass"},
          {
          title:"Choose a Fruit",
          field:"level",
          editComponent:({value,onChange})=>(
            <select onChange={(e)=>onChange(e.target.value)}>
            <option selected value ={value}>
             {value} 
            </option>
            {this.state.fruitsList.map(
                (item)=>
                item !== value && (
                    <option key={item.level} value ={item.level}>
                    {item.level}
                    </option>
                )
            )}
            </select>
        )
        }
      ];
      return (
          <div>
         <Fragment>
             <MaterialTable
             columns={tableColumns}
             data={this.state.axiosparams}
             options={{search: false , actionsColumnIndex:-1}}
             editable={{
                 onRowAdd:(newData)=>
                 new Promise((resolve,reject)=>{
                     setTimeout(()=>{
                        this.setState(
                            {
                                axiosparams : [...this.state.axiosparams,newData]
                            })
                        resolve();
                     },1000)
                 }),
                 onRowUpdate: (newData,oldData)=>
                   new Promise((resolve,reject)=>{
                       setTimeout(()=>{
                        console.log("new:", newData);
                        
                           const dataUpdate=[...this.state.axiosparams];
                           const index = oldData.tableData.id;
                           dataUpdate[index]=newData;
                           this.setState({
                              Data: {...newData},
                              axiosparams: [...dataUpdate]
                           });
                           this.PUT();
                           resolve();
                       },1000);
                   }),
                 onRowDelete: (oldData)=>
                   new Promise((resolve,reject)=>{
                       setTimeout(()=>{
                           const dataDelete =[...this.state.axiosparams];
                           const index = oldData.tableData.id;
                           dataDelete.splice(index,1);
                           this.setState({
                               axiosparams:[...dataDelete]
                           });         
                           resolve();

                       },1000);
                   })
             }}
             />
         </Fragment>
         <button onClick={this.showvalue}>檢查</button>
         </div>
      )
  }
}
export default DataList7