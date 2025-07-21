import styled from "styled-components";
import image from "../../../assets/9.jpg"

export const Container = styled.div`
    align-items: center;
    background: url(${image}) no-repeat center/cover;
    box-sizing: border-box;
    display: flex;
    height: 100vh;
    justify-content: center;
    position: relative;
    width: 100%;

    .menu-icon {
        cursor: pointer;
        fill: #002d64;
        height: 32px;
        left: 10px;
        position: absolute;
        top: 10px;
        width: 32px;
    }

    .dash {
        align-items: center;
        background-color: #f0f8ffcc;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        height: 550px;
        overflow-y: auto;
        padding: 20px;
        width: 80%;

        @media (max-width: 768px) {
            height: 90vh;
            width: 90%;
        }
    }

    h1 {
        color: #0070C0;
        font-family: 'Arial Black', Impact, sans-serif;
        font-size: 48px;
        font-style: italic;
        font-weight: 900;
        letter-spacing: 2px;
        margin-bottom: 20px;
        text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);

        @media (max-width: 768px) {
            font-size: 42px;
            margin: 20px 0;
        }
    }

    .graficos {
        align-items: flex-start;
        display: flex;
        justify-content: space-evenly;
        width: 100%;

        @media (max-width: 768px) {
            flex-direction: column;
            gap: 28px;
        }
    }

    .grafico-item {
        align-items: center;
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        height: 350px;
        margin: auto;
        padding: 5px;
        width: 45%;

        @media (max-width: 768px) {
            width: 100%;
        }
    }


    .grafico-titulo {
        background-color: #002d64;
        border-radius: 20px;
        color: white;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
        padding: 10px 20px;
        text-align: center;
        width: 70%;
    }
`