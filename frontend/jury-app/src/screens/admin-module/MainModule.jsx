import React, { useState } from 'react';

import CreateEvent from './create-event/CreateEvent';
import Navigation from '../../components/Navigation';
import DefaultMessage from './DefaultMessage';

const NAVIGATION_ITEMS = {
    CREATE: 'Create Event',
    ONGOING: 'Ongoing Event',
    CURRENT_ROUND: 'Current_Round',
    DELETE_ROUND: 'Delete Rounds',
    DELETE_TEAM: 'Disqualify Team',
    CHANGE_DEFAULT_VALUES: 'Modify jury criterias',
    SPECIAL_ROUNDS: 'Special Rounds',
    DEFAULT: 'Default',
}

const NAVIGATION_ITEMS_LIST = Object.values(NAVIGATION_ITEMS);
NAVIGATION_ITEMS_LIST.pop();


const MainAdminPage = () => {
    const list = NAVIGATION_ITEMS_LIST;
    const [selected, setSelected] = useState('Default')
    const [ongoingEvent, setOngoingEvent] = useState(false)

    const handleSelect = (element) => setSelected(element);
    const handleDefaultClick = () => setSelected(ongoingEvent ? NAVIGATION_ITEMS.ONGOING : NAVIGATION_ITEMS.CREATE)

    const renderContent = () => {
        switch (selected) {
            case NAVIGATION_ITEMS.CREATE:
                return <CreateEvent />
            case NAVIGATION_ITEMS.ONGOING:
                return <div> ONGOING EVENT</div>
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
            <Navigation list={list} selected={selected} handleSelect={handleSelect} />
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
}

export default MainAdminPage;