import { EMAIL_VALIDATION_PATTERN } from "@mhawzay/config";
import { supabase } from "@mhawzay/core";
import { Router } from "express";

export const router = Router();

router.post("/", (req, res, next) => {
  const errors = [];
  const { email, password } = req.body;
  if (typeof email !== "string") {
    errors.push("Email adderss is required");
  } else if (!EMAIL_VALIDATION_PATTERN.test(email)) {
    errors.push("Invalid email address");
  }
  if (typeof password !== "string") {
    errors.push("Password is required");
  }
  if (errors.length) {
    return next({ status: 400, message: errors.join(". ") });
  }
  supabase.auth.signIn({ email, password }).then(({ session, error }) => {
    if (error) {
      return next({ status: error.status, message: error.message });
    }
    res.json(session);
  });
});

router.get("/", (req, res, next) => {
  const { email } = req.query;
  if (typeof email !== "string") {
    return next({
      status: 400,
      message: "required parameter for email in query",
    });
  }
  supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .then(({ data, error }) => {
      if (error) {
        return next({ status: 400, message: error.message });
      }
      res.json(!!data.length);
    });
});
