import { CxEvent } from '@spartacus/core';

export class GetTicketQueryResetEvent extends CxEvent {
  static readonly type = 'GetTicketQueryResetEvent';
}

export class GetTicketQueryReloadEvent extends CxEvent {
  static readonly type = 'GetTicketQueryReloadEvent';
}

export class TicketEventCreatedEvent extends CxEvent {
  static readonly type = 'TicketEventCreatedEvent';
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
