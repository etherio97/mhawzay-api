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
    .catch((e) =>
      next({
        status: 401,
        error: e.message,
      })
    );
}
