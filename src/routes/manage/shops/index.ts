import { ShopController } from "@mhawzay/controllers";
import { connection, supabase } from "@mhawzay/core";
import { Shop } from "@mhawzay/models";
import { Request } from "@mhawzay/types";
import { Router } from "express";

export const router = Router();

router.get("/", async (req: Request, res, next) => {
  const started = Date.now();
  try {
    const { rows } = await connection.query(
      `SELECT id AS shop_id, name, category, status, slug, avatar_url, cover_url FROM shops WHERE user_id = '${req.auth.uid}';`
    );
    res.json(rows);
  } catch (e) {
    next({ status: 500, message: e.message });
  }
  console.log("Load Time: %d ms", Date.now() - started);
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
        res.status(201).json(data[0]);
      });
  }
);

router.get("/:id", async (req: Request, res, next) => {
  try {
    const { rows } = await connection.query(
      `SELECT id AS shop_id, name, category, status, slug, avatar_url, cover_url FROM shops WHERE user_id = '${req.auth.uid}' AND id = '${req.params.id}';`
    );
    if (!rows.length) {
      throw { status: 404, message: "Shop not found" };
    }
    res.json(rows[0]);
  } catch (e) {
    next({ status: e.status || 500, message: e.message });
  }
});

router.delete("/:id", async (req: Request, res, next) => {
  try {
    const { rowCount } = await connection.query(
      `DELETE FROM shops WHERE id = '${req.params.id}' AND user_id = '${req.auth.uid}';`
    );
    if (!rowCount) {
      throw { status: 404, message: "Shop not found" };
    }
    res.status(202).json({ success: true });
  } catch (e) {
    next({ status: e.status || 500, message: e.message });
  }
});

router.post(
  "/:id",
  ShopController.validateRequestToUpdate,
  async (req: Request<Shop>, res, next) => {
    try {
      const columns = Object.entries(req.body).map(
        ([key, value]) => `${key}='${value}'`
      );
      const { rowCount } = await connection.query(
        `UPDATE shops SET ${columns.join(",")} WHERE id = '${
          req.params.id
        }' AND user_id = '${req.auth.uid}';`
      );
      if (!rowCount) {
        throw { status: 404, message: "Shop not found" };
      }
      res.status(202).json({ success: true });
    } catch (e) {
      next({ status: e.status || 500, message: e.message });
    }
  }
);
