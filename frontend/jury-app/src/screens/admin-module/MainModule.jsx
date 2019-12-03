import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import CreateEvent from './create-event/CreateEvent';
import Logout from '../../components/Logout';
import Navigation from '../../components/Navigation';
import DefaultMessage from './DefaultMessage';
import { routes } from '../../utils/backendRoutes';
import { getData, deleteData, postData } from '../../utils/fetches'
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
    const history = useHistory();
    const location = useLocation();

    const [selected, setSelected] = useState('Default')
    const [ongoingEvent, setOngoingEvent] = useState(false)
    const [eventStarted, setStartedEvent] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [roundsNumber, setRoundsNumber] = useState(0);
    const [currentSet, setCurrentSet] = useState(0);
    const [setsNumber, setSetsNumber] = useState(0);
    const [players, setPlayers] = useState([]);
    const [criterias, setCriterias] = useState([]);

    const handleSelect = (element) => setSelected(element);
    const handleDefaultClick = () => setSelected(ongoingEvent ? NAVIGATION_ITEMS.ONGOING : NAVIGATION_ITEMS.CREATE)

    const ongoingList = NAVIGATION_ITEMS_LIST.slice(2).map((x, index) => ({
        name: x,
        func: () => handleSelect(x),
        description: DESCRIPTIONS[index],
    }))

    const goTo = (route) => {
        history.push(route);
    }

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin") === "true";
        const isJury = localStorage.getItem("isJury") === "true";
        console.log({ isJury, isAdmin })

        if (isJury && location.pathname !== '/jury') {
            console.log("1")
            goTo("/jury");
        } else if (!isAdmin && location.pathname === '/admin') {
            console.log("1")
            goTo("/");
        }
        getOngoingEvent();
    }, [])

    useEffect(() => {
        getOngoingEvent();
    }, [selected])

    const startEvent = () => {
        setStartedEvent(true);
    }

    const getRoundAndSeries = () => {
        getData(routes.getCurrentRound).then(res => console.log(setCurrentRound(res)));
        getData(routes.getCurrentSeries).then(res => console.log(setCurrentSet(res)));
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
        getData(routes.getContest).then(event => {
            console.log({ event })
            setOngoingEvent(event.length > 0);
            if (event.length > 0) {
                setSetsNumber(event[0].numberOfSeries);
                setRoundsNumber(event[0].numberOfRounds);
                // startEvent();
            }
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
        getRoundAndSeries();
    }

    const startNextRound = () => {
        return postData(routes.postEndRound)
            .then(() => {
                postData(routes.postStartRound)
                    .then(res => setCurrentRound(res))
            });
    }

    const startNextSet = () => {
        return postData(routes.postEndSeries)
            .then(() => {
                postData(routes.postStartSeries)
                    .then(res => setCurrentSet(res))
            });
    }

    const endRound = () => {
        startNextRound().then(() =>
            postData(routes.postStartSeries)
                    .then(res => setCurrentSet(res))
        );
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
                    currentSet={currentSet}
                    startNextSet={startNextSet}
                    startNextRound={startNextRound}
                    roundsNumber={roundsNumber}
                    seriesNumber={setsNumber}
                    startEvent={startEvent}
                    endRound={endRound}
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
            <Logout />
        </div>
    );
}

export default MainAdminPage;