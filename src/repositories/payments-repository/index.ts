import { prisma } from "@/config";
import { Payment } from "@prisma/client";
import { CreatePaymentType } from "@/protocols";

async function findByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}

async function create(data: CreatePaymentType) {
  return prisma.payment.create({
    data
  });
}

const paymentsRepository = {
  findByTicketId,
  create
};

export default paymentsRepository;
