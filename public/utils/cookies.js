function cookieDefine(chave, valor) {
    // const date = new Date();
    // date.setTime(date.getTime() + (60 * 60 * 1000));
    // const expires = "expires=" + date.toUTCString();
    document.cookie = `${chave}=${valor};path=/`;
}

function obterCookie(chave) {
    return document.cookie
        .split('; ')
        .find((cookie) => cookie.trim().startsWith(`${chave}=`))
        ?.split('=')[1];
}

function removerCookie(chave) {
    document.cookie = `${chave}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export { cookieDefine, obterCookie, removerCookie };