import React from 'react';
import './index.css'; // Importa o arquivo CSS

export default function Table() {
  const data = [
    {
      nome: 'Produto A',
      preco: 'R$ 100,00',
      itemVenda: 'Sim',
      estoqueMinimo: 10,
      situacao: 'Disponível',
    },
    {
      nome: 'Produto B',
      preco: 'R$ 50,00',
      itemVenda: 'Não',
      estoqueMinimo: 5,
      situacao: 'Em falta',
    },
  ];

  function handleAction(nome) {
    alert(`Ação executada para ${nome}`);
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
          </tr>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Item a Venda</th>
            <th>Estoque Mínimo</th>
            <th>Situação</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.nome}</td>
              <td>{item.preco}</td>
              <td>{item.itemVenda}</td>
              <td>{item.estoqueMinimo}</td>
              <td>{item.situacao}</td>
              <td>
                <button onClick={() => handleAction(item.nome)}>Executar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
