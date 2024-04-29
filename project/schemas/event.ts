import { z } from 'zod';

const DriverSchema = z.object({
  id: z.number(),
  name: z.string(),
  cnh: z.string(),
  cnhType: z.string(),
  document: z.string(),
  phone: z.string().optional(),
  dateOfBirth: z.string(),
  email: z.string().optional(),
  companyId: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Driver = z.infer<typeof DriverSchema>;

const TourGuideSchema = z.object({
  id: z.number(),
  name: z.string(),
  document: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  companyId: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TourGuide = z.infer<typeof TourGuideSchema>;

const VehicleSchema = z.object({
  id: z.number(),
  licensePlate: z.string(),
  type: z.string().optional(),
  model: z.string().optional(),
  numberOfSeats: z.number(),
  cnhTypeRequired: z.string(),
  ownerName: z.string(),
  ownerDocument: z.string(),
  ownerPhone: z.string().optional(),
  ownerEmail: z.string().optional(),
  companyId: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;

const TourTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  isExclusive: z.boolean(),
  isTransfer: z.boolean(),
  companyId: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TourType = z.infer<typeof TourTypeSchema>;

const TourSchema = z.object({
  id: z.number(),
  name: z.string(),
  roundTrip: z.union([z.string(), z.number()]).optional(),
  priceCents: z.number(),
  note: z.string().nullable().optional(),
  color: z.string(),
  localeId: z.number().optional(),
  tourTypeId: z.number().optional(),
  tourType: TourTypeSchema.optional(),
  companyId: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Tour = z.infer<typeof TourSchema>;

export const EventSchema = z.object({
  id: z.number(),
  departureDateTime: z.string(),
  arrivalDateTime: z.string(),
  totalSeats: z.number(),
  availableSeats: z.number(),
  tourId: z.number(),
  tour: TourSchema.optional(),
  tourGuideId: z.number(),
  tourGuide: TourGuideSchema.optional(),
  vehicleId: z.number(),
  vehicle: VehicleSchema.optional(),
  driverId: z.number(),
  driver: DriverSchema.optional(),
  companyId: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type EventType = z.infer<typeof EventSchema>;
export const EventsType = z.array(EventSchema);
