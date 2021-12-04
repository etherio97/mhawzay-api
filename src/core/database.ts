import { DATABASE_URL } from "@mhawzay/config";
import { Client } from "pg";

export let connection: Client;

export function initializeDatabaseConnection(): Client {
  if (!DATABASE_URL) {
    throw new Error("environment variable: DATABASE_URL is undefined");
  }

  connection = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  return connection;
}
