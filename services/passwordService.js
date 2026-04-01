const crypto = require("crypto");
const authConfig = require("../config/auth");

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.pbkdf2Sync(
    password,
    salt,
    authConfig.passwordIterations,
    authConfig.passwordKeyLength,
    authConfig.passwordDigest
  ).toString("hex");

  return {
    salt,
    hash,
  };
}

function verifyPassword(password, salt, expectedHash) {
  const { hash } = hashPassword(password, salt);

  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(expectedHash, "hex"));
}

module.exports = {
  hashPassword,
  verifyPassword,
};
