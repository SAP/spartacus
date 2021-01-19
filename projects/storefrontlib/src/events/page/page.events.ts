import { CxEvent } from '@spartacus/core';
import { NavigationEvent } from '../navigation/navigation.event';

/**
 * Indicates that a user visited an arbitrary page.
 */
export abstract class PageEvent extends CxEvent {
  navigation: NavigationEvent;
}

/**
 * Indicates that a user visited the home page.
 */
export class HomePageEvent extends PageEvent {
  static readonly type = 'HomePageEvent';
}
