import React, { useState } from 'react';
import userFields from '../data/userFields';

const UserForm = ({ role }) => {
  const [formData, setFormData] = useState({});
  const fields = userFields[role];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([...storedUsers, { ...formData, role }]));
    alert(`${role === "admin" ? "Admin" : "Funcionário"} cadastrado com sucesso!`);
    setFormData({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de {role === "admin" ? "Admin" : "Funcionário"}</h2>
      {fields.map((field) => (
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
    </form>
  );
};

export default UserForm;
