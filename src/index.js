const makeApiCall = (service, apiKey, params) => {

    const url = buildUrl(service, apiKey, params);

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

const buildUrl = (service, apiKey, params) => {
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

    return`https://${service}.abstractapi.com/v1?api_key=${apiKey}${paramString}&lang=js`;
}

export {
    makeApiCall,
    buildUrl
}
