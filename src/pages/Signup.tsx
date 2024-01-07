import {useCallback, useState} from 'react';
import {PlaceHolderProfilePicture} from "../components/PlaceHolderProfilePicture";
import {Dialog} from "@capacitor/dialog";
import {setObject} from "../core/preferences";
import {signUp} from "../api/users";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const navigate = useNavigate();

    const signUpCallback = useCallback(async () => {
        try{
            await signUp(username, email, password)
            await Dialog.alert({
                title: "Success",
                message: "Account created successfully",
            })
            navigate('/')
        }catch (e) {
            Dialog.alert({
                title: "Error",
                message: e.message,
            })
        }
    }, [email, username, password])

    const handleSignUp = (e) => {
        e.preventDefault();

        if (password !== cPassword) {
            Dialog.alert({
                title: "Error",
                message: "Passwords do not match",
            })

            return
        }

        signUpCallback()
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSignUp}>
                <h2 className="text-2xl font-bold mb-4 text-center">Sign up</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="cpassword" className="block text-gray-700 font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="cpassword"
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Confirm your password"
                        value={cPassword}
                        onChange={(e) => setCPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;