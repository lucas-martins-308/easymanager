import { API_URL } from '../../config/constants';

class ReservationService {
    async getAll() {
        try {
            const response = await fetch(`${API_URL}/api/reservas`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Erro ao buscar reservas');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar reservas:', error);
            throw error;
        }
    }

    async create(reservationData) {
        try {
            const response = await fetch(`${API_URL}/api/reservas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(reservationData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erro ao criar reserva');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao criar reserva:', error);
            throw error;
        }
    }

    async update(id, reservationData) {
        try {
            const response = await fetch(`${API_URL}/api/reservas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(reservationData)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar reserva');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar reserva:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await fetch(`${API_URL}/api/reservas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao cancelar reserva');
            }

            return true;
        } catch (error) {
            console.error('Erro ao cancelar reserva:', error);
            throw error;
        }
    }

    async checkin(id) {
        try {
            const response = await fetch(`${API_URL}/api/reservas/${id}/checkin`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer check-in');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao fazer check-in:', error);
            throw error;
        }
    }

    async checkout(id) {
        try {
            const response = await fetch(`${API_URL}/api/reservas/${id}/checkout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer check-out');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao fazer check-out:', error);
            throw error;
        }
    }

    async cancelar(id) {
        try {
            const response = await fetch(`${API_URL}/api/reservas/${id}/cancelar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao cancelar reserva');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao cancelar reserva:', error);
            throw error;
        }
    }
}

export const reservationService = new ReservationService(); 