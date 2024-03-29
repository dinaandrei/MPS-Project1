import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

const CurrentRound = ({ eventStarted, currentRound, currentSet,
    roundsNumber, seriesNumber, startEvent, startNextRound, startNextSet,
    endEvent, getRounds, endRound }) => {

    const [roundStarted, setRoundStarted] = useState(false);

    useEffect(() => {
        getRounds();
    }, []);

    useEffect(() => {
        if (currentSet === seriesNumber)
            setRoundStarted(false)
    }, [currentSet])

    const startRound = () => {
        setRoundStarted(true);
        startNextRound()
    }

    const end = () => {
        setRoundStarted(true);
        endRound();
    }

    const start = () => {
        setRoundStarted(true);
        startEvent();
    }

    const renderContent = () => eventStarted ? renderCurrentRound() : renderStartEvent()

    const renderStartEvent = () => (
        <div className="start-event--wrapper">
            <div className="title">{'The set-up is ready! All you need to do is start the event'}</div>
            <Button
                onClick={start}
                variant="contained"
                color={"secondary"}
                className="button"
            >
                {'Start Event'}
            </Button>
        </div>
    )

    const renderEventStop = () =>
        <div className="title">
            THE EVENT HAS ENDED
        </div>

    const renderCurrentRound = (
        condition2 = seriesNumber === currentSet,
    ) => console.log({ currentRound, roundsNumber }) || (
        <div className="start-event--wrapper current-round">
            <div className="title">{'Round Status'}</div>
            <div className="buttons-rounds">
                {<Button
                    onClick={condition2 ? end : startRound}
                    variant="contained"
                    color={"secondary"}
                    className="button"
                    disabled={roundStarted}
                >
                    {condition2 ? "End Round" : `Start Round ${currentRound + 1}`}
                </Button>}
                <Button
                    onClick={startNextSet}
                    variant="contained"
                    className="button button-green"
                    disabled={!roundStarted}
                >
                    {`Start Series ${currentSet + 1}`}
                </Button>
            </div>
        </div>
    )

    return (
        <div className="current-round--wrapper">
            { currentRound >= roundsNumber ? renderEventStop() : renderContent()}
        </div>
    );
}

export default CurrentRound;