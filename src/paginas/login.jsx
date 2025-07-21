import './login.css'
import logo from '../assets/logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const URL = import.meta.env.VITE_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {

    fetch(URL + "login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Usuario: cpf, 
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
        if (retornoCPF == cpf) { 
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
    <div className="container">
      <div className="login-box">
        <div className="logo">
          <img src={logo} alt="Logo MoveOn" className="logo-img" />
        </div>
        <h1 className="bem-vindo">Seja bem-vindo!</h1>

        <form className="formulario" onSubmit={e => e.preventDefault()}>
          <label>CPF</label>
          <input
            type="text"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <label>SENHA</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            type="submit"
            className="botao-entrar"
            onClick={handleLogin}
          >
            Entrar
          </button>
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          <button
            type="button" // Use 'button' para evitar que o formulário seja submetido
            className="botao-cadastro" // Uma nova classe CSS para estilizar o botão
            onClick={() => navigate('/cadastro')} // Usa o useNavigate para ir para a rota /register
          >
            CRIAR CADASTRO
          </button>
        </form>
      </div>
    </div>
  );
}