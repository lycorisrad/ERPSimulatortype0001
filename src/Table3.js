import {
    AddBox,
    ArrowUpward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    ClearAll,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn
  } from '@material-ui/icons'
  import MaterialTable from 'material-table'
  import React, { forwardRef } from 'react'
  
  const tableIcons ={
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    ClearAll: forwardRef((props, ref) => <ClearAll {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  }
   const Table =props => <MaterialTable 
      options ={{
      search:false,
      actionsColumnIndex:-1,
      paging: false}}
      localization={{
        header: {
            actions: '動作'
        },
        body: {
          addTooltip:'新增',
          deleteTooltip:'刪除',
          editTooltip:'編輯',
          editRow: {
                deleteText: '您確定要刪除此欄位嗎?',
                cancelTooltip:'取消',
                saveTooltip:'確定修改'
            },
          emptyDataSourceMessage:'目前暫無紀錄可顯示'
        },
        pagination:{
          labelRowsSelect:'筆',
          labelRowsPerPage:'5筆/頁',
          firstAriaLabel:'第一頁',
          firstTooltip:'第一頁',
          previousAriaLabel:'上一頁',
          previousTooltip:'上一頁',
          nextAriaLabel:'下一頁',
          nextTooltip:'下一頁',
          lastAriaLabel:'最後一頁',
          lastTooltip:'最後一頁',
          labelDisplayedRows:'共 {count} 筆資料'
        }
    }}
    icons={tableIcons} {...props}/>
   export default Table