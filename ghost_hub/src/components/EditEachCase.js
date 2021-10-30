import React from 'react'
import axios from 'axios'
import logo_skull_loading from '../images/logo-skull-loading.png'
export default class EditEachCase extends React.Component {

    url_api = this.props.url_api

    state = {
        "page_loaded":false,
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
        "type_of_activity":"Accidental",
        "encounters":[],
        "new_image":"",
        "new_sightings_description":"",
        "new_equipment_used":[],
        "new_contact_type":[],
        "new_number_of_entities":"",
        "new_time_of_encounter":"Early Morning",
        "edit_mode":{
            "_id":0
        },
        "edit_image":"",
        "edit_sightings_description":"",
        "edit_equipment_used":[],
        "edit_contact_type":[],
        "edit_number_of_entities":"",
        "edit_time_of_encounter":"Early Morning"

    }

    componentDidMount= async() => {
        try{
            this.setState({"page_loaded":true})
            let response = await axios.get(this.props.url_api + "/case/"+this.props.case_id)
            this.setState({

                "page_loaded":false,
                "email_address":response.data[1].email_address,
                "display_name":response.data[1].display_name,
                "occupation":response.data[1].occupation,
                "age":response.data[1].age,
                "company_name":response.data[1].company_name,
                "case_title":response.data[0].case_title,
                "generic_description":response.data[0].generic_description,
                "location":response.data[0].location,
                "date":response.data[0].date.split("T")[0],
                "entity_tags":response.data[0].entity_tags.map(entity_tag=>entity_tag._id),
                "type_of_activity":response.data[0].type_of_activity,
                "encounters":response.data[0].encounters
                


            })

            let entity_tags = await axios.get(this.props.url_api + "/list_entity_tags") 

                    
            this.setState({

                "entity_tags_list":entity_tags.data


            })

        } catch(e){

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
                <section style={{"position":"relative", "marginTop":"25%"}}>
                    <div className="loading-page">
                        <img src={logo_skull_loading} className="logo-skull" style={{"opacity":"0.3","height":"60px", "marginRight":"10px"}} alt="logo_skull"/>
                        <h1 className="font-primary font-size-section-divider" style={{"opacity":"0.3"}}>Loading...</h1>
                    </div>
                </section>
            </React.Fragment>
        )


    }


    display_form_main(){

        
        let entity_tags_list_jsx = []

        for (let entity_tag of this.state.entity_tags_list){
            entity_tags_list_jsx.push(<option value={entity_tag._id}>{entity_tag.entity}</option>)
        }

        let entity_tag_ids_list = []
        let entity_tag_entities_list = []

        for (let entity_tag of this.state.entity_tags_list){
            entity_tag_ids_list.push(entity_tag._id)
        }

        for (let entity_tag of this.state.entity_tags_list){
            entity_tag_entities_list.push(entity_tag.entity)
        }




        return(
            <React.Fragment>
                <section className="panel">
                    <h2 className="font-title font-primary">Case Details</h2>
                    <div className="panel-line"></div>
                    <div className="panel-main my-4"> 
                        <label className="font-labels font-secondary">Title</label>
                        <input type="text" name="case_title" className="form-control font-description font-secondary" value={this.state.case_title} onChange={this.update_any_field} />
                        <label className="font-labels font-secondary">Description</label>
                        <input type="text" name="generic_description" className="form-control font-description font-secondary" value={this.state.generic_description} onChange={this.update_any_field} />
                        <label className="font-labels font-secondary">Location</label>
                        <input type="text" name="location" className="form-control font-description font-secondary" value={this.state.location} onChange={this.update_any_field} />
                        <label className="font-labels font-secondary">Date Of Incident: </label>
                        <input type="date" name="date" className="form-control font-description font-secondary" value={this.state.date} onChange={this.update_any_field} />
                        <label className="font-labels font-secondary">Activity:</label>
                        <select onChange={this.update_any_field}  value={this.state.type_of_activity} name="type_of_activity" className="form-select font-description font-secondary" aria-label="Default select example">   
                            <option value="Accidental">Accidental</option>
                            <option value="Urbex">UrbEx</option>
                            <option value="Solo">Solo</option>
                            <option value="Paranormal Investigation">Paranormal Investigation</option>
                            <option value="others">Others</option>
                        </select>
                        <label className="font-labels font-secondary">Entity Tags:</label>
                        <select onChange={this.update_multivalue_field}  value={this.state.entity_tags} name="entity_tags" className="form-select font-description font-secondary" multiple aria-label="multiple select example">
                            {entity_tags_list_jsx}
                        </select>
                    </div>
                </section>
            </React.Fragment>

        )

   }


    display_added_encounters(){

        let encounter_jsx=[]

        encounter_jsx[0]=(
            <React.Fragment>
                <section className="panel panel-page-title">
                    <h1 className="font-primary font-size-section-divider">Encounter Details</h1>
                </section>
            </React.Fragment>
        )
        
        let i=1
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
                if(encounter.encounter_status!="deleted"){
                    each_encounter = (
                        <React.Fragment key={encounter._id}>
                            <section className="panel">    
                                <h2 className="font-title font-primary">Encounter #{i}</h2>
                                <div className="panel-line"></div>
                                <div className="panel-button-group">
                                    <button className="btn panel-button font-primary" onClick={()=>{this.delete_encounter(encounter)}}>Delete</button>
                                    <button className="btn panel-button font-primary" onClick={()=>{this.edit_mode_activated(encounter)}}>Edit</button>
                                </div>
                            </section>
                        </React.Fragment>)
                }

            }
            i++
            encounter_jsx.push(each_encounter)
        
        }


        encounter_jsx.push((
            <React.Fragment>
                <div>
                    <h1 className="font-primary mx-4" style={{"opacity":"0.3"}}>+ Add an Encounter</h1>
                </div>
            </React.Fragment>))

        return encounter_jsx

    }


    display_edit_form_encounters(){

        return(

            <React.Fragment>
                <section className="panel">
                    <h2 className="font-title font-primary">Edit Encounter</h2>
                    <div className="panel-line"></div>
                    <div className="panel-main my-4"> 
                        <label className="font-labels font-secondary">Image</label>
                        <input type="text" name="edit_image" className="form-control font-description font-secondary" value={this.state.edit_image} onChange={this.update_any_field} />
                        <label className="font-labels font-secondary">Description</label>
                        <input type="text" name="edit_sightings_description" className="form-control font-description font-secondary" value={this.state.edit_sightings_description} onChange={this.update_any_field} />
                        <label className="font-labels font-secondary">Equipment Used</label>
                        <select onChange={this.update_multivalue_field}  value={this.state.edit_equipment_used} name="edit_equipment_used" className="form-select font-description font-secondary" multiple aria-label="multiple select example">   
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
                        <label className="font-labels font-secondary">Contact Type</label>
                        <select onChange={this.update_multivalue_field}  value={this.state.edit_contact_type} name="edit_contact_type" className="form-select font-description font-secondary" multiple aria-label="multiple select example">   
                                <option value="Visual">Visual</option>
                                <option value="Audio">Audio</option>
                                <option value="Verbal">Verbal</option>
                                <option value="Feel">Feel</option>
                        </select>
                        <label className="font-labels font-secondary">Number of Entities Encountered</label>
                        <input type="text" name="edit_number_of_entities" className="form-control font-description font-secondary" value={this.state.edit_number_of_entities} onChange={this.update_any_field} />
                        <label className="font-labels font-secondary">Time of Encounter</label>
                        <select onChange={this.update_any_field}  value={this.state.edit_time_of_encounter} name="edit_time_of_encounter" className="form-select font-description font-secondary" aria-label="Default select example">   
                                <option value="Early Morning">Early Morning</option>
                                <option value="Dawn">Dawn</option>
                                <option value="Morning">Morning</option>
                                <option value="Midday">Midday</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Dusk">Dusk</option>
                                <option value="Evening">Evening</option>
                                <option value="Midnight">Midnight</option>
                        </select>
                    </div>
                    <div className="panel-button-group">
                        <button className="btn panel-button font-primary" onClick={this.edit_mode_cancelled}>Cancel</button>
                        <button className="btn panel-button font-primary" onClick={this.edit_encounter}>Done!</button>
                    </div>           
                </section>
            </React.Fragment>)

    }



    display_form_encounters(){

        return(
            <React.Fragment>
                <section className="panel panel-page-title">
                    <h1 className="font-primary font-size-section-divider">Add an Encounter</h1>
                </section>
                <section className="panel">
                    <h2 className="font-title font-primary">Add Encounter</h2>
                    <div className="panel-line"></div>
                    <div className="panel-main my-4"> 
                        <label className="font-labels font-secondary">Image</label>
                        <input type="text" name="new_image" className="form-control font-description font-secondary" value={this.state.new_image} onChange={this.update_any_field} />
                        <label className="font-labels font-secondary">Description</label>
                        <input type="text" name="new_sightings_description" className="form-control font-description font-secondary" value={this.state.new_sightings_description} onChange={this.update_any_field} />
                        <label className="font-labels font-secondary">Equipment Used</label>
                        <select onChange={this.update_multivalue_field}  value={this.state.new_equipment_used} name="new_equipment_used" className="form-select font-description font-secondary" multiple aria-label="multiple select example">   
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
                        <label className="font-labels font-secondary">Contact Type</label>
                        <select onChange={this.update_multivalue_field}  value={this.state.new_contact_type} name="new_contact_type" className="form-select font-description font-secondary" multiple aria-label="multiple select example">   
                                <option value="Visual">Visual</option>
                                <option value="Audio">Audio</option>
                                <option value="Verbal">Verbal</option>
                                <option value="Feel">Feel</option>
                        </select>
                        <label className="font-labels font-secondary">Number of Entities Encountered</label>
                        <input type="text" name="new_number_of_entities" className="form-control font-description font-secondary" value={this.state.new_number_of_entities} onChange={this.update_any_field} />
                        <label className="font-labels font-secondary">Time of Encounter</label>
                        <select onChange={this.update_any_field}  value={this.state.new_time_of_encounter} name="new_time_of_encounter" className="form-select font-description font-secondary" aria-label="Default select example">   
                                <option value="Early Morning">Early Morning</option>
                                <option value="Dawn">Dawn</option>
                                <option value="Morning">Morning</option>
                                <option value="Midday">Midday</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Dusk">Dusk</option>
                                <option value="Evening">Evening</option>
                                <option value="Midnight">Midnight</option>
                        </select>
                    </div>
                    <div className="panel-button-group justify-content-end">
                        <button className="btn panel-button font-primary" onClick={this.add_encounter}>Add!</button>
                    </div>   
                </section>
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

    add_encounter_validation=()=>{

        let error_message=[]


        let image=false
        
        if(this.state.new_image!="" && /https?:\/\/[^\s].[^\s]*$/.test(this.state.new_image)){

            image=true

        } else {

            
            if(this.state.new_image==""){

                error_message.push( "Image name is missing")

            } else if(!(/https?:\/\/[^\s].[^\s]*$/.test(this.state.new_image))){

                error_message.push("The URL of image is inappropriate format")



            } 


        }


        let equipment_used=false
        if(this.state.new_equipment_used.length>0){

            equipment_used=true

        } else {

            error_message.push("Select at least one equipment")

        }



        let contact_type=false
        if(this.state.new_contact_type.length>0){

            contact_type=true

        } else {

            error_message.push("Select at least 1 contact type")

        }



        let time_of_encounter=false
        if(this.state.new_time_of_encounter){

            time_of_encounter=true

        } else {

            error_message.push("Select 1 time of encounter")

        }






        let number_of_entities=false
        if(this.state.new_number_of_entities && /\d/.test(this.state.new_number_of_entities) && parseInt(this.state.new_number_of_entities)>=1){

            number_of_entities=true

        } else {

            

            if(!this.state.new_number_of_entities){

                error_message.push("Number of entities is missing")

            }else if(!/\d/.test(this.state.new_number_of_entities)){

                error_message.push("Number of entities must be in numbers")



            }else if(!parseInt(this.state.new_number_of_entities)>=1){

                error_message.push("There should be at least 1 entity")



            }


        }

        



        return [image && number_of_entities && equipment_used && contact_type && time_of_encounter?true:false, error_message]
    }




    add_encounter=()=>{

        
        let [validation, error_messages]=this.add_encounter_validation()

        let formated_error_messages= error_messages.map((error_message)=>{return(<React.Fragment><div>Encounter: {error_message}</div></React.Fragment>)})//list rendering using array of primitive(string). Will be rendered in the notification page
        

        if (validation){

            let new_encounter={
                "_id":"front_end_id"+new Date().valueOf()+"/"+Math.floor(Math.random()*(10000-1000+1)+1000),
                "image":this.state.new_image,
                "sightings_description":this.state.new_sightings_description,
                "equipment_used":this.state.new_equipment_used,
                "contact_type":this.state.new_contact_type,
                "number_of_entities":this.state.new_number_of_entities,
                "time_of_encounter":this.state.new_time_of_encounter
    
            }
            
            this.setState({
                "encounters": [...this.state.encounters, new_encounter],
                "new_image":"",
                "new_sightings_description":"",
                "new_equipment_used":[],
                "new_contact_type":[],
                "new_number_of_entities":"",
                "new_time_of_encounter":"Early Morning"
            })


        }else{
            let notification_content={
                validation:false,
                message:formated_error_messages
            }
            this.props.onEnterEachCase(notification_content,this.props.case_id) 
        }

     
            


    }





    delete_encounter = (encounter_delete) =>{

        let encounters_list=this.state.encounters
   
        let index_to_delete = encounters_list.findIndex(encounter=>encounter._id==encounter_delete._id)
   
        let new_encounter_list=[...encounters_list.slice(0,index_to_delete), ...encounters_list.slice(index_to_delete+1)]
        
        if(!encounter_delete._id.includes("front_end_id")){// front_end_id are encounters that are temporarily created in the front end
            new_encounter_list=[...new_encounter_list, {"_id":encounter_delete._id, "encounter_status":"deleted"}] // to indicate deleted encounter
        }

        
   
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

    edit_mode_cancelled=()=>{

        this.setState({

            "edit_mode":{
                "_id":0
            },
            "edit_image":"",
            "edit_sightings_description":"",
            "edit_equipment_used":[],
            "edit_contact_type":[],
            "edit_number_of_entities":"",
            "edit_time_of_encounter":""

        })


    }


    edit_encounter_validation=()=>{

        let error_message=[]

             

        let image=false
        
        if(this.state.edit_image!="" && /https?:\/\/[^\s].[^\s]*$/.test(this.state.edit_image)){

            image=true

        } else {

            
            if(this.state.edit_image==""){

                error_message.push( "Image name is missing")

            } else if(!(/https?:\/\/[^\s].[^\s]*$/.test(this.state.edit_image))){

                error_message.push("The URL of image is inappropriate format")



            } 


        }
        
       

        let equipment_used=false
        if(this.state.edit_equipment_used.length>0){

            equipment_used=true

        } else {

            error_message.push("Select at least one equipment")

        }



        let contact_type=false
        if(this.state.edit_contact_type.length>0){

            contact_type=true

        } else {

            error_message.push("Select at least 1 contact type")

        }



        let time_of_encounter=false
        if(this.state.edit_time_of_encounter){

            time_of_encounter=true

        } else {

            error_message.push("Select 1 time of encounter")

        }






        let number_of_entities=false
        if(this.state.edit_number_of_entities && /\d/.test(this.state.edit_number_of_entities) && parseInt(this.state.edit_number_of_entities)>=1){

            number_of_entities=true

        } else {

            

            if(!this.state.edit_number_of_entities){

                error_message.push("Number of entities is missing")

            }else if(!/\d/.test(this.state.edit_number_of_entities)){

                error_message.push("Number of entities must be in numbers")



            }else if(!parseInt(this.state.edit_number_of_entities)>=1){

                error_message.push("There should be at least 1 entity")



            }


        }

        



        return [image && number_of_entities && equipment_used && contact_type && time_of_encounter?true:false, error_message]
    }

    edit_encounter = () =>{


        let [validation, error_messages]=this.edit_encounter_validation()

        let formated_error_messages = error_messages.map((error_message)=>{return(<React.Fragment><div>Encounter: {error_message}</div></React.Fragment>)})//list rendering using array of primitive(string). Will be rendered in the notification page

        if (validation){


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
                "edit_number_of_entities":"",
                "edit_time_of_encounter":""
            })




        
    

        }else{
            let notification_content={
                validation:false,
                message:formated_error_messages
            }
            this.props.onEnterEachCase(notification_content,this.props.case_id) 
        }


    }

    


    front_end_validation=()=>{


        let error_message=[]

        let  display_name=false
        if(this.state.display_name && this.state.display_name.length<=25){

            display_name=true

        } else {
            if(!this.state.display_name){
                error_message.push("The display name is missing")
            }else if(!this.state.display_name.length<=25){

                error_message.push("Display name must be 25 characters or less")

            }


        }
        
        let age=false
        
        
        if(this.state.age && /\d/.test(this.state.age) && (parseInt(this.state.age)>=10 && parseInt(this.state.age)<=120)){ 

            age=true

        } else {
            if(!this.state.age){

                error_message.push("The age is missing")

            }else if(!/\d/.test(this.state.age)){

                error_message.push("Age must be a number")


            }else if (!(parseInt(this.state.age)>=10 && parseInt(this.state.age)<=120)){
                error_message.push("Insert a proper age from 10 to 120")
            }

        }

        

        let email_address=false
        if(this.state.email_address && /\w*@\w*(\.\w{2,3})+/.test(this.state.email_address)){

            email_address=true

        } else {

            if(!this.state.email_address){
                error_message.push("The email address is missing")

            } else if(!(/\w*@\w*(\.\w{2,3})+/.test(this.state.email_address))){
                error_message.push("The email address is inappropriate format")

            } 


        }


        let case_title=false
        if(this.state.case_title && this.state.case_title.length<=50){

            case_title=true

        } else {

            if(!this.state.case_title){
                error_message.push("The case title is missing")
            }else if(!this.state.case_title.length<=50){
                error_message.push("Case title must be 50 characters or less")
            }

        }


        let location=false
        if(this.state.location && this.state.location.length<=100){

            location=true

        } else {

            if(!this.state.location){
                error_message.push("The location is missing")
            } else if(!this.state.location<=100){
                error_message.push("Location must be 100 characters or less")
            }

        }

        let date=false
        if(this.state.date){

            date=true

        } else {

            error_message.push("The date is missing")


        }



        let type_of_activity=false
        if(this.state.type_of_activity){

            type_of_activity=true

        } else {

            error_message.push("Select 1 type of activity")

        }


        
        let entity_tags=false
        if(this.state.entity_tags.length>0){

            entity_tags=true

        } else {

            error_message.push("Select at least 1 entity tag")

        }




        
        let encounters=false
        if(this.state.encounters.length>0){

            encounters=true

        } else {

            error_message.push("At least 1 encounter is needed")

        }

        



        return [display_name && email_address && case_title && location && date && type_of_activity && entity_tags && encounters?true:false, error_message]
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

    submit= async ()=>{
        
        try{


            let [validation, error_messages]=this.front_end_validation()

            let formated_error_messages= error_messages.map((error_message)=>{return(<React.Fragment><div>{error_message}</div></React.Fragment>)})//list rendering using array of primitive(string). Will be rendered in the notification page
           
            if (validation){
                
                let edit_case = await axios.put(this.url_api + '/update_case/'+this.props.case_id, {

                    "witness":{
                        "email_address":this.state.email_address,
                        "display_name":this.state.display_name,
                        "occupation":this.state.occupation,
                        "age":this.state.age,
                        "company_name":this.state.company_name
                        },
                    "case": {
                        "case_title":this.state.case_title,
                        "generic_description":this.state.generic_description,
                        "type_of_activity":this.state.type_of_activity,
                        "location":this.state.location,
                        "date":this.state.date,
                        "entity_tags":this.state.entity_tags
                        },
                    "encounters":this.state.encounters
                })
                
               


                let notification_content={
                    validation:true,
                    message:"Case Edited"

                }
                this.props.onEnterEachCase(notification_content,this.props.case_id) 

            }else{
                let notification_content={
                    validation:false,
                    message:formated_error_messages

                }
                this.props.onEnterEachCase(notification_content,this.props.case_id) 
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
            render_items=(
                <React.Fragment>
                    {this.display_loading_page()}
                </React.Fragment>)
            
        }else{
            render_items=(
                <React.Fragment>
                
                        <section className="panel panel-page-title">
                            <h1 className="font-primary font-size-section-divider">Edit a Case</h1>
                        </section>
                        {this.display_form_main()}
                        {this.display_added_encounters()}
                        {this.display_form_encounters()}
                        <section className="panel">
                            <h2 className="font-title font-primary">Submit This Case</h2>
                            <div className="panel-line"></div>
                            <div className="panel-button-group">
                                <button className="btn panel-button font-primary" onClick={()=>{this.props.onEnterEachCase({},this.props.case_id)}}>Back</button>
                                <button className="btn panel-button font-primary" onClick={this.submit}>Submit!</button>
                            </div>
                        </section>
                           
                
                </React.Fragment>)
            
        }


        return (<React.Fragment>
                {render_items}          
            </React.Fragment>)
    }








}