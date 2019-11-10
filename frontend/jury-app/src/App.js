import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import LoginScreen from './screens/login-screen'
import MainModule from './screens/admin-module';
import JuryModule from './screens/jury-module';

const App = () => {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginScreen}/>
        <Route exact path="/admin" component={MainModule}/>
        <Route exact path="/jury" component={JuryModule}/>
      </Switch>
    </div>
  );
}

export default App;
