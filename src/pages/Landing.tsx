import React, {useCallback, useEffect, useState} from 'react';
// import {CapacitorCookies} from '@capacitor/core';
import {Navigate} from "react-router-dom";
import SegmentControl from "../components/SegmentControl";
import {CapacitorCookies} from "@capacitor/core";

export const Landing: React.FC = () => {
    // const [token, setToken] = useState<string | undefined>(undefined);
    const [needRedirect, setNeedRedirect] = useState<boolean>(false);

    const getToken = useCallback(async () => {
        const cookies = await CapacitorCookies.getCookies();
        if (!cookies["token"]) {
            setNeedRedirect(true);
        }
    }, [])

    useEffect(() => {
        getToken();

    }, []);

    if (needRedirect) {
        return (
            <Navigate to={"/login"} />
        )
    }

    return (
        <h1>
            Hello World
        </h1>
    )
}

