import { TestBed } from '@angular/core/testing';
import { CartPageEvent } from '@commerce-storefront-toolset/cart/base/root';
import { createFrom, EventService } from '@commerce-storefront-toolset/core';
import { NavigationEvent } from '@commerce-storefront-toolset/storefront';
import { take } from 'rxjs/operators';
import { CartPageEventBuilder } from './cart-page-event.builder';

describe('CartPageEventBuilder', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.inject(CartPageEventBuilder); // register events
    eventService = TestBed.inject(EventService);
  });

  it('CartPageEvent', () => {
    let result: CartPageEvent | undefined;
    eventService
      .get(CartPageEvent)
      .pipe(take(1))
      .subscribe((value) => (result = value));

    const navigationEvent = createFrom(NavigationEvent, {
      context: { id: 'xxx' },
      semanticRoute: 'cart',
      url: 'cart url',
      params: {},
    });
    eventService.dispatch(navigationEvent);

    expect(result).toBeTruthy();
    const expected = createFrom(CartPageEvent, {
      navigation: navigationEvent,
    });
    expect(result).toEqual(jasmine.objectContaining({ ...expected }));
  });
});
