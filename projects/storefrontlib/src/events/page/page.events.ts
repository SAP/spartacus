import { Params } from '@angular/router';
import { PageContext } from '@spartacus/core';

/**
 * Indicates that a user visited the home page of a web presence.
 */
export class HomePageEvent {}

/**
 * Indicates either that a user visited an arbitrary page of a web presence or that the page type was unknown.
 */
export class PageVisitedEvent {
  context: PageContext;
  semanticRoute?: string;
  url: string;
  params: Params;
}
