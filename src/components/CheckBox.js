import React from "react";
import PropTypes from 'prop-types';

const CheckBox = (props) => {

  
  
    return(
      <div className="input-container">
       <input 
        className="custom-input" 
        name={props.name} 
        defaultValue = {props.defaultValue}
        onInput={(event) => props.getValue(event.target.value)}
        />
        <label htmlFor={props.name}>{props.label}</label>
      </div>
    )
}

CheckBox.protoTypes = {

    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    getValue: PropTypes.func
}

export default CheckBox;