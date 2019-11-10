import React from 'react';
import Button from '@material-ui/core/Button';

const DeleteRounds = ({ roundsNumber, currentRound }) => {
    const array = new Array(roundsNumber);
    const renderButtonsList = () => array.map((elem,index) =>
        <div className={"element"}>
            <div className="secondary-title">Round {index}: </div>
            <Button
                onClick={elem.func}
                variant="contained"
                color={"secondary"}
                className="button"
            >
                {'Delete Round'}
            </Button>
        </div>
    )

    return (
        <div>
            <div className="title">{'Delete Rounds'}</div>
            <div className="ongoing-event--wrapper">
                {renderButtonsList()}
            </div>
        </div>
    );
}

export default DeleteRounds;