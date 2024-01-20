import {useCallback, useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {createCategory, getCategories} from "../api/category"
import {Category} from "../app/category"
import Spinner from "../components/Spinner"
import {createTransaction, deleteTransaction, getTransactionById, updateTransaction} from "../api/transactions"
import {stringToNumber} from "../app/stringutils"
import {Dialog} from "@capacitor/dialog"
import {Family} from "../app/family";
import {getFamilies} from "../api/family";
import {Transaction} from "../app/transactions";

type TransactionType = "income" | "expense"
const EditTransactionForm = () => {
    const [transaction, setTransaction] = useState<Transaction>()
    const [transactionType, setTransactionType] = useState<TransactionType>('expense')
    const [isLoading, setIsLoading] = useState(true)
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState([] as Category[])
    const [selectedCategory, setSelectedCategory] = useState(null as Category)
    const [families, setFamilies] = useState([] as Family[])
    const [selectedFamily, setSelectedFamily] = useState(null as Family)
    const {id} = useParams()

    const navigate = useNavigate()

    const colorPalette = [
        'bg-indigo-400',
        'bg-pink-400',
        'bg-purple-400',
        'bg-yellow-400',
        'bg-green-400',
        'bg-blue-400',
        'bg-red-400',
    ]

    const getCategoryCallback = useCallback(async () => {
        try {
            const categories = await getCategories()
            setCategories(categories)
            console.log("get categories", categories)
        } catch (e) {
            await Dialog.alert({
                title: "Error",
                message: e.message,

            })
        }
    }, [])

    const getFamilyCallback = useCallback(async () => {
        try {
            const family = await getFamilies()
            setFamilies(family)
            setSelectedFamily(families.find((family) => family.id === transaction?.familyId) || null as Family)
        } catch (e) {
            await Dialog.alert({
                title: "Error",
                message: e.message,

            })
        }
    }, [])

    const getTransactionCallback = useCallback(async () => {
        try {
            const transaction = await getTransactionById(+id)
            setTransaction(transaction)
            setTransactionType(transaction?.amount > 0 ? 'income' : 'expense')
            setAmount(Math.abs(transaction?.amount || 0) + '')
            setDescription(transaction?.description || '')
            console.log("get transaction", transaction)
        } catch (e) {
            await Dialog.alert({
                title: "Error",
                message: e.message,

            })
        }
    }, [])

    useEffect(() => {
        setSelectedFamily(families.find((family) => family.id === transaction?.familyId) || null as Family)
    }, [transaction, families]);

    useEffect(() => {
        setSelectedCategory(categories.find((category) => category.id === transaction?.categoryId) || null as Category)
    }, [transaction, categories]);

    useEffect(() => {
        getTransactionCallback()
        getCategoryCallback()
        getFamilyCallback()
        setIsLoading(false)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const amountInt = Math.abs(stringToNumber(amount)) * (transactionType === "income" ? 1 : -1)
            await updateTransaction(transaction.id, amountInt, description, selectedCategory?.id || 0, selectedFamily?.id || 0)
            navigate(-1)
        } catch (e) {
            await Dialog.alert({
                title: "Error",
                message: e.message,
            })
        }
    }

    const handleGoBack = useCallback(() => {
        navigate(-1)
    }, [])

    const handleDelete = useCallback(async () => {
        Dialog.confirm({
            title: "Delete Record",
            message: "Are you sure you want to delete this record?",
            okButtonTitle: "Delete",
            cancelButtonTitle: "Cancel",
        }).then(async (result) => {
            if (result.value) {
                try {
                    await deleteTransaction(transaction.id)
                    navigate(-1)
                } catch (e) {
                    await Dialog.alert({
                        title: "Error",
                        message: e.message,
                    })
                }
            }
        })
    }, [transaction])

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="px-6">
                <div className="flex justify-between">
                    <div className="flex my-3 items-center">
                        <button
                            className={`w-8 h-8 rounded-full bg-green-500 ${transactionType === "income" ? 'shadow-sm border-4 border-black' : ''}`}
                            type="button"
                            onClick={() => setTransactionType("income")}
                        />
                        <p className="text text-lg mx-3">Income</p>
                    </div>
                    <div className="flex my-3 items-center">
                        <button
                            className={`w-8 h-8 rounded-full bg-red-500 ${transactionType === "expense" ? 'shadow-sm border-4 border-black' : ''}`}
                            type="button"
                            onClick={() => setTransactionType("expense")}
                        />
                        <p className="text text-lg mx-3">Expense</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter amount"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter description"
                    />
                </div>
                {families.length > 0 ? (<div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                        Family
                    </label>
                    <div className="flex-col">
                        {
                            families.map((family, index) => (
                                <div key={index} className="flex my-3 items-center">
                                    <button
                                        className={`flex w-8 h-8 rounded-full ${colorPalette[index % colorPalette.length]} ${selectedFamily && family.id === selectedFamily.id ? 'shadow-sm border-4 border-black' : ''}`}
                                        key={index}
                                        type="button"
                                        onClick={() => setSelectedFamily(family)}
                                    />
                                    <p className="text text-lg mx-3">{family.name}</p>
                                </div>
                            ))
                        }
                        <div className="flex my-3 items-center">
                            <button
                                className={`flex w-8 h-8 rounded-full bg-black ${selectedFamily === null ? 'shadow-sm border-4 border-gray-500' : ''}`}
                                key={0}
                                type="button"
                                onClick={() => setSelectedFamily(null)}
                            />
                            <p className="text text-lg mx-3">Personal</p>
                        </div>
                    </div>
                </div>) : null}
                {categories.length > 0 ? (<div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                        Category
                    </label>
                    <div className="flex-col">
                        {
                            categories.map((category, index) => (
                                <div key={index} className="flex my-3 items-center">
                                    <button
                                        className={`flex  w-8 h-8 rounded-full ${category.color} ${selectedCategory && category.id === selectedCategory.id ? 'shadow-sm border-4 border-black' : ''}`}
                                        key={index}
                                        type="button"
                                        onClick={() => setSelectedCategory(category)}
                                    />
                                    <p className="text text-lg mx-3">{category.name}</p>
                                </div>
                            ))
                        }
                        <div className="flex my-3 items-center">
                            <button
                                className={`flex  w-8 h-8 rounded-full bg-black ${selectedCategory === null ? 'shadow-sm border-4 border-gray-500' : ''}`}
                                key={0}
                                type="button"
                                onClick={() => setSelectedCategory(null)}
                            />
                            <p className="text text-lg mx-3">Not in any category</p>
                        </div>
                    </div>
                </div>) : null}
            </div>
            <div className="sticky bg-white w-full flex-cols bottom-0 right-0 left-0 p-2 items-center">
                <button
                    className="flex justify-center items-center mb-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Update Transaction
                </button>
                <div className="flex justify-between">
                    <button
                        className="flex justify-center items-center mr-1 w-full hover:bg-gray-700 border-red-500 border-4 text-red-500 font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => handleDelete()}
                    >
                        Delete
                    </button>
                    <button
                        className="flex justify-center items-center ml-1 w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => handleGoBack()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EditTransactionForm