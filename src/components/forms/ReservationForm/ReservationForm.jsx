import React, { useState, useEffect } from "react";
import "./ReservationForm.css";

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

    
    const loadCustomers = () => {
        const storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];
        setCustomers(storedCustomers);
    };
    const loadRooms = () => {
        const storedRooms = JSON.parse(localStorage.getItem("rooms")) || [];
        setRooms(storedRooms);
    };

    useEffect(() => {
        loadCustomers();
        loadRooms();

        const handleStorageChange = (event) => {
            if (event.key === "customers") {
                loadCustomers();
            }
            if (event.key === "rooms") {
                loadRooms();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Reserva criada com sucesso!");
        const storedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
        const updatedReservations = [...storedReservations, formData];
        localStorage.setItem("reservations", JSON.stringify(updatedReservations));
        setFormData({
            checkIn: "",
            checkOut: "",
            canal: "",
            cliente: "",
            quarto: "",
        });
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
                {customers.map((customer, index) => (
                    <option key={index} value={customer.nome}>
                        {customer.nome} - {customer.cpf}
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
                {rooms.map((room, index) => (
                    <option key={index} value={room.numeroQuarto}>
                        Quarto {room.numeroQuarto} - {room.tipoQuarto}
                    </option>
                ))}
            </select>

            <button type="submit">Criar Reserva</button>
        </form>
    );
};

export default ReservationForm;
