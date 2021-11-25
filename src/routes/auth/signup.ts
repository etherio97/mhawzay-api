import { EMAIL_VALIDATION_PATTERN } from "@mhawzay/config";
import { supabase } from "@mhawzay/core";
import { Router } from "express";

export const router = Router();

router.post("/", async (req, res, next) => {
  const errors = [];
  const { email, password, nickname } = req.body;
  if (typeof email !== "string") {
    errors.push("Email adderss is required");
  } else if (!EMAIL_VALIDATION_PATTERN.test(email)) {
    errors.push("Invalid email address");
  }
  if (typeof password !== "string") {
    errors.push("Password is required");
  }
  if (nickname && typeof nickname !== "string") {
    errors.push("Nickname must be string");
  }
  if (errors.length) {
    return next({ status: 400, message: errors.join(". ") });
  }
  let { error: err1, user, session } = await supabase.auth.signUp({
    email,
    password,
  });
  if (err1) {
    return next({ status: err1.status, message: err1.message });
  }
  let { error: err2 } = await supabase.from("users").insert([
    {
      nickname,
      email,
      uid: user.id,
    },
  ]);
  if (err2) {
    return next({ status: 400, message: err2.message });
  }
  res.json(session);
});
