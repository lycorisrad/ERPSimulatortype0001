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

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FastfoodOutlined, FormatListNumbered } from '@material-ui/icons';
import Dropdown from 'react-multilevel-dropdown';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const logos = {
    AgGrid:
      'data:image/png;base64,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'
  };
  
class ExcelExport extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          columnDefs: [
            { field: 'athlete' },
            { field: 'country' },
            { field: 'age' },
            { field: 'year' },
            { field: 'date' },
            { field: 'sport' },
            { field: 'gold' },
            { field: 'silver' },
            { field: 'bronze' },
            { field: 'total' },
          ],
          defaultColDef: {
            width: 150,
            resizable: true,
          },
          defaultExcelExportParams: {
            prependContent: [
              [
                {
                  data: {
                    type: 'String',
                    value: logos.AgGrid,
                  },
                  mergeAcross: 1,
                },
              ],
            ],
            rowHeight: (params) => (params.rowIndex === 1 ? 82 : 20),
            addImageToCell: (rowIndex, col, value) => {
              if (rowIndex !== 1 || col.colId !== 'athlete') {
                return;
              }
              return {
                image: {
                  id: 'logo',
                  base64: value,
                  imageType: 'png',
                  width: 295,
                  height: 100,
                  position: { colSpan: 2 },
                },
              };
            },
          },
        };
      }
    
      onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    
        fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
          .then((response) => response.json())
          .then((data) => params.api.setRowData(data));
      };
    
      onBtExport = () => {
        this.gridApi.exportDataAsExcel();
      };
    
      render() {
        return (
          <div style={{ width: '100%', height: '100%' }}>
            <div className="container">
              <div>
                <button className="export" onClick={() => this.onBtExport()}>
                  Export to Excel
                </button>
              </div>
              <div className="grid-wrapper">
                <div
                  id="myGrid"
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  className="ag-theme-alpine"
                >
                  <AgGridReact
                    columnDefs={this.state.columnDefs}
                    defaultColDef={this.state.defaultColDef}
                    defaultExcelExportParams={this.state.defaultExcelExportParams}
                    onGridReady={this.onGridReady}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }
    
}
export default ExcelExport