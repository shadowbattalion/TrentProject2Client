import React from 'react'
import axios from 'axios'
export default function DeleteEachCase (props) {
    
    
    
    return (<React.Fragment>
            {/* <h1>Are you sure you want to delete</h1> */}
            <div className={`alert-primary alert ${props.className_reveal}`} role="alert" style={{backgroundColor:props.color}}>
                {props.message}
            </div>   
            
        </React.Fragment>)
    

}