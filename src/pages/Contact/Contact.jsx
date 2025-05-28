import './Contact.css';
import { useState } from 'react';

function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        setTimeout(() => {
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <div id="contact-page">
            <h1>Contato</h1>
            <div className="contact-container">
                <div className="contact-info">
                    <p><strong>E-mail:</strong> suporte@easymanager.com</p>
                    <p><strong>Telefone:</strong> +55 (11) 98765-4321</p>
                    <p><strong>Horário de Atendimento:</strong> Segunda a Sexta, das 9h às 18h</p>
                
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <h2>Envie sua Mensagem</h2>
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" name="name" placeholder="Digite seu nome" required />

                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required />

                        <label htmlFor="message">Mensagem</label>
                        <textarea id="message" name="message" placeholder="Digite sua mensagem" required></textarea>

                        <button type="submit">Enviar</button>
                    </form>
                </div>    
            </div>
            {isSubmitted && <div className="success-message">Mensagem enviada com sucesso! Entraremos em contato em breve.</div>}
        </div>
    );
}

export default Contact;
