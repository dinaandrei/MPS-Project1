import React, { useState } from 'react';

import Navigation from '../../components/Navigation';
import DefaultMessage from './DefaultMessage';

const NAVIGATION_ITEMS = {
    CURRENT_ROUND: 'Current_Round',
    DELETE_ROUND: 'Delete Rounds',
    DELETE_TEAM: 'Disqualify Team',
    CHANGE_DEFAULT_VALUES: 'Modify jury criterias',
    SPECIAL_ROUNDS: 'Special Rounds',
    DEFAULT: 'Default',
}

const NAVIGATION_ITEMS_LIST = Object.values(NAVIGATION_ITEMS);
NAVIGATION_ITEMS_LIST.pop();

const MainJuryPage = () => {
    const list = NAVIGATION_ITEMS_LIST;
    const [selected, setSelected] = useState('Default')

    const handleSelect = (element) => setSelected(element);

    const renderContent = () => {
        switch (selected) {
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
                return <DefaultMessage />
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

export default MainJuryPage;