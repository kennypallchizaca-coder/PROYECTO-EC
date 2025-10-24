// Bridge root Expo config to the frontend/app.config.ts
// This avoids ESM/TS resolution quirks when loading config.
module.exports = (...args) => require('./frontend/app.config.ts').default(...args);

