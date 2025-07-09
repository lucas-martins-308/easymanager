import './UserForm.css';
import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { API_URL } from '../../../config/constants';
import { userService } from '../../../services/user/userService';

const UserForm = ({ role }) => {
  const [formData, setFormData] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    userService.getAll()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        setError(err.message || 'Erro ao buscar usuários');
        setUsers([]);
      })
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

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      fullName: user.nomeCompleto || '',
      cpf: user.cpf || '',
      birthDate: user.dtNascimento ? user.dtNascimento.split('T')[0] : '',
      phone: user.telefone || '',
      email: user.email || '',
      cep: user.cep || '',
      street: user.rua || '',
      number: user.numero || '',
      neighborhood: user.bairro || '',
      city: user.cidade || '',
      state: user.estado || '',
      password: '' // senha não é retornada por segurança
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setFormData({});
  };

  const handleSubmit = async (e) => {
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
    setError(null);
    try {
      if (editingUser) {
        // Atualizar usuário existente
        const updatedUser = await userService.update(editingUser.idUsuario, newUser);
        setUsers((prev) => prev.map(u => u.idUsuario === editingUser.idUsuario ? updatedUser : u));
        console.log('Usuário atualizado com sucesso!');
        setEditingUser(null);
      } else {
        // Criar novo usuário
        const createdUser = await userService.create(newUser);
        setUsers((prev) => [...prev, createdUser]);
        console.log(`Usuário ${role === 'admin' ? 'Administrador' : 'Funcionário'} cadastrado com sucesso!`);
      }
      setFormData({});
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar/atualizar usuário!');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
        {editingUser ? (loading ? "Salvando..." : "Salvar") : (loading ? "Salvando..." : "Cadastrar")}
      </button>
      {editingUser && (
        <button type="button" onClick={handleCancelEdit} disabled={loading} style={{marginLeft: 8}}>
          Cancelar edição
        </button>
      )}

      <h3>Usuários Cadastrados:</h3>
      {loading && <p>Carregando usuários...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {!loading && !error && (!Array.isArray(users) ? (
        <p>Erro ao carregar usuários: resposta inesperada da API</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.idUsuario} style={{cursor: 'pointer'}} onClick={() => handleEdit(user)}>
              {user.nomeCompleto} - {user.tipoUsuario === 'adm' ? 'Administrador' : 'Funcionário'}
              {editingUser && editingUser.idUsuario === user.idUsuario && ' (Editando...)'}
            </li>
          ))}
        </ul>
      ))}
    </form>
  );
};
UserForm.propTypes = {
  role: PropTypes.string.isRequired,
};
export default UserForm;
