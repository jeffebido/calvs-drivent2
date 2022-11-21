import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import ticketsService from "@/services/tickets-service";


export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getTicketTypes();

    res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTicketByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
    const ticket = await ticketsService.getByEnrollmentId(enrollment.id);

    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  
  const { ticketTypeId } = req.body;
  const { userId } = req;
  
  try {
    const ticket = await ticketsService.newTicket(userId, ticketTypeId);

    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
