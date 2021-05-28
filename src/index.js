const makeApiCall = (service, apiKey, params, path) => {

    const url = buildUrl(service, apiKey, params, path);
    let xmlHttp = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState !== 4) {
                return;
            }

            if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
                resolve(JSON.parse(xmlHttp.responseText));
            } else {
                reject(xmlHttp)
            }
        };

        xmlHttp.open('GET', url, true);
        xmlHttp.send();
    })
};

const buildUrl = (service, apiKey, params, path) => {
    if (!apiKey) {
        throw new Error('No api key is set.')
    }

    let paramString = '';

    if (typeof params === 'string') {
        paramString = `&${params}`;
    } else if (Array.isArray(params)) {
        params.forEach(param => {
            paramString += `&${param}`
        })
    }

    let pathString = '';

    if (typeof path === 'string') {
        pathString = "/".concat(path);
    }

    return`https://${service}.abstractapi.com/v1${pathString}?api_key=${apiKey}${paramString}&lang=js`;
}

export {
    makeApiCall,
    buildUrl
}
