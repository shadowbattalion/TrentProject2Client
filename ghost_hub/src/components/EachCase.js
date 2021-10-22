import React from 'react'
import axios from 'axios'
export default class EachCase extends React.Component {


    state = {
        "case":{},
        "witness":{},
        "comments":[],
        "new_content":"",
        "new_like":false,
        "edit_mode":{
            "_id":0
        },
        "edit_content":"",
        "edit_like":false,
    }

    

    display_api_data(){
    
        
        console.log(this.state.case)

        let each_case_jsx=(
            <React.Fragment>
                <div>
                    <ul>
                        <li>Title: {this.state.case.case_title}</li>
                        <li>Description: {this.state.case.generic_description}</li>
                        <li>Date: {this.state.case.date}</li>
                        <li>{this.state.witness.occupation}</li>
                        <li>{this.state.witness.age}</li>
                        <li>{this.state.witness.display_name}</li>
                                                          
                    </ul>
                    <button className="btn btn-success btn-sm" onClick={this.props.onExitEachCase}>Back</button>
                    <button className="btn btn-success btn-sm" onClick={()=>{this.props.onEditEachCase(this.state.case._id)}}>Edit</button>
                    <button className="btn btn-success btn-sm" onClick={this.props.onDeleteEachCase}>Delete</button>
                </div>
            </React.Fragment>

            )


    
        return each_case_jsx


    }



    display_comments=()=>{

        let comment_jsx=[]

        comment_jsx[0]=(
            <React.Fragment>
                <h2>Comments</h2>
            </React.Fragment>
        )
        
        for(let comment of this.state.comments){

            let each_comment=""

            if(comment._id==this.state.edit_mode._id && this.state.edit_mode._id != 0){

                each_comment = (
                    <React.Fragment key={comment._id}>
                        <div>    
                            {this.display_edit_form_comments()}
                        </div>
                    </React.Fragment>)
                
            }else{

                each_comment = (
                    <React.Fragment key={comment._id}>
                        <div>    
                            {comment.content}
                            {comment.like}
                            <button className="btn btn-success btn-sm" onClick={()=>{this.edit_mode_activated(comment)}}>Edit</button>
                            <button className="btn btn-danger btn-sm mx-1" onClick={()=>{this.delete_comment(comment)}}>Delete</button>
                        </div>
                    </React.Fragment>)


            }

            comment_jsx.push(each_comment)
        
        }



        return comment_jsx








    }


    display_edit_form_comments(){

        return(

            <React.Fragment>
                <label>Enter your comments</label>
                <input type="text" name="edit_content" className="form-control" value={this.state.edit_content} onChange={this.update_any_field} /> 
                <button className="btn btn-success btn-sm" onClick={this.edit_encounter}>Done!</button>
            </React.Fragment>

        )

    }



    display_form_comments(){

        

        return(
            <React.Fragment>
                <label>Enter your comments</label>
                <input type="text" name="new_content" className="form-control" value={this.state.new_content} onChange={this.update_any_field} /> 
                <button className="btn btn-success btn-sm" onClick={this.add_encounter}>Add!</button>
            </React.Fragment>)

    }


    update_any_field=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    add_comment=()=>{

        let new_comment={
            "content":"",
            "like":false,
        
        }
        
        this.state.new_sightings_description=""
        
        this.setState({
            "comments": [...this.state.comments, new_comment],
            "new_content":"",
            "new_like":false,
        })

        
    }


    delete_comment = (comment_delete) =>{

        let comments_list=this.state.comments
   
        let index_to_delete = comments_list.findIndex(comment=>comment._id==comment_delete._id)
   
        let new_comment_list=[...comments_list.slice(0,index_to_delete), ...comments_list.slice(index_to_delete+1)]
        new_comment_list=[...new_comment_list, {"_id":comment_delete._id}] // to indicate deleted comment
   
        this.setState({
   
           "comments":new_comment_list
   
        })
   
   
   
    }


    edit_mode_activated=(comment)=>{
        this.setState({

            "edit_mode":comment,
            "edit_image":comment.image,
            "edit_sightings_description":comment.sightings_description,  
            "edit_equipment_used":comment.equipment_used,
            "edit_contact_type":comment.contact_type,
            "edit_number_of_entities":comment.number_of_entities,
            "edit_time_of_comment":comment.time_of_comment

        })

    }

      

    edit_comment = () =>{


        let edited_comment = {
            
            "_id":this.state.edit_mode._id,
            "image":this.state.edit_image,
            "sightings_description":this.state.edit_sightings_description,
            "equipment_used":this.state.edit_equipment_used,
            "contact_type":this.state.edit_contact_type,
            "number_of_entities":this.state.edit_number_of_entities,
            "time_of_comment":this.state.edit_time_of_comment

        }
        
        let index_to_edit = this.state.comments.findIndex( comment => comment._id == edited_comment._id);
        
        
        let updated_comments = [...this.state.comments.slice(0, index_to_edit), edited_comment, ...this.state.comments.slice(index_to_edit+1)]

        this.setState({
            "comments": updated_comments,
            'edit_mode':{
                '_id':0
            },
            "edit_image":"",
            "edit_sightings_description":"",
            "edit_equipment_used":[],
            "edit_contact_type":[],
            "edit_number_of_entities":0,
            "edit_time_of_comment":""
        })



    }


    componentDidMount= async() => {

        let response = await axios.get(this.props.url_api + "/case/"+this.props.case_id) 

        this.setState({
            "case":response.data[0],
            "witness":response.data[1],
        })
    }


    render() {
        return (<React.Fragment>
            <h1>Each Case</h1>
            <h2>Cased Number: {this.props.each_case_id}</h2>
            {this.display_api_data()}
            {this.display_comments()}
        </React.Fragment>)
    }







}