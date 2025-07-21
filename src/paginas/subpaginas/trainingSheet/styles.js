import styled from "styled-components";
import image from "../../../assets/6.jpg"

export const Container = styled.div`
    align-items: flex-start;
    background: url(${image}) no-repeat center/cover;
    display: flex;
    height: 100vh;
    justify-content: center;
    overflow-y: auto;
    padding-top: 180px;
    width: calc(100vw - 250px);

    .ficha-conteudo {
        background-color: rgba(255, 255, 255, 0.95);
        border-radius: 10px;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
        padding: 20px;
        width: 70%;
    }

    .ficha-cabecalho {
        background-color: #d1d1d1;
        border-radius: 8px;
        display: flex;
        font-size: 16px;
        justify-content: space-between;
        margin-bottom: 20px;
        padding: 10px 20px;
    }

    .treino-box {
        border-radius: 10px;
        display: flex;
        margin-bottom: 20px;
        overflow: hidden;
    }

    .treino-label {
        background-color: #0056a7;
        color: white;
        font-weight: bold;
        padding: 10px;
        text-align: center;
        transform: rotate(180deg);
        width: 50px;
        writing-mode: vertical-rl;
    }

    .treino-detalhes {
        background-color: #f5f5f5;
        flex: 1;
        padding: 15px;
    }

    .treino-detalhes h3 {
        color: #003366;
        margin-top: 0;
    }

    .treino-lista {
        display: flex;
        gap: 30px;
        margin-top: 10px;
    }

    .treino-lista ul {
        color: #000000;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .treino-lista li {
        margin-bottom: 8px;
    }
`;