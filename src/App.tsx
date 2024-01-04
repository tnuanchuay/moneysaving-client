import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom"
import {Landing} from "./pages/Landing"
import {LogIn} from "./pages/Login"
import {Home} from "./pages/Home"

import "./App.css"
import AppHeader from "./components/AppHeader"
import NewCategoryForm from "./pages/NewCategoryForm"
import CategoryList from "./pages/CategoryList"
import {MenuPage} from "./pages/MenuPage";

export const App: React.FC = () => {
    return [
        <RouterProvider router={router}/>
    ]
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: [
            <AppHeader/>,
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
        element: [
            <AppHeader/>,
            <Home/>
        ],
    },
    {
        path: "category/new",
        element: [
            <AppHeader/>, <NewCategoryForm/>
        ],
    },
    {
        path: "category",
        element: [
            <AppHeader/>,
            <CategoryList/>
        ]
    },
    {
        path: "/menu",
        element: [
            <AppHeader shouldGoBack={true}/>,
            <MenuPage/>
        ]
    },
    {
        path: "*",
        element: (
            <h1>Not Found</h1>
        ),
    }
])