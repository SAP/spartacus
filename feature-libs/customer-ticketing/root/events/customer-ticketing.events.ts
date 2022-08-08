import { CxEvent } from '@spartacus/core';

export class GetTicketQueryResetEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'GetTicketQueryResetEvent';
}

export class GetTicketQueryReloadEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'GetTicketQueryReloadEvent';
}
