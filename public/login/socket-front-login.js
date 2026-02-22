import { cookieDefine } from '../utils/cookies.js';
const socket = io();

function issueUserAutentication(dados) {
    socket.emit('autentication-user', dados);
};

socket.on('autentication-user-success', (response) => {
    alert(response.message);
    window.location.href = '/';
});

socket.on('session-user-success', (session) => {
    cookieDefine("session", session);
});

socket.on('autentication-user-error', (response) => {
    alert(response.message);
});

export { issueUserAutentication };