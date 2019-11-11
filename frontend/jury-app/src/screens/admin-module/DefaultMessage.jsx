import React from 'react';
import Button from '@material-ui/core/Button';

const DefaultMessage = ({ ongoingEvent, handleDefaultClick }) => {

    const renderMessage = () => ongoingEvent ?
        <div className="default-message">
            <div className="title">{'There is an ongoing Event, You should visit it'}</div>
            <Button
                onClick={handleDefaultClick}
                variant="contained"
                color={"primary"}
                className={"main-button"}
            >
                {'Visit Event'}
            </Button>
        </div> :
        <div className="default-message">
            <div className="title">{'There are no Events Created'}</div>
            <Button
                onClick={handleDefaultClick}
                variant="contained"
                color={"primary"}
                className={"main-button"}
            >
                {'Create Event'}
            </Button>
        </div>


    return renderMessage()
}

export default DefaultMessage;