import React ,{Component} from "react";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
class DataExploreResult extends Component{
    constructor(props){
        super(props);
        this.state={
           buyNumber:"",
           axiosparams1:[],
        };
    }
    componentDidMount(){
        this.getOption()
    }
    getOption=()=>{
        this.setState({filteredContacts: this.state.axiosparams1})
       axios.get("http://localhost:3003/posts")
       .then(res=>{
         this.setState({axiosparams1:res.data})
         console.log(res.data)
       })
     }
     renderTableData(data){
         return data.map((element,i)=>(
             <tr key={i}>
             <td>{element.storageclass}</td>
            <td>{element.level}</td>
            <td>{element.bollowNumber}</td>
            <td>{element.backNumber}</td>
            <td>{element.pregivedate}</td>
            <td>{element.actdate}</td>
            <td>{element.productnumber}</td>
            <td>{element.PCBNo}</td>
            <td>{element.numberPrice}</td>
            <td>{element.shipping}</td>
            <td>{element.actually}</td>
            <td>{element.didnotenter}</td>
             </tr>
         ))
     }
     handleChange=(e)=>{
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
          [name]:value,
      })
  }
    render(){
        let filteredContacts = this.state.axiosparams1;

        const {
          buyNumber,
          description,
          person,
          buyNumberDate,
          axiosparams,
          vendor,
          onChange,
        } = this.props;
        console.log(axiosparams.length);
        return (
       <div>  
           <div style={{width:'100%'}}>
           <Box
            display="flex"
            alignItems="flex-start"
            p={1}
            m={1}
            bgcolor="background.paper"
            css={{ height: 100 }}
            > 
            <Box pl={1}>
             ????????????????????????????????? : 
             </Box>
             <Box pl={1}>
             <select
              name ="buyNumber"
              value ={buyNumber}
              onChange={onChange}
             >
                 {this.state.axiosparams1.map((car,i)=>{
                     return <option key ={i}>{car.buyNumber}</option>
                 })}
             </select>
            </Box>
            <Box pl={1}>
             <select
              name ="vendor"
              value ={vendor}
              onChange={onChange}
             >
                 {this.state.axiosparams1.map((car)=>{
                     return <option>{car.vendor}</option>
                 })}
             </select>
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
                 ???????????? : 
             </Box> 
             <Box pl={30}>
                 ?????? :
                 <TextField
               name="description"
              value={description}
              onChange={this.handleChange}
              style ={{width: '10%'}}
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
                 ?????? : 
             </Box>
             <Box pl={1}>
              
               </Box>              
             </Box>
             <div style={{ width: '100%' }}>
             <Box
            display="flex"
            alignItems="flex-start"
            p={1}
            mt={-7}
            bgcolor="background.paper"
            css={{ height: 100 }}
            > 
            <Box pl={32}>
                 ????????? : 
             </Box> 
             <Box pl ={26}>
                 ???????????? :
               </Box>               
             </Box>
             </div>
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
             <ThemeProvider >
               <Typography variant="h4">
                 ????????????
               </Typography>
             </ThemeProvider>
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
           <table >
             <tr >
               
               <th style={{width:'1%'}}>??????</th>
               <th style={{width:'15%'}}>??????</th>
               <th style={{width:'10%'}}>????????????</th>
               <th style={{width:'15%'}}>????????????</th>
               <th style={{width:'30%'}}>????????????</th>
               <th style={{width:'10%'}}>????????????</th>
               <th style={{width:'10%'}}>????????????</th>
               <th style={{width:'30%'}}>PCB No.</th>
               <th style={{width:'30%'}}>??????</th>
               <th style={{width:'5%'}}>??????</th>
               <th style={{width:'5%'}}>??????</th>
               <th style={{width:'5%'}}>??????</th>
             </tr>
             {axiosparams.map((item)=>(
                 <tr key={item.id}>
                 <td>
                 {item.storageclass}
                 </td>
                 <td>
                 {item.bollowNumber}
                 </td>
                 <td>
                 {item.backNumber}
                 </td>
                 <td>
                 {item.pregivedate}
                 </td>
                 <td>
                 {item.actdate}
                 </td>
                 <td>
                 {item.productnumber}
                 </td>
                 <td>
                 {item.PCBNo}
                 </td>
                 <td>
                 {item.numberPrice}
                 </td>
                 <td>
                 {item.shipping}
                 </td>
                 <td>
                 {item.actually}
                 </td>
                 <td>
                 {item.didnotenter}
                 </td>
                 </tr>
             ))}
           </table>
           </Box>
          
           </div>
         </div>
       );
     }
   }
export default DataExploreResult