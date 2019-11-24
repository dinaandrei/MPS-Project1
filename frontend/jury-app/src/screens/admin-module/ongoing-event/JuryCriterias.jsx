import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';

const JuryCriterias = ({ criteriasList, setCriteria, deleteCriteria, getCriterias}) => {

    useEffect(() => {
        getCriterias();
    }, []);

    const renderTeams = () => criteriasList.map(criteria =>
        <div key={`${criteria.name}--criteria`} className="element element-two-buttons">
            <div className="title">{criteria.name}</div>
            <Button
                // onClick={setCriteria}
                variant="contained"
                color={"secondary"}
                className="button top-button"
            >
                {'Edit'}
            </Button>
            <Button
                onClick={() => deleteCriteria(criteria.id)}
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
        </div>
    )
}

export default JuryCriterias;