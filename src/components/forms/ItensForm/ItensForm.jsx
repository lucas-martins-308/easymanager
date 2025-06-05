import { useEffect, useState } from 'react';

function ItensForm() {
    const [formData, setFormData] = useState({});
    const [itens, setItens] = useState([]);

    useEffect(() => {
        const storedItens = JSON.parse(localStorage.getItem('itens')) || [];
        setItens(storedItens);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItens = { ...formData };
        const updatedItens = [...itens, newItens];

        localStorage.setItem('itens', JSON.stringify(updatedItens));

        setItens(updatedItens);
        setFormData({});

        alert(`Item cadastrado com sucesso!`);
    };

    return (
        <form onSubmit={handleSubmit} className="itens-form">
            <h2>Cadastro de item</h2>

            <div className="form-group">
                <label htmlFor="nome_item">Nome item:</label>
                <input
                    type="text"
                    id="nome_item"
                    name="nome_item"
                    value={formData.nome_item || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="quantidade">Quantidade:</label>
                <input
                    type="text"
                    id="quantidade"
                    name="quantidade"
                    value={formData.quantidade || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="preco">Preço:</label>
                <input
                    type="text"
                    id="preco"
                    name="preco"
                    value={formData.preco || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="data_validade">Data validade:</label>
                <input
                    type="date"
                    id="data_validade"
                    name="data_validade"
                    value={formData.data_validade || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className="btn-submit">Cadastrar</button>
        </form>
    );
}

export default ItensForm;