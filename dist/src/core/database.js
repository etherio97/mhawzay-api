"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabaseConnection = exports.connection = void 0;
const config_1 = require("@mhawzay/config");
const pg_1 = require("pg");
function initializeDatabaseConnection() {
    if (!config_1.DATABASE_URL) {
        throw new Error("environment variable: DATABASE_URL is undefined");
    }
    exports.connection = new pg_1.Client({
        connectionString: config_1.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });
    return exports.connection;
}
exports.initializeDatabaseConnection = initializeDatabaseConnection;
