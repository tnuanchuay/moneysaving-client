import React, {useCallback, useEffect} from 'react'
import CashBalanceCard from "../components/CashBalanceCard";
import {getTransactions} from "../api/transactions";
import {Transaction} from "../app/transactions";
import SegmentControl from "../components/SegmentControl";

export const Home: React.FC = () => {
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);

    const getData = useCallback(async () => {
        const balance = await getTransactions();
        setTransactions(balance);
    }, []);

    useEffect(() => {
        getData();
    }, []);

    const getBalance = () => {
        if (transactions.length === 0)
            return 0;

        return transactions.reduce((acc, transaction) => {
            return acc + transaction.amount
        }, 0)
    }

    return (
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 justify-center m-6">
            <div>
                <CashBalanceCard balance={getBalance()}/>
                <SegmentControl segments={["All", "Income", "Expense"]} defaultSelected={"All"} onSegmentChange={() => {
                }}/>
            </div>
        </div>
    )
}