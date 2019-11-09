import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const CreateEvent = () => {
    const [contestType, setContestType] = useState();
    const [nrRounds, setNrRounds] = useState(0);
    const [nrSets, setNrSets] = useState(0);
    const [nrPlayers, setNrPlayers] = useState(0);
    const [players, setPlayers] = useState("");
    const [playersArray, setPlayersArray] = useState([]);
    const [juryUser, setJuryUser] = useState(""); 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);

    const sendData = () => {

    }

    const handlePlayers = (event) => {
        const { value } = event.target;
        const players = value.split(',');
        console.log({ players });
        setPlayersArray(players);
        setPlayers(value);
    }

    const setBlur = () => password !== confirmPassword && setErrorPassword(true);
    const setFocus = () => setErrorPassword(false);


    return (
        <div className="create-event--wrapper">
            <div className="title"> {'Create your Desired Event'}</div>
            <div className="row">
                <InputLabel id="select-label">{'Contest Type'}</InputLabel>
                <Select
                    labelId="select-label"
                    value={contestType}
                    onChange={event => setContestType(event.target.value)}
                    className={'input--wrapper'}
                >
                    <MenuItem value={"battle"}>{'Battle Event'}</MenuItem>
                    <MenuItem value={"syncron"}>{'All teams on Stage'}</MenuItem>
                    <MenuItem value={"asyncronous"}>{'One at a time'}</MenuItem>
                </Select>
            </div>
            <div className="row rounds--wrapper">
                <div>{'Rounds'}</div>
                <div >
                    <TextField
                        className={'input--wrapper'}
                        label="Number of Rounds"
                        margin="normal"
                        variant="filled"
                        value={nrRounds}
                        onChange={(event) => parseInt(event.target.value) && setNrRounds(event.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        className={'input--wrapper'}
                        label="Number of Series/Round"
                        margin="normal"
                        variant="filled"
                        value={nrSets}
                        onChange={(event) => parseInt(event.target.value) && setNrSets(event.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        className={'input--wrapper'}
                        label="Number of Players/Series"
                        margin="normal"
                        variant="filled"
                        value={nrPlayers}
                        onChange={(event) => parseInt(event.target.value) && setNrPlayers(event.target.value)}
                    />
                </div>
            </div>
            <div className="row player--wrapper">
                <div>Team Names (Type each name followed by a comma)</div>
                <div>
                    <TextField
                        className={'input--wrapper'}
                        label="Team Names"
                        multiline
                        rows="2"
                        margin="normal"
                        variant="filled"
                        value={players}
                        onChange={handlePlayers}
                    />
                </div>
                <div className={"error-message"}>Number of teams left: {nrPlayers - playersArray.length}</div>
            </div>
            <div className="row password--wrapper">
                <div>Set credentials for jurry to Log in</div>
                <div>
                    <TextField
                        className={'input--wrapper'}
                        label="Username"
                        margin="normal"
                        variant="filled"
                        value={juryUser}
                        onChange={(event) => setJuryUser(event.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        className={'input--wrapper'}
                        label="Password"
                        margin="normal"
                        variant="filled"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        className={'input--wrapper'}
                        label="Confirm Password"
                        margin="normal"
                        variant="filled"
                        type="password"
                        value={confirmPassword}
                        onFocus={setFocus}
                        onBlur={setBlur}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
                {errorPassword && <div className={"error-message"}> Passwords do not match </div>}
            </div>
            <div>
                <Button
                    onClick={sendData}
                    variant="contained"
                    color={"primary"}
                    className={"main-button"}
                >
                    {'Create Event'}
                </Button>
            </div>
        </div>
    );
}

export default CreateEvent;