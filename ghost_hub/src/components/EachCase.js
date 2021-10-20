import React from 'react'
import axios from 'axios'
export default class EachCase extends React.Component {

    url_api = this.props.url_api

    state = {
        'api_data': [
           
        ]
    }

   

    display_api_data(){
    
        let each_case = this.props.each_case_data[0]
        let witness = this.props.each_case_data[1]
        

        let each_case_jsx=(
            <React.Fragment>
                <div>
                    <ul>
                        <li>Title: {each_case.case_title}</li>
                        <li>Description: {each_case.generic_description}</li>
                        <li>Date: {each_case.date}</li>
                        <li>{witness.occupation}</li>
                        <li>{witness.age}</li>
                        <li>{witness.display_name}</li>
                                                          
                    </ul>
                    <button className="btn btn-success btn-sm" onClick={this.props.onExitEachCase}>Back</button>
                    <button className="btn btn-success btn-sm" onClick={()=>{this.props.onEditEachCase(each_case._id)}}>Edit</button>
                    <button className="btn btn-success btn-sm" onClick={this.props.onDeleteEachCase}>Delete</button>
                </div>
            </React.Fragment>

            )


    
        return each_case_jsx


    }



    render() {
        return (<React.Fragment>
            <h1>Each Case</h1>
            <h2>Cased Number: {this.props.each_case_id}</h2>
            
            {this.display_api_data()}            
        </React.Fragment>)
    }







}