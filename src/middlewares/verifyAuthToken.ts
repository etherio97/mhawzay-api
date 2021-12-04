import * as admin from "firebase-admin";

export function verifyAuthToken(req, res, next) {
  let token;
  // req.auth = { uid: "qIT8EzIwIWb5Rj6zwc065DPiseP2" };
  // return next();
  const started = Date.now();
  if ("authorization" in req.headers) {
    token = req.headers.authorization.replace("Bearer ", "");
  }
  if (!token) {
    return next({ status: 401, message: "Unauthorized" });
  }
  admin
    .auth()
    .verifyIdToken(token)
    .then((user) => {
      req.auth = user;
      next();
      console.log("Auth Time: %d ms", Date.now() - started);
    })
    .catch((e) => {
      let error = "Failed to authenicate";
      switch (e.code) {
        case "auth/id-token-expired":
          error = "Access token has been expired";
          break;
        case "argument-error":
          error = "Invalid access token";
          break;
        default:
          console.log("[middleware:auth]", e.code);
      }
      next({ status: 401, error });
      console.log("Auth Time: %d ms", Date.now() - started);
    });
}
