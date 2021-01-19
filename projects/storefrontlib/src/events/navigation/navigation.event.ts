import { Params } from '@angular/router';
import { CxEvent, PageContext } from '@spartacus/core';

/**
 * Indicates that a user navigated to an arbitrary page.
 */
export class NavigationEvent extends CxEvent {
  static readonly type = 'NavigationEvent';
  context: PageContext;
  semanticRoute?: string;
  url: string;
  params: Params;
}
