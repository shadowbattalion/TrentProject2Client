import React from 'react'
import axios from 'axios'
import ListCases from './components/ListCases.js'
import AddNewCase from './components/AddNewCase.js'
import EachCase from './components/EachCase.js'



export default class GhostHubBase extends React.Component {

    state = {
        "displaying": 'list_cases',
        "each_case_data":0
    }




    displayPanel(){

        let active_display_panel={

            "list_cases":<ListCases onEnterEachCase={this.enterEachCase}/>,
            "each_case":<EachCase onExitEachCase={this.exitEachCase} each_case_data={this.state.each_case_data}/>,
            "add_new_case":<AddNewCase/>
        
        }


        return active_display_panel[this.state.displaying]
    }


    enterEachCase= async (case_id)=>{

        let url_api= "https://3002-peach-possum-1zbabb9y.ws-us17.gitpod.io/"
        let response = await axios.get(url_api + "case/"+case_id) 
        console.log(response.data)



        this.setState({

            "displaying":"each_case",
            "each_case_data":response.data

        })


    }

    exitEachCase=()=>{
        this.setState({

            "displaying":"list_cases"


        })


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