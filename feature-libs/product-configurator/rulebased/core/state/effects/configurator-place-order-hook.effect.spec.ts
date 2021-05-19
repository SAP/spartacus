import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { OrderPlacedEvent } from '@spartacus/checkout/root';
import { ActiveCartService, EventService, OrderEntry } from '@spartacus/core';
import {
  CommonConfiguratorUtilsService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ConfiguratorActions } from '../actions/index';
import { CONFIGURATOR_FEATURE } from '../configurator-state';
import * as fromConfigurationReducers from '../reducers/index';
import * as fromEffects from './configurator-place-order-hook.effect';

const cartEntryWOconfiguration: OrderEntry[] = [
  {
    entryNumber: 1,
    product: {
      configurable: false,
    },
  },
  {
    entryNumber: 2,
    product: {
      configurable: false,
    },
  },
];

const cartEntryWithconfiguration: OrderEntry[] = [
  {
    entryNumber: 1,
    product: {
      configurable: true,
      configuratorType: ConfiguratorType.VARIANT,
    },
  },
  {
    entryNumber: 2,
    product: {
      configurable: false,
    },
  },
  {
    entryNumber: 3,
    product: {
      configurable: true,
      configuratorType: ConfiguratorType.VARIANT,
    },
  },
  {
    entryNumber: 4,
    product: {
      configurable: true,
      configuratorType: 'some other configurator',
    },
  },
];
class MockActiveCartService {
  getEntries(): void {}
}

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return hot('-a', { a: <OrderPlacedEvent>{} });
  }
}

describe('ConfiguratorPlaceOrderHookEffects', () => {
  let configPlaceOrderHookEffects: fromEffects.ConfiguratorPlaceOrderHookEffects;
  let configuratorUtils: CommonConfiguratorUtilsService;
  let activeCartService: ActiveCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CONFIGURATOR_FEATURE,
          fromConfigurationReducers.getConfiguratorReducers()
        ),
      ],

      providers: [
        fromEffects.ConfiguratorPlaceOrderHookEffects,
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    configPlaceOrderHookEffects = TestBed.inject(
      fromEffects.ConfiguratorPlaceOrderHookEffects as Type<fromEffects.ConfiguratorPlaceOrderHookEffects>
    );
    configuratorUtils = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    activeCartService = TestBed.inject(
      ActiveCartService as Type<ActiveCartService>
    );
    spyOn(configuratorUtils, 'setOwnerKey').and.callThrough();
  });

  it('should provide configuration place order hook effects', () => {
    expect(configPlaceOrderHookEffects).toBeTruthy();
  });

  it('should emit remove configuration when order is placed - cart contains configured products', () => {
    spyOn(activeCartService, 'getEntries').and.returnValue(
      of(cartEntryWithconfiguration)
    );
    const completion = new ConfiguratorActions.RemoveConfiguration({
      ownerKey: ['cartEntry/1', 'cartEntry/3'],
    });
    const expected = cold('-b', { b: completion });

    expect(configPlaceOrderHookEffects.placeOrder$).toBeObservable(expected);
  });

  it('should emit remove configuration when order is placed - cart contains no configured products', () => {
    spyOn(activeCartService, 'getEntries').and.returnValue(
      of(cartEntryWOconfiguration)
    );

    const completion = new ConfiguratorActions.RemoveConfiguration({
      ownerKey: [],
    });

    const expected = cold('-b', { b: completion });

    expect(configPlaceOrderHookEffects.placeOrder$).toBeObservable(expected);
  });
});
