"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mhawzay/core");
const config_1 = require("@mhawzay/config");
const routes_1 = require("@mhawzay/routes");
async function bootstrap() {
    const booted = Date.now();
    (0, core_1.initializeFirebaseAdmin)();
    (0, core_1.initializeSupabase)();
    await (0, core_1.initializeDatabaseConnection)().connect();
    console.log("Boot Time: %d ms", Date.now() - booted);
    core_1.app.use(routes_1.router);
    core_1.app.use(core_1.errorHandler);
    core_1.app.listen(config_1.PORT, () => console.log(`server is running on http://localhost:${config_1.PORT}`));
}
bootstrap();
