import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';
import { BaseEvent } from '../../event/base-event.model';
import { EventService } from '../../event/event.service';
import { ActiveCartService } from '../facade/active-cart.service';
import { ActiveCartEventBuilder } from './active-cart-event.builder';
import { ActiveCartEvents } from './active-cart.events';
import { MultiCartEvents } from './multi-cart.events';

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

  function test<S extends BaseEvent<any>, T extends BaseEvent<any>>({
    sourceType,
    targetType,
    data,
  }: {
    sourceType: Type<S>;
    targetType: Type<T>;
    data: S;
  }) {
    it(`should register event '${targetType.name}' mapped from event '${sourceType.name}' that contains the active cart id`, () => {
      const eventService = TestBed.inject(EventService);
      const result = [];
      const sub: Subscription = eventService
        .get(targetType as Type<any>)
        .subscribe(e => result.push(e));

      eventService.dispatch(new sourceType(data));
      eventService.dispatch(
        new sourceType({ ...data, cartId: MOCK_NOT_ACTIVE_CART_ID })
      );
      expect(result).toEqual([new targetType(data)]);

      sub.unsubscribe();
    });
  }

  test({
    sourceType: MultiCartEvents.MultiCartAddEntry,
    targetType: ActiveCartEvents.ActiveCartAddEntry,
    data: {
      ...MOCK_ACTIVE_CART_EVENT,
      productCode: 'productCode',
      quantity: 123,
    },
  });
});
