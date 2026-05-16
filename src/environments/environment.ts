const isLocalhost =
  typeof window !== 'undefined' &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname);

export const environment = {
  production: false,
  apiUrl: isLocalhost
    ? 'http://localhost:8080/api/v1'
    : 'https://quickbite-api-gateway-3pmg.onrender.com/api/v1',
  wsUrl: isLocalhost
    ? 'http://localhost:8080/ws'
    : 'https://quickbite-api-gateway-3pmg.onrender.com/ws',
  authUrl: isLocalhost
    ? 'http://localhost:8081'
    : 'https://quickbite-auth-service-xx4w.onrender.com',
  googleOAuthUrl: '/oauth2/authorization/google',
  githubOAuthUrl: '/oauth2/authorization/github'
};
