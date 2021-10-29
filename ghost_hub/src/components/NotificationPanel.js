import React from 'react'
import axios from 'axios'
export default function DeleteEachCase (props) {
    
    
    
    return (<React.Fragment>
            
                {/* <div className={`alert ${props.className_reveal} py-3`} role="alert" style={{backgroundColor:props.color}}>
                    <div className="alert-reveal-text">{props.message}</div>
                    <div className="panel-button-group pb-5">
                        <button className="btn btn-sm panel-button" onClick={props.onClickPanelDissappear}>Continue</button>
                    </div>
                </div> */}

                <div className={`modal ${props.className_reveal}`} tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{props.title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" style={{backgroundColor:props.color}}>
                                <p>{props.message}</p>
                                <p>{typeof props.message}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={props.onClickPanelDissappear} data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>   
            
        </React.Fragment>)
    

}