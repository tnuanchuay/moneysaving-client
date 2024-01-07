import { useCallback, useEffect, useState } from "react";
import CashBalanceCard from "../components/CashBalanceCard";
import SegmentControl from "../components/SegmentControl";
import TransactionList from "../components/TransactionList";
import { getSummary } from "../api/summary";
import { Summary } from "../app/summary";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";

export const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<Summary[]>([]);
  const [filter, setFilter] = useState<string>("All");

  const navigate = useNavigate();

  const getData = useCallback(async () => {
    const transactions = await getSummary();
    setTransactions(transactions);
    setIsLoading(false);
  }, []);

  const createNewTransaction = useCallback(() => {
    navigate("/transaction/new");
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const getBalance = () => {
    if (transactions.length === 0) return 0;

    return transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
  };

  const getFilteredTransactions = (filter: string) => {
    if (filter === "All") return transactions;
    else if (filter === "Income")
      return transactions.filter((transaction) => transaction.amount > 0);
    else if (filter === "Expense")
      return transactions.filter((transaction) => transaction.amount < 0);
    else return transactions;
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex-col">
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
            defaultSelected={"All"}
            onSegmentChange={(segment) => {
              setFilter(segment);
            }}
          />
        </div>
        <h2 className="text-2xl font-bold">Transactions</h2>
        <div className="flex my-3">
          <Dropdown />
        </div>
      </div>
      <div className="flex">
        <TransactionList transactions={getFilteredTransactions(filter)} />
      </div>
    </div>
  );
};
