import {useCallback, useEffect, useState} from 'react'
import {Navigate, useNavigate} from "react-router-dom"
import {CapacitorCookies, CapacitorHttp} from "@capacitor/core"
import {getObject} from "../core/preferences"

export const Landing = () => {
    const navigate = useNavigate()

    const getToken = useCallback(async () => {
        const cookies = await CapacitorCookies.getCookies()
        if (cookies["token"] && cookies["token"] !== "undefined") {
            navigate("/home")
            return
        }

        const token = await getObject("token")
        if (token) {
            await CapacitorCookies.setCookie({
                key: "token",
                value: token,
                url: "localhost",
                path: "/",
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toString(),
            })

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

