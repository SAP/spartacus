import { TestBed } from '@angular/core/testing';
import { CartPageEvent } from '@spartacus/cart/base/root';
import { createFrom, EventService } from '@spartacus/core';
import { NavigationEvent } from '@spartacus/storefront';
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
