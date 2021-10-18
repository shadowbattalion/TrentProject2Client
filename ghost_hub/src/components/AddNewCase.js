import React from 'react'
import axios from 'axios'
export default class AddNewCase extends React.Component {

    url_api = ""

    state = {
        "email_address":"",
        "display_name":"",
        "occupation":"",
        "age":"",
        "company_name":"",
        "case_title":"",
        "generic_description":"",
        "location":"",
        "date":"",
        "entity_tags":[],
        "type_of_activity":"",
        "encounters":[
                       
                   ],
        new_sightings_description:"",
        edit_mode:{
            "_id":0
        },
        edit_sightings_description:""

   }

   display_form_main(){

    // console.log(this.props.entity_tags_list)

    return(
        <React.Fragment>
            <main>
                <h2>Witness Particulars</h2>
                <div id="witness">
                    <label>Display Name</label>
                    <input type="text" name="display_name" className="form-control" value={this.state.display_name} onChange={this.update_encounter_field} />
                    <label>Ocupation</label>
                    <input type="text" name="occupation" className="form-control" value={this.state.occupation} onChange={this.update_encounter_field} />
                    <label>Age</label>
                    <input type="text" name="age" className="form-control" value={this.state.age} onChange={this.update_encounter_field} />
                    <label>Company Name</label>
                    <input type="text" name="company_name" className="form-control" value={this.state.company_name} onChange={this.update_encounter_field} />
                    <label>Email address</label>
                    <input type="text" name="email_address" className="form-control" value={this.state.email_address} onChange={this.update_encounter_field} />
                </div>
                <div id="case">
                    <h2>Case Details</h2>
                    <label>Title</label>
                        <input type="text" name="case_title" className="form-control" value={this.state.case_title} onChange={this.update_encounter_field} />
                    <label>Description</label>
                        <input type="text" name="generic_description" className="form-control" value={this.state.generic_description} onChange={this.update_encounter_field} />
                    <label>Location</label>
                        <input type="text" name="location" className="form-control" value={this.state.location} onChange={this.update_encounter_field} />
                    <label>Date Of Incident: </label>
                        <input type="date" name="date" className="" value={this.state.date} onChange={this.update_encounter_field} />
                    

                </div>
            </main>
        </React.Fragment>

    )

   }


    display_added_encounters(){

        let encounter_jsx=[]

        
        for(let encounter of this.state.encounters){

            let each_encounter=""

            if(encounter._id==this.state.edit_mode._id && this.state.edit_mode._id != 0){

                each_encounter = (
                    <React.Fragment key={encounter._id}>
                        <div>    
                            {this.display_edit_form_encounters()}
                        </div>
                    </React.Fragment>)
                
            } else{

                each_encounter = (
                    <React.Fragment key={encounter._id}>
                        <div>    
                            {encounter.sightings_description}
                            <button className="btn btn-success btn-sm" onClick={()=>{this.edit_mode_activated(encounter)}}>Edit</button>
                            <button className="btn btn-danger btn-sm mx-1" onClick={()=>{this.delete_encounter(encounter)}}>Delete</button>
                        </div>
                    </React.Fragment>)


            }

            encounter_jsx.push(each_encounter)
        
        }



        return encounter_jsx

    }


    display_edit_form_encounters(){

        return(

            <React.Fragment>
                    <label>Description</label>
                    <input type="text" name="edit_sightings_description" className="form-control" value={this.state.edit_sightings_description} onChange={this.update_encounter_field} />
                    <button className="btn btn-success btn-sm" onClick={this.edit_encounter}>Done!</button>


            </React.Fragment>

        )

    }



    display_form_encounters(){

        

        return(
            <React.Fragment>
                <label>Description</label>
                <input type="text" name="new_sightings_description" className="form-control" value={this.state.new_sightings_description} onChange={this.update_encounter_field} />
                <button className="btn btn-success btn-sm" onClick={this.add_encounter}>Add!</button>


            </React.Fragment>

        )




    }


    update_encounter_field=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    add_encounter=()=>{

        let new_encounter={
            "_id":"front_end_id"+new Date().valueOf()+"/"+Math.floor(Math.random()*(10000-1000+1)+1000),
            "sightings_description":this.state.new_sightings_description

        }
        
        this.state.new_sightings_description=""
        
        this.setState({
            'encounters': [...this.state.encounters, new_encounter]
        })
    }


    delete_encounter = (encounter_delete) =>{

        let encounters_list=this.state.encounters
   
        let index_to_delete = encounters_list.findIndex(encounter=>encounter._id==encounter_delete._id)
   
        let new_encounter_list=[...encounters_list.slice(0,index_to_delete), ...encounters_list.slice(index_to_delete+1)]
   
        this.setState({
   
           "encounters":new_encounter_list
   
        })
   
   
   
    }


    edit_mode_activated=(encounter)=>{
        this.setState({

            edit_mode:encounter,
            edit_sightings_description:encounter.sightings_description

        })

    }

      

    edit_encounter = () =>{


        let edited_encounter = {
            
            "_id":this.state.edit_mode._id,
            "sightings_description":this.state.edit_sightings_description
        }
        
        let index_to_edit = this.state.encounters.findIndex( encounter => encounter._id == edited_encounter._id);
        
        
        let updated_encounters = [...this.state.encounters.slice(0, index_to_edit), edited_encounter, ...this.state.encounters.slice(index_to_edit+1)]

        this.setState({
            "encounters": updated_encounters,
            'edit_mode':{
                '_id':0
            }
        })



    }




    
    



    render() {
        return (<React.Fragment>
            <h1>Add a Case</h1>
            {this.display_form_main()}
            {this.display_added_encounters()}
            {this.display_form_encounters()}
        </React.Fragment>)
    }







}