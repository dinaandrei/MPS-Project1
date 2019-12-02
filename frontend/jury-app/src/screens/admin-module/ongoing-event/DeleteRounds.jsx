import React from 'react';
import Button from '@material-ui/core/Button';

const DeleteRounds = ({ roundsNumber, currentRound, deleteRound }) => {

    const renderButtonsList = () => {
        let result = [];
        for (let i = 1; i <= roundsNumber; i++) {
            result.push(
                <div className={"element"}>
                    <div className="second-title more-margin">Round {i}: </div>
                    <div className={currentRound >= i ? "past-round round-icon" : "future-round round-icon"} />
                    <Button
                        onClick={() => deleteRound(i)}
                        variant="contained"
                        color={"primary"}
                        className="button"
                    >
                        {'Delete Round'}
                    </Button>
                </div>
            )
        }
        return result;
    }

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