const URLS = {
    demoProduct: 'demo',
    serverRoot: 'http://localhost:5000',
    getJwt: 'get-jwt',
    getParts: 'get-parts',
    getPart: 'get-part',
    getUsers: 'get-users',
    isAdmin: 'is-admin',
    makeAdmin: 'make-admin',
    placeOrder: 'place-order',
    getMyOrders: 'get-my-orders',
    getAllOrders: 'get-all-orders',
    getOrder: 'get-order',
    profile: 'profile',
    addReview: 'add-review',
    addProduct: 'add-product',
    getReviews: 'get-reviews',
    cancelOrder: 'cancel-order',
    deleteOrder: 'delete-order',
    deleteProduct: 'delete-product',
    orderShipped: 'order-shipped',
    storePayment: 'store-payment',
    createPaymentIntent: 'create-payment-intent'
}

const AxiosHeaders = {
    json: { 'content-type': 'application/json' },
    auth: { 'content-type': 'application/json', authorization: `Bearer ${localStorage.getItem('jwt')}` },
}
export { URLS, AxiosHeaders };