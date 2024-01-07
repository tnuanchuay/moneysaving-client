import {Family, FamilyInviteLink} from "../app/family"
import {createFamilyInviteLinkUrl, createFamilyUrl, getFamilyUrl} from "./urls"
import {CapacitorHttp} from "@capacitor/core"

interface FamilyResponse {
    id: number
    name: string
    description: string
    created_at: Date
}

interface FamilyInviteLinkResponse {
    url: string
}

export const getFamilies = async (): Promise<Family[]> => {
    const result = await CapacitorHttp.request({
        method: 'GET',
        url: getFamilyUrl,
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if (result.status === 200) {
        return (result.data as FamilyResponse[]).map(family => ({
            id: family.id,
            name: family.name,
            description: family.description,
            createdAt: family.created_at
        }))
    }

    throw new Error(result.data.error)
}

export const createFamily = async (name: string, description: string) => {
    const result = await CapacitorHttp.request({
        method: 'POST',
        url: createFamilyUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            name: name,
            description: description
        },
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if (result.status === 201) {
        return
    }

    throw new Error(result.data.error)
}

export const createFamilyInviteLink = async (familyId: number): Promise<FamilyInviteLink> => {
    const result = await CapacitorHttp.request({
        method: 'POST',
        url: createFamilyInviteLinkUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            id: familyId
        },
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if (result.status === 201) {
        return (result.data as FamilyInviteLinkResponse)
    }

    throw new Error(result.data.error)
}