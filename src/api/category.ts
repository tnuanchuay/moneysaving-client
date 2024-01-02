import {CapacitorHttp} from "@capacitor/core";

interface CategoryRequest {
    name: string
    description: string
    icon_url: string
}

export const createCategory = async () => {
    const result = await CapacitorHttp.request({
        method: 'POST',
        url: 'http://localhost:8000/api/v0/categories',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {

        },
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if(result.status === 200) {
        console.log(result)
        return
    }

    throw new Error(result.data.error)
}