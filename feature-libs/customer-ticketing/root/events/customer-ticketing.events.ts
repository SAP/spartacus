import { CxEvent } from '@spartacus/core';

export class GetTicketQueryResetEvent extends CxEvent {
  static readonly type = 'GetTicketQueryResetEvent';
}

export class GetTicketQueryReloadEvent extends CxEvent {
  static readonly type = 'GetTicketQueryReloadEvent';
}

export class GetTicketCatQueryResetEvent extends CxEvent {
  static readonly type = 'GetTicketCatQueryResetEvent';
}

export class GetTicketCatQueryReloadEvent extends CxEvent {
  static readonly type = 'GetTicketCatQueryReloadEvent';
}

export class GetTicketAssociatedObjectsQueryResetEvent extends CxEvent {
  static readonly type = 'GetTicketAssociatedObjectsQueryResetEvent';
}

export class GetTicketAssociatedObjectsQueryReloadEvent extends CxEvent {
  static readonly type = 'GetTicketAssociatedObjectsQueryReloadEvent';
}
