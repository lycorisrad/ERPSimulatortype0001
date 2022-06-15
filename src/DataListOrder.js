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
import { isNullableTypeAnnotation, thisTypeAnnotation } from '@babel/types';
//銷貨-->訂購表單//
class DataListOrder extends Component{
  constructor(props){
    super(props);
    this.state={
       data:[],
       IDdata:[],
       listcustomer_no:[],
       listproduct_no:[],
       listPassandFail: [],
       liststorageclss:[],
       modal:null,
      
       confirmdelete:false,
       showadd:false,
       showEdit:false,
       buttonadd:"新增",
       buttonText:"修改",
       buttonsave:"儲存",
       
       id_btn_enabled: false,
       add_btn_enabled: false,
       save_btn_enabled: true,
       del_btn_enabled: true,
       edit_btn_enabled: false,
       
       id:"",
       order_date:{
         date1:""
       },
       po_no: "",
       order_no:"",
       customer_no:"",
       remark:"",
       Dataview:{
          order_item:"",
          pre_date:"",
          product_no:"",
          unit_price: 0,
          order_qty:0,
          order_type:"",
          outgoing_qty:0,
          unoutgoing_qty:0,
          warehouse_no:"",
          exchange_rate:"",
          remark:"",
       }
    }
  }
  handlecancel=()=>{
    this.state.data.map((item,index)=>{
        if(this.state.id === item.id){
            this.setState({
                IDdata:item.data,
                returndate:item.returndate,
                customer_no:item.customer_no,
                remark:item.remark,
            })
        }
    })
    this.setState({
      showEdit:false,
      showadd:false
  })
 }
 Save=()=>{
   //更新表單 Me.refresh
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
        if(this.state.customer_noconfirm === true){
             this.setState({
                 modal:!this.state.modal
             })
        }
        else{
        this.setState({
            showEdit:!this.state.showEdit,
            id_btn_enabled:false,
            add_btn_enabled: false,
            save_btn_enabled:true,
            del_btn_enabled:true,
            edit_btn_enabled:false,
        })
        //all_unlocked
        //將po_no設定為焦點
    }
    }
    handleInputChange=(e,newInputValue)=>{
      if(this.state.showadd ==true || this.state.showEdit ==true){
      this.setState({
       customer_no:newInputValue
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

    handleChangeID =(e,values)=>{
      this.setState({
        id:values.id
      })
      this.state.data.map((item,index)=>{
        if(values.id === item.id){
          this.setState({
              IDdata:item.data,
             order_date:item.order_date,
             po_no: item.po_no,
             order_no:item.id,
             customer_no:item.customer_no,
             remark:item.remark,
          })
        }
        return true;
      })
    }
    order_no_AfterUpdate=()=>{
        const temp_order_no = this.state.order_no
        if(this.state.showadd == true ){
          //接後端 Set temp = CurrentDb.OpenRecordset("SELECT dbo_ordering.order_no From dbo_ordering WHERE dbo_ordering.order_no = '" & order_no.value & "'")
          /*
           If temp.RecordCount > 0 Then
            MsgBox ("此訂購單已存在，請選擇此訂購單！！")
            Form_ordering.del_btn_Click
    
            Dim rs As Object

            Set rs = Me.Recordset.Clone
            rs.FindFirst "[order_no] = '" & temp_order_no & "'"
            Me.Bookmark = rs.Bookmark
          */ 
        }
    }
    po_no_AfterUpdate=()=>{
      this.setState({
        po_no:this.state.po_no.toUpperCase()
      })
    }
    Command23_Click=()=>{ //查詢訂單按鈕
        /**
    If CurrentProject.AllForms("order_qry").IsLoaded = True Then
    Forms!order_qry.Visible = True
    Else
    DoCmd.OpenForm "order_qry"
         */
    }
    cmdexcel_Click=()=>{
      /**
       
Set temp_order = CurrentDb.OpenRecordset(" SELECT dbo_ordering.order_no, dbo_ordering.order_date, dbo_ordering.po_no, dbo_ordering.customer_no, dbo_ordering.remark, dbo_ordering_detail.pre_date, dbo_ordering_detail.product_no, dbo_ordering_detail.unit_price, dbo_ordering_detail.order_qty, dbo_ordering_detail.order_type, dbo_ordering_detail.remark AS remark1, dbo_ordering_detail.warehouse_no, dbo_ordering_detail.order_item FROM dbo_ordering INNER JOIN dbo_ordering_detail ON dbo_ordering.order_no = dbo_ordering_detail.order_no WHERE dbo_ordering.order_no = '" & order_no.value & "'")

Set temp_customer = CurrentDb.OpenRecordset(" SELECT dbo_customer1.customer_no, dbo_customer1.customer_name, dbo_customer1.contact_people, dbo_customer1.uniform_no, dbo_customer1.customer_address, dbo_customer1.tel, dbo_customer1.fax, dbo_customer1.payment, dbo_customer1.ship_address FROM dbo_customer1 WHERE dbo_customer1.customer_no = '" & customer_no.value & "'")

If temp_order.RecordCount <> 0 And temp_customer.RecordCount = 0 Then
    MsgBox ("請選擇客戶代號!!!"), vbOKOnly
ElseIf temp_order.RecordCount <> 0 And temp_customer.RecordCount <> 0 Then

    Dim oApp As Object
    Dim oappwork As Excel.Workbook, oappwork_p As Excel.Worksheet
    Dim path As String
    Dim yy, mm, dd, no As String

    yy = Right(Year(date), 2)
    mm = IIf(Month(date) < 10, "0" & Month(date), Month(date))
    dd = IIf(Day(date) < 10, "0" & Day(date), Day(date))

    path = CurrentProject.path & "\report\訂購單.xls"

    Set oApp = New Excel.Application
    oApp.Visible = False
    Set oappwork = oApp.Workbooks.Open(path)
    Set oappwork_sale = oappwork.Worksheets("訂購")

    Set temp_order = CurrentDb.OpenRecordset(" SELECT dbo_ordering.order_no, dbo_ordering.order_date, dbo_ordering.po_no, dbo_ordering.customer_no, dbo_ordering.remark, dbo_ordering_detail.pre_date, dbo_ordering_detail.product_no, dbo_ordering_detail.unit_price, dbo_ordering_detail.order_qty, dbo_ordering_detail.order_type, dbo_ordering_detail.remark AS remark1, dbo_ordering_detail.warehouse_no, dbo_ordering_detail.order_item FROM dbo_ordering INNER JOIN dbo_ordering_detail ON dbo_ordering.order_no = dbo_ordering_detail.order_no WHERE dbo_ordering.order_no = '" & order_no.value & "'")

    Set temp_customer = CurrentDb.OpenRecordset(" SELECT dbo_customer1.customer_no, dbo_customer1.customer_name, dbo_customer1.contact_people, dbo_customer1.uniform_no, dbo_customer1.customer_address, dbo_customer1.tel, dbo_customer1.fax, dbo_customer1.payment, dbo_customer1.ship_address FROM dbo_customer1 WHERE dbo_customer1.customer_no = '" & customer_no.value & "'")

    If temp_customer.customer_name = "" Then
        MsgBox ("此客戶代號基本資料不完全，請編輯!!!"), vbOKOnly
    End If

    oappwork_sale.Cells(4, 3) = order_no.value
    oappwork_sale.Cells(5, 3) = temp_customer.customer_name
    oappwork_sale.Cells(6, 3) = temp_customer.customer_address
    oappwork_sale.Cells(7, 3) = temp_customer.tel

    oappwork_sale.Cells(7, 7) = order_date

    oappwork_sale.Cells(6, 12) = "1/1"
    oappwork_sale.Cells(7, 12) = temp_customer.uniform_no

    oappwork_sale.Cells(55, 2) = remark.value

    j = 11
    l = 12
    k = 1

    If temp_order.RecordCount = 0 Then
        MsgBox ("無資料")
    Else
        Do
        If temp_order.EOF Then Exit Do

            oappwork_sale.Cells(j, 1) = k
            oappwork_sale.Cells(j, 2) = temp_order.product_no
      
            If Left(temp_order.product_no, 1) = "C" Then
            
                Select Case Mid(temp_order.product_no, 3, 4)
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
        
                Select Case Mid(temp_order.product_no, 2, 1)
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
      
            ElseIf Left(temp_order.product_no, 1) = "D" Then
        
                Select Case Mid(temp_order.product_no, 2, 1)
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
        
                Select Case Mid(temp_order.product_no, 3, 5)
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
                    Case "8GB58"
                        m2 = "8GB"
                        m3 = "512M*8"
                    Case Else
                        m2 = ""
                        m3 = ""
                End Select
        
                Select Case Mid(temp_order.product_no, 8, 1)
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
      
            oappwork_sale.Cells(j, 6) = temp_order.order_qty
      
            Select Case temp_order.warehouse_no
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
                Case Else
                    warehouseno = ""
            End Select
      
            oappwork_sale.Cells(j, 8) = warehouseno
      
            Select Case Left(temp_order.product_no, 1)
      
                Case "C"
                    unit = "顆"
                Case "D"
                    unit = "支"
                Case "P"
                    unit = "片"
            End Select
      
            oappwork_sale.Cells(j, 9) = unit & "(" & temp_order.order_type & ")"
            oappwork_sale.Cells(j, 11) = temp_order.unit_price
            oappwork_sale.Cells(j, 12) = temp_order.pre_date
      
            oappwork_sale.Cells(l, 1) = "備註"
            oappwork_sale.Cells(l, 2) = temp_order.remark1
      
            j = j + 2
            l = l + 2
            k = k + 1
            temp_order.MoveNext
        Loop

    End If

    no = order_no.value

    oApp.Visible = True
    oappwork.SaveAs CurrentProject.path & "\訂購單\ " & no & ".xls"
End If

End Sub
       */
    }
    Command25_Click=()=>{
      /**
       Dim oApp As Object
Dim oappwork As Excel.Workbook, oappwork_p As Excel.Worksheet
Dim path As String
Dim yy, mm, dd, no As String

yy = Right(Year(date), 2)
mm = IIf(Month(date) < 10, "0" & Month(date), Month(date))
dd = IIf(Day(date) < 10, "0" & Day(date), Day(date))

outreport = "SELECT dbo_ordering.order_no, dbo_ordering.order_date, dbo_ordering.po_no, dbo_ordering.customer_no, IIf(Left([product_no],1)='C',Left([product_no],7),IIf(Left([product_no],1)='D',Left([product_no],8),[product_no])) AS pn1, dbo_ordering_detail.product_model, dbo_ordering_detail.ic_die, dbo_ordering_detail.pcb_no, dbo_ordering_detail.unit_price, Sum(dbo_ordering_detail.order_qty) AS order_qty, dbo_ordering_detail.order_type, dbo_ordering_detail.outgoing_qty, dbo_ordering_detail.unoutgoing_qty, dbo_ordering_detail.remark, dbo_ordering_detail.cus_product_no, dbo_ordering_detail.atr_no, dbo_ordering_detail.warehouse_no, dbo_ordering_detail.order_item,dbo_ordering_detail.exchange_rate FROM dbo_ordering INNER JOIN dbo_ordering_detail ON dbo_ordering.order_no = dbo_ordering_detail.order_no"
outreport = outreport & " GROUP BY dbo_ordering.order_no, dbo_ordering.order_date, dbo_ordering.po_no, dbo_ordering.customer_no, IIf(Left([product_no],1)='C',Left([product_no],7),IIf(Left([product_no],1)='D',Left([product_no],8),[product_no])), dbo_ordering_detail.product_model, dbo_ordering_detail.ic_die, dbo_ordering_detail.pcb_no, dbo_ordering_detail.unit_price, dbo_ordering_detail.order_type, dbo_ordering_detail.outgoing_qty, dbo_ordering_detail.unoutgoing_qty, dbo_ordering_detail.remark, dbo_ordering_detail.cus_product_no, dbo_ordering_detail.atr_no, dbo_ordering_detail.warehouse_no, dbo_ordering_detail.order_item,dbo_ordering_detail.exchange_rate"
outreport = outreport & " HAVING dbo_ordering.order_no = '" & order_no.value & "' AND dbo_ordering_detail.unoutgoing_qty <> 0 "

Set temp_outreport = CurrentDb.OpenRecordset(outreport)

If temp_outreport.RecordCount > 5 Then
    MsgBox ("請使用A4格式列印"), vbOKOnly
    path = CurrentProject.path & "\report\對外銷貨單多.xls"
ElseIf temp_outreport.RecordCount <= 5 Then
    MsgBox ("請使用中一刀格式列印"), vbOKOnly
    path = CurrentProject.path & "\report\對外銷貨單.xls"
End If

Set oApp = New Excel.Application
oApp.Visible = False
Set oappwork = oApp.Workbooks.Open(path)
Set oappwork_sale = oappwork.Worksheets("銷貨")

''Set temp_outgoing = CurrentDb.OpenRecordset(" SELECT dbo_outgoing.outgoing_no, dbo_outgoing.outgoing_date, dbo_outgoing.sale_no, dbo_outgoing.invoice_no, dbo_outgoing.customer_no, dbo_outgoing.remark, dbo_outgoing.area, dbo_outgoing.ship, dbo_outgoing.us_nt, dbo_outgoing.out_chk FROM dbo_outgoing WHERE dbo_outgoing.outgoing_no = '" & outgoing_no.Value & "' ")
''Set temp_outgoing_detail = CurrentDb.OpenRecordset("  SELECT dbo_outgoing_detail.outgoing_no, dbo_outgoing_detail.pur_no, dbo_outgoing_detail.order_no, dbo_outgoing_detail.po_no, dbo_outgoing_detail.product_no, dbo_outgoing_detail.product_model, dbo_outgoing_detail.ic_die, dbo_outgoing_detail.pcb_no, dbo_outgoing_detail.outgoing_qty, dbo_outgoing_detail.remark, dbo_outgoing_detail.marking_type, dbo_outgoing_detail.cust_product_no, dbo_outgoing_detail.atr_no, dbo_outgoing_detail.unit_price, dbo_outgoing_detail.description, dbo_outgoing_detail.invoice_no, dbo_outgoing_detail.warehouse_no, dbo_outgoing_detail.work_no, dbo_outgoing_detail.ic_level FROM dbo_outgoing_detail WHERE dbo_outgoing_detail.outgoing_no = '" & temp_outgoing.outgoing_no & "' ")

''Set temp_outreport = CurrentDb.OpenRecordset(" SELECT dbo_outgoing.sale_no, IIf(Left([product_no],1)='C',Left([product_no],7),IIf(Left([product_no],1)='D',Left([product_no],8),[product_no])) AS pn1, Sum(dbo_outgoing_detail.outgoing_qty) AS out_qty, dbo_outgoing_detail.unit_price, dbo_outgoing_detail.warehouse_no, dbo_outgoing_detail.remark, dbo_outgoing_detail.exchange_rate FROM dbo_outgoing INNER JOIN dbo_outgoing_detail ON dbo_outgoing.outgoing_no = dbo_outgoing_detail.outgoing_no GROUP BY dbo_outgoing.sale_no, IIf(Left([product_no],1)='C',Left([product_no],7),IIf(Left([product_no],1)='D',Left([product_no],8),[product_no])), dbo_outgoing_detail.unit_price, dbo_outgoing_detail.warehouse_no, dbo_outgoing_detail.remark, dbo_outgoing_detail.exchange_rate HAVING dbo_outgoing.sale_no  = '" & temp_outgoing.sale_no & "'")
Set temp_customer = CurrentDb.OpenRecordset(" SELECT dbo_customer1.customer_no, dbo_customer1.customer_name, dbo_customer1.contact_people, dbo_customer1.uniform_no, dbo_customer1.customer_address, dbo_customer1.tel, dbo_customer1.fax, dbo_customer1.payment, dbo_customer1.ship_address FROM dbo_customer1 WHERE dbo_customer1.customer_no = '" & customer_no.value & "'")

If temp_customer.customer_name = "" Then
    MsgBox ("此客戶代號基本資料不完全，請編輯!!!"), vbOKOnly
End If

oappwork_sale.Cells(4, 3) = temp_customer.customer_no
oappwork_sale.Cells(5, 3) = temp_customer.customer_name
oappwork_sale.Cells(6, 3) = temp_customer.contact_people
oappwork_sale.Cells(7, 3) = temp_customer.uniform_no
oappwork_sale.Cells(8, 3) = temp_customer.ship_address

oappwork_sale.Cells(4, 7) = order_date.value
''oappwork_sale.Cells(5, 7) = temp_outreport.sale_no
oappwork_sale.Cells(6, 7) = order_no.value
''oappwork_sale.Cells(7, 7) = temp_outgoing.invoice_no

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
      
      oappwork_sale.Cells(j, 6) = temp_outreport.order_qty
      
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
      
      ''Set temp_outgoing = CurrentDb.OpenRecordset(" SELECT dbo_outgoing.outgoing_no, dbo_outgoing.outgoing_date, dbo_outgoing.sale_no, dbo_outgoing.invoice_no, dbo_outgoing.customer_no, dbo_outgoing.remark, dbo_outgoing.area, dbo_outgoing.ship, dbo_outgoing.us_nt, dbo_outgoing.out_chk FROM dbo_outgoing WHERE dbo_outgoing.outgoing_no = '" & outgoing_no.Value & "' ")
      Set exchange_rate_temp = CurrentDb.OpenRecordset("SELECT dbo_exchange_rate.exchange_date, dbo_exchange_rate.exchange_rate FROM dbo_exchange_rate WHERE dbo_exchange_rate.exchange_date = #" & order_date.value & "#")
      
      oappwork_sale.Cells(j, 11) = temp_outreport.unit_price * temp_outreport.exchange_rate
      oappwork_sale.Cells(j, 12) = temp_outreport.unit_price * temp_outreport.order_qty * temp_outreport.exchange_rate
      ''oappwork_sale.Cells(j, 12) = Round(temp_outreport.out_qty * temp_outreport.unit_price * exchange_rate_temp.exchange_rate)
      
      
      oappwork_sale.Cells(l, 2) = temp_outreport.remark
      
      j = j + 2
      l = l + 2
      temp_outreport.MoveNext
   Loop

End If

no = order_no.value

oApp.Visible = True
oappwork.SaveAs CurrentProject.path & "\對外銷貨單\ " & no & ".xls"

End Sub
       */
    }
    product_no_AfterUpdate=()=>{
        //const order_item_temp = Nz(DMax("[order_item]", "dbo_ordering_detail", "[order_no] = '" & order_no.value & "'"), 0)
        this.setState({
            product_no: this.state.product_no.toUpperCase,
            unit_price: 0
        })
        /*
        if(order_item_temp = 0 ){
             this.setState({
                 order_item : Forms!ordering!customer_no.value & "-01"
             })
        }
        else{
            const nu = parseInt(order_item_temp.slice(-0,-1))+1
            this.setState({
                order_item : Forms!ordering!customer_no.value & "-" & IIf(nu < 10, "0" & nu, nu)
            })
        }
        */
        //更新表單
    }
    
    warehouse_no_AfterUpdate=()=>{
        this.setState({
            exchange_rate : 1
        })
    }
    outgoing_qty_AfterUpdate=()=>{
        this.setState({
            unoutgoing_qty : this.state.order_qty - this.state.outgoing_qty
        })
    }
    order_qty_AfterUpdate =()=>{
        if(this.state.outgoing_qty == 0 || this.state.outgoing_qty === null) {
            this.setState({
                outgoing_qty : 0,
                unoutgoing_qty : this.state.order_qty
            })
        }
        else{
            this.setState({
                unoutgoing_qty : this.state.order_qty - this.state.outgoing_qty
            })
        }
    }
    getOption=()=>{
      axios.get("/posts")
      .then(res=>{
        this.setState({
          data:res.data
        })
      })
    }
    getlistPassandFail=()=>{
      axios.get("/listPassandFail")
      .then(res=>{
        this.setState({
          listPassandFail:res.data
        })
      })
    }
    getlistproduct_no=()=>{
      axios.get("/listproduct_no")
      .then(res=>{
        this.setState({
          listproduct_no:res.data
        })
      })
    }
    getlistcustomer_no=()=>{
      axios.get("/listcustomer_no")
      .then(res=>{
        this.setState({
          listcustomer_no:res.data
        })
      })
    }
    getliststorageclss=()=>{
      axios.get("/listwarehouse_no")
      .then(res=>{
        this.setState({
          listwarehouse_no:res.data
        })
      })
    }
    componentDidMount(){
      this.getOption();
      this.getlistcustomer_no();
      this.getlistproduct_no();
      this.getliststorageclss();
      this.getlistPassandFail();
    }
    handledelete=()=>{
      this.setState({
         confirmdelete:!this.state.confirmdelete
      })
   }
    Delete =()=>{
      if(this.state.showadd === true){
         this.setState({
           showadd : false,
           
           //更新表單
           /**接後端
            DoCmd.SetWarnings False
    DeleteSQL = "DELETE FROM dbo_ordering WHERE [seq] = " & seq.value
    DoCmd.RunSQL DeleteSQL
    DoCmd.SetWarnings True
    'DoCmd.GoToRecord , , acPrevious
           */  
         })
         //all_locked
         axios.delete(`posts/${this.state.id}`,{
          id:this.state.id,
          order_date:this.state.order_date,
          po_no: this.state.po_no,
          order_no:this.state.order_no,
          customer_no:this.state.customer_no,
          remark:this.state.remark,
      data :
      this.state.IDdata,
   })
      }
      else if(this.state.showEdit === true){
        this.setState({
           showEdit: false  
        })
        /**if(Me.Dirty === true){
            Me.Undo
        }*/
        // all_locked
       /**
        ElseIf MsgBox("是否刪除 [訂購單號]：" & order_no.value & "，的相關記錄？", vbYesNo, "刪除") = vbYes Then
    DoCmd.SetWarnings False
    DeleteSQLDetail = "DELETE FROM dbo_ordering_detail WHERE [order_no] = '" & order_no.value & "'"
    DoCmd.RunSQL DeleteSQLDetail
    DeleteSQL = "DELETE FROM dbo_ordering WHERE [order_no] = '" & order_no.value & "'"
    DoCmd.RunSQL DeleteSQL
    DoCmd.SetWarnings True
    'DoCmd.GoToRecord , , acPrevious
     all_unlocked
        */
      }
      // 更新表單
      // 從資料庫更新最新的欄位值

      this.setState({
        id:"",
        order_date:"",
        po_no: "",
        order_no:"",
        customer_no:"",
        remark:"",
        IDdata:[],

        id_btn_enabled:true,
        add_btn_enabled:true,
        save_btn_enabled:false,
        del_btn_enabled:true,
        edit_btn_enabled:true,
      })
  }
  PUT=()=>{
     axios.put(`posts/${this.state.id}`,
     {
      id:this.state.id,
             order_date:this.state.order_date,
             po_no: this.state.po_no,
             order_no:this.state.order_no,
             customer_no:this.state.customer_no,
             remark:this.state.remark,
         data :
         this.state.IDdata,
    }
  )
  }
  POST=()=>{//此為直接傳送至jsondata的動作
       axios.post("/posts",
       {
        id:this.state.id,
        order_date:this.state.order_date,
        po_no: this.state.po_no,
        order_no:this.state.order_no,
        customer_no:this.state.customer_no,
        remark:this.state.remark,
         data :
         this.state.IDdata,
      })
   }

   ADD=()=>{
      const date= new Date().toLocaleDateString();
       this.setState({
        id_btn_enabled:false,
        add_btn_enabled:false,
        save_btn_enabled:true,
        del_btn_enabled:true,
        edit_btn_enabled:false,

        id:"",
        order_date:{
          date1:date
        },
        po_no: "",
        order_no:"",
        customer_no:"",
        remark:"",
         IDdata:[],
         showadd:!this.state.showadd
       })
   }
   handleChangedate=(e)=>{
    if(this.state.showadd || this.state.showEdit){
        this.setState({
            order_date:e.target.value
        })
    }
   }
   clear =(e)=>{
    e.target.value="";
}
    render(){
      const axiosproduct_no = this.state.listproduct_no.map((item,index)=>{
        return <select value={this.state.product_no}><option key={index} value={item.product_no}>{item.product_no}</option></select>
    })
    const axiosPassandFail = this.state.listPassandFail.map((item,index)=>{
      return <select value={this.state.order_type}>
      <option key={index} value={item.order_type}>
      {item.order_type}
      </option>
      </select>
    })
    const axiosstorageclss = this.state.liststorageclss.map((item,index)=>{
      return <select value={this.state.storageclss}>
      <option key={index} value={item.storageclss}>
      {item.storageclss}
      </option>
      </select>
    })
   const tableColumns=[
     {
       title:"Item",
       field:"order_item",
     },{
       title:"預交日期",
       field:"pre_date",
     },{
      title:"產品代號",
      field:"product_no",
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
        <datalist id="product_no">
            {axiosproduct_no}
        </datalist>
        </div>
    )
     },{
      title:"單價",
      field:"unit_price",
     },{
      title:"數量",
      field:"order_qty",
     },{
      title:"Pass/Fail",
      field:"order_type",
      editComponent:({value,onChange})=>(
        <div>
        <input 
        list ="order_type"
        value={value}
        placeholder={this.state.order_type}
        onChange={(e)=>onChange(e.target.value)}
        onClick={this.clear}
        onFocus={this.clear}
        />
        <datalist id="order_type">
            {axiosPassandFail}
        </datalist>
        </div>
    )
     },{
      title:"已出",
      field:"outgoing_qty",
     },{
      title:"未出",
      field:"unoutgoing_qty",
     },{
      title:"倉別",
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
        <datalist id="warehouse_no">
            {axiosstorageclss}
        </datalist>
        </div>
    )
     },{
      title:"匯率",
      field:"exchange_rate",
     }
   ]
   return (
     
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
       <Box
         display="flex"
         alignItems="flex-start"
         p={1}
         m={1}
         bgcolor="background.paper"
         css={{ height: 100 }}
         > 
          <Box pl={1}>
           請選擇欲查詢訂購單號 : 
          </Box>
          <Box pl={1} mt={-2}>
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
         mt={-5}
         m={1}
         bgcolor="background.paper"
         css={{ height: 100 }}
         > 
          <Box pl={30}>
           日期 : 
          </Box>
          <Box pl={1}>
          <TextField
        name="order_date"
        InputLabelProps={{ shrink: true, required: true }}
        type="order_date"
        onChange={this.handleChangedate}
        floatingLabelFixed
        style={{ width: '90%' }}
        value={this.state.order_date.date1}
        InputLabelProps={{
           shrink: true,
         }}
      />
          </Box>
          <Box pl={15}>
          PO NO : 
          </Box>
          <Box pl={1}>
          <TextField
         name="po_no"
         value={this.state.po_no}
         style={{width:'75%'}}
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
         <Box pl={27}>
         訂購單號 : 
         </Box>
         <Box p={1} >
         <TextField
         name="order_no"
         value={this.state.order_no}
         style={{width:'75%'}}
         onChange={this.handleChange}
        />
         </Box>
         <Box pl={7}>
          客戶代號 :
         </Box>
         <Box pl={1} mt={-2}>
         <Autocomplete
                  inputValue={this.state.customer_no}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            customer_no:newValue.customer_no
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          customer_no:e.target.value
                   })
                    }
                  }}
                  options={this.state.listcustomer_no}
                   
                  getOptionLabel={(option) => option.customer_no}
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
         mt={-6}
         bgcolor="background.paper"
         css={{ height: 100 }}
         > 
         <Box pl={73}>
         備註 :
         </Box>
         <Box pl={1}>
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
         pl={110}
         mt={-7}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
    <Box pl={1}>
    <button 
    disabled={
     !(this.state.showEdit && !this.state.showadd)
  &&!(!this.state.showEdit && this.state.showadd)
            } 
    onClick={this.Save}>
    儲存
    </button>
    </Box>
    <Box pl={1}>
   <button disabled={this.state.showEdit == true || this.state.showadd == true} onClick={this.ADD}>
       {this.state.buttonadd}
   </button>
    </Box>
    <Box pl={1}>
    <button disabled={this.state.showadd == true ||this.state.showEdit == true} onClick={this.handleshowEdit}>
       {this.state.buttonText}
    </button>
    </Box>
    <Box pl={1}>
     <button onClick={this.handledelete}>刪除</button>
    </Box>
    <Box pl={1}>
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
                 title ="訂購單明細"
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
                 title ="訂購單明細"
                 />
            </Fragment>}
     </div>
   )
    }
}
export default DataListOrder