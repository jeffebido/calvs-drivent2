import { prisma } from "@/config";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";
import { TicketParamsType, TicketTypesType } from "@/protocols";


async function findByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId
    },
    include: {
      TicketType: true
    }
  });
}

async function create(data: TicketParamsType) {

  return prisma.ticket.create({
    data,
    include: {
      TicketType: true
    }
  });
}

async function getById(id: number) {

  return prisma.ticket.findFirst({
    where: {
      id
    }
  });
}

async function update(id: number) {
  return prisma.ticket.update({
    where: {
      id
    },
    data: {
      status: TicketStatus.PAID
    }
  });
}

async function getAllTicketsTypes(): Promise<TicketTypesType[]> {
  return prisma.ticketType.findMany();
}

const ticketsRepository = {
  findByEnrollmentId,
  create,
  getById,
  getAllTicketsTypes,
  update
};

export default ticketsRepository;
