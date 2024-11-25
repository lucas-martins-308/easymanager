import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Map from "./pages/Map/Map.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Financial from "./pages/Financial/Financial.jsx";
import Stock from "./pages/Stock/Stock.jsx";
import Reservations from "./pages/Reservations/reservations.jsx";

import App from "./App.jsx";
import ItensTable from "./components/ItensTeble/ItensTable.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "map",
                element: <Map/>
            },
            {
                path: "admin",
                element: <Admin/>
            },
            {
                path: "financial",
                element: <Financial/>
            },
            {
                path: "stock",
                element: <Stock/>
            },
            {
                path: "reservations",
                element: <Reservations/>
            },
            {
                path: "itensTable",
                element: <ItensTable/>
            }
            ]
    }
])

createRoot(document.getElementById('root')).render(
                <RouterProvider router={router}/>
)
