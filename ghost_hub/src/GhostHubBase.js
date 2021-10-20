import React from 'react'
import axios from 'axios'
import ListCases from './components/ListCases.js'
import AddNewCase from './components/AddNewCase.js'
import EachCase from './components/EachCase.js'
import DeleteEachCase from './components/DeleteEachCase.js'
import EditEachCase from './components/EditEachCase.js'



export default class GhostHubBase extends React.Component {

    url_api = "https://3002-peach-possum-1zbabb9y.ws-us17.gitpod.io"

    state = {
        "displaying": "list_cases",
        "each_case_data":0,
        "entity_tags_list":[]
    }




    displayPanel(){

        let active_display_panel={

            "list_cases":<ListCases onEnterEachCase={this.enterEachCase} url_api={this.url_api}/>,
            "each_case":<EachCase onExitEachCase={this.exitEachCase}  onEditEachCase={this.editEachCase} onDeleteEachCase={this.deleteEachCase} each_case_data={this.state.each_case_data} url_api={this.url_api}/>,
            "edit_each_case":<EditEachCase entity_tags_list={this.state.entity_tags_list} each_case_data={this.state.each_case_data} url_api={this.url_api} />,
            "delete_each_case":<DeleteEachCase />,
            "add_new_case":<AddNewCase entity_tags_list={this.state.entity_tags_list} url_api={this.url_api} onListCases={this.listCases}/>,
               
        
        }


        return active_display_panel[this.state.displaying]
    }


    enterEachCase= async (case_id)=>{

        
        let response = await axios.get(this.url_api + "/case/"+case_id) 
        



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

    editEachCase= async(case_id)=>{

        let response_case = await axios.get(this.url_api + "/case/"+case_id)
        console.log(case_id) 
        console.log(response_case.data)
        let response_entity_tags = await axios.get(this.url_api + "/list_entity_tags") 
        

        this.setState({

            "displaying":"edit_each_case",
            "each_case_data":response_case.data,
            "entity_tags_list":response_entity_tags.data


        })


    }

    deleteEachCase=()=>{
        this.setState({

            "displaying":"delete_each_case"


        })


    }


    

    listCases=()=>{

        
        this.setState({

            "displaying":"list_cases"

        })

    }


    addNewCase= async()=>{

        let response = await axios.get(this.url_api + "/list_entity_tags") 

        this.setState({
            "displaying":'add_new_case',
            "entity_tags_list":response.data

        })

    }

    render(){
        return(
            <React.Fragment>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                <button className={(this.state.displaying === 'list_cases') ? 'nav-link active' : 'nav-link'} onClick={this.listCases}>List Cases</button>
                </li>
                <li className="nav-item">
                <button className={(this.state.displaying === 'add_new_case') ? 'nav-link active' : 'nav-link'} onClick={this.addNewCase}>Add Case</button>
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