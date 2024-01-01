import {Transaction} from "../app/transactions";
import TransactionCard from "./TransactionCard";

interface Props {
    transactions: Transaction[];
}

const TransactionList = (props: Props) => {
    return (
        <div className="max-w-lg mx-auto mb-2">
            <h2 className="text-2xl font-bold">Transactions</h2>
            <ul className="overflow-hidden">
                {props.transactions.map((transaction) => (
                    <TransactionCard key={transaction.id} transaction={transaction}/>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;