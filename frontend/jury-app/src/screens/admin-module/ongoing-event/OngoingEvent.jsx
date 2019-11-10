import React from 'react';
import Button from '@material-ui/core/Button';

const OngoingEvent = ({ list }) => {

    const renderButtonsList = () => console.log(list) || list.map(elem =>
        <div className={"element"} key={elem.name}>
            <div className="description">{elem.description}</div>
            <Button
                onClick={elem.func}
                variant="contained"
                color={"secondary"}
                className="button"
            >
                {elem.name}
            </Button>
        </div>
    )

    return (
        <div>
            <div className="title">{'The event has Started! Choose one of the following actions!'}</div>
            <div className="ongoing-event--wrapper">
                {renderButtonsList()}
            </div>
        </div>
    );
}

export default OngoingEvent;