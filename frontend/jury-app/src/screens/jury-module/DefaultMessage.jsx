import React from 'react';
import Button from '@material-ui/core/Button';

const DefaultMessage = () => {

    const renderMessage = () => 
        <div className="default-message">
            <div className="title">{'The Event has started. Visit the menu Items to manage the contestants.'}</div>
            <Button>TODO</Button>
        </div>


    return renderMessage()
}

export default DefaultMessage;