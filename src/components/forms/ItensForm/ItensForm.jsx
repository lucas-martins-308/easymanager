import { useState } from 'react';

function ItensForm() {
  const [formData, setFormData] = useState({
    nomeItem: '',
    descricao: '',
    quantidade: '',
    preco: '',
    dtValidade: '',
    Fornecedor_idFornecedor: ''
  });

  const [itens, setItens] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  const response = await fetch(`${import.meta.env.VITE_API}/api/estoque`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.error('Erro do backend:', responseData);
    throw new Error(responseData.error || 'Erro ao cadastrar item no estoque');
  }

  setItens(prev => [...prev, responseData]);

  setFormData({
    nomeItem: '',
    descricao: '',
    quantidade: '',
    preco: '',
    dtValidade: '',
    Fornecedor_idFornecedor: ''
  });

  alert('Item cadastrado com sucesso!');
} catch (error) {
  alert(error.message);
}

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
