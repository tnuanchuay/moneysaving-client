import {useCallback, useEffect, useState} from "react";
import {Category} from "../app/category";
import {getCategories} from "../api/category";

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([])

    const getCategoryCallback = useCallback(async () => {
        try {
            const categories = await getCategories();
            setCategories(categories);
        } catch {
            console.log("error");
        }
    }, [])

    useEffect(() => {
        getCategoryCallback();
    }, []);

    if (categories.length === 0) {
        return (
            <div className="text-center text-gray-500 pt-5">
                <p className="text-2xl font-semibold">No categories yet.</p>
                <p className="text-lg">Create your first category now.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Income/Expense Categories</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category, index) => (
                    <div key={index}
                         className="p-4 border border-gray-300 rounded-lg flex justify-between items-center">
                        <div className="flex-col items-center">
                            <div className="flex">
                                <div className={`h-6 w-6 rounded-full mr-2 ${category.color}`}></div>
                                <span className="text-lg font-semibold">{category.name}</span>
                            </div>
                            <div className="flex">
                                <p className="text-sm text-gray-600">{category.description}</p>
                            </div>
                        </div>
                        <div className="text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;