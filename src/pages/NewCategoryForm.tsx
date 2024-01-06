import {useCallback, useState} from 'react'
import {createCategory} from "../api/category"
import {Dialog} from '@capacitor/dialog'
import {useNavigate} from "react-router-dom"

const NewCategoryForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const navigate = useNavigate()

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleColorSelect = (color) => {
        setSelectedColor(color)
    }

    const handleGoBack = useCallback(() => {
        navigate(-1)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (name === "" || description === "" || selectedColor === "") {
            await Dialog.alert({
                title: "Error",
                message: "Please fill all fields",
            })

            return
        }

        try {
            await createCategory(name, description, selectedColor)
            navigate("/category")
        } catch (err) {
            console.log(err)
        }
    }

    const handleCancel = () => {
        // Clear form fields when cancel is clicked
        setName('')
        setDescription('')
        setSelectedColor('')
        handleGoBack()
    }

    const colorPalette = [
        'bg-red-500',
        'bg-blue-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-gray-500',
    ]

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded">
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
                            className={`w-8 h-8 rounded-full ${color} ${selectedColor === color ? 'shadow-sm border-4 border-black' : ''}`}
                            onClick={() => handleColorSelect(color)}
                        />
                    ))}
                </div>
            </div>
            <div className="absolute w-auto flex-cols bottom-0 right-0 left-0 m-4 items-center">
                <button
                    className="flex justify-center items-center my-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Create
                </button>
                <button
                    className="flex justify-center items-center my-3 w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default NewCategoryForm