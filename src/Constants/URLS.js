const URLS = {
    serverRoot: 'http://localhost:5000',
    getJwt: 'get-jwt',
    getParts: 'get-parts',
    getPart: 'get-part',
    getUsers: 'get-users',
    makeAdmin: 'make-admin'
}

const AxiosHeaders = {
    json: { 'content-type': 'application/json' },
    auth: { 'content-type': 'application/json', authorization: `Bearer ${localStorage.getItem('jwt')}` },
}
export { URLS, AxiosHeaders };