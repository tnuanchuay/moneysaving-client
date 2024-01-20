import {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"

export interface Menu {
    text: string
    url: string
}

interface Props {
    Menus: Menu[]
}

const MobileMenu = (props: Props) => {
    const navigate = useNavigate()
    const onLinkClicked = (url:string) => () => {
        navigate(url)
    }

    const menusList = props.Menus.map((menu, index) => (
        <li key={index} className="flex justify-end">
            <div onClick={onLinkClicked(menu.url)} className="text-xl font-semibold py-2 block">{menu.text}</div>
        </li>
    ))

    return (
        <div className="flex flex-col bg-white px-6">
            <div className="items-center">
                <nav className="justify-item-end w-full">
                    <ul>
                        {menusList}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default MobileMenu