module.exports = {
  tokenSecret: process.env.TOKEN_SECRET || "dev-secret-change-me",
  tokenExpiresInSeconds: Number(process.env.TOKEN_EXPIRES_IN_SECONDS || 60 * 60 * 8),
  passwordIterations: 100000,
  passwordKeyLength: 64,
  passwordDigest: "sha512",
};
