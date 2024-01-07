import FamilyList from '../components/FamilyList'
import {useCallback, useEffect, useState} from "react"
import {getFamilies} from "../api/family"
import {Family} from "../app/family"
import Spinner from "../components/Spinner"
import FloatingButton from "../components/FloatingButton"
import {useNavigate} from "react-router-dom";

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
            console.log("error")
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

    return (
        <div>
            <FamilyList families={families} />
            <FloatingButton onClick={() => navigate("/family/new")}/>
        </div>
    )
}