import React from "react";
import PropTypes from 'prop-types';

const Message = (props) => {

    return(
        <div className={`ui ${props.type} message`}>
         <i className="close icon" onClick={props.onClose}></i>
         <div className="header">
            {props.title}
         </div>
         <p>{props.text}</p>
        </div>
    );
}

Message.protoTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    text: PropTypes.string,
    onClose: PropTypes.func.isRequired
}

export default Message;