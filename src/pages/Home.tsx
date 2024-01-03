import {useCallback, useEffect, useState} from 'react'
import CashBalanceCard from "../components/CashBalanceCard";
import {getTransactions} from "../api/transactions";
import {Transaction} from "../app/transactions";
import SegmentControl from "../components/SegmentControl";
import TransactionList from "../components/TransactionList";

export const Home = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filter, setFilter] = useState<string>("All");

    const getData = useCallback(async () => {
        const transactions = await getTransactions();
        setTransactions(transactions);
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

    const getFilteredTransactions = (filter: string) => {
        if (filter === "All")
            return transactions;
        else if (filter === "Income")
            return transactions.filter(transaction => transaction.amount > 0);
        else if (filter === "Expense")
            return transactions.filter(transaction => transaction.amount < 0);
        else
            return transactions;
    }

    return (
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 justify-center px-6 top-3">
            <div className="bg-white pb-3">
                <div className="my-3">
                    <CashBalanceCard balance={getBalance()}/>
                </div>
                <div className="my-3">
                    <SegmentControl segments={["All", "Income", "Expense"]} defaultSelected={"All"}
                                    onSegmentChange={segment => {
                                        setFilter(segment);
                                    }}/>
                </div>
                <h2 className="text-2xl font-bold">Transactions</h2>
            </div>
            <div>
                <div className="max-w-lg mx-auto">
                    <TransactionList transactions={getFilteredTransactions(filter)}/>
                </div>
            </div>
        </div>
    )
}