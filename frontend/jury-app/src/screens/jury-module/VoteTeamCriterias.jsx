import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Slider from '../../components/Slider';

const VoteTeamCriterias = ({ name, criterias, submit, cancel }) => {

    const [scores, setScores] = useState(criterias.map(x=>""));

    const setInputScore = ( value, i ) => {
        const newScores = [...scores];
        newScores[i] = value;
        setScores(newScores);
    }

    const renderCriteriaValues = () => criterias.map((crit, i) => 
        <div key={`${crit}--jury-crit`} className="criteria">
            <div style={{ marginBottom:'15px'}}>{crit}</div>
            <div>
                <Slider onChange={(event, value) => setInputScore(value, i)} value={scores[i]}/>
            </div>
        </div>    
    )

    const submitTeam = () => {
        const result = scores.map((x,i) => ({mark: x/10, category:criterias[i]}))
        submit(result);
    }

    const cancelTeam = () => {
        cancel()
    }

    const renderButtons = () =>
        <div className="jury-team-buttons">
            <Button
                onClick={submitTeam}
                variant="contained"
                color={"secondary"}
                className="button"
            >
                {'Sumbit Score'}
            </Button>
            <Button
                onClick={cancelTeam}
                variant="contained"
                color={"primary"}
                className="button"
            >
                {'Cancel'}
            </Button>
        </div>

    return (
        <div className="jury-team-criteria">
            <div className="title">{name}</div>
            <div className="jury-score-criterias">
                {renderCriteriaValues()}
            </div>
            {renderButtons()}
        </div>
    )
}

export default VoteTeamCriterias;