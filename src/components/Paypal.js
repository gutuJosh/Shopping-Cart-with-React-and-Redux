import React, { useRef, useState, useEffect } from "react";
import Message from "./Message";



const Paypal = (props) => {
  
  //tell if the payment has been made
  const [paid, setPaid] = React.useState(false);
  // catch if an error occurs
  const [error, setError] = React.useState(false);
  //set visibility state to show/hide the message component
  const [visibility, setVisibility] = useState(false);
  //store feedback message
  const [message, setMessage]  = useState({
    'type':'',
    'title':'',
    'text':''
  });
  //useRef hook to get a mutable paypal ref object
  const paypalRef = useRef();

  //To show PayPal buttons once the component loads
  useEffect( () => { 
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your description",
                amount: {
                  currency_code: "EUR",
                  value: (props.shippingPrice + props.subtotal),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          console.log(order);
          //clear cart items from localStorage
          if(typeof(Storage) !== "undefined"){
            localStorage.removeItem('basket');
          }
          setMessage({
            'type':'success',
            'title':'Success',
            'text':'The payment of your order was successfully processed!'
          });
          setVisibility(true);
        },
        onError: (err) => {
          setError(err),
          console.error(err);
          setMessage({
            'type':'warning',
            'title':'Warning',
            'text':'Error Occurred in processing payment.! Please reload the page and try again.'
          });
          setVisibility(true);
        },
        onCancel: (data) => {
          // Show a cancel page, or return to cart
          props.backLink();
        },
        onInit: (data, actions) =>  {
          // onInit is called when the button first renders
          //You can use it for validate data
        },
        onClick: () => {
          //onClick is called when the button is clicked
          //You can use it for showing a validation error
        },

      })
      .render(paypalRef.current);
  },[]);


 
  return (
      <React.Fragment>
          <h1>Paypal Payment Gateway</h1>
          <p onClick={props.backLink}><i className="arrow left icon"></i> Back to shipping form</p>
          <div className="ui relaxed divided list subtotal">
           <div className="item">
            <p>Subtotal: {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(props.subtotal)}</p>
           </div>
            <div className="item">
            <p>Shipping: {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(props.shippingPrice)}</p>
           </div>
           <div className="item">
            <h4>Total Amount: {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(props.shippingPrice + props.subtotal)}</h4>
           </div>
          </div>
          {(paid && visibility) || (error && visibility) ?
           <div>
            <Message 
             type={message.type}
             title={message.title}
             text={message.text}
             onClose={ (e)=> e.preventDefault()}
            />
           </div>
           :
          <div ref={paypalRef} />
          }
      </React.Fragment>
    )
};

export default Paypal;
