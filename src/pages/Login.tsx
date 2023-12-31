import React from 'react';
import { Dialog } from '@capacitor/dialog';

import {login} from "../api/users";
import {Navigate} from "react-router-dom";
import {setObject} from "../core/preferences";

export const LogIn: React.FC = () => {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });

    const [successfulLogin, setSuccessfulLogin] = React.useState<boolean>(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const token = await login(formData.email, formData.password)
            await setObject("token", token);
            setSuccessfulLogin(true);
        }catch(err){
            Dialog.alert({
                title: "Login Failed",
                message: err.message,
            })
        }
    }

    if(successfulLogin) {
        return (
            <Navigate to={"/"} />
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">Username</label>
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
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <input
                            className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm"
                            type="password"
                            id="password"
                            name="password"
                            onChange={onChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}