import {CapacitorHttp} from "@capacitor/core"
import {Summary} from "../app/summary"
import {getSummaryUrl} from "./urls"

interface SummaryResponse {
    id: number
    user_id: number
    family_id: number
    amount: number
    description:string
    category_id: number
    created_at: Date
    category_color: string
    category_description: string
    name: string
    email: string
    picture_profile: string
}

export const getSummary = async (): Promise<Summary[]> => {
    const result = await CapacitorHttp.get({
        url: getSummaryUrl,
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if(result.status === 200) {
        return (result.data as SummaryResponse[]).map(summary => {
            console.log(summary)
            return ({
                id: summary.id,
                userId: summary.user_id,
                familyId: summary.family_id,
                amount: summary.amount,
                description: summary.description,
                categoryId: summary.category_id,
                createdAt: summary.created_at,
                categoryColor: summary.category_color,
                categoryDescription: summary.category_description,
                name: summary.name,
                email: summary.email,
                pictureProfile: summary.picture_profile
            })
        })
    }

    throw new Error(result.data.error)
}