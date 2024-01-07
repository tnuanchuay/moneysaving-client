import {CapacitorHttp} from "@capacitor/core"
import {createCategoryUrl, getCategoriesUrl} from "./urls"
import {Category} from "../app/category"

interface CategoryResponse {
    id: number
    user_id: number
    family_id: number
    name: string
    description: string
    color: string
    created_at: string
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

export const getCategories = async (): Promise<Category[]> => {
    const result = await CapacitorHttp.get({
        url: getCategoriesUrl,
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if(result.status === 200) {
        return (result.data as CategoryResponse[]).map(category => ({
            id: category.id,
            userId: category.user_id,
            familyId: category.family_id,
            name: category.name,
            description: category.description,
            color: category.color,
            createdAt: new Date(category.created_at)
        }))
    }

    throw new Error(result.data.error)
}