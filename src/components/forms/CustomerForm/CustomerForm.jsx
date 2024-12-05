import { useState } from "react";
import "./CustomerForm.css";

const CustomerForm = () => {
    const [customerData, setCustomerData] = useState({
        nome: "",
        email: "",
        birthDate: "",
        phone: "",
        document: "",
        country: "",
        gender: "",
    });

    const genders = ["Masculino", "Feminino", "Outro"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const existingCustomers = JSON.parse(localStorage.getItem("customers")) || [];
        const updatedCustomers = [...existingCustomers, customerData];

        localStorage.setItem("customers", JSON.stringify(updatedCustomers));

        alert("Cliente cadastrado com sucesso!");

        setCustomerData({
            nome: "",
            email: "",
            birthDate: "",
            phone: "",
            document: "",
            country: "",
            gender: "",
        });
    };

    return (
        <form className="customer-form" onSubmit={handleSubmit}>
            <h2>Cadastro de Cliente</h2>

            <label>Nome:</label>
            <input
                type="text"
                name="nome"
                value={customerData.nome}
                onChange={handleChange}
                required
            />

            <label>E-mail:</label>
            <input
                type="email"
                name="email"
                value={customerData.email}
                onChange={handleChange}
                required
            />

            <label>Data de Nascimento:</label>
            <input
                type="date"
                name="birthDate"
                value={customerData.birthDate}
                onChange={handleChange}
                required
            />

            <label>Telefone:</label>
            <input
                type="tel"
                name="phone"
                value={customerData.phone}
                onChange={handleChange}
                required
            />

            <label>Documento:</label>
            <input
                type="text"
                name="document"
                value={customerData.document}
                onChange={handleChange}
                required
            />

            <label>País:</label>
            <input
                type="text"
                name="country"
                value={customerData.country}
                onChange={handleChange}
                required
            />

            <label>Gênero:</label>
            <select
                name="gender"
                value={customerData.gender}
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

            <button type="submit">Cadastrar Cliente</button>
        </form>
    );
};

export default CustomerForm;
