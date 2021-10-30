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
            let entity_tags = await axios.get(this.props.url_api + "/list_entity_tags")
            
            entity_tags.data.map(tag=>{

                if(tag.entity=="Others"){
                    this.setState({
                        "entity_tags":[tag._id]
                    })
                }


            }) 
            
            this.setState({

                "entity_tags_list":entity_tags.data


            })

        }catch(e){


            let notification_content={
                validation:false,
                message:"Server Error. Please contact the administrator"

            }
            this.props.onServerError(notification_content)


        }
    }



    display_form_main(){

    
        let entity_tags_list_jsx = []

        for (let entity_tag of this.state.entity_tags_list){
            entity_tags_list_jsx.push(<option value={entity_tag._id}>{entity_tag.entity}</option>)
        }

        

        return(
            <React.Fragment>
                <section className="panel">
                    <h2 className="font-title font-primary">Witness Particulars</h2>
                    <div className="panel-line"></div>
                    <div className="panel-main my-4"> 
                        <label className="font-labels font-secondary">Display Name</label>
                        <input type="text" name="display_name" className="form-control font-description font-secondary" value={this.state.display_name} onChange={this.update_any_field} />
                        <label className="font-labels font-secondary">Occupation</label>
                        <input type="text" name="occupation" className="form-control font-description font-secondary" value={this.state.occupation} onChange={this.update_any_field} />
                        <label className="font-labels font-secondary">Age</label>
                        <input type="text" name="age" className="form-control font-description font-secondary" value={this.state.age} onChange={this.update_any_field} />
                        <label className="font-labels font-secondary">Paranormal Company Name</label>
                        <input type="text" name="company_name" className="form-control font-description font-secondary" value={this.state.company_name} onChange={this.update_any_field} />
                        <label className="font-labels font-secondary">Email address</label>
                        <input type="text" name="email_address" className="form-control font-description font-secondary" value={this.state.email_address} onChange={this.update_any_field} />
                    </div>
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
                            <input type="date" name="date" className="form-control font-description font-secondary" value={this.state.date} onChange={this.update_any_field} style={{"display":"block"}}/>
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
            </React.Fragment>)

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

            </React.Fragment>

        )

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

                error_message.push((<React.Fragment>

                    <div>Image name is missing</div>
    
                </React.Fragment>))

            } else if(!(/https?:\/\/[^\s].[^\s]*$/.test(this.state.new_image))){

                error_message.push((<React.Fragment>

                    <div>The URL of image is inappropriate format</div>
    
                </React.Fragment>))



            } 


        }


        let equipment_used=false
        if(this.state.new_equipment_used.length>0){

            equipment_used=true

        } else {

            error_message.push((<React.Fragment>

                <div>Select at least one equipment</div>

            </React.Fragment>))

        }



        let contact_type=false
        if(this.state.new_contact_type.length>0){

            contact_type=true

        } else {

            error_message.push((<React.Fragment>

                <div>Select at least 1 contact type</div>

            </React.Fragment>))

        }



        let time_of_encounter=false
        if(this.state.new_time_of_encounter){

            time_of_encounter=true

        } else {

            error_message.push((<React.Fragment>

                <div>Select 1 time of encounter</div>

            </React.Fragment>))

        }






        let number_of_entities=false
        if(this.state.new_number_of_entities && /\d/.test(this.state.new_number_of_entities) && parseInt(this.state.new_number_of_entities)>=1){

            number_of_entities=true

        } else {

            

            if(!this.state.new_number_of_entities){

                error_message.push((<React.Fragment>

                    <div>Number of entities is missing</div>
    
                </React.Fragment>))

            }else if(!/\d/.test(this.state.new_number_of_entities)){

                error_message.push((<React.Fragment>

                    <div>Number of entities must be in numbers</div>
    
                </React.Fragment>))



            }else if(!parseInt(this.state.new_number_of_entities)>=1){

                error_message.push((<React.Fragment>

                    <div>There should be at least 1 entity</div>
    
                </React.Fragment>))



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

                error_message.push((<React.Fragment>

                    <div>Image name is missing</div>
    
                </React.Fragment>))

            } else if(!(/https?:\/\/[^\s].[^\s]*$/.test(this.state.edit_image))){

                error_message.push((<React.Fragment>

                    <div>The URL of image is inappropriate format</div>
    
                </React.Fragment>))



            } 


        }


        let equipment_used=false
        if(this.state.edit_equipment_used.length>0){

            equipment_used=true

        } else {

            error_message.push((<React.Fragment>

                <div>Select at least one equipment</div>

            </React.Fragment>))

        }



        let contact_type=false
        if(this.state.edit_contact_type.length>0){

            contact_type=true

        } else {

            error_message.push((<React.Fragment>

                <div>Select at least 1 contact type</div>

            </React.Fragment>))

        }



        let time_of_encounter=false
        if(this.state.edit_time_of_encounter){

            time_of_encounter=true

        } else {

            error_message.push((<React.Fragment>

                <div>Select 1 time of encounter</div>

            </React.Fragment>))

        }






        let number_of_entities=false
        if(this.state.edit_number_of_entities && /\d/.test(this.state.edit_number_of_entities) && parseInt(this.state.edit_number_of_entities)>=1){

            number_of_entities=true

        } else {

            

            if(!this.state.edit_number_of_entities){

                error_message.push((<React.Fragment>

                    <div>Number of entities is missing</div>
    
                </React.Fragment>))

            }else if(!/\d/.test(this.state.edit_number_of_entities)){

                error_message.push((<React.Fragment>

                    <div>Number of entities must be in numbers</div>
    
                </React.Fragment>))



            }else if(!parseInt(this.state.edit_number_of_entities)>=1){

                error_message.push((<React.Fragment>

                    <div>There should be at least 1 entity</div>
    
                </React.Fragment>))



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
            this.props.onListCases(notification_content)
        }


    }

    

    front_end_validation=()=>{


        let error_message=[]


        let  display_name=false
        if(this.state.display_name && this.state.display_name.length<=25){

            display_name=true

        } else {
            if(!this.state.display_name){
                error_message.push((<React.Fragment>

                    <div>The display name is missing</div>
    
                </React.Fragment>))
            }else if(!this.state.display_name.length<=25){
                error_message.push((<React.Fragment>

                    <div>Display name must be 25 characters or less</div>
    
                </React.Fragment>))
                
            }

        }



        
        
        let age=false
        
        if(this.state.age && /\d/.test(this.state.age) && (parseInt(this.state.age)>=10 && parseInt(this.state.age)<=120)){ 

            age=true

        } else {
            if(!this.state.age){

                error_message.push((<React.Fragment>

                    <div>The age is missing</div>
    
                </React.Fragment>))

            }else if(!/\d/.test(this.state.age)){

                error_message.push((<React.Fragment>

                    <div>Age must be a number</div>

                </React.Fragment>))


            }else if (!(parseInt(this.state.age)>=10 && parseInt(this.state.age)<=120)){
                error_message.push((<React.Fragment>

                    <div>Insert a proper age from 10 to 120</div>

                </React.Fragment>))
            }

        }

        

        let email_address=false
        if(this.state.email_address && /\w*@\w*(\.\w{2,3})+/.test(this.state.email_address)){

            email_address=true

        } else {

            if(!this.state.email_address){
                error_message.push((<React.Fragment>

                    <div>The email address is missing</div>
    
                </React.Fragment>))

            } else if(!(/\w*@\w*(\.\w{2,3})+/.test(this.state.email_address))){
                error_message.push((<React.Fragment>

                    <div>The email address is inappropriate format</div>
    
                </React.Fragment>))

            } 


        }

        
        let case_title=false
        if(this.state.case_title && this.state.case_title.length<=50){

            case_title=true

        } else {

            if(!this.state.case_title){
                error_message.push((<React.Fragment>

                    <div>The case title is missing</div>
    
                </React.Fragment>))
            }else if(!this.state.case_title.length<=50){
                error_message.push((<React.Fragment>

                    <div>Case title must be 50 characters or less</div>
    
                </React.Fragment>))
            }

        }


        let location=false
        if(this.state.location && this.state.location.length<=100){

            location=true

        } else {

            if(!this.state.location){
                error_message.push((<React.Fragment>

                    <div>The location is missing</div>
    
                </React.Fragment>))
            } else if(!this.state.location<=100){
                error_message.push((<React.Fragment>

                    <div>Location must be 100 characters or less</div>
    
                </React.Fragment>))
            }

        }


        



        let date=false
        if(this.state.date){

            date=true

        } else {

            error_message.push((<React.Fragment>

                <div>The date is missing</div>

            </React.Fragment>))


        }



        let type_of_activity=false
        if(this.state.type_of_activity){

            type_of_activity=true

        } else {

            error_message.push((<React.Fragment>

                <div>Select 1 type of activity</div>

            </React.Fragment>))

        }


        
        let entity_tags=false
        if(this.state.entity_tags.length>0){

            entity_tags=true

        } else {

            error_message.push((<React.Fragment>

                <div>Select at least 1 entity tag</div>

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

        



        return [display_name && age && email_address && case_title && location && date && type_of_activity && entity_tags && encounters?true:false, error_message]
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
                
                let add_case = await axios.post(this.url_api + '/add_case', {

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
                
                console.log(add_case)


                let notification_content={
                    validation:true,
                    message:"Case Added"

                }
                this.props.onListCases(notification_content)

            }else{
                let notification_content={
                    validation:false,
                    message:formated_error_messages
                }
                this.props.onListCases(notification_content)
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
        return (<React.Fragment>
        
                <section className="panel panel-page-title">
                    <h1 className="font-primary font-size-section-divider">Add a Case</h1>
                </section>
                {this.display_form_main()}
                {this.display_added_encounters()}
                {this.display_form_encounters()}
                <section className="panel">
                    <h2 className="font-title font-primary">Submit This Case</h2>
                    <div className="panel-line"></div>
                    <div className="panel-button-group">
                        <button className="btn panel-button font-primary" onClick={()=>{this.props.onListCases({})}}>Back</button>
                        <button className="btn panel-button font-primary" onClick={this.submit}>Submit!</button>
                    </div>
                </section>   
        
        </React.Fragment>)
    }







}