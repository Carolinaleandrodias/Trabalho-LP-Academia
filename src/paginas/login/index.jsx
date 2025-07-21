/* ⚛ REACT */
import { useState } from 'react';

/* 📦 LIBS */
import { useNavigate } from 'react-router-dom';

/* 🎨 STYLES */
import { Container, Link } from "./styles";

/* 📁 ASSETS */
import logo from '../../assets/logo.png';

;

export default function Login() {
  const URL = import.meta.env.VITE_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {

    if (!username || !senha ) {
      setError("Login inválido");
      return;
    }

    fetch(URL + "login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Usuario: username, 
            Senha: senha  
        }),
    })
    .then((res) => {
        if (!res.ok) {

            return res.json().then(errorData => {

                if (res.status === 401) {
                    throw new Error("Credenciais inválidas. Verifique seu CPF e senha.");
                }

                throw new Error(errorData.message || `Erro do servidor com status: ${res.status}`);
            }).catch(() => {

                if (res.status === 401) {
                    throw new Error("Credenciais inválidas. Verifique seu CPF e senha.");
                }

                throw new Error(`Erro de rede ou servidor com status: ${res.status}.`);
            });
        }

        return res.json(); 
    })
    .then((retornoCPF) => {
        if (retornoCPF == username) { 
            alert("Login realizado com sucesso!");
            console.log("Usuário logado:", retornoCPF);
            navigate('/painel');


        } else {

            alert("Erro na validação do usuário retornado. Tente novamente.");
            console.error("Erro: CPF retornado diferente do CPF fornecido ou formato inesperado:", retornoCPF);
        }
    })
    .catch((err) => {

        console.error("Erro durante o processo de login:", err.message);
        alert(`Falha ao fazer login: ${err.message}`);
    });
  };

  return (
    <Container>
      <div className="login-box">
        <div className="logo">
          <img src={logo} alt="Logo MoveOn" className="logo-img" />
        </div>
        <h1 className="bem-vindo">Seja bem-vindo!</h1>

        <form className="formulario" onSubmit={e => e.preventDefault()}>
          <label>NOME</label>
          <input
            type="text"
            placeholder="Digite seu nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>SENHA</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Link to="/cadastro">Não tem uma conta? Cadastre-se</Link>
          <button type="submit" className="enter-button" onClick={() => handleLogin()}>
            Entrar
          </button>
          {error && <span className='error-message'>{error}</span>}
        </form>
      </div>
    </Container>
  );
}