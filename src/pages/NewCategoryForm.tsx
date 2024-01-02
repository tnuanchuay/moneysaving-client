import {useState} from 'react';
import {createCategory} from "../api/category";
import { Dialog } from '@capacitor/dialog';
import {useNavigate} from "react-router-dom";

const NewCategoryForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(name === "" || description === "" || selectedColor === "") {
            await Dialog.alert({
                title: "Error",
                message: "Please fill all fields",
            })

            return;
        }

        try {
            await createCategory(name, description, selectedColor)
            navigate("/category")
        } catch (err) {
            console.log(err)
        }
    };

    const handleCancel = () => {
        // Clear form fields when cancel is clicked
        setName('');
        setDescription('');
        setSelectedColor('');
    };

    const colorPalette = [
        'bg-red-500',
        'bg-blue-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-gray-500',
    ];

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Category Name"
                        value={name}
                        onChange={handleNameChange}
                        required={true}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description:
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        placeholder="Category Description"
                        value={description}
                        onChange={handleDescriptionChange}
                        required={true}
                    />
                </div>
                <div className="mb-4">
                    <p className="block text-gray-700 text-sm font-bold mb-2">Select Color:</p>
                    <div className="flex space-x-2">
                        {colorPalette.map((color, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`w-8 h-8 rounded-full ${color} ${selectedColor === color ? 'shadow-sm border-4 border-black' : 'hello'}`}
                                onClick={() => handleColorSelect(color)}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Create
                    </button>
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewCategoryForm;