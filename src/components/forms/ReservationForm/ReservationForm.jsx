import React, { useState, useEffect } from "react";
import "./ReservationForm.css";
import { customerService } from '../../../services/customer/customerService';
import { roomService } from '../../../services/room/roomService';
import { reservationService } from '../../../services/reservation/reservationService';

const ReservationForm = () => {
    const [formData, setFormData] = useState({
        checkIn: "",
        checkOut: "",
        canal: "",
        cliente: "",
        quarto: "", 
    });
    const [customers, setCustomers] = useState([]);
    const [rooms, setRooms] = useState([]); 
    const [loading, setLoading] = useState(false);

    
    const loadCustomers = async () => {
        try {
            const data = await customerService.getAll();
            setCustomers(data);
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
        }
    };
    
    const loadRooms = async () => {
        try {
            const data = await roomService.getAll();
            console.log('Quartos carregados:', data);
            setRooms(data);
        } catch (error) {
            console.error('Erro ao carregar quartos:', error);
        }
    };

    useEffect(() => {
        loadCustomers();
        loadRooms();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const calculateTotalValue = (checkIn, checkOut, selectedRoom) => {
        if (!checkIn || !checkOut || !selectedRoom) return 0;
        
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        
        return daysDiff * selectedRoom.precoDiaria;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            
            console.log('Dados do formulário:', formData);
            console.log('Quartos disponíveis:', rooms);
            console.log('Clientes disponíveis:', customers);
            
            // Encontrar o cliente selecionado
            const selectedCustomer = customers.find(customer => customer.nome === formData.cliente);
            if (!selectedCustomer) {
                throw new Error('Cliente não encontrado');
            }
            console.log('Cliente selecionado:', selectedCustomer);

            // Encontrar o quarto selecionado
            const selectedRoom = rooms.find(room => room.numeroQuarto.toString() === formData.quarto);
            if (!selectedRoom) {
                console.log('Tentando encontrar quarto com valor:', formData.quarto);
                console.log('Tipos de dados dos quartos:', rooms.map(r => ({ numero: r.numeroQuarto, tipo: typeof r.numeroQuarto })));
                throw new Error('Quarto não encontrado');
            }
            console.log('Quarto selecionado:', selectedRoom);

            // Calcular valor total
            const valorTotal = calculateTotalValue(formData.checkIn, formData.checkOut, selectedRoom);

            // Mapear dados para o formato esperado pelo backend
            const reservationData = {
                dtCheckin: formData.checkIn,
                dtCheckout: formData.checkOut,
                valorReserva: valorTotal,
                canalReserva: formData.canal,
                statusReserva: 'pendente',
                hospedeId: selectedCustomer.idHospede
            };

            console.log('Dados da reserva sendo enviados:', reservationData);
            
            await reservationService.create(reservationData);
            
            alert("Reserva criada com sucesso!");
            setFormData({
                checkIn: "",
                checkOut: "",
                canal: "",
                cliente: "",
                quarto: "",
            });
        } catch (error) {
            console.error('Erro ao criar reserva:', error);
            alert(`Erro ao criar reserva: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="reservation-form" onSubmit={handleSubmit}>
            <h2>Criar Reserva</h2>

            <label>Check-in:</label>
            <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                required
            />

            <label>Check-out:</label>
            <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                required
            />

            <label>Canal:</label>
            <select
                name="canal"
                value={formData.canal}
                onChange={handleChange}
                required
            >
                <option value="">Selecione um canal</option>
                <option value="Website">Website</option>
                <option value="Agência">Agência</option>
                <option value="Telefone">Telefone</option>
            </select>

            <label>Cliente:</label>
            <select
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                required
            >
                <option value="">Selecione um cliente</option>
                {customers.map((customer) => (
                    <option key={customer.idHospede} value={customer.nome}>
                        {customer.nome} - {customer.documento}
                    </option>
                ))}
            </select>

            <label>Quarto:</label>
            <select
                name="quarto"
                value={formData.quarto}
                onChange={handleChange}
                required
            >
                <option value="">Selecione um quarto</option>
                {rooms.map((room) => (
                    <option key={room.idQuarto} value={room.numeroQuarto.toString()}>
                        Quarto {room.numeroQuarto} - {room.tipoQuarto} (R$ {room.precoDiaria}/dia)
                    </option>
                ))}
            </select>

            {formData.checkIn && formData.checkOut && formData.quarto && (
                <div className="reservation-summary">
                    <h3>Resumo da Reserva</h3>
                    <p>Valor Total: R$ {(() => {
                        const selectedRoom = rooms.find(room => room.numeroQuarto.toString() === formData.quarto.toString());
                        const value = calculateTotalValue(formData.checkIn, formData.checkOut, selectedRoom);
                        return value.toFixed(2);
                    })()}</p>
                </div>
            )}

            <button type="submit" disabled={loading}>
                {loading ? 'Criando...' : 'Criar Reserva'}
            </button>
        </form>
    );
};

export default ReservationForm;
