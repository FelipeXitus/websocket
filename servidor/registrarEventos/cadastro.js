function registrarEventosCadastro(socket, io) {

    socket.on('create-user', (dados) => {
        console.log(dados);
    });

}

export default registrarEventosCadastro;