import './AddCollaborator.css';
import {useState} from 'react';
import UserForm from '../UserForm/UserForm';

function AddCollaboratorForm() {
    const [role, setRole] = useState(null);

    return (
        <div className="Admins">
            <h1>Cadastro de Usuários</h1>
            <button onClick={() => setRole("admin")}>Cadastro de Admin</button>
            <button onClick={() => setRole("employee")}>Cadastro de Funcionário</button>

            {role && <UserForm role={role}/>}
        </div>
    )
}

export default AddCollaboratorForm;