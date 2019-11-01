import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box
    }

    html, body, #root {
        min-height: 100%;
    }

    body {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: 14px;
    }

    body a {
        color: #000;
    }

    body p {
        line-height: 21px;
    }

    body ul li {
        list-style: none;
        clear: left;
    }

    .container {
        width: 980px;
        margin: 0 auto;
    }

    .active {
        color: #fff!important;
        font-weight: bold;
    }

    .btn { margin-right: 4px;}

    h3 {
        margin: 40px 0 20px 0;
    }

    .profile {
        float: left;
        border-radius: 50%;
        margin-bottom: 10px;
        height: 140px;
    }

    .profile-grid {
        float: left;
        border-radius: 50%;
        margin-bottom: 10px;
        height: 45px;
    }

    .cargos tr:hover {
        cursor: move;
    }
    .modal {
        align-items: center;
    display: none;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    z-index: 40;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    }

    .modal-card {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 40px);
    overflow: hidden;
    position: relative;
    width: 500px;
    }

    .modal-card-head {
        align-items: center;
    background-color: whitesmoke;
    display: flex;
    flex-shrink: 0;
    justify-content: flex-start;
    padding: 20px;
    position: relative;
    border-bottom: 1px solid #dbdbdb;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
    

.modal-card-body {
    -webkit-overflow-scrolling: touch;
    background-color: white;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
    padding: 20px;
}

.modal-card-foot {
    align-items: center;
    background-color: whitesmoke;
    display: flex;
    flex-shrink: 0;
    justify-content: flex-start;
    padding: 20px;
    position: relative;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top: 1px solid #dbdbdb;
}
.modal.is-active {
    display: flex;
}

    .modal-background {
        background-color: rgba(10, 10, 10, 0.86);
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;

    }

    .modal h3 {
        margin: 5px 0;
        font-weight: bold;
        font-size: 21px;
    }
`;
