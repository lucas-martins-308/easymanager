import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Map from './pages/Map/Map.jsx';
import Financial from './pages/Financial/Financial.jsx';
import Stock from './pages/Stock/Stock.jsx';
import App from './App.jsx';
import ReservationForm from './pages/RegisterReservation/RegisterReservation.jsx';
import RegisterCustomer from './pages/RegisterCustomer/RegisterCustomer.jsx';
import ReservationCalendar from './components/calendars/ReservationCalendar/ReservationCalendar.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Home from './pages/Home/Home.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import Login from './pages/auth/Login.jsx';
import RegisterProduct from "./pages/RegisterProduct/RegisterProduct.jsx";
import RegisterCollaborator from "./pages/RegisterCollaborator/RegisterCollaborator.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: 'contact', element: <Contact /> },
            { path: 'login', element: <Login /> },
            {
                path: 'map',
                element: (
                    <ProtectedRoute allowedRoles={['adm', 'func']}>
                        <Map />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'register-collaborator',
                element: (
                    <ProtectedRoute allowedRoles={['adm']}>
                        <RegisterCollaborator/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'financial',
                element: (
                    <ProtectedRoute allowedRoles={['adm']}>
                        <Financial />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'stock',
                element: (
                    <ProtectedRoute allowedRoles={['adm', 'func']}>
                        <Stock />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'itens-table',
                element: (
                    <ProtectedRoute allowedRoles={['adm', 'func']}>
                        <RegisterProduct />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'register-reservation',
                element: (
                    <ProtectedRoute allowedRoles={['adm', 'func']}>
                        <ReservationForm />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'booking-calendar',
                element: (
                    <ProtectedRoute allowedRoles={['adm', 'func']}>
                        <ReservationCalendar />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'register-customer',
                element: (
                    <ProtectedRoute allowedRoles={['adm', 'func']}>
                        <RegisterCustomer />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
