import MobileMenu from "../components/MobileMenu";
import {useNavigate} from "react-router-dom";
import {AppMenuList} from "../app/menu";
import {memo} from "react";

export const MenuPage = memo(() => {

    const navigate = useNavigate()
    const onLinkClicked = (url:string) => () => {
        navigate(url)
        // props.onLinkClicked()
    }
    return (
        <MobileMenu Menus={AppMenuList} onLinkClicked={() => {}} />
    )
})