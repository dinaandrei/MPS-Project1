import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const CreateEvent = () => {
    const [contestType, setContestType] = useState();

    return (
        <div className="event--wrapper">
            <title> {'Create an Event'}</title>
            <div>
                <Select
                    value={contestType}
                    onChange={event => setContestType(event.target.value)}
                >
                    <MenuItem value={"battle"}>{'Battle Event'}</MenuItem>
                    <MenuItem value={"syncron"}>{'All teams on Stage'}</MenuItem>
                    <MenuItem value={"asyncronous"}>{'One at a time'}</MenuItem>
                </Select>
            </div>
            <div>
                <TextField
                    // onChange={(event) => setUser(event.target.value)}
                    id="filled-basic"
                    label="Something"
                    margin="normal"
                    variant="filled"
                    // value={user}
                />
            </div>
        </div>
    );
}

export default CreateEvent;