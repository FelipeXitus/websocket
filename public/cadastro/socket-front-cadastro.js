const socket = io();

function issueUserCreation(dados) {
    socket.emit('create-user', dados);
};

socket.on('create-user-success', (response) => {
    alert(response.message);
});

socket.on('create-user-error', (response) => {
    alert(response.message);
});

socket.on('create-user-exists', (response) => {
    alert(response.message);
});

export { issueUserCreation };