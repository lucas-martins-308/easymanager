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
import RegisterAccommodation from "./pages/RegisterAccommodation/RegisterAccommodation.jsx";
import Fornecedores from "./pages/Fornecedores/Fornecedores.jsx";
import Hospedes from "./pages/Hospedes/Hospedes.jsx";
import Estoque from "./pages/Estoque/Estoque.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import HospedesList from "./pages/HospedesList/HospedesList.jsx";
import Reservas from "./pages/Reservas/Reservas.jsx";

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
                path: 'fornecedores',
                element: (
                    <ProtectedRoute allowedRoles={['adm', 'func']}>
                        <Fornecedores />
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
            {
                path: 'register-accommodation',
                element: (
                    <ProtectedRoute allowedRoles={['adm', 'func']}>
                        <RegisterAccommodation />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'reservas',
                element: (
                    <ProtectedRoute allowedRoles={['adm', 'func']}>
                        <Reservas />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'hospedes',
                element: (
                    <ProtectedRoute allowedRoles={['adm', 'func']}>
                        <Hospedes />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'hospedes-list',
                element: (
                    <ProtectedRoute allowedRoles={['adm', 'func']}>
                        <HospedesList />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'estoque',
                element: (
                    <ProtectedRoute allowedRoles={['adm', 'func']}>
                        <Estoque />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'admin',
                element: (
                    <ProtectedRoute allowedRoles={['adm']}>
                        <Admin />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
