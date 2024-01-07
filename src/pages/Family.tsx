import FamilyList from '../components/FamilyList'
import {useCallback, useEffect, useState} from "react"
import {getFamilies} from "../api/family"
import {Family} from "../app/family"
import Spinner from "../components/Spinner"
import FloatingButton from "../components/FloatingButton"
import {useNavigate} from "react-router-dom";
import {Dialog} from "@capacitor/dialog";

export const FamilyPage = () => {
    const [families, setFamilies] = useState([] as Family[])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const geFamilyCallback = useCallback(async () => {
        try {
            const families = await getFamilies()
            setFamilies(families)
            setIsLoading(false)
        } catch {
            await Dialog.alert({
                title: "Error",
                message: "Cannot get family list.",
            })
        }
    }, [])

    useEffect(() => {
        geFamilyCallback()
    }, [])

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    const createNewFamilyButton = (
        <FloatingButton onClick={() => navigate("/family/new")}/>
    )

    if (families.length === 0) {
        return (
            <div className="text-center text-gray-500 pt-5">
                <p className="text-2xl font-semibold">You are not in any family.</p>
                <p className="text-lg">Create a new family now.</p>
                {createNewFamilyButton}
            </div>
        )
    }

    return (
        <div>
            <FamilyList families={families} />
            {createNewFamilyButton}
        </div>
    )
}