import React from 'react'
import axios from 'axios'
import logo_skull_loading from '../images/logo-skull-loading.png'
export default class ListCases extends React.Component {

    url_api = this.props.url_api

    state = {
        "page_loaded":false,
        "api_data": []
    }
    
    componentDidMount=async()=>{
        try{
            this.setState({
                "page_loaded":true
            })
            let response = await axios.get(this.url_api + "/cases")
            this.setState({
                'api_data': response.data,
                "page_loaded":false
            })
        }catch(e){


            let notification_content={
                validation:false,
                message:"Server Error. Please contact the administrator"

            }
            this.props.onServerError(notification_content)


        }

    }

    display_loading_page(){

        return(
            <React.Fragment>
                <section style={{"position":"relative", "marginTop":"25%"}}>
                    <div className="loading-page">
                        <img src={logo_skull_loading} className="logo-skull" style={{"opacity":"0.3","height":"60px", "marginRight":"10px"}} alt="logo_skull"/>
                        <h1 className="font-primary font-size-section-divider" style={{"opacity":"0.3", "fontSize":"40px"}}>Starting up the backend (using free version of Render)...</h1>
                    </div>
                </section>
            </React.Fragment>
        )


    }

    display_api_data(){
    
        let cases_jsx=[]

        for(let witness of this.state.api_data){

            for(let each_case of witness.cases){

                let each_case_jsx=(
                    <React.Fragment key={each_case._id}>
                        <section className="panel">
                            <div className="panel-head">
                                <h2 className="font-title font-title-limit font-primary">{each_case.case_title}</h2>
                                <h3 className="font-display-name font-secondary">{witness.display_name}</h3> 
                            </div>
                            <div className="panel-line"></div>
                            <div className="panel-main my-4">
                                <label className="font-labels font-primary">Description</label>
                                <p className="font-description font-description-limit font-secondary">{each_case.generic_description}</p>
                                <label className="font-labels font-primary">Date of Encounter</label>
                                <p className="font-description font-secondary">{each_case.date.split("T")[0]}</p>
                            </div>
                            <div className="panel-button-group justify-content-end">
                                <button className="btn panel-button font-primary" onClick={()=>{this.props.onEnterEachCase({},each_case._id)}}>Continue...</button>
                            </div>
                        </section>
                    </React.Fragment>

                )

                cases_jsx.push(each_case_jsx)
            }




        }

    
        return cases_jsx


    }


    render() {
        
        return (<React.Fragment>
                <section className="panel panel-page-title">
                    <h1 className="font-primary font-size-section-divider">Cases</h1>
                </section>
                {this.state.page_loaded?this.display_loading_page():this.display_loading_page()}
        </React.Fragment>)
    }







}