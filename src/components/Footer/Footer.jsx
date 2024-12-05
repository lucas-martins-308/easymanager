import './Footer.css';

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Pousada Abaporu. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
