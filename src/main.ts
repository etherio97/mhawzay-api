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

app.use((req, res, next) => {
  let origin: string | undefined = req.headers.origin;
  if (!origin) return next();
  if (/^https?:\/\/(localhost|mhawzay|shop\.nweoo\.com)/.test(origin)) return next();
  next({ status: 429, message: "Too many request" });
});

app.use(router);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
