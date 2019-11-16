import React, { useState, createContext, useEffect } from 'react';
import EventContestants from './EventContestants';
import EventCriterias from './EventCriterias';
import EventDetails from './EventDetails';
import {routes} from '../../../utils/backendRoutes';
import {postData} from '../../../utils/fetches'

const CreateEventApi = createContext(null);

const CreateEvent = ({ongoingEvent, setOngoingEvent}) => {
    const [contestType, setContestType] = useState();
    const [nrRounds, setNrRounds] = useState(0);
    const [nrSets, setNrSets] = useState(0);
    const [nrPlayers, setNrPlayers] = useState(0);
    const [players, setPlayers] = useState("");
    const [playersArray, setPlayersArray] = useState([]);
    const [criterias, setCriterias] = useState([]);
    const [criteriasArray, setCriteriasArray] = useState([]);
    const [juryUser, setJuryUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const [detailsCreated, setDetailsCreated] = useState(!!ongoingEvent);
    const [criteriasCreated, setCriteriasCreated] = useState(!!ongoingEvent);
    const [playersCreated, setPlayersCreated] = useState(!!ongoingEvent);

    const sendDetailsData = () => { 
        setDetailsCreated(true);
        const body = {
            type: contestType,
            numberOfRounds: nrRounds,
            numberOfSeries: nrSets,
            contestantsPerSeries: nrPlayers,
            username: juryUser,
            password: password,
        }
        postData(routes.postContest, body).then(event => console.log({event}));
    }
    const sendPlayersData = () => { 
        setPlayersCreated(true) 
        const body = {
            pairNames:playersArray
        }
        postData(routes.postContestants, body).then(event => console.log({event}));;
    }
    const sendCategoriesData = () => { 
        setCriteriasCreated(true); setOngoingEvent(true)
        const body = {
            names: criteriasArray
        }
        postData(routes.postCategories, body).then(event => console.log({event}));;
    }

    const handlePlayers = (event) => {
        const { value } = event.target;
        const array = value.split(',');
        setPlayersArray(array);
        setPlayers(value);
    }

    const handleCriterias = (event) => {
        const { value } = event.target;
        const array = value.split(',');
        setCriteriasArray(array);
        setCriterias(value);
    }

    const setBlur = () => password !== confirmPassword && setErrorPassword(true);
    const setFocus = () => setErrorPassword(false);

    const renderContent = () => {
        return (
            <>
                {!detailsCreated && <EventDetails />}
                {detailsCreated && !playersCreated && <EventContestants />}
                {detailsCreated && playersCreated && !criteriasCreated && <EventCriterias />}
            </>

        )
    }

    const api = {
        contestType, setContestType, nrRounds, setNrRounds, nrSets, setNrSets,
        nrPlayers, setNrPlayers, juryUser, setJuryUser, password, setPassword,
        confirmPassword, setConfirmPassword, errorPassword, players, playersArray, nrPlayers,
        criterias, handlePlayers, setBlur, setFocus, sendCategoriesData, sendDetailsData, handleCriterias,
        sendPlayersData,
    };

    return (
        <div className="create-event--wrapper">
            <div className="title"> {'Create your Desired Event'}</div> 
            <CreateEventApi.Provider value={api}>
                {renderContent()}
            </CreateEventApi.Provider>
        </div>
    );
}

export default CreateEvent;
export { CreateEventApi }