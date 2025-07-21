/* ⚛ REACT */
import { useState } from 'react';

/* 📦 LIBS */
import { useNavigate } from 'react-router-dom';

/* 🎨 STYLES */
import { Container, Link } from "./styles";

/* 📁 ASSETS */
import logo from '../../assets/logo.png';

export default function Cadastro() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');

    const URL = import.meta.env.VITE_APP_BACKEND_URL;

    const handleRegister = (e) => {
        e.preventDefault();

        setError(''); 
        if (!username || !senha || !confirmarSenha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== confirmarSenha) {
            setError('As senhas não coincidem!');
            return;
        }

        fetch(URL + "usuarios/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usuario: username,
                senha: senha,
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao cadastrar usuário");
                return res.json();
            })
            .catch((err) => {
                console.error("Erro ao cadastrar:", err);
                alert("Erro ao cadastrar usuário");
            });


        console.log('Usuário registrado:', { username, senha });
        alert("Cadastro realizado com sucesso! Redirecionando para o login...");

        setTimeout(() => {
            navigate('/'); 
        }, 2000);
    };

    return (
        <Container>
            <div className="register-box">
                <div className="logo">
                    <img src={logo} alt="Logo MoveOn" className="logo-img" />
                </div>
                <h1 className="bem-vindo">Crie sua conta!</h1>

                <form className="formulario" onSubmit={handleRegister}>
                    <label htmlFor="nome">NOME</label>
                    <input
                        id="nome"
                        type="text"
                        placeholder="Digite seu nome de usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="senha">SENHA</label>
                    <input
                        id="senha"
                        type="password"
                        placeholder="Crie sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <label htmlFor="confirmar-senha">CONFIRMAR SENHA</label>
                    <input
                        id="confirmar-senha"
                        type="password"
                        placeholder="Repita sua senha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />

                    <Link to="/">Já tem uma conta? Faça login</Link>
                    <button
                        type="submit"
                        className="botao-registrar" 
                        onClick={(e) => handleRegister(e.target.value)}>
                        Cadastrar
                    </button>
                    {error && <span className="error-message">{error}</span>}
                </form>
            </div>
        </Container>
    );
}