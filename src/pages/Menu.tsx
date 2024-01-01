import {useState} from 'react';
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <div className="absolute flex flex-col w-full h-full backdrop-blur-lg z-50">
            <div className="flex-1 flex flex-col items-center">
                <nav className="justify-item-end w-full pr-3">
                    <ul>
                        <li className="flex justify-end">
                            <Link to="/home" className="text-xl py-2 px-4 block">Home</Link>
                        </li>
                        <li className="flex justify-end">
                            <Link to="/profile" className="text-xl py-2 px-4 block">Profile</Link>
                        </li>
                        <li className="flex justify-end">
                            <Link to="/family" className="text-xl py-2 px-4 block">Family</Link>
                        </li>
                        <li className="flex justify-end">
                            <Link to="/category" className="text-xl py-2 px-4 block">Category</Link>
                        </li>
                        <li className="flex justify-end">
                            <Link to="/logout" className="text-xl py-2 px-4 block">Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Menu;