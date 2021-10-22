import React from 'react'
import axios from 'axios'
export default function DeleteEachCase (props) {

    
    return (<React.Fragment>
            {/* <h1>Are you sure you want to delete</h1> */}
            <div class="alert alert-primary" role="alert">
                {props.message}
            </div>   
            
        </React.Fragment>)
    

}