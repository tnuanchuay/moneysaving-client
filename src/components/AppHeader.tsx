import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import MobileMenu, {Menu} from "./MobileMenu";

const AppHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();
    const handleClick = () => setIsMenuOpen(!isMenuOpen);

    const menus: Menu[] = [
        {
            text: "Home",
            url: "/home",
        },
        {
            text: "Profile",
            url: "/profile",
        },
        {
            text: "Category",
            url: "/category",
        },
{
            text: "Family",
            url: "/family",
        },
        {
            text: "Logout",
            url: "/logout",
        },
    ];

    return (
        <div>
            <header className="sticky top-0 bg-white py-4 px-6 flex justify-between items-center">
                <div className="text-lg font-bold text-gray-800">Money Saving !</div>
                <nav className="hidden lg:flex items-center">
                    <ul className="flex space-x-6">
                        {
                            menus.map((menu) => (
                                <li>
                                    <button
                                        className="text-gray-800 hover:text-gray-600 focus:outline-none"
                                        onClick={() => navigate(menu.url)}
                                    >
                                        {menu.text}
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                <button className="text-gray-800 focus:outline-none lg:hidden" onClick={handleClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"/>
                        </svg>
                    </svg>
                </button>
            </header>
            {
                isMenuOpen && (<MobileMenu Menus={menus}/>)
            }
        </div>
    );
};

export default AppHeader;