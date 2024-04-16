type Driver = {
  id: number;
  name: string;
  cnh: string;
  cnhType: string;
  document: string;
  phone?: string;
  dateOfBirth: string;
  email?: string;
  companyId?: number;
  createdAt: string;
  updatedAt: string;
};

type TourGuide = {
  id: number;
  name: string;
  document: string;
  phone?: string;
  email?: string;
  companyId?: number;
  createdAt: string;
  updatedAt: string;
};

type Vehicle = {
  id: number;
  licensePlate: string;
  type?: string;
  model?: string;
  numberOfSeats: number;
  cnhTypeRequired: string;
  ownerName: string;
  ownerDocument: string;
  ownerPhone?: string;
  ownerEmail?: string;
  companyId?: number;
  createdAt: string;
  updatedAt: string;
};

type TourType = {
  id: number;
  name: string;
  color: string;
  isExclusive: boolean;
  isTransfer: boolean;
  companyId?: number;
  createdAt: string;
  updatedAt: string;
};

type Tour = {
  id: number;
  name: string;
  roundTrip?: string | number;
  priceCents: number;
  note?: string | null;
  color: string;
  localeId?: number;
  tourTypeId?: number;
  tourType: TourType;
  companyId?: number;
  createdAt: string;
  updatedAt: string;
};

export interface EventData {
  id: number;
  departureDateTime: string;
  arrivalDateTime: string;
  totalSeats: number;
  availableSeats: number;
  tourId: number;
  tour?: Tour;
  tourGuideId: number;
  tourGuide?: TourGuide;
  vehicleId: number;
  vehicle?: Vehicle;
  driverId: number;
  driver?: Driver;
  companyId?: number;
  createdAt: string;
  updatedAt: string;
}
