import MobileMenu from "../components/MobileMenu"
import {useNavigate} from "react-router-dom"
import {AppMenuList} from "../app/menu"
import {memo} from "react"

export const MenuPage = memo(() => {
    return (
        <MobileMenu Menus={AppMenuList} />
    )
})