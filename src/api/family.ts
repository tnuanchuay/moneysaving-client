import {Family} from "../app/family";
import {getFamilyUrl} from "./urls";
import {CapacitorHttp} from "@capacitor/core";

interface FamilyResponse {
    id: number
    name: string
    description: string
    created_at: Date
}

export const getFamilies = async (): Promise<Family[]> => {
    const result = await CapacitorHttp.request({
        method: 'GET',
        url: getFamilyUrl,
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if(result.status === 200) {
        return (result.data as FamilyResponse[]).map(family => ({
            id: family.id,
            name: family.name,
            description: family.description,
            createdAt: family.created_at
        }))
    }

    throw new Error(result.data.error)
}