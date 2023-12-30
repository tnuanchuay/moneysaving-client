import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import {Navigate} from "react-router-dom";

export const Landing: React.FC = () => {
    const [token, setToken] = useState<string | undefined>(undefined);
    const [needRedirect, setNeedRedirect] = useState<boolean>(false);
    useEffect(() => {
        const token = Cookies.get("token");
        console.log(Cookies.get())
        if (token) {
            setToken(token);
        }

        if (!token) {
            setNeedRedirect(true);
            return
        }


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

