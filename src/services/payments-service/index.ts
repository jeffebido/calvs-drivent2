import { notFoundError, unauthorizedError } from "@/errors";
import { PaymentInfo } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";
import enrollmentsService from "../enrollments-service";
import ticketsService from "../tickets-service";

async function getByTicketId(ticketId: number) {
  const payment = await paymentsRepository.findByTicketId(ticketId);

  if (!payment) throw notFoundError();

  return payment;
}

async function checkTicketByUserId(ticketId: number, userId: number) {
  const ticket = await ticketsService.getOneById(ticketId);

  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);

  if (ticket.enrollmentId !== enrollment.id) throw unauthorizedError();
}

async function create(paymentInfo: PaymentInfo, userId: number) {

  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);

  const ticketInfo = await ticketsService.getByEnrollmentId(enrollment.id);


  const cardLastDigits = paymentInfo.cardData.number.slice(-4);

  const data = {

    ticketId: ticketInfo.id,
    value: ticketInfo.TicketType.price,
    cardIssuer: paymentInfo.cardData.issuer,
    cardLastDigits

  };

  const newPayment = await paymentsRepository.create(data);

  return newPayment;
}

const paymentsService = {
  getByTicketId,
  checkTicketByUserId,
  create
};

export default paymentsService;
