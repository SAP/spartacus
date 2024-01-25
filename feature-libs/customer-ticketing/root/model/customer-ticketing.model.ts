/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaginationModel, SortModel } from '@spartacus/core';

export const enum TEXT_COLOR_CLASS {
  GREY = 'cx-text-grey',
  GREEN = 'cx-text-green',
}

export const enum STATUS {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  INPROCESS = 'INPROCESS',
}

export const enum STATUS_NAME {
  OPEN = 'Open',
  CLOSED = 'Closed',
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

export interface TicketEvent {
  author?: string;
  createdAt?: string;
  message?: string;
  toStatus?: Status;
  code?: string;
  addedByAgent?: boolean;
  ticketEventAttachments?: Array<Attachment>;
}

export interface Attachment {
  id?: string;
  filename?: string;
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

export interface TicketStarter {
  associatedTo?: AssociatedObject;
  message?: string;
  subject?: string;
  ticketCategory?: Category;
  attachments?: Array<Attachment>;
}
