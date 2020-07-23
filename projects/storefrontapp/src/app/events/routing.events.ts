import { Params } from '@angular/router';
import { PageContext } from '@spartacus/core';

/**
 * Indicates that a user visited the home page of a web presence.
 */
export class HomePageVisited {}

/**
 * Indicates that a user visited a cart page.
 */
export class CartPageVisited {}

/**
 * Indicates that a user visited an order confirmation page.
 */
export class OrderConfirmationPageVisited {}

/**
 * Indicates either that a user visited an arbitrary page of a web presence or that the page type was unknown.
 */
export class PageVisited {
  context: PageContext;
  semanticRoute?: string;
  url: string;
  params: Params;
}
