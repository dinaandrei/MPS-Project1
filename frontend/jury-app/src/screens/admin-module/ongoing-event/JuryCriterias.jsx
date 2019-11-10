import React from 'react';
import Button from '@material-ui/core/Button';

const JuryCriterias = ({ criteriasList, setCriteriasList }) => {

    const renderTeams = () => criteriasList.map(criteria =>
        <div className="element element-two-buttons">
            <div className="title">{criteria}</div>
            <Button
                // onClick={disqualifyTeam}
                variant="contained"
                color={"secondary"}
                className="button top-button"
            >
                {'Edit'}
            </Button>
            <Button
                // onClick={disqualifyTeam}
                variant="contained"
                color={"primary"}
                className="button"
            >
                {'Delete'}
            </Button>
        </div>
    )

    return (
        <div>
            <div className="title">{'Teams that are still in the "Game"'}</div>
            <div className="ongoing-event--wrapper">
                {renderTeams()}
            </div>
            <div>
                <Button
                    onClick={setCriteriasList}
                    variant="contained"
                    color={"secondary"}
                    className="button"
                >
                    {'Submit new Criterias'}
                </Button>
            </div>
        </div>
    )
}

export default JuryCriterias;