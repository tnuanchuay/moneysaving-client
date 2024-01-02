import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

export interface Menu {
    text: string;
    url: string;
}

interface Props {
    Menus: Menu[];
    onLinkClicked: () => void;
}

const MobileMenu = (props: Props) => {
    const navigate = useNavigate();
    const onLinkClicked = (url:string) => () => {
        navigate(url);
        props.onLinkClicked();
    }

    const menusList = props.Menus.map((menu, index) => (
        <li key={index} className="flex justify-end">
            <div onClick={onLinkClicked(menu.url)} className="text-xl font-semibold py-2 px-4 block">{menu.text}</div>
        </li>
    ));

    return (
        <div className="absolute flex flex-col w-full h-full bg-white z-50">
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