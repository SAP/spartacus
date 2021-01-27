import { PageEvent } from '../page/page.events';

/**
 * Indicates that a user visited a home page.
 */
export class HomePageEvent extends PageEvent {
  static type = 'HomePageEvent';
}
