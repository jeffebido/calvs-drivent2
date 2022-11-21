import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketByUser, getTicketTypes, createTicket } from "@/controllers";
import { createTicketSchema } from "@/schemas";


const ticketsRouter = Router();

ticketsRouter.use(authenticateToken);

ticketsRouter
  .get("/types", getTicketTypes)
  .get("/", getTicketByUser)
  .post("/", validateBody(createTicketSchema), createTicket);

export { ticketsRouter };