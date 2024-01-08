import {Family} from "../app/family"
import {useCallback} from "react";
import {createFamilyInviteLink} from "../api/family";
import {Clipboard} from "@capacitor/clipboard";
import {Dialog} from "@capacitor/dialog";
import {FamilyCard} from "./FamilyCard";

interface Props {
    families: Family[]
}

const FamilyList = (props: Props) => {
    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-2xl font-bold mb-3">Families</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {props.families.map((family, index) => (
                    <FamilyCard family={family} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default FamilyList