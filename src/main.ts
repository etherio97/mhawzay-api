import {
  app,
  errorHandler,
  initializeFirebaseAdmin,
  initializeSupabase,
} from "@mhawzay/core";
import { PORT } from "@mhawzay/config";
import { router } from "@mhawzay/routes";

initializeFirebaseAdmin();

initializeSupabase();

app.use(router);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
