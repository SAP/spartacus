import { Params } from '@angular/router';
import { CxEvent, PageContext } from '@spartacus/core';

/**
 * Indicates that a user visited an arbitrary page.
 */
export abstract class PageEvent extends CxEvent {
  context: PageContext;
  semanticRoute?: string;
  url: string;
  params: Params;
}

/**
 * Indicates that a user visited the home page.
 */
export class HomePageEvent extends PageEvent {
  static readonly type = 'HomePageEvent';
}
