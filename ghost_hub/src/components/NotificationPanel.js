import React from 'react'
export default function DeleteEachCase (props) {
    
    
    
    return (<React.Fragment> 
                <div className={`modal ${props.className_reveal}`} tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{backgroundColor:props.color}}>
                            <div className="modal-header">
                                <h5 className="font-labels font-primary">{props.title}</h5>
                            </div>
                            <div className="modal-body" style={{"backgroundColor":"white"}}>
                                <p className="font-description font-secondary">{props.message}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-md panel-button font-primary" onClick={props.onClickPanelDissappear} data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>   
            
        </React.Fragment>)
    

}