import React from 'react';
import Button from '@material-ui/core/Button';

const DisqualifyTeams = ({ teamsList, disqualifyTeam }) => {

    const renderTeams = () => teamsList.map(team => 
        <div className="element">
            <div className="title">{team}</div>
            <Button
                onClick={disqualifyTeam}
                variant="contained"
                color={"primary"}
                className="button"
            >
                {'Disqualify Team'}
            </Button>
        </div>
    )

    return (
        <div>
            <div className="title">{'Teams that are still in the "Game"'}</div>
            <div className="ongoing-event--wrapper">
                {renderTeams()}
            </div>
        </div>
    )
}

export default DisqualifyTeams;