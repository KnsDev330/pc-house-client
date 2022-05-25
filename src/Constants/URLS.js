const URLS = {
    serverRoot: 'http://localhost:5000',
    getJwt: 'get-jwt',
    getParts: 'get-parts',
    getPart: 'get-part',
    getUsers: 'get-users',
    isAdmin: 'is-admin',
    makeAdmin: 'make-admin',
    placeOrder: 'place-order',
    getMyOrders: 'get-my-orders',
    getOrder: 'get-order',
    getReviews: 'get-reviews',
    cancelOrder: 'cancel-order',
    storePayment: 'store-payment',
    createPaymentIntent: 'create-payment-intent'
}

const AxiosHeaders = {
    json: { 'content-type': 'application/json' },
    auth: { 'content-type': 'application/json', authorization: `Bearer ${localStorage.getItem('jwt')}` },
}
export { URLS, AxiosHeaders };