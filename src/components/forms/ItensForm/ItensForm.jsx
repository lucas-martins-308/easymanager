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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
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
      <h2>Cadastro de item no estoque</h2>

      <div className="form-group">
        <label htmlFor="nomeItem">Nome do item:</label>
        <input
          type="text"
          id="nomeItem"
          name="nomeItem"
          value={formData.nomeItem}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="descricao">Descrição:</label>
        <input
          type="text"
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantidade">Quantidade:</label>
        <input
          type="number"
          id="quantidade"
          name="quantidade"
          value={formData.quantidade}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="preco">Preço:</label>
        <input
          type="number"
          step="0.01"
          id="preco"
          name="preco"
          value={formData.preco}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="dtValidade">Data de validade:</label>
        <input
          type="date"
          id="dtValidade"
          name="dtValidade"
          value={formData.dtValidade}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="Fornecedor_idFornecedor">ID do Fornecedor:</label>
        <input
          type="number"
          id="Fornecedor_idFornecedor"
          name="Fornecedor_idFornecedor"
          value={formData.Fornecedor_idFornecedor}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn-submit">Cadastrar</button>
    </form>
  );
}

export default ItensForm;

export default ItensForm;