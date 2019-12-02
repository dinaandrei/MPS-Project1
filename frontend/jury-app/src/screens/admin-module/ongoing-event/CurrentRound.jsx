import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';

const CurrentRound = ({ eventStarted, currentRound, roundsNumber, startEvent, startNextRound, endEvent, getRounds}) => {

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
            <div></div>
            <Button
                onClick={condition? endEvent : startNextRound}
                variant="contained"
                color={"secondary"}
                className="button"
            >
                {condition? "End Event" : `Start Round ${currentRound + 1}`}
            </Button>
        </div>
    )

    return (
        <div className="current-round--wrapper">
            {renderContent()}
        </div>
    );
}

export default CurrentRound;