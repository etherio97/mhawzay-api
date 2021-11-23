import { ShopController } from "@mhawzay/controllers";
import { supabase } from "@mhawzay/core";
import { Shop } from "@mhawzay/models";
import { Request } from "@mhawzay/types";
import { Router } from "express";

export const router = Router();

router.get("/", (req: Request, res, next) => {
  supabase
    .from("shops")
    .select("shop_id:id,name,category,status,slug,avatar_url,cover_url")
    .eq("user_id", req.auth.uid)
    .then(({ data, error }) => {
      if (error) {
        return next({
          status: 400,
          message: error.message,
        });
      }
      res.json(data);
    });
});

router.post(
  "/",
  ShopController.validateRequestToCreate,
  (req: Request<Shop>, res, next) => {
    supabase
      .from("shops")
      .insert([req.body])
      .then(({ data, error }) => {
        if (error) {
          return next({
            status: 400,
            message: error.message,
          });
        }
        res.status(201).json(data);
      });
  }
);

router.delete("/:id", (req: Request, res, next) => {
  supabase
    .from("shops")
    .delete()
    .eq("id", req.params.id)
    .eq("user_id", req.auth.uid)
    .then(({ data, error }) => {
      if (error) {
        return next({
          status: 400,
          message: error.message,
        });
      }
      if (!data.length) {
        return next({
          status: 404,
          message: "Shop not found",
        });
      }
      res.status(200).json({ shop_id: data[0].id });
    });
});

router.patch(
  "/:id",
  ShopController.validateRequestToUpdate,
  (req: Request<Shop>, res, next) => {
    supabase
      .from("shops")
      .update(req.body)
      .eq("id", req.params.id)
      .eq("user_id", req.auth.uid)
      .then(({ data, error }) => {
        if (error) {
          return next({
            status: 400,
            message: error.message,
          });
        }
        if (!data.length) {
          return next({
            status: 404,
            message: "Shop not found",
          });
        }
        res.status(204).end();
      });
  }
);
