import "./index.css"

export default function Navbar({ setCurrentPage }) {
    return(
        <div id="navbar">
            <botton class="navbar-button" onClick={() => setCurrentPage('home')}>Mapa</botton>
            <botton class="navbar-button" onClick={() => setCurrentPage('home')}>Reservas</botton>
            <botton class="navbar-button" onClick={() => setCurrentPage('home')}>Estoque</botton>
            <botton class="navbar-button" onClick={() => setCurrentPage('home')}>Financeiro</botton>
            <botton class="navbar-button" onClick={() => setCurrentPage('home')}>Admin</botton>
        </div>
    )
}
