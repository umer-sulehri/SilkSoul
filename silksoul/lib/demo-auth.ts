import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "silksoul_admin_session";
export const USER_COOKIE = "silksoul_user_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

type SessionPayload = { sub: string; iat: number; exp: number };

export function demoCredentials(): { email: string; password: string } {
  return {
    email: process.env.ADMIN_EMAIL ?? "admin@silksoul.com",
    password: process.env.ADMIN_PASSWORD ?? "admin1234",
  };
}

export function matchesDemoCredentials(email: string, password: string): boolean {
  const creds = demoCredentials();
  return email === creds.email && password === creds.password;
}

export function userCredentials(): { email: string; password: string } {
  return {
    email: process.env.USER_EMAIL ?? "user@silksoul.com",
    password: process.env.USER_PASSWORD ?? "user1234",
  };
}

export function matchesUserCredentials(email: string, password: string): boolean {
  const creds = userCredentials();
  return email === creds.email && password === creds.password;
}

export function createDemoSession(
  email: string,
  maxAgeSeconds: number = MAX_AGE_SECONDS,
): string {
  return createSignedSession(email, maxAgeSeconds);
}

export function readDemoSession(token: string | undefined | null): string | null {
  return readSignedSession(token);
}

export function createUserSession(
  email: string,
  maxAgeSeconds: number = MAX_AGE_SECONDS,
): string {
  return createSignedSession(email, maxAgeSeconds);
}

export function readUserSession(token: string | undefined | null): string | null {
  return readSignedSession(token);
}

function secretKey(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "silksoul-admin-demo-secret";
}

function sign(data: string): string {
  return createHmac("sha256", secretKey()).update(data).digest("base64url");
}

function createSignedSession(
  email: string,
  maxAgeSeconds: number,
): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = { sub: email, iat: now, exp: now + maxAgeSeconds };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

function readSignedSession(token: string | undefined | null): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;

  const expected = Buffer.from(sign(parts[0]));
  const received = Buffer.from(parts[1]);
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(parts[0], "base64url").toString("utf8"),
    ) as SessionPayload;
    if (!payload.sub || payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload.sub;
  } catch {
    return null;
  }
}