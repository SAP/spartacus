import { Params } from '@angular/router';
import { CxEvent, PageContext } from '@spartacus/core';
import { NavigationEvent } from '../navigation/navigation.event';

/**
 * Indicates that a user visited an arbitrary page.
 */
export class PageEvent extends CxEvent {
  /**
   * @deprecated @since 3.1 - this will be remove in 4.0. Please use `NavigationEvent`
   */
  context: PageContext;
  /**
   * @deprecated @since 3.1 - this will be remove in 4.0. Please use `NavigationEvent`
   */
  semanticRoute?: string;
  /**
   * @deprecated @since 3.1 - this will be remove in 4.0. Please use `NavigationEvent`
   */
  url: string;
  /**
   * @deprecated @since 3.1 - this will be remove in 4.0. Please use `NavigationEvent`
   */
  params: Params;

  navigation?: NavigationEvent;
}

/**
 * Indicates that a user visited the home page.
 */
export class HomePageEvent extends PageEvent {
  static readonly type = 'HomePageEvent';
}
