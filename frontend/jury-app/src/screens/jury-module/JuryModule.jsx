import React, { useState, useEffect } from 'react';
import VoteTeamCriterias from './VoteTeamCriterias';
import { routes } from '../../utils/backendRoutes';
import { getData } from '../../utils/fetches';
import Button from '@material-ui/core/Button';
import GroupIcon from '../../group.svg'

const MainJuryPage = () => {

    const [teams, setTeams] = useState([]);
    const [criterias, setCriterias] = useState([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        refetchData();
    }, [])

    const refetchData = () => {
        getData(routes.getContestants).then(res => setTeams(res));
        getData(routes.getCriterias).then(res => setCriterias(res.map(x => x.name)));
    }

    const sendData = (grades) => { 
        console.log({grades, selected})
        cancel();
    }

    const cancel = () => {
        setSelected("")
    }

    const renderTeams = () => !selected ?
        <div className="teams--wrapeer">{
            teams.map(team =>
                <div key={`${team.pairName}--jury-card`} className="team--jury" onClick={() => setSelected(team)}>
                    {team.pairName}
                    <img style={{ width: '80px' }} src={GroupIcon} />
                </div>
            )
        }</div> :
        <VoteTeamCriterias
            criterias={criterias}
            submit={sendData}
            cancel={cancel}
            name={selected.pairName}
        />


    return (
        <div className="content jury-content">
            {!selected &&
                <>
                    <div className="title">Choose your votes Wisely!</div>
                    <div className="button--refresh">
                        <Button
                            onClick={refetchData}
                            variant="contained"
                            color={"primary"}
                        >
                            {'Refresh Round!'}
                        </Button>
                    </div>
                </>}
            {renderTeams()}
        </div>
    );
}

export default MainJuryPage;