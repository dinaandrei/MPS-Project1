import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { routes } from '../../utils/backendRoutes';
import { postData } from '../../utils/fetches';
import { useHistory } from 'react-router-dom';
import CreateAccount from './CreateAccount';

const Login = () => {
    const history = useHistory();
    
    const [organiserPressed, setOrganiser] = useState(false);
    const [juryPressed, setJury] = useState(false);
    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const [createAccount, setCreateAccount] = useState(false);
    const [error, setError] = useState(false);
    const [fieldError, setFieldError] = useState(false);

    const sendData = () => {
        if(!user || !password) {
            setFieldError(true);
            return;
        }
        const body = {
            username: user,
            password: password,
            createJuryAccount: false,
        };
        const method = organiserPressed? routes.getAuthStatusAdmin : routes.getAuthStatusJury;
        if(!organiserPressed) body.createJuryAccount = true;
        postData(method, body)
            .then((res) => {
                const { createJuryAccount, status } = res;
                console.log(res);
                if (status / 100 === 2) {
                    if (createJuryAccount) {
                        setCreateAccount(true);
                        return;
                    }
                    if (organiserPressed) {
                        localStorage.setItem('isAdmin', true);
                        history.push('/admin')
                        return;
                    } else {
                        localStorage.setItem('isJury', true);
                        history.push('/jury')
                        return;
                    }
                } else {
                    setError(true);
                }
            })
        setFieldError(false);
    }

    const submitCredentials = body => {
        postData(routes.getAuthStatus, body)
            .then(({ status }) => {
                if (status / 100 !== 2) {
                    setError(true);
                } else {
                    setDefault(true)
                }
            })
    }

    const setDefault = () => {
        setOrganiser(false);
        setJury(false);
        setCreateAccount(false);
        setError(false);
        setUser("");
        setPassword("");
        setFieldError(false);
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
            {fieldError && <div style={{color:"red"}}>You need to complete both fields</div>}
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

            {error ?
                <div>
                    <div className="main-title">{'Credentials Incorrect'}</div>
                    <div className="buttons">
                        <Button
                            onClick={setDefault}
                            variant="contained"
                            className={"login-button"}
                        >
                            {'Try Again'}
                        </Button>
                    </div>
                </div> :
                createAccount ?
                    <CreateAccount submitCredentials={submitCredentials} setDefault={setDefault} /> :
                    <>
                        <div className="main-title">{'Welcome to the Login Page!'}</div>
                        {renderButtons()}
                        {renderInputs()}
                    </>
            }

        </div>
    );
}

export default Login;