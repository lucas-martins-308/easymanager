import {useEffect, useState} from 'react';
import initialUsers from "../../data/users.json";

function ItensForm() {

    const [formData, setFormData] = useState({});
    const [itens, setItens] = useState([]);

    useEffect(() => {
        const storedItens = JSON.parse(localStorage.getItem('itens')) || initialUsers;
        setItens(storedItens);
    }, []);

    const fields = {
        itens: [
            {label: "Nome item",name: "nome_item", type: "text"},
            {label:  "Quantidade",name: "quantidade", type: "text"},
            {label: "Preco",name: "preco", type: "text"},
            {label: "Data validade",name: "data_validade", type: "date"},
        ]
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItens = {...formData, itens};
        const updatedItens = [...itens, newItens];

        localStorage.setItem('itens', JSON.stringify(updatedItens));

        alert(`Item cadastrado com sucesso!`);
        setFormData({});
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastro de item</h2>

            {fields.itens.map((field) => (
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

            <h3>Usuários Cadastrados:</h3>
            <ul>
                {itens.map((iten, index) => (
                    <li key={index}>{iten} - {iten}</li>
                ))}
            </ul>
        </form>
    );
}

export default ItensForm;