import './Login.css'

export default function Login() {
  return (
    <div className="container">
      <div className="login-box">
        <div className="logo">
          <span role="img" aria-label="halter">🏋️</span>
          <h2>MoveOn</h2>
        </div>
        <h1 className="bem-vindo">Bem-vindo!</h1>
        <p className="subtitulo">Login</p>

        <form className="formulario">
          <label>CPF</label>
          <input type="text" placeholder="Digite seu CPF" />
          <label>SENHA</label>
          <input type="password" placeholder="Digite sua senha" />
          <button type="submit">CRIAR CADASTRO</button>
        </form>
      </div>
    </div>
  )
}
