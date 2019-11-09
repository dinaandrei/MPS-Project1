import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Login = () => {
    const [organiserPressed, setOrganiser] = useState(false);
    const [juryPressed, setJury] = useState(false);
    const [user, setUser] = useState();
    const [password, setPassword] = useState();

    const sendData = () => {
        const body = {
            userName: user,
            password: password,
            isAdmin: organiserPressed
        }
    }

    const setDefault = () => {
        setOrganiser(false);
        setJury(false);
        setUser("");
        setPassword("");
    }

    const renderInputs = () => (organiserPressed || juryPressed) &&
        <div className={"input-fields"}>
            <div>
                <TextField
                    className={'input--wrapper'}
                    onChange={(event) => setUser(event.target.value)}
                    id="filled-basic"
                    label="Username"
                    margin="normal"
                    variant="filled"
                    value={user}
                />
            </div>
            <div>
                <TextField
                    className={'input--wrapper'}
                    onChange={(event) => setPassword(event.target.value)}
                    id="filled-basic"
                    label="Password"
                    margin="normal"
                    variant="filled"
                    type="password"
                    value={password}
                />
            </div>
            <div className="buttons">
                <Button
                    onClick={sendData}
                    variant="contained"
                    color={organiserPressed ? "primary" : "secondary"}
                    className={"login-button"}
                >
                    {'Submit'}
                </Button>
            </div>
            <div className="buttons">
                <Button
                    onClick={setDefault}
                    variant="contained"
                    className={"login-button"}
                >
                    {'Cancel'}
                </Button>
            </div>
        </div>


    const renderButtons = () => !juryPressed && !organiserPressed &&
        <>
            <div className="title">{'What type of account do you have?'}</div>
            <div className="buttons">
                <Button onClick={() => setOrganiser(!organiserPressed)} variant="contained" color="primary" className={"login-button"}>
                    {'Organiser'}
                </Button>
            </div>
            <div className="buttons">
                <Button onClick={() => setJury(!juryPressed)} variant="contained" color="secondary" className={"login-button"}>
                    {'Jury'}
                </Button>
            </div>
        </>

    return (
        <div className="login-container">
            <div className="main-title">{'Welcome to the Log in Page!'}</div>
            {renderButtons()}
            {renderInputs()}
        </div>
    );
}

export default Login;