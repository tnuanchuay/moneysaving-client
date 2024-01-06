import {Transaction} from "../app/transactions"
import TransactionCard from "./TransactionCard"
import {Summary} from "../app/summary";

interface Props {
    transactions: Summary[]
}

const TransactionList = (props: Props) => {
    return (
            <ul className="overflow-hidden">
                {props.transactions.map((transaction) => (
                    <TransactionCard key={transaction.id} transaction={transaction}/>
                ))}
            </ul>
    )
}

export default TransactionList