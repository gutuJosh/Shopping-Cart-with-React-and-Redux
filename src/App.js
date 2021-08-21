import React from 'react';
import { Route, Switch, useHistory} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store.js'
import './App.css';
import Header from "./components/Header";
import ProductsList from './pages/ProductsList';
import ProductDetails from "./pages/ProductDetails";
import ShoppingCart from "./pages/ShoppingCart";

const App = (props) => {

  const history = useHistory();
  
  return (
    <Provider store={store}>
      <Header />
      <section className="app-main">
        <Switch>
          <Route path="/" exact>
            <ProductsList history={history}/>
          </Route>
          <Route path="/details/:id">
            <ProductDetails history={history}/>
          </Route>
          <Route path="/shopping-cart">
            <ShoppingCart history={history}/>
          </Route>
        </Switch>
      </section>

    </Provider>
  );
 }



export default App;
