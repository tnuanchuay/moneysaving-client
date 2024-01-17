import {loginUrl, logoutUrl, resumeSessionUrl, signUpUrl} from "./urls"
import {CapacitorCookies, CapacitorHttp} from '@capacitor/core'

export const login = async (email: string, password: string): Promise<[number, string]> => {
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
        const cookies = await CapacitorCookies.getCookies()
        return [result.data["id"] as number, cookies["token"]]
    }

    throw new Error(result.data.error)
}

export const signUp = async (name: string, email: string, password: string) => {
    const result = await CapacitorHttp.request({
        method: 'POST',
        url: signUpUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "name": name,
            "email": email,
            "password": password
        },
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if(result.status === 201) {
        return
    }

    throw new Error(result.data.error)
}

export const logout = async () => {
    const result = await CapacitorHttp.request({
        method: 'GET',
        url: logoutUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if(result.status === 200) {
        return
    }

    throw new Error(result.data.error)
}

export const resumeSession = async (token: string): Promise<string> => {
    const result = await CapacitorHttp.request({
        method: 'GET',
        url: resumeSessionUrl,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
        },
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if(result.status === 200) {
        return
    }

    throw new Error(result.data.error)
}