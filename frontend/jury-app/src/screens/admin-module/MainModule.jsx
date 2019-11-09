import React, { useState } from 'react';

import CreateEvent from './CreateEvent';
import Navigation from './Navigation';

const NAVIGATION_ITEMS = {
    CREATE: 'Create Event',
    ONGOING: 'Ongoing Event',
    DEFAULT: 'Default',
}

const MainAdminPage = () => {
    const list = [NAVIGATION_ITEMS.CREATE, NAVIGATION_ITEMS.ONGOING];
    const [selected, setSelected] = useState('Default')

    const handleSelect = (element) => setSelected(element);

    const renderContent = () => {
        switch (selected){
            case NAVIGATION_ITEMS.CREATE:
                return <CreateEvent/>
            case NAVIGATION_ITEMS.ONGOING:
                return <div> ONGOING EVENT</div>
            case NAVIGATION_ITEMS.DEFAULT:
                return <div>DEFAULT</div>
            default:
                return <div>ERROR</div>;
        }
    }

    return (
        <div>
            <Navigation list={list} selected={selected} handleSelect={handleSelect} />
            {renderContent()}
        </div>
    );
}

export default MainAdminPage;