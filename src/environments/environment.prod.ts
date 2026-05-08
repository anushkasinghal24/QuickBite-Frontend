import { getRuntimeEnvironment } from './runtime-config';

const runtime = getRuntimeEnvironment();

export const environment = {
  production: true,
  apiUrl: runtime.API_URL ?? 'http://localhost:8080/api/v1',
  wsUrl: runtime.WS_URL ?? 'http://localhost:8080/ws',
  authUrl: runtime.AUTH_URL ?? 'http://localhost:8081',
  googleOAuthUrl: runtime.GOOGLE_OAUTH_URL ?? '/oauth2/authorization/google',
  githubOAuthUrl: runtime.GITHUB_OAUTH_URL ?? '/oauth2/authorization/github'
};
