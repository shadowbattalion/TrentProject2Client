import React from 'react'
import axios from 'axios'
import ListCases from './components/ListCases.js'
import AddNewCase from './components/AddNewCase.js'
import EachCase from './components/EachCase.js'
import DeleteEachCase from './components/DeleteEachCase.js'
import EditEachCase from './components/EditEachCase.js'
import NotificationPanel from './components/NotificationPanel.js'


export default class GhostHubBase extends React.Component {

    url_api = "https://3002-peach-possum-1zbabb9y.ws-us17.gitpod.io"
              

    state = {
        "displaying": "list_cases",
        "case_id":"",
        "notification_message":"",
        "notification_message_color":""
    }


    displayPanel(){

        let active_display_panel={

            "list_cases":<ListCases onEnterEachCase={this.enterEachCase} url_api={this.url_api}/>,
            "each_case":<EachCase onListCases={this.listCases} onEditEachCase={this.editEachCase} onDeleteEachCase={this.deleteEachCase} url_api={this.url_api} case_id={this.state.case_id} />,
            "edit_each_case":<EditEachCase onEnterEachCase={this.enterEachCase} url_api={this.url_api} case_id={this.state.case_id} />,
            "delete_each_case":<DeleteEachCase />,
            "add_new_case":<AddNewCase onListCases={this.listCases} url_api={this.url_api} />,
            // "notification_panel":<NotificationPanel />
               
        
        }


        return active_display_panel[this.state.displaying]
    }


    enterEachCase= async (case_id)=>{

    
        this.setState({

            "displaying":"each_case",
            "case_id":case_id,

        })


    }
    

    exitEachCase=()=>{
        this.setState({

            "displaying":"list_cases"


        })


    }

    editEachCase= async(case_id)=>{

     
        this.setState({

            "displaying":"edit_each_case",
            "case_id":case_id


        })


    }

    deleteEachCase=()=>{
        this.setState({

            "displaying":"delete_each_case"


        })


    }


    listCases=(notification_content)=>{

        if (Object.keys(notification_content).length==0){

            this.setState({

                "displaying":"list_cases"

            })


        }else{
            if(notification_content.validation){
                this.setState({

                    "displaying":"list_cases",
                    "notification_message":notification_content.message,
                    "notification_message_color":notification_content.color

                })
            }else{
                this.setState({

                    "notification_message":notification_content.message,
                    "notification_message_color":notification_content.color

                })
            }
        }

    }


    addNewCase= async()=>{

        this.setState({
            "displaying":'add_new_case'
        })

    }



    



    render(){

        let i = 234324

        let reveal = ""
        if(i==0){
            
            reveal="alert-reveal"
            
        }else{
            reveal=""
        }

        console.log(reveal)


        return(
            <React.Fragment>
            <NotificationPanel className_reveal={reveal} message={this.state.notification_message} color={this.state.notification_message_color}/>
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