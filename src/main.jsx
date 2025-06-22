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
import RegisterAccommodation from "./pages/RegisterAccommodation/RegisterAccommodation.jsx"

const isAuthenticated = !!localStorage.getItem('currentUser');

const handleLogin = (userData) => {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    window.location.reload();
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'contact',
                element: <Contact />,
            },
            {
                path: 'login',
                element: <Login onLogin={handleLogin} />,
            },
            {
                path: 'map',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin', 'employee']}>
                        <Map />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'register-collaborator',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin']}>
                        <RegisterCollaborator/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'financial',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin']}>
                        <Financial />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'stock',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin', 'employee']}>
                        <Stock />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'itens-table',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin', 'employee']}>
                        <RegisterProduct />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'register-reservation',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin', 'employee']}>
                        <ReservationForm />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'booking-calendar',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin', 'employee']}>
                        <ReservationCalendar />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'register-customer',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin', 'employee']}>
                        <RegisterCustomer />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'register-accommodation',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin']}>
                        <RegisterAccommodation />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
