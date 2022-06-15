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
import { createTheme, ThemeProvpur_noer } from '@material-ui/core/styles';
import { MuiThemeProvpur_noer } from 'material-ui/styles';
import { ModalDialog } from 'react-bootstrap';
import { AutoComplete, SelectField } from 'material-ui';
import Icon from '@material-ui/core/Icon';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Axiostest8 from './Axiostest8';
class DataListPurchase extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            pur_nodata:[],
            pur_nodata2:[],

            listvendor_no:[],
            listwarehouse_no:[],
            listic_level:[],
            listback_no:[],
            listproduct_no:[],
            listpcb_no:[],
            
            modal:null,
            permissionmodal:null,
            Addpermissionmodal: null,
            Deletepermissionmodal: null,
            Editpermissionmodal: null,
            nopermissiondeletemodal: null,
            wh_chkwarning:null,
            wh_chkcheckedwarning:null,

            pur_no112:null,
            pur_no113:null,
            incoming_incoming_flag1:null,
            incoming_stock_flag1: null,
            vendor_Notlist : null,
            askforDelete : null,
            askforDeleteyes : null,
            askforaddItem: null,
            askforaddItemyes:null,
            askforenterloan_no:null,
            
            
            onlydeleteunconfirmItem : null, 
            undo:false,
            
            levelwarning: null,
            warehouse_nowarning: null,
            level_warehouse_warning:null,
            pcb_no_warning:null,
            labelnovalue_warning:null,
            currentitementerinspection: null,
            currentitementerinspectionyes: null,
            in_nomodal:null,
            in_noemptymodal:null,
            inspectionunconfirm: null,
            inspectionunconfirmyes:null,

        del_btn:null,
        add_btn:null,
        save_btn: null,
        edit_btn:null,
        incoming_check_locked:null,
        wh_chk_locked:null,
        invoice_no_locked:null,
        incoming_check_date_locked:null,

        confirmdelete:false,
        showadd:false,
        showEdit:false,
        buttonadd:"新增",
        buttonText:"修改",
        buttonsave:"儲存",
          
           login_name:"David",
           in_no:"",
            Combo15:null,
            Combo18: null,
            vendor_no:"",
            pur_no:"",

            pur_no1:"",
            vendor:"",
            people:"",
            remark:"",
            people_time :"",
            Dataview:{
                warehouse_no:"",
                ic_level:"",
                loan_no:"",
                back_no:"",
                pre_date:"",
                act_date:"",
                product_no:"",
                pcb_no:"",
                unit_price:"",
                pur_qty:"",
                act_incoming_qty:"",
                unincoming_qty:"",
                spare_qty : "",
                change_qty :"",
                remark : "",
                incoming_check: false,
                wh_chk : false,
                invoice_no: "",
                incoming_check_date : "",

                incoming_date: "",
            }
    }
}
getAllOption =()=>{
          
    axios.all([
        axios.get("http://localhost:3003/data"),
        axios.get("http://localhost:3003/listwarehouse_no"),
        axios.get("http://localhost:3003/listic_level"),
        axios.get("http://localhost:3003/listback_no"),
        axios.get("http://localhost:3003/listproduct_no"),
        axios.get("http://localhost:3003/listpcb_no"),
        axios.get("http://localhost:3003/listvendor_no"),
    ])
     .then(
       axios.spread((
        res,res1,res2,res3,res4,res5,res6
         )=>{
           this.setState({
            data:res.data,
            listwarehouse_no:res1.data,
            listic_level:res2.data,
            listback_no:res3.data,
            listproduct_no:res4.data,
            listpcb_no:res5.data,
            listvendor_no:res6.data
           })
       })
     )
  }
 
 componentDpur_noMount(){
     this.getAllOption();
 }
 incoming_check_AfterUpdate=()=>{
     if(this.state.wh_chk === true){
         this.setState({
            wh_chkcheckedwarning: !this.state.wh_chkcheckedwarning,  
          
        })
         if(this.state.incoming_check === true){
              this.setState({
                  incoming_check: false
              })
         }
         else{
             this.setState({
                 incoming_check: true
             })
         }
     } 
     else {
         if(this.state.incoming_check === true){
             if((this.state.act_incoming_qty || 0) == "" || (this.state.spare_qty || 0) == "" || (this.state.change_qty || 0) == ""){
                this.setState({
                    labelnovalue_warning:!this.state.labelnovalue_warning,
                    incoming_check:false 
                })
             }
         }
     }
 }
 wh_chk_AfterUpdate=()=>{
     const month= new Date().getFullYear()
     const day = new Date().toLocaleDateString()
     const time =  new Date().toLocaleTimeString();
     if(this.state.incoming_check === true && this.state.wh_chk === true){
         this.setState({
             currentitementerinspection:!this.state.currentitementerinspection
         })
        if(this.state.currentitementerinspectionyes === true){
            this.setState({
                in_nomodal:!this.state.in_nomodal
             })
             if(this.state.in_no === ""){
                this.setState({
                  in_noemptymodal:!this.state.in_noemptymodal,   
                  wh_chk:false
                })
             }
             else{
                 this.setState({
                     invoice_no:this.state.in_no,
                 })
                if(this.state.incoming_check == true){
                    
                    this.setState({
                        incoming_date : day
                        //接後端 Set temp = CurrentDb.OpenRecordset("SELECT Max(Mid([incoming_no],5,5)+1) AS maxno FROM dbo_incoming_detail GROUP BY Year([incoming_date]) & Month([incoming_date]), Mid([incoming_no],1,4) HAVING (((Year([incoming_date]) & Month([incoming_date]))=Year(Date()) & Month(Date())) AND ((Mid([incoming_no],1,4))=right(Year(Date()),2) & IIf(Month(Date())<10,'0' & Month(Date()),Month(Date()))))")
                        /**
                         if temp.RecordCount = 0 {
                             this.setState({
                                 incoming_no : year.slice(0,2) + month + "00001"
                             })
                         }
                         else {
                             const maxno = temp.maxno.charAt(5)          
                             maxno = Switch(
                                 case (maxno.length === 1) :
                                     "0000" + maxno
                                 case (maxno.length === 2) :
                                     "000" + maxno
                                 case (maxno.length === 3) :
                                     "00" + maxno
                                 case (maxno.length === 4) :
                                     "0" + maxno
                             )
                             this.setState({
                                 incoming_no : year.slice(0,2) + month + maxno
                             })
                         } 
                         */
                        
                    })
                    if(this.state.warehouse_no === "007" || this.state.warehouse_no === "103"){
                        //const path =  CurrentProject.path & "\report\incoming_ark.xls"
                        /**
                         Set oApp = New Excel.Application
                         oApp.Visible = False
                         Set oappwork = oApp.Workbooks.Open(path)
                         Set oappwork_iqc = oappwork.Worksheets("檢驗單")
                         */
                    }
                    else{
                        /**
                         path = CurrentProject.path & "\report\incoming.xls"
                         Set oApp = New Excel.Application
                         oApp.Visible = False
                         Set oappwork = oApp.Workbooks.Open(path)
                         Set oappwork_iqc = oappwork.Worksheets("檢驗單")
                         */
                    }
                    //Set temp_incoming = CurrentDb.OpenRecordset(" SELECT incoming.pur_no, incoming.vendor, incoming.remark, dbo_incoming_detail.warehouse_no, dbo_incoming_detail.loan_no, dbo_incoming_detail.pre_date, dbo_incoming_detail.act_date, dbo_incoming_detail.product_no, dbo_incoming_detail.unit_price, dbo_incoming_detail.product_model, dbo_incoming_detail.ic_die, dbo_incoming_detail.pur_qty, dbo_incoming_detail.act_incoming_qty, dbo_incoming_detail.unincoming_qty, dbo_incoming_detail.spare_qty, dbo_incoming_detail.change_qty, dbo_incoming_detail.back_no, dbo_incoming_detail.pcb_no, dbo_incoming_detail.incoming_no, dbo_incoming_detail.incoming_check, dbo_incoming_detail.incoming_date FROM incoming INNER JOIN dbo_incoming_detail ON incoming.pur_no = dbo_incoming_detail.pur_no WHERE incoming.pur_no = '" & pur_no.value & "'")
                    const j = 1
                    /**
                     if(this.state.oappwork_iqc.slice(0,5) === this.state.temp_incoming.map(item,index)=>{
                         if(this.state.oappwork_iqc. ===)
                     })
                     oappwork_iqc.Range("A" & 5) = "                進 料 (免) 檢 驗 單         (附件一)"
            oappwork_iqc.Range("C" & 7) = temp_incoming.vendor
            oappwork_iqc.Range("F" & 7) = temp_incoming.pur_no
            oappwork_iqc.Range("M" & 20) = temp_incoming.remark
            oappwork_iqc.Range("A" & 10 + j) = j
            oappwork_iqc.Range("B" & 10 + j) = DateValue(act_date.value)
            oappwork_iqc.Range("C" & 10 + j) = incoming_no.value
            If Nz(warehouse_no.value) = "002" Then
                oappwork_iqc.Range("D" & 10 + j) = product_no.value & "GO"
            ElseIf Nz(warehouse_no.value) = "006" Then
                oappwork_iqc.Range("D" & 10 + j) = product_no.value & "(UBIN)"
            ElseIf Nz(warehouse_no.value) = "101" Then
                oappwork_iqc.Range("D" & 10 + j) = product_no.value & "(借測)"
            ElseIf Nz(warehouse_no.value) = "007" Then
                oappwork_iqc.Range("D" & 10 + j) = product_no.value & "(ARK)"
            ElseIf Nz(warehouse_no.value) = "103" Then
                oappwork_iqc.Range("D" & 10 + j) = product_no.value & "(ARKSample)"
            ElseIf Nz(warehouse_no.value) = "008" Then
                oappwork_iqc.Range("D" & 10 + j) = product_no.value & "(NF代工)"
                
            ElseIf Nz(warehouse_no.value) = "011" Then
                oappwork_iqc.Range("D" & 10 + j) = product_no.value & "SD"
            ElseIf Nz(warehouse_no.value) = "012" Then
                oappwork_iqc.Range("D" & 10 + j) = product_no.value & "SD(借測)"
            Else
                oappwork_iqc.Range("D" & 10 + j) = product_no.value
            End If
            ''oappwork_iqc.Range("E" & 10 + j) = transfer_desc(product_no.Value)
            ''oappwork_iqc.Range("F" & 10 + j) = transfer_model(product_no.Value)
            oappwork_iqc.Range("G" & 10 + j) = act_incoming_qty.value
            oappwork_iqc.Range("I" & 10 + j) = spare_qty.value
            oappwork_iqc.Range("K" & 10 + j) = transfer_die(product_no.value)
            oappwork_iqc.Range("L" & 10 + j) = pcb_no.value
            oappwork_iqc.Range("M" & 10 + j) = invoice_no.value
            oappwork_iqc.Range("M" & 11 + j) = back_no.value
            oappwork_iqc.Range("O" & 10 + j) = ic_level.value
            oappwork_iqc.Range("P" & 10 + j) = warehouse_no.value
                        
            oappwork_iqc.Activate
            oApp.Visible = True
            oappwork.SaveAs CurrentProject.path & "\incoming\" & incoming_no.value & ".xls"
            temp_incoming.Close

         End If
         show_iqc
         show_instock
         Me.Refresh
                     */
         this.setState({
             incoming_check : day + time
         })
                }
         else {
             this.setState({
                 wh_chk : false,
                 incoming_check_date: ""
             })
         }
             }
        }
     }
     else {
         this.setState({
             inspectionunconfirm : !this.state.inspectionunconfirm
         })
         if(this.state.inspectionunconfirmyes === true){
             this.setState({
                 wh_chk : false,
                 incoming_check_date : ""
             })
         }
     }
     if((this.state.incoming_check || 0)==true && (this.state.wh_chk || 0) == true){
        this.setState({
            incoming_check_locked:true,
            wh_chk_locked: true,
            invoice_no_locked: true,
            incoming_check_date_locked:true,
        })
     }
     else{
         this.setState({
            incoming_check_locked:false,
            wh_chk_locked: false,
            invoice_no_locked: false,
            incoming_check_date_locked: false,
         })
     }
     //更新表單 Re.fresh
 }
 show_iqc=()=>{
     //Set temp = CurrentDb.OpenRecordset("SELECT Max(Mid([iqc_no],6,5)+1) AS maxno FROM dbo_iqc GROUP BY Year([iqc_date]) & Month([iqc_date]), Mid([iqc_no],2,4) HAVING (((Year([iqc_date]) & Month([iqc_date]))=Year(Date()) & Month(Date())) AND ((Mid([iqc_no],2,4))= right(Year(Date()),2) & IIf(Month(Date())<10,'0' & Month(Date()),Month(Date()))))")
     /**
      If temp.RecordCount = 0 Then
   iqcno1 = "I" & Right(Year(date), 2) & IIf(Month(date) < 10, "0" & Month(date), Month(date)) & "00001"
Else
   maxno = temp.maxno
   maxno = Switch(Len(maxno) = 1, "0000" & maxno, Len(maxno) = 2, "000" & maxno, Len(maxno) = 3, "00" & maxno, Len(maxno) = 4, "0" & maxno)
   iqcno1 = "I" & Right(Year(date), 2) & IIf(Month(date) < 10, "0" & Month(date), Month(date)) & maxno
End If
temp.Close

Set uniqc_temp = CurrentDb.OpenRecordset("SELECT uniqc_requery.pur_no, uniqc_requery.loan_no, uniqc_requery.product_no, uniqc_requery.remain FROM uniqc_requery WHERE uniqc_requery.pur_no = '" & Forms!incoming!pur_no.value & "' AND uniqc_requery.loan_no ='" & loan_no.value & "' AND uniqc_requery.product_no = '" & product_no.value & "'")
If uniqc_temp.RecordCount = 0 Then
   MsgBox "請檢查輸入資料是否有誤！！"
ElseIf uniqc_temp.RecordCount <> 0 Then
       If uniqc_temp.remain = 0 Then
          MsgBox "此Item已目檢!!"
       Else
          DoCmd.SetWarnings False
          insertsql = "INSERT INTO dbo_iqc (pur_no,loan_no,iqc_no,iqc_date,no_iqc,product_no,product_model,ic_die,pcb_no,iqc_qty,pass_qty,fail_qty,remark,warehouse_no) VALUES ("
                                   insertsql = insertsql & "'" & Forms!incoming!pur_no.value & "',"
                                   insertsql = insertsql & "'" & loan_no.value & "',"
                                   insertsql = insertsql & "'" & iqcno1 & "',"
                                   insertsql = insertsql & "'" & date & "',"
                                   insertsql = insertsql & True & ","
                                   insertsql = insertsql & "'" & product_no.value & "',"
                                   insertsql = insertsql & "'" & transfer_type(product_no.value) & "',"
                                   insertsql = insertsql & "'" & transfer_die(product_no.value) & "',"
                                   insertsql = insertsql & "'" & pcb_no.value & "',"
                                   insertsql = insertsql & act_incoming_qty.value + spare_qty.value & ","
                                   insertsql = insertsql & act_incoming_qty.value + spare_qty.value & ","
                                   insertsql = insertsql & 0 & ","
                                   insertsql = insertsql & "'" & remark.value & "',"
                                   insertsql = insertsql & "'" & warehouse_no.value & "')"
          DoCmd.RunSQL insertsql
       
          DoCmd.SetWarnings True
       End If
End If
uniqc_temp.Close
      */
 }
 show_instock=()=>{
     /**
      * Set temp = CurrentDb.OpenRecordset("SELECT Max(Mid([stock_no],6,5)+1) AS instockno FROM dbo_instock GROUP BY Year([stock_date]) & Month([stock_date]), Mid([stock_no],2,4) HAVING (((Year([stock_date]) & Month([stock_date]))=Year(Date()) & Month(Date())) AND ((Mid([stock_no],2,4))=right(Year(Date()),2) & IIf(Month(Date())<10,'0' & Month(Date()),Month(Date()))))")

If temp.RecordCount = 0 Then
   instock_no = "M" & Right(Year(date), 2) & IIf(Month(date) < 10, "0" & Month(date), Month(date)) & "00001"
Else
    instock_no = temp.instockno
    instock_no = Switch(Len(instock_no) = 1, "0000" & instock_no, Len(instock_no) = 2, "000" & instock_no, Len(instock_no) = 3, "00" & instock_no, Len(instock_no) = 4, "0" & instock_no)
    instock_no = "M" & Right(Year(date), 2) & IIf(Month(date) < 10, "0" & Month(date), Month(date)) & instock_no
End If
    
Set temp_iqc = CurrentDb.OpenRecordset("SELECT dbo_iqc.pur_no, dbo_iqc.loan_no, dbo_iqc.iqc_no, dbo_iqc.iqc_date, dbo_iqc.no_iqc, dbo_iqc.product_no, dbo_iqc.product_model, dbo_iqc.ic_die, dbo_iqc.pcb_no, dbo_iqc.iqc_qty, dbo_iqc.pass_qty, dbo_iqc.fail_qty, dbo_iqc.remark, dbo_iqc.warehouse_no FROM dbo_iqc WHERE dbo_iqc.pur_no = '" & Forms!incoming!pur_no.value & "' AND dbo_iqc.loan_no = '" & loan_no.value & "' AND dbo_iqc.product_no = '" & product_no.value & "'")
        
DoCmd.SetWarnings False
insertsql = "INSERT INTO dbo_instock (stock_no,stock_date,pur_no,test_no,product_no,product_model,ic_die,pcb_no,stock_qty,temp_qty,remark,invoice_no,fail_qty,ic_qty,ic_pass,ic_fail,ic_no,iqc_no,outstock_type,invoice_date,warehouse_type,incoming_product_no,py01_qty,py02_qty,py03_qty,atop_qty,blank_qty,other_qty,dis_qty,rej_qty) VALUES ("
            insertsql = insertsql & "'" & instock_no & "',"
            insertsql = insertsql & "'" & date & "',"
            insertsql = insertsql & "'" & Forms!incoming!pur_no.value & "',"
            insertsql = insertsql & "'" & Null & "',"
            insertsql = insertsql & "'" & product_no.value & "',"
            insertsql = insertsql & "'" & transfer_type(product_no.value) & "',"
            insertsql = insertsql & "'" & transfer_die(product_no.value) & "',"
            insertsql = insertsql & "'" & pcb_no.value & "',"
            insertsql = insertsql & temp_iqc.pass_qty & ","
            insertsql = insertsql & 0 & ","
            insertsql = insertsql & "'" & remark.value & "',"
            insertsql = insertsql & "'" & Null & "',"
            insertsql = insertsql & 0 & ","
            insertsql = insertsql & 0 & ","
            insertsql = insertsql & 0 & ","
            insertsql = insertsql & 0 & ","
            insertsql = insertsql & "'" & Null & "',"
            insertsql = insertsql & "'" & temp_iqc.iqc_no & "',"
            insertsql = insertsql & "'空白',"
            insertsql = insertsql & "'" & Null & "',"
            If Nz(temp_iqc.warehouse_no) = "001" Then
               insertsql = insertsql & "'成品',"
            ElseIf Nz(temp_iqc.warehouse_no) = "002" Then
                   insertsql = insertsql & "'GO',"
            ElseIf Nz(temp_iqc.warehouse_no) = "005" Then
                   insertsql = insertsql & "'PCB&EE',"
            ElseIf Nz(temp_iqc.warehouse_no) = "101" Then
                   insertsql = insertsql & "'借測',"
            ElseIf Nz(temp_iqc.warehouse_no) = "003" Then
                   insertsql = insertsql & "'備品',"
            ElseIf Nz(temp_iqc.warehouse_no) = "004" Then
                   insertsql = insertsql & "'Tester',"
            ElseIf Nz(temp_iqc.warehouse_no) = "006" Then
                   insertsql = insertsql & "'UBIN',"
            ElseIf Nz(temp_iqc.warehouse_no) = "007" Then
                   insertsql = insertsql & "'ARK',"
            ElseIf Nz(temp_iqc.warehouse_no) = "103" Then
                   insertsql = insertsql & "'ARKSample',"
            ElseIf Nz(temp_iqc.warehouse_no) = "008" Then
                   insertsql = insertsql & "'NF代工',"
            ElseIf Nz(temp_iqc.warehouse_no) = "010" Then
                   insertsql = insertsql & "'Water',"
            ElseIf Nz(temp_iqc.warehouse_no) = "201" Then
                   insertsql = insertsql & "'DLI',"
            ElseIf Nz(temp_iqc.warehouse_no) = "011" Then
                   insertsql = insertsql & "'SD',"
            ElseIf Nz(temp_iqc.warehouse_no) = "012" Then
                   insertsql = insertsql & "'SD(借測)',"
            End If
            insertsql = insertsql & "'" & Null & "',"
            insertsql = insertsql & 0 & ","
            insertsql = insertsql & 0 & ","
            insertsql = insertsql & 0 & ","
            insertsql = insertsql & 0 & ","
            insertsql = insertsql & 0 & ","
            insertsql = insertsql & 0 & ","
            insertsql = insertsql & 0 & ","
            insertsql = insertsql & 0 & ")"
DoCmd.RunSQL insertsql
            
Call stock_process(warehouse_no:=temp_iqc.warehouse_no, product_no:=temp_iqc.product_no, pcb_no:=temp_iqc.pcb_no, stock_qty:=temp_iqc.pass_qty, outstock_type:="空白", pur_no:=pur_no.value, ic_level:=ic_level.value)
''Call stock_process(warehouse_no:=temp_iqc.warehouse_no, product_no:=temp_iqc.product_no, pcb_no:=temp_iqc.pcb_no, stock_qty:=temp_iqc.pass_qty, outstock_type:="空白", pur_no:=pur_no.Value, ic_level:=ic_level.Value)
      */
 }
 inspectionunconfirmyes=()=>{
     this.setState({
        inspectionunconfirmyes : !this.state.inspectionunconfirmyes
     })
 }
 currentitementerinspectionyes=()=>{
     this.setState({
         currentitementerinspectionyes :!this.state.currentitementerinspectionyes
     })
 }
 wh_chk_GotFocus=()=>{
    if(this.state.incoming_incoming_flag1 = false){
        this.setState({
            permissionmodal:!this.state.permissionmodal
        })
    }
 }
 incoming_check_GotFocus=()=>{
     if(this.state.incoming_incoming_flag1 = false){
         this.setState({
             permissionmodal:!this.state.permissionmodal
         })
     }
 }
 remark_GotFocus=()=>{
    if(this.state.incoming_incoming_flag1 === false){
        this.setState({
            permissionmodal: !this.state.permissionmodal 
         }) 
     }
 }
 vendor_GotFocus=()=>{
    if(this.state.incoming_incoming_flag1 === false){
        this.setState({
            permissionmodal: !this.state.permissionmodal 
         }) 
     }
 }
 pur_no_AfterUpdate=()=>{
     const year = new Date().getFullYear();
     const date = new Date().toLocaleDateString();
     const time = new Date().toLocaleTimeString();
     const temp_pur_no = this.state.pur_no1
     if(this.state.showadd === true){
        if (year <= 2010){
            if(this.state.pur_no1.length !== 12){
                this.setState({
                    pur_no1: "",
                })
                return(
                    <div>
                     <Modal isOpen={this.state.pur_no112} toggle={this.purno112} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        輸入錯誤，採購單號應為12位數！！
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
                    </div>
                )     
            }
        else {
            this.setState({
                people: this.state.login_name,
                people_time : time,
            })
        } 
        }
        else if(year >= 2011){
            if(this.state.pur_no1.length !== 13){
                this.setState({
                 pur_no1 :""   
                })
                return(
                    <div>
                     <Modal isOpen={this.state.pur_no113} toggle={this.purno113} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        輸入錯誤，採購單號應為13位數！！
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
                    </div>
                    )
            }
            else {
                this.setState({
                    people:this.state.login_name,
                    people_time :time
                })
            }
        }
     }
 }
 change_qty_GotFocus=()=>{
     if(this.state.incoming_stock_flag1 === false){
         this.setState({
             permissionmodal:!this.state.permissionmodal
         })
     }
 }
 pur_no_GotFocus=()=>{
     if(this.state.incoming_incoming_flag1 === false){
        this.setState({
            permissionmodal: !this.state.permissionmodal 
         }) 
     }
 }
 pur_qty_GotFocus=()=>{
     if(this.state.incoming_incoming_flag1 === false){
        this.setState({
           permissionmodal: !this.state.permissionmodal 
        }) 
     }
 }
 handleWh_chk=(e)=>{    
    if(this.state.Dataview.wh_chk === true){
        this.setState({
            wh_chkwarning:!this.state.wh_chkwarning
        })
    }
    else {
        e.target.value = ""
    }
 }
 pur_qty_AfterUpdate=()=>{
     if(this.state.incoming_incoming_flag1 === false){
         this.setState({
             permissionmodal: !this.state.permissionmodal
         })
     }
     else{
      if(this.state.product_no.charAt(0)==="D"){
          if((this.state.pcb_no || 0) === ""){
              this.setState({
                  pcb_no_warning:!this.state.pcb_no_warning,
                  pur_qty:0
              })
          }
          else{
              if(this.act_incoming_qty===null) {
                  this.setState({
                      act_incoming_qty: 0,
                      unincoming_qty : this.state.pur_qty
                  })
              }
              else{
                 this.setState({
                     unincoming_qty : this.state.pur_qty - this.state.act_incoming_qty
                 })
              }
          }
      } 
      else{
          if(this.state.act_incoming_qty === null){
              this.setState({
                  act_incoming_qty : 0,
                  unincoming_qty : this.state.pur_qty
              })
          }
          else{
              this.setState({
                  unincoming_qty : this.state.pur_qty - this.state.act_incoming_qty
              })
          }
      }    
    }
 }
 product_no_AfterUpdate=()=>{
     const pn_exit_flag = true
if(this.check_part_no(this.state.Dataview.product_no) === true){
         //接後端
         //判斷後端是否需要跳出提示訊息
     if(this.state.back_no !== null || this.state.back_no == ""){
        this.setState({
            product_no: ""
        })
     }
   else{
         //transfer_type轉換函數
         //transfer_die轉換函數
         if(pn_exit_flag === false){
           this.setState({
              product_no: ""
           })
         }
         else{
             //接後端
             //判斷後端
         }   
     }
     if(this.state.loan_no === null ){
         this.setState({
             loan_no : ""
         })
     }
     }
   if (this.state.pcb_no === null){
       this.setState({
           pcb_no:""
       })
   }
   this.setState({
    incoming_check: 0,
    wh_chk : 0
   })
 }
 act_incoming_qty_AfterUpdate=()=>{
     const exist_flag = true
    const year = new Date().getFullYear();
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
     if((this.state.loan_no || 0) === ""){
        this.setState({
            askforenterloan_no : !this.state.askforenterloan_no
        })
     }
     this.setState({
         act_date: time
        }) 
     //接後端Set temp = CurrentDb.OpenRecordset("SELECT dbo_incoming_detail.pur_no, dbo_incoming_detail.product_no, Sum(dbo_incoming_detail.pur_qty) AS pur_sum, Sum(dbo_incoming_detail.act_incoming_qty) AS act_sum, Sum([pur_qty])-Sum([act_incoming_qty]) AS unincoming_sum  FROM dbo_incoming_detail GROUP BY dbo_incoming_detail.pur_no, dbo_incoming_detail.product_no HAVING dbo_incoming_detail.pur_no = '" & Forms!incoming!pur_no.value & "' AND dbo_incoming_detail.product_no = '" & product_no.value & "'")
     /**if(temp.RecordCount === 1){
            if(this.state.pur_qty === 0 ){
                this.setState({
                    pur_qty:0
                })
            }
            else{
                this.setState({
                    pur_qty:this.state.pur_qty
                })
            }
            const unincoming_temp = temp.unincoming_sum + old_qty
            exist_flag = True
     }/** */
     if(exist_flag === true){
         this.setState({
             //unincoming_qty : unincoming_temp - this.state.act_incoming_qty
             exist_flag : false
            })
     }
     else {
        if(this.state.pur_qty === 0){
            this.setState({
                pur_qty: this.state.act_incoming_qty
            })
        }
        else{
            this.setState({
               unincoming_qty : this.state.pur_qty - this.state.act_incoming_qty    
            })
        }
    }
    //將未進設為目前要輸入的欄位值unincoming_qty.SetFocus 
    //更新表單Me.Refresh
    this.getAllOption();

    //接後端 Set temp_pre_incoming = CurrentDb.OpenRecordset("SELECT dbo_pre_incoming.pur_no, dbo_pre_incoming.product_no,dbo_pre_incoming.pre_date, dbo_pre_incoming.act_qty FROM dbo_pre_incoming WHERE dbo_pre_incoming.pur_no = '" & pur_no.value & "' AND dbo_pre_incoming.product_no = '" & product_no.value & "' AND dbo_pre_incoming.pre_date = #" & DateValue(act_date.value) & "#")
    /**接後端
     If temp_pre_incoming.RecordCount = 0 Then
    insertsql = "INSERT INTO dbo_pre_incoming (pur_no,product_no,pre_date,pre_qty,act_qty) VALUES ( "
    insertsql = insertsql & "'" & pur_no.value & "',"
    insertsql = insertsql & "'" & product_no.value & "',"
    insertsql = insertsql & "'" & DateValue(act_date.value) & "',"
    insertsql = insertsql & "0," & act_incoming_qty.value & ")"
    DoCmd.RunSQL insertsql
Else
    diff_qty = act_incoming_qty.value - old_qty
    UpdateSQL = "UPDATE dbo_pre_incoming SET  "
    If diff_qty <> 0 Then
        UpdateSQL = UpdateSQL & "[act_qty] = " & temp_pre_incoming.act_qty + diff_qty
    Else
        UpdateSQL = UpdateSQL & "[act_qty] = " & temp_pre_incoming.act_qty + act_incoming_qty.value
    End If
    UpdateSQL = UpdateSQL & " WHERE dbo_pre_incoming.pur_no = '" & pur_no.value & "' AND dbo_pre_incoming.product_no = '" & product_no.value & "' AND dbo_pre_incoming.pre_date = #" & DateValue(act_date.value) & "#"
    DoCmd.RunSQL UpdateSQL
End If
DoCmd.SetWarnings True 
    **/ 
   if(this.state.incoming_check === true){
     this.setState({
         spare_qty : 0
     })
   }
   this.setState({
       spare_qty : (this.state.spare_qty || 0),
       change_qty : (this.state.change_qty || 0)
   })
 }
 check_part_no(part_no){
     switch(part_no.charAt(0)){
         case 'C' :
            if(part_no.length < 11){
                return false
            }
            else{
                return true
            }
         case 'D' : 
            if(part_no.length < 12){
                return false
            }
            else{
                return true
            }
         case 'P' : 
            return true
         default : 
            break
        }   
 }
 act_incoming_qty_GotFocus=()=>{
     if(this.state.incoming_stock_flag1 === false){
         this.setState({
             permissionmodal:!this.state.permissionmodal
         })
     }
     else{
         
        const old_qty = (this.state.act_incoming_qty===null) ? 0 : this.state.act_incoming_qty
     }
 }
 unit_price_GotFocus=()=>{
     if(this.state.incoming_incoming_flag1 === false){
         this.setState({
             permissionmodal:!this.state.permissionmodal
         })
     }
 }
 pcb_no_GotFocus=()=>{
     if(this.state.incoming_incoming_flag1 === false){
         this.setState({
             permissionmodal:!this.state.permissionmodal
         })
     }
 }
 product_no_GotFocus =() =>{
     if(this.state.incoming_incoming_flag1 === false){
        this.setState({
            permissionmodal:!this.state.permissionmodal
        })
     }
 }
 back_no_GotFocus = () =>{
     if(this.state.incoming_stock_flag1 === false){
         this.setState({
             permissionmodal:!this.state.permissionmodal
         })
     }
 }
 ic_level_GotFocus =()=>{
    if(this.state.incoming_incoming_flag1 === false ){
        this.setState({
            permissionmodal: !this.state.permissionmodal
        })
        //將預交日期設定為onfocus(轉成目前應當輸入的數值)
 }
 }
 warehouse_no_GotFocus =()=>{
     if(this.state.incoming_incoming_flag1 === false ){
            this.setState({
                permissionmodal: !this.state.permissionmodal
            })
            //將預交日期設定為onfocus(轉成目前應當輸入的數值)
     }
 }
 vendor_Notlist=()=>{
     this.setState({
         vendor_Notlist:!this.state.vendor_Notlist
     })
 }

 purno112=()=>{
     this.setState({
         pur_no112:!this.state.pur_no112
     })
 }
 purno113=()=>{
     this.setState({
          pur_no113:!this.state.pur_no113
     })
 }
 askforaddItemyes=()=>{
     this.setState({
         askforaddItemyes:!this.state.askforaddItem
     })
 }
 closeallmodal=()=>{
     this.setState({
        permissionmodal:false,
        pur_no112:false,
        pur_no113:false,
        incoming_incoming_flag1:false,
        vendor_Notlist : false, 
        Addpermissionmodal:false,
        Deletepermissionmodal:false,
        nopermissiondeletemodal:false,
        askforDelete : false,
        askforDeleteyes : false,
        onlydeleteunconfirmItem : false, 
     })
 }
 Combo18_AfterUpdate=()=>{
      this.setState({
          pur_no : null
      })
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
 handleChangevendor_no=(e,values)=>{
     this.setState({
         vendor_no:values.vendor_no
     })
     this.state.data.map((item,index)=>{
         if(values.vendor_no == item.vendor_no){
             this.setState({
                 vendor_no: item.vendor_no,
                 pur_nodata: item.data
             })
         }
         return true
     })
 }
 handleChangepur_no=(values)=>{
     this.setState({
         pur_no: values.pur_no
     })
     this.state.data.map((item,index)=>{
         if(values.pur_no === item.pur_no){
              this.setState({
                  pur_nodata2:item.pur_nodata,
              })
              item.pur_nodata.map((item)=>{
                  this.setState({
                    pur_no1:item.pur_no,
                    vendor:item.vendor_no,
                    remark:item.remark,
                    people: item.people,
                    people_time : item.people_time,
                  })
              })
         }
         return true
     })
 }
 
 Save =()=>{
  const ware = 0;
  const inic = 0;
  //接後端
  
  if((ware || 0) && (inic || 0)){
      this.setState({
        showadd:false,
        buttonadd:"新增",
        showEdit:false,
        buttonText:"修改",
      })
      if(this.state.login_name === "Abby" || this.state.login_name === "Kevin" || this.state.login_name === "Lisa" || this.state.login_name === "Jay"){
          this.setState({
              del_btn:true
          })
      }
      else {
          this.setState({
            del_btn:false
          })
      }
  }  
  else {
      if((ware || 0) == 0 && (inic || 0) !== 0 ){
          this.setState({
              levelwarning:!this.state.levelwarning
          })
      }
      else if ((ware || 0) !== 0 && (inic || 0) == 0){
          this.setState({
              warehouse_nowarning:!this.state.warehouse_nowarning
          })
      }
      else if ((ware || 0) !== 0 && (inic || 0) !== 0){
          this.setState({
              level_warehouse_warning: !this.state.level_warehouse_warning
          })
      }
  }   
}
Edit =()=>{ 
  if(this.state.incoming_incoming_flag1 === true && this.state.incoming_stock_flag1 === true) {
        //接後端
        const wh_total = 0
        //接後端
        const wh_sum = 0
        //接後端
          //判斷後端資料
          if((wh_total || 0)- (wh_sum || 0)){
            this.setState({
               Editpermissionmodal : !this.state.Editpermissionmodal,
               askforaddItem : !this.state.askforaddItem 
           })
            if(this.state.askforaddItemyes === true){
               axios.post(`http://localhost:3003/data/`,
               {
               data :
                   { 
                       pur_no:this.state.pur_no,
                       remark:this.state.remark,
                       people: this.state.people,
                       people_time : this.state.people_time,
                       pur_nodata : this.state.pur_nodata2,
                       }
               })
            }
       else if((wh_total || 0) - (wh_sum || 0) == (wh_total) && (wh_sum || 0) == 0 ){
           this.setState({
               showEdit: true,
               combo15:false, 
               combo18:false,
               add_btn:false,
               save_btn:true,
               edit_btn: false,
           })
           if(this.state.login_name === "Abby" || this.state.login_name === "Kevin" || this.state.login_name === "Lisa" || this.state.login_name === "Jay"){
               this.setState({
                   del_btn: true
               })
           }
           else {
               this.setState({
                   del_btn:false
               })
           }
       }
       else if(((wh_total || 0) - (wh_sum || 0))> 0 && (wh_sum)>0){
           this.setState({
               showEdit:true,
               combo15:false,
               combo18:false,
               add_btn:false,
               save_btn: true,
               edit_btn: false,
            })
            if(this.state.login_name === "Abby" || this.state.login_name === "Kevin" || this.state.login_name === "Lisa" || this.state.login_name === "Jay" ){
                this.setState({
                    del_btn : true
                })
            }
            else {
                this.setState({
                    del_btn : false
                })
            }
       }
    }
    }
   else{
       this.setState({
           Editpermissionmodal:!this.state.Editpermissionmodal
       })
   }
}

 handleSave=()=>{
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
        if(this.state.vendor_noconfirm === true){
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
    Delete =()=>{
        if (this.state.incoming_incoming_flag1 === true){
            //此處為接後端動作
            const wh_total =0
            const wh_sum = 0
            if((wh_total || 0) - (wh_sum || 0) && wh_total !==0 && wh_sum !== 0){
                 this.setState({
                     Deletepermissionmodal:!this.state.Deletepermissionmodal
                 })
            }
            else if((wh_total || 0)-(wh_sum || 0) === (wh_total || 0) && (wh_sum || 0) === 0){
                if(this.state.showadd == true){
                    this.setState({
                        showadd:false,
                    })
                    axios.delete(`http://localhost:3003/data/${this.state.pur_no}`)
                }
                else if(this.state.showEdit === true){
                    //接undo redo
                    this.setState({
                        showEdit: false
                    })
                    axios.delete(`http://localhost:3003/data/${this.state.pur_no}`)
                }
                else if(this.state.showEdit === false){
                    this.setState({
                        askforDelete:!this.state.askforDelete
                    })
                    if(this.state.showEdit && this.state.askforDeleteyes === true || this.state.showadd === true){
                        axios.delete(`http://localhost:3003/data/${this.state.pur_no}`)
                    }  
                }
                if(this.state.login_name === "Abby" || this.state.login_name === "Kevin" || this.state.login_name === "Lisa" || this.state.login_name === "Jay"){
                    this.setState({
                        del_btn: true
                    })
                }
                else{
                    this.setState({
                        del_btn: false
                    })
                }
            }
            else if((wh_total || 0) - (wh_sum || 0) > 0 && (wh_sum || 0) > 0){
                 this.setState({
                     onlydeleteunconfirmItem :!this.state.onlydeleteunconfirmItem
                 })
            }
        }
        else {
          this.setState({
            nopermissiondeletemodal:!this.state.nopermissiondeletemodal
          })
        }
        this.setState({
            pur_no:"",
            remark:"",
            people: "",
            people_time : "",
             pur_nodata:[],
            pur_nodata2:[],
            confirmdelete:!this.state.confirmdelete
        })
    }
PUT=()=>{
        axios.put(`http://localhost:3003/data/${this.state.vendor_no}`,
        {
        vendor_no:this.state.vendor_no,
        data :
        {
        pur_no:this.state.pur_no,
        remark:this.state.remark,
        people: this.state.people,
        people_time : this.state.people_time,

        pur_nodata : 
        this.state.pur_nodata2,
        },
    })}

    POST=()=>{
        axios.post(`http://localhost:3003/data/`,
        {
        data :
            { 
                pur_no:this.state.pur_no,
                remark:this.state.remark,
                people: this.state.people,
                people_time : this.state.people_time,
                pur_nodata : 
                this.state.pur_nodata2,
                }
        })
    }
    ADD=()=>{
        if(this.state.incoming_incoming_flag1 === true){
            this.setState({
                pur_no:"",
                remark:"",
                people: "",
                people_time : {
                    date:""
                },
                pur_nodata :[],
                pur_nodata2:[],
                showadd:!this.state.showadd
            })
            if(this.state.login_name === "Abby" || this.state.login_name === "Kevin" || this.state.login_name === "Jay" || this.state.login_name==="Lisa"){
                this.setState({
                    del_btn:true
                })
            }
            else{
                this.setState({
                    del_btn:false
                })
            }
        }
        else {
           this.setState({
               Addpermissionmodal: !this.state.Addpermissionmodal
           })
        }
    }
    handleChangepeople_time=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                people_time:e.target.value
            })
        }
    }
    clear=(e)=>{
        e.target.value=""
    }
    handlecancel=()=>{
        this.state.pur_nodata.map((item,index)=>{
            if(this.state.pur_no === item.pur_no ){
                this.setState({
                    pur_nodata:item.data,
                    pur_nodata2:item.pur_nodata,
                    pur_no:item.pur_no,
                    remark:item.remark,
                    people: item.people,
                    people_time : item.people_time,
                })
            }
            else {
                this.setState({
                    pur_nodata:"",
                    pur_nodata2:"",
                    pur_no:"",
                    remark:"",
                    people: "",
                    people_time : {},
                })
            }
            return true;
        })
        this.setState({
            showadd:false,
            showEdit:false,
        })
    }
    handledelete=()=>{
        this.setState({
            confirmdelete:!this.state.confirmdelete
        })
     }
    render(){
        const axioswarehouse_no = this.state.listwarehouse_no.map((item,index)=>{
            return <select value={this.state.warehouse_no}>
                <option key={index} value={item.warehouse_no}>
                {item.warehouse_no}
                </option>
            </select>
        })
        const axiosic_level = this.state.listic_level.map((item,index)=>{
            return <select value={this.state.ic_level}>
                <option key={index} value={item.ic_level}>
                {item.ic_level}
                </option>
            </select>
        })
        const axiosback_no = this.state.listback_no.map((item,index)=>{
            return <select value={this.state.back_no}>
                <option key={index} value={item.back_no}>
                {item.back_no}
                </option>
            </select>
        })
        const axiosproduct_no = this.state.listproduct_no.map((item,index)=>{
            return <select value={this.state.product_no}>
                <option key={index} value={item.product_no}>
                {item.product_no}
                </option>
            </select>
        })
        const axiospcb_no = this.state.listpcb_no.map((item,index)=>{
            return <select value={this.state.pcb_no}>
                <option key={index} value={item.pcb_no}>
                {item.pcb_no}
                </option>
            </select>
        })
        const {showEdit} = this.state;
        const  tableColumns=[    
            {
                title: "倉別", 
                field:"warehouse_no",
                editComponent:({value,onChange})=>(
                    <div>
                <input 
                list ="warehouse_no"
                value={value}
                placeholder={this.state.warehouse_no}
                onChange={(e)=>onChange(e.target.value)}
                onClick={this.clear}
                onFocus={this.clear}
                />
                <datalist pur_no="warehouse_no">
                    {axioswarehouse_no}
                </datalist>
                </div>
                )
            },
            {
                title: "等級", 
                field:"ic_level",
                editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="ic_level"
                    value={value}
                    placeholder={this.state.ic_level}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist pur_no="ic_level">
                        {axiosic_level}
                    </datalist>
                    </div>
                )
            },
            {
            title: "借出單號", 
            field: "loan_no",
            },{
            title: "退回單號", 
            field:"back_no",
            editComponent:({value,onChange})=>(
                <div>
                <input 
                list ="back_no"
                value={value}
                placeholder={this.state.back_no}
                onChange={(e)=>onChange(e.target.value)}
                onClick={this.clear}
                onFocus={this.clear}
                />
                <datalist pur_no="back_no">
                    {axiosback_no}
                </datalist>
                </div>
            )
           },
           {
            title: "預交日期", 
            field: "pre_date",
           },
           {
            title: "實際日期", 
            field: "act_date",
           },
           {
            title: "產品代號", 
            field: "product_no",
            editComponent:({value,onChange})=>(
                <div>
                <input 
                list ="product_no"
                value={value}
                placeholder={this.state.product_no}
                onChange={(e)=>onChange(e.target.value)}
                onClick={this.clear}
                onFocus={this.clear}
                />
                <datalist pur_no="product_no">
                    {axiosproduct_no}
                </datalist>
                </div>
            )
           }, 
           {
            title: "PCB No.", 
            field: "pcb_no",
            editComponent:({value,onChange})=>(
                <div>
                <input 
                list ="pcb_no"
                value={value}
                placeholder={this.state.pcb_no}
                onChange={(e)=>onChange(e.target.value)}
                onClick={this.clear}
                onFocus={this.clear}
                />
                <datalist pur_no="pcb_no">
                    {axiospcb_no}
                </datalist>
                </div>
            )
           },
           {
            title: "單價", 
            field: "unit_price",
           },
           {
            title: "採購", 
            field: "pur_qty",   
           },
           {
            title: "實際", 
            field: "act_incoming_qty",  
           },
           {
            title: "未進", 
            field: "unincoming_qty",  
           },
           {title: "備品",
            field: "backupProduct",
          },
            {
             title: "換貨",
             field:"changeProduct",
            },
            {
             title: "備註",
             field:"remark",  
            },
            {
                title:"進貨免驗",
                field:"incoming_check",
                editComponent: 
                (props)=>{
                    console.log(props);
                    return(
                    <Checkbox
                        disabled={this.state.incoming_check_locked === true}
                        value={this.state.incoming_check}
                        checked={props.value}
                        name="incoming_check"
                        onChange={(e)=>props.onChange(e.target.checked)}
                    />
                    )
            },
            render: (rowdata)=>(
                <Checkbox checked={rowdata.incoming_check} readOnly />
              )
            },
            {
                title:"倉管確認",
                field:"wh_chk",
                editComponent:
                (props)=>{
                    console.log(props);
                    return(
                    <Checkbox
                        disabled={this.state.wh_chk_locked === true}
                        value={this.state.wh_chk}
                        checked={props.value}
                        name="wh_chk"
                        onChange={(e)=>props.onChange(e.target.checked)}
                    />
                    )
            },
            render: (rowdata)=>(
                <Checkbox checked={rowdata.wh_chk} readOnly />
              )
            },      {
                title:"發票號碼",
                field:"invoice_no",
                editComponent:
                (({value,onChange})=>(
                    <TextField
                   name="invoice_no"
                   disabled={this.state.invoice_no_locked === true}
                   value={value}
                   onChange={(e)=>onChange(e.target.value)}
         />
                ))
            },
            {
                title:"倉管確認時間",
                field:"incoming_check_date",
                editComponent:
                (({value,onChange})=>(
                    <TextField
                    disabled={this.state.incoming_check_date_locked === true}
                    name="incoming_check_date"
                    floatingLabelText="倉管確認時間"
                    InputLabelProps={{ shrink: true, required: true }}
                    type="datetime-local"
                    onChange={(e)=>onChange(e.target.value)}
                    floatingLabelFixed
                    style={{ width: '100%' }}
                    value={value}
                    InputLabelProps={{
                       shrink: true,
                     }}
                  />
                  ))
            }
           ]
        return (
            <div>
            <Modal isOpen={this.state.confirmdelete} toggle={this.handledelete} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        確定刪除這筆資料嗎?
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.Delete}>確定</button>
       <button onClick={this.handledelete}>取消</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.permissionmodal} toggle={this.pur_qty_GotFocus || this.warehouse_no_GotFocus || this.vendor_GotFocus || this.ic_level_GotFocus || this.back_no_GotFocus || this.product_no_GotFocus} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        你沒有修改此欄位的權限!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.Addpermissionmodal} toggle={this.ADD} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        無此權限,無法新增!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.vendor_Notlist} toggle={this.vendor_Notlist} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        無此廠商紀錄!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.Deletepermissionmodal} toggle={this.Delete} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        此筆採購單都已倉管確認,無法刪除
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.askforDelete} toggle={this.Delete} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        是否刪除 [採購單號]：{this.state.pur_no1}
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>取消</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.onlydeleteunconfirmItem} toggle={this.Delete} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        此筆採購單已有一筆倉管確認!!!,只能刪除未確認之Item,請按修改刪除Item
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.nopermissiondeletemodal} toggle={this.Delete} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        無此權限,無法刪除!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.Editpermissionmodal} toggle={this.Edit} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        無此權限,無法修改!!!
        </ModalBody>
      <ModalFooter>
      <Modal isOpen={this.state.Deletepermissionmodal} toggle={this.Delete} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        此筆採購單都已倉管確認,無法刪除
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.levelwarning} toggle={this.Save} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        請輸入等級
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.warehouse_nowarning} toggle={this.Save} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        請輸入倉別
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.level_warehouse_warning} toggle={this.Save} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        請輸入倉別及等級
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.level_warehouse_warning} toggle={this.Save} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        此筆採購單都已倉管確認,無法修改
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.askforaddItem} toggle={this.Edit} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        是否新增Item
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.pcb_no_warning} toggle={this.pur_qty_AfterUpdate} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        請選擇板號!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.askforenterloan_no} toggle={this.act_incoming_qty_AfterUpdate} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        請輸入借出單號，如無借出單號請自行輸入對應單號！！
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.wh_chkcheckedwarning} toggle={this.incoming_check_AfterUpdate} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        倉管已做確認，禁止修改！！
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.labelnovalue_warning} toggle={this.incoming_check_AfterUpdate}>
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        有欄位沒有數值，請補入!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.currentitementerinspection} toggle={this.wh_chk_AfterUpdate}>
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        此筆Item是否進入進料免檢流程???
        </ModalBody>
      <ModalFooter>
      <div>
        <button onClick={this.currentitementerinspectionyes}>確定</button>
       <button onClick={this.closeallmodal}>取消</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.in_nomodal} toggle={this.wh_chk_AfterUpdate} >
        <ModalHeader>請輸入發票號碼</ModalHeader>
        <ModalBody>
          <Box pl={1} mt={-2}>
          <TextField
              name="in_no"
              value={this.state.in_no}
              onChange={this.handleChange}
              style ={{width: '65%'}}
           />
          </Box>
        </ModalBody>
        <ModalFooter>
        <div>
         <button onClick={this.closeallmodal}>確定</button>
        </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.in_noemptymodal} toggle={this.incoming_check_AfterUpdate}>
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
          請輸入發票號碼
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.inspectionunconfirm} toggle={this.wh_chk_AfterUpdate}>
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
          此Item免檢確認未確認,無法帶出免檢單
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.inspectionunconfirmyes}>確認</button>
       <button onClick={this.closeallmodal}>取消</button>
      </div>
      </ModalFooter>
     </Modal>
                 <Box
         display="flex"
         alignItems="flex-start"
         p={1}
         m={1}
         bgcolor="background.paper"
         css={{ height: 100 }}
         > 
       
         <Box pl={1} >
          請輸入欲查詢的採購單號 : 
          </Box>
          <Box pl={1} mt={-2}>
          <Autocomplete
                  inputValue={this.state.vendor_no}
                  disabled={this.state.Combo18 === false||this.state.showadd || this.state.showEdit}
                  onInputChange={this.handleChangevendor_no}
                  options={this.state.data}
                  getOptionLabel={(option) => option.vendor_no}
                  style={{ width: 100 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullwidth 
                  />
                  )}
                />
         </Box>
         <Box pl={1} mt={-2}>
         <Autocomplete
                  inputValue={this.state.pur_no}
                  disabled={this.state.Combo15 === false||this.state.showadd || this.state.showEdit}
                  onInputChange={this.handleChangepur_no}
                  options={this.state.pur_nodata}
                  getOptionLabel={(option) => option.pur_no}
                  style={{ width: 200 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullwidth 
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
         <Box pl={30}>
              採購單號 : 
          </Box> 
          <Box pl={1}>
          <TextField
              name="pur_no"
              value={this.state.pur_no}
              onChange={this.handleChange}
              style ={{width: '75%'}}
           />
          </Box>
          <Box pl={30}>
              備註 :
            </Box>
            <Box>
            <textarea
             name="remark"
             className = "form-control"
             value={this.state.remark}
              onChange={this.handleChange}   
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
         
         <Box pl={34}>
              廠商 : 
          </Box>
          <Box pl={1} mt={-2}>
          <Autocomplete
                  inputValue={this.state.vendor_no}
                  onChange={(event,newValue)=>{
                    if(newValue){
                          this.setState({
                            vendor_no:newValue.vendor_no
                          })
                      }
                  }}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                            vendor_no:e.target.value
                   })
                    }
                  }}
                  options={this.state.listvendor_no}    
                  getOptionLabel={(option) => option.vendor_no}
                  style={{ width: 200 }}
                  disableClearable
                  renderInput={(params) => (
                    <TextField 
                    {...params}
                  margin="normal"
                  fullwidth 
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
         <Box pl={32}>
              開單人 : 
          </Box> 
          <Box pl={1}>
          <TextField
              name="people"
              value={this.state.people}
              onChange={this.handleChange}
              style ={{width: '75%'}}
           />
          </Box>
          <Box pl ={26}>
              開單時間 :
            </Box> 
            <Box pl={1}>
            <TextField
        name="people_time"
        floatingLabelText="開單時間"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangepeople_time}
        floatingLabelFixed
        style={{ width: '100%' }}
        value={this.state.people_time.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
          </Box>   
          </Box>
          <Box
         display="flex"
         alignItems="flex-start"
         pl={130}
         mt={-7}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
         <Box pl={2}>
    <button 
    disabled={
     !(this.state.showEdit && !this.state.showadd)
  &&!(!this.state.showEdit && this.state.showadd)
            } 
    onClick={this.handleSave}>
    儲存
    </button>
    </Box>
    <Box pl={2}>
   <button disabled={this.state.add_btn === false||this.state.showEdit == true || this.state.showadd == true} onClick={this.ADD}>
       {this.state.buttonadd}
   </button>
    </Box>
    <Box pl={2}>
    <button disabled={this.state.add_btn== false ||this.state.showadd == true ||this.state.showEdit == true} onClick={this.handleshowEdit}>
       {this.state.buttonText}
    </button>
    </Box>
    <Box pl={2}>
     <button disabled={!this.state.del_btn} onClick={this.handledelete}>刪除</button>
    </Box>
    <Box pl={2}>
    <button disabled={!(this.state.showEdit && !this.state.showadd)
  &&!(!this.state.showEdit && this.state.showadd)
          } onClick={this.handlecancel}>取消</button>
    </Box>
    </Box>          
    {this.state.showEdit == true || this.state.showadd == true ? 
            <Fragment>
                <Table
                 columns={tableColumns}
                 data={this.state.pur_nodata2}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="進料明細"
                 editable={{
                     onRowAdd:(newData)=>
                     new Promise((resolve,reject)=>{
                         setTimeout(()=>{
                             this.setState(
                                 {
                                    pur_nodata2 :[...this.state.pur_nodata2,newData],
                                    Dataview:{...newData}
                                 })
                                 resolve();
                         },10)
                     }),
                     onRowUpdate:(newData,oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                console.log("new: ",newData);

                                const dataUpdate=[...this.state.pur_nodata2];
                                const index = oldData.tableData.pur_no;
                                dataUpdate[index]=newData;
                                this.setState({
                                    Dataview:{...newData},
                                    pur_nodata2:[...dataUpdate]
                                });
                                resolve();
                            },10);
                        }),
                        onRowDelete:(oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dataDelete =[...this.state.pur_nodata2];
                                const index=oldData.tableData.pur_no;
                                dataDelete.splice(index,1);
                                this.setState({
                                    pur_nodata2:[...dataDelete]
                                });
                                resolve();
                            },10);
                        })
                 }}
                />
            </Fragment>: 
            <Fragment>
            <Table
                 columns={tableColumns}
                 data ={this.state.pur_nodata2}
                 options ={{search: false,actionsColumnIndex:-1}}
                 title ="進料明細"
                 />
            </Fragment>}

           </div>
        )
    }
}
export default DataListPurchase