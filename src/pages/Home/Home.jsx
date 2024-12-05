import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Bem-vindo(a) ao Painel Administrativo</h1>
                <p>Gerencie facilmente as operações da Pousada Abaporu</p>
            </div>

            <div className="home-sections">
                <div className="home-card">
                    <h2>Reservas</h2>
                    <p>Acesse o sistema de reservas para cadastrar e visualizar as reservas ativas.</p>
                </div>

                <div className="home-card">
                    <h2>Estoque</h2>
                    <p>Gerencie os produtos e acompanhe o inventário para manter tudo organizado.</p>
                </div>

                <div className="home-card">
                    <h2>Financeiro</h2>
                    <p>Monitore as transações financeiras e mantenha os registros atualizados.</p>
                </div>

                <div className="home-card">
                    <h2>Administração</h2>
                    <p>Controle de usuários, permissões e configurações gerais do sistema.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
