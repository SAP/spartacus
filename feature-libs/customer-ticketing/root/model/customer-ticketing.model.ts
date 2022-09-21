import { SortModel, PaginationModel } from '@spartacus/core';

export const enum CUSTOM_CLASS {
  CLOSE = 'cx-text-gray',
  OPEN = 'cx-text-green',
}

export const enum STATUS {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

export interface TicketDetails {
  availableStatusTransitions?: Array<Status>;
  id?: string;
  createdAt?: string;
  modifiedAt?: string;
  status?: Status;
  subject?: string;
  ticketCategory?: Category;
  ticketEvents?: Array<Event>;
}

export interface Status {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Event {
  author?: string;
  createdAt?: string;
  message?: string;
  toStatus?: Status;
}

export interface TicketList {
  pagination?: PaginationModel;
  sorts?: SortModel[];
  tickets?: Array<TicketDetails>;
}

export interface TicketSearchConfig {
  pageSize?: number;
  currentPage?: number;
  sort?: string;
}
