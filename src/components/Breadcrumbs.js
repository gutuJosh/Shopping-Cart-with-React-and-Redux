import React from "react";
import {NavLink} from "react-router-dom";

const Breadcrumbs = (props) => {


    return(
      <div className="product-detail-container breadcrumbs-container ui two column doubling stackable grid container">
        <div className="ui breadcrumb">
        <NavLink to="/" className="section">Products</NavLink>
         <div className="divider"> / </div>
         <div className="active section">{props.name}</div>
        </div>
      </div>
    )
}

export default Breadcrumbs;