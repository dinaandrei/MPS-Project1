import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {CreateEventApi} from './CreateEvent';


const EventDetails = () => {
    const api = useContext(CreateEventApi);
    const {
        contestType, setContestType, nrRounds, setNrRounds, nrSets, setNrSets,
        nrPlayers, setNrPlayers, juryUser, setJuryUser, password, setPassword,
        confirmPassword, setConfirmPassword, errorPassword, setBlur, setFocus, sendDetailsData} = api;
    
    return (
        <>
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
                    onClick={sendDetailsData}
                    variant="contained"
                    color={"primary"}
                    className={"main-button"}
                >
                    {'Create Event'}
                </Button>
            </div>
        </>
    )
}

export default EventDetails;