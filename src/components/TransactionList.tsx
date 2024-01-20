import {Transaction} from "../app/transactions"
import TransactionCard from "./TransactionCard"
import {Summary} from "../app/summary"
import {ReactNode} from "react";
import TransactionSpenderPicture from "./TransactionSpenderPicture";
import {PlaceHolderProfilePicture} from "./PlaceHolderProfilePicture";
import {useNavigate} from "react-router-dom";

interface Props {
    transactions: Summary[]
}

const TransactionList = (props: Props) => {
    const profilePicture: { [name: string]: ReactNode } = {}
    const navigate = useNavigate()

    const onHoldCard = (id: number) => {
        navigate(`/transaction/${id}/edit`)
    }

    props.transactions.forEach((transaction) => {
        if(!profilePicture[transaction.name]) {
            profilePicture[transaction.name] = transaction.pictureProfile ? (
                <TransactionSpenderPicture imageUrl={transaction.pictureProfile} />
            ) : (
                <PlaceHolderProfilePicture size={12} name={transaction.name} email={transaction.email} />
            )
        }
    });

    return (
        <ul className="flex flex-col w-full">
            {props.transactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} profilePicture={profilePicture[transaction.name]} onClick={onHoldCard}/>
            ))}
        </ul>
    )
}

export default TransactionList