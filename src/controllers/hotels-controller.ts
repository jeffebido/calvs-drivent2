import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import hotelService from "@/services/hotels-service";
import ticketsService from "@/services/tickets-service";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticket = await ticketsService.getTicketByUserId(userId);

    if (ticket.status === "RESERVED") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    if (ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    const hotels = await hotelService.getHotels();

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getRoomsByHotelId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.params;

  try {
    if (isNaN(Number(hotelId))) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const ticket = await ticketsService.getTicketByUserId(userId);
    if (ticket.status === "RESERVED") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    if (ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    const hotels = await hotelService.getHotels();
    if (hotels.length === 0) {
      return res.status(httpStatus.OK).send(hotels);
    }

    await hotelService.getHotelById(Number(hotelId));

    const rooms = await hotelService.getRooms(Number(hotelId));

    return res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}