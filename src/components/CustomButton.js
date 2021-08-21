import React from "react";
import PropTypes from 'prop-types';

const CustomButton = (props) => {

    return(
        <button className="ui animated fade button fluid" id={props.id}>
        <div className="visible content">{props.label}</div>
        <div className="hidden content">
         {props.message}
        </div>
       </button>
    );
}

CustomButton.protoTypes = {
    label: PropTypes.string.isRequired,
    message: PropTypes.string,
    click: PropTypes.func
}

export default CustomButton;