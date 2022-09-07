export const enum CUSTOM_CLASS {
  CLOSE = 'cx-text-gray',
  OPEN = 'cx-text-green',
}

export const enum STATUS {
  OPEN = 'OPEN',
  CLOSE = 'CLOSED',
  INPROCESS = 'INPROCESS',
}

export const enum STATUS_NAME {
  CLOSE = 'Closed',
  INPROCESS = 'In Process',
}

export interface TicketDetails {
  availableStatusTransitions?: Array<Status>;
  id?: string;
  createdAt?: string;
  modifiedAt?: string;
  status?: Status;
  subject?: string;
  ticketCategory?: Category;
  ticketEvents?: Array<TicketEvent>;
}

export interface Status {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface TicketEvent {
  author?: string;
  createdAt?: string;
  message?: string;
  toStatus?: Status;
  code?: string;
  addedByAgent?: boolean;
  attachments?: Array<Attachment>;
}

export interface Attachment {
  id?: string;
  filename?: string;
}
