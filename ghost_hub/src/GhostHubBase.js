import React from 'react'
import axios from 'axios'
// import ListCases from './components/ListCases.js'
// import AddNewCase from './components/AddNew.js'



export default class GhostHubBase extends React.Component {

    state = {
        "displaying": 'list_cases'
    }




    displayPanel(){

        active_display_panel={

            "list_cases":<ListCases/>,
            "add_new_case":<AddNewCase/>
        
        }


        return[list.state.displaying]
    }

    render(){
        return(
            <React.Fragment>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                <button className={(this.state.displaying === 'list_cases') ? 'nav-link active' : 'nav-link'} onClick={()=>{this.setState({'displaying':'list_cases'})}}>List Cases</button>
                </li>
                <li className="nav-item">
                <button className={(this.state.displaying === 'add_new_case') ? 'nav-link active' : 'nav-link'} onClick={()=>{this.setState({'displaying':'add_new_case'})}}>Add Case</button>
                </li>
                <li className="nav-item">
                    <button className="nav-link">About Us</button>
                </li>               
            </ul>
            {this.displayPanel()}
        </React.Fragment>
        )




    }



}