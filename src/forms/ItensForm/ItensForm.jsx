import { useEffect, useState } from 'react';
import initialUsers from "../../data/users.json"; // Verifique se isso é realmente um array de itens

function ItensForm() {
    const [formData, setFormData] = useState({});
    const [itens, setItens] = useState([]);

    useEffect(() => {
        const storedItens = JSON.parse(localStorage.getItem('itens')) || initialUsers;
        setItens(storedItens);
    }, []);

    const fields = [
        { label: "Nome item", name: "nome_item", type: "text" },
        { label: "Quantidade", name: "quantidade", type: "text" },
        { label: "Preço", name: "preco", type: "text" },
        { label: "Data validade", name: "data_validade", type: "date" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItens = { ...formData };
        const updatedItens = [...itens, newItens];

        // Salva os itens atualizados no localStorage
        localStorage.setItem('itens', JSON.stringify(updatedItens));
        
        // Atualiza o estado local com os novos itens e limpa o formulário
        setItens(updatedItens);
        setFormData({});
        
        alert(`Item cadastrado com sucesso!`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastro de item</h2>

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

            <h3>Itens Cadastrados:</h3>
            <ul>
                {itens.map((item, index) => (
                    <li key={index}>
                        {item.nome_item} - {item.quantidade} - {item.preco} - {item.data_validade}
                    </li>
                ))}
            </ul>
        </form>
    );
}

export default ItensForm;
