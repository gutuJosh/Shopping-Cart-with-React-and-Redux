import React from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

const Basket = (props) => {
    let history = useHistory();
    return (
        <div className="shopping-bag-container" onClick={() => history.push(`/shopping-cart`)}>
          <i className="shopping bag icon"></i>
          <span>{props.basketProps.basket.length}</span>
        </div>
    )

}


const mapStateToProps = state => ({
    basketProps : state.basketState,
})

export default connect(mapStateToProps)(Basket)