export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const ROLES = {
    ADMIN: 'adm',
    FUNCIONARIO: 'func'
};

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    MAP: '/map',
    FINANCIAL: '/financial',
    STOCK: '/stock',
    ITEMS_TABLE: '/itens-table',
    REGISTER_RESERVATION: '/register-reservation',
    BOOKING_CALENDAR: '/booking-calendar',
    REGISTER_CUSTOMER: '/register-customer',
    REGISTER_COLLABORATOR: '/register-collaborator'
}; 