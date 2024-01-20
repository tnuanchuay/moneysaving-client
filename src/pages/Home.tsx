import {useCallback, useEffect, useState} from "react";
import CashBalanceCard from "../components/CashBalanceCard";
import SegmentControl from "../components/SegmentControl";
import TransactionList from "../components/TransactionList";
import {getSummary} from "../api/summary";
import {Summary} from "../app/summary";
import Spinner from "../components/Spinner";
import {useNavigate} from "react-router-dom";
import Dropdown from "../components/Dropdown";
import {userContext} from "../stores/userStore";
import {appSettingContext} from "../stores/settingStore";
import {HomeFilter, TimeRange} from "../app/common";

export const Home = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [transactions, setTransactions] = useState<Summary[]>([]);

    const filter = appSettingContext((state) => state.homePageFilter);
    const setFilter = appSettingContext((state) => state.setHomePageFilter);

    const range = appSettingContext((state) => state.homePageRange);
    const setRange = appSettingContext((state) => state.setHomePageRange);

    const navigate = useNavigate();
    const userId = userContext((state) => state.id);

    const getData = useCallback(async () => {
        const since = range === "This week" ? "w" : range === "This month" ? "m" : "y";
        const transactions = await getSummary(since);
        setTransactions(transactions);
        setIsLoading(false);
    }, [range]);

    const createNewTransaction = useCallback(() => {
        navigate("/transaction/new");
    }, []);

    useEffect(() => {
        getData();
    }, [range]);

    const getBalance = () => {
        if (transactions.length === 0) return 0;

        return transactions
            .filter((transaction) => transaction.userId === userId)
            .reduce((acc, transaction) => {
                return acc + transaction.amount
            }, 0)
    };

    const getFilteredTransactions = (filter: string) => {
        if (filter === "All") return transactions
        else if (filter === "Income")
            return transactions.filter((transaction) => transaction.amount > 0)
        else if (filter === "Expense")
            return transactions.filter((transaction) => transaction.amount < 0)
        else return transactions;
    };

    if (isLoading) {
        return <Spinner/>
    }

    const onSelectDropdown = (option: TimeRange) => {
        setRange(option);
    }

    return (
        <div className="flex-col px-6">
            <div className="flex-col bg-white">
                <div className="my-3">
                    <CashBalanceCard
                        balance={getBalance()}
                        onClickPlus={() => createNewTransaction()}
                    />
                </div>
                <div className="my-3">
                    <SegmentControl
                        segments={["All", "Income", "Expense"]}
                        defaultSelected={filter}
                        onSegmentChange={(segment) => {
                            setFilter(segment as HomeFilter);
                        }}
                    />
                </div>
                <h2 className="text-2xl font-bold">Transactions</h2>
                <div className="flex my-3">
                    <Dropdown options={["This week", "This month", "This year"]} selectedOption={range}
                              setSelectedOption={onSelectDropdown}/>
                </div>
            </div>
            <div className="flex">
                <TransactionList transactions={getFilteredTransactions(filter)}/>
            </div>
        </div>
    )
}
