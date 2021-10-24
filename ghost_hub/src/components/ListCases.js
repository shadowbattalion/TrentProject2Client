import React from 'react'
import axios from 'axios'
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
                <h1>LOADING PAGE.</h1>
                <h2>Please Wait...</h2>

            </React.Fragment>
        )


    }

    display_api_data(){
    
        let cases_jsx=[]

        for(let witness of this.state.api_data){

            for(let each_case of witness.cases){

                let each_case_jsx=(
                    <React.Fragment key={each_case._id}>
                        <div>
                            <ul>
                                <li>Title: {each_case.case_title}</li>
                                <li>Description: {each_case.generic_description}</li>
                                {/* <li>Rating: {each_case.rating}</li> */}
                                <li>Date: {each_case.date}</li>
                                <li>{witness.occupation}</li>
                                <li>{witness.gender}</li>
                                <li>{witness.age}</li>
                                <li>{witness.display_name}</li>                                   
                            </ul>
                            <button className="btn btn-success btn-sm" onClick={()=>{this.props.onEnterEachCase({},each_case._id)}}>Continue...</button>
                        </div>
                    </React.Fragment>

                )

                cases_jsx.push(each_case_jsx)
            }




        }

    
        return cases_jsx


    }


    render() {
        
        return (<React.Fragment>
            <h1>List Cases</h1>
            {this.state.page_loaded?this.display_loading_page():this.display_api_data()}
        </React.Fragment>)
    }







}