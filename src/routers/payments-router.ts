import { Router } from "express";

import { authenticateToken, validateBody } from "@/middlewares";
import { getPaymentByTicketId, newPayment } from "@/controllers";
import { newPaymentSchema } from "@/schemas";


const paymentsRouter = Router();

paymentsRouter.use(authenticateToken);

paymentsRouter
  .get("/", getPaymentByTicketId)
  .post("/process", validateBody(newPaymentSchema), newPayment);

export { paymentsRouter };