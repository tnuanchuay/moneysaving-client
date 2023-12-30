import React from "react";
import {createBrowserRouter} from "react-router-dom";
import {Landing} from "./pages/Landing";
import {LogIn} from "./pages/Login";

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
        path: "about",
        element: <div>About</div>,
    },
]);