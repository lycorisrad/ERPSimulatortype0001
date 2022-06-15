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

class DataWorkOrder extends Component{
     constructor(props){
         super(props);
         this.state={
            data:[],
            IDdataDeliveryTime:[],
            IDdataTransferOrderIN:[],
            IDdataTransferOrderOUT:[],
            IDdataPickingItem:[],

            listpickingspecification:[],
            listiclevel:[],
            listicsize:[],
            listvendor:[],
            listclient:[],
            listorderATR:[],
            listshipping:[],
            listspdCL:[],
            listtestclass:[],
            listenterdie:[],
            listenterfrequency:[],
            listChannel:[],
            listSystemtestType:[],
            listVolt:[],
            listMotherboardspecification:[],
            listMotherboardspecification2:[],
            listtransferintype:[],
            listtransferouttype:[],
          
            listpcbCL:[],
            listnameproduct1: [],
            listnameproduct2: [],
            listnameproduct3: [],
            listnameproduct4: [],
            listnameproduct5: [],
            listnameproduct6: [],
            listpcbNo:[],
            listtransfertype:[],

            modal:null,

            confirmdelete:false,
            showadd:false,
            showEdit:false,
            casedIDtrigger:false,
            uncasedIDtrigger:false,
            buttonadd:"新增",
            buttonText:"修改",

            casedID:"",
            uncasedID:"",
            number:"",
            numbertabulation:"",
            numberdatetime:{
                date:""
            },
            modify:"",
            modifydatetime:{
                date:""
            },
            pickingspecification:"",
            iclevel:"",
            icsize:"",

            nameproduct1:"",
            nameproduct2:"",
            nameproduct3:"",
            nameproduct4:"",
            nameproduct5:"",
            nameproduct6:"",
            nameproduct7:"",
            pcbNo:"",
            pcbCL:"",
            
            vendor:"",
            client:"",
            
            orderNo:"",
            orderATR:"",
            icamount:"",
            icbackupproduct:"",
            icrepair:"",
            
            newproductrepair:false,
            poQty:"",
            
            expect:{
              date:""
            },
            actual:{
              date:""
            },

            shipping:"",

            spdCode:"",
            spdCL:"",
             
            purchaseNo:"",

            lotNo:"",

            modulePN:"",

            icPN:"",

            lot:"",
            lotstorageNo:"",

            testclass:"",
            testamount:"",
           
            enterdie:"",
            enterfrequency:"",

            transferenter:"",
            transferout:"",
            correspondworkorder:"",
            bank:"",
            labelcode:"",
            specialdescription:"",
            specialdescription2:"",

            ICshouldreceive:0,
            ICreceived:0,
            ICunreceive:0,
            SMTICshouldreceive:0,
            SMTICreceived:0,
            SMTICunreceive:0,
            REPAIRICshouldreceive:0,
            REPAIRICreceived:0,
            REPAIRICunreceive:0,
            MODULEICshouldreceive:0,
            MODULEICreceived:0,
            MODULEICunreceive:0,
            
            pickitemmenu:false,
            confirmspecialdescription:false,
            confirmspecialdescription2:false,
            maincancel:false,
            Modeulemenu:false,
            Modeulemenu2:false,
            ICSorting:false,
            SMT:false,
            PCBCut:false,
            EEPRG:false,
            Testing:false,
            Repair:false,
            Cover:false,
            Marking:false,
            Label:false,
            Packing:false,
            Resorting:false,
            DownGrade:false,
            Reballing:false,
            Dismantle:false,
            SplitBIN:false,
            Compatibility:false,
            
            description:"",
            description1:"",
            description2:"",

            Channel:"",
            SystemtestType:"",
            Volt:"",

            Motherboardspecification:"",
            Motherboardspecification2:"",

            DeliveryTimeDataview:{
                timedatehour:"",
                qty:"",
                deliverytimedescription:"",
            },
            TransferOrderIN:{
                 transferinnumberid:"",
                 transferinamount:"",
                 transferintype:"",
            },
            TransferOrderOUT:{
              transferoutnumberid:"",
              transferoutamount:"",
              transferouttype:"",
         },
            PickingItemDataview:{
                storageclass:"",
                buynumber_workorder:"",
                transfertype:"",
                p_n:"",
                pcbno:"",
                amount:"",
                pass_fail:"",
                repairic:false,
                pickingnumber:"",
            },
          
         }
     }
     handlecancel=()=>{
      this.state.data.map((item,index)=>{
         if(this.state.uncasedID === item.uncasedID || this.state.casedID === item.casedID){
               this.setState({
                IDdataDeliveryTime:item.dataDeliveryTime,
                IDdataTransferOrderIN:item.dataTransferOrderIN,
                IDdataTransferOrderOUT:item.dataTransferOrderOUT,
                IDdataPickingItem:item.dataPickingItem,
                uncasedID:item.uncasedID,
                casedID:item.casedID,
                number:item.number,
                numbertabulation:item.numbertabulation,
                numberdatetime:item.numberdatetime,
                modify:item.modify,
                modifydatetime:item.modifydatetime,
                pickingspecification:item.pickingspecification,
                iclevel:item.iclevel,
                icsize:item.icsize,
                nameproduct1:item.nameproduct1,
                nameproduct2:item.nameproduct2,
                nameproduct3:item.nameproduct3,
                nameproduct4:item.nameproduct4,
                nameproduct5:item.nameproduct5,
                nameproduct6:item.nameproduct6,
                nameproduct7:item.nameproduct7,
                nameproduct8:item.nameproduct8,
                pcbNo:item.pcbNo,
                pcbCL:item.pcbCL,
                vendor:item.vendor,
                client:item.client,
                orderNo:item.orderNo,
                orderATR:item.orderATR,
                icamount:item.icamount,
                icbackupproduct:item.icbackupproduct,
                icrepair:item.icrepair,
                newproductrepair:item.newproductrepair,
                poQty:item.poQty,
                expect:item.expect,
                actual:item.actual,
                shipping:item.shipping,
                spdCode:item.spdCode,
                spdCL:item.spdCL,
                purchaseNo:item.purchaseNo,
                lotNo:item.lotNo,
                modulePN:item.modulePN,
                icPN:item.icPN,
                lot:item.lot,
                lotstorageNo:item.lotstorageNo,
                testclass:item.testclass,
                testamount:item.testamount,   
                enterdie:item.enterdie,
                enterfrequency:item.enterfrequency,
                transferenter:item.transferenter,
                transferout:item.transferout,
                correspondworkorder:item.correspondworkorder,
                ICSorting:item.ICSorting,
                SMT:item.SMT,
                PCBCut:item.PCBCut,
                EEPRG:item.EEPRG,
                Testing:item.Testing,
                Repair:item.Repair,
                Cover:item.Cover,
                Marking:item.Marking,
                Label:item.Label,
                Packing:item.Packing,
                Resorting:item.Resorting,
                DownGrade:item.DownGrade,
                Reballing:item.Reballing,
                Dismantle:item.Dismantle,
                SplitBIN:item.SplitBIN,
                Compatibility:item.Compatibility,
                description:item.description,
                description1:item.description1,
                description2:item.description2,
                Channel:item.Channel,
                SystemtestType:item.SystemtestType,
                Volt:item.Volt,
                Motherboardspecification:item.Motherboardspecification,
                Motherboardspecification2:item.Motherboardspecification2,
           })
         }
         return true;
      }) 
      this.setState({
        showadd:false,
        showEdit:false,
    })
    }
     handleChangeuncasedID=(e,values)=>{
      this.setState({
        uncasedID:values.uncasedID
      })
      this.state.data.map((item)=>{
        if(values.uncasedID == item.uncasedID){
          this.setState({
           IDdataDeliveryTime:item.dataDeliveryTime,
           IDdataTransferOrderIN:item.dataTransferOrderIN,
           IDdataTransferOrderOUT:item.dataTransferOrderOUT,
           IDdataPickingItem:item.dataPickingItem,
           casedID:"",
           casedIDtrigger:false,
           uncasedIDtrigger:!this.state.uncasedIDtrigger,
           uncasedID:item.uncasedID,
           number:item.number,
           numbertabulation:item.numbertabulation,
           numberdatetime:item.numberdatetime,
           modify:item.modify,
           modifydatetime:item.modifydatetime,
           pickingspecification:item.pickingspecification,
           iclevel:item.iclevel,
           icsize:item.icsize,
           nameproduct1:item.nameproduct1,
           nameproduct2:item.nameproduct2,
           nameproduct3:item.nameproduct3,
           nameproduct4:item.nameproduct4,
           nameproduct5:item.nameproduct5,
           nameproduct6:item.nameproduct6,
           nameproduct7:item.nameproduct7,
           nameproduct8:item.nameproduct8,
           pcbNo:item.pcbNo,
           pcbCL:item.pcbCL,
           vendor:item.vendor,
           client:item.client,
           orderNo:item.orderNo,
           orderATR:item.orderATR,
           icamount:item.icamount,
           icbackupproduct:item.icbackupproduct,
           icrepair:item.icrepair,
           newproductrepair:item.newproductrepair,
           poQty:item.poQty,
           expect:item.expect,
           actual:item.actual,
           shipping:item.shipping,
           spdCode:item.spdCode,
           spdCL:item.spdCL,
           purchaseNo:item.purchaseNo,
           lotNo:item.lotNo,
           modulePN:item.modulePN,
           icPN:item.icPN,
           lot:item.lot,
           lotstorageNo:item.lotstorageNo,
           testclass:item.testclass,
           testamount:item.testamount,   
           enterdie:item.enterdie,
           enterfrequency:item.enterfrequency,
           transferenter:item.transferenter,
           transferout:item.transferout,
           correspondworkorder:item.correspondworkorder,
           ICSorting:item.ICSorting,
           SMT:item.SMT,
           PCBCut:item.PCBCut,
           EEPRG:item.EEPRG,
           Testing:item.Testing,
           Repair:item.Repair,
           Cover:item.Cover,
           Marking:item.Marking,
           Label:item.Label,
           Packing:item.Packing,
           Resorting:item.Resorting,
           DownGrade:item.DownGrade,
           Reballing:item.Reballing,
           Dismantle:item.Dismantle,
           SplitBIN:item.SplitBIN,
           Compatibility:item.Compatibility,
           description:item.description,
           description1:item.description1,
           description2:item.description2,
           Channel:item.Channel,
           SystemtestType:item.SystemtestType,
           Volt:item.Volt,
           Motherboardspecification:item.Motherboardspecification,
           Motherboardspecification2:item.Motherboardspecification2,
          })
        }
        return true;
      })
    }
     handleChangecasedID=(e,values)=>{
       this.setState({
         casedID:values.casedID
       })
       this.state.data.map((item)=>{
         if(values.casedID == item.casedID){
           this.setState({
            IDdataDeliveryTime:item.dataDeliveryTime,
            IDdataTransferOrderIN:item.dataTransferOrderIN,
            IDdataTransferOrderOUT:item.dataTransferOrderOUT,
            IDdataPickingItem:item.dataPickingItem,
            uncasedID:"",
            uncasedIDtrigger:false,
            casedIDtrigger:!this.state.casedIDtrigger,
            casedID:item.casedID,
            number:item.number,
            numbertabulation:item.numbertabulation,
            numberdatetime:item.numberdatetime,
            modify:item.modify,
            modifydatetime:item.modifydatetime,
            pickingspecification:item.pickingspecification,
            iclevel:item.iclevel,
            icsize:item.icsize,
            nameproduct1:item.nameproduct1,
            nameproduct2:item.nameproduct2,
            nameproduct3:item.nameproduct3,
            nameproduct4:item.nameproduct4,
            nameproduct5:item.nameproduct5,
            nameproduct6:item.nameproduct6,
            nameproduct7:item.nameproduct7,
            nameproduct8:item.nameproduct8,
            pcbNo:item.pcbNo,
            pcbCL:item.pcbCL,
            vendor:item.vendor,
            client:item.client,
            orderNo:item.orderNo,
            orderATR:item.orderATR,
            icamount:item.icamount,
            icbackupproduct:item.icbackupproduct,
            icrepair:item.icrepair,
            newproductrepair:item.newproductrepair,
            poQty:item.poQty,
            expect:item.expect,
            actual:item.actual,
            shipping:item.shipping,
            spdCode:item.spdCode,
            spdCL:item.spdCL,
            purchaseNo:item.purchaseNo,
            lotNo:item.lotNo,
            modulePN:item.modulePN,
            icPN:item.icPN,
            lot:item.lot,
            lotstorageNo:item.lotstorageNo,
            testclass:item.testclass,
            testamount:item.testamount,   
            enterdie:item.enterdie,
            enterfrequency:item.enterfrequency,
            transferenter:item.transferenter,
            transferout:item.transferout,
            correspondworkorder:item.correspondworkorder,
            ICSorting:item.ICSorting,
            SMT:item.SMT,
            PCBCut:item.PCBCut,
            EEPRG:item.EEPRG,
            Testing:item.Testing,
            Repair:item.Repair,
            Cover:item.Cover,
            Marking:item.Marking,
            Label:item.Label,
            Packing:item.Packing,
            Resorting:item.Resorting,
            DownGrade:item.DownGrade,
            Reballing:item.Reballing,
            Dismantle:item.Dismantle,
            SplitBIN:item.SplitBIN,
            Compatibility:item.Compatibility,
            description:item.description,
            description1:item.description1,
            description2:item.description2,
            Channel:item.Channel,
            SystemtestType:item.SystemtestType,
            Volt:item.Volt,
            Motherboardspecification:item.Motherboardspecification,
            Motherboardspecification2:item.Motherboardspecification2,
           })
         }
         return true;
       })
     }
     
     handledelete=()=>{
      this.setState({
          confirmdelete:!this.state.confirmdelete
      })
   }
   handlesave=()=>{
    if(this.state.showadd === true){
        this.POST()
        this.setState({
            showadd:false,
            buttonadd:"新增"
        })
    }
    else if(this.state.showEdit === true){
        this.PUT()
        this.setState({
            showEdit:false,
            buttonText:"修改"
        })
    }
    }
    
    handleshowEdit=()=>{
        if(this.state.vendorconfirm === true){
             this.setState({
                 modal:!this.state.modal
             })
        }
        else{
        this.setState({
            showEdit:!this.state.showEdit
        })
    }
    }
    handleModeulemenu2cancel=()=>{
      if(this.state.Modeulemenu2 === true){
        this.setState({
          labelcode:"",
          Modeulemenu2:!this.state.Modeulemenu2
        })
      }
    }
    handleModeulemenucancel=()=>{
      if(this.state.Modeulemenu === true){
      this.setState({
        nameproduct1:"",
        nameproduct2:"",
        nameproduct3:"",
        nameproduct4:"",
        nameproduct5:"",
        nameproduct6:"",
        nameproduct7:"",
        pcbNo:"",
        pcbCL:"",

        Modeulemenu:!this.state.Modeulemenu 
      })
    }
    }
    handlepickitemmenu=()=>{
      if(this.state.showadd || this.state.showEdit){
        this.setState({
          pickitemmenu:!this.state.pickitemmenu
        })
      }
    }
    handleModeulemenu=()=>{
      if(this.state.showadd || this.state.showEdit){
        this.setState({
          Modeulemenu:!this.state.Modeulemenu
        })
      }
    }
    handleModeulemenu2=()=>{
      if(this.state.showadd || this.state.showEdit){
        this.setState({
          Modeulemenu2:!this.state.Modeulemenu2
        })
      }
    }
    handlespecialdescription =()=>{
       this.setState({
         confirmspecialdescription:!this.state.confirmspecialdescription
       })
    }
    handlespecialdescription2=()=>{
       this.setState({
         confirmspecialdescription2:!this.state.confirmspecialdescription2
       })
    }
    handlespecialdescriptioncancel=()=>{
      if(this.state.confirmspecialdescription === true){
      this.setState({
         specialdescription:"",
         confirmspecialdescription:!this.state.confirmspecialdescription
      })
    }
    else {
      if(this.state.confirmspecialdescription2 === true){
        this.setState({
          specialdescription2:"",
          confirmspecialdescription2:!this.state.confirmspecialdescription2
        })
      }
    }
    }

  PUT=()=>{
    if(this.state.uncasedIDtrigger === true){
     axios.put(`posts/${this.state.uncasedID}`,
     {
      uncasedID:this.state.uncasedID,
      number:this.state.number,
      numbertabulation:this.state.numbertabulation,
      numberdatetime:{
        date:this.state.numberdatetime
      },
      modify:this.state.modify,
      modifydatetime:{
        date:this.state.modifydatetime
      },
      pickingspecification:this.state.pickingspecification,
      iclevel:this.state.iclevel,
      icsize:this.state.icsize,
      nameproduct1:this.state.nameproduct1,
      nameproduct2:this.state.nameproduct2,
      nameproduct3:this.state.nameproduct3,
      nameproduct4:this.state.nameproduct4,
      nameproduct5:this.state.nameproduct5,
      nameproduct6:this.state.nameproduct6,
      nameproduct7:this.state.nameproduct7,
      nameproduct8:this.state.nameproduct8,
      pcbNo:this.state.pcbNo,
      pcbCL:this.state.pcbCL,
      vendor:this.state.vendor,
      client:this.state.client,
      orderNo:this.state.orderNo,
      orderATR:this.state.orderATR,
      icamount:this.state.icamount,
      icbackupproduct:this.state.icbackupproduct,
      icrepair:this.state.icrepair,
      newproductrepair:this.state.newproductrepair,
      poQty:this.state.poQty,
      expect:{
        date:this.state.expect
      },
      actual:{
        date:this.state.actual
      },
      shipping:this.state.shipping,
      spdCode:this.state.spdCode,
      spdCL:this.state.spdCL,
      purchaseNo:this.state.purchaseNo,
      lotNo:this.state.lotNo,
      modulePN:this.state.modulePN,
      icPN:this.state.icPN,
      lot:this.state.lot,
      lotstorageNo:this.state.lotstorageNo,
      testclass:this.state.testclass,
      testamount:this.state.testamount,   
      enterdie:this.state.enterdie,
      enterfrequency:this.state.enterfrequency,
      transferenter:this.state.transferenter,
      transferout:this.state.transferout,
      correspondworkorder:this.state.correspondworkorder,
      ICSorting:this.state.ICSorting,
      SMT:this.state.SMT,
      PCBCut:this.state.PCBCut,
      EEPRG:this.state.EEPRG,
      Testing:this.state.Testing,
      Repair:this.state.Repair,
      Cover:this.state.Cover,
      Marking:this.state.Marking,
      Label:this.state.Label,
      Packing:this.state.Packing,
      Resorting:this.state.Resorting,
      DownGrade:this.state.DownGrade,
      Reballing:this.state.Reballing,
      Dismantle:this.state.Dismantle,
      SplitBIN:this.state.SplitBIN,
      Compatibility:this.state.Compatibility,
      description:this.state.description,
      description1:this.state.description1,
      description2:this.state.description2,
      Channel:this.state.Channel,
      SystemtestType:this.state.SystemtestType,
      Volt:this.state.Volt,
      Motherboardspecification:this.state.Motherboardspecification,
      Motherboardspecification2:this.state.Motherboardspecification2,
    
      IDdataDeliveryTime:this.state.dataDeliveryTime,
      IDdataTransferOrderIN:this.state.dataTransferOrderIN,
      IDdataTransferOrderOUT:this.state.dataTransferOrderOUT,
      IDdataPickingItem:this.state.dataPickingItem,

      dataDeliveryTime :
         this.state.IDdataDeliveryTime,
      dataTransferOrderIN : 
         this.state.IDdataTransferOrderIN,
      dataTransferOrderOUT :
         this.state.IDdataTransferOrderOUT,
      dataPickingItem :
         this.state.IDdataPickingItem
    }
  )
    }
    else{
      if(this.state.casedIDtrigger === true)
      axios.put(`posts/${this.state.casedID}`,
     {
      casedID:this.state.casedID,
      number:this.state.number,
      numbertabulation:this.state.numbertabulation,
      numberdatetime:{
        date:this.state.numberdatetime
      },
      modify:this.state.modify,
      modifydatetime:{
        date:this.state.modifydatetime
      },
      pickingspecification:this.state.pickingspecification,
      iclevel:this.state.iclevel,
      icsize:this.state.icsize,
      nameproduct1:this.state.nameproduct1,
      nameproduct2:this.state.nameproduct2,
      nameproduct3:this.state.nameproduct3,
      nameproduct4:this.state.nameproduct4,
      nameproduct5:this.state.nameproduct5,
      nameproduct6:this.state.nameproduct6,
      nameproduct7:this.state.nameproduct7,
      nameproduct8:this.state.nameproduct8,
      pcbNo:this.state.pcbNo,
      pcbCL:this.state.pcbCL,
      vendor:this.state.vendor,
      client:this.state.client,
      orderNo:this.state.orderNo,
      orderATR:this.state.orderATR,
      icamount:this.state.icamount,
      icbackupproduct:this.state.icbackupproduct,
      icrepair:this.state.icrepair,
      newproductrepair:this.state.newproductrepair,
      poQty:this.state.poQty,
      expect:{
        date:this.state.expect
      },
      actual:{
        date:this.state.actual
      },
      shipping:this.state.shipping,
      spdCode:this.state.spdCode,
      spdCL:this.state.spdCL,
      purchaseNo:this.state.purchaseNo,
      lotNo:this.state.lotNo,
      modulePN:this.state.modulePN,
      icPN:this.state.icPN,
      lot:this.state.lot,
      lotstorageNo:this.state.lotstorageNo,
      testclass:this.state.testclass,
      testamount:this.state.testamount,   
      enterdie:this.state.enterdie,
      enterfrequency:this.state.enterfrequency,
      transferenter:this.state.transferenter,
      transferout:this.state.transferout,
      correspondworkorder:this.state.correspondworkorder,
      ICSorting:this.state.ICSorting,
      SMT:this.state.SMT,
      PCBCut:this.state.PCBCut,
      EEPRG:this.state.EEPRG,
      Testing:this.state.Testing,
      Repair:this.state.Repair,
      Cover:this.state.Cover,
      Marking:this.state.Marking,
      Label:this.state.Label,
      Packing:this.state.Packing,
      Resorting:this.state.Resorting,
      DownGrade:this.state.DownGrade,
      Reballing:this.state.Reballing,
      Dismantle:this.state.Dismantle,
      SplitBIN:this.state.SplitBIN,
      Compatibility:this.state.Compatibility,
      description:this.state.description,
      description1:this.state.description1,
      description2:this.state.description2,
      Channel:this.state.Channel,
      SystemtestType:this.state.SystemtestType,
      Volt:this.state.Volt,
      Motherboardspecification:this.state.Motherboardspecification,
      Motherboardspecification2:this.state.Motherboardspecification2,
    
      IDdataDeliveryTime:this.state.dataDeliveryTime,
      IDdataTransferOrderIN:this.state.dataTransferOrderIN,
      IDdataTransferOrderOUT:this.state.dataTransferOrderOUT,
      IDdataPickingItem:this.state.dataPickingItem,

      dataDeliveryTime :
         this.state.IDdataDeliveryTime,
      dataTransferOrderIN : 
         this.state.IDdataTransferOrderIN,
      dataTransferOrderOUT :
         this.state.IDdataTransferOrderOUT,
      dataPickingItem :
         this.state.IDdataPickingItem
    }
  )
    }
  }
  
  POST=()=>{//此為直接傳送至jsondata的動作
     if(this.state.uncasedIDtrigger === true){   
    axios.post("/posts",
       {
        uncasedID:this.state.uncasedID,
        number:this.state.number,
        numbertabulation:this.state.numbertabulation,
        numberdatetime:{
          date:this.state.numberdatetime
        },
        modify:this.state.modify,
        modifydatetime:{
          date:this.state.modifydatetime
        },
        pickingspecification:this.state.pickingspecification,
        iclevel:this.state.iclevel,
        icsize:this.state.icsize,
        nameproduct1:this.state.nameproduct1,
        nameproduct2:this.state.nameproduct2,
        nameproduct3:this.state.nameproduct3,
        nameproduct4:this.state.nameproduct4,
        nameproduct5:this.state.nameproduct5,
        nameproduct6:this.state.nameproduct6,
        nameproduct7:this.state.nameproduct7,
        nameproduct8:this.state.nameproduct8,
        pcbNo:this.state.pcbNo,
        pcbCL:this.state.pcbCL,
        vendor:this.state.vendor,
        client:this.state.client,
        orderNo:this.state.orderNo,
        orderATR:this.state.orderATR,
        icamount:this.state.icamount,
        icbackupproduct:this.state.icbackupproduct,
        icrepair:this.state.icrepair,
        newproductrepair:this.state.newproductrepair,
        poQty:this.state.poQty,
        expect:{
          date:this.state.expect
        },
        actual:{
          date:this.state.actual
        },
        shipping:this.state.shipping,
        spdCode:this.state.spdCode,
        spdCL:this.state.spdCL,
        purchaseNo:this.state.purchaseNo,
        lotNo:this.state.lotNo,
        modulePN:this.state.modulePN,
        icPN:this.state.icPN,
        lot:this.state.lot,
        lotstorageNo:this.state.lotstorageNo,
        testclass:this.state.testclass,
        testamount:this.state.testamount,   
        enterdie:this.state.enterdie,
        enterfrequency:this.state.enterfrequency,
        transferenter:this.state.transferenter,
        transferout:this.state.transferout,
        correspondworkorder:this.state.correspondworkorder,
        ICSorting:this.state.ICSorting,
        SMT:this.state.SMT,
        PCBCut:this.state.PCBCut,
        EEPRG:this.state.EEPRG,
        Testing:this.state.Testing,
        Repair:this.state.Repair,
        Cover:this.state.Cover,
        Marking:this.state.Marking,
        Label:this.state.Label,
        Packing:this.state.Packing,
        Resorting:this.state.Resorting,
        DownGrade:this.state.DownGrade,
        Reballing:this.state.Reballing,
        Dismantle:this.state.Dismantle,
        SplitBIN:this.state.SplitBIN,
        Compatibility:this.state.Compatibility,
        description:this.state.description,
        description1:this.state.description1,
        description2:this.state.description2,
        Channel:this.state.Channel,
        SystemtestType:this.state.SystemtestType,
        Volt:this.state.Volt,
        Motherboardspecification:this.state.Motherboardspecification,
        Motherboardspecification2:this.state.Motherboardspecification2,
      
        IDdataDeliveryTime:this.state.dataDeliveryTime,
        IDdataTransferOrderIN:this.state.dataTransferOrderIN,
        IDdataTransferOrderOUT:this.state.dataTransferOrderOUT,
        IDdataPickingItem:this.state.dataPickingItem,
  
        dataDeliveryTime :
           this.state.IDdataDeliveryTime,
        dataTransferOrderIN : 
           this.state.IDdataTransferOrderIN,
        dataTransferOrderOUT :
           this.state.IDdataTransferOrderOUT,
        dataPickingItem :
           this.state.IDdataPickingItem
      })
     }
     else {
       if(this.state.casedIDtrigger === true){
         this.setState({

          casedID:this.state.casedID,
          number:this.state.number,
          numbertabulation:this.state.numbertabulation,
          numberdatetime:{
            date:this.state.numberdatetime
          },
          modify:this.state.modify,
          modifydatetime:{
            date:this.state.modifydatetime
          },
          pickingspecification:this.state.pickingspecification,
          iclevel:this.state.iclevel,
          icsize:this.state.icsize,
          nameproduct1:this.state.nameproduct1,
          nameproduct2:this.state.nameproduct2,
          nameproduct3:this.state.nameproduct3,
          nameproduct4:this.state.nameproduct4,
          nameproduct5:this.state.nameproduct5,
          nameproduct6:this.state.nameproduct6,
          nameproduct7:this.state.nameproduct7,
          nameproduct8:this.state.nameproduct8,
          pcbNo:this.state.pcbNo,
          pcbCL:this.state.pcbCL,
          vendor:this.state.vendor,
          client:this.state.client,
          orderNo:this.state.orderNo,
          orderATR:this.state.orderATR,
          icamount:this.state.icamount,
          icbackupproduct:this.state.icbackupproduct,
          icrepair:this.state.icrepair,
          newproductrepair:this.state.newproductrepair,
          poQty:this.state.poQty,
          expect:{
            date:this.state.expect
          },
          actual:{
            date:this.state.actual
          },
          shipping:this.state.shipping,
          spdCode:this.state.spdCode,
          spdCL:this.state.spdCL,
          purchaseNo:this.state.purchaseNo,
          lotNo:this.state.lotNo,
          modulePN:this.state.modulePN,
          icPN:this.state.icPN,
          lot:this.state.lot,
          lotstorageNo:this.state.lotstorageNo,
          testclass:this.state.testclass,
          testamount:this.state.testamount,   
          enterdie:this.state.enterdie,
          enterfrequency:this.state.enterfrequency,
          transferenter:this.state.transferenter,
          transferout:this.state.transferout,
          correspondworkorder:this.state.correspondworkorder,
          ICSorting:this.state.ICSorting,
          SMT:this.state.SMT,
          PCBCut:this.state.PCBCut,
          EEPRG:this.state.EEPRG,
          Testing:this.state.Testing,
          Repair:this.state.Repair,
          Cover:this.state.Cover,
          Marking:this.state.Marking,
          Label:this.state.Label,
          Packing:this.state.Packing,
          Resorting:this.state.Resorting,
          DownGrade:this.state.DownGrade,
          Reballing:this.state.Reballing,
          Dismantle:this.state.Dismantle,
          SplitBIN:this.state.SplitBIN,
          Compatibility:this.state.Compatibility,
          description:this.state.description,
          description1:this.state.description1,
          description2:this.state.description2,
          Channel:this.state.Channel,
          SystemtestType:this.state.SystemtestType,
          Volt:this.state.Volt,
          Motherboardspecification:this.state.Motherboardspecification,
          Motherboardspecification2:this.state.Motherboardspecification2,
        
          IDdataDeliveryTime:this.state.dataDeliveryTime,
          IDdataTransferOrderIN:this.state.dataTransferOrderIN,
          IDdataTransferOrderOUT:this.state.dataTransferOrderOUT,
          IDdataPickingItem:this.state.dataPickingItem,
    
          dataDeliveryTime :
             this.state.IDdataDeliveryTime,
          dataTransferOrderIN : 
             this.state.IDdataTransferOrderIN,
          dataTransferOrderOUT :
             this.state.IDdataTransferOrderOUT,
          dataPickingItem :
             this.state.IDdataPickingItem
         })
       }
     }
   }
   ADD=()=>{
       this.setState({
        casedID:"",
        uncasedID:"",
        number:"",
        numbertabulation:"",
        numberdatetime:{
            date:""
        },
        modify:"",
        modifydatetime:{
            date:""
        },
        pickingspecification:"",
        iclevel:"",
        icsize:"",
        nameproduct1:"",
        nameproduct2:"",
        nameproduct3:"",
        nameproduct4:"",
        nameproduct5:"",
        nameproduct6:"",
        nameproduct7:"",
        nameproduct8:"",
        pcbNo:"",
        pcbCL:"",
        
        vendor:"",
        client:"",
        
        orderNo:"",
        orderATR:"",
        icamount:"",
        icbackupproduct:"",
        icrepair:"",
        
        newproductrepair:false,
        poQty:"",
        
        expect:{
          date:""
        },
        actual:{
          date:""
        },

        shipping:"",

        spdCode:"",
        spdCL:"",
         
        purchaseNo:"",

        lotNo:"",

        modulePN:"",

        icPN:"",

        lot:"",
        lotstorageNo:"",

        testclass:"",
        testamount:"",
       
        enterdie:"",
        enterfrequency:"",

        transferenter:"",
        transferout:"",
        correspondworkorder:"",

        ICSorting:false,
        SMT:false,
        PCBCut:false,
        EEPRG:false,
        Testing:false,
        Repair:false,
        Cover:false,
        Marking:false,
        Label:false,
        Packing:false,
        Resorting:false,
        DownGrade:false,
        Reballing:false,
        Dismantle:false,
        SplitBIN:false,
        Compatibility:false,
        
        description:"",
        description1:"",
        description2:"",

        Channel:"",
        SystemtestType:"",
        Volt:"",

        Motherboardspecification:"",
        Motherboardspecification2:"",

        DeliveryTimeDataview:[],
        TransferOrderIN:[],
        TransferOrderOUT:[],
        PickingItemDataview:[],
         showadd:!this.state.showadd
       })
     
   }
     handleChangenumberdatetime =(e)=>{
      if(this.state.showadd || this.state.showEdit){
        this.setState({
          numberdatetime:e.target.value
        })
    }
     }
     handleChangemodifydatetime=(e)=>{
      if(this.state.showadd || this.state.showEdit){
        this.setState({
          modifydatetime:e.target.value
        })
    }
     }
     handleChangeexpect=(e)=>{
      if(this.state.showadd || this.state.showEdit){
        this.setState({
          expect:e.target.value
        })
    }
     }
     handleChangeactual=(e)=>{
      if(this.state.showadd || this.state.showEdit){
        this.setState({
          actual:e.target.value
        })
    }
     }
     handleChange=(e)=>{
      const name = e.target.name
      const value = e.target.value
      if(this.state.showadd ==true || this.state.showEdit ==true){
      this.setState({
          [name]:value
      })
     }
    }
    handleChecked =(e)=>{
      const name = e.target.name
      const value = e.target.checked
      if(this.state.showadd ==true || this.state.showEdit ==true){
      this.setState({
          [name] : value
      })
     }
    }
    getAllOption =()=>{
          
      axios.all([
        axios.get("http://localhost:3003/listpickingspecification"),
        axios.get("http://localhost:3003/listiclevel"),
        axios.get("http://localhost:3003/listicsize"),
        axios.get("http://localhost:3003/listvendor"),
        axios.get("http://localhost:3003/listclient"),
        axios.get("http://localhost:3003/listorderATR"),
        axios.get("http://localhost:3003/listshipping"),
        axios.get("http://localhost:3003/listspdCL"),
        axios.get("http://localhost:3003/listtestclass"),
        axios.get("http://localhost:3003/listenterdie"),
        axios.get("http://localhost:3003/listenterfrequency"),
        axios.get("http://localhost:3003/listChannel"),
        axios.get("http://localhost:3003/listSystemtestType"),
        axios.get("http://localhost:3003/listVolt"),
        axios.get("http://localhost:3003/listMotherboardspecification"),
        axios.get("http://localhost:3003/listMotherboardspecification2"),
        axios.get("http://localhost:3003/listtransferintype"),
        axios.get("http://localhost:3003/listtransferouttype"),
        axios.get("http://localhost:3003/listnameproduct1"),
        axios.get("http://localhost:3003/listnameproduct2"),
        axios.get("http://localhost:3003/listnameproduct3"),
        axios.get("http://localhost:3003/listnameproduct4"),
        axios.get("http://localhost:3003/listnameproduct5"),
        axios.get("http://localhost:3003/listnameproduct6"),
        axios.get("http://localhost:3003/listpcbCL"),
        axios.get("http://localhost:3003/listpcbNo"),
        axios.get("http://localhost:3003/listtransfertype"),
      ])
       .then(
         axios.spread((
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
           res11,
           res12,
           res13,
           res14,
           res15,
           res16,
           res17,
           res18,
           res19,
           res20,
           res21,
           res22,
           res23,
           res24,
           res25,
           res26,
           res27
           )=>{
             this.setState({
              listpickingspecification:res1.data,
              listiclevel:res2.data,
              listicsize:res3.data,
              listvendor:res4.data,
              listclient:res5.data,
              listorderATR:res6.data,
              listshipping:res7.data,
              listspdCL:res8.data,
              listtestclass:res9.data,
              listenterdie:res10.data,
              listenterfrequency:res11.data,
              listChannel:res12.data,
              listSystemtestType:res13.data,
              listVolt:res14.data,
              listMotherboardspecification:res15.data,
              listMotherboardspecification2:res16.data,
              listtransferintype:res17.data,
              listtransferouttype:res18.data,
            
              listnameproduct1: res19.data,
              listnameproduct2: res20.data,
              listnameproduct3: res21.data,
              listnameproduct4: res22.data,
              listnameproduct5: res23.data,
              listnameproduct6: res24.data,
              listpcbCL:res25.data,
              listpcbNo:res26.data,
              listtransfertype: res27.data
             })
         })
       )
    }
    componentDidMount(){
      this.getAllOption();
    }
     clear =(e)=>{
      e.target.value="";
      }
     render(){
       const descriptionstyle={
        minHeight:'300px',
          resize:'auto',
          padding:'9px',
          boxSizing:'border-box',
          fontSize:'15px',
          width:'450px'
       }
       const description1style={
        minHeight:'200px',
        resize:'auto',
        padding:'9px',
        boxSizing:'border-box',
        fontSize:'15px',
        width:'250px'
       }
       const description2style={
        minHeight:'180px',
        resize:'auto',
        padding:'9px',
        boxSizing:'border-box',
        fontSize:'15px',
        width:'350px'
       }
        const defaultProps = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '22rem', height: '2rem' },
            borderColor: 'text.primary',
          };
          const defaultProps1 = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '22rem', height: '5rem' },
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
        const axiostransferintype = this.state.listtransferintype.map((item,index)=>{
          return <select value={this.state.transferintype}>
       <option key={index} value={item.transferintype}>
       {item.transferintype}
       </option>
       </select>
        })
        const axiostransferouttype = this.state.listtransferouttype.map((item,index)=>{
          return <select value={this.state.transferouttype}>
       <option key={index} value={item.transferouttype}>
       {item.transferouttype}
       </option>
       </select>
        })
        const axiostransfertype = this.state.listtransfertype.map((item,index)=>{
          return <select value={this.state.transfertype}>
          <option key={index} value={item.transfertype}>
          {item.transfertype}
          </option>
          </select>
        })
         const TransferOrderINColumns=[
           {
             field:"transferinnumberid",
           },{
            field:"transferinamount",
           },{
             field:"transferintype",
             editComponent:({value,onChange})=>(
              <div>
              <input 
              list ="transferintype"
              value={value}
              placeholder={this.state.transferintype}
              onChange={(e)=>onChange(e.target.value)}
              />
              <datalist id="transferintype">
                  {axiostransferintype}
              </datalist>
              </div>
          )
           }
         ]
         const TransferOrderOUTColumns=[
           {
             field:"transferoutnumberid"
           },{
             field:"transferoutamount"
           },{
            field:"transferouttype",
            editComponent:({value,onChange})=>(
              <div>
              <input 
              list ="transferouttype"
              value={value}
              placeholder={this.state.transferouttype}
              onChange={(e)=>onChange(e.target.value)}
              />
              <datalist id="transferouttype">
                  {axiostransferouttype}
              </datalist>
              </div>
          )
           }
         ]
          
         const deliverytimeColumns=[
           { 
             title:"M/D/H/M",
             field:"timedatehour",
             editComponent:(({value,onChange})=>(
              <TextField
              name="timedatehour"
              floatingLabelText="M/D/H/M"
              InputLabelProps={{ shrink: true, required: true }}
              type="datetime-local"
              onChange={(e)=>onChange(e.target.value)}
              floatingLabelFixed
              style={{ width: '100%' }}
              value={value}
            />
                    ))
           },{
           title:"Q'ty",
           field:"qty",
           },{
             title:"備註",
             field:"deliverytimedescription",
             editComponent:(({value,onChange})=>(
              <textarea
              name="deliverytimedescription"
              className = "form-control"
              onChange = {(e)=>onChange(e.target.value)}
              value={value}
                 />
             ))
           }
         ]
         const PickingItemDataviewColumns2 =[
          {
           title:"倉別",
           field:"storageclass",
          },
          {
            title:"採購&工單單號",
            field:"buynumber_workorder",
          },{
            title:"IC_Module",
            field:"transfertype",
            editComponent:
            ({value , onChange})=>(
              <select onChange={(e)=>onChange(e.target.value)}>
               <option selected value={value}>
                   {value}
               </option>
               {this.state.listtransfertype.map(
                   (item)=>
                   item !== value && (
                       <option key ={item.transfertype} value ={item.transfertype}>
                           {item.transfertype}
                       </option>
                   )
               )}
              </select>
          )
        },{
            title:"P/N",
            field:"p_n"
          },{
            title:"PCB No.",
            field:"pcbno"
          },{
            title:"數量",
            field:"amount"
          },{
            title:"Pass/Fail",
            field:"pass_fail"
          },{
           title:"維修IC",
           field:"repairic",
           editComponent:
           (props)=>{
             console.log(props);
             return(
             <Checkbox
                 value={this.state.repairic}
                 checked={props.value}
                 name="repairic"
                 onChange={(e)=>props.onChange(e.target.checked)}
             />
             )
          },
          render: (rowdata)=>(
         <Checkbox checked={rowdata.repairic} readOnly />
          )
         },{
            title:"領料單號",
            field:"pickingnumber"
         }
        ]
         const PickingItemDataviewColumns =[
           {
            title:"倉別",
            field:"storageclass",
           },
           {
             title:"採購&工單單號",
             field:"buynumber_workorder",
           },{
             title:"P/N",
             field:"p_n"
           },{
             title:"PCB No.",
             field:"pcbno"
           },{
             title:"數量",
             field:"amount"
           },{
             title:"Pass/Fail",
             field:"pass_fail"
           },{
            title:"維修IC",
            field:"repairic",
            editComponent:
            (props)=>{
              console.log(props);
              return(
              <Checkbox
                  value={this.state.repairic}
                  checked={props.value}
                  name="repairic"
                  onChange={(e)=>props.onChange(e.target.checked)}
              />
              )
           },
           render: (rowdata)=>(
          <Checkbox checked={rowdata.repairic} readOnly />
           )
          },{
             title:"領料單號",
             field:"pickingnumber"
          }
         ]
         return (
             <div className ="content">
          <Modal isOpen={this.state.confirmspecialdescription} toggle={this.handlespecialdescription} >
        <ModalHeader>新增原因備註</ModalHeader>
        <ModalBody>
        <textarea
           style={{width : '470px'}}
          name="specialdescription"
          className = "form-control"
          onChange = {(e)=>{
            this.setState({
              specialdescription : e.target.value
            })
          }}
          value={this.state.specialdescription}
             />
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.handlespecialdescription}>確定</button>
       <button onClick={this.handlespecialdescriptioncancel}>取消</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.confirmspecialdescription2} toggle={this.handlespecialdescription2} >
        <ModalHeader>取消原因備註</ModalHeader>
        <ModalBody>
        <textarea
           style={{width : '470px'}}
          name="specialdescription2"
          className = "form-control"
          onChange = {(e)=>{
            this.setState({
              specialdescription2 : e.target.value
            })
          }}
          value={this.state.specialdescription2}
             />
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.handlespecialdescription2}>確定</button>
       <button onClick={this.handlespecialdescriptioncancel}>取消</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal style={{maxWidth: '2500px', width: '2500px'}} isOpen={this.state.pickitemmenu} toggle={this.handlepickitemmenu} >
        <ModalHeader>工單領料狀況</ModalHeader>
        <ModalBody>
           <Fragment>
            <TableContainer style={{width:1850 ,maxHeight : 350,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 columns={PickingItemDataviewColumns2}
                 data ={this.state.IDdataPickingItem}
                 options ={{search: false,actionsColumnIndex:-1}}
                 title=" "
                 editable={{
                     onRowAdd:(newData)=>
                     new Promise((resolve,reject)=>{
                         setTimeout(()=>{
                             this.setState(
                                 {
                                    IDdataPickingItem :[...this.state.IDdataPickingItem,newData],
                                    PickingItemDataview:{...newData}
                                 })
                                 resolve();
                         },10)
                     }),
                     onRowUpdate:(newData,oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                console.log("new: ",newData);

                                const dataUpdate=[...this.state.IDdataPickingItem];
                                const index = oldData.tableData.id;
                                dataUpdate[index]=newData;
                                this.setState({
                                  PickingItemDataview:{...newData},
                                  IDdataPickingItem:[...dataUpdate]
                                });
                                resolve();
                            },10);
                        }),
                        onRowDelete:(oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dataDelete =[...this.state.IDdataPickingItem];
                                const index=oldData.tableData.id;
                                dataDelete.splice(index,1);
                                this.setState({
                                  IDdataPickingItem:[...dataDelete]
                                });
                                resolve();
                            },10);
                        })
                 }}
                 />
                 </TableContainer>
            </Fragment>

            <Box
          display="flex"
          alignItems="flex-start"
          pl={3}
          mt={1}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          
            <Box pl={7}>
            <ThemeProvider theme={theme}>
          <Typography variant="h6">IC 應領 :</Typography>
          </ThemeProvider>
            </Box>
            <Box pl={1}>
            <TextField
           name="ICshouldreceive"
           value={this.state.ICshouldreceive}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}> <ThemeProvider theme={theme}>
          <Typography variant="h6">實領 :</Typography>
          </ThemeProvider></Box>
            <Box pl={1}>
            <TextField
           name="ICreceived"
           value={this.state.ICreceived}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">未領 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="ICunreceive"
           value={this.state.ICunreceive}
           style={{width:'30%'}}
           />
           </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={3}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <Box pl={1}> 
            <ThemeProvider theme={theme}>
          <Typography variant="h6">SMT IC 應領 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="SMTICshouldreceive"
           value={this.state.SMTICshouldreceive}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}>
            <ThemeProvider theme={theme}>
          <Typography variant="h6">實領 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="SMTICreceived"
           value={this.state.SMTICreceived}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">未領 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="SMTICunreceive"
           value={this.state.SMTICunreceive}
           style={{width:'30%'}}
           />
           </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={3}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          
            <Box pl={1.7}>
            <ThemeProvider theme={theme}>
          <Typography variant="h6">維修IC 應領 :</Typography>
          </ThemeProvider>
            </Box>
            <Box pl={1}>
            <TextField
           name="REPAIRICshouldreceive"
           value={this.state.REPAIRICshouldreceive}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}> <ThemeProvider theme={theme}>
          <Typography variant="h6">實領 :</Typography>
          </ThemeProvider></Box>
            <Box pl={1}>
            <TextField
           name="REPAIRICreceived"
           value={this.state.REPAIRICreceived}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">未領 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="REPAIRICunreceive"
           value={this.state.REPAIRICunreceive}
           style={{width:'30%'}}
           />
           </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={3}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          
            <Box pl={1}>
            <ThemeProvider theme={theme}>
          <Typography variant="h6">Module 應領 :</Typography>
          </ThemeProvider>
            </Box>
            <Box pl={1}>
            <TextField
           name="MODULEICunreceive"
           value={this.state.MODULEICunreceive}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}> <ThemeProvider theme={theme}>
          <Typography variant="h6">實領 :</Typography>
          </ThemeProvider></Box>
            <Box pl={1}>
            <TextField
           name="MODULEICreceived"
           value={this.state.MODULEICreceived}
           style={{width:'30%'}}
           />
           </Box>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">未領 :</Typography>
          </ThemeProvider>
          </Box>
            <Box pl={1}>
            <TextField
           name="MODULEICunreceive"
           value={this.state.MODULEICunreceive}
           style={{width:'30%'}}
           />
           <Box pl={30} mt={-7}>
           <div>
       <button onClick={this.handlepickitemmenu}>確定</button>
      </div>
           </Box>
           </Box>
          </Box>
        </ModalBody>
      <ModalFooter>
      
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.Modeulemenu2} toggle={this.handleModeulemenu2} >
        <ModalHeader>Module Type</ModalHeader>
        <ModalBody>
        <Box pl={1}>
          <Box>
          <TextField
           name="nameproduct1"
           value={this.state.nameproduct1}
           style={{width:'30%'}}
           />
        </Box>
        <Box >
        <TextField
           name="nameproduct2"
           value={this.state.nameproduct2}
           style={{width:'30%'}}
           />
        </Box>
        <Box >
        <TextField
           name="nameproduct6"
           value={this.state.nameproduct6}
           style={{width:'30%'}}
           />
        </Box>
        </Box>
        <Box pl={1} mt={2}>
          PCB No
        </Box>
        <Box pl={1}>
        <Autocomplete
                  inputValue={this.state.pcbno}
                  onChange={(event,newValue)=>{
                    if(newValue){
                          this.setState({
                            pcbno:newValue.pcbno
                          })
                      }
                  }}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          pcbno:e.target.value
                   })
                    }
                  }}
                  options={this.state.listpcbNo}    
                  getOptionLabel={(option) => option.pcbno}
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
        <Box pl={1}>
        <ThemeProvider theme={theme}>
          <Typography variant="h6">Label代碼</Typography>
          </ThemeProvider>
          <Box>
          <TextField
           name="labelcode"
           value={this.state.labelcode}
           style={{width:'30%'}}
           />
           </Box>
          </Box>
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.handleModeulemenu2}>確定</button>
       <button onClick={this.handleModeulemenu2cancel}>取消</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.Modeulemenu} toggle={this.handleModeulemenu} >
        <ModalHeader>Module</ModalHeader>
        <ModalBody>
        <Box pl={1}>
        <ThemeProvider theme={theme}>
          <Typography variant="h6">Module Type :</Typography>
          </ThemeProvider>
          <Box pl={1} mt={-2}>
          <Autocomplete
                  inputValue={this.state.nameproduct1}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            nameproduct1:newValue.nameproduct1
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          nameproduct1:e.target.value
                   })
                    }
                  }}
                  options={this.state.listnameproduct1}
                   
                  getOptionLabel={(option) => option.nameproduct1}
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
        <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.nameproduct2}
                  onChange={(event,newValue)=>{
                    if(newValue){
                          this.setState({
                            nameproduct2:newValue.nameproduct2
                          })
                      }
                  }}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          nameproduct2:e.target.value
                   })
                    }
                  }}
                  options={this.state.listnameproduct2}    
                  getOptionLabel={(option) => option.nameproduct2}
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
        <Box pl={1}>
        <ThemeProvider theme={theme}>
          <Typography variant="h6">Module Freq :</Typography>
          </ThemeProvider>
          <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.nameproduct3}
                  onChange={(event,newValue)=>{
                    if(newValue){
                          this.setState({
                            nameproduct3:newValue.nameproduct3
                          })
                      }
                  }}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          nameproduct3:e.target.value
                   })
                    }
                  }}
                  options={this.state.listnameproduct3}    
                  getOptionLabel={(option) => option.nameproduct3}
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
        <Box pl={1}>
        <ThemeProvider theme={theme}>
          <Typography variant="h6">CL Value :</Typography>
          </ThemeProvider>
          <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.pcbCL}
                  onChange={(event,newValue)=>{
                    if(newValue){
                          this.setState({
                            pcbCL:newValue.pcbCL
                          })
                      }
                  }}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          pcbCL:e.target.value
                   })
                    }
                  }}
                  options={this.state.listpcbCL}    
                  getOptionLabel={(option) => option.pcbCL}
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
                   <Box pl={40} mt={-7}>
        <FormControl component="fieldset">
      <FormLabel component="legend">Bank</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={this.state.bank} 
      onChange={
        
        (e)=>{
          if(this.state.showadd ==true || this.state.showEdit ==true){
          this.setState({
          bank : e.target.value
      })
        }
      }}>
        <FormControlLabel value="1 Bank" control={<Radio />} label="1 Bank" />
        <FormControlLabel value="2 Bank" control={<Radio />} label="2 Bank" />
        <FormControlLabel value="4 Bank" control={<Radio />} label="4 Bank"/>
      </RadioGroup>
    </FormControl>
        </Box>
        </Box>
        </Box>
        <Box pl={1} mt={-15}>
        <ThemeProvider theme={theme}>
          <Typography variant="h6">Material(die) :</Typography>
          </ThemeProvider>
          <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.nameproduct4}
                  onChange={(event,newValue)=>{
                    if(newValue){
                          this.setState({
                            nameproduct4:newValue.nameproduct4
                          })
                      }
                  }}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          nameproduct4:e.target.value
                   })
                    }
                  }}
                  options={this.state.listnameproduct4}    
                  getOptionLabel={(option) => option.nameproduct4}
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
        <Box pl={1}>
        <ThemeProvider theme={theme}>
          <Typography variant="h6">IC Package Type :</Typography>
          </ThemeProvider>
          <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.nameproduct5}
                  onChange={(event,newValue)=>{
                    if(newValue){
                          this.setState({
                            nameproduct5:newValue.nameproduct5
                          })
                      }
                  }}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          nameproduct5:e.target.value
                   })
                    }
                  }}
                  options={this.state.listnameproduct5}    
                  getOptionLabel={(option) => option.nameproduct5}
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
        <Box pl={1}>
        <ThemeProvider theme={theme}>
          <Typography variant="h6">IC Type :</Typography>
          </ThemeProvider>
          <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.nameproduct6}
                  onChange={(event,newValue)=>{
                    if(newValue){
                          this.setState({
                            nameproduct6:newValue.nameproduct6
                          })
                      }
                  }}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          nameproduct6:e.target.value
                   })
                    }
                  }}
                  options={this.state.listnameproduct6}    
                  getOptionLabel={(option) => option.nameproduct6}
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
        <Box pl={1}>
        <ThemeProvider theme={theme}>
          <Typography variant="h6">Module Size :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="nameproduct7"
           value={this.state.nameproduct7}
           style={{width:'45%'}}
           />
          </Box>
          <Box pl={1}>
        <ThemeProvider theme={theme}>
          <Typography variant="h6">PCB NO :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="pcbNo"
           value={this.state.pcbNo}
           onChange={this.handleChange}
           style={{width:'45%'}}
           />
            <button onClick={this.handleModeulemenu2}>...</button>
          </Box>
          <Box pl={10}>

          </Box>
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.handleModeulemenu}>確定</button>
       <button onClick={this.handleModeulemenucancel}>取消</button>
      </div>
      </ModalFooter>
     </Modal>
                  
     <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={2}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">編號/制表/時間 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
          <TextField
           name="casedID"
           disabled={this.state.showEdit}
           value={this.state.casedID}
           onChange ={this.handleChange}
           style={{width:'7%'}}
           />
           <Box pl={1}></Box>
          <TextField
           name="numbertabulation"
           value={this.state.numbertabulation}
           onChange ={this.handleChange}
           style={{width:'7%'}}
           />
           <Box pl={1}></Box>
          <TextField
        name="numberdatetime"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangenumberdatetime}
        floatingLabelFixed
        style={{ width: '10%' }}
        value={this.state.numberdatetime.date}
      
      />
         
          <Box 
                display="flex" 
                justifyContent="center" 
                border={1} 
                {...defaultProps}>
                <Typography variant="h5"> Module Production Process</Typography>
          </Box>
          <Box 
                display="flex" 
                justifyContent="center" 
                border={1} 
                {...defaultProps}>
                <Typography variant="h5">Test Program</Typography>
          </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
           <Box pl={5.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">修改/時間 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
          <TextField
           name="modify"
           value={this.state.modify}
           onChange ={this.handleChange}
           style={{width:'7%'}}
           />
              <Box pl={1}></Box>
          <TextField
        name="modifydatetime"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangemodifydatetime}
        floatingLabelFixed
        style={{ width: '10%' }}
        value={this.state.modifydatetime.date}
 
      />
         <Box pl={1}>
           <button onClick={this.handlespecialdescription}>+</button>
         </Box>
          <Box pl={15.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">IC Sorting</Typography>
          </ThemeProvider>
          </Box>
         <Box mt={-0.7}>
          <Checkbox
            value = {this.state.ICSorting}
            checked = {this.state.ICSorting}
            onChange={this.handleChecked}
            name ="storageconfirm"
        />
        </Box>
        <Box pl={15}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">SMT</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={-0.7}>
          <Checkbox
            value = {this.state.SMT}
            checked = {this.state.SMT}
            onChange={this.handleChecked}
            name ="SMT"
        />
        </Box>
        <Box pl={3.5} mt={-2}>
        <Autocomplete
                  inputValue={this.state.Channel}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                          this.setState({
                               Channel:newValue.Channel
                          })
                      }
                  }}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          Channel:e.target.value
                   })
                    }
                  }}
                  options={this.state.listChannel}
                   
                  getOptionLabel={(option) => option.Channel}
                  style={{ width: 350 }}
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
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                <Box pl={6} >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">領料規格 :</Typography>
          </ThemeProvider>
          </Box> 
          <Box  pl={1} mt={-2}>
          <Autocomplete
                  inputValue={this.state.pickingspecification}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            pickingspecification:newValue.pickingspecification
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          pickingspecification:e.target.value
                   })
                    }
                  }}
                  options={this.state.listpickingspecification}
                   
                  getOptionLabel={(option) => option.pickingspecification}
                  style={{ width: 470 }}
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
                <Box pl={2.9}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">PCB Cut</Typography>
          </ThemeProvider>
          </Box>
         <Box mt={-0.7}>
          <Checkbox
            value = {this.state.PCBCut}
            checked = {this.state.PCBCut}
            onChange={this.handleChecked}
            name ="PCBCut"
        />
        </Box>
        <Box pl={11}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">EE RPG</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={-0.7}>
          <Checkbox
            value = {this.state.EEPRG}
            checked = {this.state.EEPRG}
            onChange={this.handleChecked}
            name ="EEPRG"
        />
        </Box>
        <Box pl={3.5} mt={-2}>
        <Autocomplete
                  inputValue={this.state.SystemtestType}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            SystemtestType:newValue.SystemtestType
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          SystemtestType:e.target.value
                   })
                    }
                  }}
                  options={this.state.listSystemtestType}
                   
                  getOptionLabel={(option) => option.SystemtestType}
                  style={{ width: 350 }}
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
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                <Box pl={8.2} >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">IC等級 :</Typography>
          </ThemeProvider>
          </Box> 
          <Box pl={1} mt={-2}>
          <Autocomplete 
                  inputValue={this.state.iclevel}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                      if(newValue){
                          this.setState({
                            iclevel:newValue.iclevel
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          iclevel:e.target.value
                   })
                    }
                  }}
                  options={this.state.listiclevel}
                  getOptionLabel={(option) => option.iclevel}
                  style={{ width: 100 }}
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
        <Box pl={13.5} >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">IC Size :</Typography>
          </ThemeProvider>
          </Box> 
          <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.icsize}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            icsize:newValue.icsize
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          icsize:e.target.value
                   })
                    }
                  }}
                  options={this.state.listicsize}
                   
                  getOptionLabel={(option) => option.icsize}
                  style={{ width: 140 }}
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
        <Box pl={9.8}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Testing</Typography>
          </ThemeProvider>
          </Box>
         <Box mt={-0.7}>
          <Checkbox
            value = {this.state.Testing}
            checked = {this.state.Testing}
            onChange={this.handleChecked}
            name ="Testing"
        />
        </Box>
        <Box pl={13.1}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Repair</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={-0.7}>
          <Checkbox
            value = {this.state.Repair}
            checked = {this.state.Repair}
            onChange={this.handleChecked}
            name ="Repair"
        />
        </Box>
        <Box pl={3.5} mt={-2}>
        <Autocomplete
                  inputValue={this.state.Volt}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            Volt:newValue.Volt
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          Volt:e.target.value
                   })
                    }
                  }}
                  options={this.state.listVolt}
                   
                  getOptionLabel={(option) => option.Volt}
                  style={{ width: 350 }}
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
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
           <Box pl={5.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">品名規格 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
          <TextField
           name="nameproduct1"
           value={this.state.nameproduct1}
           style={{width:'7%'}}
           />
              <Box pl={1}></Box>
              <TextField
           name="nameproduct2"
           value={this.state.nameproduct2}
           
           style={{width:'7%'}}
           />
            <Box pl={1}></Box>
              <TextField
           name="nameproduct3"
           value={this.state.nameproduct3}
           
           style={{width:'7%'}}
           />
          <Box pl={14.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Cover</Typography>
          </ThemeProvider>
          </Box>
         <Box mt={-0.7}>
          <Checkbox
            value = {this.state.Cover}
            checked = {this.state.Cover}
            onChange={this.handleChecked}
            name ="Cover"
        />
        </Box>
        <Box pl={11.7}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Marking</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={-0.7}>
          <Checkbox
            value = {this.state.Marking}
            checked = {this.state.Marking}
            onChange={this.handleChecked}
            name ="Marking"
        />
        </Box>
        <Box pl={2.5} mt={-2}>
        <Box 
                display="flex" 
                justifyContent="center" 
                border={1} 
                {...defaultProps}>
                <Typography variant="h5">Mother Board</Typography>
          </Box>
        </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box pl={9}></Box>
          <TextField
           name="nameproduct4"
           value={this.state.nameproduct4}
           
           style={{width:'5%'}}
           />
              <Box pl={1}></Box>
              <TextField
           name="nameproduct5"
           value={this.state.nameproduct5}
           
           style={{width:'5%'}}
           />
            <Box pl={1}></Box>
              <TextField
           name="nameproduct6"
           value={this.state.nameproduct6}
           
           style={{width:'5%'}}
           />
           <Box pl={1}></Box>
              <TextField
           name="nameproduct7"
           value={this.state.nameproduct7}
           
           style={{width:'5%'}}
           />
           <Box pl={1}></Box>
              <TextField
           name="bank"
           value={this.state.bank}
           style={{width:'5%'}}
           />
           <Box pl={1}></Box>
           <button onClick={this.handleModeulemenu}>...</button>
           <Box pl={8}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Label</Typography>
          </ThemeProvider>
          </Box>
         <Box mt={-0.7}>
          <Checkbox
            value = {this.state.Label}
            checked = {this.state.Label}
            onChange={this.handleChecked}
            name ="Label"
        />
        </Box>
        <Box pl={11.7}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Packing</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={-0.7}>
          <Checkbox
            value = {this.state.Packing}
            checked = {this.state.Packing}
            onChange={this.handleChecked}
            name ="Packing"
        />
        </Box>
        <Box pl={3.5} mt={-2}>
        <Autocomplete
                  inputValue={this.state.Motherboardspecification}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            Motherboardspecification:newValue.Motherboardspecification
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          Motherboardspecification:e.target.value
                   })
                    }
                  }}
                  options={this.state.listMotherboardspecification}
                   
                  getOptionLabel={(option) => option.Motherboardspecification}
                  style={{ width: 350 }}
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
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <Box pl={2}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">PCB No./CL :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
          <TextField
           name="pcbNo"
           value={this.state.pcbNo}
           onChange ={this.handleChange}
           style={{width:'7%'}}
           />
              <Box pl={10} mt={-2}>
              <Autocomplete
                  inputValue={this.state.pcbCL}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            pcbCL:newValue.pcbCL
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          pcbCL:e.target.value
                   })
                    }
                  }}
                  options={this.state.listpcbCL}
                   
                  getOptionLabel={(option) => option.pcbCL}
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
          <Box pl={16.2}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Resorting</Typography>
          </ThemeProvider>
          </Box>
         <Box mt={-0.7}>
          <Checkbox
            value = {this.state.Resorting}
            checked = {this.state.Resorting}
            onChange={this.handleChecked}
            name ="storageconfirm"
        />
        </Box>
        <Box pl={7.4}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">DownGrade</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={-0.7}>
          <Checkbox
            value = {this.state.DownGrade}
            checked = {this.state.DownGrade}
            onChange={this.handleChecked}
            name ="DownGrade"
        />
        </Box>
        <Box pl={3.5} mt={-2}>
        <Autocomplete
                  inputValue={this.state.Motherboardspecification2}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            Motherboardspecification2:newValue.Motherboardspecification2
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          Motherboardspecification2:e.target.value
                   })
                    }
                  }}
                  options={this.state.listMotherboardspecification2}
                   
                  getOptionLabel={(option) => option.Motherboardspecification2}
                  style={{ width: 350 }}
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
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
                <Box pl={7.2} >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Vendor :</Typography>
          </ThemeProvider>
          </Box> 
          <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.vendor}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            vendor:newValue.vendor
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          vendor:e.target.value
                   })
                    }
                  }}
                  options={this.state.listvendor}
                   
                  getOptionLabel={(option) => option.vendor}
                  style={{ width: 140 }}
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
        <Box pl={17} >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">客戶 :</Typography>
          </ThemeProvider>
          </Box> 
          <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.client}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            client:newValue.client
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          client:e.target.value
                   })
                    }
                  }}
                  options={this.state.listclient}
                   
                  getOptionLabel={(option) => option.client}
                  style={{ width: 140 }}
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
        <Box pl={7.8}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">植球</Typography>
          </ThemeProvider>
          </Box>
         <Box mt={-0.7}>
          <Checkbox
            value = {this.state.Reballing}
            checked = {this.state.Reballing}
            onChange={this.handleChecked}
            name ="Reballing"
        />
        </Box>
        <Box pl={15.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">拆板</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={-0.7}>
          <Checkbox
            value = {this.state.Dismantle}
            checked = {this.state.Dismantle}
            onChange={this.handleChecked}
            name ="Dismantle"
        />
        </Box>
        <Box pl={2.5}></Box>
        <Box    
                display="flex" 
                justifyContent="center" 
                border={1} 
                {...defaultProps1}>
                <Typography variant="h5">Label Veified</Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <Box pl={2}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Order No/ATR# :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
          <TextField
           name="orderNo"
           value={this.state.orderNo}
           onChange ={this.handleChange}
           style={{width:'7%'}}
           />
               <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.orderATR}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            orderATR:newValue.orderATR
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          orderATR:e.target.value
                   })
                    }
                  }}
                  options={this.state.listorderATR}
                   
                  getOptionLabel={(option) => option.orderATR}
                  style={{ width: 140 }}
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
          <Box pl={26.8}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">分BIN</Typography>
          </ThemeProvider>
          </Box>
         <Box mt={-0.7}>
          <Checkbox
            value = {this.state.SplitBIN}
            checked = {this.state.SplitBIN}
            onChange={this.handleChecked}
            name ="SplitBIN"
        />
        </Box>
        <Box pl={8.4}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">相容性驗證</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={-0.7}>
          <Checkbox
            value = {this.state.Compatibility}
            checked = {this.state.Compatibility}
            onChange={this.handleChecked}
            name ="Compatibility"
        />
        </Box>
        </Box>
        <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">數量/備品/維修IC :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
          <TextField
           name="icamount"
           value={this.state.icamount}
           onChange ={this.handleChange}
           style={{width:'7%'}}
           />
           <Box pl={1}></Box>
          <TextField
           name="icbackupproduct"
           value={this.state.icbackupproduct}
           onChange ={this.handleChange}
           style={{width:'7%'}}
           />
           <Box pl={1}></Box>
           <TextField
           name="icrepair"
           value={this.state.icrepair}
           onChange ={this.handleChange}
           style={{width:'7%'}}
           />
           <Box pl={7}>
           備註:
         </Box>
         <Box pl={10} mt={-1}>
         <Checkbox
            value = {this.state.maincancel}
            checked = {this.state.maincancel}
            onChange={this.handleChecked}
            name ="maincancel"
        />
         </Box>
         <Box >
            取消
         </Box>
         <Box pl={1}>
           <button onClick={this.handlespecialdescription2}>+</button>
         </Box>
         <Box pl={20} mt={1}>
    <button 
    disabled={
     !(this.state.showEdit && !this.state.showadd)
  &&!(!this.state.showEdit && this.state.showadd)
            } 
    onClick={this.handlesave}>
    儲存
    </button>
    </Box>
    <Box pl={2} mt={1}>
   <button disabled={this.state.showEdit == true || this.state.showadd == true} onClick={this.ADD}>
       {this.state.buttonadd}
   </button>
    </Box>
    <Box pl={2} mt={1}>
    <button disabled={this.state.showadd == true ||this.state.showEdit == true} onClick={this.handleshowEdit}>
       {this.state.buttonText}
    </button>
    </Box>
    <Box pl={2} mt={1}>
     <button onClick={this.handledelete}>刪除</button>
    </Box>
    <Box pl={2} mt={1}>
    <button disabled={!(this.state.showEdit && !this.state.showadd)
  &&!(!this.state.showEdit && this.state.showadd)
          } onClick={this.handlecancel}>取消</button>
    </Box>
         </Box>
         
         <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box pl={3.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">新品不良維修 :</Typography>
          </ThemeProvider>
          </Box>
          <Box mt={-0.7}>
          <Checkbox
            value = {this.state.newproductrepair}
            checked = {this.state.newproductrepair}
            onChange={this.handleChecked}
            name ="newproductrepair"
        />
        </Box>
        <Box pl={17}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">PO Qty :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
          <TextField
           name="poQty"
           value={this.state.poQty}
           onChange ={this.handleChange}
           style={{width:'7%'}}
           />
           <Box pl={11}></Box>
           <textarea
           style={descriptionstyle}
          name="description"
          className = "form-control"
          onChange = {this.handleChange}
          value={this.state.description}
             />
             <Box pl={1}>
           <textarea
           style={description1style}
          name="description1"
          className = "form-control"
          onChange = {this.handleChange}
          value={this.state.description1}
             />
             <Box mt={1}>
              <textarea
           style={{width : '250px'}}
          name="description"
          className = "form-control"
          onChange = {this.handleChange}
          value={this.state.description}
             />
             </Box>
             </Box>
           </Box>
           
           <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
           <Box pl={2} >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Expect / Actual :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
          <TextField
        name="expect"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangeexpect}
        floatingLabelFixed
        style={{ width: '10%' }}
        value={this.state.expect.date}
 
      />
       <Box pl={1}></Box>
          <TextField
        name="actual"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangeactual}
        floatingLabelFixed
        style={{ width: '10%' }}
        value={this.state.actual.date}
      />
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              <Box pl={8.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Shipping :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.shipping}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            shipping:newValue.shipping
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          shipping:e.target.value
                   })
                    }
                  }}
                  options={this.state.listshipping}
                   
                  getOptionLabel={(option) => option.shipping}
                  style={{ width: 140 }}
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
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
              <Box pl={3}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">SPD Code/CL :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
          <TextField
           name="spdCode"
           value={this.state.spdCode}
           onChange ={this.handleChange}
           style={{width:'10%'}}
           />
            <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.spdCL}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){               
                    if(newValue){
                          this.setState({
                            spdCL:newValue.spdCL
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          spdCL:e.target.value
                   })
                    }
                  }}
                  options={this.state.listspdCL}
                   
                  getOptionLabel={(option) => option.spdCL}
                  style={{ width: 170 }}
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
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
             <Box pl={10}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">採單No. :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="purchaseNo"
           value={this.state.purchaseNo}
           onChange ={this.handleChange}
           style={{width:'197%'}}
           />
            </Box>
            <Box pl={24}>
              <button onClick={this.handlepickitemmenu}>領料狀況</button>
            </Box>
            </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
             <Box pl={10}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Lot No. :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="lotNo"
           value={this.state.lotNo}
           onChange ={this.handleChange}
           style={{width:'200%'}}
           />
            </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
             <Box pl={6.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">ModulePN :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="ModulePN"
           value={this.state.ModulePN}
           onChange ={this.handleChange}
           style={{width:'230%'}}
           />
            </Box>
            </Box>
            <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
             <Box pl={10.5}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">IC P/N :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}>
          <TextField
           name="icPN"
           value={this.state.icPN}
           onChange ={this.handleChange}
           style={{width:'230%'}}
           />
            </Box>
            </Box>
            <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box pl={4}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">Lot/庫存 No. :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1}></Box>
          <TextField
           name="lot"
           value={this.state.lot}
           onChange ={this.handleChange}
           style={{width:'13%'}}
           />
             <Box pl={1}></Box>
          <TextField
           name="lotstorageNo"
           value={this.state.lotstorageNo}
           onChange ={this.handleChange}
           style={{width:'10.5%'}}
           />
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <Box pl={2}>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">測試類別/數量 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.testclass}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            testclass:newValue.testclass
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          testclass:e.target.value
                   })
                    }
                  }}
                  options={this.state.listtestclass}
                   
                  getOptionLabel={(option) => option.testclass}
                  style={{ width: 245 }}
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
            <Box pl={1}></Box>
          <TextField
           name="testamount"
           value={this.state.testamount}
           onChange ={this.handleChange}
           style={{width:'10.5%'}}
           />
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
            <Box>
          <ThemeProvider theme={theme}>
          <Typography variant="h6">入庫Die/入庫頻率 :</Typography>
          </ThemeProvider>
          </Box>
          <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.enterdie}  
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            enterdie:newValue.enterdie
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          enterdie:e.target.value
                   })
                    }
                  }}
                  options={this.state.listenterdie}
                   
                  getOptionLabel={(option) => option.enterdie}
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
            <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.enterfrequency}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            enterfrequency:newValue.enterfrequency
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          enterfrequency:e.target.value
                   })
                    }
                  }}
                  options={this.state.listenterfrequency}
                   
                  getOptionLabel={(option) => option.enterfrequency}
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
            <Box pl={10} mt={-15}>
            {this.state.showEdit == true || this.state.showadd == true ? 
            <Fragment>
            <TableContainer style={{maxHeight : 170,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={deliverytimeColumns}
                 data={this.state.IDdataDeliveryTime}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 title ="DeliveryTime"
                 editable={{
                     onRowAdd:(newData)=>
                     new Promise((resolve,reject)=>{
                         setTimeout(()=>{
                             this.setState(
                                 {
                                    IDdataDeliveryTime :[...this.state.IDdataDeliveryTime,newData],
                                    DeliveryTimeDataview:{...newData}
                                 })
                                 resolve();
                         },10)
                     }),
                     onRowUpdate:(newData,oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                console.log("new: ",newData);

                                const dataUpdate=[...this.state.IDdataDeliveryTime];
                                const index = oldData.tableData.id;
                                dataUpdate[index]=newData;
                                this.setState({
                                  DeliveryTimeDataview:{...newData},
                                  IDdataDeliveryTime:[...dataUpdate]
                                });
                                resolve();
                            },10);
                        }),
                        onRowDelete:(oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dataDelete =[...this.state.IDdataDeliveryTime];
                                const index=oldData.tableData.id;
                                dataDelete.splice(index,1);
                                this.setState({
                                  IDdataDeliveryTime:[...dataDelete]
                                });
                                resolve();
                            },10);
                        })
                 }}
                />
                </TableContainer>
            </Fragment>: 
            <Fragment>
            <TableContainer style={{maxHeight : 170,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 stickyHeader
                 title ="DeliveryTime"
                 columns={deliverytimeColumns}
                 data ={this.state.IDdataDeliveryTime}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
            <Box pl={1} mt={-15}>
            <textarea
           style={description2style}
          name="description2"
          className = "form-control"
          onChange = {this.handleChange}
          value={this.state.description2}
             />
            </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          <Box pl={1} mt={2}>
            {this.state.showEdit == true || this.state.showadd == true ? 
            <Fragment>
            <TableContainer style={{width:400 ,maxHeight : 170,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={TransferOrderINColumns}
                 data={this.state.IDdataTransferOrderIN}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 title ="轉單(入)"
                 editable={{
                     onRowAdd:(newData)=>
                     new Promise((resolve,reject)=>{
                         setTimeout(()=>{
                             this.setState(
                                 {
                                  IDdataTransferOrderIN :[...this.state.IDdataTransferOrderIN,newData],
                                  TransferOrderIN:{...newData}
                                 })
                                 resolve();
                         },10)
                     }),
                     onRowUpdate:(newData,oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                console.log("new: ",newData);

                                const dataUpdate=[...this.state.IDdataTransferOrderIN];
                                const index = oldData.tableData.id;
                                dataUpdate[index]=newData;
                                this.setState({
                                  TransferOrderIN:{...newData},
                                    IDdataTransferOrderIN:[...dataUpdate]
                                });
                                resolve();
                            },10);
                        }),
                        onRowDelete:(oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dataDelete =[...this.state.IDdataTransferOrderIN];
                                const index=oldData.tableData.id;
                                dataDelete.splice(index,1);
                                this.setState({
                                  IDdataTransferOrderIN:[...dataDelete]
                                });
                                resolve();
                            },10);
                        })
                 }}
                />
                </TableContainer>
            </Fragment>: 
            <Fragment>
            <TableContainer style={{width:400 ,maxHeight : 170,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 title ="轉單(入)"
                 columns={TransferOrderINColumns}
                 data ={this.state.IDdataTransferOrderIN}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
            <Box pl={1} mt={2}>
            {this.state.showEdit == true || this.state.showadd == true ? 
            <Fragment>
            <TableContainer style={{width:400 ,maxHeight : 170,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={TransferOrderOUTColumns}
                 data={this.state.IDdataTransferOrderOUT}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 title ="轉單(出)"
                 editable={{
                     onRowAdd:(newData)=>
                     new Promise((resolve,reject)=>{
                         setTimeout(()=>{
                             this.setState(
                                 {
                                  IDdataTransferOrderOUT :[...this.state.IDdataTransferOrderOUT,newData],
                                  TransferOrderOUT:{...newData}
                                 })
                                 resolve();
                         },10)
                     }),
                     onRowUpdate:(newData,oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                console.log("new: ",newData);

                                const dataUpdate=[...this.state.IDdataTransferOrderOUT];
                                const index = oldData.tableData.id;
                                dataUpdate[index]=newData;
                                this.setState({
                                    TransferOrderOUT:{...newData},
                                    IDdataTransferOrderOUT:[...dataUpdate]
                                });
                                resolve();
                            },10);
                        }),
                        onRowDelete:(oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dataDelete =[...this.state.IDdataTransferOrderOUT];
                                const index=oldData.tableData.id;
                                dataDelete.splice(index,1);
                                this.setState({
                                  IDdataTransferOrderOUT:[...dataDelete]
                                });
                                resolve();
                            },10);
                        })
                 }}
                />
                </TableContainer>
            </Fragment>: 
            <Fragment>
            <TableContainer style={{width:400 ,maxHeight : 170,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 title ="轉單(出)"
                 columns={TransferOrderOUTColumns}
                 data ={this.state.IDdataTransferOrderOUT}
                 options ={{search:false,actionsColumnIndex:-1,paging: false}}
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
            <Box pl={20} mt={7}>
            <Box >
          <ThemeProvider theme={theme}>
          <Typography variant="h6">對應工單 :</Typography>
          </ThemeProvider>
          </Box>
                <Box>
            <TextField
           name="correspondworkorder"
           value={this.state.correspondworkorder}
           onChange ={this.handleChange}
           style={{width:'100%'}}
           />
            </Box>
            </Box>
          </Box>
          <Box
          display="flex"
          alignItems="flex-start"
          pl={3}
          mt={15}
          bgcolor="background.paper"
          css={{ height: 100 }}
          >
          {this.state.showEdit == true || this.state.showadd == true ? 
            <Fragment>
            <TableContainer style={{width:1500 ,maxHeight : 250,border: "5px solid rgba(224, 224, 224, 1)"}}>
                <Table
                 columns={PickingItemDataviewColumns}
                 data={this.state.IDdataPickingItem}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="領料Item"
                 editable={{
                     onRowAdd:(newData)=>
                     new Promise((resolve,reject)=>{
                         setTimeout(()=>{
                             this.setState(
                                 {
                                    IDdataPickingItem :[...this.state.IDdataPickingItem,newData],
                                    PickingItemDataview:{...newData}
                                 })
                                 resolve();
                         },10)
                     }),
                     onRowUpdate:(newData,oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                console.log("new: ",newData);

                                const dataUpdate=[...this.state.IDdataPickingItem];
                                const index = oldData.tableData.id;
                                dataUpdate[index]=newData;
                                this.setState({
                                  PickingItemDataview:{...newData},
                                  IDdataPickingItem:[...dataUpdate]
                                });
                                resolve();
                            },10);
                        }),
                        onRowDelete:(oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dataDelete =[...this.state.IDdataPickingItem];
                                const index=oldData.tableData.id;
                                dataDelete.splice(index,1);
                                this.setState({
                                  IDdataPickingItem:[...dataDelete]
                                });
                                resolve();
                            },10);
                        })
                 }}
                />
                </TableContainer>
            </Fragment>: 
            <Fragment>
            <TableContainer style={{width:1800 ,maxHeight : 170,border: "5px solid rgba(224, 224, 224, 1)"}}>
            <Table
                 columns={PickingItemDataviewColumns}
                 data ={this.state.IDdataPickingItem}
                 options ={{search: false,actionsColumnIndex:-1}}
                 title ="領料Item"
                 />
                 </TableContainer>
            </Fragment>}
            </Box>
             </div>
         )
     }
}
export default DataWorkOrder