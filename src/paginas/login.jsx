import './login.css'
import logo from '../assets/logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const adm = {
  "CPF": "adm", 
  "senha": "adm123"
}
export default function Login() {
  const navigate = useNavigate(); 
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = () => {
    if (cpf === adm.CPF && senha === adm.senha) {
      navigate('/painel');
    } else {
      setErro('CPF ou senha inválidos!');
    }
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
          <p className="submit">CRIAR CADASTRO</p>
        </form>
      </div>
    </div>
  );
}