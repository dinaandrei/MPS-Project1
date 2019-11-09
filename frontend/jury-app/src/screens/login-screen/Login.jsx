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
                    onChange={(event) => setPassword(event.target.value)}
                    id="filled-basic"
                    label="Password"
                    margin="normal"
                    variant="filled"
                    type="password"
                    value={password}
                />
            </div>
            <div>
                <Button
                    onClick={sendData}
                    variant="contained"
                    color={organiserPressed ? "primary" : "secondary"}
                    className={"main-button"}
                >
                    {'Submit'}
                </Button>
                <Button
                    onClick={setDefault}
                    variant="contained"
                    className={"main-button"}
                >
                    {'Cancel'}
                </Button>
            </div>
        </div>


    const renderButtons = () => !juryPressed && !organiserPressed &&
        <>
            <Button onClick={() => setOrganiser(!organiserPressed)} variant="contained" color="primary" className={"main-button"}>
                {'Organiser'}
            </Button>
            <Button onClick={() => setJury(!juryPressed)} variant="contained" color="secondary" className={"main-button"}>
                {'Jury'}
            </Button>
        </>

    return (
        <div className="login-container">
            {renderButtons()}
            {renderInputs()}
        </div>
    );
}

export default Login;