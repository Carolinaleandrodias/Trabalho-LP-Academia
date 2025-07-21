import styled from "styled-components";
import image from "../../../assets/4.jpg"


export const Container = styled.div`
    align-items: center;
    background: url(${image}) no-repeat center/cover;
    display: flex;
    height: 100vh;
    justify-content: center;
    margin: 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;

    .menu-icon {
        cursor: pointer;
        fill: #002d64;
        height: 32px;
        left: 10px;
        position: absolute;
        top: 10px;
        width: 32px;
    }

    .precos {
        display: flex;
        gap: 20px;
        margin: 250px 360px 0px 130px;
        width: 70%;

        @media (max-width: 768px) {
            flex-direction: column;
            margin: auto;
            padding: 40px 0;
        }
    }

`