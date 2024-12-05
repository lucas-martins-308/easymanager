import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Map from './pages/Map/Map.jsx';
import Admin from './pages/Admin/Admin.jsx';
import Financial from './pages/Financial/Financial.jsx';
import Stock from './pages/Stock/Stock.jsx';
import App from './App.jsx';
import ItensTable from './components/ItensTeble/ItensTable.jsx';
import ReservationForm from './pages/RegisterReservation/RegisterReservation.jsx';
import RegisterCustomer from './pages/RegisterCustomer/RegisterCustomer.jsx';
import ReservationCalendar from './components/calendars/ReservationCalendar/ReservationCalendar.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Home from './pages/Home/Home.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import Login from './pages/auth/Login.jsx';

// Verifica se o usuário está autenticado
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
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin', 'user']}>
                        <Map />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'admin',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin']}>
                        <Admin />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'financial',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin', 'user']}>
                        <Financial />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'stock',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin', 'user']}>
                        <Stock />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'itens-table',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin', 'user']}>
                        <ItensTable />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'register-reservation',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin', 'user']}>
                        <ReservationForm />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'booking-calendar',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin', 'user']}>
                        <ReservationCalendar />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'register-customer',
                element: (
                    <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['admin', 'user']}>
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
