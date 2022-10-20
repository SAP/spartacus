import { CxEvent } from '@spartacus/core';

/**
 * Indicates the failure during the loading of the user token.
 */
export class CdcLoadUserTokenFailEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'CdcLoadUserTokenFailEvent';
}
