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
import { createStore } from 'redux';


import DataListVendor2 from "./DataListVendor2";
import Datareturnback from './Datareturnback';
import DataListPurchase from './DataListPurchase';

import DataListClient from './DataListClient';
import DataListShipment from './DataListShipment';
import DataListOrder from './DataListOrder';
import DataListSalesreturn from './DataListSalesreturn';

import DataAddpartnumber from './DataAddpartnumber';
import DataListbollowinreturn from './DataListbollowinreturn';
import DataListarrangeIN from './DataListarrangeIN';
import DataListarrangeOUT from './DataListarrangeOUT';
import DataListbollowout from './DataListbollowout';
import DataListconsume from './DataListconsume';
import DataListgivein from './DataListgivein';
import DataListgiveout from './DataListgiveout';
import DataListHalfproduct from './DataListHalfproduct';
import DataListLoadboard from './DataListLoadboard';
import DataListLoadboardDisassemble from './DataListLoadboardDisassemble';
import DataListscrapped from './DataListscrapped';

import DataWorkMenu from './DataWorkMenu';

import WorkOrderEnterForm from './WorkOrderEnterForm';

import DataTransferOrder from './DataTransferOrder';

import DataOutsourceForm from './DataOutsourceForm';

import DataOutsourceEditForm from './DataOutsourceEditForm';

class Systempage extends Component{
      constructor(props){
          super(props);
          this.state={
              redirect:false
          };
    }
    mapStateToProps = state =>({
        name : state.name
    })
    render(){
        const defaultProps = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '40rem', height: '11.5rem' },
            borderColor: 'text.primary',
          };
          const defaultProps1 = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '15rem', height: '10rem' },
            borderColor: 'text.primary',
          };
        const theme = createTheme();
        theme.typography.h6={
           fontSize: '1rem',
           '@media (min-width:400px)': {
             fontSize: '1rem',
           },
           [theme.breakpoints.up('sm')]: {
             fontSize: '1rem',
           },
        }
        const description1style={
            minHeight:'50px',
            resize:'auto',
            padding:'9px',
            boxSizing:'border-box',
            fontSize:'15px',
            width:'200px'
           }
           const description2style={
            minHeight:'120px',
            resize:'auto',
            padding:'9px',
            boxSizing:'border-box',
            fontSize:'15px',
            width:'200px'
           }
        return (
            <div className="App">
 <Router>
              <Box
         display="flex"
         alignItems="flex-start"
         pl={15}
         mt={5}
         bgcolor="background.paper"
         css={{ height: 100 }}
         >
             <Dropdown
             title='???????????????'
             menuClassName="text-20 py-8 px-5 my-0 mx-16 border-b-1 border-solid border-blue hover:border-black"
             >
            <Dropdown.Item
            >  
             ??????
            <Dropdown.Submenu position="right">
                  <Dropdown.Item >
                  <Link to="/DataListPurchase">??????</Link>
                  </Dropdown.Item>
                  <Dropdown.Item >
                  <Link to="/Datareturnback">??????</Link>
                  </Dropdown.Item>
                  <Dropdown.Item >
                  <Link to="/DataListVendor2">??????</Link>
                  </Dropdown.Item>
            </Dropdown.Submenu>
            </Dropdown.Item>
            <Dropdown.Item
            >  
                ??????
            <Dropdown.Submenu position="right">
                  <Dropdown.Item >
            <Link to="/DataListOrder">??????</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
            <Link to="/">??????</Link> 
                  </Dropdown.Item>
                  <Dropdown.Item >
            <Link to="/DataListSalesreturn">??????/??????</Link>
                  </Dropdown.Item>
                  <Dropdown.Item >
            <Link to="/DataListClient">????????????</Link>
                  </Dropdown.Item>
            </Dropdown.Submenu>
            </Dropdown.Item>
            <Dropdown.Item
            >  
              ??????
            <Dropdown.Submenu position="right">
                  <Dropdown.Item >
                  <Link to="/DataListbollowout">??????</Link>
                  </Dropdown.Item>
                  <Dropdown.Item >
                      ????????????
                  </Dropdown.Item>
                  <Dropdown.Item >
                  <Link to="/DataAddpartnumber"> ????????????</Link>
                  </Dropdown.Item>
                  <Dropdown.Item >
                  <Link to="/DataListarrangeIN"> ??????</Link>
                  </Dropdown.Item>
                  <Dropdown.Item >
                  <Link to="/DataListarrangeOUT"> ??????</Link>
                  </Dropdown.Item>
                  <Dropdown.Item >
                  <Link to="/DataListconsume"> ??????</Link> 
                  </Dropdown.Item>
                  <Dropdown.Item >
                  <Link to="/DataListscrapped">??????</Link> 
                  </Dropdown.Item>
                  <Dropdown.Item >
                  <Link to="/DataListbollowinreturn"> ????????????</Link> 
                  </Dropdown.Item>
                  <Dropdown.Item >
                  <Link to="/DataListgivein">??????</Link> 
                  </Dropdown.Item>
                  <Dropdown.Item >
                  <Link to="/DataListgiveout">??????</Link> 
                  </Dropdown.Item>
                  <Dropdown.Item >
                  <Link to="/DataListHalfproduct">???????????????</Link>
                  </Dropdown.Item>
                  <Dropdown.Item >
                  <Link to="/DataListLoadboard">Loadboard??????</Link>
                  </Dropdown.Item>
                  <Dropdown.Item >
                  <Link to="/DataListLoadboardDisassemble">Loadboard??????</Link>
                  </Dropdown.Item>
            </Dropdown.Submenu>
            </Dropdown.Item>
             </Dropdown>
             <Dropdown
             title='????????????'
             menuClassName="text-20 py-8 px-5 my-0 mx-16 border-b-1 border-solid border-blue hover:border-black"
             >
             <Dropdown.Item >
                 ??????
                 <Dropdown.Submenu position="right">
                 <Dropdown.Item >
                     <Link to="/DataWorkMenu"> ????????????</Link>
                 </Dropdown.Item>
                 <Dropdown.Item >
                     <Link to="/WorkOrderEnterForm">????????????</Link>
                 </Dropdown.Item>
                 <Dropdown.Item >
                     <Link to="/DataTransferOrder">??????</Link>
                 </Dropdown.Item>
                 <Dropdown.Item >
                 <Link to="/DataOutsourceForm">????????????</Link>
                 </Dropdown.Item>
                 <Dropdown.Item >
                 <Link to="/DataOutsourceEditForm">??????????????????</Link>
                 </Dropdown.Item>
                 </Dropdown.Submenu>
                 </Dropdown.Item>
             </Dropdown>
             </Box>
             <div>
             <Route exact path="/" component={DataListShipment}/>
             <Route path="/DataListVendor2" component={DataListVendor2}/>
             <Route path="/Datareturnback"  component={Datareturnback} />
             <Route path="/DataListPurchase" component={DataListPurchase} />

             <Route path="/DataListClient"  component={DataListClient} />
             <Route path="/DataListOrder" component={DataListOrder} />
             <Route path="/DataListSalesreturn" component={DataListSalesreturn} />

             <Route path="/DataAddpartnumber" component={DataAddpartnumber} />
             <Route path="/DataListarrangeIN" component={DataListarrangeIN} />
             <Route path="/DataListarrangeOUT" component={DataListarrangeOUT} />
             <Route path="/DataListbollowinreturn" component={DataListbollowinreturn} />
             <Route path="/DataListbollowout" component={DataListbollowout} />
             <Route path="/DataListconsume" component={DataListconsume} />
             <Route path="/DataListgivein" component={DataListgivein} />
             <Route path="/DataListgiveout" component={DataListgiveout} />
             <Route path="/DataListHalfproduct" component={DataListHalfproduct} />
             <Route path="/DataListLoadboard" component={DataListLoadboard} />
             <Route path="/DataListLoadboardDisassemble" component={DataListLoadboardDisassemble} />
             <Route path="/DataListscrapped" component={DataListscrapped} />
             
             <Route path="/DataWorkMenu" component={DataWorkMenu} />
             
             <Route path="/WorkOrderEnterForm" component={WorkOrderEnterForm}/>
            
             <Route path ="/DataTransferOrder"  component={DataTransferOrder} />
             
             <Route path ="/DataOutsourceForm" component={DataOutsourceForm} />
             
             <Route path="/DataOutsourceEditForm"  component={DataOutsourceEditForm} />
             </div>
             </Router>
            </div>
        )
    }
}
export default Systempage