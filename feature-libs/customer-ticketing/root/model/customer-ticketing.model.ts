import { SortModel, PaginationModel } from '@spartacus/core';

export const enum TEXT_COLOR_CLASS {
  GREY = 'cx-text-grey',
  GREEN = 'cx-text-green',
}

export const enum STATUS {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  INPROCESS = 'INPROCESS',
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

export interface CategoriesList {
  ticketCategories?: Category[];
}

export interface AssociatedObject {
  code: string;
  modifiedAt: string;
  type: string;
}

export interface AssociatedObjectsList {
  ticketAssociatedObjects: AssociatedObject[];
}

export interface Event {
  author?: string;
  createdAt?: string;
  message?: string;
  toStatus?: Status;
  addedByAgent?: boolean;
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
