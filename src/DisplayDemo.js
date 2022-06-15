import "./styles.css";
import Demo from "./Demo";
import React ,{Component} from 'react'
class DisplayDemo extends Component{
    render(){
        return (
            <div className ="App">
             <Demo/>
            </div>
        )
    }
}
export default DisplayDemo