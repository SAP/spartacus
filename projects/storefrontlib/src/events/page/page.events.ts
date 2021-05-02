import { CxEvent } from '@spartacus/core';
import { NavigationEvent } from '../navigation/navigation.event';

/**
 * Indicates that a user visited an arbitrary page.
 */
// TODO: #10896 - make abstract
export class PageEvent extends CxEvent {
  /**
   * `NavigationEvent`'s payload
   */
  navigation: NavigationEvent;
}
