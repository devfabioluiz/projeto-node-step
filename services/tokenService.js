const crypto = require("crypto");
const authConfig = require("../config/auth");

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + padding, "base64").toString("utf8");
}

function sign(content) {
  return crypto
    .createHmac("sha256", authConfig.tokenSecret)
    .update(content)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function createToken(payload) {
  const header = { alg: "HS256", typ: "JWT" };
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const body = {
    ...payload,
    iat: nowInSeconds,
    exp: nowInSeconds + authConfig.tokenExpiresInSeconds,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedBody = base64UrlEncode(JSON.stringify(body));
  const signature = sign(`${encodedHeader}.${encodedBody}`);

  return `${encodedHeader}.${encodedBody}.${signature}`;
}

function verifyToken(token) {
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("Token invalido.");
  }

  const [encodedHeader, encodedBody, signature] = parts;
  const expectedSignature = sign(`${encodedHeader}.${encodedBody}`);
  const providedSignatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (
    providedSignatureBuffer.length !== expectedSignatureBuffer.length ||
    !crypto.timingSafeEqual(providedSignatureBuffer, expectedSignatureBuffer)
  ) {
    throw new Error("Assinatura do token invalida.");
  }

  const payload = JSON.parse(base64UrlDecode(encodedBody));
  const nowInSeconds = Math.floor(Date.now() / 1000);

  if (payload.exp <= nowInSeconds) {
    throw new Error("Token expirado.");
  }

  return payload;
}

module.exports = {
  createToken,
  verifyToken,
};

