import React, {useCallback, useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {CapacitorCookies} from "@capacitor/core";
import {getObject} from "../core/preferences";

export const Landing: React.FC = () => {
    const [needRedirect, setNeedRedirect] = useState<boolean>(false);

    const getToken = useCallback(async () => {
        const cookies = await CapacitorCookies.getCookies();
        if (cookies["token"]) {
            return
        }

        const token = await getObject("token");
        if (token) {
            await CapacitorCookies.setCookie({
                key: "token",
                value: token,
                url: "localhost",
                path: "/",
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toString(),
            })

            return
        }

        setNeedRedirect(true);
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
        <Navigate to={"/home"} />
    )
}

