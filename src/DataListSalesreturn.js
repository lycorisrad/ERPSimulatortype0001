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
//銷退-->銷折
class DataListSalesreturn extends Component{
    constructor(props){
        super(props);
          const newdate = new Date();
          newdate.setDate(newdate.getDate()+45);

        this.state={
          data:[],
          IDdata:[],
          listvendor:[],
          listship:[],
          listPONo:[],
          listproduct_no:[],
          listpcb_no:[],
          listic_level:[],
          modal:null,

          confirmdelete:false,
          canceledit:false,
          showadd:false,
          showEdit:false,
          buttonadd:"新增",
          buttonText:"修改",
          buttonsave:"儲存",
          
          Fram4:0,
          idwarningmodal:false,
          wh_chkcheckedmodal:false,
          wh_chkcheckedmodal_cancel : false,
          askforwh_chk:false,
          askforwh_chkyes:false,
        
          id:"",
          reba_no:"",
          Check9:false,
          Check7:false,
          cus_no:"",
          reba_date:{
            date1:""
          },
          remark:"",
          Dataview:{
              sale_no:"",
              po_no:"",
              product_no:"",
              pcb_no:"",
              pur_no:"",
              warehouse_no:"",
              ic_level:"",
              unit_price:"",
              discount_price:"",
              sale_qty:"",
              back_qty:"",
              exchange_rate:"",
              area:"",
              us_nt:"",
              wh_chk:false,
              wh_chk_time:"",
          }
        }
    }
    handlecancel=()=>{
        this.state.data.map((item,index)=>{
            if(this.state.id === item.id){
                this.setState({
                    IDdata:item.data,
                    id:item.id,
                    Check9:item.Check9,
                    Check7:item.Check7,
                    cus_no:item.cus_no,
                    reba_date:item.reba_date,
                    remark:item.remark
                })
            }
            return true;
        })
        this.setState({
            showEdit:false,
            showadd:false
        })
     }
     Save=()=>{
        if((this.state.reba_no || 0) === ""){
            this.setState({
              idwarningmodal:!this.state.idwarningmodal    
            })
        }
        else {
             this.setState({
                 showadd :false,
                 showEdit :false,
                 buttonadd:"新增",
                 buttonText:"修改",
             })
             this.POST()
             this.PUT()
        }
        }
        
        handleshowEdit=()=>{
            /*
             Set temp = CurrentDb.OpenRecordset("SELECT dbo_reject_back_detail.reba_no, dbo_reject_back_detail.wh_chk FROM dbo_reject_back_detail WHERE dbo_reject_back_detail.reba_no ='" & reba_no.value & "' AND dbo_reject_back_detail.wh_chk = 0")
             if(temp.RecordCount !== 0) {
                 this.setState({
                     edit_flag : true,
                     enabled
                      reba_no.SetFocus
                     DoCmd.SetWarnings False
                     DeleteSQL = "DELETE FROM dbo_receivable WHERE outgoing_no = '" & reba_no.value & "'"
                     DoCmd.RunSQL DeleteSQL
                     DoCmd.SetWarnings True
                 })
             }
             else {
                  this.setState({
                      wh_chkcheckedmodal:!this.state.wh_chkcheckedmodal
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
     sale_no_GotFocus=()=>{
         if((this.state.reba_no || 0) === ""){ //Forms!reject_back!reba_no.value
                this.setState({
                    idwarningmodal: !this.state.idwarningmodal
                })
                //Forms!reject_back!reba_no.SetFocus
         }
     }    
     sale_no_Dirty=()=>{
         if(this.state.wh_chk = true){
             this.setState({
                 wh_chkcheckedmodal:!this.state.wh_chkcheckedmodal
             })
         }
     }
     po_no_Dirty=()=>{
        if(this.state.wh_chk = true){
            this.setState({
                wh_chkcheckedmodal:!this.state.wh_chkcheckedmodal
            })
        }
     }
     po_no_GotFocus=()=>{
         if((this.state.reba_no || 0 ) === ""){
             this.setState({
                 idwarningmodal:!this.state.idwarningmodal
             })
             //Forms!reject_back!reba_no.SetFocus
         }
     }
     product_no_GotFocus=()=>{
        if((this.state.reba_no || 0 ) === ""){
            this.setState({
                idwarningmodal:!this.state.idwarningmodal
            })
            //Forms!reject_back!reba_no.SetFocus
        }
     }
     product_no_Dirty=(e)=>{
        if(this.state.wh_chk = true){
            this.setState({
                wh_chkcheckedmodal:!this.state.wh_chkcheckedmodal
            })
        }
     }
     pcb_no_Dirty=(e)=>{
         if(this.state.wh_chk === true){
             this.setState({
                 wh_chkcheckedmodal:!this.state.wh_chkcheckedmodal
             })
         }
     }
     unit_price_Dirty=()=>{
         if(this.state.wh_chk === true){
          this.setState({
              wh_chkcheckedmodal:!this.state.wh_chkcheckedmodal
          })     
        }
     }
     discount_price_Dirty=()=>{
        if(this.state.wh_chk === true){
            this.setState({
                wh_chkcheckedmodal:!this.state.wh_chkcheckedmodal
            })     
          }
     }
     sale_qty_Dirty=()=>{
        if(this.state.wh_chk === true){
            this.setState({
                wh_chkcheckedmodal:!this.state.wh_chkcheckedmodal
            })     
          }
     }
     back_qty_Dirty=()=>{
        if(this.state.wh_chk === true){
            this.setState({
                wh_chkcheckedmodal:!this.state.wh_chkcheckedmodal
            })     
          }
     }
     back_qty_GotFocus=()=>{
         const temp_qty = (this.state.back_qty || 0)
     }
     exchange_rate_Dirty=()=>{
        if(this.state.wh_chk === true){
            this.setState({
                wh_chkcheckedmodal:!this.state.wh_chkcheckedmodal
            })     
          }
     }
     area_Dirty =()=>{
        if(this.state.wh_chk === true){
            this.setState({
                wh_chkcheckedmodal:!this.state.wh_chkcheckedmodal
            })     
          }
     }
     us_nt_Dirty=()=>{
        if(this.state.wh_chk === true){
            this.setState({
                wh_chkcheckedmodal:!this.state.wh_chkcheckedmodal
            })     
          }
     }
     wh_chk_AfterUpdate=()=>{
         const date = new Date().toLocaleTimeString

         if(this.state.wh_chk === false){
              this.setState({
                  wh_chkcheckedmodal_cancel:!this.state.wh_chkcheckedmodal_cancel,
                  wh_chk : true
                })
         }
         else if(this.state.wh_chk === true || this.state.askforwh_chkyes){
             this.setState({
                 wh_chk: false,
                 wh_chk_time : ""
             })
         }
         else{
             this.setState({
                 askforwh_chk:!this.state.askforwh_chk
             })
             if(this.state.askforwh_chkyes === true){
                 const diff_qty =(this.state.back_qty || 0) - this.state.temp_qty
                 if(this.state.Fram4 === 1){  //Forms!reject_back!Frame4.value = 1
                    //Call stock_process(warehouse_no:=Me!warehouse_no.value, product_no:=Me!product_no.value, pcb_no:=Nz(Me!pcb_no.value), stock_qty:=Me!back_qty.value, outstock_type:="空白", pur_no:=Me!pur_no.value, ic_level:=Me!ic_level.value)
                 }
             }
             this.setState({
                wh_chk_time : date
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
         cus_no:newInputValue
        })
    }
    }
    askforwh_chkyes=()=>{
        this.setState({
          askforwh_chkyes:!this.state.askforwh_chkyes
        })
    }
    Delete =()=>{
        if (this.state.showadd === true){
            //更新表單
            if(this.state.reba_no == ""){
              /* 刪除後端資料
              DeleteSQL = "DELETE FROM dbo_reject_back WHERE seq = " & seq.value
              DoCmd.RunSQL DeleteSQL
              */ 
              axios.delete(`posts/${this.state.id}`,{
                id:this.state.id,
                        Check9:this.state.Check9,
                        Check7:this.state.Check7,
                        cus_no:this.state.cus_no,
                        reba_date:this.state.reba_date,
                        remark:this.state.remark,
               data :
               this.state.IDdata,
            })
            }
        else{
            /*刪除後端資料
             DeleteSQL = "DELETE FROM dbo_reject_back_detail WHERE reba_no = '" & reba_no.value & "'"
        DoCmd.RunSQL DeleteSQL
        DeleteSQL = "DELETE FROM dbo_reject_back WHERE reba_no = '" & reba_no.value & "'"
        DoCmd.RunSQL DeleteSQL
            */
        axios.delete(`posts/${this.state.id}`,{
                    id:this.state.id,
                    Check9:this.state.Check9,
                    Check7:this.state.Check7,
                    cus_no:this.state.cus_no,
                    reba_date:this.state.reba_date,
                    remark:this.state.remark,
           data :
           this.state.IDdata,
        })
        }
        this.setState({
            showadd:!this.state.showadd
        })
        }
        else if(this.state.showEdit === true){
            /*
               if(Me.Dirty){
                   Me.Undo
               }
            */     
           this.setState({
               showEdit: false
           })
          }
          else {
            /*Set temp = CurrentDb.OpenRecordset("SELECT dbo_reject_back_detail.reba_no, dbo_reject_back_detail.wh_chk FROM dbo_reject_back_detail WHERE dbo_reject_back_detail.reba_no ='" & reba_no.value & "' AND dbo_reject_back_detail.wh_chk = -1")
            If temp.RecordCount <> 0 Then
                MsgBox "倉庫已做確認，禁止刪除！！"
            ElseIf MsgBox("是否刪除銷折/銷退單號：" & reba_no.value & "？", vbYesNo, "刪除") = vbYes Then
                DeleteSQL = "DELETE FROM dbo_receivable WHERE outgoing_no = '" & reba_no.value & "'"
                DoCmd.RunSQL DeleteSQL
                DeleteSQL = "DELETE FROM dbo_reject_back_detail WHERE reba_no = '" & reba_no.value & "'"
                DoCmd.RunSQL DeleteSQL
                DeleteSQL = "DELETE FROM dbo_reject_back WHERE reba_no = '" & reba_no.value & "'"
                DoCmd.RunSQL DeleteSQL
            End If
            temp.Close 
            disabled 
             
            */
          }
        this.setState({
            confirmdelete:!this.state.confirmdelete,
            id:"",
            Check9:"",
            Check7:"",
            cus_no:"",
            reba_date:"",
            remark:"",
             IDdata:[],
        })
    }
    PUT=()=>{
       axios.put(`posts/${this.state.id}`,
       {
        id:this.state.id,
        Check9:this.state.Check9,
        Check7:this.state.Check7,
        cus_no:this.state.cus_no,
        reba_date:this.state.reba_date,
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
            Check9:this.state.Check9,
            Check7:this.state.Check7,
            cus_no:this.state.cus_no,
            reba_date:this.state.reba_date,
            remark:this.state.remark,
           data :
           this.state.IDdata,
        })
     }
     ADD=()=>{
         
         const date = new Date().toLocaleDateString()
         this.setState({
            Fram4:1,
            id:"",
            Check9:"",
            Check7:"",
            cus_no:"",
            reba_date:{
                date1:date
            },
            remark:"",
           IDdata:[],
           showadd:!this.state.showadd
         })
       
     }
     cus_no_AfterUpdate =()=>{
         /*
         Me!dbo_reject_back_detail!sale_no.RowSource = "SELECT sale_detail.sale_no FROM sale_detail  GROUP BY sale_detail.sale_no, sale_detail.customer_no  HAVING sale_detail.customer_no Like '" & Nz(cus_no.value) & "*'"
Me!dbo_reject_back_detail!sale_no.Requery

Me!dbo_reject_back_detail!po_no.RowSource = "SELECT sale_detail.po_no FROM sale_detail GROUP BY sale_detail.po_no, sale_detail.customer_no  HAVING sale_detail.customer_no Like '" & cus_no.value & "*'"
Me!dbo_reject_back_detail!po_no.Requery


Me!dbo_reject_back_detail!product_no.RowSource = "SELECT sale_detail.product_no FROM sale_detail GROUP BY sale_detail.product_no, sale_detail.customer_no HAVING sale_detail.customer_no Like '" & cus_no.value & "*'"
Me!dbo_reject_back_detail!product_no.Requery

Me!dbo_reject_back_detail!pcb_no.RowSource = "SELECT sale_detail.pcb_no FROM sale_detail GROUP BY sale_detail.pcb_no, sale_detail.customer_no HAVING sale_detail.customer_no Like '" & cus_no.value & "*'"
Me!dbo_reject_back_detail!pcb_no.Requery
         */
     }
     
    getOption=()=>{
        axios.get('/posts')
        .then(res=>{
            this.setState({
                data:res.data
            })
        })
        console.log(this.state.Data)
    }
    getlistvendor=()=>{
        axios.get('/listvendor')
        .then(res=>{
            this.setState({
                listvendor : res.data
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
    getlistPONo=()=>{
        axios.get('/listPONo')
        .then(res=>{
            this.setState({
                listPONo:res.data
            })
        })
    }
    getlistproduct_no=()=>{
        axios.get('/listproduct_no')
        .then(res=>{
            this.setState({
                listproduct_no:res.data
            })
        })
    }
    getlistpcb_no=()=>{
        axios.get('/listpcb_no')
        .then(res=>{
            this.setState({
                listpcb_no: res.data
            })
        })
    }
    getlistic_level=()=>{
        axios.get('/listic_level')
        .then(res=>{
            this.setState({
                listic_level:res.data
            })
        })
    }
    componentDidMount(){
        this.getOption();
        this.getlistvendor();
        this.getlistpcb_no();
        this.getlistPONo();
        this.getlistic_level();
        this.getlistproduct_no();
        this.getlistship();
    }
    handleChangedate=(e)=>{
        if(this.state.showadd || this.state.showEdit){
            this.setState({
                reba_date:e.target.value
            })
        }
    }
    handledelete=()=>{
        this.setState({
            confirmdelete:!this.state.confirmdelete
        })
     }
    handleChangeID=(e,values)=>{
          this.setState({
              id:values.id
          })
          this.state.data.map((item,index)=>{
              if(values.id === item.id){
                  this.setState({
                      IDdata:item.data,
                      id:item.id,
                      reba_no: item.id,
                      Check9:item.Check9,
                      Check7:item.Check7,
                      cus_no:item.cus_no,
                      reba_date:item.reba_date,
                      remark:item.remark
                  })
              }
              return true
          })
    }
    clear =(e)=>{
        e.target.value="";
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
    render(){

        const axiosship=this.state.listship.map((item,index)=>{
            return <select value={this.state.sale_no}>
            <option key={index} value={item.sale_no}>
            {item.sale_no}
            </option>
            </select>
        })
        const axiosPONo = this.state.listPONo.map((item,index)=>{
            return <select value={this.state.po_no}>
            <option key={index} value={item.po_no}>
            {item.po_no}
            </option>
            </select>
        })
        const axioslistproduct_no = this.state.listproduct_no.map((item,index)=>{
            return  <select value={this.state.product_no}>
            <option key={index} value={item.product_no}>
            {item.product_no}
            </option>
            </select>
        })
        const axioslistpcb_no = this.state.listpcb_no.map((item,index)=>{
            return <select value={this.state.pcb_no}>
            <option key={index} value={item.pcb_no}>
            {item.pcb_no}
            </option>
            </select>
        })
        const axioslistic_level = this.state.listic_level.map((item,index)=>{
            return <select value={this.state.ic_level}>
            <option key={index} value={item.ic_level}>
            {item.ic_level}
            </option>
            </select>
        })
        const defaultProps = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '14rem', height: '3rem' },
            borderColor: 'text.primary',
          };
        const tableColumns =[
            {
                title:"銷貨單號",
                 field:"sale_no",
                 editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="sale_no"
                    value={value}
                    placeholder={this.state.sale_no}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="sale_no">
                        {axiosship}
                    </datalist>
                    </div>
                    )
            },{
                title:"PO No.",
                field:"po_no",
                editComponent:({value,onChange})=>(
                    <div>
                    <input 
                    list ="po_no"
                    value={value}
                    placeholder={this.state.po_no}
                    onChange={(e)=>onChange(e.target.value)}
                    onClick={this.clear}
                    onFocus={this.clear}
                    />
                    <datalist id="pur_no">
                        {axiosPONo}
                    </datalist>
                    </div>
                    )
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
                        {axioslistproduct_no}
                    </datalist>
                    </div>
                    )
            },{
                title:"PCB No.",
                field:"pcb_no",
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
                    <datalist id="pcb_no">
                        {axioslistpcb_no}
                    </datalist>
                    </div>
                    )
            },{
                title:"採購單號",
                field:"pur_no"
            },{
                title:"等級",
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
                    <datalist id="ic_level">
                        {axioslistic_level}
                    </datalist>
                    </div>
                    )
            },{
                title:"單價",
                field:"unit_price"
            },{
                title:"折價",
                field:"discount_price"
            },{
                title:"銷貨數量",
                field:"sale_qty"
            },{
                title:"銷退數量",
                field:"back_qty"
            },{
                title:"匯率",
                field:"exchange_rate"
            },{
                title:"國內/國外",
                field:"area"
            },{
                title:"美金/台幣",
                field:"us_nt"
            },{
                title:"倉管確認",
                field:"wh_chk",
                editComponent: 
                (props)=>{
                    console.log(props);
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
            },{
                title:"倉管確認時間",
                field:"wh_chk_time",
                editComponent:
                (({value,onChange})=>(
                    <TextField
                    name="wh_chk_time"
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
         <Modal isOpen={this.state.idwarningmodal} toggle={this.Save} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        請輸入銷折/銷退單號！！
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.wh_chkcheckedmodal} toggle={this.handleshowEdit} >
            <ModalHeader>錯誤</ModalHeader>
            <ModalBody>
            倉庫已做確認，禁止修改！！
            </ModalBody>
          <ModalFooter>
          <div>
           <button onClick={this.Delete}>確定</button>
           <button onClick={this.handledelete}>取消</button>
          </div>
          </ModalFooter>
         </Modal>
         <Modal isOpen={this.state.wh_chkcheckedmodal_cancel} toggle={this.wh_chk_AfterUpdate} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        倉庫已做確認，禁止取消！！
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.closeallmodal}>確定</button>
      </div>
      </ModalFooter>
     </Modal>
     <Modal isOpen={this.state.askforwh_chk} toggle={this.wh_chk_AfterUpdate} >
        <ModalHeader>警告</ModalHeader>
        <ModalBody>
        確定倉管確認???
        </ModalBody>
      <ModalFooter>
      <div>
       <button onClick={this.state.askforconfirmout_chkyes}>確定</button>
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
         <Box pl={1}>
           請選擇銷退/銷折單號 : 
          </Box>
          <Box pl={1} mt={-2}>
          <Autocomplete
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
         bgcolor="background.paper"
         css={{ height: 100 }}
         > 
         <Box pl={95} mt={-5}>
            銷退/銷折
         </Box>
         </Box>
         <Box
         display="flex"
         alignItems="flex-start"
         p={1}
         mt={-15}
         bgcolor="background.paper"
         css={{ height: 100 }}
         > 
         <Box pl={84.5}>

           <Box border={1} pl={5} {...defaultProps}>
             銷退
             <Checkbox
              value={this.state.Check7}
              checked={this.state.Check7}
              onChange={this.handleChecked}
              name="Check7"
             />
            銷折
            <Checkbox
              value={this.state.Check9}
              checked={this.state.Check9}
              onChange={this.handleChecked}
              name="Check9"
             />
          </Box>
          </Box>
          </Box> 
         <Box
         display="flex"
        alignItems="flex-start"
        p={1}
        mt={-3}
        bgcolor="background.paper"
        css={{ height: 100 }}
        >
        <Box pl={65}>
        銷退/折單號 : 
        </Box>
        <Box pl={1}>
        <TextField
        name="id"
        disabled={this.state.showEdit}
        value={this.state.id}
        style={{width:'75%'}}
        onChange={this.handleChange}
       />
        </Box>
        <Box pl={1}>
         客戶編號 :
        </Box>
        <Box pl={1} mt={-2}>
        <Autocomplete
                  inputValue={this.state.cus_no}
                  onChange={(event,newValue)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                    if(newValue){
                          this.setState({
                            cus_no:newValue.cus_no
                          })
                      }
                  }}}
                  onInputChange={(e)=>{
                    if(this.state.showadd ==true || this.state.showEdit ==true){
                        this.setState({
                          cus_no:e.target.value
                   })
                    }
                  }}
                  options={this.state.listvendor}
                   
                  getOptionLabel={(option) => option.cus_no}
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
              <Box pl={72}>
                 日期 : 
              </Box>
              <Box pl={1}>
              <TextField
        name="reba_date"
        floatingLabelText="填表時間"
        InputLabelProps={{ shrink: true, required: true }}
        type="reba_date"
        onChange={this.handleChangedate}
        floatingLabelFixed
        style={{ width: '95%' }}
        value={this.state.reba_date.date1}
        InputLabelProps={{
           shrink: true,
         }}
      />
              </Box>
              <Box pl={9.5}>
                備註 :
              </Box>
              <Box  pl={1}>
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
         pl={135}
         mt={-8}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
         <Box pl={5}>
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
    <button disabled={this.state.showadd == true || this.state.showEdit == true} onClick={this.handleshowEdit}>
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
                 title ="銷退/銷折明細"
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
                 title ="銷退/銷折明細"
                 />
            </Fragment>}
            </div>
        )
    }
}
export default DataListSalesreturn