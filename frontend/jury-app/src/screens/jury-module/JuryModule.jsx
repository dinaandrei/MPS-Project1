import React, { useState, useEffect } from 'react';
import VoteTeamCriterias from './VoteTeamCriterias';
import { useLocation, useHistory } from 'react-router-dom';
import { routes } from '../../utils/backendRoutes';
import { getData, postData } from '../../utils/fetches';
import Button from '@material-ui/core/Button';
import GroupIcon from '../../group.svg'
import WinnerIcon from '../../winner.png';
import Logout from '../../components/Logout';

const MainJuryPage = () => {
    const history = useHistory();
    const location = useLocation();

    const [teams, setTeams] = useState([]);
    const [criterias, setCriterias] = useState([]);
    const [selected, setSelected] = useState("");

    const goTo = (route) => {
        history.push(route);
    }

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin") === "true";
        const isJury = localStorage.getItem("isJury") === "true";

        if (!isJury && location.pathname === '/jury') {
            goTo("/");
        } else if (isAdmin && location.pathname !== '/admin') {
            goTo("/admin");
        }
        refetchData();
    }, [])

    const refetchData = () => {
        getData(routes.getContestants).then(res => setTeams(res));
        getData(routes.getCriterias).then(res => setCriterias(res.map(x => x.name)));
    }

    const sendData = (grades) => {
        console.log({ grades, selected })
        grades.forEach(({ mark, category }) => {
            const body = {
                mark: mark,
                category: category,
                contestantName: selected.pairName,
            }
            console.log({ body })
            postData(routes.voteTeam, body);
        })
        cancel();
    }

    const cancel = () => {
        setSelected("")
    }

    const renderWinner = () =>
        <div>
            <div className="title">We have a winner:</div>
            <img style={{ width: '300px' }} src={WinnerIcon} />
            <div className="title" style={{textAlign: 'center'}}>{teams[0].pairName}</div>
        </div>

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
            {teams.length === 1 ? renderWinner() : renderTeams()}
            <Logout />
        </div>
    );
}

export default MainJuryPage;