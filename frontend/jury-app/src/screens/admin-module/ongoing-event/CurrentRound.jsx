import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';

const CurrentRound = ({ eventStarted, currentRound, currentSet, 
    roundsNumber, startEvent, startNextRound, startNextSet,
    endEvent, getRounds}) => {

    useEffect(()=>{
        getRounds();
    },[]);

    const renderContent = () => eventStarted ? renderCurrentRound() : renderStartEvent()

    const renderStartEvent = () => (
        <div className="start-event--wrapper">
            <div className="title">{'The set-up is ready! All you need to do is start the event'}</div>
            <Button
                onClick={startEvent}
                variant="contained"
                color={"secondary"}
                className="button"
            >
                {'Start Event'}
            </Button>
        </div>
    )

    const renderCurrentRound = (condition = roundsNumber === currentRound) => (
        <div className="start-event--wrapper current-round">
            <div className="title">{'Round Status'}</div>
            <div className="buttons-rounds">
                <Button
                    onClick={condition? endEvent : startNextRound}
                    variant="contained"
                    color={"secondary"}
                    className="button"
                >
                    {condition? "End Event" : `Start Round ${currentRound + 1}`}
                </Button>
                <Button
                    onClick={startNextSet}
                    variant="contained"
                    className="button button-green"
                >
                    {condition? "End Round" : `Start Series ${currentSet + 1}`}
                </Button>
            </div>
        </div>
    )

    return (
        <div className="current-round--wrapper">
            {renderContent()}
        </div>
    );
}

export default CurrentRound;