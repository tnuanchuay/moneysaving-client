import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Landing} from "./pages/Landing";
import {LogIn} from "./pages/Login";
import {Home} from "./pages/Home";

import "./App.css";

export const App: React.FC = () => {
    return (
        <RouterProvider router={router} />
    )
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Landing />
        ),
    },
    {
        path: "login",
        element: (
            <LogIn />
        ),
    },
    {
        path: "home",
        element: (
            <Home />
        ),
    },
    {
        path: "about",
        element: <div>About</div>,
    },
]);