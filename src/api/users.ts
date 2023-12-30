import {loginUrl} from "./urls";


export const login = async (email: string, password: string) => {
    const result = await fetch(loginUrl,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })

    if(result.ok) {
        return true
    }

    const error = await result.json();
    throw new Error(error.error);
}