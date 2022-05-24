const URLS = {
    serverRoot: 'http://localhost:5000',
    getJwt: 'get-jwt',
    getParts: 'get-parts'
}

const AxiosHeaders = {
    json: { 'content-type': 'application/json' },
    auth: { 'content-type': 'application/json', authorization: `Bearer ${localStorage.getItem('jwt')}` },
}
export { URLS, AxiosHeaders };