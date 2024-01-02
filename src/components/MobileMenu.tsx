import {useState} from 'react';
import {Link} from "react-router-dom";

export interface Menu {
    text: string;
    url: string;
}

interface Props {
    Menus: Menu[];
}

const MobileMenu = (props: Props) => {
    const menusList = props.Menus.map((menu, index) => (
        <li key={index} className="flex justify-end">
            <Link to={menu.url} className="text-xl py-2 px-4 block">{menu.text}</Link>
        </li>
    ));

    return (
        <div className="absolute flex flex-col w-full h-full backdrop-blur-lg z-50">
            <div className="flex-1 flex flex-col items-center">
                <nav className="justify-item-end w-full pr-3">
                    <ul>
                        {menusList}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;