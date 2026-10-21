import { afterEach, beforeEach, expect, it, vi } from "vitest";

const ID = "G-TEST123";

function fakeBrowser(storage: Partial<Storage>) {
  const browser = {
    localStorage: storage,
    location: { hostname: "www.elevio.com.br" },
    dispatchEvent: vi.fn(),
  } as unknown as Window & Record<string, unknown>;
  vi.stubGlobal("window", browser);
  return browser;
}

let cookieWrites: string[];

beforeEach(() => {
  vi.resetModules();
  cookieWrites = [];
  vi.stubGlobal("document", {
    get cookie() {
      return "_ga=GA1.1.1; _ga_TEST123=GS1; theme=dark";
    },
    set cookie(value: string) {
      cookieWrites.push(value);
    },
  });
});

afterEach(() => vi.unstubAllGlobals());

it("ignores events until consent loads gtag", async () => {
  const browser = fakeBrowser({});
  const { trackEvent } = await import("./analytics");
  expect(() => trackEvent("generate_lead")).not.toThrow();
  expect(browser.dataLayer).toBeUndefined();
});

it("queues consent, config and events for gtag.js without remarketing", async () => {
  const browser = fakeBrowser({});
  const { enableAnalytics, trackEvent } = await import("./analytics");
  enableAnalytics(ID);
  trackEvent("whatsapp_click");
  const calls = (browser.dataLayer ?? []).map((entry) => Array.from(entry as IArguments));
  expect(calls[0]).toEqual(["consent", "default", expect.objectContaining({ analytics_storage: "granted", ad_personalization: "denied" })]);
  expect(calls).toContainEqual(["config", ID]);
  expect(calls.at(-1)).toEqual(["event", "whatsapp_click", undefined]);
  expect(browser[`ga-disable-${ID}`]).toBe(false);
});

it("stops sending and clears only Google cookies when consent is revoked", async () => {
  const browser = fakeBrowser({});
  const { disableAnalytics, enableAnalytics } = await import("./analytics");
  enableAnalytics(ID);
  disableAnalytics(ID);
  expect(browser.gtag).toBeUndefined();
  expect(browser[`ga-disable-${ID}`]).toBe(true);
  expect(cookieWrites).toContain("_ga=; Max-Age=0; path=/; domain=.elevio.com.br");
  expect(cookieWrites).toContain("_ga_TEST123=; Max-Age=0; path=/; domain=.www.elevio.com.br");
  expect(cookieWrites.some((write) => write.startsWith("theme="))).toBe(false);
});

it("keeps the choice in memory when the browser blocks storage", async () => {
  const blocked = () => {
    throw new Error("blocked");
  };
  const browser = fakeBrowser({ getItem: blocked, setItem: blocked });
  const { readConsent, saveConsent } = await import("./analytics");
  expect(readConsent()).toBeNull();
  saveConsent("denied");
  expect(readConsent()).toBe("denied");
  expect(browser.dispatchEvent).toHaveBeenCalledOnce();
});

it("reads a stored choice and ignores unknown values", async () => {
  const values: Record<string, string> = { "elevio-cookie-consent": "granted" };
  fakeBrowser({ getItem: (key: string) => values[key] ?? null });
  const { readConsent } = await import("./analytics");
  expect(readConsent()).toBe("granted");
  values["elevio-cookie-consent"] = "maybe";
  expect(readConsent()).toBeNull();
});
