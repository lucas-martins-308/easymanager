import React, { useState } from "react";
import "./ReservationForm.css";

const ReservationForm = () => {
    const [formData, setFormData] = useState({
        checkIn: "",
        checkOut: "",
        canal: "",
        nome: "",
        email: "",
        birthDate: "",
        phone: "",
        document: "",
        identification: "",
        country: "",
        gender: "",
        notes: "",
    });

    const channels = ["Website", "Agência", "Telefone"];
    const genders = ["Masculino", "Feminino", "Outro"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedReservations = JSON.parse(localStorage.getItem("reservations")) || [];

        const updatedReservations = [...storedReservations, formData];

        localStorage.setItem("reservations", JSON.stringify(updatedReservations));

        setFormData({
            checkIn: "",
            checkOut: "",
            canal: "",
            nome: "",
            email: "",
            birthDate: "",
            phone: "",
            document: "",
            identification: "",
            country: "",
            gender: "",
            notes: "",
        });

        alert("Reserva criada com sucesso!");
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
                {channels.map((channel, index) => (
                    <option key={index} value={channel}>
                        {channel}
                    </option>
                ))}
            </select>

            <label>Nome:</label>
            <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
            />

            <label>E-mail:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <label>Data de Nascimento:</label>
            <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
            />

            <label>Telefone:</label>
            <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
            />

            <label>Documento:</label>
            <input
                type="text"
                name="document"
                value={formData.document}
                onChange={handleChange}
                required
            />

            <label>Identificação:</label>
            <input
                type="text"
                name="identification"
                value={formData.identification}
                onChange={handleChange}
            />

            <label>País:</label>
            <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
            />

            <label>Gênero:</label>
            <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
            >
                <option value="">Selecione um gênero</option>
                {genders.map((gender, index) => (
                    <option key={index} value={gender}>
                        {gender}
                    </option>
                ))}
            </select>

            <label>Notas:</label>
            <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
            ></textarea>
            <button type="submit">Criar Reserva</button>
        </form>
    );
};

export default ReservationForm;
