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
import { ConfiguratorCommonsService } from './configurator-commons.service';
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';
import { ConfiguratorGroupsService } from './configurator-groups.service';
import { ConfiguratorPlaceOrderService } from './configurator-place-order.service';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';
let eventService: Partial<EventService>;
let eventServiceEvents: Map<
  AbstractType<CxEvent>,
  ReplaySubject<any>
> = new Map();

eventService = {
  get<T>(eventType: Type<T>) {
    return eventServiceEvents.get(eventType);
  },
};

describe('ConfiguratorPlaceOrderService', () => {
  let classUnderTest: ConfiguratorPlaceOrderService;
  let store: Store<StateWithConfigurator>;
  eventServiceEvents.set(
    OrderPlacedEvent,
    new ReplaySubject<OrderPlacedEvent>()
  );
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
          ConfiguratorGroupsService,
          ConfiguratorCommonsService,
          ConfiguratorGroupStatusService,
          ConfiguratorUtilsService,
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
  });

  describe('init', () => {
    const event = eventServiceEvents.get(OrderPlacedEvent);
    event?.next({ entry: { product: { categories: [{}] } } });

    it('should do something', () => {
      classUnderTest.init();

      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
