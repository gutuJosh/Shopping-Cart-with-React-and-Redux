import React, { useState } from "react";
import PropTypes from 'prop-types';

const PicturesHolder = (props) => {
    //create a state to store the user selected image 
    const [MainImage, setImage] = useState(props.images[0]);


    return(
      <React.Fragment>
        <div className="thumbs-holder">
         {props.images.map((item, i) => (
           <img 
            src={item} 
            key={i} 
            alt="thumbnail" 
            className="thumbnail"  
            onClick = {
                (e) => setImage(e.target.src)
            }
            />
         ))}
        </div>
        <div className="main-picture-holder">
           <img src={MainImage} alt={props.name} className="main-image" />
        </div>
      </React.Fragment>
    )
}

PicturesHolder.protoTypes = {
  images: PropTypes.array.isRequired
}

export default PicturesHolder;