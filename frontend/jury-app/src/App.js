import React from 'react';
// import {Switch, Route} from 'react-router-dom';
import './App.css';
import LoginScreen from './screens/login-screen'
import MainModule from './screens/admin-module';

const App = () => {


  return (
    <div className="App">
      {/* <Switch>
        <Route />
        <Route />
      </Switch> */}
      {/* <LoginScreen /> */}
      <MainModule/>
    </div>
  );
}

export default App;
