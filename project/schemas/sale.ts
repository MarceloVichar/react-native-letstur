import { EventSchema } from '@schemas/event';
import { z } from 'zod';

export const CustomerSchema = z.object({
  name: z.string().min(1),
  document: z.string().min(1),
  phone: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
});

export type Customer = z.infer<typeof CustomerSchema>;

const PassengerSchema = z.object({
  name: z.string().optional().nullable(),
  document: z.string().optional().nullable(),
});

export const EventSaleSchema = z.object({
  quantity: z.number(),
  totalValueCents: z.number().nullable().optional(),
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
