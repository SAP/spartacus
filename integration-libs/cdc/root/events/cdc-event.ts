import { CxEvent } from '@spartacus/core';

/**
 * Indicates the failure during toke retrieval
 */
export class CdcLoginFailEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'CdcLoginFailEvent';
}
