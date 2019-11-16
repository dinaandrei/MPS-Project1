import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';

const DisqualifyTeams = ({ teamsList, disqualifyTeam, getTeams }) => {

    useEffect(() => {
        getTeams();
    },[])

    const renderTeams = () => teamsList.map(team => 
        <div key={`${team.id}--team`} className="element">
            <div className="title">{team.pairName}</div>
            <Button
                onClick={() => disqualifyTeam(team.id)}
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