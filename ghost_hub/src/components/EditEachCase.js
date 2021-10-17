import React from 'react'
import axios from 'axios'
export default class EditEachCase extends React.Component {

    url_api = ""

    state = {
       "encounters":[
                       
                   ],
        new_sightings_description:""

   }


   delete_encounter = (id) =>{

     let encounters_list=this.state.encounters

     let index_to_delete = encounters_list.findIndex(encounter=>encounter._id==id)

     let new_encounter_list=[...encounters_list.slice(0,index_to_delete), ...encounters_list.slice(index_to_delete+1)]

     this.setState({

        "encounters":new_encounter_list

     })



   }


    display_added_encounters(){

        let encounter_jsx=[]

        let i=0
        for(let encounter of this.state.encounters){
            let each_encounter = (
                <React.Fragment key={encounter.temp_id}>
                    <div>    
                        {encounter.sightings_description}
                        <button className="btn btn-danger btn-sm mx-1" onClick={()=>{this.delete_encounter(encounter._id)}}>Delete</button>
                    </div>
                </React.Fragment>)

            encounter_jsx.push(each_encounter)
            i++
        }



        return encounter_jsx

    }


    update_encounter_field=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    add_encounter=()=>{

        let new_encounter={
            "_id":"front_end_id"+new Date().valueOf(),
            "sightings_description":this.state.new_sightings_description

        }
        
        this.state.new_sightings_description=""
        
        this.setState({
            'encounters': [...this.state.encounters, new_encounter]
        })
    }
    
    display_form(){

        return(
            <React.Fragment>
                <label>Description</label>
                <input type="text" name="new_sightings_description" className="form-control" value={this.state.new_sightings_description} onChange={this.update_encounter_field} />
                <button className="btn btn-success btn-sm" onClick={this.add_encounter}>Add!</button>


            </React.Fragment>

        )




    }


    render() {
        return (<React.Fragment>
            <h1>Add a Case</h1>
            {this.display_added_encounters()}
            {this.display_form()}
        </React.Fragment>)
    }







}