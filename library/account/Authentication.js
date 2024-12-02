import React, {Fragment, useEffect, useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";

import AuthenticationHandler from "./AuthenticationHandler";

const Authentication = () => {

    const authenticationHandler = new AuthenticationHandler()
    const [isAuthenticate, setIsAuthenticate] = useState(false);


    const authenticate = async () => {
        let result = await authenticationHandler.getToken();
        setIsAuthenticate(result.isSuccess);
    }

    useEffect(() => {
        authenticate()
    }, [isAuthenticate]);

    if (!isAuthenticate) {
        return null;
    }

    return (
        <Fragment>
            <Outlet/>
        </Fragment>
    );
};

export default Authentication;