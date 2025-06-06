import './UserForm.css';
import { useState, useEffect } from 'react';
import PropTypes from "prop-types";

const API_URL = "http://localhost:3000/api/usuarios"; // Endpoint correto

const UserForm = ({ role }) => {
  const [formData, setFormData] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((err) => console.error("Erro ao buscar usuários:", err))
      .finally(() => setLoading(false));
  }, []);

  const fields = {
    admin: [
      { label: "Nome Completo", name: "fullName", type: "text" },
      { label: "CPF", name: "cpf", type: "text" },
      { label: "Data de Nascimento", name: "birthDate", type: "date" },
      { label: "Telefone", name: "phone", type: "tel" },
      { label: "E-mail", name: "email", type: "email" },
      { label: "CEP", name: "cep", type: "text" },
      { label: "Rua", name: "street", type: "text" },
      { label: "Número", name: "number", type: "text" },
      { label: "Bairro", name: "neighborhood", type: "text" },
      { label: "Cidade", name: "city", type: "text" },
      { label: "Estado", name: "state", type: "text" },
      { label: "Senha", name: "password", type: "password" },
    ],
    employee: [
      { label: "Nome Completo", name: "fullName", type: "text" },
      { label: "CPF", name: "cpf", type: "text" },
      { label: "Data de Nascimento", name: "birthDate", type: "date" },
      { label: "Telefone", name: "phone", type: "tel" },
      { label: "E-mail", name: "email", type: "email" },
      { label: "CEP", name: "cep", type: "text" },
      { label: "Rua", name: "street", type: "text" },
      { label: "Número", name: "number", type: "text" },
      { label: "Bairro", name: "neighborhood", type: "text" },
      { label: "Cidade", name: "city", type: "text" },
      { label: "Estado", name: "state", type: "text" },
      { label: "Senha", name: "password", type: "password" },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      nomeCompleto: formData.fullName,
      cpf: formData.cpf,
      dtNascimento: formData.birthDate,
      telefone: formData.phone,
      email: formData.email,
      senha: formData.password,
      tipoUsuario: role === 'admin' ? 'adm' : 'func',
      Endereco_idEndereco: 1 // Valor padrão, ajuste conforme necessário
    };

    setLoading(true);
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.message || "Erro ao cadastrar usuário");
          });
        }
        return res.json();
      })
      .then((createdUser) => {
        setUsers((prev) => [...prev, createdUser]);
        alert(`Usuário ${role === 'admin' ? 'Administrador' : 'Funcionário'} cadastrado com sucesso!`);
        setFormData({});
      })
      .catch((err) => {
        alert(err.message || "Erro ao cadastrar usuário!");
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de {role === "admin" ? "Admin" : "Funcionário"}</h2>

      {fields[role].map((field) => (
        <div key={field.name}>
          <label>{field.label}:</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
      ))}

      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Cadastrar"}
      </button>

      <h3>Usuários Cadastrados:</h3>
      {loading && <p>Carregando usuários...</p>}
      <ul>
        {users.map((user) => (
          <li key={user.idUsuario}>
            {user.nomeCompleto} - {user.tipoUsuario === 'adm' ? 'Administrador' : 'Funcionário'}
          </li>
        ))}
      </ul>
    </form>
  );
};
UserForm.propTypes = {
  role: PropTypes.string.isRequired,
};
export default UserForm;
