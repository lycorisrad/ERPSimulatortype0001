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
import { AutoComplete } from 'material-ui';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import MapsDirections from 'material-ui/svg-icons/maps/directions';
//銷貨-->出貨//
class DataListShipment extends Component{
     constructor(props){
         super(props);
         this.state={
           data:[],
           IDdata:[],
           listvendor:[],
           listlocal:[],
           listship:[],
           modal:null,

           confirmdelete:false,
           showadd:false,
           showEdit:false,
           buttonadd:"新增",
           buttonText:"修改",
           buttonsave:"儲存",
           
           wh_chk_checkedwarning: null,
           askforconfirmout_chk: null, 
           askforconfirmout_chkyes: null,
           storagedonthaveItemData: null,
           item_more_than_storage_qty : null,
           current_form_wh_chk_checked_del: null,
           ask_for_wh_chk_del:null,
           ask_for_wh_chk_del_yes:null,
           ask_for_delete_sale_no:null,
           ask_for_delete_sale_no_yes:null,

            id_btn_enabled: null,
            add_btn_enabled: null,
            save_btn_enabled: null,
            del_btn_enabled: null,
            edit_btn_enabled: null,

           id:"",
           sale_no:"",
           invoice_no:"",
           outgoing_date:{
            date:""
            },
           area:"",
           customer_no:"",
           US: null,
           NT: null,
           ship: "",
           remark:"",
           out_chk:null,
           Check41:"",
           wh_chk_time:{
            date:""
           },
           Dataview:{
               warehouse_no:"",
               pur_no:"",
               work_no:"",
               ic_level:"",
               order_no:"",
               po_no:"",
               invoice_no:"",
               product_no:"",
               pcb_no:"",
               outgoing_qty:"",
               outgoing_type:"",
               unit_price:"",
               exchange_rate:"",
               order_item:"",
           }
        }
     }
     sale_no_AfterUpdate =()=>{
         const temp_sale_no = this.state.sale_no

         if(this.state.showadd === true){
             /*
             Set temp = CurrentDb.OpenRecordset("SELECT dbo_outgoing.outgoing_no FROM dbo_outgoing WHERE dbo_outgoing.sale_no = '" & sale_no.value & "'")
    If temp.RecordCount > 0 Then
        MsgBox ("此銷貨單已存在，請選擇此銷貨單！！")
        Form_outgoing_other.del_btn_Click
    
        Dim rs As Object

        Set rs = Me.Recordset.Clone
        rs.FindFirst "[sale_no] = '" & temp_sale_no & "'"
        Me.Bookmark = rs.Bookmark
    End If
    temp.Close
             */
         }
     }
     askforconfirmout_chkyes=()=>{
        this.setState({
            askforconfirmout_chkyes: !this.state.askforconfirmout_chkyes
        })  
     }
     ask_for_wh_chk_delyes=()=>{
         this.setState({
            ask_for_wh_chk_delyes : !this.state.ask_for_wh_chk_delyes
         })
     }
     ask_for_delete_sale_no_yes=()=>{
         this.setState({
            ask_for_delete_sale_no_yes:!this.state.ask_for_delete_sale_no_yes
         })
     }
     Command26=()=>{
         //開啟表單outgoing_report 
         //DoCmd.OpenForm "outgoing_report"
     }
     Command29=()=>{
         /*
         if(this.state.customer_no === "PY03"){
             this.py03_invoice()
         }
         else if(this.state.customer_no === "PY02"){
             this.py02_invoice()
         }
         else{
             const month_name = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
             if(this.state.customer_no === "PY02"){
                 const path = CurrentProject.path & "\report\packinglist_02.xls"
             }
             else{
                 const path = CurrentProject.path & "\report\packinglist.xls"
             }
                Set oApp = New Excel.Application
        oApp.Visible = False
        Set oappwork = oApp.Workbooks.Open(path)
        Set oappwork_packinglist = oappwork.Worksheets("Packing List")
        Set oappwork_invoice_1 = oappwork.Worksheets("invoice-1")
             if(this.state.customer === "PY02"){
                 if(DatePart("W",this.state.outgoing_date) === 2){
                      const invoice_date = this.state.outgoing_date - 3
                 } 
                 else {
                     const invoice_date = this.state.outgoing_date - 1
                 }
             }
             else{
                 const invoice_date = this.state.outgoing_date
             }
              yy = Year(invoice_date)
        dd = IIf(Day(invoice_date) < 10, "0" & Day(invoice_date), Day(invoice_date))
        mm = Month(invoice_date)
    
        oappwork_packinglist.Range("G7") = oappwork_packinglist.Range("G7") & month_name(mm - 1) & ". " & dd & ". " & yy
        Set sold_address = CurrentDb.OpenRecordset("SELECT dbo_outgoing.sale_no, dbo_customer1.ship_address FROM (dbo_outgoing INNER JOIN dbo_outgoing_detail ON dbo_outgoing.outgoing_no = dbo_outgoing_detail.outgoing_no) INNER JOIN dbo_customer1 ON dbo_outgoing.customer_no = dbo_customer1.customer_no WHERE dbo_outgoing.sale_no = '" & sale_no.value & "'")
        oappwork_packinglist.Range("A14") = sold_address.ship_address
        Set ship_address = CurrentDb.OpenRecordset("SELECT dbo_outgoing.sale_no, dbo_customer1.ship_address FROM (dbo_outgoing INNER JOIN dbo_outgoing_detail ON dbo_outgoing.outgoing_no = dbo_outgoing_detail.outgoing_no) INNER JOIN dbo_customer1 ON dbo_outgoing.ship = dbo_customer1.customer_no WHERE dbo_outgoing.sale_no = '" & sale_no.value & "'")
        oappwork_packinglist.Range("A20") = ship_address.ship_address
     
        Set sale_invoice = CurrentDb.OpenRecordset("SELECT dbo_outgoing.sale_no, dbo_outgoing_detail.invoice_no, dbo_outgoing_detail.po_no FROM dbo_outgoing INNER JOIN dbo_outgoing_detail ON dbo_outgoing.outgoing_no = dbo_outgoing_detail.outgoing_no GROUP BY dbo_outgoing.sale_no, dbo_outgoing_detail.invoice_no, dbo_outgoing_detail.po_no HAVING dbo_outgoing.sale_no = '" & sale_no.value & "' ORDER BY dbo_outgoing_detail.invoice_no")
        sale_invoice.MoveLast
        sale_invoice_rc = sale_invoice.RecordCount
        sale_invoice.MoveFirst
    
        For i = 1 To sale_invoice_rc
            Select Case i
                Case 2
                    oappwork_invoice_1.Copy after:=oappwork_invoice_1
                    Set oappwork_invoice_2 = oappwork.Worksheets(2)
                    oappwork_invoice_2.Name = "invoice-2"
                Case 3
                    oappwork_invoice_2.Copy after:=oappwork_invoice_2
                    Set oappwork_invoice_3 = oappwork.Worksheets(3)
                    oappwork_invoice_3.Name = "invoice-3"
                Case 4
                    oappwork_invoice_3.Copy after:=oappwork_invoice_3
                    Set oappwork_invoice_4 = oappwork.Worksheets(4)
                    oappwork_invoice_3.Name = "invoice-4"
                Case 5
                    oappwork_invoice_4.Copy after:=oappwork_invoice_4
                    Set oappwork_invoice_5 = oappwork.Worksheets(5)
                    oappwork_invoice_5.Name = "invoice-5"
            End Select
        Next
    
        For i = 1 To sale_invoice_rc
            Select Case i
                Case 1
                    Set oappwork_invoice = oappwork_invoice_1
                Case 2
                    Set oappwork_invoice = oappwork_invoice_2
                Case 3
                    Set oappwork_invoice = oappwork_invoice_3
                Case 4
                    Set oappwork_invoice = oappwork_invoice_4
                Case 5
                    Set oappwork_invoice = oappwork_invoice_5
            End Select
        
            oappwork_invoice.Range("H2") = oappwork_invoice.Range("H2") & sale_invoice.invoice_no
            oappwork_invoice.Range("H4") = oappwork_invoice.Range("H4") & month_name(mm - 1) & ". " & dd & ". " & yy
            oappwork_invoice.Range("A12") = sold_address.ship_address
            oappwork_invoice.Range("A18") = ship_address.ship_address
            
            If i = 1 Then
                oappwork_packinglist.Range("G" & i + 1) = oappwork_packinglist.Range("G" & i + 1) & "# " & sale_invoice.invoice_no
                start_end(i, 1) = 1
                j = 1
            Else
                oappwork_packinglist.Range("G" & i + 1) = "# " & sale_invoice.invoice_no
                start_end(i, 1) = start_end(i - 1, 2) + 1
                j = start_end(i - 1, 2) + 1
            End If
                
            Set invoice_item = CurrentDb.OpenRecordset("SELECT dbo_outgoing.sale_no, dbo_outgoing_detail.outgoing_qty, dbo_outgoing_detail.product_no, dbo_outgoing_detail.cust_product_no, dbo_outgoing_detail.description, dbo_outgoing_detail.po_no, dbo_outgoing_detail.unit_price, dbo_outgoing_detail.invoice_no, dbo_outgoing_detail.pcb_no, dbo_outgoing_detail.atr_no FROM dbo_outgoing INNER JOIN dbo_outgoing_detail ON dbo_outgoing.outgoing_no = dbo_outgoing_detail.outgoing_no WHERE dbo_outgoing.sale_no  = '" & sale_no.value & "' And dbo_outgoing_detail.invoice_no = '" & sale_invoice.invoice_no & "' ORDER BY dbo_outgoing_detail.product_no")
            k = 1
            If invoice_item.RecordCount <> 0 Then
                Do
                    If invoice_item.EOF Then
                        start_end(i, 2) = j - 1
                        oappwork_invoice.Rows(25 + k & ":" & 25 + k).RowHeight = 5.5
                        k = k + 1
                        oappwork_invoice.Range("A" & 25 + k) = "Total: "
                        oappwork_invoice.Range("B" & 25 + k) = "=sum(B25:B" & 25 + k - 2 & ")"
                        oappwork_invoice.Range("D" & 25 + k) = "Total: "
                        oappwork_invoice.Range("F" & 25 + k).NumberFormatLocal = """US$""#,##0.00_);[紅色](""US$""#,##0.00)"
                        oappwork_invoice.Range("F" & 25 + k) = "=sum(F25:F" & 25 + k - 2 & ")"
                        k = k + 2
                        oappwork_invoice.Range("A" & 25 + k) = "page"
                        oappwork_invoice.Range("B" & 25 + k & ":C" & 25 + k).Merge
                        oappwork_invoice.Range("B" & 25 + k) = "Purchase order"
                        oappwork_invoice.Range("D" & 25 + k) = "Items condition"
                        oappwork_invoice.Range("E" & 25 + k & ":F" & 25 + k).Merge
                        oappwork_invoice.Range("E" & 25 + k) = "Ship Via"
                        k = k + 1
                        oappwork_invoice.Range("A" & 25 + k & ":A" & 26 + k).Merge
                        oappwork_invoice.Range("A" & 25 + k) = "1"
                        oappwork_invoice.Range("B" & 25 + k & ":C" & 26 + k).Merge
                        oappwork_invoice.Range("B" & 25 + k) = sale_invoice.po_no
                        oappwork_invoice.Range("D" & 25 + k & ":D" & 26 + k).Merge
                        If customer_no.value = "PY02" Or customer_no.value = "PY03" Then
                            oappwork_invoice.Range("D" & 25 + k) = "NET 7 days"
                        Else
                            oappwork_invoice.Range("D" & 25 + k) = "T/T"
                        End If
                        oappwork_invoice.Range("E" & 25 + k & ":F" & 26 + k).Merge
                        Select Case customer_no.value
                            Case "PY02"
                                oappwork_invoice.Range("E" & 25 + k) = "15288Y"
                            Case "BI001"
                                oappwork_invoice.Range("E" & 25 + k) = "EV7639"
                            Case "NW001"
                                oappwork_invoice.Range("E" & 25 + k) = "EV7639"
                        End Select
                        
                        k = k + 2
                        oappwork_invoice.Range("A" & 25 + k).HorizontalAlignment = xlLeft
                        oappwork_invoice.Range("A" & 25 + k) = "Country of origin (manufacture) of goods:   Taiwan"
                        k = k + 2
                        oappwork_invoice.Range("A" & 25 + k & ":D" & 25 + k).Merge
                        packing_start_end(i) = k
                        'oappwork_invoice.Range("A" & 25 + k) = "Packing :  " & start_end(i, 1) & " of " & start_end(sale_invoice_rc, 2) & " ~ " & start_end(i, 2) & " of " & start_end(sale_invoice_rc, 2)
                        k = k + 2
                        oappwork_invoice.Range("A" & 25 + k).HorizontalAlignment = xlLeft
                        oappwork_invoice.Range("A" & 25 + k).Font.Bold = True
                        oappwork_invoice.Range("A" & 25 + k) = "Tracking No. : "
                        k = k + 4
                        oappwork_invoice.Range("A" & 25 + k).HorizontalAlignment = xlLeft
                        oappwork_invoice.Range("A" & 25 + k) = "Shipper:"
                        k = k + 3
                        oappwork_invoice.Range("A" & 25 + k & ":C" & 27 + k).Merge
                        oappwork_invoice.Range("A" & 25 + k).Font.Name = "Monotype Corsiva"
                        oappwork_invoice.Range("A" & 25 + k).Font.size = 14
                        oappwork_invoice.Range("A" & 25 + k) = "Ivy Kuo"
                        k = k + 3
                        oappwork_invoice.Range("A" & 25 + k).HorizontalAlignment = xlLeft
                        oappwork_invoice.Range("A" & 25 + k) = "Signature/Date"
                        oappwork_invoice.Range("G" & 25 + k & ":H" & 26 + k).Merge
                        oappwork_invoice.Range("G" & 25 + k).Font.size = 20
                        oappwork_invoice.Range("G" & 25 + k).Font.Bold = True
                        oappwork_invoice.Range("G" & 25 + k) = "P" & i
                        Exit Do
                    End If
                    module_ic_num = module_ic(invoice_item.product_no)
                    temp_weight = compute_weight(invoice_item.product_no, module_ic_num)
                    die_name = module_die(invoice_item.product_no)
                    org_name = die_org(die_name)
                    sale_qty = invoice_item.outgoing_qty
                    oappwork_invoice.Range("A" & 25 + k) = k
                    oappwork_invoice.Range("B" & 25 + k) = invoice_item.outgoing_qty
                    oappwork_invoice.Range("C" & 25 + k) = invoice_item.cust_product_no
                    oappwork_invoice.Range("D" & 25 + k) = invoice_item.description
                    oappwork_invoice.Range("E" & 25 + k).NumberFormatLocal = """US$""#,##0.00_);[紅色](""US$""#,##0.00)"
                    oappwork_invoice.Range("E" & 25 + k) = "=Round(" & invoice_item.unit_price & ",3)"
                    oappwork_invoice.Range("F" & 25 + k).NumberFormatLocal = """US$""#,##0.00_);[紅色](""US$""#,##0.00)"
                    oappwork_invoice.Range("F" & 25 + k) = "=B" & 25 + k & "*E" & 25 + k
                    'oappwork_invoice.Range("F" & 25 + k) = Round(invoice_item.outgoing_qty * invoice_item.unit_price, 2)
                    oappwork_invoice.Range("G" & 25 + k) = org_name
                    oappwork_invoice.Range("H" & 25 + k) = die_name
                    If Left(invoice_item.product_no, 1) = "D" Then
                        oappwork_invoice.Range("I" & 25 + k) = "Assembled in Taiwan "
                    End If
                
                    If Left(invoice_item.product_no, 1) = "C" Then
                        package_type = Mid(invoice_item.product_no, 7, 1)
                        If package_type = "T" Then
                            package_num = 6480
                        ElseIf package_type = "B" Then
                            If module_ic_num = 8 Then
                                package_num = 13200
                            ElseIf module_ic_num = 16 Then
                                package_num = 12600
                            End If
                        End If
                            
                        While (sale_qty >= package_num)
                            oappwork_packinglist.Range("A" & 26 + j) = j
                            oappwork_packinglist.Range("B" & 26 + j) = package_num
                            sale_qty = sale_qty - package_num
                            oappwork_packinglist.Range("C" & 26 + j) = invoice_item.cust_product_no
                            oappwork_packinglist.Range("D" & 26 + j) = invoice_item.description
                            oappwork_packinglist.Range("E" & 26 + j).NumberFormatLocal = "0""KG"""
                            oappwork_packinglist.Range("F" & 26 + j).NumberFormatLocal = "0""KG"""
                            oappwork_packinglist.Range("E" & 26 + j) = Fix(package_num / 1000 * temp_weight) + 1
                            oappwork_packinglist.Range("F" & 26 + j) = Fix(package_num / 1000 * temp_weight) + 2
                            oappwork_packinglist.Range("G" & 26 + j) = org_name
                            oappwork_packinglist.Range("H" & 26 + j) = die_name
                            'oappwork_packinglist.Range("I" & 26 + j) = "Assembled in Taiwan"
                            j = j + 1
                        Wend
                    
                        If sale_qty <> 0 Then
                            oappwork_packinglist.Range("A" & 26 + j) = j
                            oappwork_packinglist.Range("B" & 26 + j) = sale_qty
                            oappwork_packinglist.Range("C" & 26 + j) = invoice_item.cust_product_no
                            oappwork_packinglist.Range("D" & 26 + j) = invoice_item.description
                            oappwork_packinglist.Range("E" & 26 + j).NumberFormatLocal = "0""KG"""
                            oappwork_packinglist.Range("F" & 26 + j).NumberFormatLocal = "0""KG"""
                            temp_nw = (sale_qty / 1000 * temp_weight) - Fix(sale_qty / 1000 * temp_weight)
                            If temp_nw >= 0.5 Then
                                oappwork_packinglist.Range("E" & 26 + j) = Fix(sale_qty / 1000 * temp_weight) + 0.5
                                oappwork_packinglist.Range("F" & 26 + j) = Fix(sale_qty / 1000 * temp_weight) + 1.5
                            Else
                                oappwork_packinglist.Range("E" & 26 + j) = Fix(sale_qty / 1000 * temp_weight)
                                oappwork_packinglist.Range("F" & 26 + j) = Fix(sale_qty / 1000 * temp_weight) + 1
                            End If
                                
                            oappwork_packinglist.Range("G" & 26 + j) = org_name
                            oappwork_packinglist.Range("H" & 26 + j) = die_name
                            'oappwork_packinglist.Range("I" & 26 + j) = "Assembled in Taiwan"
                            j = j + 1
                        End If
                                       
                   
                   ElseIf Left(invoice_item.product_no, 1) = "D" Then
                
                        While (sale_qty >= 500)
                            oappwork_packinglist.Range("A" & 26 + j) = j
                            oappwork_packinglist.Range("B" & 26 + j) = 500
                            sale_qty = sale_qty - 500
                            oappwork_packinglist.Range("C" & 26 + j) = invoice_item.cust_product_no
                            oappwork_packinglist.Range("D" & 26 + j) = invoice_item.description
                            oappwork_packinglist.Range("E" & 26 + j).NumberFormatLocal = "0""KG"""
                            oappwork_packinglist.Range("F" & 26 + j).NumberFormatLocal = "0""KG"""
                            If temp_weight <> 0.016 Then
                                oappwork_packinglist.Range("E" & 26 + j) = 500 * temp_weight
                                oappwork_packinglist.Range("F" & 26 + j) = (500 * temp_weight) + 1
                            Else
                                oappwork_packinglist.Range("E" & 26 + j) = 500 * temp_weight + 1
                                oappwork_packinglist.Range("F" & 26 + j) = (500 * temp_weight) + 2
                            End If
                            oappwork_packinglist.Range("G" & 26 + j) = org_name
                            oappwork_packinglist.Range("H" & 26 + j) = die_name
                            oappwork_packinglist.Range("I" & 26 + j) = "Assembled in Taiwan"
                            
                            j = j + 1
                        Wend
                        
                        If sale_qty <> 0 Then
                            oappwork_packinglist.Range("A" & 26 + j) = j
                            oappwork_packinglist.Range("B" & 26 + j) = sale_qty
                            oappwork_packinglist.Range("C" & 26 + j) = invoice_item.cust_product_no
                            oappwork_packinglist.Range("D" & 26 + j) = invoice_item.description
                            oappwork_packinglist.Range("E" & 26 + j).NumberFormatLocal = "0""KG"""
                            oappwork_packinglist.Range("F" & 26 + j).NumberFormatLocal = "0""KG"""
                            If temp_weight = 0.026 And sale_qty <= 300 Then
                                oappwork_packinglist.Range("E" & 26 + j) = Fix(sale_qty * temp_weight) + 2
                                oappwork_packinglist.Range("F" & 26 + j) = Fix(sale_qty * temp_weight) + 3
                            Else
                                oappwork_packinglist.Range("E" & 26 + j) = Fix(sale_qty * temp_weight) + 1
                                oappwork_packinglist.Range("F" & 26 + j) = Fix(sale_qty * temp_weight) + 2
                            End If
                            oappwork_packinglist.Range("G" & 26 + j) = org_name
                            oappwork_packinglist.Range("H" & 26 + j) = die_name
                            oappwork_packinglist.Range("I" & 26 + j) = "Assembled in Taiwan"
                            j = j + 1
                        End If
                        
                    End If
                    
                    invoice_item.MoveNext
                    k = k + 1
                 Loop
                 
                End If
        
            sale_invoice.MoveNext
    
        Next

        oappwork_packinglist.Rows(26 + j & ":" & 26 + j).RowHeight = 5.5
        j = j + 1
        oappwork_packinglist.Range("A" & 26 + j) = "Total:"
        oappwork_packinglist.Range("B" & 26 + j) = "=sum(B" & start_end(1, 1) + 26 & ":B" & start_end(sale_invoice_rc, 2) + 26
        oappwork_packinglist.Range("D" & 26 + j) = "Total:"
        oappwork_packinglist.Range("E" & 26 + j).NumberFormatLocal = "0""KG"""
        oappwork_packinglist.Range("F" & 26 + j).NumberFormatLocal = "0""KG"""
        oappwork_packinglist.Range("E" & 26 + j) = "=sum(E" & start_end(1, 1) + 26 & ":E" & start_end(sale_invoice_rc, 2) + 26
        oappwork_packinglist.Range("F" & 26 + j) = "=sum(F" & start_end(1, 1) + 26 & ":F" & start_end(sale_invoice_rc, 2) + 26
        j = j + 2
        oappwork_packinglist.Rows(26 + j & ":" & 26 + j).RowHeight = 5.5
        j = j + 1
        oappwork_packinglist.Range("A" & 26 + j) = "page"
        oappwork_packinglist.Range("B" & 26 + j & ":C" & 26 + j).Merge
        oappwork_packinglist.Range("B" & 26 + j) = "Purchase order"
        oappwork_packinglist.Range("D" & 26 + j & ":F" & 26 + j).Merge
        oappwork_packinglist.Range("D" & 26 + j) = "Items condition"
        oappwork_packinglist.Range("G" & 26 + j & ":I" & 26 + j).Merge
        oappwork_packinglist.Range("G" & 26 + j) = "Ship Via"
        j = j + 1
        sale_invoice.MoveFirst
        For i = 1 To sale_invoice_rc
            oappwork_packinglist.Range("A" & 26 + j & ":A" & 27 + j).Merge
            oappwork_packinglist.Range("A" & 26 + j) = start_end(i, 1) & " ~ " & start_end(i, 2)
            oappwork_packinglist.Range("B" & 26 + j & ":C" & 27 + j).Merge
            oappwork_packinglist.Range("B" & 26 + j) = sale_invoice.po_no
            oappwork_packinglist.Range("D" & 26 + j & ":F" & 27 + j).Merge
            If customer_no.value = "PY02" Or customer_no.value = "PY03" Then
                oappwork_packinglist.Range("D" & 26 + j) = "NET 7 days"
            Else
                oappwork_packinglist.Range("D" & 26 + j) = "T/T"
            End If
            oappwork_packinglist.Range("G" & 26 + j & ":I" & 27 + j).Merge
            Select Case customer_no.value
                Case "PY02"
                    oappwork_packinglist.Range("G" & 26 + j) = "15288Y"
                Case "BI001"
                    oappwork_packinglist.Range("G" & 26 + j) = "EV7639"
                Case "NW001"
                    oappwork_packinglist.Range("G" & 26 + j) = "EV7639"
            End Select
            
            Select Case i
                Case 1
                    oappwork_invoice_1.Range("A" & 25 + packing_start_end(i)).HorizontalAlignment = xlLeft
                    oappwork_invoice_1.Range("A" & 25 + packing_start_end(i)).Font.Bold = True
                    oappwork_invoice_1.Range("A" & 25 + packing_start_end(i)) = "Packing :  " & start_end(i, 1) & " of " & start_end(sale_invoice_rc, 2) & " ~ " & start_end(i, 2) & " of " & start_end(sale_invoice_rc, 2)
                Case 2
                    oappwork_invoice_2.Range("A" & 25 + packing_start_end(i)).HorizontalAlignment = xlLeft
                    oappwork_invoice_2.Range("A" & 25 + packing_start_end(i)).Font.Bold = True
                    oappwork_invoice_2.Range("A" & 25 + packing_start_end(i)) = "Packing :  " & start_end(i, 1) & " of " & start_end(sale_invoice_rc, 2) & " ~ " & start_end(i, 2) & " of " & start_end(sale_invoice_rc, 2)
                Case 3
                    oappwork_invoice_3.Range("A" & 25 + packing_start_end(i)).HorizontalAlignment = xlLeft
                    oappwork_invoice_3.Range("A" & 25 + packing_start_end(i)).Font.Bold = True
                    oappwork_invoice_3.Range("A" & 25 + packing_start_end(i)) = "Packing :  " & start_end(i, 1) & " of " & start_end(sale_invoice_rc, 2) & " ~ " & start_end(i, 2) & " of " & start_end(sale_invoice_rc, 2)
                Case 4
                    oappwork_invoice_4.Range("A" & 25 + packing_start_end(i)).Font.Bold = True
                    oappwork_invoice_4.Range("A" & 25 + packing_start_end(i)).HorizontalAlignment = xlLeft
                    oappwork_invoice_4.Range("A" & 25 + packing_start_end(i)) = "Packing :  " & start_end(i, 1) & " of " & start_end(sale_invoice_rc, 2) & " ~ " & start_end(i, 2) & " of " & start_end(sale_invoice_rc, 2)
                Case 5
                    oappwork_invoice_5.Range("A" & 25 + packing_start_end(i)).HorizontalAlignment = xlLeft
                    oappwork_invoice_5.Range("A" & 25 + packing_start_end(i)).Font.Bold = True
                    oappwork_invoice_5.Range("A" & 25 + packing_start_end(i)) = "Packing :  " & start_end(i, 1) & " of " & start_end(sale_invoice_rc, 2) & " ~ " & start_end(i, 2) & " of " & start_end(sale_invoice_rc, 2)
            End Select
            j = j + 2
            sale_invoice.MoveNext
        Next
        j = j + 2
        oappwork_packinglist.Range("A" & 26 + j).HorizontalAlignment = xlLeft
        oappwork_packinglist.Range("A" & 26 + j) = "Country of origin (manufacture) of goods:   Taiwan"
        j = j + 2
        oappwork_packinglist.Range("A" & 26 + j).HorizontalAlignment = xlLeft
        oappwork_packinglist.Range("A" & 26 + j) = "I hereby certify all information in this invoice to be true and correct."
        j = j + 2
        oappwork_packinglist.Range("A" & 26 + j).HorizontalAlignment = xlLeft
        oappwork_packinglist.Range("A" & 26 + j & ":D" & 26 + j).Merge
        oappwork_packinglist.Range("A" & 26 + j).Font.Bold = True
        oappwork_packinglist.Range("A" & 26 + j) = "Packing :  " & start_end(1, 1) & " of " & start_end(sale_invoice_rc, 2) & " ~ " & start_end(sale_invoice_rc, 2) & " of " & start_end(sale_invoice_rc, 2)
        j = j + 2
        oappwork_packinglist.Range("A" & 26 + j).HorizontalAlignment = xlLeft
        oappwork_packinglist.Range("A" & 26 + j).Font.Bold = True
        oappwork_packinglist.Range("A" & 26 + j) = "Tracking No. : "
        j = j + 3
        oappwork_packinglist.Range("A" & 26 + j).HorizontalAlignment = xlLeft
        oappwork_packinglist.Range("A" & 26 + j) = "Shipper:"
        j = j + 1
        oappwork_packinglist.Range("A" & 26 + j & ":C" & 28 + j).Merge
        oappwork_packinglist.Range("A" & 26 + j).Font.Name = "Monotype Corsiva"
        oappwork_packinglist.Range("A" & 26 + j).Font.size = 14
        oappwork_packinglist.Range("A" & 26 + j) = "Ivy Kuo"
        j = j + 3
        oappwork_packinglist.Range("A" & 26 + j).HorizontalAlignment = xlLeft
        oappwork_packinglist.Range("A" & 26 + j) = "Signature/Date"
                   
        'oappwork_packinglist.Activate
        oappwork_invoice_1.Activate
        
        oApp.Visible = True
        oappwork.SaveAs CurrentProject.path & "\packinglist\" & customer_no.value & " INVOICE & Packing List & Statement for-" & IIf(mm < 10, "0" & mm, mm) & dd & "shippiong.xls"
    End If
            }
         */

     }
     Command47=()=>{
         /**
          yy = Right(Year(date), 2)
mm = IIf(Month(date) < 10, "0" & Month(date), Month(date))
dd = IIf(Day(date) < 10, "0" & Day(date), Day(date))

If Left(sale_no.value, 1) = "0" Or Left(sale_no.value, 1) = "S" Then
    path = CurrentProject.path & "\report\銷貨單_ark.xls"
ElseIf Left(sale_no.value, 1) = "5" Then
    path = CurrentProject.path & "\report\銷貨單_sd.xls"
Else
    path = CurrentProject.path & "\report\銷貨單.xls"
End If
Set oApp = New Excel.Application
oApp.Visible = False
Set oappwork = oApp.Workbooks.Open(path)
Set oappwork_sale = oappwork.Worksheets("銷貨")

Set temp_outgoing = CurrentDb.OpenRecordset(" SELECT dbo_outgoing.outgoing_no, dbo_outgoing.outgoing_date, dbo_outgoing.sale_no, dbo_outgoing.invoice_no, dbo_outgoing.customer_no, dbo_outgoing.remark, dbo_outgoing.area, dbo_outgoing.ship, dbo_outgoing.us_nt, dbo_outgoing.out_chk FROM dbo_outgoing WHERE dbo_outgoing.outgoing_no = '" & outgoing_no.value & "' ")
Set temp_outgoing_detail = CurrentDb.OpenRecordset("  SELECT dbo_outgoing_detail.outgoing_no, dbo_outgoing_detail.pur_no, dbo_outgoing_detail.order_no, dbo_outgoing_detail.po_no, dbo_outgoing_detail.product_no, dbo_outgoing_detail.product_model, dbo_outgoing_detail.ic_die, dbo_outgoing_detail.pcb_no, dbo_outgoing_detail.outgoing_qty, dbo_outgoing_detail.remark, dbo_outgoing_detail.marking_type, dbo_outgoing_detail.cust_product_no, dbo_outgoing_detail.atr_no, dbo_outgoing_detail.unit_price, dbo_outgoing_detail.description, dbo_outgoing_detail.invoice_no, dbo_outgoing_detail.warehouse_no, dbo_outgoing_detail.work_no, dbo_outgoing_detail.ic_level FROM dbo_outgoing_detail WHERE dbo_outgoing_detail.outgoing_no = '" & temp_outgoing.outgoing_no & "' ")
Set temp_customer = CurrentDb.OpenRecordset(" SELECT dbo_customer1.customer_no, dbo_customer1.customer_name, dbo_customer1.contact_people, dbo_customer1.uniform_no, dbo_customer1.customer_address, dbo_customer1.tel, dbo_customer1.fax, dbo_customer1.payment, dbo_customer1.ship_address FROM dbo_customer1 WHERE dbo_customer1.customer_no = '" & customer_no.value & "'")


oappwork_sale.Cells(4, 7) = date
oappwork_sale.Cells(5, 7) = temp_outgoing.sale_no
oappwork_sale.Cells(6, 7) = temp_outgoing_detail.order_no
oappwork_sale.Cells(7, 7) = temp_outgoing.invoice_no

If (temp_customer.RecordCount <> 0) Then
    oappwork_sale.Cells(4, 3) = temp_customer.customer_no
    oappwork_sale.Cells(5, 3) = temp_customer.customer_name
    oappwork_sale.Cells(6, 3) = temp_customer.contact_people
    oappwork_sale.Cells(7, 3) = temp_customer.uniform_no
    oappwork_sale.Cells(8, 3) = temp_customer.ship_address
    
    oappwork_sale.Cells(4, 11) = temp_customer.tel
    oappwork_sale.Cells(5, 11) = temp_customer.fax
    oappwork_sale.Cells(7, 11) = temp_customer.tel
End If

oappwork_sale.Cells(6, 11) = ""
oappwork_sale.Cells(8, 11) = "1/1"
oappwork_sale.Cells(192, 2) = remark.value

j = 11
k = 0
If temp_outgoing_detail.RecordCount = 0 Then
   MsgBox ("無資料")
Else
   Do
   If temp_outgoing_detail.EOF Then Exit Do
      k = k + 1
      oappwork_sale.Cells(j, 1) = k
      oappwork_sale.Cells(j, 2) = temp_outgoing_detail.warehouse_no
      oappwork_sale.Cells(j, 3) = temp_outgoing_detail.pur_no
      oappwork_sale.Cells(j, 4) = temp_outgoing_detail.work_no
      oappwork_sale.Cells(j, 5) = temp_outgoing_detail.ic_level
      
      If temp_outgoing_detail.warehouse_no = "002" Then
            oappwork_sale.Cells(j, 6) = temp_outgoing_detail.product_no & "(GO)"
      ElseIf temp_outgoing_detail.warehouse_no = "007" Then
            oappwork_sale.Cells(j, 6) = temp_outgoing_detail.product_no & "(ARK)"
      ElseIf temp_outgoing_detail.warehouse_no = "103" Then
            oappwork_sale.Cells(j, 6) = temp_outgoing_detail.product_no & "(ARKSample)"
      ElseIf temp_outgoing_detail.warehouse_no = "008" Then
            oappwork_sale.Cells(j, 6) = temp_outgoing_detail.product_no & "(NF代工)"
      Else
            oappwork_sale.Cells(j, 6) = temp_outgoing_detail.product_no
      End If
      oappwork_sale.Cells(j, 8) = temp_outgoing_detail.product_model & " " & temp_outgoing_detail.ic_die
      oappwork_sale.Cells(j, 11) = temp_outgoing_detail.pcb_no
      oappwork_sale.Cells(j, 12) = temp_outgoing_detail.outgoing_qty
      
      If Frame32.value = 2 Then
         ''oappwork_sale.Cells(j, 10).NumberFormatLocal = """NT$""#,##0.00_);[藍色](""NT$""#,##0.00)"
         ''oappwork_sale.Cells(j, 10) = temp_outgoing_detail.unit_price
      ElseIf Frame32.value = 1 Then
             ''oappwork_sale.Cells(j, 10).NumberFormatLocal = """US$""#,##0.00_);[紅色](""US$""#,##0.00)"
             ''oappwork_sale.Cells(j, 10) = temp_outgoing_detail.unit_price
      End If
      
      If Frame32.value = 2 Then
         ''oappwork_sale.Cells(j, 12).NumberFormatLocal = """NT$""#,##0.00_);[藍色](""NT$""#,##0.00)"
         ''oappwork_sale.Cells(j, 12) = temp_outgoing_detail.outgoing_qty * temp_outgoing_detail.unit_price
      ElseIf Frame32.value = 1 Then
             ''oappwork_sale.Cells(j, 12).NumberFormatLocal = """US$""#,##0.00_);[紅色](""US$""#,##0.00)"
             ''oappwork_sale.Cells(j, 12) = temp_outgoing_detail.outgoing_qty * temp_outgoing_detail.unit_price
      End If
      
      If Frame32.value = 2 Then
         ''oappwork_sale.Cells(31, 11).NumberFormatLocal = """NT$""#,##0.00_);[藍色](""NT$""#,##0.00)"
      ElseIf Frame32.value = 1 Then
             ''oappwork_sale.Cells(31, 11).NumberFormatLocal = """US$""#,##0.00_);[紅色](""US$""#,##0.00)"
      End If
      
      If Frame32.value = 2 Then
         ''oappwork_sale.Cells(32, 11).NumberFormatLocal = """NT$""#,##0.00_);[藍色](""NT$""#,##0.00)"
      ElseIf Frame32.value = 1 Then
             ''oappwork_sale.Cells(32, 11).NumberFormatLocal = """US$""#,##0.00_);[紅色](""US$""#,##0.00)"
      End If
      
      If Frame32.value = 2 Then
         ''oappwork_sale.Cells(32, 11).NumberFormatLocal = """NT$""#,##0.00_);[藍色](""NT$""#,##0.00)"
      ElseIf Frame32.value = 1 Then
             ''oappwork_sale.Cells(32, 11).NumberFormatLocal = """US$""#,##0.00_);[紅色](""US$""#,##0.00)"
      End If
      
      j = j + 1
      temp_outgoing_detail.MoveNext
   Loop

End If

no = sale_no.value

oApp.Visible = True
oappwork.SaveAs CurrentProject.path & "\銷貨單\ " & no & ".xls"

          */
     }
     cmdtoout=()=>{
        /* 
        yy = Right(Year(date), 2)
        mm = IIf(Month(date) < 10, "0" & Month(date), Month(date))
        dd = IIf(Day(date) < 10, "0" & Day(date), Day(date))
        
        Set temp_outreport = CurrentDb.OpenRecordset(" SELECT dbo_outgoing.sale_no, IIf(Left([product_no],1)='C',Left([product_no],7),IIf(Left([product_no],1)='D',Left([product_no],8),[product_no])) AS pn1, Sum(dbo_outgoing_detail.outgoing_qty) AS out_qty, dbo_outgoing_detail.unit_price, dbo_outgoing_detail.warehouse_no, dbo_outgoing_detail.remark, dbo_outgoing_detail.exchange_rate FROM dbo_outgoing INNER JOIN dbo_outgoing_detail ON dbo_outgoing.outgoing_no = dbo_outgoing_detail.outgoing_no GROUP BY dbo_outgoing.sale_no, IIf(Left([product_no],1)='C',Left([product_no],7),IIf(Left([product_no],1)='D',Left([product_no],8),[product_no])), dbo_outgoing_detail.unit_price, dbo_outgoing_detail.warehouse_no, dbo_outgoing_detail.remark, dbo_outgoing_detail.exchange_rate HAVING dbo_outgoing.sale_no  = '" & sale_no.value & "'")
        
        If temp_outreport.RecordCount > 5 Then
            If Left(sale_no.value, 1) = "0" Then
                MsgBox ("請使用A4格式列印"), vbOKOnly
                path = CurrentProject.path & "\report\對外銷貨單多_ark.xls"
            ElseIf Left(sale_no.value, 1) = "5" Then
                MsgBox ("請使用A4格式列印"), vbOKOnly
                path = CurrentProject.path & "\report\對外銷貨單多_sd.xls"
            Else
                MsgBox ("請使用A4格式列印"), vbOKOnly
                path = CurrentProject.path & "\report\對外銷貨單多.xls"
            End If
        ElseIf temp_outreport.RecordCount <= 5 Then
            If Left(sale_no.value, 1) = "0" Then
                MsgBox ("請使用中一刀格式列印"), vbOKOnly
                path = CurrentProject.path & "\report\對外銷貨單_ark.xls"
            ElseIf Left(sale_no.value, 1) = "5" Then
                MsgBox ("請使用中一刀格式列印"), vbOKOnly
                path = CurrentProject.path & "\report\對外銷貨單_sd.xls"
            Else
                MsgBox ("請使用中一刀格式列印"), vbOKOnly
                path = CurrentProject.path & "\report\對外銷貨單.xls"
            End If
        End If
        
        Set oApp = New Excel.Application
        oApp.Visible = False
        Set oappwork = oApp.Workbooks.Open(path)
        Set oappwork_sale = oappwork.Worksheets("銷貨")
        
        Set temp_outgoing = CurrentDb.OpenRecordset(" SELECT dbo_outgoing.outgoing_no, dbo_outgoing.outgoing_date, dbo_outgoing.sale_no, dbo_outgoing.invoice_no, dbo_outgoing.customer_no, dbo_outgoing.remark, dbo_outgoing.area, dbo_outgoing.ship, dbo_outgoing.us_nt, dbo_outgoing.out_chk FROM dbo_outgoing WHERE dbo_outgoing.outgoing_no = '" & outgoing_no.value & "' ")
        Set temp_outgoing_detail = CurrentDb.OpenRecordset("  SELECT dbo_outgoing_detail.outgoing_no, dbo_outgoing_detail.pur_no, dbo_outgoing_detail.order_no, dbo_outgoing_detail.po_no, dbo_outgoing_detail.product_no, dbo_outgoing_detail.product_model, dbo_outgoing_detail.ic_die, dbo_outgoing_detail.pcb_no, dbo_outgoing_detail.outgoing_qty, dbo_outgoing_detail.remark, dbo_outgoing_detail.marking_type, dbo_outgoing_detail.cust_product_no, dbo_outgoing_detail.atr_no, dbo_outgoing_detail.unit_price, dbo_outgoing_detail.description, dbo_outgoing_detail.invoice_no, dbo_outgoing_detail.warehouse_no, dbo_outgoing_detail.work_no, dbo_outgoing_detail.ic_level FROM dbo_outgoing_detail WHERE dbo_outgoing_detail.outgoing_no = '" & temp_outgoing.outgoing_no & "' ")
        
        Set temp_outreport = CurrentDb.OpenRecordset(" SELECT dbo_outgoing.sale_no, IIf(Left([product_no],1)='C',Left([product_no],7),IIf(Left([product_no],1)='D',Left([product_no],8),[product_no])) AS pn1, Sum(dbo_outgoing_detail.outgoing_qty) AS out_qty, dbo_outgoing_detail.unit_price, dbo_outgoing_detail.warehouse_no, dbo_outgoing_detail.remark, dbo_outgoing_detail.exchange_rate FROM dbo_outgoing INNER JOIN dbo_outgoing_detail ON dbo_outgoing.outgoing_no = dbo_outgoing_detail.outgoing_no GROUP BY dbo_outgoing.sale_no, IIf(Left([product_no],1)='C',Left([product_no],7),IIf(Left([product_no],1)='D',Left([product_no],8),[product_no])), dbo_outgoing_detail.unit_price, dbo_outgoing_detail.warehouse_no, dbo_outgoing_detail.remark, dbo_outgoing_detail.exchange_rate HAVING dbo_outgoing.sale_no  = '" & temp_outgoing.sale_no & "'")
        Set temp_customer = CurrentDb.OpenRecordset(" SELECT dbo_customer1.customer_no, dbo_customer1.customer_name, dbo_customer1.contact_people, dbo_customer1.uniform_no, dbo_customer1.customer_address, dbo_customer1.tel, dbo_customer1.fax, dbo_customer1.payment, dbo_customer1.ship_address FROM dbo_customer1 WHERE dbo_customer1.customer_no = '" & customer_no.value & "'")
        
        If temp_customer.customer_name = "" Then
            MsgBox ("此客戶代號基本資料不完全，請編輯!!!"), vbOKOnly
        End If
        
        oappwork_sale.Cells(4, 3) = temp_customer.customer_no
        oappwork_sale.Cells(5, 3) = temp_customer.customer_name
        oappwork_sale.Cells(6, 3) = temp_customer.contact_people
        oappwork_sale.Cells(7, 3) = temp_customer.uniform_no
        oappwork_sale.Cells(8, 3) = temp_customer.ship_address
        
        oappwork_sale.Cells(4, 7) = date
        oappwork_sale.Cells(5, 7) = temp_outreport.sale_no
        oappwork_sale.Cells(6, 7) = temp_outgoing_detail.order_no
        oappwork_sale.Cells(7, 7) = temp_outgoing.invoice_no
        
        oappwork_sale.Cells(4, 11) = temp_customer.tel
        oappwork_sale.Cells(5, 11) = temp_customer.fax
        oappwork_sale.Cells(6, 11) = ""
        oappwork_sale.Cells(7, 11) = temp_customer.tel
        oappwork_sale.Cells(8, 11) = "1/1"
        
        oappwork_sale.Cells(21, 2) = remark.value
        
        j = 11
        l = 12
        k = 0
        If temp_outreport.RecordCount = 0 Then
           MsgBox ("無資料")
        Else
           Do
           If temp_outreport.EOF Then Exit Do
              k = k + 1
              oappwork_sale.Cells(j, 1) = k
              oappwork_sale.Cells(j, 2) = temp_outreport.pn1
              
              If Left(temp_outreport.pn1, 1) = "C" Then
                    
                Select Case Mid(temp_outreport.pn1, 3, 4)
                    Case "0816"
                        m2 = "8M*16"
                    Case "1608"
                        m2 = "16M*8"
                    Case "1616"
                        m2 = "16M*16"
                    Case "3208"
                        m2 = "32M*8"
                    Case "3216"
                        m2 = "32M*16"
                    Case "6404"
                        m2 = "64M*4"
                    Case "6408"
                        m2 = "64M*8"
                    Case "1284"
                        m2 = "128M*4"
                    Case "2564"
                        m2 = "256M*4"
                    Case "1288"
                        m2 = "128M*8"
                    Case "2568"
                        m2 = "256M*8"
                    Case "5124"
                        m2 = "512M*4"
                    Case "5128"
                        m2 = "512M*8"
                    Case Else
                        m2 = ""
                End Select
                
                Select Case Mid(temp_outreport.pn1, 2, 1)
                    Case "R"
                        m1 = "SERVER"
                    Case "D"
                        m1 = "DDR"
                    Case "E"
                        m1 = "DDRII"
                    Case "H"
                        m1 = "DDRIII"
                    Case "S"
                        m1 = "SD"
                    Case "E"
                        m1 = "ECC"
                    Case Else
                        m1 = ""
                End Select
                
                pn2 = m1 & " " & m2 & " " & "IC"
              
              ElseIf Left(temp_outreport.pn1, 1) = "D" Then
                
                Select Case Mid(temp_outreport.pn1, 2, 1)
                    Case "R"
                        m1 = "SERVER"
                    Case "D"
                        m1 = "DDR"
                    Case "E"
                        m1 = "DDRII"
                    Case "H"
                        m1 = "DDRIII"
                    Case "S"
                        m1 = "SD"
                    Case "E"
                        m1 = "ECC"
                    Case Else
                        m1 = ""
                End Select
                
                Select Case Mid(temp_outreport.pn1, 3, 5)
                    Case "12886"
                        m2 = "128MB"
                        m3 = "8M*16"
                    Case "12868"
                        m2 = "128MB"
                        m3 = "16M*8"
                    Case "12866"
                        m2 = "128MB"
                        m3 = "16M*16"
                    Case "25666"
                        m2 = "256MB"
                        m3 = "16M*16"
                    Case "25668"
                        m2 = "256MB"
                        m3 = "16M*8"
                    Case "25638"
                        m2 = "256MB"
                        m3 = "32M*8"
                    Case "51238"
                        m2 = "512MB"
                        m3 = "32M*8"
                    Case "25636"
                        m2 = "256MB"
                        m3 = "32M*16"
                    Case "51236"
                        m2 = "512MB"
                        m3 = "32M*16"
                    Case "51268"
                        m2 = "512MB"
                        m3 = "64M*8"
                    Case "51264"
                        m2 = "512MB"
                        m3 = "64M*4"
                    Case "1GB68"
                        m2 = "1GB"
                        m3 = "64M*8"
                    Case "1GB14"
                        m2 = "1GB"
                        m3 = "128M*4"
                    Case "2GB24"
                        m2 = "2GB"
                        m3 = "256M*4"
                    Case "1GB66"
                        m2 = "1GB"
                        m3 = "64M*16"
                    Case "1GB18"
                        m2 = "1GB"
                        m3 = "128M*8"
                    Case "2GB18"
                        m2 = "2GB"
                        m3 = "128M*8"
                    Case "2GB28"
                        m2 = "2GB"
                        m3 = "256M*8"
                    Case "4GB28"
                        m2 = "4GB"
                        m3 = "256M*8"
                    Case "2GB54"
                        m2 = "2GB"
                        m3 = "512M*4"
                    Case "4GB54"
                        m2 = "4GB"
                        m3 = "512M*4"
                    Case "4GB58"
                        m2 = "4GB"
                        m3 = "512M*8"
                    Case "8GB58"
                        m2 = "8GB"
                        m3 = "512M*8"
                    Case Else
                        m2 = ""
                        m3 = ""
                End Select
                
                Select Case Mid(temp_outreport.pn1, 8, 1)
                    Case "L"
                        m4 = "LO-Dimm"
                    Case "S"
                        m4 = "SO-Dimm"
                    Case "E"
                        m4 = "ECC-Dimm"
                    Case "R"
                        m4 = "Server-Dimm"
                    Case Else
                        m4 = ""
                End Select
                
                pn2 = m1 & " " & m2 & " " & m3 & " " & m4
              
              
              Else
                pn2 = ""
              End If
              
              oappwork_sale.Cells(j, 4) = pn2
              
              oappwork_sale.Cells(j, 6) = temp_outreport.out_qty
              
              Select Case temp_outreport.warehouse_no
                Case "001"
                    warehouseno = "HOTOP"
                Case "002"
                    warehouseno = "GO"
                Case "006"
                    warehouseno = "UBIN"
                Case "005"
                    warehouseno = "PCB"
                Case "007"
                    warehouseno = "ARK"
                Case "008"
                    warehouseno = "NF代工"
                Case Else
                    warehouseno = ""
              End Select
              
              oappwork_sale.Cells(j, 8) = warehouseno
              
              Select Case Left(temp_outreport.pn1, 1)
              
                Case "C"
                    unit = "顆"
                Case "D"
                    unit = "支"
                Case "P"
                    unit = "片"
              End Select
              
              oappwork_sale.Cells(j, 9) = unit
              
              Set temp_outgoing = CurrentDb.OpenRecordset(" SELECT dbo_outgoing.outgoing_no, dbo_outgoing.outgoing_date, dbo_outgoing.sale_no, dbo_outgoing.invoice_no, dbo_outgoing.customer_no, dbo_outgoing.remark, dbo_outgoing.area, dbo_outgoing.ship, dbo_outgoing.us_nt, dbo_outgoing.out_chk FROM dbo_outgoing WHERE dbo_outgoing.outgoing_no = '" & outgoing_no.value & "' ")
              Set exchange_rate_temp = CurrentDb.OpenRecordset("SELECT dbo_exchange_rate.exchange_date, dbo_exchange_rate.exchange_rate FROM dbo_exchange_rate WHERE dbo_exchange_rate.exchange_date = #" & temp_outgoing.outgoing_date - 1 & "#")
              
              oappwork_sale.Cells(j, 11) = temp_outreport.unit_price * temp_outreport.exchange_rate
              oappwork_sale.Cells(j, 12) = temp_outreport.unit_price * temp_outreport.exchange_rate * temp_outreport.out_qty
              ''oappwork_sale.Cells(j, 12) = Round(temp_outreport.out_qty * temp_outreport.unit_price * exchange_rate_temp.exchange_rate)
              
              
              oappwork_sale.Cells(l, 2) = temp_outreport.remark
              
              j = j + 2
              l = l + 2
              temp_outreport.MoveNext
           Loop
        
        End If
        
        If area.value = "國外" Then
            oappwork_sale.Cells(23, 12) = 0
        End If
        
        no = sale_no.value
        
        oApp.Visible = True
        oappwork.SaveAs CurrentProject.path & "\對外銷貨單\ " & no & ".xls"
        **/          
     }
     Command40=()=>{
        /**
          If CurrentProject.AllForms("outgoing_detail").IsLoaded = True Then
          Forms!outgoing_detail.Visible = True
          Else
          DoCmd.OpenForm "outgoing_detail"
          End If
          Forms!outgoing_other.Visible = False
        */ 
     }
     product_no_AfterUpdate = () =>{
         //product_model.value = transfer_type(product_no.value)
         //ic_die.value = transfer_die(product_no.value)
     }
     pcb_no_AfterUpdate=()=>{
         const m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,lt,rt,msize
         this.setState({
             pcb_no: this.state.pcb_no.toUpperCase()
         })
         if(this.state.customer_no === "PY02"){
              switch (this.state.product_no.slice(3,6)){
                   case '128': 
                     m1 = '128MB',
                     m5 = '16'
                   case '256' : 
                     m1 = '256MB',
                     m5 = '32'
                   case '512' :
                     m1 = '512MB',
                     m5 = '64'
                   case '1GB' :
                     m1 = '1GB'
                     m5 = 'A0'
                   case '2GB' :
                     m1 = '2GB';
                   default : 
                     break;
              }
              switch (this.state.product_no.slice(2,3)){
                case "S" :
                  m2 = "SDR"
                  m4 = "H"
                  m8 = "S"
                case "D" :
                  m2 = "DDR"
                  m8 = "D"
                case "E" :
                  m2 = "DD2"
                  m8 = "T"
              }
              switch(this.state.product_no.slice(8,9)){
                case "L" :
                  m3 = "DIMM"
                case "S" :
                  m3 = "SODIM"
              }
              switch(this.state.product_no.slice(9,12)){
                case "333" :
                  m4 = "N"
                case "400" :
                  m4 = "Q"
                case "533" :
                  m4 = "D"
                case "667" :
                  m4 = "F"
              }
              switch(this.state.product_no.slice(6,8)){
                case "86" :
                m6 = "Y"
                case "66" :
                m6 = "V"
                case "68" :
                 {
                     if (m1 === "128MB" || m1 === "256MB" ){
                         m6 = "Z"
                     }
                     else {
                         m6 = "T"
                     }
                 }
                case "36":
                m6 = "S"
                case "38":
                m6 = "W"
              }
              const m9 = "PO"+ this.state.po_no

              const cust_product_no = m1 + "," + m2 + " " + m3 + " ," + m4 + " " + m5 + m6 + m4 + m8 + "-T " + m9
              
            }
        else if(this.state.customer_no === "PY01"){ //Forms!outgoing!customer_no.value
             switch(this.state.product_no.slice(8,9)){
                case "L" :
                  m1 = "D"
                case "S" :
                  m1 = "N"
             }
             switch(this.state.product_no.slice(2,3)){
                 case "S":
                    switch(this.state.product_no.slice(9,12)){
                        case "100":
                            m2 = "SA"
                        case "133":
                            m2 ="SB" 
                    }
                 case "D":
                     switch(this.state.product_no.slice(9,12)){
                        case "266" :
                        m2 = "DA"
                    case "333" :
                        m2 = "DB"
                    case "400" :
                        m2 = "DC"
                    case "433" :
                        m2 = "DD"
                    case "466" :
                        m2 = "DE"
                    case "500" :
                        m2 = "DF"
                    case "533" :
                        m2 = "DG"
                    case "550" :
                        m2 = "DH"
                    case "566" :
                        m2 = "DI"
                    case "575" :
                        m2 = "DL"
                     }
                  case "E" :
                      switch(this.state.product_no.slice(9,12)){
                          case "533" :
                              m2 = "EG"
                          case "667" :
                              m2 = "EJ"
                          case "800" :
                              m2=  "EK"
                      }
             }
             switch(this.state.product_no.slice(3,6)){
                 case "032" :
                     m3 = "032"
                 case "064" :
                     m3 = "064"
                 case "128" : 
                     m3 = "128"
                 case "256" :
                     m3 = "256"
                 case "512" :
                     m3 = "512"
                 case "1GB" :
                     m3 = "A24"
             }
             switch (this.state.product_no.slice(9,12)){
                 case "133","400":
                     m4 = "30"
                 case "333" :
                     m4 = "25"
                 case "533" :
                     m4 = "40"
                 case "667" :
                     m4 = "50"
             }
             switch (this.state.product_no.slice(6,8)){
                 case "46" :
                     m5 = "46"
                 case "88" :
                     m5 = "88"
                 case "86" :
                     m5 = "86"
                 case "68" : 
                     if (m3="128" || m3 == "256"){
                          m5 = "68"
                     }     
                     else 
                          m5 = "A8"
                 case "66" :
                     m5 = "66"
                 case "38" :
                     m5 = "38"
                 case "36" :
                     m5 = "36"
                 case "64" :
                     m5 = "64"
                }
            m6 = this.state.product_no.slice(-0,-1);
            // DLookup("[label_x]", "dbo_pcb_no", "[pcb_no] = '" & pcb_no.value & "'")
            m8 = "P"
            cust_product_no = m1 + m2 + m3 + m4  + "." + m5 + m6 +m7 + m8
        }
        else if(this.state.customer_no === "PY03"){ //Forms!outgoing!customer_no.value
            m1 = this.state.product_no.slice(3,6)
              if(m1.slice(-0,-0) !== "GB"){
                  m1 = m1 + "MB"
              }
            switch (this.state.product_no.slice(2,2)){
                 case "S":
                    m2 = "SDRAM"
                    m8 = "S"
                 case "D": 
                    m2 = "DDR"
                    m8 = "D"
                 case "E":
                    m2 = "DDR2"
                    m8 = "T"
            }
            m3 = this.state.product_no.slice(9,12) + "MHz"

            switch(this.state.product_no.slice(9,12)){
                case "133", "400" :
                    m4 = "CL3"
                case "333" :
                    m4 = "CL2.5"
                case "533" :
                    m4 = "CL4"
                case "667" :
                    m4 = "CL5"
                default: 
                    m4 = ""
            }
            switch(this.state.product_no.slice(3,6)){
                case "128" :
                    m5 = "16"
                case "256" :
                    m5 = "32"
                case "512" :
                    m5 = "64"
                case "1GB" :
                    m5 = "A0"
            }
            switch(this.state.product_no.slice(6,8)){
                case "86" :
                    m6 = "Y"
                    lt = 8
                    rt = 16
                case "66" :
                    m6 = "V"
                    lt = 16
                    rt = 16
                case "68" :
                    if(this.state.product_no.slice(3,6) == "128" || this.state.product_no.slice(3,6) === "256"){
                        m6 = "Z"
                        lt = 16
                        rt = 8
                    }
                    else {
                        m6 = "T"
                        lt = 64
                        rt = 8
                    }
                case "36" : 
                    m6 = "S"
                    lt = 32
                    rt = 16
                case "38" :
                    m6 = "W"
                    lt = 32
                    rt = 8 
            }
            switch(this.state.product_no.slice(9,12)){
                case "133" :
                    m7 = "H"
                case "333" :
                    m7 = "N"
                case "400" :
                    m7 = "Q"
                case "533" :
                    m7 = "D"
                case "677" :
                    m7 = "F"
             }
             if(this.state.product_no.slice(2,3)= "S" ){
                 if(this.state.product_no.slice(8,9)= "L"){
                     m9 = "EM"
                 }
                 else {
                     m9 = "WM"
                 }
             }
             else if(this.state.product_no.slice(2,3) === "D"){
                 if(this.state.product_no.slice(8,9) === "L"){
                     m9 = "XA"
                 }
                 else {
                     m9 = "YA"
                 }
             }
             else if(this.state.product_no.slice(2,3)==="E"){
                if(this.state.product_no.slice(8,9) === "L"){
                    m9 = "HE"
                }
                else {
                    m9 = "YE"
                }
             }
             m10 = "8G"
             if(this.state.product_no.slice(4,6)=== "GB"){
                 msize = parseInt(this.state.product_no.slice(3,4)*1024)
             }
             else {
                 msize = parseInt(this.state.product_no.slice(3,6))
             }
             const bank = msize / (parseInt(lt) * 8)
             if(bank == 1 ){
                m11 = (64 / parseInt(rt)) + 1
             }
             else if(bank == 2){
                m11 = (128/parseInt(rt)) + 1 
             }
           if(m11.length < 2 ){
               m11 = "0" + m11
           } 
           const year = new Date().getFullYear()
           const yy = (year.slice(-1,-1))
           const ww 
           // ww = DatePart("ww", Forms!outgoing!outgoing_date.value, vbSunday)
           /**if (ww < 10){
              ww = "0" + ww
            * }*/
           // m12 = ww + " " + yy
           // cust_product_no = m1 + " " + m2 + " " + m3 + " " + m4 + " " + m5 + m6 + m7 + m8 + m9 + m10 + m11 + " " + this.state.po_no + " HOT " + m12
        }
     }
     outgoing_qty_GotFocus(){
         const current_qty  
        if (this.state.outgoing_qty === null) {
             current_qty = 0
         }
         else {
             current_qty = this.state.outgoing_qty
         }
     }
     outgoing_qty_AfterUpdate(){
        const diff_qty 
        if(this.state.sale_no.slice(0,1) !== "00"){ //(Left(Forms!outgoing_other!sale_no.value, 2) <> "00")
            diff_qty = this.state.outgoing_qty - current_qty
         }
        /*if (diff_qty !== 0){
          DoCmd.SetWarnings False
    Set temp = CurrentDb.OpenRecordset("SELECT dbo_ordering_detail.order_no, dbo_ordering_detail.product_no, dbo_ordering_detail.pcb_no, dbo_ordering_detail.order_qty, dbo_ordering_detail.outgoing_qty, dbo_ordering_detail.unoutgoing_qty, dbo_ordering_detail.unit_price  FROM dbo_ordering_detail WHERE dbo_ordering_detail.order_no = '" & order_no.value & "' AND dbo_ordering_detail.product_no = '" & product_no.value & "' AND dbo_ordering_detail.unit_price = " & unit_price.value)
    UpdateSQL = "UPDATE dbo_ordering_detail SET "
    UpdateSQL = UpdateSQL & "[outgoing_qty] = " & temp.outgoing_qty + diff_qty & ","
    UpdateSQL = UpdateSQL & "[unoutgoing_qty] = " & Int(temp.unoutgoing_qty) - Int(diff_qty)
    UpdateSQL = UpdateSQL & " WHERE [order_no] = '" & order_no.value & "' AND [product_no] = '" & product_no.value & "' AND [unit_price] = " & unit_price.value
    DoCmd.RunSQL UpdateSQL
    
    DoCmd.SetWarnings False
    temp.Close
        }*/
        /*
          Set temp_pre_outgoing = CurrentDb.OpenRecordset("SELECT dbo_pre_outgoing.order_no, dbo_pre_outgoing.po_no, dbo_pre_outgoing.product_no, dbo_pre_outgoing.pre_date, dbo_pre_outgoing.pre_qty, dbo_pre_outgoing.act_qty, dbo_pre_outgoing.unit_price FROM dbo_pre_outgoing WHERE dbo_pre_outgoing.order_no = '" & order_no.value & "' AND dbo_pre_outgoing.po_no = '" & po_no.value & "' AND dbo_pre_outgoing.product_no ='" & product_no.value & "' AND dbo_pre_outgoing.pre_date = #" & Forms!outgoing_other!outgoing_date.value & "# AND dbo_pre_outgoing.unit_price = " & unit_price.value)
DoCmd.SetWarnings False
UpdateSQL = "UPDATE dbo_pre_outgoing SET "
UpdateSQL = UpdateSQL & " [act_qty] = " & temp_pre_outgoing.act_qty + diff_qty
UpdateSQL = UpdateSQL & " WHERE [order_no] = '" & order_no.value & "' AND [po_no] = '" & po_no.value & "' AND [product_no] = '" & product_no.value & "' AND [pre_date] = # " & Forms!outgoing_other!outgoing_date.value & "# AND [unit_price] = " & unit_price.value
DoCmd.RunSQL UpdateSQL
DoCmd.SetWarnings True
        */
       if(this.state.customer_no === "0ETM01"){ //Forms!outgoing_other!customer_no.value
          /*
          Set temp_warehouse = CurrentDb.OpenRecordset("SELECT dbo_warehouse_etm.warehouse_no, dbo_warehouse_etm.product_no, dbo_warehouse_etm.total_qty From dbo_warehouse_etm WHERE dbo_warehouse_etm.warehouse_no = 'A' AND dbo_warehouse_etm.product_no = '" & etm_part_no(product_no.value) & "'")
    DoCmd.SetWarnings False
    If temp_warehouse.RecordCount = 0 Then
        insertsql = "INSERT INTO dbo_warehouse_etm (warehouse_no,product_no,total_qty) VALUES ("
        insertsql = insertsql & "'A',"
        insertsql = insertsql & "'" & etm_part_no(product_no.value) & "',"
        insertsql = insertsql & diff_qty & ")"
        DoCmd.RunSQL insertsql
    Else
        DoCmd.SetWarnings False
        UpdateSQL = "UPDATE dbo_warehouse_etm SET "
        UpdateSQL = UpdateSQL & "[total_qty] = " & temp_warehouse.total_qty + diff_qty
        UpdateSQL = UpdateSQL & " WHERE [warehouse_no] = 'A' AND [product_no] = '" & etm_part_no(product_no.value) & "'"
        DoCmd.RunSQL UpdateSQL
        DoCmd.SetWarnings True
    End If
    temp_warehouse.Close
          */
       }
     }
     po_no_AfterUpdate = () =>{
         this.setState({
             po_no : this.state.po_no.toUpperCase()
         })
     }
     out_chk_AfterUpdate = () =>{
        const date = new Date().toLocaleDateString()
        const time = new Date().toLocaleTimeString()
        if (this.state.out_chk === false){
             this.setState({
                 wh_chk_checkedwarning :!this.state.wh_chk_checkedwarning,
                 out_chk: true ,
                 check41:"Yes"
              })
        }
        else {
            this.setState({
                askforconfirmout_chk: !this.state.askforconfirmout_chk
            })
            if(this.state.askforconfirmout_chkyes === true){
                if(this.state.out_chk === true || this.state.check41 === "Yes"){
                    //接後端 Set out_temp = CurrentDb.OpenRecordset("SELECT out_stock.outgoing_no, out_stock.sale_no, out_stock.out_chk, out_stock.product_no, out_stock.pcb_no, out_stock.outgoing_qty, out_stock.warehouse_no, out_stock.outgoing_type, out_stock.work_no, out_stock.ic_level, out_stock.pur_no FROM out_stock WHERE out_stock.outgoing_no = '" & outgoing_no.value & "'")
                    this.setState({
                        check41: "Yes",
                    }) 
                    const warhouse = 0
                    /**
                     if(out_temp.RecordCount <> 0){
                         Do
                         If out_temp.EOF Then Exit Do
            If out_temp.outgoing_type = "Pass" Then
                Set temp_warehouse = CurrentDb.OpenRecordset(" SELECT dbo_warehouse.warehouse_no, dbo_warehouse.product_no, dbo_warehouse.product_model, dbo_warehouse.ic_die, dbo_warehouse.pcb_no, dbo_warehouse.pny_qty, dbo_warehouse.bravo_qty, dbo_warehouse.atop_qty, dbo_warehouse.stop_qty, dbo_warehouse.tmtc_qty, dbo_warehouse.other_qty, dbo_warehouse.blank_qty, dbo_warehouse.total_qty, dbo_warehouse.fail_qty, dbo_warehouse.remark, dbo_warehouse.py01_qty, dbo_warehouse.py02_qty, dbo_warehouse.py03_qty, dbo_warehouse.vendor, dbo_warehouse.time1, dbo_warehouse.p_qty, dbo_warehouse.q_qty, dbo_warehouse.mem_qty, dbo_warehouse.cm_qty, dbo_warehouse.edit_date, dbo_warehouse.warehouse_date FROM dbo_warehouse WHERE dbo_warehouse.warehouse_no = '" & out_temp.warehouse_no & "' AND dbo_warehouse.product_no = '" & out_temp.product_no & "' AND dbo_warehouse.pcb_no = '" & out_temp.pcb_no & "' AND dbo_warehouse.pur_no = '" & out_temp.pur_no & "' ")
            
                If temp_warehouse.RecordCount <> 0 Then
                    If Nz(temp_warehouse.blank_qty, 0) < Nz(out_temp.outgoing_qty, 0) Then
                        
                        MsgBox ("料號: " & out_temp.product_no & "庫存數量為: " & temp_warehouse.blank_qty & "小於銷貨數量不能銷貨"), vbOKOnly
                       const warehouse = warehouse + 1
                    End If
                Else
                    MsgBox ("庫存沒有此Item資料!!!"), vbOKOnly
                    warehouse = 1
                End If
                
            ElseIf out_temp.outgoing_type = "Fail" Then
                    Set temp_warehouse = CurrentDb.OpenRecordset(" SELECT dbo_warehouse.warehouse_no, dbo_warehouse.product_no, dbo_warehouse.product_model, dbo_warehouse.ic_die, dbo_warehouse.pcb_no, dbo_warehouse.pny_qty, dbo_warehouse.bravo_qty, dbo_warehouse.atop_qty, dbo_warehouse.stop_qty, dbo_warehouse.tmtc_qty, dbo_warehouse.other_qty, dbo_warehouse.blank_qty, dbo_warehouse.total_qty, dbo_warehouse.fail_qty, dbo_warehouse.remark, dbo_warehouse.py01_qty, dbo_warehouse.py02_qty, dbo_warehouse.py03_qty, dbo_warehouse.vendor, dbo_warehouse.time1, dbo_warehouse.p_qty, dbo_warehouse.q_qty, dbo_warehouse.mem_qty, dbo_warehouse.cm_qty, dbo_warehouse.edit_date, dbo_warehouse.warehouse_date FROM dbo_warehouse WHERE dbo_warehouse.warehouse_no = '" & out_temp.warehouse_no & "' AND dbo_warehouse.product_no = '" & out_temp.product_no & "' AND dbo_warehouse.pcb_no = '" & out_temp.pcb_no & "'")
                        
                    If temp_warehouse.RecordCount <> 0 Then
                        If Nz(temp_warehouse.fail_qty, 0) < Nz(out_temp.outgoing_qty, 0) Then
                            MsgBox ("料號: " & out_temp.product_no & "庫存數量為: " & temp_warehouse.fail_qty & "小於銷貨數量不能銷貨"), vbOKOnly
                           const warehouse = warehouse + 1
                        End If
                    Else
                        this.setState({
                            storagedonthaveData : !this.state.storagedonthaveData
                        })
                        warehouse = 1
                    End If
            End If
            out_temp.MoveNext

         if (this.state.warehouse === 0){
             Set out_temp_1 = CurrentDb.OpenRecordset("SELECT out_stock.outgoing_no, out_stock.sale_no, out_stock.out_chk, out_stock.product_no, out_stock.pcb_no, out_stock.outgoing_qty, out_stock.warehouse_no,out_stock.outgoing_type,out_stock.pur_no,out_stock.ic_level FROM out_stock WHERE out_stock.outgoing_no = '" & outgoing_no.value & "'")

         If out_temp_1.RecordCount <> 0 Then
            Do
            If out_temp_1.EOF Then Exit Do
               
               If out_temp_1.out_chk = "No" Then
                  
                  If out_temp_1.outgoing_type = "Pass" Then
                     Call stock_process(warehouse_no:=Nz(out_temp_1.warehouse_no), product_no:=out_temp_1.product_no, pcb_no:=Nz(out_temp_1.pcb_no), stock_qty:=-out_temp_1.outgoing_qty, outstock_type:="空白", pur_no:=out_temp_1.pur_no, ic_level:=out_temp_1.ic_level)
                  ElseIf out_temp_1.outgoing_type = "Fail" Then
                         Call stock_process(warehouse_no:=Nz(out_temp_1.warehouse_no), product_no:=out_temp_1.product_no, pcb_no:=Nz(out_temp_1.pcb_no), stock_qty:=-out_temp_1.outgoing_qty, outstock_type:="Fail", pur_no:=out_temp_1.pur_no, ic_level:=out_temp_1.ic_level)
                  End If
               End If
               out_temp_1.MoveNext
            Loop
         End If
         this.setState({
             wh_chk_time: date + time
         })
         }
         Else
         
         this.setState({
             item_more_than_storage_qty : !this.state.item_more_than_storage_qty
             out_chk : false,
             check41 : "No"
            })  
                     }
                     */
                }
            }
        }
       if(this.state.out_chk === true && this.state.askforconfirmout_chkyes === false){
            this.setState({
              out_chk:false,
              check41: "No"
            })           
       }
        //更新表單
      }
     handlecancel=()=>{
        this.state.data.map((item,index)=>{
            if(this.state.id === item.id){
                this.setState({
                    id:item.id,
                    sale_no:item.id,
                    invoice_no:item.invoice_no,
                    outgoing_date:item.outgoing_date,
                    area:item.area,
                    customer_no:item.customer_no,
                    US: item.US,
                    NT: item.NT,
                    ship: item.ship,
                    remark:item.remark,
                    out_chk:item.out_chk,
                    wh_chk_time:item.wh_chk_time,
                })
            }
         
        })
        this.setState({
            showEdit:false,
            showadd:false
        })
     }
     Save=()=>{
        //更新表單
        //更新 dbo_outgoing_detail 表單 dbo_outgoing_detail.Form.Refresh
        if(this.state.showadd === true){
            //接後端 Set temp = CurrentDb.OpenRecordset("SELECT dbo_outgoing.outgoing_no, dbo_outgoing.outgoing_date, dbo_outgoing_detail.order_no, dbo_outgoing_detail.po_no, dbo_outgoing_detail.unit_price, dbo_outgoing_detail.product_no, dbo_outgoing_detail.outgoing_qty  FROM dbo_outgoing INNER JOIN dbo_outgoing_detail ON dbo_outgoing.outgoing_no = dbo_outgoing_detail.outgoing_no GROUP BY dbo_outgoing.outgoing_no, dbo_outgoing.outgoing_date, dbo_outgoing_detail.order_no, dbo_outgoing_detail.po_no, dbo_outgoing_detail.unit_price, dbo_outgoing_detail.product_no, dbo_outgoing_detail.outgoing_qty HAVING dbo_outgoing.outgoing_no = '" & outgoing_no.value & "'")
            /*
              If temp.RecordCount <> 0 Then
        Do
            If temp.EOF Then Exit Do
            Set temp_pre_outgoing = CurrentDb.OpenRecordset("SELECT dbo_pre_outgoing.order_no, dbo_pre_outgoing.po_no, dbo_pre_outgoing.product_no, dbo_pre_outgoing.pre_date, dbo_pre_outgoing.pre_qty, dbo_pre_outgoing.act_qty, dbo_pre_outgoing.unit_price FROM dbo_pre_outgoing WHERE dbo_pre_outgoing.order_no = '" & temp.order_no & "' AND dbo_pre_outgoing.po_no = '" & temp.po_no & "' AND dbo_pre_outgoing.product_no ='" & temp.product_no & "' AND dbo_pre_outgoing.pre_date = #" & temp.outgoing_date & "# AND dbo_pre_outgoing.unit_price = " & temp.unit_price)
            DoCmd.SetWarnings False
            If temp_pre_outgoing.RecordCount = 0 Then
                insertsql = "INSERT INTO dbo_pre_outgoing (order_no,po_no,product_no,pre_date,pre_qty,act_qty,unit_price) VALUES ( "
                insertsql = insertsql & "'" & temp.order_no & "',"
                insertsql = insertsql & "'" & temp.po_no & "',"
                insertsql = insertsql & "'" & temp.product_no & "',"
                insertsql = insertsql & "'" & temp.outgoing_date & "',"
                insertsql = insertsql & "0,"
                insertsql = insertsql & temp.outgoing_qty & ","
                insertsql = insertsql & temp.unit_price & ")"
                DoCmd.RunSQL insertsql
            Else
                UpdateSQL = "UPDATE dbo_pre_outgoing SET "
                UpdateSQL = UpdateSQL & "[act_qty] = " & temp.outgoing_qty + temp_pre_outgoing.act_qty
                UpdateSQL = UpdateSQL & "  WHERE [order_no] = '" & temp.order_no & "' AND [po_no] = '" & temp.po_no & "' AND [product_no] = '" & temp.product_no & "' AND [pre_date] = # " & temp.outgoing_date & " # AND [unit_price] = " & temp.unit_price
                DoCmd.RunSQL UpdateSQL
            End If
            DoCmd.SetWarnings True
            temp.MoveNext
        Loop
    End If
    temp.Close
          if(this.state.customer_no === "0ETM01"){
              Set temp = CurrentDb.OpenRecordset("SELECT dbo_outgoing.outgoing_no, dbo_outgoing_detail.product_no, dbo_outgoing_detail.outgoing_qty FROM dbo_outgoing INNER JOIN dbo_outgoing_detail ON dbo_outgoing.outgoing_no = dbo_outgoing_detail.outgoing_no GROUP BY dbo_outgoing.outgoing_no, dbo_outgoing_detail.product_no, dbo_outgoing_detail.outgoing_qty HAVING dbo_outgoing.outgoing_no = '" & outgoing_no.value & "'")
              If temp.RecordCount <> 0 Then
            Do
                If temp.EOF Then Exit Do
                Set temp_warehouse = CurrentDb.OpenRecordset("SELECT dbo_warehouse_etm.warehouse_no, dbo_warehouse_etm.product_no, dbo_warehouse_etm.total_qty From dbo_warehouse_etm WHERE dbo_warehouse_etm.warehouse_no = 'A' AND dbo_warehouse_etm.product_no = '" & etm_part_no(temp.product_no) & "'")
                DoCmd.SetWarnings False
                If temp_warehouse.RecordCount = 0 Then
                    insertsql = "INSERT INTO dbo_warehouse_etm (warehouse_no,product_no,total_qty) VALUES ("
                    insertsql = insertsql & "'A',"
                    insertsql = insertsql & "'" & etm_part_no(temp.product_no) & "',"
                    insertsql = insertsql & temp.outgoing_qty & ")"
                    DoCmd.RunSQL insertsql
                Else
                    DoCmd.SetWarnings False
                    UpdateSQL = "UPDATE dbo_warehouse_etm SET "
                    UpdateSQL = UpdateSQL & "[total_qty] = " & temp.outgoing_qty + temp_warehouse.total_qty
                    UpdateSQL = UpdateSQL & " WHERE [warehouse_no] = 'A' AND [product_no] = '" & etm_part_no(temp.product_no) & "'"
                    DoCmd.RunSQL UpdateSQL
                    DoCmd.SetWarnings True
                End If
                temp_warehouse.Close
                temp.MoveNext
            Loop
        End If
        temp.Close
            }
            */
            this.POST()
            this.setState({
                showadd:false,
                buttonadd:"新增"
            })
        }
        else if(this.state.showEdit === true){
            /**
             DoCmd.SetWarnings False
             DeleteSQL = "DELETE FROM dbo_receivable WHERE [outgoing_no] = '" & outgoing_no.value & "'"
             DoCmd.RunSQL DeleteSQL
             DoCmd.SetWarnings True
             receivable_process
             */
            this.PUT()
            this.setState({
                showEdit:false,
                buttonText:"修改",
                add_btn_enabled:true,
                id_btn_enabled: true,
                save_btn_enabled: false,
                del_btn_enabled: true,
                edit_btn_enabled: true,
            })
        }
        }
        
        handleshowEdit=()=>{
            if(this.state.out_chk === true || this.state.check41 === "Yes"){
                 this.setState({
                     modal:!this.state.modal
                 })
            }
            else{
            this.setState({
                showEdit:!this.state.showEdit,
                id_btn_enabled: false,
                add_btn_enabled:false,
                save_btn_enabled: true,
                del_btn_enabled: true,
                edit_btn_enabled: false,
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
     handleInputChange=(e,newInputValue)=>{
        if(this.state.showadd ==true || this.state.showEdit ==true){
        this.setState({
            customer_no:newInputValue
        })
    }
    }
    handleChangearea =(e,newInputValue)=>{
        if(this.state.showadd ==true || this.state.showEdit ==true){
        this.setState({
            area:newInputValue
        })
    }
    }
    handleChangeship =(e,newInputValue)=>{
        if(this.state.showadd ==true || this.state.showEdit ==true){
        this.setState({
            ship : newInputValue
        })
    }
    }
    closeallmodal=()=>{
        this.setState({
            wh_chk_checkedwarning: false,
            askforconfirmout_chk: false, 
            askforconfirmout_chkyes: false,
            storagedonthaveItemData: false,
            modal: false,
        })
    }
    cmdreceivable =()=>{
        /** 開啟入應收視窗
         DoCmd.SetWarnings False
         DeleteSQL = "DELETE FROM dbo_receivable WHERE [outgoing_no] = '" & outgoing_no.value & "'"
         DoCmd.RunSQL DeleteSQL
         DoCmd.SetWarnings True
         receivable_process 
         */
    }
     getOption=()=>{
         axios.get('/posts')
         .then(res=>{
             this.setState({
                 data : res.data
             })
         })
     }
     getlistvendor =()=>{
         axios.get('/listvendor')
         .then(res=>{
             this.setState({
                listvendor:res.data
             })
         })
     }
     getlistlocal =()=>{
         axios.get('/listlocal')
         .then(res=>{
             this.setState({
                listlocal:res.data
             })
         })
     }
     getlistship=()=>{
         axios.get('/listship')
         .then(res=>{
             this.setState({
                listship:res.data
             })
         })
     }
    
     componentDidMount(){
         this.getOption();
         this.getlistlocal();
         this.getlistship();
         this.getlistvendor();
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
     handleChangeID=(e ,values)=>{
        this.setState({
            id:values.id
        })
        this.state.data.map((item,index)=>{
            if(values.id === item.id){
                       this.setState({
                        IDdata : item.data,
                        id :item.id,
                        sale_no : item.id,
                        invoice_no:item.invoice_no,
                        outgoing_date:item.outgoing_date,
                        area:item.area,
                        customer_no:item.customer_no,
                        US: item.US,
                        NT: item.NT,
                        ship: item.ship,
                        remark:item.remark,
                        out_chk:item.out_chk,
                        wh_chk_time: item.wh_chk_time,
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
     Delete =()=>{
        if((this.state.out_chk || 0) === true || (this.state.check41 || 0) === "Yes"){
             this.setState({
                 current_form_wh_chk_checked_del : !this.state.current_form_wh_chk_checked_del
             })
        }
        else{
            this.setState({
                ask_for_wh_chk_del:!this.state.ask_for_wh_chk_del
            })
            if(this.state.ask_for_wh_chk_del_yes === true){
                if(this.state.showadd === true){
                    this.setState({
                        showadd:false
                    })
                    //更新表單
                    /**
                     Set temp = CurrentDb.OpenRecordset("SELECT dbo_outgoing_detail.outgoing_no,dbo_outgoing_detail.order_no, dbo_outgoing_detail.product_no, dbo_outgoing_detail.pcb_no, dbo_outgoing_detail.outgoing_qty, dbo_outgoing_detail.marking_type,dbo_outgoing_detail.unit_price FROM dbo_outgoing_detail WHERE dbo_outgoing_detail.outgoing_no = '" & outgoing_no.value & "'")
         Do
         If temp.EOF Then Exit Do
            Set temp_outgoing = CurrentDb.OpenRecordset("SELECT dbo_ordering_detail.order_no, dbo_ordering_detail.product_no, dbo_ordering_detail.pcb_no, dbo_ordering_detail.order_qty, dbo_ordering_detail.outgoing_qty, dbo_ordering_detail.unoutgoing_qty,dbo_ordering_detail.unit_price,dbo_ordering_detail.order_item  FROM dbo_ordering_detail WHERE dbo_ordering_detail.order_no = '" & temp.order_no & "' AND dbo_ordering_detail.product_no = '" & temp.product_no & "' AND dbo_ordering_detail.unit_price = " & temp.unit_price)
            UpdateSQL = "UPDATE dbo_ordering_detail SET "
            UpdateSQL = UpdateSQL & "[outgoing_qty] = " & temp_outgoing.outgoing_qty - temp.outgoing_qty & ","
            UpdateSQL = UpdateSQL & "[unoutgoing_qty] = " & Int(temp_outgoing.unoutgoing_qty) + Int(temp.outgoing_qty)
            UpdateSQL = UpdateSQL & " WHERE [order_no] = '" & temp.order_no & "' AND [product_no] = '" & temp.product_no & "' AND [unit_price] = " & temp.unit_price
            DoCmd.RunSQL UpdateSQL
            temp.MoveNext
         Loop
         temp.Close
         DoCmd.SetWarnings False
         DeleteSQL = "DELETE FROM dbo_receivable WHERE [outgoing_no] = '" & outgoing_no.value & "'"
         DoCmd.RunSQL DeleteSQL
         DeleteSQL = "DELETE FROM dbo_outgoing_detail WHERE [outgoing_no] = '" & outgoing_no.value & "'"
         DoCmd.RunSQL DeleteSQL
         DeleteSQL = ""
         DeleteSQL = "DELETE FROM dbo_outgoing WHERE [outgoing_no] = '" & outgoing_no.value & "'"
         DoCmd.RunSQL DeleteSQL
         DoCmd.SetWarnings True
         all_locked
                     */
                }
            else if(this.state.showEdit === true){
                this.setState({
                    showEdit: false,
                })
                /*
                If Me.Dirty = True {
                     Me.Undo
                }
                */
                // all_locked
            }
             else{
                 this.setState({
                    ask_for_delete_sale_no:!this.state.ask_for_delete_sale_no
                 })
                 if(this.state.ask_for_delete_sale_no_yes === true){
                   /** 
                    Set temp = CurrentDb.OpenRecordset("SELECT dbo_outgoing_detail.outgoing_no,dbo_outgoing_detail.order_no, dbo_outgoing_detail.product_no, dbo_outgoing_detail.pcb_no, dbo_outgoing_detail.outgoing_qty, dbo_outgoing_detail.marking_type, dbo_outgoing_detail.unit_price FROM dbo_outgoing_detail WHERE dbo_outgoing_detail.outgoing_no = '" & outgoing_no.value & "'")
             Do
             If temp.EOF Then Exit Do
                Set temp_outgoing = CurrentDb.OpenRecordset("SELECT dbo_ordering_detail.order_no, dbo_ordering_detail.product_no, dbo_ordering_detail.pcb_no, dbo_ordering_detail.order_qty, dbo_ordering_detail.outgoing_qty, dbo_ordering_detail.unoutgoing_qty, dbo_ordering_detail.unit_price  FROM dbo_ordering_detail WHERE dbo_ordering_detail.order_no = '" & temp.order_no & "' AND dbo_ordering_detail.product_no = '" & temp.product_no & "' AND dbo_ordering_detail.unit_price = " & temp.unit_price)
                UpdateSQL = "UPDATE dbo_ordering_detail SET "
                UpdateSQL = UpdateSQL & "[outgoing_qty] = " & temp_outgoing.outgoing_qty - temp.outgoing_qty & ","
                UpdateSQL = UpdateSQL & "[unoutgoing_qty] = " & Int(temp_outgoing.unoutgoing_qty) + Int(temp.outgoing_qty)
                UpdateSQL = UpdateSQL & " WHERE [order_no] = '" & temp.order_no & "' AND [product_no] = '" & temp.product_no & "' AND [unit_price] = " & temp.unit_price
                DoCmd.RunSQL UpdateSQL
                temp.MoveNext
             Loop
             temp.Close
    
             Set temp = CurrentDb.OpenRecordset("SELECT dbo_outgoing.outgoing_no, dbo_outgoing.outgoing_date, dbo_outgoing_detail.order_no, dbo_outgoing_detail.po_no, dbo_outgoing_detail.unit_price, dbo_outgoing_detail.product_no, dbo_outgoing_detail.outgoing_qty  FROM dbo_outgoing INNER JOIN dbo_outgoing_detail ON dbo_outgoing.outgoing_no = dbo_outgoing_detail.outgoing_no GROUP BY dbo_outgoing.outgoing_no, dbo_outgoing.outgoing_date, dbo_outgoing_detail.order_no, dbo_outgoing_detail.po_no, dbo_outgoing_detail.unit_price, dbo_outgoing_detail.product_no, dbo_outgoing_detail.outgoing_qty HAVING dbo_outgoing.outgoing_no = '" & outgoing_no.value & "'")
             If temp.RecordCount <> 0 Then
                Do
                If temp.EOF Then Exit Do
                Set temp_pre_outgoing = CurrentDb.OpenRecordset("SELECT dbo_pre_outgoing.order_no, dbo_pre_outgoing.po_no, dbo_pre_outgoing.product_no, dbo_pre_outgoing.pre_date, dbo_pre_outgoing.pre_qty, dbo_pre_outgoing.act_qty, dbo_pre_outgoing.unit_price FROM dbo_pre_outgoing WHERE dbo_pre_outgoing.order_no = '" & temp.order_no & "' AND dbo_pre_outgoing.po_no = '" & temp.po_no & "' AND dbo_pre_outgoing.product_no ='" & temp.product_no & "' AND dbo_pre_outgoing.pre_date = #" & temp.outgoing_date & "# AND dbo_pre_outgoing.unit_price = " & temp.unit_price)
                DoCmd.SetWarnings False
                If temp_pre_outgoing.RecordCount = 0 Then
                   insertsql = "INSERT INTO dbo_pre_outgoing (order_no,po_no,product_no,pre_date,pre_qty,act_qty,unit_price) VALUES ( "
                   insertsql = insertsql & "'" & temp.order_no & "',"
                   insertsql = insertsql & "'" & temp.po_no & "',"
                   insertsql = insertsql & "'" & temp.product_no & "',"
                   insertsql = insertsql & "'" & temp.outgoing_date & "',"
                   insertsql = insertsql & "0,"
                   insertsql = insertsql & temp.outgoing_qty & ","
                   insertsql = insertsql & temp.unit_price & ")"
                   DoCmd.RunSQL insertsql
                Else
                   UpdateSQL = "UPDATE dbo_pre_outgoing SET "
                   UpdateSQL = UpdateSQL & "[act_qty] = " & temp_pre_outgoing.act_qty - temp.outgoing_qty
                   UpdateSQL = UpdateSQL & "  WHERE [order_no] = '" & temp.order_no & "' AND [po_no] = '" & temp.po_no & "' AND [product_no] = '" & temp.product_no & "' AND [pre_date] = # " & temp.outgoing_date & " # AND [unit_price] = " & temp.unit_price
                   DoCmd.RunSQL UpdateSQL
                End If
                DoCmd.SetWarnings True
                temp.MoveNext
                Loop
                if(this.state.customer_no=== "0ETM01"){
                    Set temp = CurrentDb.OpenRecordset("SELECT dbo_outgoing.outgoing_no, dbo_outgoing_detail.product_no, dbo_outgoing_detail.outgoing_qty FROM dbo_outgoing INNER JOIN dbo_outgoing_detail ON dbo_outgoing.outgoing_no = dbo_outgoing_detail.outgoing_no GROUP BY dbo_outgoing.outgoing_no, dbo_outgoing_detail.product_no, dbo_outgoing_detail.outgoing_qty HAVING dbo_outgoing.outgoing_no = '" & outgoing_no.value & "'")
                If temp.RecordCount <> 0 Then
                   Do
                   If temp.EOF Then Exit Do
                   Set temp_warehouse = CurrentDb.OpenRecordset("SELECT dbo_warehouse_etm.warehouse_no, dbo_warehouse_etm.product_no, dbo_warehouse_etm.total_qty From dbo_warehouse_etm WHERE dbo_warehouse_etm.warehouse_no = 'A' AND dbo_warehouse_etm.product_no = '" & etm_part_no(temp.product_no) & "'")
                   DoCmd.SetWarnings False
                   If temp_warehouse.RecordCount = 0 Then
                      insertsql = "INSERT INTO dbo_warehouse_etm (warehouse_no,product_no,total_qty) VALUES ("
                      insertsql = insertsql & "'A',"
                      insertsql = insertsql & "'" & etm_part_no(temp.product_no) & "',"
                      insertsql = insertsql & -temp.outgoing_qty & ")"
                      DoCmd.RunSQL insertsql
                   Else
                      DoCmd.SetWarnings False
                      UpdateSQL = "UPDATE dbo_warehouse_etm SET "
                      UpdateSQL = UpdateSQL & "[total_qty] = " & temp_warehouse.total_qty - temp.outgoing_qty
                      UpdateSQL = UpdateSQL & " WHERE [warehouse_no] = 'A' AND [product_no] = '" & etm_part_no(temp.product_no) & "'"
                      DoCmd.RunSQL UpdateSQL
                      DoCmd.SetWarnings True
                   End If
                   temp_warehouse.Close
                   temp.MoveNext
                   Loop
                }
                   */
                 }
             }
             /**
              * DoCmd.SetWarnings False
             DeleteSQL = "DELETE FROM dbo_receivable WHERE [outgoing_no] = '" & outgoing_no.value & "'"
             DoCmd.RunSQL DeleteSQL
             DeleteSQL = "DELETE FROM dbo_outgoing_detail WHERE [outgoing_no] = '" & outgoing_no.value & "'"
             DoCmd.RunSQL DeleteSQL
             DeleteSQL = ""
             DeleteSQL = "DELETE FROM dbo_outgoing WHERE [outgoing_no] = '" & outgoing_no.value & "'"
             DoCmd.RunSQL DeleteSQL
             DoCmd.SetWarnings True
              */
            }
            //更新表單
            //更新欄位值紀錄
        }
        axios.delete(`posts/${this.state.id}`,{
            id:this.state.id,
            sale_no: this.state.id,
           invoice_no:this.state.invoice_no,
           outgoing_date:this.state.outgoing_date,
           area:this.state.area,
           customer_no:this.state.customer_no,
           US: this.state.US,
           NT: this.state.NT,
           ship: this.state.ship,
           remark:this.state.remark,
           out_chk:this.state.out_chk,
           wh_chk_time:this.state.wh_chk_time,
           data :
           this.state.IDdata,
        })
        this.setState({
            confirmdelete:!this.state.confirmdelete,
            id:"",
            sale_no:"",
            invoice_no:"",
            outgoing_date:{
             date:""
             },
            area:"",
            customer_no:"",
            US: false,
            NT: false,
            ship: "",
            remark:"",
            out_chk:false,
            wh_chk_time:{
             date:""
            },
             IDdata:[],
            id_btn_enabled : false,
            add_btn_enabled : true,
            save_btn_enabled: false,
            del_btn_enabled: true,
            edit_btn_enabled: true,

        })
    }
    PUT=()=>{
       axios.put(`posts/${this.state.id}`,
       {
        id:this.state.id,
        invoice_no:this.state.invoice_no,
        outgoing_date:this.state.outgoing_date,
        area:this.state.area,
        customer_no:this.state.customer_no,
        US: this.state.US,
        NT: this.state.NT,
        ship: this.state.ship,
        remark:this.state.remark,
        out_chk:this.state.out_chk,
        wh_chk_time:this.state.wh_chk_time,
        data :
        this.state.IDdata,
      }
    )
    }
    POST=()=>{//此為直接傳送至jsondata的動作
         axios.post("/posts",
         {
            id:this.state.id,
           invoice_no:this.state.invoice_no,
           outgoing_date:this.state.outgoing_date,
           area:this.state.area,
           customer_no:this.state.customer_no,
           US: this.state.US,
           NT: this.state.NT,
           ship: this.state.ship,
           remark:this.state.remark,
           out_chk:this.state.out_chk,
           wh_chk_time:this.state.wh_chk_time,
           data :
           this.state.IDdata,
        })
     }
     ADD=()=>{
       const date  = new Date().toLocaleDateString()
       const time = new Date().toLocaleTimeString()
        /**
          Set temp = CurrentDb.OpenRecordset("SELECT Max(Right([outgoing_no],5)+1) AS maxno FROM dbo_outgoing GROUP BY Year([outgoing_date]) & Month([outgoing_date]) HAVING Year([outgoing_date]) & Month([outgoing_date])=Year(Date()) & Month(Date())")
    If temp.RecordCount = 0 Then
        outgoing_no.value = "O" & Right(Year(date), 2) & IIf(Month(date) < 10, "0" & Month(date), Month(date)) & "00001"
    Else
        maxno = temp.maxno
        maxno = Switch(Len(maxno) = 1, "0000" & maxno, Len(maxno) = 2, "000" & maxno, Len(maxno) = 3, "00" & maxno, Len(maxno) = 4, "0" & maxno)
        outgoing_no.value = "O" & Right(Year(date), 2) & IIf(Month(date) < 10, "0" & Month(date), Month(date)) & maxno
    End If
         */
         this.setState({
            id:"",
            
            invoice_no:"",
            outgoing_date:{
                date:date
            },
            area:"",
            customer_no:"",
            US: "",
            NT: "",
            ship: "",
            remark:"",
            out_chk:"",
            wh_chk_time:{
                date:""
            },
           IDdata:[],
           showadd:!this.state.showadd,
           id_btn_enabled:false,
           add_btn_enabled:false,
           save_btn_enabled:true,
           del_btn_enabled: true,
           edit_btn_enabled:true,
            
        })
           
     }
     clear =(e)=>{
        e.target.value="";
    }
    handleChangeoutgoing_date=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                outgoing_date:e.target.value
            })
        }
    }
    handleChangewh_chk_time=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                wh_chk_time:e.target.value
            })
        }
    }
      Detected=()=>{
          console.log(this.state.DataView)
      }
     render(){
         const tableColumns=[
             {
                 title:"倉別",
                 field:"warehouse_no"
             }, 
            {
                 title:"採購單號",
                 field:"pur_no",
             },{
                 title:"工單單號",
                 field:"work_no",
             },{
                 title:"等級",
                 field:"ic_level"
             },{
                 title:"訂購單號",
                 field:"order_no"
             },{
                 title:"PO NO",
                 field:"po_no",
             },{
                 title:"Invoice No.",
                 field:"invoice_no",
             },{
                 title:"產品代號",
                 field:"product_no",
             },{
                 title:"PCB NO",
                 field:"pcb_no",
             },{
                 title:"數量",
                 field:"outgoing_qty",
             },{
                 title:"Type",
                 field:"outgoing_type",
             },{
                 title:"單價",
                 field:"unit_price"
             },{
                 title:"匯率",
                 field:"exchange_rate"
             },{
                 title:"Order Item",
                 field:"order_item"
             }
         ]
      return(
        <div className="content">
        <Modal isOpen={this.state.modal} toggle={this.handleshowEdit} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        此筆已倉管確認,無法修改!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.confirmdelete} toggle={this.handledelete} >
        <ModalHeader>錯誤</ModalHeader>
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

     <Modal isOpen={this.state.wh_chk_checkedwarning} toggle={this.out_chk_AfterUpdate} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        倉庫已確認，禁止取消！！
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>

     <Modal isOpen={this.state.storagedonthaveItemData} toggle={this.out_chk_AfterUpdate} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        庫存沒有此Item資料!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>

     <Modal isOpen={this.state.askforconfirmout_chk} toggle={this.out_chk_AfterUpdate} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        確定倉管確認???
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.askforconfirmout_chkyes}>確定</button>
       <button onClick={this.closeallmodal}>取消</button>
      </div>
      </ModalFooter>
     </Modal>
        
     <Modal isOpen={this.state.item_more_than_storage_qty} toggle={this.out_chk_AfterUpdate} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        有Item銷貨數量大於倉庫數量,無法銷貨
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>

     <Modal isOpen={this.state.current_form_wh_chk_checked_del} toggle={this.Delete} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        此筆已倉管確認,無法刪除!!!
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>

     <Modal isOpen={this.state.ask_for_wh_chk_del} toggle={this.Delete} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        確定刪除???
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.ask_for_wh_chk_delyes}確定></button>
       <button onClick={this.closeallmodal}>取消</button>
      </div>
      </ModalFooter>
     </Modal>

     <Modal isOpen={this.state.ask_for_delete_sale_no} toggle={this.Delete} >
        <ModalHeader>錯誤</ModalHeader>
        <ModalBody>
        是否刪除 [銷貨單號]: {this.state.sale_no} 的相關記錄？
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.ask_for_delete_sale_no_yes}刪除></button>
       <button onClick={this.closeallmodal}>取消</button>
      </div>
      </ModalFooter>
     </Modal>
         <Box
   display="flex"
   alignItems="flex-start"
   p={1}
   mt={1}
   bgcolor="background.paper"
   css={{ height: 100 }}
   >
       <Box pl={1} mt={-3}>
       <Autocomplete
            freeSolo
            disabled={this.state.showadd}
            options={this.state.data}
            inputValue={this.state.id}
            getOptionLabel={(option) => option.id}
            style={{ width: 150 }}
            disableClearable
            onChange={this.handleChangeID}
            renderInput={(params)=>(
               <TextField
               {...params}
              margin="normal"
              fullWidth
               />
            )
            }
           />
       </Box>
   </Box>
        <Box
   display="flex"
   alignItems="flex-start"
   p={1}
   mt={-8}
   bgcolor="background.paper"
   css={{ height: 100 }}
   >
   <Box pl={32}>
    銷貨單號 :
   </Box>
   <Box pl={1}>
   <TextField
    name="sale_no"
    disabled={this.state.showEdit}
    value={this.state.sale_no}
    onChange ={this.handleChange}
    style={{width:'75%'}}
    />
   </Box>
   <Box pl={23}>
    B/E and Invoice : 
   </Box>
   <Box pl={1}>
<TextField
name="invoice_no"
value={this.state.invoice_no}
onChange ={this.handleChange}
style={{width:'75%'}}
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
<Box pl={4} display="flex" justifyContent="center">
<Box pl= {1} mt={-1} border={1} >
倉管確認 : 
<Box pl={1.5} mt ={-1}>
<Checkbox
            value = {this.state.out_chk}
            checked = {this.state.out_chk}
            onChange={this.handleChecked}
            name ="out_chk"
        />
</Box>
</Box>
</Box>
<Box pl={17.5}>
出貨日期 :
</Box>
<Box pl={1}>
<TextField
        name="outgoing_date"
        InputLabelProps={{ shrink: true, required: true }}
        type="date"
        onChange={this.handleChangeoutgoing_date}
        floatingLabelFixed
        style={{ width: '95%' }}
        value={this.state.outgoing_date.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
</Box>
<Box pl={34} >
出貨地區 :
</Box>
<Box pl={1} mt={-2}>
<Autocomplete
                  freeSolo
                  inputValue={this.state.area}
                  onInputChange={this.handleChangearea}
                  options={this.state.listlocal}
                  filterOptions={(options, state) => options}
                  getOptionLabel={(option) => option.area}
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
</Box>
<Box
display="flex"
alignItems="flex-start"
p={1}
mt={-7}
bgcolor="background.paper"
css={{ height: 100 }}
>
<Box pl={1} mt={5}>
倉庫確認時間
<Box pr={-1} >
<TextField
        name="wh_chk_time"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        onChange={this.handleChangewh_chk_time}
        floatingLabelFixed
        style={{ width: '100%' }}
        value={this.state.wh_chk_time.date}
        InputLabelProps={{
           shrink: true,
         }}
      />
</Box>
</Box>



<Box >
客戶代號 :
</Box>
<Box pl={1} mt={-2}>
<Autocomplete
                  freeSolo
                  inputValue={this.state.customer_no}
                  onInputChange={this.handleInputChange}
                  options={this.state.listvendor}
                  filterOptions={(options, state) => options}
                  getOptionLabel={(option) => option.customer_no}
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
<Box 
pl={42}  
display="flex" 
justifyContent="center">
    <Box pl= {2} mb={2} border={1} >
      美金 : 
      <Checkbox
            value = {this.state.US}
            checked = {this.state.US}
            name ="US"
            onChange={this.handleChecked}
        />
      台幣 :
     <Checkbox
            value = {this.state.NT}
            checked = {this.state.NT}
            name ="NT"
            onChange={this.handleChecked}
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
  <Box pl={35.5} >
Ship :
</Box>
<Box mt={-2} pl={1}>
<Autocomplete
                  freeSolo
                  inputValue={this.state.ship}
                  onInputChange={this.handleChangeship}
                  options={this.state.listship}
                  filterOptions={(options, state) => options}
                  getOptionLabel={(option) => option.ship}
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
<Box pl={45} >
備註 : 
</Box>
<Box pl={1} mt={1}>
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
    onClick={this.Save}>
    儲存
    </button>
    </Box>
    <button onClick={this.handleconsole}>檢查</button>
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
                 title ="出貨明細"
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
                 title ="出貨明細"
                 />
            </Fragment>}
      </div>
      )     
    }
     
}
export default DataListShipment