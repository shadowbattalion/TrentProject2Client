import React from 'react'
import axios from 'axios'
export default class EachCase extends React.Component {


    state = {
        "page_loaded":false,
        "case":{},
        "witness":{},
        "comments":[],
        "new_content":"",
        "new_like":0,
        "edit_mode":{
            "_id":0
        },
        "edit_content":"",
        "edit_like":0,
    }

    componentDidMount= async() => {

        this.setState({
            "page_loaded":true
        })
        let response = await axios.get(this.props.url_api + "/case/"+this.props.case_id) 

        this.setState({
            "case":response.data[0],
            "comments":response.data[0].comments,
            "witness":response.data[1],
            "page_loaded":false
        })
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
                    <button className="btn btn-success btn-sm" onClick={()=>{this.props.onListCases({})}}>Back</button>
                    <button className="btn btn-success btn-sm" onClick={()=>{this.props.onEditEachCase(this.state.case._id)}}>Edit</button>
                    <button className="btn btn-success btn-sm" onClick={this.props.onDeleteEachCase}>Delete</button>
                </div>
            </React.Fragment>

            )


    
        return each_case_jsx


    }



    display_added_comments=()=>{

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
        
        let value=""
        if(this.state.edit_like=="1"){
 
            value="0"


        }else if(this.state.edit_like=="0"){

            value="1"


        }
        
        return(
            
            <React.Fragment>
                <label>Enter your comments</label>
                <input type="text" name="edit_content" className="form-control" value={this.state.edit_content} onChange={this.update_any_field} /> 
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" name="edit_like" value={value} onChange={this.update_any_field} checked={this.state.edit_like=="1"}/>
                    <label class="form-check-label" for="flexSwitchCheckChecked">Like</label>
                </div>
                <button className="btn btn-success btn-sm" onClick={this.edit_comment}>Done!</button>
            </React.Fragment>

        )

    }



    display_form_comments(){

        let value=""
        if(this.state.new_like=="1"){
 
            value="0"


        }else if(this.state.new_like=="0"){

            value="1"


        }
        

        return(
            <React.Fragment>
                <label>Enter your comments</label>
                <input type="text" name="new_content" className="form-control" value={this.state.new_content} onChange={this.update_any_field} /> 
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" name="new_like" value={value} onChange={this.update_any_field} checked={this.state.new_like=="1"}/>
                    <label class="form-check-label" for="flexSwitchCheckChecked">Like</label>
                </div>
                <button className="btn btn-success btn-sm" onClick={this.add_comment}>Add!</button>
            </React.Fragment>)

    }


    update_any_field=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    add_comment= async ()=>{

        let new_comment={
            "_id":"front_end_id"+new Date().valueOf()+"/"+Math.floor(Math.random()*(10000-1000+1)+1000),
            "content":this.state.new_content,
            "like":this.state.new_like
        
        }
        
        // this.state.new_sightings_description=""
        
        this.setState({
            "comments": [...this.state.comments, new_comment],
            "new_content":"",
            "new_like":false,
        })

        let outcome = await axios.post(this.props.url_api + "/post_comment",{
            "case_id":this.props.case_id,
            "content":new_comment.content,
            "like":new_comment.like

        }) 
        console.log(outcome)
        
    }


    delete_comment = async (comment_delete) =>{

        let comments_list=this.state.comments
   
        let index_to_delete = comments_list.findIndex(comment=>comment._id==comment_delete._id)
   
        let new_comment_list=[...comments_list.slice(0,index_to_delete), ...comments_list.slice(index_to_delete+1)]
        new_comment_list=[...new_comment_list, {"_id":comment_delete._id}] // to indicate deleted comment
   
        this.setState({
   
           "comments":new_comment_list
   
        })
        console.log(comment_delete._id)
        let outcome = await axios.delete(this.props.url_api + "/delete_comment/"+comment_delete._id) 
        console.log(outcome)
   
    }


    edit_mode_activated=(comment)=>{
        this.setState({

            "edit_mode":comment,
            "edit_content":comment.content,
            "edit_like":comment.like

        })

    }

      

    edit_comment = async () =>{


        let edited_comment = {
            
            "_id":this.state.edit_mode._id,
            "content":this.state.edit_content,
            "like":this.state.edit_like

        }
        
        let index_to_edit = this.state.comments.findIndex( comment => comment._id == edited_comment._id);
        
        
        let updated_comments = [...this.state.comments.slice(0, index_to_edit), edited_comment, ...this.state.comments.slice(index_to_edit+1)]

        this.setState({
            "comments": updated_comments,
            'edit_mode':{
                '_id':0
            },
            "edit_content":"",
            "edit_like":false
        })

        let outcome = await axios.put(this.props.url_api + "/edit_comment/"+edited_comment._id,{
            "content":edited_comment.content,
            "like":edited_comment.like
        }) 
        console.log(outcome)

    }


    


    render() {
        let render_items=""
        if(this.state.page_loaded){
            render_items=(<React.Fragment>{this.display_loading_page()}</React.Fragment>)
            
        }else{
            render_items=(<React.Fragment>
                <h2>Cased Number: {this.props.each_case_id}</h2>
                {this.display_api_data()}
                {this.display_added_comments()}
                {this.display_form_comments()}
                </React.Fragment>)
            
        }
        return (<React.Fragment>
            <h1>Each Case</h1>
            {render_items}
        </React.Fragment>)
    }







}