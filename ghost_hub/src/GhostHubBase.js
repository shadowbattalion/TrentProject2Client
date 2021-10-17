import React from 'react'
import ListCases from './components/ListCases.js'
import AddNewCase from './components/AddNewCase.js'



export default class GhostHubBase extends React.Component {

    state = {
        "displaying": 'list_cases'
    }




    displayPanel(){

        let active_display_panel={

            "list_cases":<ListCases/>,
            "add_new_case":<AddNewCase/>
        
        }


        return active_display_panel[this.state.displaying]
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