import React from 'react'
export default function DeleteEachCase (props) {
    
    
    
    return (<React.Fragment> 
                <div className={`modal ${props.className_reveal}`} tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{props.title}</h5>
                            </div>
                            <div className="modal-body" style={{backgroundColor:props.color}}>
                                <p>{props.message}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-md panel-button" onClick={props.onClickPanelDissappear} data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>   
            
        </React.Fragment>)
    

}