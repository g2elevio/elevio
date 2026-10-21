import { afterEach, describe, expect, it, vi } from "vitest";
import { getDatabaseUrl, getGaMeasurementId, getLogLevel, getSiteUrl } from "./env";

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

  it("treats a missing GA4 ID as analytics off and rejects malformed IDs", () => {
    vi.stubEnv("GA_MEASUREMENT_ID", undefined);
    expect(getGaMeasurementId()).toBeUndefined();
    vi.stubEnv("GA_MEASUREMENT_ID", "");
    expect(getGaMeasurementId()).toBeUndefined();
    vi.stubEnv("GA_MEASUREMENT_ID", "G-AB12CD34EF");
    expect(getGaMeasurementId()).toBe("G-AB12CD34EF");
    vi.stubEnv("GA_MEASUREMENT_ID", "UA-1234-1");
    expect(() => getGaMeasurementId()).toThrow("GA_MEASUREMENT_ID");
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
