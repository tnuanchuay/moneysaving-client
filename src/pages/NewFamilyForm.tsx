import {useCallback, useState} from "react"
import {useNavigate} from "react-router-dom";
import {createFamily} from "../api/family";
import {Dialog} from "@capacitor/dialog";

export const NewFamilyForm = () => {
    const [familyName, setFamilyName] = useState('')
    const [familyDescription, setFamilyDescription] = useState('')
    const navigate = useNavigate()

    const createFamilyCallback = useCallback(async () => {
        try {
            await createFamily(familyName, familyDescription)
            navigate("/family")
        } catch (e) {
            await Dialog.alert({
                title: "Error",
                message: "Cannot create family.",
            })
        }
    }, [familyName, familyDescription])

    const handleFormSubmit = (e) => {
        e.preventDefault()

        createFamilyCallback()
    }

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleFormSubmit} className="bg-white">
                <div className="px-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="familyName">
                            Family Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="familyName"
                            type="text"
                            placeholder="Enter family name"
                            value={familyName}
                            onChange={(e) => setFamilyName(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="familyDescription">
                            Family Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="familyDescription"
                            placeholder="Enter family description"
                            value={familyDescription}
                            onChange={(e) => setFamilyDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="absolute w-auto flex-cols bottom-0 right-0 left-0 m-4 items-center">
                    <button
                        className="flex justify-center items-center my-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Create
                    </button>
                    <button
                        className="flex justify-center items-center my-3 w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
