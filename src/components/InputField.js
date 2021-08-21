import React from "react";
import PropTypes from 'prop-types';

const InputField = (props) => {

  
  
    return(
      <React.Fragment>
      {props.type !== 'radio' ? 
      <div className="input-container">
       <input 
        type={props.type}
        className={props.defaultValue.replace(/ /g, '') !== '' ? `custom-input not-empty` : `custom-input`} 
        name={props.name} 
        defaultValue = {props.defaultValue}
        onBlur={(event) => {
          const element = event.target;
          if(element.value !== ''){
             element.classList.add('not-empty');
          }
          else{
            element.classList.remove('not-empty');
          }
          props.getValue(element.name, element.value)
        }}
        />
        <label htmlFor={props.name}>{props.label}</label>
      </div>
      :
      <div className="radio-container">
       <input 
        type="radio"
        className="custom-radio" 
        id={props.id}
        name={props.name} 
        defaultChecked = {props.checked}
        value={props.value}
        onChange={(event) => props.getValue(event.target.value)}
        />
        <label htmlFor={props.id}>{props.label}</label>
      </div>
     }
     </React.Fragment>
    )
}

InputField.protoTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    getValue: PropTypes.func
}

export default InputField;