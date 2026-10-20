import { afterEach, expect, it, vi } from "vitest";
import { Client } from "pg";
import { KEEPALIVE_QUERY, pingDatabase } from "./keepalive";

const client = vi.hoisted(() => ({
  connect: vi.fn(),
  query: vi.fn(),
  end: vi.fn(),
}));
vi.mock("pg", () => ({ Client: vi.fn(function () { return client; }) }));

const url = "postgresql://app:development@localhost:6543/postgres";

afterEach(() => {
  vi.clearAllMocks();
});

it("rejects missing configuration before connecting", async () => {
  await expect(pingDatabase(undefined)).rejects.toThrow("DATABASE_URL");
  expect(Client).not.toHaveBeenCalled();
});

it("reads one row from an app table and closes the connection", async () => {
  await pingDatabase(url);
  expect(Client).toHaveBeenCalledWith(expect.objectContaining({ connectionString: url }));
  expect(client.query).toHaveBeenCalledWith(KEEPALIVE_QUERY);
  expect(client.end).toHaveBeenCalledOnce();
});

it("closes the connection when the query fails", async () => {
  client.query.mockRejectedValueOnce(new Error("boom"));
  await expect(pingDatabase(url)).rejects.toThrow("boom");
  expect(client.end).toHaveBeenCalledOnce();
});
