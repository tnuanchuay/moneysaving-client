import {useCallback, useEffect, useState} from 'react'
import {Navigate, useNavigate} from "react-router-dom"
import {CapacitorCookies, CapacitorHttp} from "@capacitor/core"
import {getObject} from "../core/preferences"
import {resumeSession} from "../api/users";

export const Landing = () => {
    const navigate = useNavigate()

    const getToken = useCallback(async () => {
        const cookies = await CapacitorCookies.getCookies()
        const attemptToken = cookies["token"]
        if (attemptToken && attemptToken !== "undefined") {
            await resumeSession(attemptToken)
            navigate("/home")
            return
        }

        const anotherAttemptToken = await getObject("token")
        if (anotherAttemptToken) {
            await resumeSession(anotherAttemptToken)
            navigate("/home")
            return
        }

        navigate("/login")
    }, [])

    useEffect(() => {
        getToken()
    }, [])

    return (
        <div />
    )
}

