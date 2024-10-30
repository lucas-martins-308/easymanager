// src/auth/UserForm/UserForm.jsx
import React, { useState } from 'react';
import initialUsers from '../../data/users.json';

const UserForm = ({ role }) => {
  const [formData, setFormData] = useState({});
  const [users, setUsers] = useState(initialUsers);

  // Define os campos para cada tipo de usuário
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

    // Adiciona o novo usuário à lista no estado
    const newUser = { ...formData, role };
    setUsers([...users, newUser]);

    alert(`Usuário ${role} cadastrado com sucesso!`);
    setFormData({});
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
          />
        </div>
      ))}

      <button type="submit">Cadastrar</button>

      {/* Exibição da lista de usuários em memória */}
      <h3>Usuários Cadastrados:</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.fullName} - {user.role}</li>
        ))}
      </ul>
    </form>
  );
};

export default UserForm;
