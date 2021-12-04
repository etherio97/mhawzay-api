import {
  app,
  errorHandler,
  initializeDatabaseConnection,
  initializeFirebaseAdmin,
  initializeSupabase,
} from "@mhawzay/core";
import { PORT } from "@mhawzay/config";
import { router } from "@mhawzay/routes";

async function bootstrap() {
  const booted = Date.now();

  initializeFirebaseAdmin();

  initializeSupabase();

  await initializeDatabaseConnection().connect();

  console.log("Boot Time: %d ms", Date.now() - booted);

  app.use(router);

  app.use(errorHandler);

  app.listen(PORT, () =>
    console.log(`server is running on http://localhost:${PORT}`)
  );
}

bootstrap();
