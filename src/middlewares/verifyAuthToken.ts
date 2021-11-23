import * as admin from "firebase-admin";

export function verifyAuthToken(req, res, next) {
  let token;
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
    });
}
