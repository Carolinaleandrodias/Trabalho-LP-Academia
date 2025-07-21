// Register.jsx
import './cadastro.css'; // Vamos criar um CSS específico para o cadastro
import logo from '../assets/logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const URL = "http://localhost:8080/api/"

  const handleRegister = (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    setErro(''); // Limpa mensagens de erro anteriores
    setSucesso(''); // Limpa mensagens de sucesso anteriores

    if (!nome || !senha || !confirmarSenha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem!');
      return;
    }

    // Aqui você faria a lógica para registrar o usuário,
    // por exemplo, enviando os dados para uma API.
    // Por enquanto, vamos simular um registro bem-sucedido.
    fetch(URL+"usuarios/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario: nome,
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


    console.log('Usuário registrado:', { nome, senha });
    setSucesso('Cadastro realizado com sucesso! Redirecionando para o login...');

    // Redireciona para a tela de login após 2 segundos
    setTimeout(() => {
      navigate('/'); // Assumindo que a rota de login é '/'
    }, 2000);
  };

  return (
    <div className="container">
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
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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

          <button
            type="submit"
            className="botao-registrar" // Novo nome de classe para o botão
            onClick={(e) => handleRegister(e.target.value) }>
            Cadastrar
          </button>

          {erro && <p style={{ color: 'red', marginTop: '10px' }}>{erro}</p>}
          {sucesso && <p style={{ color: 'green', marginTop: '10px' }}>{sucesso}</p>}

          <p className="voltar-login" onClick={() => navigate('/')}>
            VOLTAR PARA O LOGIN
          </p>
        </form>
      </div>
    </div>
  );
}