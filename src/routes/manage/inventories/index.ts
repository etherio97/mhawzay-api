import { InventoryController } from "@mhawzay/controllers";
import { Inventory, InventoryModel } from "@mhawzay/models";
import { Request } from "@mhawzay/types";
import { Router } from "express";

export const router = Router();

router.get("/", (req: Request, res, next) => {
  const { product_id, shop_id } = req.query;
  if (!(product_id || shop_id)) {
    return next({
      message: "required either product_id or shop_id in query",
      status: 400,
    });
  }
  let ref = InventoryModel.select();
  if (product_id) {
    ref = ref.eq("product_id", product_id);
  } else {
    ref = ref.eq("shop_id", shop_id);
  }
  ref.eq("user_id", req.auth.uid).then(({ error, data }) => {
    if (error) {
      return next({
        status: 400,
        message: error.message,
      });
    }
    if (!data.length) {
      return next({
        status: 404,
        message: "inventory not found",
      });
    }
    res.setHeader("cache-control", "private, max-age=300");
    res.json(product_id ? data[0] : data);
  });
});

router.post(
  "/",
  InventoryController.validateRequestToCreate,
  (req: Request<Inventory>, res, next) => {
    InventoryModel.ref()
      .insert([req.body])
      .then(({ error }) => {
        if (error) {
          return next({ status: 400, message: error.message });
        }
        res.status(204).end();
      });
  }
);

router.put(
  "/",
  InventoryController.validateRequestToCreate,
  (req: Request<Inventory>, res, next) => {
    InventoryModel.ref()
      .update({
        stocks: req.body.stocks,
        updated_at: new Date(),
      })
      .eq("product_id", req.body.product_id)
      .eq("user_id", req.auth.uid)
      .then(({ error, data }) => {
        if (error) {
          return next({ status: 400, message: error.message });
        }
        if (!data.length) {
          return next({ status: 404, message: "inventory not found" });
        }
        res.status(204).end();
      });
  }
);
