const fileConnection = []

function findConnection(connection) {
    return fileConnection.find((conn) => conn.nomeDocumento === connection.nomeDocumento && conn.nomeUsuario === connection.nomeUsuario);
}

function addConnection(connection) {
    fileConnection.push(connection);
}

function removeConnection(connection) {
    const index = fileConnection.findIndex((conn) => conn.nomeDocumento === connection.nomeDocumento && conn.nomeUsuario === connection.nomeUsuario);
    if (index !== -1) {
        fileConnection.splice(index, 1);
    }
}

function getUserDocument(documentName) {
    return fileConnection
        .filter((connection) => connection.nomeDocumento === documentName)
        .map((connection) => connection.nomeUsuario);
}


export { addConnection, getUserDocument, removeConnection, findConnection };