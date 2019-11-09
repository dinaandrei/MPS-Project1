import React, { useState } from 'react';

import CreateEvent from './CreateEvent';
import Navigation from '../../components/Navigation';
import DefaultMessage from './DefaultMessage';

const NAVIGATION_ITEMS = {
    CREATE: 'Create Event',
    ONGOING: 'Ongoing Event',
    DEFAULT: 'Default',
}

const MainAdminPage = () => {
    const list = [NAVIGATION_ITEMS.CREATE, NAVIGATION_ITEMS.ONGOING];
    const [selected, setSelected] = useState('Default')
    const [ongoingEvent, setOngoingEvent] = useState(false)

    const handleSelect = (element) => setSelected(element);
    const handleDefaultClick = () => setSelected(ongoingEvent? NAVIGATION_ITEMS.ONGOING : NAVIGATION_ITEMS.CREATE)

    const renderContent = () => {
        switch (selected){
            case NAVIGATION_ITEMS.CREATE:
                return <CreateEvent/>
            case NAVIGATION_ITEMS.ONGOING:
                return <div> ONGOING EVENT</div>
            case NAVIGATION_ITEMS.DEFAULT:
                return <DefaultMessage ongoingEvent={ongoingEvent} handleDefaultClick={handleDefaultClick}/>
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