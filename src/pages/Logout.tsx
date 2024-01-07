import {useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {CapacitorCookies} from "@capacitor/core";
import {clearAllObjects} from "../core/preferences";

export const Logout = () => {
    const navigate = useNavigate()

    const logoutCallback = useCallback(async () => {
        await CapacitorCookies.clearAllCookies()
        await clearAllObjects()
        navigate("/")
    }, [])

    useEffect(() => {
        logoutCallback()
    }, []);


    return (
        <div />
    )
}