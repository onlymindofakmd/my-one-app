import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
// import './assets/font/iconfont.css'
import Login from './routes/Login';
import Index from './routes/Index'
import PrivateRoute from './component/PrivateRoute';

function App() {
  return (
    <Switch>
      <Route path='/login' component={Login}/>
      <PrivateRoute path='/' component={Index}/>
    </Switch>
  );
}

export default App;
