import { CxEvent } from '@spartacus/core';

export class GetTicketQueryResetEvent extends CxEvent {
  static readonly type = 'GetTicketQueryResetEvent';
}

export class GetTicketQueryReloadEvent extends CxEvent {
  static readonly type = 'GetTicketQueryReloadEvent';
}
