import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const CreateAccount = ({setDefault, submitCredentials}) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fieldError, setFieldError] = useState(false);
    const [fieldPasswordError, setFieldPasswordError] = useState(false);

    const submit = () => {
        let doRequest = true
        if(!user || !password || password !== confirmPassword){
            doRequest = false;
        }
        setFieldError(!user || !password);
        setFieldPasswordError(password !== confirmPassword);

        if (!doRequest) return;

        submitCredentials({
            userName: user,
            password: password,
        })
    }

    const renderInputs = () =>
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
            <div>
                <TextField
                    className={'input--wrapper'}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    id="filled-basic"
                    label="Confirm Password"
                    margin="normal"
                    variant="filled"
                    value={confirmPassword}
                />
            </div>
            {fieldError && <div style={{color:"red"}}>You need to complete both fields</div>}
            {fieldPasswordError && <div style={{color:"red"}}>Passwords must match!</div>}
            <div className="buttons">
                <Button
                    onClick={submit}
                    variant="contained"
                    color={"primary"}
                    className={"login-button"}
                >
                    {'Create Account'}
                </Button>
            </div>
            <div className="buttons">
                <Button
                    onClick={setDefault}
                    variant="contained"
                    className={"login-button"}
                >
                    {'Go Back'}
                </Button>
            </div>
        </div>


    return (
        <>
            <div className="main-title">{'Create your account!'}</div>
            {renderInputs()}
        </>
    );
}

export default CreateAccount;