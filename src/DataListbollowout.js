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

class DataListbollowout extends Component{
     constructor(props){
         super(props);
         this.state={
            data:[],
            IDdata:[],
            IDdata2:[],
            listapplication:[],
            listwork_no:[],
            listclientnumber:[],
            modal:null,
            
            passQty : 0,
            failQty : 0,
            retestqty : 0,
            login_name:"David",

            Combo13:false,
            add_btn:false,
            save_btn:false,
            del_btn:false,
            edit_btn:false,
            emdreturn:false,
            
            confirmdelete:false,
            work_no_NotInList:false,
            borrow_typeaskreturn1: false,
            borrow_typeaskreturn2: false,
            borrow_typeaskreturn3: false,
            borrow_typeasknowenterreturnsystem: false,
            borrow_typeasknowenterreturnsysteminput: false,
            enternotenough :false,
            enteramountbigthanunreturnamount :false,
            onlypickpassamountreselect : false,
            wh_chkcheckeditblock:false,
            wh_chkcheckcancelblock : false,
            newproductrepairdontneedreturn:false,
            returneddontneedreturn:false,
            bollowuncheckeddontneedreturn:false,
            
            dataviewborrow_typeasknowenterreturnsystem:false,
            dataviewborrow_typeasknowenterreturnsystemyes:false,
            dataviewborrow_typeasknowenterreturnsysteminput:false,
            
            confirmbollowitem_wh_chk:false,
            confirmbollowitem_wh_chkyes:false,

            showadd:false,
            showEdit:false,
            buttonadd:"新增",
            buttonText:"修改",
            buttonsave:"儲存",
             borrow_no:"", 
             borrow_date : {
                 date:""
             },
             borrow_type:"",
             bollowid:"",
             borrow_people:"",
             remark:"",
             borrow_marker:"",
             work_no:"",
             Dataview:{
                borrow_item: "",
                borrow_type:"",
                warehouse_no:"",
                customer_no:"",
                po_no:"",
                ic_level:"",
                marking_type:"",
                product_no:"",
                pcb_no:"",
                borrow_qty:"",
                borrow_return_qty:"",
                remark:"",
                return:"",
                wh_chk:false,
                wh_chk_time:"",
                
                pass_qty: "",
                fail_qty: "",
                retest_qty:"",
                remark2:"",
                wh_chk_return:false,
                wh_chk_return_time:"",
            }
         }
     }
     getOption=(e)=>{
         axios.get('/posts')
         .then(res=>{
             this.setState({
                 data:res.data
             })
         })
     }
     getlistapplication =(e)=>{
         axios.get('/listapplication')
         .then(res=>{
             this.setState({
                listapplication : res.data
             })
         })
     }
     getlistwork_no =(e)=>{
         axios.get('/listwork_no')
         .then(res=>{
             this.setState({
                listwork_no:res.data
             })
         })
     }
     getlistclientnumber=(e)=>{
         axios.get('/listclientnumber') 
          .then(res=>{
              this.setState({
                listclientnumber : res.data
              })
          })

        }
        componentDidMount(){
            this.getOption();
            this.getlistclientnumber();
            this.getlistapplication();
            this.getlistwork_no();
        }
   clear =(e)=>{
       e.target.value="";
   }
   borrow_typeasknowenterreturnsystemyes=()=>{
         this.setState({
             borrow_typeasknowenterreturnsysteminput:true
         })
   }
   dataviewborrow_typeasknowenterreturnsystemyes=()=>{
       this.setState({
            dataviewborrow_typeasknowenterreturnsystemyes:true
       })
   }
   
   handlecancel=()=>{
    this.state.data.map((item,index)=>{
        if(this.state.borrow_no === item.borrow_no){
            this.setState({
                IDdata:item.data,
                IDdata2:item.IDdata2,
             borrow_no:item.borrow_no, 
             borrow_date : item.borrow_date,
             borrow_type:item.borrow_type,
             bollowborrow_no:item.bollowid,
             borrow_people:item.borrow_people,
             remark:item.remark,
             borrow_marker:item.borrow_marker,
             work_no:item.work_no,
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
 wh_chk_AfterUpdate=()=>{
     if(this.state.Dataview.wh_chk === false ){
        this.setState({
            wh_chkcheckcancelblock:!this.state.wh_chkcheckcancelblock,
            wh_chk:true
        })
     }
     else {
         this.setState({
             confirmbollowitem_wh_chk:!this.state.confirmbollowitem_wh_chk
         })

         if(this.state.confirmbollowitem_wh_chkyes ===true){
             /*
             Set temp_warehouse = CurrentDb.OpenRecordset(" SELECT dbo_warehouse.warehouse_no, dbo_warehouse.pur_no, dbo_warehouse.ic_level, dbo_warehouse.product_no, dbo_warehouse.pcb_no, dbo_warehouse.blank_qty, dbo_warehouse.fail_qty, dbo_warehouse.retest_qty, dbo_warehouse.other_qty, dbo_warehouse.spare_qty, dbo_warehouse.spare_fail_qty, dbo_warehouse.spare_retest_qty FROM dbo_warehouse WHERE dbo_warehouse.warehouse_no = '" & warehouse_no.value & "' AND dbo_warehouse.pur_no = '" & po_no.value & "' AND dbo_warehouse.ic_level = '" & ic_level.value & "' AND dbo_warehouse.product_no = '" & product_no.value & "' AND dbo_warehouse.pcb_no = '" & Trim(Nz(pcb_no.value)) & "'")
        If temp_warehouse.RecordCount <> 0 Then
            If Combo27.value = "Pass" Then
                If Nz(temp_warehouse.blank_qty, 0) < Nz(borrow_qty.value, 0) Then
                    MsgBox ("此採購單Pass庫存數不足，無法確認!!!"), vbOKOnly
                    wh_chk.value = False
                    wh_chk_time.value = ""
                Else
                  If Nz(borrow_type.value) = "新品維修" Then
                    yy = Right(Year(Forms!borrow!borrow_date.value), 2)
                    mm = IIf(Month(Forms!borrow!borrow_date.value) < 10, "0" & Month(Forms!borrow!borrow_date.value), Month(Forms!borrow!borrow_date.value))
                    dd = IIf(Day(Forms!borrow!borrow_date.value) < 10, "0" & Day(Forms!borrow!borrow_date.value), Day(Forms!borrow!borrow_date.value))
                    hh = IIf(Hour(Forms!borrow!borrow_date.value) < 10, "0" & Hour(Forms!borrow!borrow_date.value), Hour(Forms!borrow!borrow_date.value))
                    mm1 = IIf(Minute(Forms!borrow!borrow_date.value) < 10, "0" & Minute(Forms!borrow!borrow_date.value), Minute(Forms!borrow!borrow_date.value))

                    ymdm = yy & "/" & mm & "/" & dd & " " & hh & ":" & mm1

                    Set workno_exist = CurrentDb.OpenRecordset("SELECT dbo_work.[no], dbo_work.pre_repair_ic FROM dbo_work WHERE [no] = '" & Forms!borrow!work_no.value & "'")

                    If workno_exist.RecordCount <> 0 Then
                         'If IsNumeric(Mid(borrow_people.Value, 2, 1)) And add_flag = True Then
                        Set temp_warehouse = CurrentDb.OpenRecordset(" SELECT dbo_warehouse.warehouse_no, dbo_warehouse.pur_no, dbo_warehouse.ic_level, dbo_warehouse.product_no, dbo_warehouse.pcb_no, dbo_warehouse.blank_qty, dbo_warehouse.fail_qty, dbo_warehouse.retest_qty, dbo_warehouse.other_qty, dbo_warehouse.spare_qty, dbo_warehouse.spare_fail_qty, dbo_warehouse.spare_retest_qty FROM dbo_warehouse WHERE dbo_warehouse.warehouse_no = '" & warehouse_no.value & "' AND dbo_warehouse.pur_no = '" & po_no.value & "' AND dbo_warehouse.ic_level = '" & ic_level.value & "' AND dbo_warehouse.product_no = '" & product_no.value & "' AND dbo_warehouse.pcb_no = '" & pcb_no.value & "'")
                        If temp_warehouse.RecordCount <> 0 Then
            
                            Set temp = CurrentDb.OpenRecordset("SELECT dbo_borrow_detail.borrow_no FROM dbo_borrow_detail GROUP BY dbo_borrow_detail.borrow_no HAVING dbo_borrow_detail.borrow_no = '" & Forms!borrow!borrow_no.value & "' ORDER BY dbo_borrow_detail.borrow_no ")

                            If Nz(borrow_type.value) = "新品維修" Then
                                If temp.RecordCount <> 0 Then
                                    DoCmd.SetWarnings False
                                    insertsql = "INSERT INTO dbo_incoming (no,ic_module,qty,time1,marker,utime,pick_no,wh_chk,wh_time,warehouse_no,ic_level,pur_no,product_no,pcb_no) VALUES ("
                                    insertsql = insertsql & "'" & Forms!borrow!work_no.value & "',"
                                    If Left(product_no.value, 1) = "C" Then
                                        insertsql = insertsql & "'IC',"
                                    ElseIf Left(product_no.value, 1) = "D" Then
                                        insertsql = insertsql & "'Module',"
                                    ElseIf Left(product_no.value, 1) = "F" Then
                                        insertsql = insertsql & "'NAND Flash',"
                                    End If
                                    insertsql = insertsql & borrow_qty.value & ","
                                    insertsql = insertsql & "'" & ymdm & "',"
                                    insertsql = insertsql & "'" & login_name & "',"
                                    insertsql = insertsql & "'" & date + Time & "',"
                                    insertsql = insertsql & "'" & Forms!borrow!borrow_no.value & "',"
                                    insertsql = insertsql & "-1,"
                                    insertsql = insertsql & "'" & date + Time & "',"
                                    insertsql = insertsql & "'" & warehouse_no.value & "',"
                                    insertsql = insertsql & "'" & ic_level.value & "',"
                                    insertsql = insertsql & "'" & po_no.value & "',"
                                    insertsql = insertsql & "'" & product_no.value & "',"
                                    insertsql = insertsql & "'" & pcb_no.value & "')"
                                    DoCmd.RunSQL insertsql
                                        
                                    insertsql = "insert into dbo_work_incoming(no,incoming_no,incoming_qty,ic_module,pick_no) values ("
                                    insertsql = insertsql & "'" & Forms!borrow!work_no.value & "',"
                                    insertsql = insertsql & "'" & po_no.value & "',"
                                    insertsql = insertsql & borrow_qty.value & ","
                       
                                    If Left(product_no.value, 1) = "C" Then
                                        insertsql = insertsql & "'IC',"
                                    ElseIf Left(product_no.value, 1) = "D" Then
                                        insertsql = insertsql & "'Module',"
                                    ElseIf Left(product_no.value, 1) = "P" Then
                                        insertsql = insertsql & "'PCB',"
                                    ElseIf Left(product_no.value, 1) = "F" Then
                                        insertsql = insertsql & "'NAND Flash',"
                                    Else
                                        insertsql = insertsql & "'',"
                                    End If
                       
                                    insertsql = insertsql & "'" & Forms!borrow!borrow_no.value & "')"
                                    DoCmd.RunSQL insertsql
                                        
                                    DoCmd.RunSQL "UPDATE dbo_work SET pre_repair_ic = " & workno_exist.pre_repair_ic + borrow_qty.value & " WHERE [no] = '" & Forms!borrow!work_no.value & "'"
            
                                    insertsql = "INSERT INTO dbo_pick_material (no,pur_no,ic_module,qty,pn,transfer_flag,picker,pick_time,pass_fail,warehouse_no,repair_ic,pick_no,ic_level) VALUES ("
                                    insertsql = insertsql & "'" & Forms!borrow!work_no.value & "',"
                                    insertsql = insertsql & "'" & po_no.value & "',"
                                    insertsql = insertsql & "'IC',"
                                    insertsql = insertsql & Int(borrow_qty.value) & ","
                                    insertsql = insertsql & "'" & product_no.value & "',"
                                    insertsql = insertsql & "'No',"
                                    insertsql = insertsql & "'" & login_name & "',"
                                    insertsql = insertsql & "'" & date + Time & "',"
                                    insertsql = insertsql & "'Pass',"
                                    insertsql = insertsql & "'" & warehouse_no.value & "',"
                                    insertsql = insertsql & "1,'" & Forms!borrow!borrow_no.value & "',"
                                    insertsql = insertsql & "'" & ic_level.value & "')"
                                    'MsgBox InsertSQL
                                    DoCmd.RunSQL insertsql
        
                                    Set pur_pn_exist = CurrentDb.OpenRecordset("SELECT dbo_pur_pn.pur_no, dbo_pur_pn.pn, dbo_pur_pn.pass_qty, dbo_pur_pn.fail_qty FROM dbo_pur_pn WHERE  dbo_pur_pn.pur_no = '" & po_no.value & "' AND dbo_pur_pn.pn = '" & product_no.value & "'")

                                    If pur_pn_exist.RecordCount <> 0 Then
                                         UpdateSQL = "UPDATE dbo_pur_pn SET pass_qty = " & pur_pn_exist.pass_qty - Int(pick_num) & " WHERE pur_no = '" & po_no.value & "' AND pn = '" & product_no.value & "'"
                                         DoCmd.RunSQL UpdateSQL
                                    Else
                                         insertsql = "INSERT INTO dbo_pur_pn (pur_no,pn,pass_qty,fail_qty) VALUES ('" & po_no.value & "','" & product_no.value & "'," & -Int(pick_num) & ",0)"
                                         DoCmd.RunSQL insertsql
                                    End If

                                    pur_pn_exist.Close

                                    DoCmd.SetWarnings True
                                    wh_chk_time.value = date + Time
                                End If
                            End If
                        Else
                            MsgBox ("2"), vbOKOnly
                            MsgBox ("庫存無此Item資料"), vbOKOnly
                            wh_chk.value = False
                            wh_chk_time.value = ""
                        End If
                    End If
                  Else
                    
                    Call stock_process(warehouse_no:=warehouse_no.value, product_no:=product_no.value, pcb_no:=pcb_no.value, stock_qty:=-borrow_qty.value, outstock_type:="空白", pur_no:=po_no.value, ic_level:=ic_level.value)
                    wh_chk_time.value = date + Time
                  End If
                End If
            ElseIf Combo27.value = "Fail" Then
                If Nz(temp_warehouse.fail_qty, 0) < Nz(borrow_qty.value, 0) Then
                    MsgBox ("此採購單Fail庫存數不足，無法確認!!!"), vbOKOnly
                    wh_chk.value = False
                    wh_chk_time.value = ""
                Else
                    Call stock_process(warehouse_no:=warehouse_no.value, product_no:=product_no.value, pcb_no:=pcb_no.value, stock_qty:=-borrow_qty.value, outstock_type:="Fail", pur_no:=po_no.value, ic_level:=ic_level.value)
                    wh_chk_time.value = date + Time
                End If
            ElseIf Combo27.value = "待測" Then
                If Nz(temp_warehouse.retest_qty, 0) < Nz(borrow_qty.value, 0) Then
                    MsgBox ("此採購單Retest庫存數不足，無法確認!!!"), vbOKOnly
                    wh_chk.value = False
                    wh_chk_time.value = ""
                Else
                    Call stock_process(warehouse_no:=warehouse_no.value, product_no:=product_no.value, pcb_no:=pcb_no.value, stock_qty:=-borrow_qty.value, outstock_type:="Retest", pur_no:=po_no.value, ic_level:=ic_level.value)
                    wh_chk_time.value = date + Time
                End If
            End If
       
        Else
            
            MsgBox ("庫存無此Item資料"), vbOKOnly
            wh_chk.value = False
            wh_chk_time.value = ""
        End If
     
    Else
        wh_chk.value = False
        wh_chk_time.value = ""
    End If
End If

End Sub
             */ 
         }
     }
 }
 handlesave=()=>{
     this.setState({
         showEdit:false,
         //更新表單 Me.Refresh
         //all_locked
     })
     /*
     '''yy = Year(borrow_date.Value) - 1911
'''mm = IIf(Month(borrow_date.Value) < 10, "0" & Month(borrow_date.Value), Month(borrow_date.Value))
'''dd = IIf(Day(borrow_date.Value) < 10, "0" & Day(borrow_date.Value), Day(borrow_date.Value))
'''hh = IIf(Hour(borrow_date.Value) < 10, "0" & Hour(borrow_date.Value), Hour(borrow_date.Value))
'''mm1 = IIf(Minute(borrow_date.Value) < 10, "0" & Minute(borrow_date.Value), Minute(borrow_date.Value))

'''ymdm = yy & "/" & mm & "/" & dd & " " & hh & ":" & mm1

'''Set workno_exist = CurrentDb.OpenRecordset("SELECT dbo_work.[no], dbo_work.pre_repair_ic FROM dbo_work WHERE [no] = '" & borrow_people.Value & "'")

'''If workno_exist.RecordCount <> 0 And add_flag = True Then
'If IsNumeric(Mid(borrow_people.Value, 2, 1)) And add_flag = True Then
'''    Set temp = CurrentDb.OpenRecordset("SELECT dbo_borrow_detail.borrow_no FROM dbo_borrow_detail GROUP BY dbo_borrow_detail.borrow_no HAVING dbo_borrow_detail.borrow_no = '" & borrow_no.Value & "' ORDER BY dbo_borrow_detail.borrow_no ")

'''    If temp.RecordCount <> 0 Then
'''        DoCmd.SetWarnings False
'''        insertsql = "INSERT INTO dbo_work_no_incoming (no,ic_module,qty,time1,marker,utime,pick_no) VALUES ("
'''        insertsql = insertsql & "'" & borrow_people.Value & "',"
'''        If Left(dbo_borrow_detail!product_no.Value, 1) = "C" Then
'''            insertsql = insertsql & "'IC',"
'''        ElseIf Left(dbo_borrow_detail!product_no.Value, 1) = "D" Then
'''            insertsql = insertsql & "'Module',"
'''        End If
'''        insertsql = insertsql & dbo_borrow_detail!borrow_qty.Value & ","
'''        insertsql = insertsql & "'" & ymdm & "',"
'''        insertsql = insertsql & "'" & login_name & "',"
'''        insertsql = insertsql & "'" & date + Time & "',"
'''        insertsql = insertsql & "'" & borrow_no.Value & "')"
'''        DoCmd.RunSQL insertsql
        
'''        DoCmd.RunSQL "UPDATE dbo_work SET pre_repair_ic = " & workno_exist.pre_repair_ic + dbo_borrow_detail!borrow_qty.Value & " WHERE [no] = '" & borrow_people.Value & "'"
        
'''        insertsql = "INSERT INTO dbo_pick_material (no,pur_no,ic_module,qty,pn,transfer_flag,picker,pick_time,pass_fail) VALUES ("
'''        insertsql = insertsql & "'" & borrow_people.Value & "',"
'''        insertsql = insertsql & "'" & dbo_borrow_detail!po_no.Value & "',"
'''        insertsql = insertsql & "'IC',"
'''        insertsql = insertsql & Int(dbo_borrow_detail!borrow_qty.Value) & ","
'''        insertsql = insertsql & "'" & Left(dbo_borrow_detail!product_no.Value, 7) & "',"
'''        insertsql = insertsql & "'No',"
'''        insertsql = insertsql & "'" & login_name & "',"
'''        insertsql = insertsql & "'" & date + Time & "',"
'''        insertsql = insertsql & "'Pass')"
        'MsgBox InsertSQL
'''        DoCmd.RunSQL insertsql
        
'''        Set pur_pn_exist = CurrentDb.OpenRecordset("SELECT dbo_pur_pn.pur_no, dbo_pur_pn.pn, dbo_pur_pn.pass_qty, dbo_pur_pn.fail_qty FROM dbo_pur_pn WHERE  dbo_pur_pn.pur_no = '" & dbo_borrow_detail!po_no.Value & "' AND dbo_pur_pn.pn = '" & Left(dbo_borrow_detail!product_no.Value, 7) & "'")

'''        If pur_pn_exist.RecordCount <> 0 Then
'''          UpdateSQL = "UPDATE dbo_pur_pn SET pass_qty = " & pur_pn_exist.pass_qty - Int(pick_num) & " WHERE pur_no = '" & dbo_borrow_detail!po_no.Value & "' AND pn = '" & Left(dbo_borrow_detail!product_no.Value, 7) & "'"
'''            DoCmd.RunSQL UpdateSQL
'''        Else
'''           insertsql = "INSERT INTO dbo_pur_pn (pur_no,pn,pass_qty,fail_qty) VALUES ('" & List2.Column(0) & "','" & List2.Column(1) & "'," & -Int(pick_num) & ",0)"
'''            DoCmd.RunSQL insertsql
'''        End If

'''        pur_pn_exist.Close

'''        DoCmd.SetWarnings True
        
'''    End If
    
'''End If

'''workno_exist.Close
     */
    this.setState({
        showadd:false,
        Combo13: true,
        showadd:true,
        save_btn:false,
        del_btn:true,
        edit_btn:true,
        emdreturn:true,

    })
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
    Command21_Click=()=>{
        switch(this.state.borrow_type){
           
             /*
              case "驗證":
                  sample_process
             */
        }
    }
    spare_process=()=>{
        /*
          Dim oappwork As Excel.Workbook, oappwork_borrow As Excel.Worksheet
          Dim path As String

          Set temp = CurrentDb.OpenRecordset("SELECT dbo_borrow.borrow_no, dbo_borrow.borrow_date, dbo_borrow_detail.borrow_type, dbo_borrow_detail.warehouse_no, dbo_borrow_detail.customer_no, dbo_borrow_detail.po_no, dbo_borrow_detail.product_no, dbo_borrow_detail.product_model, dbo_borrow_detail.ic_die, dbo_borrow_detail.borrow_qty,dbo_borrow_detail.pcb_no,dbo_borrow_detail.marking_type,dbo_borrow_detail.remark,dbo_borrow_detail.ic_level FROM dbo_borrow INNER JOIN dbo_borrow_detail ON dbo_borrow.borrow_no = dbo_borrow_detail.borrow_no WHERE dbo_borrow.borrow_no = '" & borrow_no.value & "' ORDER BY dbo_borrow.borrow_no")
          
          if(temp.warehouse_no = "007" Or temp.warehouse_no = "103"){
              path = CurrentProject.path & "\report\spare_ark.xls"
          }
          else{
              path = CurrentProject.path & "\report\spare.xls"
          }
          set oApp = New Excel.Application
          oApp.Visible = false
          set oappwork = oApp.Workbooks.Open(path)
          set oappwork_borrow = oappwork.Worksheets("借出單")

          switch (this.state.borrow_type){
              case "備品", "樣品", "新品維修", "維修", "換EE", "驗證":
                 oappwork_borrow.Range("A5") = this.state.borrow_type + "借出單" 
              case "驗證":
                 oappwork_borrow.Range("A5") = "樣品驗證單"
          }
           oappwork_borrow.Range("E7") = temp.borrow_no
        oappwork_borrow.Range("H8") = work_no.value
        oappwork_borrow.Range("C8") = DateValue(temp.borrow_date)
        oappwork_borrow.Range("E8") = borrow_type.value
        oappwork_borrow.Range("C7") = borrow_people.value
        oappwork_borrow.Range("G18") = remark.value
        i = 10
        Do
            If temp.EOF Then Exit Do
            oappwork_borrow.Range("A" & i) = i - 9
            oappwork_borrow.Range("B" & i) = temp.warehouse_no
            oappwork_borrow.Range("C" & i) = temp.customer_no
            oappwork_borrow.Range("D" & i) = temp.po_no
            If temp.warehouse_no = "002" Then
                oappwork_borrow.Range("G" & i) = temp.product_no & "(GO)"
            ElseIf temp.warehouse_no = "007" Then
                oappwork_borrow.Range("G" & i) = temp.product_no & "(ARK)"
            ElseIf temp.warehouse_no = "103" Then
                oappwork_borrow.Range("G" & i) = temp.product_no & "(ARKSample)"
            ElseIf temp.warehouse_no = "008" Then
                oappwork_borrow.Range("G" & i) = temp.product_no & "(NF代工)"
            Else
                oappwork_borrow.Range("G" & i) = temp.product_no
            End If
            oappwork_borrow.Range("E" & i) = temp.ic_level
            oappwork_borrow.Range("H" & i) = Nz(temp.pcb_no)
            oappwork_borrow.Range("F" & i) = temp.marking_type
            oappwork_borrow.Range("I" & i) = temp.borrow_qty
            oappwork_borrow.Range("J" & i) = temp.remark
            
            temp.MoveNext
            i = i + 1
        Loop

    oApp.Visible = True
    oappwork.SaveAs CurrentProject.path & "\spare\" & borrow_no.value & ".xls"

    temp.Close
        */
    }
    borrow_type_AfterUpdate1=()=>{
        if(this.state.borrow_type == "新品維修"){
            if(this.state.Dataview.marking_type !== "Pass"){
                 this.setState({
                     onlypickpassamountreselect:!this.state.onlypickpassamountreselect,
                     borrow_type:""
                    })
                    /**
                     ''Set temp = CurrentDb.OpenRecordset("SELECT Max(Right([borrow_no],5)+1) AS maxno FROM dbo_borrow GROUP BY Year([borrow_date]) & Month([borrow_date]) HAVING (((Year([borrow_date]) & Month([borrow_date]))=Year(Date()) & Month(Date())))")

    ''If temp.RecordCount = 0 Then
    ''    borrow_no.Value = "LR" & Year(date) - 1911 & IIf(Month(date) < 10, "0" & Month(date), Month(date)) & "00001"
    ''Else
    ''    maxno = temp.maxno
    ''    maxno = Switch(Len(maxno) = 1, "0000" & maxno, Len(maxno) = 2, "000" & maxno, Len(maxno) = 3, "00" & maxno, Len(maxno) = 1, "0" & maxno)
    ''    borrow_no.Value = "LR" & Year(date) - 1911 & IIf(Month(date) < 10, "0" & Month(date), Month(date)) & maxno
    ''End If
''Else
    ''Set temp = CurrentDb.OpenRecordset("SELECT Max(Right([borrow_no],5)+1) AS maxno FROM dbo_borrow GROUP BY Year([borrow_date]) & Month([borrow_date]) HAVING (((Year([borrow_date]) & Month([borrow_date]))=Year(Date()) & Month(Date())))")

    ''If temp.RecordCount = 0 Then
    ''    borrow_no.Value = "L" & Year(date) - 1911 & IIf(Month(date) < 10, "0" & Month(date), Month(date)) & "00001"
    ''Else
    ''    maxno = temp.maxno
    ''    maxno = Switch(Len(maxno) = 1, "0000" & maxno, Len(maxno) = 2, "000" & maxno, Len(maxno) = 3, "00" & maxno, Len(maxno) = 1, "0" & maxno)
    ''    borrow_no.Value = "L" & Year(date) - 1911 & IIf(Month(date) < 10, "0" & Month(date), Month(date)) & maxno
    ''End If
                     */
            }
        }
    }
    wh_chkcheckeditblock=()=>{
        if(this.state.wh_chk === true){
            this.setState({
                wh_chkcheckeditblock:!this.state.wh_chkcheckeditblock
            })
        }
    }
    handleshowEdit=()=>{
        /*
        Set temp = CurrentDb.OpenRecordset("SELECT dbo_borrow_detail.borrow_no, dbo_borrow_detail.wh_chk, dbo_borrow_detail.wh_chk_return FROM dbo_borrow_detail WHERE dbo_borrow_detail.borrow_no = '" & borrow_no.value & "' And (dbo_borrow_detail.wh_chk = 0 )")

        if(temp.RecordCount === 0){
             MsgBox "倉庫已借出確認，禁止修改！！"
        }
        else{
            this.setState({
                showedit:true,
                all_unlocked,
                borrow_people.SetFocus,
                ctrc = Me.CurrentRecord,

                combo13 : false,
                add_btn : false,
                save_btn : true,
                del_btn : true,
                edit_btn:false,
                cmdreturn : false,
                borrow_no.Locked : true,
                borrow_date.Locked : true,
                work_no.Locked : false,
                borrow_marker.Locked : true,
                borrow_type.Locked : true 
            })
        }
        */
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
     handleChangeborrow_type=(e,newInputValue)=>{
        if(this.state.showadd ==true || this.state.showEdit ==true){
            this.setState({
                borrow_type:newInputValue
            })
        }
     }
     handleChangework_no=(e,newInputValue)=>{
        if(this.state.showadd ==true || this.state.showEdit ==true){
            this.setState({
                work_no:newInputValue
            })
        }
     }
     handleChangeborrow_date =(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                borrow_date:e.target.value
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
   handleID=(e,values)=>{
       this.setState({
           borrow_no:values.borrow_no
       })
       this.state.data.map((item,index)=>{
           if(values.borrow_no === item.borrow_no){
               this.setState({
                   IDdata:item.data,
                   IDdata2:item.IDdata2,
                borrow_no:item.borrow_no, 
                borrow_date : item.borrow_date,
                borrow_type:item.borrow_type,
                bollowid:item.bollowid,
                borrow_people:item.borrow_people,
                remark:item.remark,
                borrow_marker:item.borrow_marker,
                work_no:item.work_no,
               })
           }
           return true;
       })
   }
   Delete =()=>{
    axios.delete(`posts/${this.state.borrow_no}`)
    if(this.state.showadd === true){
        this.setState({
            showadd:false,
            //更新表單Me.refresh
            
        })
        /*
        DeleteSQL = "DELETE FROM dbo_borrow WHERE [seq] = " & seq.value
          DoCmd.RunSQL DeleteSQL 
           DoCmd.SetWarnings True
           all_locked
          */
    }
    else if(this.state.showEdit=== true){
        this.setState({
            showEdit:false
        })
        /*
          if (Me.Dirty = true) {
              Me.Undo
          }
        */ 
    }
    else {
        /*
         Set temp = CurrentDb.OpenRecordset("SELECT dbo_borrow_detail.borrow_no, dbo_borrow_detail.wh_chk FROM dbo_borrow_detail WHERE dbo_borrow_detail.borrow_no = '" & borrow_no.value & "' AND dbo_borrow_detail.wh_chk = -1")
    If temp.RecordCount <> 0 Then
        MsgBox "倉庫已借出確認，禁止刪除！！"
    Else
        If MsgBox("是否刪除 [借出單號]：" & borrow_no.value & "的相關記錄？", vbYesNo, "刪除") = vbYes Then

            'Set temp = CurrentDb.OpenRecordset("SELECT dbo_borrow_detail.borrow_no, dbo_borrow_detail.warehouse_no, dbo_borrow_detail.product_no, dbo_borrow_detail.pcb_no,dbo_borrow_detail.borrow_qty, dbo_borrow_detail.return_flag, dbo_borrow_detail.marking_type FROM dbo_borrow_detail WHERE dbo_borrow_detail.borrow_no = '" & borrow_no.Value & "' AND dbo_borrow_detail.return_flag = False")
            'If temp.RecordCount <> 0 Then
            '    Do
            '    If temp.EOF Then Exit Do
            '        Call stock_process(warehouse_no:=temp.warehouse_no, product_no:=temp.product_no, pcb_no:=temp.pcb_no, stock_qty:=temp.borrow_qty, outstock_type:=temp.marking_type)
            '        temp.MoveNext
            '    Loop
            'End If
            DoCmd.SetWarnings False
            DeleteSQL = "DELETE FROM dbo_borrow_detail WHERE [borrow_no] = '" & borrow_no.value & "'"
            DoCmd.RunSQL DeleteSQL
            DeleteSQL = ""
            DeleteSQL = "DELETE FROM dbo_borrow WHERE [borrow_no] = '" & borrow_no.value & "'"
            DoCmd.RunSQL DeleteSQL
            DoCmd.SetWarnings True
                 End If
    End If
     temp.Close
End If
Me.Requery
all_locked
        */
    }
    this.setState({
        //Combo13.Requery
        Combo13:true,
        add_btn:true,
        save_btn:false,
        del_btn:true,
        edit_btn:true, 
        
        borrow_no:"", 
             borrow_date : {
                 date:""
             },
             borrow_type:"",
             bollowborrow_no:"",
             borrow_people:"",
             remark:"",
             borrow_marker:"",
             work_no:"",
         IDdata:[],
        IDdata2:[],
        confirmdelete:!this.state.confirmdelete
    })
}
PUT=()=>{
   axios.put(`posts/${this.state.borrow_no}`,
   {
    borrow_no:this.state.borrow_no, 
    borrow_date : this.state.borrow_date,
    borrow_type:this.state.borrow_type,
    bollowid:this.state.bollowid,
    borrow_people:this.state.borrow_people,
    remark:this.state.remark,
    borrow_marker:this.state.peson,
    work_no:this.state.work_no,
       data :
       this.state.IDdata,
       data2 : 
       this.state.IDdata2,
  }
)
}

POST=()=>{//此為直接傳送至jsondata的動作
     axios.post("/posts",
     {
        borrow_no:this.state.borrow_no, 
        borrow_date : {
            date:this.state.borrow_date
        },
        borrow_type:this.state.borrow_type,
        bollowid:this.state.bollowid,
        borrow_people:this.state.borrow_people,
        remark:this.state.remark,
        borrow_marker:this.state.peson,
        work_no:this.state.work_no,
       data :
       this.state.IDdata,
       data2 :
       this.state.IDdata2
    })
 }
 ADD=()=>{
     const date = new Date().toLocaleDateString();
     const time = new Date().toLocaleTimeString();
     this.setState({
        borrow_no:"", 
        borrow_date : {
            date: date+ ""+ time
        },
        borrow_type:"",
        bollowid:"",
        borrow_people:"",
        remark:"",
        borrow_marker:this.state.login_name,
        work_no:"",
       IDdata:[],
       IDdata2:[],
       showadd:!this.state.showadd,

       Combo13:false,
            add_btn:false,
            save_btn:true,
            del_btn:true,
            edit_btn:false,
            emdreturn:false,
     })
   
 }

 Command49_Click=()=>{
     if(this.state.Dataview.borrow_type /*Forms!borrow!borrow_type*/ === "新品維修"){
          this.setState({
              newproductrepairdontneedreturn:!this.state.newproductrepairdontneedreturn
          })
     }
     else if((this.state.Dataview.borrow_type /*Forms!borrow!borrow_type*/ !== "新品維修" && (this.state.borrow_return_qty || 0)) === 0 ){
         this.setState({
              returneddontneedreturn:!this.state.returneddontneedreturn
         })
     }
     else if((this.state.Dataview.borrow_type /*Forms!borrow!borrow_type */ !== "新品維修" && (this.state.wh_chk === false))){
          this.setState({
              bollowuncheckeddontneedreturn:!this.state.bollowuncheckeddontneedreturn
          })         
     }
     else {
        this.setState({
            dataviewborrow_typeasknowenterreturnsystem:!this.state.dataviewborrow_typeasknowenterreturnsystem
        })
        if(this.state.dataviewborrow_typeasknowenterreturnsystemyes === true){
            this.setState({
               dataviewborrow_typeasknowenterreturnsysteminput :!this.state.dataviewborrow_typeasknowenterreturnsysteminput
            })
            if(this.state.Dataview.pass_qty === "" || this.state.Dataview.fail_qty === "" || this.state.Dataview.retest_qty === ""){
                this.setState({
                    enternotenough:!this.state.enternotenough
                })
            }
            else if(parseInt((this.state.Dataview.borrow_return_qty || 0)) < (parseInt(this.state.Dataview.pass_qty)+ parseInt(this.state.Dataview.fail_qty)+ parseInt(this.state.Dataview.retest_qty))){
                this.setState({
                    enteramountbigthanunreturnamount : !this.state.enteramountbigthanunreturnamount
                })
            }
            else{
                 //DoCmd.SetWarnings False\
                 /*
          insertsql = "INSERT INTO dbo_borrow_return_detail (borrow_no,borrow_type,po_no,warehouse_no,ic_level,product_no,pcb_no,return_qty,wh_chk_return,pass_qty,fail_qty,retest_qty,product_model,ic_die,customer_no,borrow_item) VALUES ( "
          insertsql = insertsql & "'" & Forms!borrow!borrow_no.value & "',"
          insertsql = insertsql & "'" & Forms!borrow!borrow_type.value & "',"
          insertsql = insertsql & "'" & po_no.value & "',"
          insertsql = insertsql & "'" & warehouse_no.value & "',"
          insertsql = insertsql & "'" & ic_level.value & "',"
          insertsql = insertsql & "'" & product_no.value & "',"
          insertsql = insertsql & "'" & pcb_no.value & "',"
          insertsql = insertsql & Int(passQty) + Int(failQty) + Int(retestqty) & ","
          insertsql = insertsql & "False,"
          insertsql = insertsql & Int(passQty) & ","
          insertsql = insertsql & Int(failQty) & ","
          insertsql = insertsql & Int(retestqty) & ","
          insertsql = insertsql & "'" & transfer_type(product_no.value) & "',"
          insertsql = insertsql & "'" & transfer_die(product_no.value) & "',"
          insertsql = insertsql & "'" & customer_no.value & "',"
          insertsql = insertsql & "'" & borrow_item.value & "')"
          DoCmd.RunSQL insertsql

          UpdateSQL = "UPDATE dbo_borrow_detail SET borrow_return_qty = " & Int(borrow_return_qty.value) - Int(passQty) - Int(failQty) - Int(retestqty) & " WHERE borrow_no = '" & Forms!borrow!borrow_no.value & "' AND borrow_type = '" & Forms!borrow!borrow_type.value & "' AND po_no='" & po_no.value & "' AND product_no='" & product_no.value & "' AND pcb_no='" & pcb_no.value & "' AND borrow_item='" & borrow_item.value & "'"
          DoCmd.RunSQL UpdateSQL
          
          Forms!borrow!dbo_borrow_return_detail.Requery
          Forms!borrow!borrow_type.SetFocus
          Forms!borrow!dbo_borrow_detail.Requery
          Forms!borrow!dbo_borrow_return_detail!borrow_type.SetFocus       */
            }
        }
     }
 }

 product_no_AfterUpdate=()=>{
     this.setState({
         //product_model : this.transfer_type(this.state.product_no)
         //ic_die : this.transfer_die(this.state.product_no)
     })
 }
 work_no_NotInList =()=>{
     this.setState({
         work_no_NotInList : !this.state.work_no_NotInList,
         work_no:null,
         //work_no.Dropdown
     })
 }
 borrow_people_AfterUpdate=()=>{
     const UCase = this.state.borrow_people.toUpperCase();
    this.setState({
        borrow_people : UCase.slice(1,1) + "" + UCase.slice(1,2) 
        })
 }
 cmdreturn_Click=()=>{
     if(this.state.borrow_type === "新品維修"){
         this.setState({
             borrow_typeaskreturn1: !this.state.borrow_typeaskreturn1
         })
     }
     else if(this.state.borrow_type !== "新品維修" /*&&(Nz(dbo_borrow_detail!borrow_return_qty.value, 0) === 0){}*/){
         this.setState({
             borrow_typeaskreturn2 : !this.state.borrow_typeaskreturn2
         })
     }
     else if(this.state.borrow_type !=="新品維修" /*&& (dbo_borrow_detail!wh_chk.value = False) */){
         this.setState({
             borrow_typeaskreturn3 : !this.state.borrow_typeaskreturn3
         })
     }
     else{
         this.setState({
            borrow_typeasknowenterreturnsysteminput:!this.state.borrow_typeasknowenterreturnsysteminput
         })
         if(this.state.borrow_typeasknowenterreturnsystemyes === true ){
            if(this.state.passQty === "" || this.state.failQty ==="" || this.state.retest_qty === ""){
                  this.setState({
                      enternotenough :!this.state.enternotenough
                  })
            }
            else if(parseInt((this.state.borrow_return_qty || 0))< (parseInt(this.state.passQty)+ parseInt(this.state.failQty)+parseInt(this.state.retestqty))){
                  this.setState({
                       enteramountbigthanunreturnamount:!this.state.enteramountbigthanunreturnamount
                  })
            }
            else{
                //DoCmd.SetWarnings 
                /*
                 insertsql = "INSERT INTO dbo_borrow_return_detail (borrow_no,borrow_type,po_no,warehouse_no,ic_level,product_no,pcb_no,return_qty,wh_chk_return,pass_qty,fail_qty,retest_qty,product_model,ic_die,customer_no) VALUES ( "
          insertsql = insertsql & "'" & borrow_no.value & "',"
          insertsql = insertsql & "'" & borrow_type.value & "',"
          insertsql = insertsql & "'" & dbo_borrow_detail!po_no.value & "',"
          insertsql = insertsql & "'" & dbo_borrow_detail!warehouse_no.value & "',"
          insertsql = insertsql & "'" & dbo_borrow_detail!ic_level.value & "',"
          insertsql = insertsql & "'" & dbo_borrow_detail!product_no.value & "',"
          insertsql = insertsql & "'" & dbo_borrow_detail!pcb_no.value & "',"
          insertsql = insertsql & Int(passQty) + Int(failQty) + Int(retestqty) & ","
          insertsql = insertsql & "False,"
          insertsql = insertsql & Int(passQty) & ","
          insertsql = insertsql & Int(failQty) & ","
          insertsql = insertsql & Int(retestqty) & ","
          insertsql = insertsql & "'" & transfer_type(dbo_borrow_detail!product_no.value) & "',"
          insertsql = insertsql & "'" & transfer_die(dbo_borrow_detail!product_no.value) & "',"
          insertsql = insertsql & "'" & dbo_borrow_detail!customer_no.value & "')"
          DoCmd.RunSQL insertsql

          UpdateSQL = "UPDATE dbo_borrow_detail SET borrow_return_qty = " & Int(dbo_borrow_detail!borrow_return_qty.value) - Int(passQty) - Int(failQty) - Int(retestqty) & " WHERE borrow_no = '" & borrow_no.value & "' AND borrow_type = '" & borrow_type.value & "' AND po_no='" & dbo_borrow_detail!po_no.value & "'"
          DoCmd.RunSQL UpdateSQL
          
          Forms!borrow!dbo_borrow_return_detail.Requery
          Forms!borrow!dbo_borrow_detail.Requery
          Forms!borrow!dbo_borrow_return_detail!borrow_type.SetFocus
                */
            }
         }
     }
 }
 borrow_type_AfterUpdate=()=>{
         /* If temp.RecordCount = 0 Then
        borrow_no.value = "LR" & Right(Year(date), 2) & IIf(Month(date) < 10, "0" & Month(date), Month(date)) & "0001"
    Else
        maxno = temp.maxno
        maxno = Switch(Len(maxno) = 1, "000" & maxno, Len(maxno) = 2, "00" & maxno, Len(maxno) = 3, "0" & maxno)
        borrow_no.value = "LR" & Right(Year(date), 2) & IIf(Month(date) < 10, "0" & Month(date), Month(date)) & maxno
    End If
Else
    Set temp = CurrentDb.OpenRecordset("SELECT Max(Right([borrow_no],4)+1) AS maxno FROM dbo_borrow GROUP BY Year([borrow_date]) & Month([borrow_date]) HAVING (((Year([borrow_date]) & Month([borrow_date]))=Year(Date()) & Month(Date())))")

    If temp.RecordCount = 0 Then
        borrow_no.value = "L" & Right(Year(date), 2) & IIf(Month(date) < 10, "0" & Month(date), Month(date)) & "00001"
    Else
        maxno = temp.maxno
        maxno = Switch(Len(maxno) = 1, "0000" & maxno, Len(maxno) = 2, "000" & maxno, Len(maxno) = 3, "00" & maxno, Len(maxno) = 1, "0" & maxno)
        borrow_no.value = "L" & Right(Year(date), 2) & IIf(Month(date) < 10, "0" & Month(date), Month(date)) & maxno
    End If
     */
 }
   render(){
       const theme = createTheme();
       const axioscustomer_no = this.state.listclientnumber.map((item,index)=>{
           return <select value={this.state.customer_no}>
                 <option key={index} value={item.customer_no}>
                  {item.customer_no}
                 </option>
           </select>
       })
       const tableColumns=[
           {
               title:"借出Item",
               field:"borrow_item",
           },{
               title:"借出用途",
               field:"borrow_type",           
           },{
               title:"借出倉別",
               field:"warehouse_no",
            },{
                title:"客戶代號",
                field:"customer_no",
                editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="customer_no"
                    value={value}
                    placeholder={this.state.customer_no}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="customer_no">
                        {axioscustomer_no}
                    </datalist>
                    </div>
                )
             },{
                title:"採購單號",
                field:"po_no",
             },{
                title:"等級",
                field:"ic_level",
             },{
                title:"Type",
                field:"marking_type",
             },{
                title:"產品代號",
                field:"product_no",
             },{
                title:"PCB NO",
                field:"pcb_no",
             },{
                title:"借出數量",
                field:"borrow_qty",
             },{
                title:"未歸還數量",
                field:"borrow_return_qty",
             },{
                title:"備註",
                field:"remark",
             },{
                title:"歸還",
                field:"return",
                editComponent:({onChange})=>(
                    <button>
                        歸還
                    </button>
                )
             },{
                title:"借出倉管確認",
                field:"wh_chk",
                editComponent:
                (props)=>{
                    return(
                    <Checkbox
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
                },
             {
                title:"借出倉管確認時間",
                field:"wh_chk_time",
                editComponent:
                (({value,onChange})=>(
                    <TextField
                    name="wh_chk_time"
                    floatingLabelText="借出倉管確認時間"
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
       const tableColumns2 =[
        {
            title:"借出Item",
            field:"borrow_item",
        },{
            title:"借出用途",
            field:"borrow_type",
        },{
            title:"借出倉別",
            field:"warehouse_no",
         },{
             title:"客戶代號",
             field:"customer_no",
          },{
             title:"採購單號",
             field:"po_no",
          },{
             title:"等級",
             field:"ic_level",
          },{
            title:"產品代號",
            field:"product_no",
          },{
            title:"PCB NO",
            field:"pcb_no",
          },{
            title:"歸還數量(pass_qty)",
            field:"pass_qty",
          },{
            title:"歸還數量(fail_qty)",
            field:"fail_qty",
          },{
            title:"歸還數量(待測)",
            field:"retest_qty",
          },{
            title:"備註",
            field:"remark2",
          },{
            title:"歸還倉管確認",
            field:"wh_chk_return", 
            editComponent:
            (props)=>{
                console.log(props);
                return(
                <Checkbox
                    value={this.state.wh_chk_return}
                    checked={props.value}
                    name="wh_chk_return"
                    onChange={(e)=>props.onChange(e.target.checked)}
                />
                )
        },
        render: (rowdata)=>(
            <Checkbox checked={rowdata.wh_chk_return} readOnly />
          )
        },{
            title:"歸還倉管確認時間",
            field:"wh_chk_return_time", 
            editComponent:
            (({value,onChange})=>(
                <TextField
                name="wh_chk_return_time"
                floatingLabelText="歸還倉管確認時間"
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
     return(
        <div className="content">
        <Modal isOpen={this.state.modal} toggle={this.handleshowEdit} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        因倉管已確認
         故無法修改
        </ModalBody>
      <ModalFooter>
      <div></div>
      </ModalFooter>
     </Modal>
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
     <Modal isOpen={this.state.work_no_NotInList} toggle={this.work_no_NotInList} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        工單輸入錯誤，請重新選擇或輸入！！
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.Delete}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.borrow_typeaskreturn1} toggle={this.cmdreturn_Click} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        此筆為新品維修，無需歸還，維修IC入庫時會自動歸還!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closemodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.borrow_typeaskreturn2} toggle={this.cmdreturn_Click} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        此筆已歸還完畢，無需歸還!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closemodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.bollowuncheckeddontneedreturn} toggle={this.Command49_Click} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        此筆借出還未確認，禁止歸還!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closemodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.borrow_typeasknowenterreturnsystem} toggle={this.cmdreturn_Click || this.Command49_Click} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        現在進入歸還流程，按'是'後請依序輸入 'Pass' 'Fail' '待測' 數量!!! 
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.borrow_typeasknowenterreturnsystemyes}>確定</button>
       <button onClick ={this.closemodal}>取消</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.borrow_typeasknowenterreturnsystem} toggle={this.cmdreturn_Click || this.Command49_Click} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        現在進入歸還流程，按'是'後請依序輸入 'Pass' 'Fail' '待測' 數量!!! 
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.borrow_typeasknowenterreturnsystemyes}>確定</button>
       <button onClick ={this.closemodal}>取消</button>
      </div>
      </ModalFooter>
     </Modal>

     <Modal isOpen={this.state.wh_chkcheckeditblock} toggle={this.wh_chkcheckeditblock}>
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        倉庫已確認，禁止修改！！
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closemodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.wh_chkcheckcancelblock} toggle={this.wh_chk_AfterUpdate}>
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        倉庫已確認，禁止取消！！
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closemodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.borrow_typeasknowenterreturnsysteminput} toggle={this.borrow_typeasknowenterreturnsystemyes}>
        <ModalHeader></ModalHeader>
        <ModalBody>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">請輸入歸還Pass數量 : </Typography>
          </ThemeProvider>
             <Box>
             <TextField
           name="passQty"
           value={this.state.passQty}
           style={{width:'30%'}}
           onChange={this.handleChange}
           />
             </Box>
           </Box>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">請輸入歸還 Fail 數量： </Typography>
          </ThemeProvider>
             <Box>
             <TextField
           name="failQty"
           value={this.state.failQty}
           style={{width:'30%'}}
           onChange={this.handleChange}
           />
             </Box>
           </Box>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">請輸入歸還 待測 數量：</Typography>
          </ThemeProvider>
             <Box>
             <TextField
           name="retestqty"
           value={this.state.retestqty}
           style={{width:'30%'}}
           onChange={this.handleChange}
           />
             </Box>
           </Box>
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closemodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.dataviewborrow_typeasknowenterreturnsysteminput} toggle={this.Command49_Click}>
        <ModalHeader></ModalHeader>
        <ModalBody>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">請輸入歸還Pass數量 : </Typography>
          </ThemeProvider>
             <Box>
             <TextField
           name="passQty"
           value={this.state.Dataview.passQty}
           style={{width:'30%'}}
           onChange={this.handleChange}
           />
             </Box>
           </Box>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">請輸入歸還 Fail 數量： </Typography>
          </ThemeProvider>
             <Box>
             <TextField
           name="failQty"
           value={this.state.Dataview.failQty}
           style={{width:'30%'}}
           onChange={this.handleChange}
           />
             </Box>
           </Box>
           <Box pl={1}>
           <ThemeProvider theme={theme}>
          <Typography variant="h6">請輸入歸還 待測 數量：</Typography>
          </ThemeProvider>
             <Box>
             <TextField
           name="retestqty"
           value={this.state.Dataview.retestqty}
           style={{width:'30%'}}
           onChange={this.handleChange}
           />
             </Box>
           </Box>
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closemodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.enternotenough} toggle={this.work_no_NotInList} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        輸入不完整，請重新輸入!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closemodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.enteramountbigthanunreturnamount} toggle={this.work_no_NotInList} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        輸入數量大於未歸還數量，請重新輸入
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closemodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.onlypickpassamountreselect} toggle={this.borrow_type_AfterUpdate1} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        新品維修只能領Pass數量，請重新選擇!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closemodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.onlypickpassamountreselect} toggle={this.borrow_type_AfterUpdate1} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        新品維修只能領Pass數量，請重新選擇!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closemodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.newproductrepairdontneedreturn} toggle={this.Command49_Click} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        此筆為新品維修，無需歸還，維修IC入庫時會自動歸還!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closemodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.returneddontneedreturn} toggle={this.Command49_Click} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        此筆為新品維修，無需歸還，維修IC入庫時會自動歸還!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closemodal}>確定</button>
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
         <Box pl={1}>
         <Autocomplete
            inputValue={this.state.borrow_no}
            disabled={this.state.showadd}
            options={this.state.data}
            getOptionLabel={(option) => option.borrow_no}
            style={{ width: 145 }}
            disableClearable
            onChange={this.handleID}
            renderInput={(params)=>(
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
         <Box pl={30}>
            借出單號:
         </Box>
         <Box pl={1}>
         <TextField
            name="borrow_no"
            disabled={this.state.showEdit}
            value={this.state.borrow_no}
            onChange={this.handleChange}
            style={{width : '75%'}}
         />
         </Box>
         <Box pl={15}>
           開單人:
         </Box>
         <Box>
         <TextField
            name="borrow_marker"
            value={this.state.borrow_marker}
            onChange={this.handleChange}
            style={{width : '75%'}}
         />
         </Box>
         <Box pl={10}>
           備註:
         </Box>
         <Box pl={1}>
         <textarea
          name ="remark"
          className = "form-control"
          value ={this.state.remark}
          onChange={this.handleChange}
         />
         </Box>
         </Box>
         <Box
          display ="flex"
          alignItems="flex-start"
          p={1}
          mt={-7}
          bgcolor="background.paper"
          css={{height:100}}
         >
          <Box pl={30}>
             借出時間:
           </Box>
           <Box pl={1}>
           <TextField
        name="borrow_date"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangeborrow_date}
        floatingLabelFixed
        style={{ width: '100%' }}
        value={this.state.borrow_date.date}
        InputLabelProps={{
           shrink: true,
         }}
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
             借出用途:
         </Box>
         <Box pl={1} mt={-2}>
         <Autocomplete
                  inputValue={this.state.borrow_type}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            borrow_type:newValue.borrow_type
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          borrow_type:e.target.value
                   })
                    }
                  }}
                  options={this.state.listapplication}
                   
                  getOptionLabel={(option) => option.borrow_type}
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
             工單號碼:
         </Box>
         <Box pl={1} mt={-2}>
         <Autocomplete
                  inputValue={this.state.work_no}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            work_no:newValue.work_no
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          work_no:e.target.value
                   })
                    }
                  }}
                  options={this.state.listwork_no}
                   
                  getOptionLabel={(option) => option.work_no}
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
             借出人:
         </Box>
         <Box pl={1}>
         <TextField
            name="borrow_people"
            value={this.state.borrow_people}
            onChange={this.handleChange}
            style={{width : '75%'}}
         />
         </Box>
         </Box>
        
         <Box
         display="flex"
         alignItems="flex-start"
         pl={85}
         mt={-7}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
    <Box pl={-2}>
    <button 
    disabled={
     !(this.state.showEdit && !this.state.showadd)
  &&!(!this.state.showEdit && this.state.showadd)
            } 
    onClick={this.handlesave}>
    儲存
    </button>
    </Box>
    <Box pl={2}>
   <button disabled={this.state.showEdit == true || this.state.showadd == true} onClick={this.ADD}>
       {this.state.buttonadd}
   </button>
    </Box>
    <Box pl={2}>
    <button disabled={this.state.showadd == true ||this.state.showEdit == true} onClick={this.handleshowEdit}>
       {this.state.buttonText}
    </button>
    </Box>
    <Box pl={2}>
     <button onClick={this.handledelete}>刪除</button>
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
                 data={this.state.IDdata}
                 options ={{search:false,actionsColumnIndex:-1}}
                 title ="借出明細"
                 editable={{
                     onRowAdd:(newData)=>
                     new Promise((resolve,reject)=>{
                         setTimeout(()=>{
                             this.setState(
                                 {
                                    IDdata :[...this.state.IDdata,newData],
                                    Dataview:{...newData}
                                 })
                                 resolve();
                         },10)
                     }),
                     onRowUpdate:(newData,oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                console.log("new: ",newData);

                                const dataUpdate=[...this.state.IDdata];
                                const index = oldData.tableData.id;
                                dataUpdate[index]=newData;
                                this.setState({
                                    Dataview:{...newData},
                                    IDdata:[...dataUpdate]
                                });
                                resolve();
                            },10);
                        }),
                        onRowDelete:(oldData)=>
                        new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                const dataDelete =[...this.state.IDdata];
                                const index=oldData.tableData.id;
                                dataDelete.splice(index,1);
                                this.setState({
                                    IDdata:[...dataDelete]
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
                 data ={this.state.IDdata}
                 options ={{search: false,actionsColumnIndex:-1}}
                 title ="借出明細"
                 />
            </Fragment>}

            {this.state.showEdit == true || this.state.showadd == true ? 
        <Fragment>
            <Table
             columns={tableColumns2}
             data={this.state.IDdata2}
             options ={{search:false,actionsColumnIndex:-1}}
             title ="歸還明細"
             editable={{
                 onRowAdd:(newData)=>
                 new Promise((resolve,reject)=>{
                     setTimeout(()=>{
                         this.setState(
                             {
                              IDdata2 :[...this.state.IDdata2,newData],
                              Dataview:{...newData}
                             })
                             resolve();
                     },10)
                 }),
                 onRowUpdate:(newData,oldData)=>
                    new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                            console.log("new: ",newData);

                            const dataUpdate=[...this.state.IDdata2];
                            const index = oldData.tableData.id;
                            dataUpdate[index]=newData;
                            this.setState({
                                Dataview:{...newData},
                                IDdata2:[...dataUpdate]
                            });
                            resolve();
                        },10);
                    }),
                    onRowDelete:(oldData)=>
                    new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                            const dataDelete =[...this.state.IDdata2];
                            const index=oldData.tableData.id;
                            dataDelete.splice(index,1);
                            this.setState({
                              IDdata2:[...dataDelete]
                            });
                            resolve();

                        },10);
                    })
             }}
            />
        </Fragment>: 
        <Fragment>
        <Table
             columns={tableColumns2}
             data ={this.state.IDdata2}
             options ={{search: false,actionsColumnIndex:-1}}
             title ="歸還明細"
             />
        </Fragment>}  
         </div>
     )
   }

}
export default DataListbollowout