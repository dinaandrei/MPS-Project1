import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    const logout = () => {
        localStorage.setItem('isAdmin', false);
        localStorage.setItem('isJury', false);
        history.push("/");
    }

    return (
        <div className="logout">
            <Button
                onClick={logout}
                variant="contained"
                color={"primary"}
            >
                {'Log out'}
            </Button>

        </div>
    );
}

export default Logout;