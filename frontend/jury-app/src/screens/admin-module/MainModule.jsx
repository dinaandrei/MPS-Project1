import React, { useState } from 'react';

import CreateEvent from './create-event/CreateEvent';
import Navigation from '../../components/Navigation';
import DefaultMessage from './DefaultMessage';
import OngoingEvent from './ongoing-event';

const NAVIGATION_ITEMS = {
    CREATE: 'Create Event',
    ONGOING: 'Ongoing Event',
    CURRENT_ROUND: 'Current Round',
    DELETE_ROUND: 'Delete Rounds',
    DELETE_TEAM: 'Disqualify Team',
    CHANGE_DEFAULT_VALUES: 'Modify jury criterias',
    SPECIAL_ROUNDS: 'Special Rounds',
    DEFAULT: 'Default',
}

const DESCRIPTIONS = [
    'Lets you see Current Round, end it and also Start the next one or ultimately end the event',
    'Gives you the ability to delete a certain round regardless it was in the past or if is upcomming',
    'You can delete or disqualify one of the teams',
    'You can add, delete or modify the default criterias of the jury',
    'If two or more teams are at a tie, you can add another BONUS round to ...untie it!',
]

const NAVIGATION_ITEMS_LIST = Object.values(NAVIGATION_ITEMS);
const NAVIGATION_NO_EVENT = [NAVIGATION_ITEMS.CREATE, NAVIGATION_ITEMS.ONGOING]
NAVIGATION_ITEMS_LIST.pop();


const MainAdminPage = () => {
    const [selected, setSelected] = useState('Default')
    const [ongoingEvent, setOngoingEvent] = useState(false)

    const handleSelect = (element) => setSelected(element);
    const handleDefaultClick = () => setSelected(ongoingEvent ? NAVIGATION_ITEMS.ONGOING : NAVIGATION_ITEMS.CREATE)

    const ongoingList = NAVIGATION_ITEMS_LIST.slice(2).map((x,index)=>({
        name:x,
        func: () => handleSelect(x),
        description: DESCRIPTIONS[index],
    }))

    const renderContent = () => {
        switch (selected) {
            case NAVIGATION_ITEMS.CREATE:
                if (!ongoingEvent)
                    return <CreateEvent ongoingEvent={ongoingEvent} setOngoingEvent={setOngoingEvent} />;
                return <DefaultMessage ongoingEvent={ongoingEvent} handleDefaultClick={handleDefaultClick} />;
            case NAVIGATION_ITEMS.ONGOING:
                if (ongoingEvent)
                    return <OngoingEvent list={ongoingList} />
                return <DefaultMessage ongoingEvent={ongoingEvent} handleDefaultClick={handleDefaultClick} />;
            case NAVIGATION_ITEMS.CURRENT_ROUND:
                return <div>asdasdas</div>
            case NAVIGATION_ITEMS.DELETE_ROUND:
                return <div> delete round</div>
            case NAVIGATION_ITEMS.DELETE_TEAM:
                return <div> delete team</div>
            case NAVIGATION_ITEMS.CHANGE_DEFAULT_VALUES:
                return <div> change default values</div>
            case NAVIGATION_ITEMS.SPECIAL_ROUNDS:
                return <div> special rounds</div>
            case NAVIGATION_ITEMS.DEFAULT:
                return <DefaultMessage ongoingEvent={ongoingEvent} handleDefaultClick={handleDefaultClick} />
            default:
                return <div>ERROR</div>;
        }
    }

    return (
        <div>
            <Navigation
                list={ongoingEvent ?
                    NAVIGATION_ITEMS_LIST : NAVIGATION_NO_EVENT
                }
                selected={selected}
                handleSelect={handleSelect}
            />
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
}

export default MainAdminPage;