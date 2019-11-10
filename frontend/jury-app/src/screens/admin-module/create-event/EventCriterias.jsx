import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {CreateEventApi} from './CreateEvent';

const EventCriterias = () => {
    const api = useContext(CreateEventApi);
    const {criterias, handleCriterias, sendCategoriesData} = api;

    return(
        <>
        <div className="row player--wrapper">
                <div>Jury Criterias (Type each name followed by a comma)</div>
                <div>
                    <TextField
                        className={'input--wrapper'}
                        label="Jury Categories"
                        multiline
                        rows="5"
                        margin="normal"
                        variant="filled"
                        value={criterias}
                        onChange={handleCriterias}
                    />
                </div>
            </div>
            <div>
            <Button
                onClick={sendCategoriesData}
                variant="contained"
                color={"primary"}
            >
                {'Create Event Jury Criterias'}
            </Button>
        </div>
        </>
    )
}

export default EventCriterias;