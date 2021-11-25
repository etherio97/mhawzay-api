import { ProductController } from "@mhawzay/controllers";
import { supabase } from "@mhawzay/core";
import { Product } from "@mhawzay/models";
import { Request } from "@mhawzay/types";
import { Router } from "express";

export const router = Router();

router.get("/", (req: Request, res, next) => {
  const { shop_id } = req.query;

  if (!shop_id) {
    return next({
      status: 400,
      message: "required shop_id query paramater",
    });
  }

  supabase
    .from("products")
    .select(
      "product_id:id,name,code,price,description,image_url,category,status"
    )
    .eq("user_id", req.auth.uid)
    .eq("shop_id", shop_id)
    .then(({ data, error }) => {
      if (error) {
        return next({
          status: 400,
          message: error.message,
        });
      }
      res.setHeader("cache-control", "private, max-age=300");
      res.json(data);
    });
});

router.post(
  "/",
  ProductController.validateRequestToCreate,
  (req: Request<Product>, res, next) => {
    supabase
      .from("products")
      .insert([req.body])
      .then(({ data, error }) => {
        if (error) {
          return next({
            status: 400,
            message: error.message,
          });
        }
        res.status(201).json(data[0]);
      });
  }
);

router.get("/:id", (req: Request, res, next) => {
  supabase
    .from("products")
    .select(
      "product_id:id,name,code,price,description,image_url,category,status"
    )
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
          message: "Product not found",
        });
      }
      res.json(data[0]);
    });
});

router.delete("/:id", (req: Request, res, next) => {
  supabase
    .from("products")
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
          message: "Product not found",
        });
      }
      let product = data[0];
      res.status(200).json({ product_id: product.id });
    });
});

router.patch(
  "/:id",
  ProductController.validateRequestToUpdate,
  (req: Request<Product>, res, next) => {
    supabase
      .from("products")
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
            message: "Product not found",
          });
        }
        res.status(200).json(req.body);
      });
  }
);
