import React, { useState, createContext } from 'react';
import EventContestants from './EventContestants';
import EventCriterias from './EventCriterias';
import EventDetails from './EventDetails';

const CreateEventApi = createContext(null);

const CreateEvent = () => {
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

    
    const sendDetailsData = () => { }
    const sendCategoriesData = () => { }
    const sendPlayersData = () => { }
    
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
    
    const api = { contestType, setContestType, nrRounds, setNrRounds, nrSets, setNrSets,
        nrPlayers, setNrPlayers, juryUser, setJuryUser, password, setPassword,
        confirmPassword, setConfirmPassword, errorPassword, players, playersArray, nrPlayers,
        criterias, handlePlayers, setBlur, setFocus, sendCategoriesData, sendDetailsData, handleCriterias,
        sendPlayersData,
    };

    return (
        <div className="create-event--wrapper">
            <CreateEventApi.Provider value={api}>
                <EventDetails />
                <EventCriterias />
                <EventContestants />
            </CreateEventApi.Provider>
        </div>
    );
}

export default CreateEvent;
export {CreateEventApi}