import React from 'react'
import axios from 'axios'
export default class ListCases extends React.Component {

    url_api = this.props.url_api

    state = {
        "page_loaded":false,
        "entity_tags_list":[],
        "search_entity_tags":[]
    }

    componentDidMount=async()=>{
        try{
            this.setState({
                "page_loaded":true
            })
            let entity_tags = await axios.get(this.props.url_api + "/list_entity_tags") 
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

        </React.Fragment>)





    }


    update_multivalue_field=(e)=>{

        let entity_tags_chosen=this.state[e.target.name]

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
    
        // let cases_jsx=[]

        // for(let witness of this.state.api_data){

        //     for(let each_case of witness.cases){

        //         let each_case_jsx=(
        //             <React.Fragment key={each_case._id}>
        //                 <div>
        //                     <ul>
        //                         <li>Title: {each_case.case_title}</li>
        //                         <li>Description: {each_case.generic_description}</li>
        //                         <li>Date: {each_case.date}</li>
        //                         <li>{witness.occupation}</li>
        //                         <li>{witness.gender}</li>
        //                         <li>{witness.age}</li>
        //                         <li>{witness.display_name}</li>                                   
        //                     </ul>
        //                     <button className="btn btn-success btn-sm" onClick={()=>{this.props.onEnterEachCase({},each_case._id)}}>Continue...</button>
        //                 </div>
        //             </React.Fragment>

        //         )

        //         cases_jsx.push(each_case_jsx)
        //     }




        // }

    
        // return cases_jsx

        return(<React.Fragment></React.Fragment>)


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