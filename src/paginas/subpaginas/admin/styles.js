import styled from "styled-components";
import image from "../../../assets/fundo.jpeg"

export const Container = styled.div`
    background: url(${image}) no-repeat center/cover;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    padding: 20px;
    position: relative;

    .menu-icon {
        cursor: pointer;
        fill: #002d64;
        height: 32px;
        left: 10px;
        position: absolute;
        top: 20px;
        width: 32px;
    }

    .header-tabs {
        align-items: center;
        border-bottom: 2px solid #ccc;
        display: flex;
        gap: 10px;
        justify-content: space-between;
        margin-bottom: 24px;
        padding-bottom: 12px;
        margin-left: 34px;

        @media (max-width: 768px) {
            flex-direction: column;
        }

        .tabs-container {
            display: flex;
            gap: 28px;
        }
    }

    h2 {
        color: #222;
        margin-bottom: 16px;
    }

    .botao-cadastrar {
        background-color: rgb(31, 70, 143);
        border: none;
        border-radius: 8px;
        color: #ffffff;
        cursor: pointer;
        font-weight: bold;
        padding: 15px 20px;
        right: 24px;
        transition: background-color 0.3s ease;
        z-index: 10;
    }

    .aba {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        height: 100vh;        
        overflow: hidden;     
    }

    .card {
        background-color: #c2c5c9;
        border-radius: 15px;
        box-shadow: var(--sombra-card);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding: 24px;
    }

    .card-header {
        background-color: var(--cor-tabela-header);
        border-bottom: 1px solid var(--cor-borda);
        padding: 16px 24px;
    }

    .card-header h2 {
        color: #000000;
        font-size: 22px;
        margin: 0;
    }

    .card-body {
        padding: 20px 24px;
        overflow-x: auto; 
    }

    .chart-wrapper {        
        height: 680px;
        margin: auto;
        width: 96%;
    }

    .table-wrapper {
        overflow-x: auto;
        width: 100%;
    }

    .tabela-funcionarios {
        border-collapse: collapse;
        border-radius: 0;
        box-shadow: none;
        width: 100%;
    }

    .tabela-funcionarios th,
    .tabela-funcionarios td {
        border: 1px solid #000000;
        color: #000000;
        cursor: default;
        font-size: 14px;
        padding: 6px 18px;
        text-align: left;
        transition: background-color 0.15s ease;
        white-space: nowrap;
    }

    .tabela-funcionarios th {
        background-color:  #bac1c2;
        color: #000000;
        font-weight: 600;
        user-select: none;
    }

    .tabela-funcionarios tbody tr:nth-child(even) {
        background-color: #bac1c2;
    }

    .tabela-funcionarios tbody tr:nth-child(odd) {
        background-color: #f5f5f5;
    }

    .tabela-funcionarios tbody tr:hover {
        background-color: #d0dae0;
    }

    .tabela-funcionarios tbody td:hover {
        background-color: #d0dae0;
        cursor: pointer;
    }

    .buttonIcon {
        background-color: white;
        border: none;
        border-radius: 50%; /* formato redondo */
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        font-size: 16px;
        margin: 0 5px;
        padding: 8px;
        transition: background-color 0.2s, transform 0.1s;
    }

    .buttonIcon:hover {
        background-color: #f0f0f0;
        transform: scale(1.05);
    }

    .botao-cadastrar:hover {
        background-color: rgb(140, 145, 155);
    }

    .tab {
        color: #444;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 6px;
        position: relative;
        transition: color 0.3s;
    }

    .tab.ativa {
        color: #1976d2;
    }

    .tab.ativa::after {
        background-color: #1976d2;
        border-radius: 2px;
        bottom: -2px;
        content: "";
        height: 3px;
        left: 0;
        position: absolute;
        width: 100%;
    }

    /* Área deslizável */
    .slider-container {
        height: calc(100% - 90px);
        overflow: hidden;
        position: relative;
        width: 100%;
    }

    .slider {
        display: flex;
        height: 100%;
        transition: transform 0.5s ease-in-out;
        width: 90%; 
    }

    .tabs button {
        background-color: #2980b9;
        border: none;
        border-radius: 8px;
        color: white;
        cursor: pointer;
        font-weight: bold;
        padding: 10px 18px;
        transition: background-color 0.3s ease;
    }

    .tabs button:hover {
        background-color: #1c5d8b;
    }
`;