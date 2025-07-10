import { useEffect, useState } from 'react';
import { itemService } from '../../../services/item/itemService';
import { fornecedorService } from '../../../services/fornecedor/fornecedorService';

function ItensForm() {
    const [formData, setFormData] = useState({});
    const [itens, setItens] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadItens();
        loadFornecedores();
    }, []);

    const loadItens = async () => {
        try {
            setLoading(true);
            const data = await itemService.getAll();
            setItens(data);
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
            console.log('Erro ao carregar itens');
        } finally {
            setLoading(false);
        }
    };

    const loadFornecedores = async () => {
        try {
            const data = await fornecedorService.getAll();
            console.log('Fornecedores carregados:', data);
            setFornecedores(data);
        } catch (error) {
            console.error('Erro ao carregar fornecedores:', error);
        }
    };

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
        setLoading(true);
        
        // Verificar se um fornecedor foi selecionado
        if (!formData.Fornecedor_idFornecedor) {
            throw new Error('Por favor, selecione um fornecedor');
        }

        console.log('Dados do formulário sendo enviados:', formData);
        
        await itemService.create(formData);
        
        // Recarregar a lista de itens
        await loadItens();
        
        setFormData({});
        console.log('Item cadastrado com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar item:', error);
        console.log(`Erro ao cadastrar item: ${error.message}`);
    } finally {
        setLoading(false);
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
          value={formData.nomeItem || ''}
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
          value={formData.descricao || ''}
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
          value={formData.quantidade || ''}
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
          value={formData.preco || ''}
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
          value={formData.dtValidade || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="Fornecedor_idFornecedor">Fornecedor:</label>
        <select
          id="Fornecedor_idFornecedor"
          name="Fornecedor_idFornecedor"
          value={formData.Fornecedor_idFornecedor || ''}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um fornecedor</option>
          {fornecedores.map((fornecedor) => (
            <option key={fornecedor.idFornecedor} value={fornecedor.idFornecedor}>
              {fornecedor.nome} - {fornecedor.email}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
}

export default ItensForm;