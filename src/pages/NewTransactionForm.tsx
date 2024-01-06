import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {createCategory, getCategories} from "../api/category";
import {Category} from "../app/category";
import Spinner from "../components/Spinner";
import {createTransaction} from "../api/transactions";
import {stringToNumber} from "../app/stringutils";
import {Dialog} from "@capacitor/dialog";

const TransactionForm = () => {
    const [allCategories, setCategories] = useState([] as Category[]);
    const [isLoading, setIsLoading] = useState(true);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null as Category);

    const navigate = useNavigate();

    const getCategoryCallback = useCallback(async () => {
        try {
            const categories = await getCategories()
            setCategories(categories)
            setIsLoading(false)
        } catch {
            console.log("error")
        }
    }, [])

    const createTransactionCallback = useCallback(async () => {
        try {
            const amountInt = stringToNumber(amount)
            await createTransaction(amountInt, description, selectedCategory ? selectedCategory.id : null)
            navigate(-1)
        } catch (e){
            console.log(e)
            await Dialog.alert({
                title: "Error",
                message: e.message,
            })
        }
    }, [amount, description, selectedCategory])

    useEffect(() => {
        getCategoryCallback()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', {amount, description, category: selectedCategory});
        createTransactionCallback()
    };

    const onSelectCategory = (category: Category) => {
        setSelectedCategory(category);
    }

    const handleGoBack = useCallback(() => {
        navigate(-1)
    }, [])

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="mx-auto">
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
                        Amount
                    </label>
                    <input
                        type="text"
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
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                        Category
                    </label>
                    <div className="flex-col">
                        {
                            allCategories.map((category, index) => (
                                <div className="flex my-3 items-center">
                                    <button
                                        className={`flex  w-8 h-8 rounded-full ${category.color} ${selectedCategory && category.id === selectedCategory.id ? 'shadow-sm border-4 border-black' : ''}`}
                                        key={index}
                                        type="button"
                                        onClick={() => onSelectCategory(category)}
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
                                onClick={() => onSelectCategory(null)}
                            />
                            <p className="text text-lg mx-3">Not in any category</p>
                        </div>
                    </div>
                </div>
                <div className="absolute w-auto flex-cols bottom-0 right-0 left-0 m-4 items-center">
                    <button
                        className="flex justify-center items-center my-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Create Transaction
                    </button>
                    <button
                        className="flex justify-center items-center my-3 w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => handleGoBack()}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TransactionForm;