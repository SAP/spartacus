import { Params } from '@angular/router';
import { CxEvent, PageContext } from '@spartacus/core';

/**
 * Indicates that a user navigated to an arbitrary page.
 */
export class NavigationEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'NavigationEvent';
  /**
   * The page's context
   */
  context: PageContext;
  /**
   * The route's semantic name
   */
  semanticRoute?: string;
  /**
   * The current URL
   */
  url: string;
  /**
   * The current URL's params
   */
  params: Params;
}
