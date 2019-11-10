import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {CreateEventApi} from './CreateEvent';

const EventContestants = () => {
    const api = useContext(CreateEventApi);
    const {players, playersArray, nrPlayers, handlePlayers, sendPlayersData} = api;

    return(
        <>
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
            <div>
            <Button
                onClick={sendPlayersData}
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

export default EventContestants;