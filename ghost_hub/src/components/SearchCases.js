import React from 'react'
import axios from 'axios'
export default class ListCases extends React.Component {

    url_api = this.props.url_api

    state = {
        "page_loaded":false,
        "entity_tags_list":[],
        "search_entity_tags":[],
        "from_date":"",
        "to_date":"",
        "api_data":[]

    }

    componentDidMount=async()=>{
        try{
            this.setState({
                "page_loaded":true
            })
            let entity_tags = await axios.get(this.props.url_api + "/list_entity_tags")
            //add default tag
            entity_tags.data.map(tag=>{

                if(tag.entity=="Others"){
                    this.setState({
                        "search_entity_tags":[tag._id]
                    })
                }


            })
             
            this.setState({
                "entity_tags_list":entity_tags.data,
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
    

    display_form_search=()=>{

        let entity_tags_list_jsx = []
        

        for (let entity_tag of this.state.entity_tags_list){ 
            entity_tags_list_jsx.push(<option value={entity_tag._id}>{entity_tag.entity}</option>)
        }

        
        return(<React.Fragment>
            <label>Entity Tags:</label>
            <select onChange={this.update_multivalue_field}  value={this.state.search_entity_tags} name="search_entity_tags" className="form-select" multiple aria-label="multiple select example">
                {entity_tags_list_jsx}
            </select>
            <label>From Date: </label>
            <input type="date" name="from_date" className="" value={this.state.from_date} onChange={this.update_any_field} />
            <label>To Date: </label>
            <input type="date" name="to_date" className="" value={this.state.to_date} onChange={this.update_any_field} />
            <button className="btn btn-success btn-sm" onClick={this.search_case}>Search</button>

        </React.Fragment>)





    }


    update_any_field=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    update_multivalue_field=(e)=>{

        let entity_tags_chosen=this.state[e.target.name]

        console.log(entity_tags_chosen)

        let updated_entity_tags_chosen = []

        if(entity_tags_chosen.includes(e.target.value)){

            let unchosen_index = entity_tags_chosen.indexOf(e.target.value)
            updated_entity_tags_chosen = [...entity_tags_chosen.slice(0,unchosen_index), ...entity_tags_chosen.slice(unchosen_index+1)]
        } else {

            updated_entity_tags_chosen = [...entity_tags_chosen, e.target.value]
        
        }

        this.setState({

            [e.target.name]:updated_entity_tags_chosen

        })


    }

    display_api_data(){
    
        if(this.state.api_data){
            let cases_jsx=[]

            for(let witness of this.state.api_data){
                
                let each_case_jsx=(
                    <React.Fragment key={witness.case._id}>
                        <div>
                            <ul>
                                <li>Title: {witness.case.case_title}</li>
                                <li>Description: {witness.case.generic_description}</li>
                                <li>Date: {witness.case.date}</li>
                                <li>{witness.occupation}</li>
                                <li>{witness.gender}</li>
                                <li>{witness.age}</li>
                                <li>{witness.display_name}</li>                                   
                            </ul>
                            <button className="btn btn-success btn-sm" onClick={()=>{this.props.onEnterEachCase({},witness.case._id)}}>Continue...</button>
                        </div>
                    </React.Fragment>

                    )

                    cases_jsx.push(each_case_jsx)
                




            }

        
            return cases_jsx

        } else {

            return(<React.Fragment></React.Fragment>)

        }


    }

   

    search_case= async()=>{
        try{
                            
            let search_case = await axios.get(this.url_api + '/search_cases', {

                params: { 
                    "search_entity_tags":this.state.search_entity_tags,
                    "from_date":this.state.from_date,
                    "to_date":this.state.to_date 
                } 

            })


            if(search_case){

                this.setState({
                    'api_data': search_case.data,
                        
                })
            }

                
        

        } catch (e) {
            
     

            let notification_content={
                validation:false,
                message:"Server Error. Please contact the administrator"

            }
            this.props.onServerError(notification_content)

       
        }


    }










    


    render() {
        
        let render_items=""
        if(this.state.page_loaded){
            render_items=(<React.Fragment>{this.display_loading_page()}</React.Fragment>)
            
        }else{
            render_items=(<React.Fragment>
                {this.display_form_search()}
                {this.display_api_data()}
                </React.Fragment>)
            
        }


        return (<React.Fragment>
            <h1>Search Cases</h1>
            {render_items}
        </React.Fragment>)
    }







}