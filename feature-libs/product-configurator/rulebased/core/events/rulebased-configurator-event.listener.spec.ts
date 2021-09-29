import { AbstractType, Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { OrderPlacedEvent } from '@spartacus/checkout/root';
import { CxEvent, EventService } from '@spartacus/core';
import { ReplaySubject } from 'rxjs';
import { ConfiguratorCartService } from '../facade/configurator-cart.service';
import { RulebasedConfiguratorEventListener } from './rulebased-configurator-event.listener';
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

class MockConfiguratorCartService {
  removeCartBoundConfigurations() {}
}

let mockConfiguratorCartService: MockConfiguratorCartService =
  new MockConfiguratorCartService();

describe('RulebasedConfiguratorEventListener', () => {
  let orderPlacedEvent: ReplaySubject<any> | undefined;
  let configuratorCartService: ConfiguratorCartService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: EventService,
            useValue: eventService,
          },
          {
            provide: ConfiguratorCartService,
            useValue: mockConfiguratorCartService,
          },
        ],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    configuratorCartService = TestBed.inject(
      ConfiguratorCartService as Type<ConfiguratorCartService>
    );
    spyOn(
      configuratorCartService,
      'removeCartBoundConfigurations'
    ).and.callThrough();

    eventServiceEvents.set(
      OrderPlacedEvent,
      new ReplaySubject<OrderPlacedEvent>()
    );
    orderPlacedEvent = eventServiceEvents.get(OrderPlacedEvent);
  });

  describe('onPlaceOrder', () => {
    it('should subscribe to orderPlacedEvent and call facade service', () => {
      orderPlacedEvent?.next({ entry: { product: { categories: [{}] } } });
      TestBed.inject(
        RulebasedConfiguratorEventListener as Type<RulebasedConfiguratorEventListener>
      );

      expect(
        configuratorCartService.removeCartBoundConfigurations
      ).toHaveBeenCalled();
    });

    it('should not call facade service in case orderPlacedEvent did not happen', () => {
      TestBed.inject(
        RulebasedConfiguratorEventListener as Type<RulebasedConfiguratorEventListener>
      );
      expect(
        configuratorCartService.removeCartBoundConfigurations
      ).toHaveBeenCalledTimes(0);
    });
  });
});
