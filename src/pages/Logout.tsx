import {useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {CapacitorCookies, CapacitorHttp} from "@capacitor/core";
import {clearAllObjects} from "../core/preferences";
import {logout} from "../api/users";

export const Logout = () => {
    const navigate = useNavigate()

    const logoutCallback = useCallback(async () => {
        await CapacitorCookies.clearAllCookies()
        await clearAllObjects()
        await logout()

        navigate("/")
    }, [])

    useEffect(() => {
        logoutCallback()
    }, []);

    return (
        <div />
    )
}