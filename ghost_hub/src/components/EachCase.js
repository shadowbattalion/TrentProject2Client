import React from 'react'
import axios from 'axios'
export default class EachCase extends React.Component {

    url_api = "https://3002-peach-possum-1zbabb9y.ws-us17.gitpod.io/"

    state = {
        'api_data': [
           
        ]
    }

    async componentDidMount(){
        let response = await axios.get(this.url_api + "case/"+this.props.each_case_id)
        console.log(this.props.each_case_id)
        console.log(response.data)
        this.setState({
            'api_data': response.data
        })

    }



    display_api_data(){
    
        let cases_jsx=[]

        let each_case = this.state.api_data[0]
        let witness = this.state.api_data[1]
        

        let each_case_jsx=(
            <React.Fragment>
                <div>
                    <ul>
                        <li>{each_case._id?each_case._id:"Nothing"}</li>
                                                          
                    </ul>
                    <button className="btn btn-success btn-sm" onClick={this.props.onExitEachCase}>Back</button>
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