import { CxEvent } from '@spartacus/core';

export class CommerceQuotesListReloadQueryEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'CommerceQuotesListReloadQueryEvent';
}

export class QuoteDetailsReloadQueryEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'QuoteDetailsReloadQueryEvent';
}
