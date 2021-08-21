import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const Selector = (props) => {
  const [defaultVal, setDefaultVal] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect( () => {
    
    if(options.length !== props.options.length){
      setOptions(props.options);
    }

    if(defaultVal !== props.selectedValue){
      setDefaultVal(props.selectedValue);
    }
    
  });
  
  
 
    return(
      <React.Fragment>
       <label htmlFor={props.name}>{props.placeholder}</label>
       <select 
        className="ui dropdown" 
        name={props.name} 
        value = {defaultVal !== props.selectedValue ? defaultVal : props.selectedValue}
        onChange={(event) => props.getValue(event.target.value)}
        >
         {options.map((item, i) => (
          <option 
           key={i}
           value={`${item.value}`}
           
           
           >{item.name}</option>
         ))}
      </select>
      </React.Fragment>
    )
}

Selector.protoTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    getValue: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
}

export default Selector;