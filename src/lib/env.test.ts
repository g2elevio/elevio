import { afterEach, describe, expect, it, vi } from "vitest";
import { getDatabaseUrl, getLogLevel, getSiteUrl } from "./env";

vi.mock("server-only", () => ({}));
afterEach(() => vi.unstubAllEnvs());

describe("server environment", () => {
  it("does not require a database URL to read independent configuration", () => {
    vi.stubEnv("DATABASE_URL", undefined);
    vi.stubEnv("LOG_LEVEL", undefined);
    expect(getLogLevel()).toBe("info");
    expect(() => getDatabaseUrl()).toThrow("DATABASE_URL");
  });

  it("accepts PostgreSQL connection protocols", () => {
    for (const protocol of ["postgres", "postgresql"]) {
      const value = `${protocol}://app:development@localhost:5432/app`;
      vi.stubEnv("DATABASE_URL", value);
      expect(getDatabaseUrl()).toBe(value);
    }
  });

  it("rejects a wrong protocol without exposing its credentials", () => {
    vi.stubEnv("DATABASE_URL", "https://app:sensitive-test-value@example.invalid/db");
    expect(() => getDatabaseUrl()).toThrow("DATABASE_URL");
    expect(() => getDatabaseUrl()).not.toThrow("sensitive-test-value");
  });

  it("rejects malformed URLs and invalid log levels", () => {
    vi.stubEnv("DATABASE_URL", "not a URL");
    vi.stubEnv("LOG_LEVEL", "not-a-level");
    expect(() => getDatabaseUrl()).toThrow("DATABASE_URL");
    expect(() => getLogLevel()).toThrow("LOG_LEVEL");
  });

  it("resolves the public site URL from SITE_URL, then Vercel, then localhost", () => {
    vi.stubEnv("SITE_URL", undefined);
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", undefined);
    expect(getSiteUrl().href).toBe("http://localhost:3000/");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "elevio.vercel.app");
    expect(getSiteUrl().href).toBe("https://elevio.vercel.app/");
    vi.stubEnv("SITE_URL", "https://www.elevio.com.br");
    expect(getSiteUrl().href).toBe("https://www.elevio.com.br/");
    vi.stubEnv("SITE_URL", "ftp://elevio.com.br");
    expect(() => getSiteUrl()).toThrow("SITE_URL");
  });
});
