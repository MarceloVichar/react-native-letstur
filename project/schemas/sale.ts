import { EventSchema } from '@schemas/event';
import { z } from 'zod';

const CustomerSchema = z.object({
  name: z.string(),
  document: z.string(),
  phone: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
});

type Customer = z.infer<typeof CustomerSchema>;

const PassengerSchema = z.object({
  name: z.string().optional().nullable(),
  document: z.string().optional().nullable(),
});

type Passenger = z.infer<typeof PassengerSchema>;

export const EventSaleSchema = z.object({
  quantity: z.number(),
  totalValueCents: z.number().nullable(),
  passengers: z.array(PassengerSchema),
  eventId: z.number().optional(),
  event: z.optional(EventSchema),
});

export type EventSale = z.infer<typeof EventSaleSchema>;

export const SaleSchema = z.object({
  id: z.number().optional(),
  customer: CustomerSchema,
  status: z.string(),
  voucher: z.string(),
  totalValueCents: z.number(),
  sellerId: z.number().optional(),
  events: z.optional(z.array(EventSaleSchema)),
  companyId: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Sale = z.infer<typeof SaleSchema>;
export const Sales = z.array(SaleSchema);

export const CreateSaleSchema = z.object({
  customer: CustomerSchema,
  eventSales: z.array(EventSaleSchema),
});

export type CreateSale = z.infer<typeof CreateSaleSchema>;
