import express, { Request, Response } from "express";
import { failed } from "../utility/responseArr";
import { get, post, update, remove } from "../controllers/caseController";

const router = express.Router();

router
  .get("/", async (req: Request, res: Response) => {
    try {
      const gellAllCases = await get();

      return res.send(gellAllCases);
    } catch (error) {

      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  })

  .post("/", async (req: Request, res: Response) => {
    try {
      const { customerName, startDate, isFinished } = req.body;
      const result = await post(customerName, startDate, isFinished);

      return res.send(result);

    } catch (error) {
      console.error(error);
      const errorMessage = "An error occurred while creating a cases";

      return res.status(500).send(failed(errorMessage));
    }
  })

  .put('/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const numericId = Number(id);
      const { customerName, startDate, isFinished } = req.body;

      const updatedCase = await update(numericId, customerName, startDate, isFinished);
      return res.send(updatedCase);
    } catch (error) {
      console.error(error);
      const errorMessage = 'An error occurred while updating a case';
      return res.status(500).send(failed(errorMessage));
    }
  })

  .delete('/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const numericId = Number(id);
      const isDeleted = await remove(numericId);
      res.send(isDeleted);
    } catch (error) {
      console.error(error);
      const errorMessage = 'An error occurred while deleting a case';
      return res.status(500).send(failed(errorMessage));
    }
  });

export default router;
