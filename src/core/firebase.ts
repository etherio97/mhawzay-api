import * as admin from "firebase-admin";
import { cwd } from "process";
import { join } from "path";
import { existsSync, readFileSync } from "fs";
import { FIREBASE_PROJECT_ID } from "@mhawzay/config";

export function initializeFirebaseAdmin() {
  const SERVICE_ACCOUNT_PATH = join(cwd(), "serviceAccount.json");
  if (admin.apps.length) {
    return admin.app();
  }
  if (!existsSync(SERVICE_ACCOUNT_PATH)) {
    throw new Error("serviceAccount.json is required");
  }
  const serviceAccount = JSON.parse(
    readFileSync(SERVICE_ACCOUNT_PATH, "utf-8")
  );
  const firebaseConfig = {
    projectId: FIREBASE_PROJECT_ID,
    credential: admin.credential.cert(serviceAccount),
  };
  return admin.initializeApp(firebaseConfig);
}
