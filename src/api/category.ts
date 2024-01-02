import {CapacitorHttp} from "@capacitor/core";
import {createCategoryUrl} from "./urls";

interface CategoryRequest {
    name: string
    description: string
    co: string
}

export const createCategory = async (name: string, description: string, color: string) => {
    const result = await CapacitorHttp.request({
        method: 'POST',
        url: createCategoryUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            name,
            description,
            color
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