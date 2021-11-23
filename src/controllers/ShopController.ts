import { nullSafe } from "@mhawzay/core";
import { Shop } from "@mhawzay/models";
import { Request } from "@mhawzay/types";
import { NextFunction, Response } from "express";

export class ShopController {
  static validateRequestToCreate(
    req: Request<Shop>,
    res: Response,
    next: NextFunction
  ) {
    const errors = [];
    let { name, category, slug, avatar_url, cover_url, status } = req.body;
    if (typeof name !== "string") {
      errors.push("name must be string");
    }
    if (typeof category !== "string") {
      errors.push("category must be string");
    }
    if (slug && typeof slug !== "string") {
      errors.push("slug must be string");
    }
    if (avatar_url && typeof avatar_url !== "string") {
      errors.push("avatar_url must be string");
    }
    if (cover_url && typeof cover_url !== "string") {
      errors.push("cover_url must be string");
    }
    if (!status) {
      status = "UNPUBLISHED";
    }
    if (!["PUBLISHED", "UNPUBLISHED"].includes(status)) {
      errors.push("status must be either PUBLISHED or UNPUBLISHED");
    }
    if (errors.length) {
      return next({ status: 400, message: errors.join(". ") });
    }
    req.body = {
      name,
      category,
      slug,
      avatar_url,
      cover_url,
      status,
      user_id: req.auth.uid,
    };
    next();
  }

  static validateRequestToUpdate(req: Request<Shop>, res, next) {
    const errors = [];
    let { name, category, slug, avatar_url, cover_url, status } = req.body;
    if (name && typeof name !== "string") {
      errors.push("name must be string");
    }
    if (category && typeof category !== "string") {
      errors.push("category must be string");
    }
    if (slug && typeof slug !== "string") {
      errors.push("slug must be string");
    }
    if (avatar_url && typeof avatar_url !== "string") {
      errors.push("avatar_url must be string");
    }
    if (cover_url && typeof cover_url !== "string") {
      errors.push("cover_url must be string");
    }
    if (status && !["PUBLISHED", "UNPUBLISHED"].includes(status)) {
      errors.push("status must be either PUBLISHED or UNPUBLISHED");
    }
    if (errors.length) {
      return next({ status: 400, message: errors.join(". ") });
    }
    req.body = nullSafe({
      name,
      category,
      slug,
      avatar_url,
      cover_url,
      status,
    });
    next();
  }
}
