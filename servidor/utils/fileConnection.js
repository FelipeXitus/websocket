const fileConnection = []

function addConnection(connection) {
    fileConnection.push(connection);
}

function getUserDocument(documentName) {
    return fileConnection
        .filter((connection) => connection.nomeDocumento === documentName)
        .map((connection) => connection.nomeUsuario);
}

function removeConnection(connection) {
    const index = fileConnection.findIndex((conn) => conn.nomeDocumento === connection.nomeDocumento && conn.nomeUsuario === connection.nomeUsuario);
    if (index !== -1) {
        fileConnection.splice(index, 1);
    }
}

export { addConnection, getUserDocument, removeConnection };