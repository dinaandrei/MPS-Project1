import React, { useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import './App.css';
import LoginScreen from './screens/login-screen'
import MainModule from './screens/admin-module';
import JuryModule from './screens/jury-module';

const App = () => {
    const history = useHistory();
    const location = useLocation();

    const goTo = (route) => {
      history.push(route);
    }

    useEffect(()=>{
        const isAdmin = localStorage.getItem("isAdmin") === "true";
        const isJury = localStorage.getItem("isJury") === "true";
        console.log({isAdmin, isJury})
        if(isJury && location.pathname !== '/jury'){
            goTo("/jury");
        } else if(isAdmin && location.pathname !== '/admin'){
            goTo("/admin");
        }
    }, [])

    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={LoginScreen} />
                <Route exact path="/admin" component={MainModule} />
                <Route exact path="/jury" component={JuryModule} />
            </Switch>
        </div>
    );
}

export default App;
