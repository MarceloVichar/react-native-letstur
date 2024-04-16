import { EventData } from './EventData';

type Customer = {
  name: string;
  document: string;
  phone?: string | null;
  email?: string;
};

type Passenger = {
  name: string;
  document: string;
};

export interface EventSale {
  quantity: number;
  totalValueCents: number;
  passengers: Passenger[];
  event: EventData;
}

export interface SaleData {
  id?: number;
  customer: Customer;
  status: string;
  voucher: string;
  totalValueCents: number;
  sellerId?: number;
  events?: EventSale[];
  companyId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSaleData {
  customer: Customer;
  eventSales: EventSale[];
}
