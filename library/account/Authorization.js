import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthenticationHandler from "./AuthenticationHandler";
import AppInfo from "../utility/AppInfo";
import TokenHandler from "../utility/TokenHandler";
import Utility from "../utility/Utility";

const Authorization = ({children, permissions, isRender = false}) => {
    const authenticationHandler = new AuthenticationHandler();
    const navigation = new useNavigate()
    const tokenHandler = new TokenHandler()
    const utility = new Utility();
    const [isAuthorization, setIsAuthorization] = useState(false);


    const authorization = async () => {
        try {
            let result = await authenticationHandler.getToken();
            let data = tokenHandler.decodeToken(result.message);
            if (!data.isSuccess)
                throw new Error(data.message);

            let permissionsData = data.message.permissions;

            if (permissionsData) {
                if (Array.isArray(permissions)) {
                    const hasPermission = permissions.some(permission => permissionsData.includes(permission));
                    setIsAuthorization(hasPermission);
                } else if (typeof permissions === 'string') {
                    setIsAuthorization(permissionsData.includes(permissions));
                } else {
                    throw new Error("Invalid type for permissionNames. Expected an array or string.");
                }
            } else {
                if (isRender) {
                    navigation(AppInfo.unauthorizedUrl);
                }
            }

        } catch (error) {
            console.log(utility.getError(error));
        }
    }

    useEffect(() => {
        authorization()
    }, [isAuthorization]);

    if (!isAuthorization) {
        return null;
    }

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default Authorization;