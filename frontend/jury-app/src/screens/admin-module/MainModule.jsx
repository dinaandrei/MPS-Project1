import React, { useState, useEffect } from 'react';

import CreateEvent from './create-event/CreateEvent';
import Navigation from '../../components/Navigation';
import DefaultMessage from './DefaultMessage';
import { routes } from '../../utils/backendRoutes';
import { getData, deleteData } from '../../utils/fetches'
import
OngoingEvent,
{
    DeleteRounds,
    CurrentRounds,
    DisqualifyTeams,
    JuryCriterias,
} from './ongoing-event';

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
    const [eventStarted, setStartedEvent] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [roundsNumber, setRoundsNumber] = useState(0);
    const [currentSet, setCurrentSet] = useState(0);
    const [players, setPlayers] = useState([]);
    const [criterias, setCriterias] = useState([]);

    const handleSelect = (element) => setSelected(element);
    const handleDefaultClick = () => setSelected(ongoingEvent ? NAVIGATION_ITEMS.ONGOING : NAVIGATION_ITEMS.CREATE)

    const ongoingList = NAVIGATION_ITEMS_LIST.slice(2).map((x, index) => ({
        name: x,
        func: () => handleSelect(x),
        description: DESCRIPTIONS[index],
    }))

    useEffect(() => {
        getOngoingEvent();
    }, [])

    const startEvent = () => {
        setStartedEvent(true);
    }

    const deleteRound = (index) => {
        // delete round with index
    }

    const disqualifyTeam = (team) => {
        deleteData(routes.deleteTeam(team))
        .then(() => {
            // if(res.status/100 === 2)
            getTeams();
        })
    }

    const submitCriteria = (criterias) => {
        // post criterias
    }

    const deleteCriteria = (criteriaId) => {
        deleteData(routes.deleteCriteria(criteriaId))
        .then(() => {
            // if(res.status/100 === 2)
            getCriterias();
        })
    }

    const getOngoingEvent = () => {
        getData(routes.getContest).then(res => {
            console.log({ res })
            setOngoingEvent(res.length > 0);
        });
    }
    
    const getTeams = () => {
        getData(routes.getContestants).then(res => {
            console.log({ res })
            setPlayers(res);
        });
    }

    const getCriterias = () => {
        getData(routes.getCriterias).then(res => {
            console.log({ res })
            setCriterias(res);
        });
    }

    const getRounds = () => {
        getData(routes.getRounds).then(res => {
            console.log({ res })
            setCurrentRound(res);
            setRoundsNumber(res.roundsNumber)
        });
        getSet();
    }

    const getSet = () => {
        getData(routes.getSets).then(res => {
            console.log({ res })
            setCurrentSet(res);
        });
    }

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
                return <CurrentRounds
                    getRounds={getRounds}
                    eventStarted={eventStarted}
                    currentRound={currentRound}
                    startEvent={startEvent}
                />
            case NAVIGATION_ITEMS.DELETE_ROUND:
                return <DeleteRounds
                    getRounds={getRounds}
                    roundsNumber={roundsNumber}
                    deleteRound={deleteRound}
                    currentRound={currentRound}
                    currentSet={currentSet}
                />
            case NAVIGATION_ITEMS.DELETE_TEAM:
                return <DisqualifyTeams
                    getTeams={getTeams}
                    teamsList={players}
                    disqualifyTeam={disqualifyTeam}
                />
            case NAVIGATION_ITEMS.CHANGE_DEFAULT_VALUES:
                return <JuryCriterias
                    getCriterias={getCriterias}
                    criteriasList={criterias}
                    setCriteria={submitCriteria}
                    deleteCriteria={deleteCriteria}
                />
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