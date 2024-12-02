import React, {useEffect, useRef, useState} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Public/css/app.css'

import Dashboard from "./client/dashboard/Dashboard.js"
import NotFound from "../components/shared/NotFound.js";
import MainLayout from "./shared/layout/MainLayout";
import Login from "./account/login/Login";
import Authentication from "../library/account/Authentication";
import Authorization from "../library/account/Authorization";
import Unauthorized from "./shared/Unauthorized";
import AppInfo from "../library/utility/AppInfo";

const App = () => {
    const navigate = useNavigate();
    const hasNavigatedRef = useRef(false);
    const [isCheckingUrl, setIsCheckingUrl] = useState(true);

    useEffect(() => {
        const reloadUrl = document.getElementById("reloadUrl")?.value;

        if (reloadUrl && reloadUrl.length > 0 && !hasNavigatedRef.current) {
            hasNavigatedRef.current = true;
            navigate(reloadUrl, {replace: true});
        }

        // Mark URL checking as complete
        setIsCheckingUrl(false);
    }, [navigate]);

    // Render null while checking the URL
    if (isCheckingUrl) {
        return null;
    }

    return (
        <Routes>
            <Route element={<Authentication/>}>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={
                        <Authorization permissions="change_country" isRender={true}>
                            <Dashboard/>
                        </Authorization>}
                    />
                    <Route path={AppInfo.unauthorizedUrl} element={<Unauthorized/>} />
                </Route>
            </Route>

            <Route path="account/login" element={<Login/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);