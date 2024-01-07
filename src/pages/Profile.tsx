import {UserProfile} from "../app/user"
import {useCallback, useEffect, useState} from "react"
import {createUserProfile, getUserProfile} from "../api/profile"
import Spinner from "../components/Spinner"
import {PlaceHolderProfilePicture} from "../components/PlaceHolderProfilePicture"
import {Dialog} from "@capacitor/dialog";

const Profile = () => {
    const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile)
    const [hover, setHover] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getProfileCallback = useCallback(async () => {
        try {
            const user = await getUserProfile()
            if (user.id != 0) {
                setUserProfile(user)
                return
            }

            await createUserProfile("")
            const newUser = await getUserProfile()

            setUserProfile(newUser)
        } catch (e) {
            await Dialog.alert({
                title: "Error",
                message: "Cannot get profile.",
            })
        } finally {
            setIsLoading(false)
        }
    }, [])


    useEffect(() => {
        getProfileCallback()
    }, [])

    if (isLoading) {
        return <Spinner/>
    }

    const profilePicture = userProfile.profilePicture ? (
        <img
            src={userProfile.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full border-blue-500 border-2"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        />
    ) : (
        <PlaceHolderProfilePicture
            size={32}
            name={userProfile.name}
            email={userProfile.email}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}/>
    )

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-8 relative">
            <div
                className="flex justify-center relative"
            >
                <div className="relative">
                    {profilePicture}
                    {hover && (
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
            <div className="text-center mt-4">
                <h1 className="text-xl font-semibold">{userProfile.name}</h1>
                <p className="text-gray-600">{userProfile.email}</p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Change Password
                </button>
            </div>
        </div>
    )
}

export default Profile