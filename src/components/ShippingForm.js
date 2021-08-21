import React, { useState, useEffect }from "react";
import InputField from "./InputField";
import CustomButton from "./CustomButton";

const ShippingForm = (props) => {
  //store user data
  const [userData, setUserData] = useState({});
  //store shipping price
  const [shipping, setShipping] = useState(6);
  //store total price
  const [total, setTotal] = useState((props.subtotal + shipping));

  const getShippingPrice = (value) => {
     const price = parseFloat(value);
     setShipping(price);
     setTotal((props.subtotal + price));
  }


  const getUserData = (fieldName, fieldValue) => {
    const data = userData;
    data[fieldName] = fieldValue;
    setUserData(data);
    if(typeof(Storage) !== "undefined"){
       sessionStorage.setItem('userData', JSON.stringify(data));
    }
  }

  
  const placeOrder = (e) => {
    e.preventDefault();
    const data = {
      'shippingPrice' : shipping,
      'totalCartPrice' : total,
      'userData' :  userData

    }
    //send data to the parent component
    props.saveData(data);
    //remove data form session storage
    /*if (typeof(Storage) !== "undefined" && sessionStorage['userData']) {
      sessionStorage.removeItem('userData');
    }*/
  }

  

  useEffect( () => {  
    if(userData.name === undefined){
      if (typeof(Storage) !== "undefined" && sessionStorage['userData']) {
           setUserData(JSON.parse(sessionStorage['userData']));
      }
    }
  });
 
  return (
      <form action="." method="post" onSubmit={(e) => placeOrder(e)}>
        <h1>Shipping Address</h1>
        <div className="flex">
         <InputField type="text" name="name" label="Name" getValue={getUserData} defaultValue={typeof userData.name !== 'undefined' ? userData.name : ''}/>
         <InputField type="text" name="surname" label="Surame" getValue={getUserData} defaultValue={typeof userData.surname !== 'undefined' ? userData.surname : ''}/>
        </div>
        <div className="flex">
         <InputField type="text" name="address" label="Shipping address" getValue={getUserData} defaultValue={typeof userData.address !== 'undefined' ? userData.address : ''}/>
        </div>
        <div className="flex">
         <InputField type="text" name="city" label="City" getValue={getUserData} defaultValue={typeof userData.city !== 'undefined' ? userData.city : ''}/>
         <InputField type="text" name="country" label="Country" getValue={getUserData} defaultValue={typeof userData.country !== 'undefined' ? userData.country : ''}/>
        </div>
        <div className="flex">
         <InputField type="text" name="zip" label="Zip code" getValue={getUserData} defaultValue={typeof userData.zip !== 'undefined' ? userData.zip : ''}/>
         <InputField type="text" name="phone" label="Phone number" getValue={getUserData} defaultValue={typeof userData.phone !== 'undefined' ? userData.phone : ''}/>
        </div>
        <div className="radio-cont">
         <InputField type="radio" name="delivery" value="6" label="Normal delivery (+6.00 &euro;)" id="normal" checked={true} getValue={ getShippingPrice }/>
         <InputField type="radio" name="delivery" value="12" label="Express delivery (+12.00 &euro;)" id="express"  getValue={ getShippingPrice }/>
        </div>
        <CustomButton 
         id="proccedWithPaymentBtn" 
         label="Proceed with payment" 
         message={`Total: ${new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(total)}`}
         />
      </form>
    )
};

export default ShippingForm;
