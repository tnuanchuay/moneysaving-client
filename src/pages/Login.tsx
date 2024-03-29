import {Dialog} from '@capacitor/dialog'

import {login} from "../api/users"
import {Navigate, useNavigate} from "react-router-dom"
import {setObject} from "../core/preferences"
import {useState} from "react"
import {userContext} from "../stores/userStore";

export const LogIn: React.FC = () => {
    const setUserContext = userContext((state) => state.setUserContext)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [successfulLogin, setSuccessfulLogin] = useState<boolean>(false)
    const navigate = useNavigate()

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const [id, token] = await login(formData.email, formData.password)
            setUserContext(id)
            await setObject("id", `${id}`)
            await setObject("token", token)
            setSuccessfulLogin(true)
        } catch (err) {
            Dialog.alert({
                title: "Login Failed",
                message: err.message,
            })
        }
    }

    if (successfulLogin) {
        return (
            <Navigate to={"/"}/>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign in</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-lg font-bold">Username</label>
                        <input
                            className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm"
                            type="text"
                            id="email"
                            name="email"
                            placeholder="johndoe@mail.com"
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-lg font-bold">Password</label>
                        <input
                            className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm"
                            type="password"
                            id="password"
                            name="password"
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex py-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                    <div className="flex py-2">
                        <button
                            type="button"
                            className="w-full bg-white border-2 border-black text-black font-bold py-2 rounded-md transition duration-300"
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}