import { supabase } from "@mhawzay/core";
import { SalesOrderModel } from "@mhawzay/models";
import { Request } from "@mhawzay/types";
import { Router } from "express";

export const router = Router();

router.get("/", (req: Request, res, next) => {
  const { uid } = req.auth;
  const { shop_id } = req.query;
  if (!shop_id) {
    return next({ status: 400, message: "required shop_id in query" });
  }
  SalesOrderModel.select()
    .eq("shop_id", shop_id)
    .then(({ error, data }) => {
      if (error) {
        return next({ status: 400, message: error.message });
      }
      if (data.length) {
        if (data[0].shops.user_id !== uid) {
          return next({ status: 403, message: "Forbidden" });
        }
        data = data.map((val) => {
          delete val.shops;
          return val;
        });
        return res.json(data);
      }
      res.json([]);
    });
});
