import { CxEvent } from '@spartacus/core';
import { NavigationEvent } from '../navigation/navigation.event';

/**
 * Indicates that a user visited an arbitrary page.
 */
export abstract class PageEvent extends CxEvent {
  /**
   * `NavigationEvent`'s payload
   */
  navigation: NavigationEvent;
}
