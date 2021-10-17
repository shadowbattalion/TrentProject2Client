import React from 'react'
import axios from 'axios'
export default class EditEachCase extends React.Component {

    url_api = ""

    state = {
        'api_data': [
           
        ]
    }

    // async componentDidMount(){
    //     let response = await axios.get(this.url_api + "cases")
    //     this.setState({
    //         'api_data': response.data
    //     })

    // }

    

    

    render() {
        
        return (<React.Fragment>
            <h1>Edit Each Cases</h1>
            
        </React.Fragment>)
    }







}