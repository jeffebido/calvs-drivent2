import { Ticket, TicketType, Payment } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string

}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type PaymentInfo = {
  ticketId: number,
  cardData: {
    issuer: string,
    number: string,
    name: string,
    expirationDate: Date,
    cvv: number
  }
}

export type TicketParamsType = Omit<Ticket, "id" | "createdAt" | "updatedAt">
export type TicketTypesType = Omit<TicketType, "createdAt" | "updatedAt">;
export type CreatePaymentType = Omit<Payment, "id" | "createdAt" | "updatedAt">;