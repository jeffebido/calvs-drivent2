import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import { PaymentInfo } from "@/protocols";
import paymentsService from "@/services/payments-service";
import ticketsService from "@/services/tickets-service";


export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;

  if (!Number(ticketId)) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    await paymentsService.checkTicketByUserId(Number(ticketId), userId);

    const payment = await paymentsService.getByTicketId(Number(ticketId));

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function newPayment(req: AuthenticatedRequest, res: Response) {
  const paymentInfo = req.body as PaymentInfo;
  const { ticketId } = paymentInfo;
  const { userId } = req;

  try {
    await paymentsService.checkTicketByUserId(ticketId, userId);

    const newPayment = await paymentsService.create(paymentInfo, userId);

    await ticketsService.update(ticketId);
        
    return res.status(httpStatus.OK).send(newPayment);
  } catch (error) {

    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);        
  }
}
