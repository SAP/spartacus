/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent } from '@spartacus/core';

export class GetTicketQueryResetEvent extends CxEvent {
  static readonly type = 'GetTicketQueryResetEvent';
}

export class GetTicketQueryReloadEvent extends CxEvent {
  static readonly type = 'GetTicketQueryReloadEvent';
}

export class GetTicketsQueryResetEvents extends CxEvent {
  static readonly type = 'GetTicketsQueryResetEvents';
}

export class GetTicketsQueryReloadEvents extends CxEvent {
  static readonly type = 'GetTicketsQueryReloadEvents';
}

export class NewMessageEvent extends CxEvent {
  static readonly type = 'NewMessageEvent';
  status: string;
}

export class TicketReopenedEvent extends CxEvent {
  static readonly type = 'TicketReopenedEvent';
  status: string;
}

export class TicketClosedEvent extends CxEvent {
  static readonly type = 'TicketClosedEvent';
  status: string;
}

export class GetTicketCategoryQueryResetEvent extends CxEvent {
  static readonly type = 'GetTicketCategoryQueryResetEvent';
}

export class GetTicketCategoryQueryReloadEvent extends CxEvent {
  static readonly type = 'GetTicketCategoryQueryReloadEvent';
}

export class GetTicketAssociatedObjectsQueryResetEvent extends CxEvent {
  static readonly type = 'GetTicketAssociatedObjectsQueryResetEvent';
}

export class GetTicketAssociatedObjectsQueryReloadEvent extends CxEvent {
  static readonly type = 'GetTicketAssociatedObjectsQueryReloadEvent';
}
export class TicketCreatedEvent extends CxEvent {
  static readonly type = 'TicketCreatedEvent';
}
export class CreateEvent extends CxEvent {
  static readonly type = 'CreateEvent';
}
