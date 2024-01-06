import FamilyList from '../components/FamilyList';
import {useCallback, useEffect, useState} from "react";
import {getFamilies} from "../api/family";
import {Family} from "../app/family";
import Spinner from "../components/Spinner";

export const FamilyPage = () => {
    const [families, setFamilies] = useState([] as Family[]);
    const [isLoading, setIsLoading] = useState(true);

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
    }, []);

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <div>
            <FamilyList families={families} />
        </div>
    );
};