const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const envPath = path.join(root, '.env');
const outputPath = path.join(root, 'src', 'assets', 'env.js');

function parseEnv(text) {
  const result = {};

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const eqIndex = line.indexOf('=');
    if (eqIndex === -1) {
      continue;
    }

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

function buildRuntimeObject(env) {
  return {
    API_URL: env.API_URL || 'http://localhost:8080/api/v1',
    WS_URL: env.WS_URL || 'http://localhost:8080/ws',
    AUTH_URL: env.AUTH_URL || 'http://localhost:8081',
    GOOGLE_OAUTH_URL: env.GOOGLE_OAUTH_URL || '/oauth2/authorization/google',
    GITHUB_OAUTH_URL: env.GITHUB_OAUTH_URL || '/oauth2/authorization/github'
  };
}

if (!fs.existsSync(envPath)) {
  throw new Error(`Missing .env file at ${envPath}`);
}

const env = parseEnv(fs.readFileSync(envPath, 'utf8'));
const runtimeEnv = buildRuntimeObject(env);
const output = `window.__QB_ENV__ = ${JSON.stringify(runtimeEnv, null, 2)};\n`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output, 'utf8');
console.log(`Generated ${path.relative(root, outputPath)} from .env`);
