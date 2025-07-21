import styled from "styled-components";
import { Link as RouterLink } from 'react-router-dom';

export const Container = styled.div`
    align-items: center;
    background-color: #084669;
    display: flex;
    height: 100vh;
    justify-content: center;
    width: 100vw;

    .login-box {
        background-color: #3498db; 
        border-radius: 12px;
        color: white;
        padding: 40px;
        text-align: center;
        width: 350px;
    }

    .logo {
        align-items: center;
        display: flex;
        flex-direction: column;
        font-size: 24px;
        margin-bottom: 10px;
    }

    .logo-img {
        margin-top: -60px; 
        width: 300px;
    }

    .bem-vindo {
        font-size: 27px;
        font-weight: bold;
        margin: 20px ;
        margin-top: -10px;
    }


    .formulario {
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .formulario label {
        font-size: 14px;
        font-weight: bold;
        margin-top: 10px;
    }

    .formulario input {
        border: none;
        border-radius: 8px;
        box-sizing: border-box;
        margin-top: 5px;
        padding: 10px;
    }

    .formulario button {
        background-color: #2980b9;
        border: none;
        border-radius: 8px;
        color: white;
        cursor: pointer;
        font-weight: bold;
        padding: 10px;
    }

    .formulario button:hover {
        background-color: #1c638f;
    }

    input{
        background-color: #ecf0f1;
        color: black;
    }

    span.error-message {
        color: red;
        font-size: 14px;
        text-align: center;
    }

`;

export const Link = styled(RouterLink)`
    color: #FFF;
    margin: 22px 0 6px 0;
    text-decoration: none;
    text-align: center;

    &:hover {
        color: #005577;
    }
`;