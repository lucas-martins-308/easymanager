import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Map from "./pages/Map/Map.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Financial from "./pages/Financial/Financial.jsx";
import Stock from "./pages/Stock/Stock.jsx";
import App from "./App.jsx";
import ItensTable from "./components/ItensTeble/ItensTable.jsx";
import ReservationForm from "./pages/RegisterReservation/RegisterReservation.jsx";
import RegisterCustomer from "./pages/RegisterCustomer/RegisterCustomer.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import ReservationCalendar from "./components/calendars/ReservationCalendar/ReservationCalendar.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Home from "./pages/Home/Home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "contact",
                element: <Contact/>
            },
            {
                path: "map",
                element: <Map/>
            },
            {
                path: "admin",
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <Admin/>
                    </ProtectedRoute>
                )
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
                path: "itens-table",
                element: <ItensTable/>
            },
            {
                path: "register-reservation",
                element: <ReservationForm/>
            },
            {
                path: "booking-calendar",
                element: <ReservationCalendar/>
            },
            {
                path: "register-customer",
                element: <RegisterCustomer/>
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
                <RouterProvider router={router}/>
)
