import { Params } from '@angular/router';
import { CxEvent, PageContext } from '@spartacus/core';
import { NavigationEvent } from '../navigation/navigation.event';

/**
 * Indicates that a user visited an arbitrary page.
 */
export abstract class PageEvent extends CxEvent {
  /**
   * @deprecated @since 3.1 - this will be removed in 4.0. Please use `navigation` property instead, or subscribe to NavigationEvent
   */
  context: PageContext;
  /**
   * @deprecated @since 3.1 - this will be removed in 4.0. Please use `navigation` property instead, or subscribe to NavigationEvent
   */
  semanticRoute?: string;
  /**
   * @deprecated @since 3.1 - this will be removed in 4.0. Please use `navigation` property instead, or subscribe to NavigationEvent
   */
  url: string;
  /**
   * @deprecated @since 3.1 - this will be removed in 4.0. Please use `navigation` property instead, or subscribe to NavigationEvent
   */
  params: Params;

  /**
   * `NavigationEvent`'s payload
   */
  navigation: NavigationEvent;
}
