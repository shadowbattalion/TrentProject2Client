import React from 'react'
import axios from 'axios'
import ListCases from './components/ListCases.js'
import SearchCases from './components/SearchCases.js'
import AddNewCase from './components/AddNewCase.js'
import EachCase from './components/EachCase.js'
import EditEachCase from './components/EditEachCase.js'
import NotificationPanel from './components/NotificationPanel.js'
import logo_skull from './images/logo-skull.png'
import logo_text from './images/logo-text.png'


export default class GhostHubBase extends React.Component {

    url_api = "https://37801-peach-possum-1zbabb9y.ws-us18.gitpod.io"
              

    state = {
        "displaying": "list_cases",
        "case_id":"",
        "notification_message":"",
        "notification_message_color":"",
        "notification_message_title":"",
        "reveal":"",
        "drop_burger": false
    }

    
    //conditional rendering
    displayPanel(){

        let active_display_panel={

            "list_cases":<ListCases onEnterEachCase={this.enterEachCase} onServerError={this.server_error} url_api={this.url_api}/>,
            "search_cases":<SearchCases onSearchCases={this.searchCases} onEnterEachCase={this.enterEachCase} onServerError={this.server_error} url_api={this.url_api}/>,
            "each_case":<EachCase onListCases={this.listCases} onEditEachCase={this.editEachCase} onComment={this.comment_notification} onServerError={this.server_error} url_api={this.url_api} case_id={this.state.case_id} />,
            "edit_each_case":<EditEachCase onEnterEachCase={this.enterEachCase} onServerError={this.server_error} url_api={this.url_api} case_id={this.state.case_id} />,
            "add_new_case":<AddNewCase onListCases={this.listCases} onServerError={this.server_error} url_api={this.url_api} />
            
               
        
        }

        return active_display_panel[this.state.displaying]
    }

    



    enterEachCase= (notification_content, case_id)=>{

    
        if (Object.keys(notification_content).length==0){

            this.setState({

                "displaying":"each_case",
                "case_id":case_id,

            })


        }else{
            if(notification_content.validation){
                this.setState({

                    "displaying":"each_case",
                    "case_id":case_id,
                    "notification_message":notification_content.message,
                    "notification_message_title":"Successful",
                    "notification_message_color":"green",
                    "reveal":"alert-reveal"

                })
            }else{
                this.setState({

                    "notification_message":notification_content.message,
                    "notification_message_title":"There is something wrong",
                    "notification_message_color":"red",
                    "reveal":"alert-reveal"

                })
            }
        }


    }
    


    editEachCase= (case_id)=>{

     
        this.setState({

            "displaying":"edit_each_case",
            "case_id":case_id


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
                    "notification_message_title":"Successful",
                    "notification_message_color":"green",
                    "reveal":"alert-reveal"

                })
            }else{
                this.setState({

                    "notification_message":notification_content.message,
                    "notification_message_title":"There is something wrong",
                    "notification_message_color":"red",
                    "reveal":"alert-reveal"

                })
            }
        }

    }


    searchCases=(notification_content)=>{

        if (Object.keys(notification_content).length==0){

            this.setState({

                "displaying": "search_cases"

            })
        } else {
            if(notification_content.validation){
                this.setState({

                    "notification_message":notification_content.message,
                    "notification_message_title":"Successful",
                    "notification_message_color":"green",
                    "reveal":"alert-reveal"

                    })
            
            }else{

                this.setState({

                    "notification_message":notification_content.message,
                    "notification_message_title":"There is something wrong",
                    "notification_message_color":"red",
                    "reveal":"alert-reveal"

                    })


            }

        }



    }


    addNewCase= ()=>{

        this.setState({
            "displaying":'add_new_case'
        })

    }


    comment_notification=(notification_content)=>{

        
        if(notification_content.validation){
            this.setState({

                "notification_message":notification_content.message,
                "notification_message_title":"Successful",
                "notification_message_color":"green",
                "reveal":"alert-reveal"

                })
        
        }else{

            this.setState({

                "notification_message":notification_content.message,
                "notification_message_title":"There is something wrong",
                "notification_message_color":"red",
                "reveal":"alert-reveal"

                })


        }
          



    }



    

    notification_panel_dissapear=()=>{

        this.setState({
            "reveal":""
        })

    }
    

    server_error=(notification_content)=>{


        
            this.setState({

                "notification_message":notification_content.message,
                "notification_message_title":"Oops!!",
                "notification_message_color":"yellow",
                "reveal":"alert-reveal"

                })
        
        
          
    }


    burger = () => {
        this.setState({
          drop_burger: !this.state.drop_burger
        })
    }


    render(){


        return(
            <React.Fragment>
            <NotificationPanel className_reveal={this.state.reveal} message={this.state.notification_message} color={this.state.notification_message_color} title={this.state.notification_message_title} onClickPanelDissappear={this.notification_panel_dissapear}/>

            <nav className="navbar navbar-expand-lg navbar-dark nav-mobile-pad-size"   style={{ "backgroundImage": "linear-gradient(black, blue)"}}>
                <a className="navbar-brand mx-4" href="#"><img src={logo_skull} className="logo-skull" style={{"height":"60px"}} alt="logo_skull"/><img src={logo_text}  alt="logo-text" style={{"margin":"0px", "height":"75px"}}/></a>
                <button className="navbar-toggler mx-1" type="button" data-toggle="collapse" onClick={this.burger} data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${this.state.drop_burger ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav mx-4">
                        <li className="nav-item">
                            <a className='nav-link' onClick={()=>{this.listCases({})}}  style={(this.state.displaying === 'list_cases') ? {"background":'rgb(0, 247, 255)',"color":'blue'} : {"color":'rgb(0, 247, 255)'}} href="#">List Cases</a>
                        </li>
                        <li className="nav-item">
                            <a className='nav-link' onClick={()=>this.searchCases({})} style={(this.state.displaying === 'search_cases') ? {"background":'rgb(0, 247, 255)',"color":'blue'} : {"color":'rgb(0, 247, 255)'}} href="#">Search Case</a>
                        </li>
                        <li className="nav-item">
                            <a className='nav-link' onClick={this.addNewCase} style={(this.state.displaying === 'add_new_case') ? {"background":'rgb(0, 247, 255)',"color":'blue'} : {"color":'rgb(0, 247, 255)'}} href="#">Add Case</a>
                        </li>
                        <li className="nav-item">
                            <a className='nav-link' onClick={this.addNewCase} style={(this.state.displaying === '') ? {"background":'rgb(0, 247, 255)',"color":'blue'} : {"color":'rgb(0, 247, 255)'}} href="#">About Us</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="full-menu-space">
                <div className="full-menu">
                    <div className="main-logo">
                        <a className="navbar-brand mx-4" href="#"><img src={logo_skull} className="logo-skull" style={{"width":"20%"}} alt="logo_skull"/><img src={logo_text} style={{"width":"70%"}} alt="logo_text"/></a>
                    </div>
                    <nav class="nav flex-column nav-button-group">   
                        <a class="nav-link" onClick={()=>{this.listCases({})}} style={(this.state.displaying === 'list_cases') ? {"background":'rgb(0, 247, 255)',"color":'blue', "border-radius":'18px'} : {"color":'rgb(0, 247, 255)'}} href="#"><h2>List Cases</h2></a>
                        <a class="nav-link" onClick={()=>this.searchCases({})} style={(this.state.displaying === 'search_cases') ? {"background":'rgb(0, 247, 255)',"color":'blue', "border-radius":'18px'} : {"color":'rgb(0, 247, 255)'}} href="#"><h2>Search Cases</h2></a>
                        <a class="nav-link" onClick={this.addNewCase} style={(this.state.displaying === 'add_new_case') ? {"background":'rgb(0, 247, 255)',"color":'blue', "border-radius":'18px'} : {"color":'rgb(0, 247, 255)'}}href="#"><h2>Add Case</h2></a>
                        <a class="nav-link" onClick={this.addNewCase} style={(this.state.displaying === '') ? {"background":'rgb(0, 247, 255)',"color":'blue', "border-radius":'18px'} : {"color":'rgb(0, 247, 255)'}}href="#"><h2>About Us</h2></a>
                    </nav>
                </div>
            </div>
            <main className="main-content">
                {this.displayPanel()}
            </main>
        </React.Fragment>)

    }

}