import { useState } from "react";
import "./CustomerForm.css";
import { customerService } from '../../../services/customer/customerService';

const CustomerForm = () => {
    const [customerData, setCustomerData] = useState({
        nomeCompleto: "",
        email: "",
        birthDate: "",
        phone: "",
        document: "",
        tipoDocumento: "CPF",
        country: "",
        gender: "",
    });
    const [loading, setLoading] = useState(false);

    const genders = ["Masculino", "Feminino", "Outro"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await customerService.create(customerData);

            console.log("Cliente cadastrado com sucesso!");

            setCustomerData({
                nomeCompleto: "",
                email: "",
                birthDate: "",
                phone: "",
                document: "",
                tipoDocumento: "CPF",
                country: "",
                gender: "",
            });
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            console.log(error.message || 'Erro ao cadastrar cliente');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="customer-form" onSubmit={handleSubmit}>
            <h2>Cadastro de Cliente</h2>

            <label>Nome Completo:</label>
            <input
                type="text"
                name="nomeCompleto"
                value={customerData.nomeCompleto}
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

            <label>Tipo de Documento:</label>
            <select
                name="tipoDocumento"
                value={customerData.tipoDocumento}
                onChange={handleChange}
                required
            >
                <option value="CPF">CPF</option>
                <option value="RG">RG</option>
                <option value="CNH">CNH</option>
                <option value="Passaporte">Passaporte</option>
            </select>

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

            <button type="submit" disabled={loading}>
                {loading ? 'Cadastrando...' : 'Cadastrar Cliente'}
            </button>
        </form>
    );
};

export default CustomerForm;
