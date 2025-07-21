import styled from "styled-components";

export const Container = styled.div`
    background: #f4f6f8;
    box-sizing: border-box;
    display: flex;
    height: 100vh;
    width: 100vw;

    .menu-header {
        display: flex;
        gap: 20px;
    }

    .close-icon {
        cursor: pointer;
    }

    .sidebar {
        background: #2c3e50;
        color: white;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        padding: 20px;
        width: 250px;

        @media (max-width: 768px) {
            width: 100%;
        }
    }

    .logo {
        font-size: 22px;
        font-weight: bold;
        margin: 0 0 30px 0;
        text-align: center;
    }

    .sidebar ul {
        flex-grow: 1;
        list-style: none;
        padding: 0;
    }

    .sidebar li {
        border-radius: 6px;
        box-sizing: border-box;
        cursor: pointer;
        margin-bottom: 10px;
        padding: 15px 10px;
        transition: background-color 0.3s;
    }

    .sidebar li:hover {
        background: #34495e;
    }

    .sidebar li.ativo {
        background: #2980b9;
        font-weight: bold;
    }

    .main-content {
        width: 100%;
    }

    .conteudo-principal h2 {
        /* color: #34495e; */
        margin-top: 0;
    }

`

// export const Content = styled.div`
//     box-sizing: border-box;
//     background: white;
//     overflow-x: auto;
//     overflow-y: hidden;
//     width: 100vw;
// `;

