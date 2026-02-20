const socket = io();

function issueUserCreation(dados) {
    socket.emit('create-user', dados);
};

export { issueUserCreation };