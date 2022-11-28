import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";
import enrollmentsService from "../enrollments-service";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getTicketTypes() {
  const ticketTypes = await ticketsRepository.getAllTicketsTypes();

  if (!ticketTypes) throw notFoundError();

  return ticketTypes;
}

async function getByEnrollmentId(enrollmentId: number): Promise<Ticket & { TicketType: TicketType }> {
  
  const ticket = await ticketsRepository.findByEnrollmentId(enrollmentId);

  if (!ticket) throw notFoundError();

  return ticket;
}

async function newTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError;

  const data = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED
  };

  const newTicket = ticketsRepository.create(data);

  return newTicket;
}

async function getOneById(id: number) {
  const ticket = await ticketsRepository.getById(id);

  if (!ticket) throw notFoundError();

  return ticket;
}

async function update(ticketId: number) {
  const updatedTicket = await ticketsRepository.update(ticketId);

  return updatedTicket;
}

async function getTicketByUserId(userId: number) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

const ticketsService = {
  getTicketTypes,
  getByEnrollmentId,
  newTicket,
  getOneById,
  update,
  getTicketByUserId
};

export default ticketsService;
