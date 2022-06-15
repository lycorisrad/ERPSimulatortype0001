import React ,{Component, useLayoutEffect} from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Form,Dropdown,Button,Container } from 'react-bootstrap';
import {CSVLink} from 'react-csv';
import { spacing } from '@material-ui/system';
import Icon from '@material-ui/core/Icon';
import axios from "./axios";
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
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider
  } from "@material-ui/pickers";
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
const FormItem = Form.Item;



class TestList extends Component{
     constructor(props){
         super(props);
         this.myref = React.createRef();
         this.state={
           selectID:null,
           id:"",
           tabulation:"",
           productspec1:"",
           productspec2:"",
           productspec3:"",
           PCBNo:"",
           PCBCL:"",
           OrderNo:"",
           Quantity:"",
           Backup:"",
           RepairIC:"",
           POQty:"",
           Expect:"",
           Actual:"",
           SPDCode:"",
           PickMenuNo:"",
           LotNo:"",
           ModulePN:"",
           ICPN:"",
           LotStorage:"",
           LotStorageNo:"",
           Testvarible:"",

           axiosparams:[],
           ID:[],
           pickingspecifications:[[]],
           IClevel:[[]],
           ICSize:[[]],
           Vendor:[[]],
           client:[[]],
           OrederATR:[[]],
           CL:[[]],
           Shipping:[[]],
           Testclass:[[]],
           Enterstoragedie:[[]],
           Enterstoragefreq:[[]],


           finished:null,
           unfinish:null,
           number:"",
           value:"",
           date:new Date(),
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
           this.setState({ID:e.target.value})
           this.state.axiosparams.map((item,index)=>{
             if(e.target.value === item.value){
                this.setState({
                  pickingspecifications:item.selectedSPEC,
                  tabulation:item.tabulation,
                  productspec1:item.productspec1,
                  productspec2:item.productspec2,
                  productspec3:item.productspec3,
                  PCBNo:item.PCBNo,
                  PCBCL:item.PCBCL,
                  OrderNo:item.OrderNo,
                  Quantity:item.Quantity,
                  Backup:item.Backup,
                  RepairIC:item.RepairIC,
                  POQty:item.POQty,
                  Expect:item.Expect,
                  Actual:item.Actual,
                  SPDCode:item.SPDCode,
                  PickMenuNo:item.PickMenuNo,
                  LotNo:item.LotNo,
                  ModulePN:item.ModulePN,
                  ICPN:item.ICPN,
                  LotStorage:item.LotStorage,
                  LotStorageNo:item.LotStorageNo,
                  Testvarible:item.Testvarible
                });
             }
             return true;
           })
           this.setState({selectID:e.target.value})
      }
    axiosMenu=(e)=>{
      this.setState({
        pickingspecifications:e.target.value, 
        IClevel:e.target.value,
        ICSize:e.target.value,
        Vendor:e.target.value,
        client:e.target.value,
        OrederATR:e.target.value,
        Shipping:e.target.value,
        CL:e.target.value,
        Testclass:e.target.value,
        Enterstoragedie:e.target.value,
        Enterstoragefreq:e.target.value,
      });
    }
  
  ShowselectID=()=>{
    console.log(this.state.selectID);
    console.log(this.state.date); 
    console.log(this.state.pickingspecifications);
    console.log(this.state.productspec1);
    console.log(this.state.productspec2);
    console.log(this.state.productspec3);
    console.log(this.state.PCBNo);
    console.log(this.state.PCBCL);
    console.log(this.OrderNo);
    console.log(this.Quantity);
    console.log(this.Backup);
    console.log(this.RepairIC);
    console.log(this.POQty);
    console.log(this.Expect);
    console.log(this.Actual);
    console.log(this.SPDCode);
    console.log(this.PickMenuNo);
    console.log(this.LotNo);
    console.log(this.ModulePN);
    console.log(this.ICPN);
    console.log(this.LotStorage);
    console.log(this.LotStorageNo);
    console.log(this.Testvarible);
  }
  


    GET =async()=>{
    try{
     const data1= await axios.get("/inventory");
     this.setState({unfinish:data1.data})
     console.log(data1.data);
    }
    catch(Error){
      alert("無法取得資料");
      }
    }
    
    POST =()=>{
      const data1 = {...this.state.IDDATA};
      axios.post("/posts",data1);
    }

    PUT =()=>{
        const data1={...this.state.IDDATA}
        axios.put(`posts/${this.state.id}`,data1);     
    }

    options = null;
    type=null;
    

     handleChange=(e)=>{
        const name = e.target.name;
        const value =e.target.value;
        this.setState({
            [name]:value,
        })
    }
     

     render(){
       const axiosID= this.state.axiosparams.map((item,index)=>{
         return <option key={index}>{item.value}</option>
       });
       const axiosSpec = this.state.axiosparams.map((item,index)=>{
         if(this.state.ID == item.value){
           return item.givespec.map((item,index)=>
           <option key={index}>{item}</option>
           )
         }
         return true;
       })
       const axiosIClevel = this.state.axiosparams.map((item,index)=>{
         if(this.state.ID == item.value){
           return item.IClevel.map((item,index)=>
            <option key={index}>{item}</option>
           )
         }
         return true;
       })
       const axiosICSize = this.state.axiosparams.map((item,index)=>{
         if(this.state.ID == item.value){
           return item.ICSize.map((item,index)=>
             <option key={index}>{item}</option>
           )
         }
       })
       const axiosVendor = this.state.axiosparams.map((item,index)=>{
         if(this.state.ID == item.value){
           return item.Vendor.map((item,index)=>
           <option key={index}>{item}</option> 
           )
         }
       })
       const axiosclient = this.state.axiosparams.map((item,index)=>{
         if(this.state.ID == item.value){
           return item.client.map((item,index)=>
           <option key={index}>{item}</option>
             )
         }
       })
       const axiosorederATR = this.state.axiosparams.map((item,inex)=>{
         if(this.state.ID== item.value){
           return item.OrederATR.map((item,index)=>
           <option key={index}>{item}</option>
           )
         }
       })
       const axiosCL = this.state.axiosparams.map((item,index)=>{
         if(this.state.ID ==item.value){
           return item.CL.map((item,index)=>
           <option key ={index}>{item}</option>
           )
         }
       })
       const axiosShipping = this.state.axiosparams.map((item,index)=>{
        if(this.state.ID ==item.value){
          return item.Shipping.map((item,index)=>
          <option key ={index}>{item}</option>
          )
        }
      })
       const axiosTestclass = this.state.axiosparams.map((item,index)=>{
         if(this.state.ID == item.value){
           return item.Testclass.map((item,index)=>
           <option key={index}>{item}</option>
           )
         }
       }) 
       const axiosenterstoragedie = this.state.axiosparams.map((item,index)=>{
         if(this.state.ID == item.value){
           return item.Enterstoragedie.map((item,index)=>
            <option key={index}>{item}</option>
           )
         }        
       })
       const axiosenterstoragefreq = this.state.axiosparams.map((item,index)=>{
        if(this.state.ID == item.value){
          return item.Enterstoragefreq.map((item,index)=>
           <option key={index}>{item}</option>
          )
        }        
      })
       return(
        <div class="form-group">
         <div style={{ width: '100%' }}>
        <Box
        display="flex"
        alignItems="flex-start"
        p={1}
        m={1}
        bgcolor="background.paper"
        css={{ height: 100 }}
        > 
        <Box >
              未結案:
            </Box>
            <Box pl={1}>
            <select value={this.number}
             onChange={(e)=>this.setState({number:e.target.value})}>
            <option value="T1">T1</option>
            </select>
            </Box>
            <Box pb={3} pl={30}>
            <Icon>悅群電子股份有限公司</Icon>
            </Box>
            <Box pl={16}>
              已結案:
            </Box> 
          <div style={{ width: '200px' }}>
          <Box pl={1}>
          <select
           value={this.state.ID}
           onChange={this.handleChangeID.bind(this)}
           >{axiosID}
           </select> 
         </Box>
         <button onClick={this.ShowselectID}>檢測</button>
         </div> 
       </Box>    
       </div>
        
        

        <div style={{ width: '100%' }}>
        <Box
        display="flex"
        alignItems="flex-start"
        p={1}
        m={-1}
        bgcolor="background.paper"
        css={{ height: 100 }}
      > 
        <Box >
        編號/發表/時間:
        </Box>
        <Box pl={1}>
        <TextField
          name="number"
          value={this.state.selectID}
          onChange={this.handleChange}
          style ={{width: '90%'}}
        />
        </Box>
  
        <TextField
          name="tabulation"
          value={this.state.tabulation}
          onChange={this.handleChange}
          style ={{width: '10%'}}
        />

         <Box pl={1}>
        <TextField
          name="date"
          value={this.state.date}
          onChange={this.handleChange}
          style ={{width: '80%'}}
        />
        </Box>
       
        <Box mr ={1}>
        <Icon>Module Production Process</Icon>
        </Box>
        <Box pl={0}>
        <Icon>Ｔｅｓｔ ｐｒｏｇｒａｍ</Icon>
           </Box>
        </Box>
    </div>


    <div style={{ width: '100%' }}>
        <Box
        display="flex"
        alignItems="flex-start"
        pl={1}
        mt={1}
        bgcolor="background.paper"
        css={{ height: 100 }}
      > 
        <Box>
        修改/時間:
        </Box>
        <Box pl={1} pt={-3}>
        <TextField
          name="tabulation"
          value={this.state.tabulation}
          onChange={this.handleChange}
          style ={{width: '75%'}}
        />
        </Box>
        
        <TextField
         name="date"
         hintText=""
         floatingLabelText="時間"
         value={this.state.date}
         onChange={(e)=>this.handleChange(e)}
         floatingLabelFixed
         id="datetime-local"
         type="datetime-local"
         defaultValue="2017-05-24T10:30"
         style={{ width: 200 }}
          InputLabelProps={{
            shrink: true,
          }}
        />

                <Form>
                  <Form.Row>
                  <Box mr ={1} pl={5}>
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : IC Sorting"></Form.Check>
                </Form.Group>
                  </Box>
                  <Box pl={1.5}>
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : SMT"></Form.Check>
                </Form.Group>
                </Box>
                 </Form.Row>
                </Form>
            <Box pl={10.5}>
            <select value={this.number}
             onChange={(e)=>this.setState({number:e.target.value})}>
            <option value="T1">T1</option>
            </select>
            </Box>
            </Box>
        </div>


        <div style={{ width: '100%' }}>
        <Box
        display="flex"
        alignItems="flex-start"
        p={1}
        mt={-8}
        bgcolor="background.paper"
        css={{ height: 100 }}
      > 
            <Box pl={0.3}>
              領料規格:
            </Box>
            <div style={{ width: '350px' }}>
          <Box pl={1}>
          
          <select
           value={this.state.pickingspecifications}
           onChange={this.axiosMenu.bind(this)}>
            {axiosSpec} 
            </select>
        
          </Box>
         </div> 
            <Form>
                  <Form.Row>
                  <Box mr ={1} pl={12}>
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : PCB Cut"></Form.Check>
                </Form.Group>
                   </Box>
                  <Box pl={3}>
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : EE RPG"></Form.Check>
                </Form.Group>
                   </Box>
                 </Form.Row>
                </Form>
                <Box pl={8}>
            <select value={this.number}
             onChange={(e)=>this.setState({number:e.target.value})}>
            <option value="T1">T1</option>
            </select>
            </Box>
            </Box>
        </div>


        <div style={{ width: '100%' }}>
        <Box
         display="flex"
         alignItems="flex-start"
         p={1}
         mt={-7}
         bgcolor="background.paper"
         css={{ height: 100 }}
          > 
             <Box pl={2.5}>
               IC等級:
             </Box>
             <Box pl={6.5}>
            
             <select
              value={this.state.IClevel}
              onChange={this.axiosMenu.bind(this)}>
            {axiosIClevel} 
            </select>

            </Box>
             <Box pl={8.3}>IC Size:</Box>
             <Box pl={7}>
             <select
              value={this.state.ICSize}
              onChange={this.axiosMenu.bind(this)}
              >{axiosICSize}
             </select> 
              </Box>
              <Form>
                  <Form.Row>
                  <Box mr ={1} pl={11.5}>
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : Testing"></Form.Check>
                </Form.Group>
                   </Box>
                   <Box mr ={1} pl={4}>
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : Repair"></Form.Check>
                </Form.Group>
                   </Box>
                 </Form.Row>
                </Form>
                <Box pl={7.8}>
            <select value={this.number}
             onChange={(e)=>this.setState({number:e.target.value})}>
            <option value="T1">T1</option>
            </select>
            </Box>
                </Box>
         </div>
         <div style={{ width: '100%' }}>
        <Box
         display="flex"
         alignItems="flex-start"
         p={1}
         mt={-8}
         bgcolor="background.paper"
         css={{ height: 100 }}
          > 
             <Box pl={0.2}>
               品名規格:
             </Box>

        <TextField
          name="productspec1"
          value={this.state.productspec1}
          onChange={this.handleChange}
          style ={{width: '14%'}}
          variant="outlined"
          size="small" 
        />
        <TextField
          name="productspec2"
          value={this.state.productspec2}
          onChange={this.handleChange}
          style ={{width: '14%'}}
          variant="outlined"
          size="small" 
        />
        <TextField
          name="productspec3"
          value={this.state.productspec3}
          onChange={this.handleChange}
          variant="outlined"
          size="small" 
          style ={{width: '14%'}}
        />
             <Form>
                  <Form.Row>
                  <Box mr ={1} pl= {4.3} >
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : Cover"></Form.Check>
                </Form.Group>
                   </Box>
                   <Box mr ={1} pl={5}>
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : Marking"></Form.Check>
                </Form.Group>
                   </Box>
                 </Form.Row>
                </Form>
              </Box>
              </div>


          <div style={{ width: '100%' }}>
        <Box
        display="flex"
        alignItems="flex-start"
        p={1}
        mt={-5}
        bgcolor="background.paper"
        css={{ height: 100 }}
      > 
            <Box pr={1}>
              PCB No./CL:
            </Box>
            <Box >
            <TextField
          name="PCBNo"
          value={this.state.PCBNo}
          onChange={this.handleChange}
          style ={{width: '50%'}}
        />
            </Box>
            <Box pl={1}>
            <TextField
          name="PCBCL"
          value={this.state.PCBCL}
          onChange={this.handleChange}
          style ={{width: '50%'}}
        />
            </Box>
            <Form>
                  <Form.Row>
                <Box pt={1} pl={3}>
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : PCB Cut"></Form.Check>
                </Form.Group>
                </Box>
                <Box pt={1} pl={4}>
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : EE RPG"></Form.Check>
                </Form.Group>
                </Box>
                 </Form.Row>
                </Form>
                <Box pt= {1.5}pl={4}>
            ＭｏｔｈｅｒＢｏａｒｄ
            </Box>
            </Box>
        </div>

        <div style={{ width: '100%' }}>
        <Box
        display="flex"
        alignItems="flex-start"
        p={1}
        mt={-7}
        bgcolor="background.paper"
        css={{ height: 100 }}
        > 
            <Box pl={2}>
              Vendor:
            </Box>
            <Box pl={6}>
            <select
             value={this.state.Vendor}
             onChange={this.axiosMenu.bind(this)}>
            {axiosVendor}
            </select>
            </Box>
              <Box pl={20}>客戶: </Box>
             <select 
             value={this.state.client}
              onChange={this.axiosMenu.bind(this)}>
             {axiosclient}
              </select>
              <Form>
                  <Form.Row>
                    <Box pl={11.4}>
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : 植球"></Form.Check>
                </Form.Group>
                   </Box>
                   <Box pl={7}>
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : 拆板"></Form.Check>
                </Form.Group>
                   </Box>
                 </Form.Row>
                </Form>
                <Box pl={1}>
                <TextField  id="standard-basic" variant="outlined" placeholder="Label Verified"/>
                </Box>
         </Box>
        </div>


        <div style={{ width: '100%' }}>
        <Box
        display="flex"
        alignItems="flex-start"
        p={1}
        mt={-6}
        bgcolor="background.paper"
        css={{ height: 100 }}
        > 
             <Box>Order No/ATR#:</Box>
             <Box>
             <TextField
             name="OrderNo"
             value={this.state.OrderNo}
             onChange={this.handleChange}
             style ={{width: '50%'}}
             />
            </Box>
            <Box pl={6}>
            <select 
             value={this.state.OrederATR}
            onChange={this.axiosMenu.bind(this)}>
             {axiosorederATR}
              </select>
            </Box>
              <Form>
                  <Form.Row>
                    <Box pl={8.5}>
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : 分BIN"></Form.Check>
                </Form.Group>
                    </Box>
                    <Box pl={6}>
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : 相容性驗證"></Form.Check>
                </Form.Group>
                    </Box>
                 </Form.Row>
                </Form>
        </Box>
        </div>
        <div style={{ width: '100%' }}>
        <Box
        display="flex"
        alignItems="flex-start"
        p={1}
        mt={-8}
        bgcolor="background.paper"
        css={{ height: 100 }}
        > 
            <Box pl={-1}>
              數量/備品/維修IC:
            </Box>
            
            <TextField
            name="Quantity"
            value={this.state.Quantity}
            onChange={this.handleChange}
            style ={{width: '14%'}}
            variant="outlined"
            size="small"
             />
             <TextField
            name="Backup"
            value={this.state.Backup}
            onChange={this.handleChange}
            style ={{width: '14%'}}
            variant="outlined"
            size="small"
             />
             <TextField
            name="RepairIC"
            value={this.state.RepairIC}
            onChange={this.handleChange}
            style ={{width: '14%'}}
            variant="outlined"
            size="small"
             />
         </Box>
        </div>

         <div style={{ width: '100%' }}>
        <Box
        display="flex"
        alignItems="flex-start"
        p={1}
        mt={-7}
        bgcolor="background.paper"
        css={{ height: 100 }}
        > 
              <Form>
                  <Form.Row>
                    <Box pl={1}>
                <Form.Group id="formGridCheckbox">
                 <Form.Check type="checkbox" label=" : 新品不良維修"></Form.Check>
                </Form.Group>
                </Box>
                <Box pl={5}>
                  PO Qty:
                  </Box>
                  <Box pl={1}>
                  <TextField
                  name="POQty"
                  value={this.state.POQty}
                  onChange={this.handleChange}
                  style ={{width: '50%'}}
                  />
                  </Box>
                 </Form.Row>
                </Form>
                </Box>
            </div>

            <div style={{ width: '100%' }}>
        <Box
        display="flex"
        alignItems="flex-start"
        p={1}
        mt={-8}
        bgcolor="background.paper"
        css={{ height: 100 }}
        > 
                <Box>
                  Expect/Actual:
                  </Box>
                  <Box pl={1}>
                  <TextField
                  name="Expect"
                  value={this.state.Expect}
                  onChange={this.handleChange}
                  style ={{width: '60%'}}
                  />
                  </Box>
                  <Box pl={1}>
                  <TextField
                  name="Actual"
                  value={this.state.Actual}
                  onChange={this.handleChange}
                  style ={{width: '60%'}}
                  />
                  </Box>
                </Box>
            </div>

            <div style={{ width: '100%' }}>
        <Box
        display="flex"
        alignItems="flex-start"
        p={1}
        mt={-8}
        bgcolor="background.paper"
        css={{ height: 100 }}
        > 
          <Box pl={4}>
            Shipping:
          </Box>
               <Box pl={1}>
               <select 
             value={this.state.Shipping}
             onChange={this.axiosMenu.bind(this)}>
             {axiosShipping}
              </select>
            </Box>
                </Box>
            </div>

             <div style={{ width: '100%' }}>
        <Box
        display="flex"
        alignItems="flex-start"
        p={1}
        mt={-8}
        bgcolor="background.paper"
        css={{ height: 100 }}
        > 
                <Box>SPD Code/CL: </Box>
                <Box pl={1}>
                <TextField
                  name="SPDCode"
                  value={this.state.SPDCode}
                  onChange={this.handleChange}
                  style ={{width: '60%'}}
                  />
                  </Box>
                  <Box pl={1}>
                  <select 
                  value={this.state.CL}
                  onChange={this.axiosMenu.bind(this)}>
                  {axiosCL}
                  </select>
                </Box>
                </Box>
                </div>

                  <div style={{ width: '100%' }}>
                <Box
                display="flex"
                alignItems="flex-start"
                p={1}
                mt={-8}
                bgcolor="background.paper"
                css={{ height: 100 }}
               > 
                <Box pl={4}>
                  採單 No.:
                </Box>
                <Box pl={1}>
                <TextField
                  name="PickMenuNo"
                  value={this.state.PickMenuNo}
                  onChange={this.handleChange}
                  style ={{width: '60%'}}
                  />
                  </Box>
               </Box>
                </div>

                <div style={{ width: '100%' }}>
                <Box
                display="flex"
                alignItems="flex-start"
                p={1}
                mt={-8}
                bgcolor="background.paper"
                css={{ height: 100 }}
               > 
                    <Box pl={5}>
                      Lot No.:
                    </Box>
                    <Box pl={1}>
                    <TextField
                  name="LotNo"
                  value={this.state.LotNo}
                  onChange={this.handleChange}
                  style ={{width: '60%'}}
                  />
                  </Box>
                 </Box>
                </div>

                <div style={{ width: '100%' }}>
                <Box
                display="flex"
                alignItems="flex-start"
                p={1}
                mt={-8}
                bgcolor="background.paper"
                css={{ height: 100 }}
               > 
                    <Box pl={1}>Module P/N:</Box>
                    <Box pl={1}>
                    <TextField
                  name="ModulePN"
                  value={this.state.ModulePN}
                  onChange={this.handleChange}
                  style ={{width: '100%'}}
                  />
                  </Box>
                </Box>
                </div>

                <div style={{ width: '100%' }}>
                <Box
                display="flex"
                alignItems="flex-start"
                p={1}
                mt={-8}
                bgcolor="background.paper"
                css={{ height: 100 }}
               > 
                    <Box pl={5.8}>IC P/N:</Box>
                    <Box pl={1}>
                    <TextField
                  name="ICPN"
                  value={this.state.ICPN}
                  onChange={this.handleChange}
                  style ={{width: '100%'}}
                  />
                    </Box>
                      </Box>
                    </div>

                    <div style={{ width: '100%' }}>
                    <Box
                    display="flex"
                    alignItems="flex-start"
                    p={1}
                    mt={-8}
                    bgcolor="background.paper"
                    css={{ height: 100 }}
                     > 
                     <label>Lot/庫存 No.:</label>
                     <Box pl={1}>
                     <TextField
                  name="LotStorage"
                  value={this.state.LotStorage}
                  onChange={this.handleChange}
                  style ={{width: '60%'}}
                  />
                    </Box>
                      <Box pl={1}>
                      <TextField
                  name="LotStorageNo"
                  value={this.state.LotStorageNo}
                  onChange={this.handleChange}
                  style ={{width: '60%'}}
                  />
                     </Box>
                     </Box>
                     </div>

                     <div style={{ width: '100%' }}>
                    <Box
                    display="flex"
                    alignItems="flex-start"
                    p={1}
                    mt={-8}
                    bgcolor="background.paper"
                    css={{ height: 100 }}
                     > 
                     <Box pl={-3}>
                       測試類別/數量:
                     </Box>
                     <Box pl={1}>
                     <select 
                  value={this.state.Testclass}
                  onChange={this.axiosMenu.bind(this)}>
                  {axiosTestclass}
                  </select>
                 </Box>
                 <Box pl={1}>
                 <TextField
                  name="Testvarible"
                  value={this.state.Testvarible}
                  onChange={this.handleChange}
                  style ={{width: '50%'}}
                  />
                     </Box>
                 </Box>
                 </div>

                 <div style={{ width: '100%' }}>
                    <Box
                    display="flex"
                    alignItems="flex-start"
                    p={1}
                    mt={-8}
                    bgcolor="background.paper"
                    css={{ height: 100 }}
                     > 
                     <Box pl={1}>大庫Die/入庫頻率:</Box>
                     <Box pl={1}>
                     <select 
                  value={this.state.Enterstoragedie}
                  onChange={this.axiosMenu.bind(this)}>
                  {axiosenterstoragedie}
                  </select>
                 </Box>
                 <Box pl={5}>
                 <select 
                  value={this.state.Enterstoragefreq}
                  onChange={this.axiosMenu.bind(this)}>
                  {axiosenterstoragefreq}
                  </select>
                 </Box>
                </Box>
                     </div> 


                    <div style={{ width: '100%' }}>
                    <Box
                    display="flex"
                    alignItems="flex-start"
                    p={1}
                    mt={-8}
                    bgcolor="background.paper"
                    css={{ height: 100 }}
                     > 
                    <Box>
                      <ul>轉單(入)</ul>
                    <textarea 
                       name="title"
                       value={this.state.title}
                       onChange={this.handleChange}
                      />
                    </Box>
                    <Box pl={2}>
                      <ul>轉單(出)</ul>
                    <textarea 
                       name="detail1"
                       value={this.state.detail1}
                       onChange={this.handleChange}
                      />
                    </Box>
                    <Box pl={2}>
                    <ul>對應工單:</ul>
                    <TextField  id="standard-basic"  />
                    </Box>
                    </Box>
                    </div>


                   <div>
                     <button className="fetch-button" onClick={this.GET}>
                     獲取資料  
                     </button>
                     <select className="fetch-select" onChange={this.GET}> 
                        <option >獲取資料</option>
                        <option >獲取資料1</option>
                     </select>
                       </div>

                   <div className="unfinish">
                     {this.state.unfinish && this.state.unfinish.map((dataname,index) =>{
                        return (
                          <div className="dataname" key={index}>
                            <h2>{dataname.name}</h2>
                            <div className="details">
                              <p>{dataname.originaldate}</p>
                              <p>{dataname.changedate}</p>
                              </div>
                              </div>


                        )
                     } )}
                     </div>

        </div>
       ) 
     }
  
}
export default TestList

