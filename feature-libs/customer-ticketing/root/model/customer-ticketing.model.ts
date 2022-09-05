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
  pagination?: Pagination;
  sorts?: Array<Sort>;
  tickets?: Array<TicketDetails>;
}

export interface Sort {
  selected?: boolean;
  name?: string;
  code?: string;
}

export interface Pagination {
  currentPage?: number;
  pageSize?: number;
  sort?: string;
  totalPages?: number;
  totalResults?: number;
}

export interface TicketSearchConfig {
  pageSize?: number;
  currentPage?: number;
  sort?: string;
}
