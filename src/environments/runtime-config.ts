export interface RuntimeEnvironment {
  API_URL?: string;
  WS_URL?: string;
  AUTH_URL?: string;
  GOOGLE_OAUTH_URL?: string;
  GITHUB_OAUTH_URL?: string;
}

declare global {
  interface Window {
    __QB_ENV__?: RuntimeEnvironment;
  }
}

export function getRuntimeEnvironment(): RuntimeEnvironment {
  if (typeof window === 'undefined') {
    return {};
  }

  return window.__QB_ENV__ ?? {};
}

export {};
