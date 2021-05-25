import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import {
  ActiveCartService,
  Cart,
  CheckoutService,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  StateUtils,
  UserIdService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorModelUtils,
  ConfiguratorType,
  OrderEntryStatus,
} from '@spartacus/product-configurator/common';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions/index';
import {
  CONFIGURATOR_FEATURE,
  StateWithConfigurator,
} from '../state/configurator-state';
import { getConfiguratorReducers } from '../state/reducers/index';
import { ConfiguratorCartService } from './configurator-cart.service';

let OWNER_CART_ENTRY = ConfiguratorModelUtils.createInitialOwner();
let OWNER_ORDER_ENTRY = ConfiguratorModelUtils.createInitialOwner();
let OWNER_PRODUCT = ConfiguratorModelUtils.createInitialOwner();
const CART_CODE = '0000009336';
const CART_ENTRY_ID = '3';
const CART_GUID = 'e767605d-7336-48fd-b156-ad50d004ca10';
const ORDER_ID = '0000011';
const ORDER_ENTRY_NUMBER = 2;
const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '1234-56-7890';

const cart: Cart = {
  code: CART_CODE,
  guid: CART_GUID,
  user: { uid: OCC_USER_ID_ANONYMOUS },
  entries: [
    {
      statusSummaryList: [
        { status: OrderEntryStatus.Success, numberOfIssues: 1 },
      ],
    },
    {
      statusSummaryList: [
        { status: OrderEntryStatus.Error, numberOfIssues: 0 },
      ],
    },
    {
      statusSummaryList: [{ status: OrderEntryStatus.Info, numberOfIssues: 3 }],
    },
  ],
};

const productConfiguration: Configurator.Configuration = {
  configId: CONFIG_ID,
  owner: OWNER_CART_ENTRY,
};

const cartState: StateUtils.ProcessesLoaderState<Cart> = {
  value: cart,
};
let cartStateObs = null;
let isStableObs = null;
let checkoutLoadingObs = null;
class MockActiveCartService {
  requireLoadedCart(): Observable<StateUtils.ProcessesLoaderState<Cart>> {
    return cartStateObs;
  }
  isStable(): Observable<boolean> {
    return isStableObs;
  }
}

class MockCheckoutService {
  isLoading(): Observable<boolean> {
    return checkoutLoadingObs;
  }
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_ANONYMOUS);
  }
}

describe('ConfiguratorCartService', () => {
  let serviceUnderTest: ConfiguratorCartService;
  let store: Store<StateWithConfigurator>;
  let configuratorUtils: CommonConfiguratorUtilsService;

  beforeEach(
    waitForAsync(() => {
      cartStateObs = of(cartState);
      isStableObs = of(true);
      checkoutLoadingObs = of(true);
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({}),
          StoreModule.forFeature(CONFIGURATOR_FEATURE, getConfiguratorReducers),
        ],
        providers: [
          ConfiguratorCartService,

          {
            provide: ActiveCartService,
            useClass: MockActiveCartService,
          },
          {
            provide: CheckoutService,
            useClass: MockCheckoutService,
          },
          {
            provide: UserIdService,
            useClass: MockUserIdService,
          },
        ],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    serviceUnderTest = TestBed.inject(
      ConfiguratorCartService as Type<ConfiguratorCartService>
    );
    store = TestBed.inject(Store as Type<Store<StateWithConfigurator>>);
    configuratorUtils = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    OWNER_CART_ENTRY = {
      id: CART_ENTRY_ID,
      type: CommonConfigurator.OwnerType.CART_ENTRY,
      key: CommonConfigurator.OwnerType.CART_ENTRY + '/' + CART_ENTRY_ID,
      configuratorType: ConfiguratorType.VARIANT,
    };
    OWNER_ORDER_ENTRY = {
      id: configuratorUtils.getComposedOwnerId(ORDER_ID, ORDER_ENTRY_NUMBER),
      type: CommonConfigurator.OwnerType.ORDER_ENTRY,
      key: CommonConfigurator.OwnerType.ORDER_ENTRY + '/1000+' + CART_ENTRY_ID,
      configuratorType: ConfiguratorType.VARIANT,
    };
    OWNER_PRODUCT = {
      id: PRODUCT_CODE,
      type: CommonConfigurator.OwnerType.PRODUCT,
      key: CommonConfigurator.OwnerType.PRODUCT + '/' + PRODUCT_CODE,
      configuratorType: ConfiguratorType.VARIANT,
    };
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  describe('readConfigurationForCartEntry', () => {
    it('should not dispatch ReadCartEntryConfiguration action in case configuration is present', () => {
      const productConfigurationLoaderState: StateUtils.LoaderState<Configurator.Configuration> = {
        value: productConfiguration,
      };

      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(productConfigurationLoaderState)
      );
      spyOn(store, 'dispatch').and.callThrough();

      serviceUnderTest
        .readConfigurationForCartEntry(OWNER_CART_ENTRY)
        .subscribe()
        .unsubscribe();

      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should dispatch ReadCartEntryConfiguration action in case configuration is not present so far', () => {
      const params: CommonConfigurator.ReadConfigurationFromCartEntryParameters = {
        owner: OWNER_CART_ENTRY,
        cartEntryNumber: OWNER_CART_ENTRY.id,
        cartId: CART_GUID,
        userId: OCC_USER_ID_ANONYMOUS,
      };
      const productConfigurationLoaderState: StateUtils.LoaderState<Configurator.Configuration> = {
        value: {
          configId: '',
          owner: ConfiguratorModelUtils.createInitialOwner(),
        },
      };

      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(productConfigurationLoaderState)
      );
      spyOn(store, 'dispatch').and.callThrough();

      serviceUnderTest
        .readConfigurationForCartEntry(OWNER_CART_ENTRY)
        .subscribe()
        .unsubscribe();

      expect(store.dispatch).toHaveBeenCalledWith(
        new ConfiguratorActions.ReadCartEntryConfiguration(params)
      );
    });

    it('should only proceed when cart is ready', () => {
      isStableObs = cold('x-xx-y', {
        x: false,
        y: true,
      });
      checkoutLoadingObs = cold('a', {
        a: false,
      });

      const productConfigurationLoaderState: StateUtils.LoaderState<Configurator.Configuration> = {
        value: {
          configId: '',
          owner: ConfiguratorModelUtils.createInitialOwner(),
        },
      };

      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(productConfigurationLoaderState)
      );

      expect(
        serviceUnderTest.readConfigurationForCartEntry(OWNER_CART_ENTRY)
      ).toBeObservable(cold('-----|', {}));
    });

    it('should only proceed when checkout data has been loaded', () => {
      isStableObs = cold('a', {
        a: true,
      });
      checkoutLoadingObs = cold('xxy', {
        x: true,
        y: false,
      });

      const productConfigurationLoaderState: StateUtils.LoaderState<Configurator.Configuration> = {
        value: {
          configId: '',
          owner: ConfiguratorModelUtils.createInitialOwner(),
        },
      };

      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(productConfigurationLoaderState)
      );

      expect(
        serviceUnderTest.readConfigurationForCartEntry(OWNER_CART_ENTRY)
      ).toBeObservable(cold('--|'));
    });
  });

  describe('readConfigurationForOrderEntry', () => {
    it('should not dispatch ReadOrderEntryConfiguration action in case configuration is present', () => {
      const productConfigurationLoaderState: StateUtils.LoaderState<Configurator.Configuration> = {
        value: productConfiguration,
      };

      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(productConfigurationLoaderState)
      );
      spyOn(store, 'dispatch').and.callThrough();

      serviceUnderTest
        .readConfigurationForOrderEntry(OWNER_ORDER_ENTRY)
        .subscribe()
        .unsubscribe();

      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should dispatch ReadOrderEntryConfiguration action in case configuration is not present so far', () => {
      const params: CommonConfigurator.ReadConfigurationFromOrderEntryParameters = {
        owner: OWNER_ORDER_ENTRY,
        orderEntryNumber: '' + ORDER_ENTRY_NUMBER,
        orderId: ORDER_ID,
        userId: OCC_USER_ID_CURRENT,
      };
      const productConfigurationLoaderState: StateUtils.LoaderState<Configurator.Configuration> = {
        value: {
          configId: '',
          owner: ConfiguratorModelUtils.createInitialOwner(),
        },
      };

      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(productConfigurationLoaderState)
      );
      spyOn(store, 'dispatch').and.callThrough();
      serviceUnderTest
        .readConfigurationForOrderEntry(OWNER_ORDER_ENTRY)
        .subscribe()
        .unsubscribe();

      expect(store.dispatch).toHaveBeenCalledWith(
        new ConfiguratorActions.ReadOrderEntryConfiguration(params)
      );
    });
  });
  describe('addToCart', () => {
    it('should get cart, create addToCartParameters and call addToCart action', () => {
      const addToCartParams: Configurator.AddToCartParameters = {
        cartId: CART_GUID,
        userId: OCC_USER_ID_ANONYMOUS,
        productCode: PRODUCT_CODE,
        quantity: 1,
        configId: CONFIG_ID,
        owner: OWNER_PRODUCT,
      };

      spyOn(store, 'dispatch').and.callThrough();

      serviceUnderTest.addToCart(PRODUCT_CODE, CONFIG_ID, OWNER_PRODUCT);

      expect(store.dispatch).toHaveBeenCalledWith(
        new ConfiguratorActions.AddToCart(addToCartParams)
      );
    });
  });
  describe('updateCartEntry', () => {
    it('should create updateParameters and call updateCartEntry action', () => {
      const params: Configurator.UpdateConfigurationForCartEntryParameters = {
        cartId: CART_GUID,
        userId: OCC_USER_ID_ANONYMOUS,
        cartEntryNumber: productConfiguration.owner.id,
        configuration: productConfiguration,
      };

      spyOn(store, 'dispatch').and.callThrough();
      const obs = cold('|');
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () => obs);
      serviceUnderTest.updateCartEntry(productConfiguration);

      expect(store.dispatch).toHaveBeenCalledWith(
        new ConfiguratorActions.UpdateCartEntry(params)
      );
    });
  });

  describe('activeCartHasIssues', () => {
    it('should tell that cart has no issues in case status summary contain no errors for all cart entries', () => {
      cartStateObs = cold('xx', {
        x: cartState,
      });
      expect(serviceUnderTest.activeCartHasIssues()).toBeObservable(
        cold('aa', { a: false })
      );
    });

    it('should tell that cart has issues in case status summary contain at least one entry with an error', () => {
      const cartIssues: Cart = {
        ...cart,
        entries: [
          {
            statusSummaryList: [
              { status: OrderEntryStatus.Error, numberOfIssues: 1 },
            ],
          },
        ],
      };
      const cartStateIssues: StateUtils.ProcessesLoaderState<Cart> = {
        value: cartIssues,
      };
      cartStateObs = cold('xy', {
        x: cartState,
        y: cartStateIssues,
      });
      expect(serviceUnderTest.activeCartHasIssues()).toBeObservable(
        cold('ab', { a: false, b: true })
      );
    });
    it('should handle cart with no entries', () => {
      const cartEmpty: Cart = {
        ...cart,
        entries: undefined,
      };
      const cartStateEmpty: StateUtils.ProcessesLoaderState<Cart> = {
        value: cartEmpty,
      };
      cartStateObs = cold('xy', {
        x: cartState,
        y: cartStateEmpty,
      });
      expect(serviceUnderTest.activeCartHasIssues()).toBeObservable(
        cold('aa', { a: false })
      );
    });
  });
});
