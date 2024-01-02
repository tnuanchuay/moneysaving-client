import {CapacitorHttp} from "@capacitor/core";
import {createCategoryUrl, getCategoriesUrl} from "./urls";

interface CategoryResponse {
    user_id: number
    family_id: number
    name: string
    description: string
    color: string
    created_at: Date
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

export const getCategories = async (): Promise<CategoryResponse[]> => {
    const result = await CapacitorHttp.get({
        url: getCategoriesUrl,
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if(result.status === 200) {
        return result.data as CategoryResponse[]
    }

    throw new Error(result.data.error)
}