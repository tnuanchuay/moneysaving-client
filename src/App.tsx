import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom"
import {Landing} from "./pages/Landing"
import {LogIn} from "./pages/Login"
import {Home} from "./pages/Home"

import "./App.css"
import AppHeader from "./components/AppHeader"
import NewCategoryForm from "./pages/NewCategoryForm"
import CategoryList from "./pages/CategoryList"
import {MenuPage} from "./pages/MenuPage"
import NewTransactionForm from "./pages/NewTransactionForm"
import {FamilyPage} from "./pages/Family"
import {FC, ReactNode, useCallback, useEffect} from "react"
import Profile from "./pages/Profile"
import {NewFamilyForm} from "./pages/NewFamilyForm"
import {Logout} from "./pages/Logout";
import SignUp from "./pages/Signup";
import {CapacitorCookies} from "@capacitor/core";
import {getObject} from "./core/preferences";
import {userContext} from "./stores/userStore";

export const App = () => {
    return (
        <CheckingUserContext>
            <RouterProvider router={router}/>
        </CheckingUserContext>
    )
}

const withHeader = (shouldGoBack: boolean, element: ReactNode) => {
    return (
        <div>
            <AppHeader shouldGoBack={shouldGoBack}/>
            {element}
        </div>
    )
}

const withContainer = (element: ReactNode) => {
    return (
        <div className="container mx-auto px-6">
            {element}
        </div>
    )
}

const CheckingUserContext = ({children}) => {
    const userId = userContext((state) => state.id)
    const setUserContext = userContext((state) => state.setUserContext)
    const callback = useCallback(async () => {
        if (userId === 0) {
            const prefUserId = await getObject("id")
            if (prefUserId) {
                setUserContext(+prefUserId)
            }
        }
    }, [userId, setUserContext]);

    useEffect(() => {
        callback()
    }, [callback]);

    return (
        <>
            {children}
        </>
    )
}

const CheckAuth = ({children}) => {
    const navigate = useNavigate()

    const checkAuthCallback = useCallback(async () => {
        const cookies = await CapacitorCookies.getCookies()
        if (!cookies["token"] || cookies["token"] === "undefined") {
            const token = await getObject("token")
            if (!token) {
                navigate("/login")
            }
        }
    }, []);

    useEffect(() => {
        checkAuthCallback()
    }, []);

    return (
        <div>
            {children}
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Landing/>
        ),
    },
    {
        path: "login",
        element: (
            <LogIn/>
        ),
    },
    {
        path: "home",
        element: (
            <CheckAuth>
                {withHeader(false, withContainer(<Home/>))}
            </CheckAuth>
        ),
    },
    {
        path: "transaction/new",
        element: (
            <CheckAuth>
                {withHeader(false, withContainer(<NewTransactionForm/>))}
            </CheckAuth>
        ),
    },
    {
        path: "category/new",
        element: (
            <CheckAuth>
                {withHeader(false, withContainer(<NewCategoryForm/>))}
            </CheckAuth>
        ),
    },
    {
        path: "category",
        element: (
            <CheckAuth>
                {withHeader(false, withContainer(<CategoryList/>))}
            </CheckAuth>
        )
    },
    {
        path: "/menu",
        element: (
            <CheckAuth>
                {withHeader(true, withContainer(<MenuPage/>))}
            </CheckAuth>
        )
    },
    {
        path: "/family",
        element: (
            <CheckAuth>
                {withHeader(false, withContainer(<FamilyPage/>))}
            </CheckAuth>
        ),
    },
    {
        path: "/family/new",
        element: (
            <CheckAuth>
                {withHeader(false, withContainer(<NewFamilyForm/>))}
            </CheckAuth>
        ),
    },
    {
        path: "/profile",
        element: (
            <CheckAuth>
                {withHeader(false, withContainer(<Profile/>))}
            </CheckAuth>
        ),
    },
    {
        path: "/logout",
        element: (
            <Logout/>
        ),
    },
    {
        path: "/signup",
        element: (
            <SignUp/>
        ),
    },
    {
        path: "*",
        element: (
            <h1>Not Found</h1>
        ),
    }
])