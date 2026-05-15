const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const envPath = path.join(root, '.env');
const exampleEnvPath = path.join(root, '.env.example');
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

let env = {};
let sourceLabel = 'defaults';

if (fs.existsSync(envPath)) {
  env = parseEnv(fs.readFileSync(envPath, 'utf8'));
  sourceLabel = '.env';
} else if (fs.existsSync(exampleEnvPath)) {
  env = parseEnv(fs.readFileSync(exampleEnvPath, 'utf8'));
  sourceLabel = '.env.example';
  console.warn(`No .env file found at ${envPath}; using .env.example values and built-in defaults.`);
} else {
  console.warn(`No .env file found at ${envPath}; using built-in defaults.`);
}

const runtimeEnv = buildRuntimeObject(env);
const output = `window.__QB_ENV__ = ${JSON.stringify(runtimeEnv, null, 2)};\n`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output, 'utf8');
console.log(`Generated ${path.relative(root, outputPath)} from ${sourceLabel}`);
