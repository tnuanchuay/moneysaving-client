import {UserProfile} from "../app/user"
import {getUserProfileUrl} from "./urls"
import {CapacitorHttp} from "@capacitor/core"

interface UserProfileResponse {
    name: string
    email: string
    create_at: Date
    user_id: number
    profile_picture: string
}

export const getUserProfile = async (): Promise<UserProfile> => {
    const result = await CapacitorHttp.request({
        method: 'GET',
        url: getUserProfileUrl,
        webFetchExtra: {
            credentials: 'include'
        }
    })

    if(result.status === 200) {
        return [(result.data as UserProfileResponse)].map(userProfile => ({
            id: userProfile.user_id,
            name: userProfile.name,
            email: userProfile.email,
            profilePicture: userProfile.profile_picture
        }))[0]
    }

    throw new Error(result.data.error)
}

export const createUserProfile = async (profilePicture: string) => {
    const result = await CapacitorHttp.request({
        method: 'POST',
        url: getUserProfileUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            profile_picture: profilePicture
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