const app = {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '9000',
    // port: process.env.PORT || '6000',
    name: process.env.NAME || 'house',
    secret: 'ANJPV4070F',
    encryptionKey: process.env.ENCRYPTION_KEY || 'YpwGaL2f54AbxbeppAGipxK+GhfQr9IA5b+vOvRVRVE=',
    superSecretForAdmin: process.env.JWT_SECRET_ADMIN || '5AeRy7C23VU2ARP9MAC7zrG5MRV+70l4zWffgvKb9Co=',
    superSecretForUser: process.env.JWT_SECRET_USER || 'NakJ5JQHWaTnz3GiXQl0kVPjsFYzdI8ClA',
};

export default app;