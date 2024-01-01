import React, {useCallback, useEffect} from 'react'
import CashBalanceCard from "../components/CashBalanceCard";
import {getTransactions} from "../api/transactions";
import {Transaction} from "../app/transactions";
import SegmentControl from "../components/SegmentControl";
import AppHeader from "../components/AppHeader";
import TransactionList from "../components/TransactionList";
import transactionList from "../components/TransactionList";

export const Home: React.FC = () => {
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [filter, setFilter] = React.useState<string>("All");

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
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 justify-center mx-6 top-3">
            <div>
                <div className="my-3">
                    <CashBalanceCard balance={getBalance()}/>
                </div>
                <div className="my-3">
                    <SegmentControl segments={["All", "Income", "Expense"]} defaultSelected={"All"}
                                    onSegmentChange={segment => {
                                        setFilter(segment);
                                    }}/>
                </div>
                <div className="my-3">
                    <TransactionList transactions={getFilteredTransactions(filter)}/>
                </div>
            </div>
        </div>
    )
}