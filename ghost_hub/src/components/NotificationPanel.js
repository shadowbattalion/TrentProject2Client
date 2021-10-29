import React from 'react'
import axios from 'axios'
export default function DeleteEachCase (props) {
    
    
    
    return (<React.Fragment>
            
                <div className={`alert ${props.className_reveal} py-3`} role="alert" style={{backgroundColor:props.color}}>
                    <div className="alert-reveal-text">{props.message}</div>
                    <div className="panel-button-group pb-5">
                        <button className="btn btn-sm panel-button" onClick={props.onClickPanelDissappear}>Continue</button>
                    </div>
                </div>   
            
        </React.Fragment>)
    

}