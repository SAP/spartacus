import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import {
  ActiveCartService,
  CheckoutActions,
  OrderEntry,
} from '@spartacus/core';
import {
  CommonConfiguratorUtilsService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ConfiguratorActions } from '../actions/index';
import { CONFIGURATOR_FEATURE } from '../configurator-state';
import * as fromConfigurationReducers from '../reducers/index';
import * as fromEffects from './configurator-place-order-hook.effect';

const cartEntriesWOconfiguration: OrderEntry[] = [
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

const cartEntries: OrderEntry[] = [
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
      configuratorType: ConfiguratorType.TEXTFIELD,
    },
  },
  {
    entryNumber: 5,
    product: {
      configurable: true,
      configuratorType: ConfiguratorType.CPQ,
    },
  },
];
class MockActiveCartService {
  getEntries(): void {}
}

describe('ConfiguratorPlaceOrderHookEffects', () => {
  let actions$: Observable<any>;
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
        provideMockActions(() => actions$),
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
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

  it('should emit remove configuration for configurable entries when order is placed', () => {
    spyOn(activeCartService, 'getEntries').and.returnValue(of(cartEntries));

    const action = new CheckoutActions.PlaceOrder({
      cartId: '',
      userId: '',
      termsChecked: true,
    });
    const completion = new ConfiguratorActions.RemoveConfiguration({
      ownerKey: ['cartEntry/1', 'cartEntry/3', 'cartEntry/4', 'cartEntry/5'],
    });

    actions$ = cold('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(configPlaceOrderHookEffects.placeOrder$).toBeObservable(expected);
  });

  it('should not emit remove configuration when order is placed if cart contains no configured products', () => {
    spyOn(activeCartService, 'getEntries').and.returnValue(
      of(cartEntriesWOconfiguration)
    );

    const action = new CheckoutActions.PlaceOrder({
      cartId: '',
      userId: '',
      termsChecked: true,
    });
    const completion = new ConfiguratorActions.RemoveConfiguration({
      ownerKey: [],
    });

    actions$ = cold('-a', { a: action });
    const expected = cold('-b', { b: completion });

    expect(configPlaceOrderHookEffects.placeOrder$).toBeObservable(expected);
  });
});
