import { Link } from 'react-router-dom';
import './Estoque.css';

function Estoque() {
    return (
        <div className="page-container">
            <h2>Estoque</h2>
            <br />

            <div className="estoque-sections">
                <Link to="/itens-table" className="estoque-card">
                    <h2>Cadastrar Produto</h2>
                    <p>Adicione novos produtos ao seu inventário.</p>
                </Link>

                <Link to="/fornecedores" className="estoque-card">
                    <h2>Fornecedores</h2>
                    <p>Gerencie seus fornecedores e parceiros comerciais.</p>
                </Link>

                <Link to="/stock" className="estoque-card">
                    <h2>Inventário</h2>
                    <p>Visualize e controle o estoque atual de produtos.</p>
                </Link>
            </div>
        </div>
    );
}

export default Estoque;
