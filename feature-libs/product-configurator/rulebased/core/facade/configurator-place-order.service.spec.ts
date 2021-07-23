import { AbstractType, Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OrderPlacedEvent } from '@spartacus/checkout/root';
import { CxEvent, EventService } from '@spartacus/core';
import { ReplaySubject } from 'rxjs';
import {
  CONFIGURATOR_FEATURE,
  StateWithConfigurator,
} from '../state/configurator-state';
import { getConfiguratorReducers } from '../state/reducers';
import { ConfiguratorPlaceOrderService } from './configurator-place-order.service';
let eventService: Partial<EventService>;
let eventServiceEvents: Map<
  AbstractType<CxEvent>,
  ReplaySubject<any>
> = new Map();

eventService = {
  get<T>(eventType: Type<T>) {
    const event = eventServiceEvents.get(eventType);
    if (event) {
      return event;
    } else {
      throw new Error('Event not available');
    }
  },
};

describe('ConfiguratorPlaceOrderService', () => {
  let classUnderTest: ConfiguratorPlaceOrderService;
  let store: Store<StateWithConfigurator>;
  let orderPlacedEvent: ReplaySubject<any> | undefined;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({}),
          StoreModule.forFeature(CONFIGURATOR_FEATURE, getConfiguratorReducers),
        ],
        providers: [
          {
            provide: EventService,
            useValue: eventService,
          },
        ],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    classUnderTest = TestBed.inject(
      ConfiguratorPlaceOrderService as Type<ConfiguratorPlaceOrderService>
    );
    store = TestBed.inject(Store as Type<Store<StateWithConfigurator>>);
    spyOn(store, 'dispatch').and.callThrough();
    eventServiceEvents.set(
      OrderPlacedEvent,
      new ReplaySubject<OrderPlacedEvent>()
    );
    orderPlacedEvent = eventServiceEvents.get(OrderPlacedEvent);
  });

  describe('init', () => {
    it('should subscribe to orderPlacedEvent and trigger action if order has been placed', () => {
      orderPlacedEvent?.next({ entry: { product: { categories: [{}] } } });
      classUnderTest.init();
      expect(store.dispatch).toHaveBeenCalled();
    });

    it('should trigger no action in case orderPlacedEvent did not happen', () => {
      classUnderTest.init();
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });
  });
});
