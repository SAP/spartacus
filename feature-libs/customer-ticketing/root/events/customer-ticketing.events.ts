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
