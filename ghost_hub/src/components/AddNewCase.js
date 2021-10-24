import React from 'react'
import axios from 'axios'
export default class AddNewCase extends React.Component {

    url_api = this.props.url_api

    state = {
        "entity_tags_list":[],
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
        "type_of_activity":"others",
        "encounters":[],
        "new_image":"",
        "new_sightings_description":"",
        "new_equipment_used":[],
        "new_contact_type":[],
        "new_number_of_entities":0,
        "new_time_of_encounter":"",
        "edit_mode":{
            "_id":0
        },
        "edit_image":"",
        "edit_sightings_description":"",
        "edit_equipment_used":[],
        "edit_contact_type":[],
        "edit_number_of_entities":0,
        "edit_time_of_encounter":""

   }

    componentDidMount= async() => {

        let entity_tags = await axios.get(this.props.url_api + "/list_entity_tags") 
        
        this.setState({

            "entity_tags_list":entity_tags.data


        })
    }



    display_form_main(){

    
        let entity_tags_list_jsx = []

        for (let entity_tag of this.state.entity_tags_list){
            entity_tags_list_jsx.push(<option value={entity_tag._id}>{entity_tag.entity}</option>)
        }


        return(
            <React.Fragment>
                <main>
                    <h2>Witness Particulars</h2>
                    <div id="witness">
                        <label>Display Name</label>
                        <input type="text" name="display_name" className="form-control" value={this.state.display_name} onChange={this.update_any_field} />
                        <label>Ocupation</label>
                        <input type="text" name="occupation" className="form-control" value={this.state.occupation} onChange={this.update_any_field} />
                        <label>Age</label>
                        <input type="text" name="age" className="form-control" value={this.state.age} onChange={this.update_any_field} />
                        <label>Company Name</label>
                        <input type="text" name="company_name" className="form-control" value={this.state.company_name} onChange={this.update_any_field} />
                        <label>Email address</label>
                        <input type="text" name="email_address" className="form-control" value={this.state.email_address} onChange={this.update_any_field} />
                    </div>
                    <div id="case">
                        <h2>Case Details</h2>
                        <label>Title</label>
                            <input type="text" name="case_title" className="form-control" value={this.state.case_title} onChange={this.update_any_field} />
                        <label>Description</label>
                            <input type="text" name="generic_description" className="form-control" value={this.state.generic_description} onChange={this.update_any_field} />
                        <label>Location</label>
                            <input type="text" name="location" className="form-control" value={this.state.location} onChange={this.update_any_field} />
                        <label>Date Of Incident: </label>
                            <input type="date" name="date" className="" value={this.state.date} onChange={this.update_any_field} />
                        <label>Activity:</label>
                        <select onChange={this.update_any_field}  value={this.state.type_of_activity} name="type_of_activity" className="form-select" aria-label="Default select example">   
                            <option value="accidental">Accidental</option>
                            <option value="urbex">UrbEx</option>
                            <option value="solo">Solo</option>
                            <option value="paranormal_investigation">Paranormal Investigation</option>
                            <option value="others">Others</option>
                        </select>
                        <label>Entity Tags:</label>
                        <select onChange={this.update_multivalue_field}  value={this.state.entity_tags} name="entity_tags" className="form-select" multiple aria-label="multiple select example">
                            {entity_tags_list_jsx}
                        </select>

                    </div>
                </main>
            </React.Fragment>)

   }


    display_added_encounters(){

        let encounter_jsx=[]

        encounter_jsx[0]=(
            <React.Fragment>
                <h2>Encounter Details</h2>
            </React.Fragment>
        )
        
        for(let encounter of this.state.encounters){

            let each_encounter=""

            if(encounter._id==this.state.edit_mode._id && this.state.edit_mode._id != 0){

                each_encounter = (
                    <React.Fragment key={encounter._id}>
                        <div>    
                            {this.display_edit_form_encounters()}
                        </div>
                    </React.Fragment>)
                
            }else{

                each_encounter = (
                    <React.Fragment key={encounter._id}>
                        <div>    
                            {encounter.image}
                            {encounter.sightings_description}
                            {encounter.equipment_used}
                            {encounter.contact_type}
                            {encounter.number_of_entities}
                            {encounter.time_of_encounter}
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
                <label>Image</label>
                <input type="text" name="edit_image" className="form-control" value={this.state.edit_image} onChange={this.update_any_field} />
                <label>Description</label>
                <input type="text" name="edit_sightings_description" className="form-control" value={this.state.edit_sightings_description} onChange={this.update_any_field} />
                <label>Equipment Used</label>
                <select onChange={this.update_multivalue_field}  value={this.state.edit_equipment_used} name="edit_equipment_used" className="form-select" multiple aria-label="multiple select example">   
                        <option value="Phone Camera">Phone Camera</option>
                        <option value="Camera (fixed)">Camera (fixed)</option>
                        <option value="Camera (portable)">Camera (portable)</option>
                        <option value="Voice Recorder">Voice Recorder</option>
                        <option value="EMF Recorder">EMF Recorder</option>
                        <option value="Thermal Camera">Thermal Camera</option>
                        <option value="Spirit Box">Spirit Box</option> 
                        <option value="Others">Others</option>
                        <option value="None">None</option>
                </select>
                <label>Contact Type</label>
                <select onChange={this.update_multivalue_field}  value={this.state.edit_contact_type} name="edit_contact_type" className="form-select" multiple aria-label="multiple select example">   
                        <option value="Visual">Visual</option>
                        <option value="Audio">Audio</option>
                        <option value="Verbal">Verbal</option>
                        <option value="Feel">Feel</option>
                </select>
                <label>Number of Entities Encountered</label>
                <input type="text" name="edit_number_of_entities" className="form-control" value={this.state.edit_number_of_entities} onChange={this.update_any_field} />
                <label>Time of Encounter</label>
                <select onChange={this.update_any_field}  value={this.state.edit_time_of_encounter} name="edit_time_of_encounter" className="form-select" aria-label="Default select example">   
                        <option value="Early Morning">Early Morning</option>
                        <option value="Dawn">Dawn</option>
                        <option value="Morning">Morning</option>
                        <option value="Midday">Midday</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Dusk">Dusk</option>
                        <option value="Evening">Evening</option>
                        <option value="Midnight">Midnight</option>
                </select>
                <button className="btn btn-success btn-sm" onClick={this.edit_encounter}>Done!</button>


            </React.Fragment>

        )

    }



    display_form_encounters(){

        

        return(
            <React.Fragment>
                <label>Image</label>
                <input type="text" name="new_image" className="form-control" value={this.state.new_image} onChange={this.update_any_field} />
                <label>Description</label>
                <input type="text" name="new_sightings_description" className="form-control" value={this.state.new_sightings_description} onChange={this.update_any_field} />
                <label>Equipment Used</label>
                <select onChange={this.update_multivalue_field}  value={this.state.new_equipment_used} name="new_equipment_used" className="form-select" multiple aria-label="multiple select example">   
                        <option value="Phone Camera">Phone Camera</option>
                        <option value="Camera (fixed)">Camera (fixed)</option>
                        <option value="Camera (portable)">Camera (portable)</option>
                        <option value="Voice Recorder">Voice Recorder</option>
                        <option value="EMF Recorder">EMF Recorder</option>
                        <option value="Thermal Camera">Thermal Camera</option>
                        <option value="Spirit Box">Spirit Box</option> 
                        <option value="Others">Others</option>
                        <option value="None">None</option>
                </select>
                <label>Contact Type</label>
                <select onChange={this.update_multivalue_field}  value={this.state.new_contact_type} name="new_contact_type" className="form-select" multiple aria-label="multiple select example">   
                        <option value="Visual">Visual</option>
                        <option value="Audio">Audio</option>
                        <option value="Verbal">Verbal</option>
                        <option value="Feel">Feel</option>
                </select>
                <label>Number of Entities Encountered</label>
                <input type="text" name="new_number_of_entities" className="form-control" value={this.state.new_number_of_entities} onChange={this.update_any_field} />
                <label>Time of Encounter</label>
                <select onChange={this.update_any_field}  value={this.state.new_time_of_encounter} name="new_time_of_encounter" className="form-select" aria-label="Default select example">   
                        <option value="Early Morning">Early Morning</option>
                        <option value="Dawn">Dawn</option>
                        <option value="Morning">Morning</option>
                        <option value="Midday">Midday</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Dusk">Dusk</option>
                        <option value="Evening">Evening</option>
                        <option value="Midnight">Midnight</option>
                </select>
                
                <button className="btn btn-success btn-sm" onClick={this.add_encounter}>Add!</button>

            </React.Fragment>)

    }


    update_any_field=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
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


    add_encounter=()=>{

        let new_encounter={
            "_id":"front_end_id"+new Date().valueOf()+"/"+Math.floor(Math.random()*(10000-1000+1)+1000),
            "image":this.state.new_image,
            "sightings_description":this.state.new_sightings_description,
            "equipment_used":this.state.new_equipment_used,
            "contact_type":this.state.new_contact_type,
            "number_of_entities":this.state.new_number_of_entities,
            "time_of_encounter":this.state.new_time_of_encounter

        }
        
        if(new_encounter.image && !new_encounter.image.includes("https")){

            this.setState({
                "encounters": [...this.state.encounters, new_encounter],
                "new_image":"",
                "new_sightings_description":"",
                "new_equipment_used":[],
                "new_contact_type":[],
                "new_number_of_entities":0,
                "new_time_of_encounter":""
            })


        } else {

            let error_message=""

            if(!new_encounter.image){

                error_message= (<React.Fragment>

                    <div>Image name is missing</div>
    
                </React.Fragment>)

            }else if(new_encounter.image.includes("https")){

                error_message= (<React.Fragment>

                    <div>Image must have URL name</div>
    
                </React.Fragment>)



            }


        

            let notification_content={
                validation:false,
                message:error_message,
                color:"red"

            }
            this.props.onListCases(notification_content)
            
            


        }
        
        
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

            "edit_mode":encounter,
            "edit_image":encounter.image,
            "edit_sightings_description":encounter.sightings_description,  
            "edit_equipment_used":encounter.equipment_used,
            "edit_contact_type":encounter.contact_type,
            "edit_number_of_entities":encounter.number_of_entities,
            "edit_time_of_encounter":encounter.time_of_encounter

        })

    }

      

    edit_encounter = () =>{


        let edited_encounter = {
            
            "_id":this.state.edit_mode._id,
            "image":this.state.edit_image,
            "sightings_description":this.state.edit_sightings_description,
            "equipment_used":this.state.edit_equipment_used,
            "contact_type":this.state.edit_contact_type,
            "number_of_entities":this.state.edit_number_of_entities,
            "time_of_encounter":this.state.edit_time_of_encounter

        }
        
        let index_to_edit = this.state.encounters.findIndex( encounter => encounter._id == edited_encounter._id);
        
        let updated_encounters = [...this.state.encounters.slice(0, index_to_edit), edited_encounter, ...this.state.encounters.slice(index_to_edit+1)]

        this.setState({
            "encounters": updated_encounters,
            'edit_mode':{
                '_id':0
            },
            "edit_image":"",
            "edit_sightings_description":"",
            "edit_equipment_used":[],
            "edit_contact_type":[],
            "edit_number_of_entities":0,
            "edit_time_of_encounter":""
        })



    }

    // "witness":{
    //     "email_address":this.state.email_address,
    //     "display_name":this.state.display_name,
    //     "occupation":this.state.occupation,
    //     "age":this.state.age,
    //     "company_name":this.state.company_name
    //     },
    // "case": {
    //         "case_title":this.state.case_title,
    //         "generic_description":this.state.generic_description,
    //         "type_of_activity":this.state.type_of_activity,
    //         "location":this.state.location,
    //         "date":this.state.date,
    //         "entity_tags":this.state.entity_tags
    //     },
    // "encounters":this.state.encounters


    front_end_validation=()=>{


        let error_message=[]

        let  display_name=false
        if(this.state.display_name){

            display_name=true

        } else {

            error_message.push((<React.Fragment>

                <div>The display name is missing</div>

            </React.Fragment>))


        }
        
        let  age=false
        if(parseInt(this.state.age<10) || parseInt(this.state.age>120)){ //age must not be alphabet check

            age=true

        } else {

            error_message.push((<React.Fragment>

                <div>Insert a proper age</div>

            </React.Fragment>))


        }

        let company_name=false
        if(this.state.company_name){

            company_name=true

        } else {

            error_message.push((<React.Fragment>

                <div>The company name is missing</div>

            </React.Fragment>))


        }

        let email_address=false
        if(this.state.email_address && this.state.email_address.includes("@")){

            email_address=true

        } else {

            if(!this.state.email_address){
                error_message.push((<React.Fragment>

                    <div>The email address is missing</div>
    
                </React.Fragment>))
            } else {
                error_message.push((<React.Fragment>

                    <div>The email address is inapprpriate format</div>
    
                </React.Fragment>))


            }


        }


        let case_title=false
        if(this.state.case_title){

            case_title=true

        } else {

            error_message.push((<React.Fragment>

                <div>The case title is missing</div>

            </React.Fragment>))

        }


        let location=false
        if(this.state.location){

            location=true

        } else {

            error_message.push((<React.Fragment>

                <div>The location is missing</div>

            </React.Fragment>))

        }

        let date=false
        if(this.state.date){

            date=true

        } else {

            error_message.push((<React.Fragment>

                <div>The date is missing</div>

            </React.Fragment>))


        }

        
        
        let encounters=false
        if(this.state.encounters.length>0){

            encounters=true

        } else {

            error_message.push((<React.Fragment>

                <div>At least 1 encounter is needed</div>

            </React.Fragment>))

        }

        



        return ((display_name && !company_name)||(!display_name && company_name)) && email_address && case_title && location && date && encounters?true:false, error_message
    }


    submit= async ()=>{

        // let add_case = await axios.post(this.url_api + '/add_case', {

        //     "witness":{
        //         "email_address":this.state.email_address,
        //         "display_name":this.state.display_name,
        //         "occupation":this.state.occupation,
        //         "age":this.state.age,
        //         "company_name":this.state.company_name
        //         },
        //     "case": {
        //         "case_title":this.state.case_title,
        //         "generic_description":this.state.generic_description,
        //         "type_of_activity":this.state.type_of_activity,
        //         "location":this.state.location,
        //         "date":this.state.date,
        //         "entity_tags":this.state.entity_tags
        //         },
        //     "encounters":this.state.encounters
        // })
        
        // console.log("Submitted!")

        let validation, error_messages=this.front_end_validation()

        let formated_error_messages= error_messages.map((error_message)=>{return(<React.Fragment><div>{error_message}</div></React.Fragment>)})
        
        if (validation){
            
            let notification_content={
                validation:true,
                message:"Case Added",
                color:"green"

            }
            this.props.onListCases(notification_content)

        }else{
            let notification_content={
                validation:false,
                message:formated_error_messages,
                color:"red"

            }
            this.props.onListCases(notification_content)
        }


    }

    

    



    render() {
        return (<React.Fragment>
            <h1>Add a Case</h1>
            {this.display_form_main()}
            {this.display_added_encounters()}
            {this.display_form_encounters()}
            <button className="btn btn-success btn-sm" onClick={this.submit}>Submit Case!</button>
            <button className="btn btn-success btn-sm" onClick={()=>{this.props.onListCases({})}}>Back</button>
        </React.Fragment>)
    }







}