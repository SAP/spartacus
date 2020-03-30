import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';
import { EventService } from '../../../event/event.service';
import { createFrom } from '../../../util/create-from';
import { ActiveCartService } from '../../facade/active-cart.service';
import { MultiCartAddEntryEvent } from '../multi-cart/multi-cart.events';
import { ActiveCartEventBuilder } from './active-cart-event.builder';
import { ActiveCartAddEntryEvent } from './active-cart.events';

const MOCK_ACTIVE_CART_ID = 'activeCartId';
const MOCK_NOT_ACTIVE_CART_ID = 'notActiveCartId';

const MOCK_ACTIVE_CART_EVENT = {
  cartId: MOCK_ACTIVE_CART_ID,
  userId: 'userId',
};

class MockActiveCartService implements Partial<ActiveCartService> {
  getActiveCartId = () => of(MOCK_ACTIVE_CART_ID);
}

describe('ActiveCartEventBuilder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
      ],
    });

    TestBed.inject(ActiveCartEventBuilder); // register events
  });

  function testEventMapping<S, T extends S>({
    sourceType,
    targetType,
    data,
  }: {
    sourceType: Type<S>;
    targetType: Type<T>;
    data: S;
  }) {
    const eventService = TestBed.inject(EventService);
    const result = [];
    const sub: Subscription = eventService
      .get(targetType as Type<any>)
      .subscribe(e => result.push(e));

    eventService.dispatch(createFrom(sourceType, data));
    eventService.dispatch(
      createFrom(sourceType, { ...data, cartId: MOCK_NOT_ACTIVE_CART_ID })
    );
    expect(result).toEqual([createFrom(targetType, data)]);

    sub.unsubscribe();
  }
  describe('should register event', () => {
    it('ActiveCartAddEntryEvent', () => {
      testEventMapping({
        sourceType: MultiCartAddEntryEvent,
        targetType: ActiveCartAddEntryEvent,
        data: {
          ...MOCK_ACTIVE_CART_EVENT,
          productCode: 'productCode',
          quantity: 123,
        },
      });
    });
  });
});
