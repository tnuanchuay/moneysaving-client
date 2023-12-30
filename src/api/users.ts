import {loginUrl} from "./urls";
import { CapacitorHttp } from '@capacitor/core';

export const login = async (email: string, password: string) => {
    const result = await CapacitorHttp.request({
        method: 'POST',
        url: loginUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email,
            password
        },
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if(result.status === 200) {
        console.log("users", "headers", result)
        return true
    }

    throw new Error(result.data.error)
}