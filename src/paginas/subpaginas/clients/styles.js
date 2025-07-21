import styled from "styled-components";

export const Container = styled.div`

    background: url('../../../assets/4.jpg');
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;

    .menu-icon {
        position: absolute;
        cursor: pointer;
        fill: #FFF;
        top: 22px;
        left: 8px;
        height: 32px;
        width: 32px;
    }

    .header {
        align-items: center;
        background-color: #2c3e50;
        color: white;
        display: flex;
        gap: 20px;
        justify-content: space-between;
        padding: 16px 48px;
    }

    .header h2 {
        color: #FFF;
        font-size: 24px;
        margin-left: 12px;
    }

    .center-container {
        display: flex;
        flex: 1;
        justify-content: center;
    }

    .input-container {
        position: relative;
        width: 60%;
    }

    .input-pesquisa {
        border: none;
        border-radius: 6px;
        font-size: 16px;
        padding: 8px 12px 8px 36px;
    }

    .icon-search {
        color: #aaa;
        left: 10px;
        pointer-events: none;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .tabela-wrapper {
        flex: 1;
        margin: 20px auto;
        max-width: 1400px;
        overflow-y: auto;
        width: 95%;          /* controla largura em relação à tela */
    }

    .tabela-alunos {
        border-collapse: collapse;
        min-width: 800px;
        width: 100%;
    }

    .tabela-alunos th,
    .tabela-alunos td {
        border-bottom: 1px solid #ddd;
        color: #000000;
        padding: 12px 10px;
        text-align: left;
    }

    .tabela-alunos th {
        background-color: #072b55;
        color: #ffffff;
        cursor: pointer;
        font-weight: 600;
    }

    .tabela-alunos tr:nth-child(even) {
        background-color: #bac1c2;
    }

    .tabela-alunos tr:nth-child(odd) {
        background-color: #f5f5f5;
    }

    .tabela-alunos tr:hover {
        background-color: #d0dae0;
    }

    .acoes {
        display: flex;
        gap: 10px;
    }

    button.editar,
    button.excluir {
        border: none;
        background-color: transparent;
        color: #2980b9;
        cursor: pointer;
        font-size: 16px;
        transition: color 0.2s;
    }

    button.excluir {
        color: #c0392b;
    }

    button.editar:hover {
        color: #1c5980;
    }

    button.excluir:hover {
        color: #922b21;
    }

    .botao-cadastrar {
        background-color: rgb(31, 70, 143);
        border: none;
        border-radius: 8px;
        color: #ffffff;
        cursor: pointer;
        font-weight: bold;
        position: absolute;
        position: relative;
        padding: 15px 20px;
        right: 24px;
        transition: background-color 0.3s ease;
        z-index: 10;
    }


    .icone-treino {
        background: none;
        border: none;
        color: #2c3e50;
        cursor: pointer;
        font-size: 18px;
        transition: color 0.3s;
    }

    .icone-treino:hover {
        color: #1a5276;
    }
`