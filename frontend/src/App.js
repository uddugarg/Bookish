import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './hoc/auth';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import Upload from './components/Uploads/Upload';
import ProductDetails from './components/Products/ProductDetails';
import Cart from './components/Cart/Cart';
import OrderList from './components/Orders/OrderList';

function App() {

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Header />
      <div className='app'>
        <Switch>
          <Route exact path='/' component={Auth(Home, null)} />
          <Route path='/login' component={Auth(Login, false)} />
          <Route path='/register' component={Auth(Register, false)} />
          <Route path='/upload' component={Auth(Upload, true)} />
          <Route path='/bookish/:prodId' component={Auth(ProductDetails, true)} />
          <Route path='/cart' component={Auth(Cart, true)} />
          <Route path='/order/history' component={Auth(OrderList, true)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
