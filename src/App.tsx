import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Landing} from "./pages/Landing"
import {LogIn} from "./pages/Login"
import {Home} from "./pages/Home"

import "./App.css"
import AppHeader from "./components/AppHeader"
import NewCategoryForm from "./pages/NewCategoryForm"
import CategoryList from "./pages/CategoryList"
import {MenuPage} from "./pages/MenuPage";
import NewTransactionForm from "./pages/NewTransactionForm";
import {FamilyPage} from "./pages/Family";
import {ReactNode} from "react";
import Profile from "./pages/Profile";

export const App = () => {
    return (
        <RouterProvider router={router}/>
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

const withContainer = (element: JSX.Element) => {
    return (
        <div className="container mx-auto px-6">
            {element}
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: [
            <Landing/>
        ],
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
            withHeader(false, withContainer(<Home/>))
    ),
    },
    {
        path: "transaction/new",
        element: (
            withHeader(false, withContainer(<NewTransactionForm/>))
        ),
    },
    {
        path: "category/new",
        element: (
            withHeader(false, withContainer(<NewCategoryForm/>))
        ),
    },
    {
        path: "category",
        element: (
            withHeader(false, withContainer(<CategoryList/>))
        )
    },
    {
        path: "/menu",
        element: (
            withHeader(true, withContainer(<MenuPage/>))
        )
    },
    {
        path: "/family",
        element: (
            withHeader(false, withContainer(<FamilyPage/>))
        ),
    },
    {
        path: "/profile",
        element: (
            withHeader(false, withContainer(<Profile/>))
        ),
    },
    {
        path: "*",
        element: (
            <h1>Not Found</h1>
        ),
    }
])