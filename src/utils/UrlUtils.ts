export const getUrlQueryParam = (name: string) => {
    const raw = getUrlQueryParamRaw(name);
    return !!raw ? decodeURIComponent(raw): undefined;
}

export const getUrlQueryParamRaw = (name: string) => {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == name) {
            return pair[1];
        }
    }
    return undefined;
}