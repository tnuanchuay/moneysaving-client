import {loginUrl} from "./urls";
import {CapacitorHttp} from '@capacitor/core';

export const login = async (email: string, password: string): Promise<string> => {
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
        console.log(result)
        return getTokenFromCookie(result.headers["Set-Cookie"])
    }

    throw new Error(result.data.error)
}

const getTokenFromCookie = (setCookie: string) => {
    console.log(setCookie)
    return setCookie.split(";")[0].split("=")[1]
}