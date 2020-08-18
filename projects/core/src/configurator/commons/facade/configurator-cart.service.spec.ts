import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ActiveCartService } from '../../../cart/facade/active-cart.service';
import { Cart } from '../../../model/cart.model';
import { Configurator } from '../../../model/configurator.model';
import { GenericConfigurator } from '../../../model/generic-configurator.model';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
} from '../../../occ/utils/occ-constants';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { ProcessesLoaderState } from '../../../state/utils/processes-loader/processes-loader-state';
import { GenericConfigUtilsService } from '../../generic/utils/config-utils.service';
import { ConfiguratorActions } from '../store/actions/index';
import {
  CONFIGURATION_FEATURE,
  StateWithConfiguration,
} from '../store/configuration-state';
import * as fromReducers from '../store/reducers/index';
import { ConfiguratorCartService } from './configurator-cart.service';

let OWNER_CART_ENTRY: GenericConfigurator.Owner = {};
let OWNER_ORDER_ENTRY: GenericConfigurator.Owner = {};
let OWNER_PRODUCT: GenericConfigurator.Owner = {};
const CART_CODE = '0000009336';
const CART_GUID = 'e767605d-7336-48fd-b156-ad50d004ca10';
const ORDER_ID = '0000011';
const ORDER_ENTRY_NUMBER = 2;
const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '1234-56-7890';

const cart: Cart = {
  code: CART_CODE,
  guid: CART_GUID,
  user: { uid: OCC_USER_ID_ANONYMOUS },
};

const productConfiguration: Configurator.Configuration = {
  configId: CONFIG_ID,
  owner: OWNER_CART_ENTRY,
};

const cartState: ProcessesLoaderState<Cart> = {
  value: cart,
};
let cartStateObs = null;
let isStableObs = null;
class MockActiveCartService {
  requireLoadedCart(): Observable<ProcessesLoaderState<Cart>> {
    return cartStateObs;
  }
  isStable(): Observable<boolean> {
    return isStableObs;
  }
}

describe('ConfiguratorCartService', () => {
  let serviceUnderTest: ConfiguratorCartService;
  let store: Store<StateWithConfiguration>;
  let configuratorUtils: GenericConfigUtilsService;

  beforeEach(async(() => {
    cartStateObs = of(cartState);
    isStableObs = of(true);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CONFIGURATION_FEATURE,
          fromReducers.getConfiguratorReducers
        ),
      ],
      providers: [
        ConfiguratorCartService,

        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    serviceUnderTest = TestBed.inject(
      ConfiguratorCartService as Type<ConfiguratorCartService>
    );
    store = TestBed.inject(Store as Type<Store<StateWithConfiguration>>);
    configuratorUtils = TestBed.inject(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
    );
    OWNER_CART_ENTRY = {
      id: '3',
      type: GenericConfigurator.OwnerType.CART_ENTRY,
    };
    OWNER_ORDER_ENTRY = {
      id: configuratorUtils.getComposedOwnerId(ORDER_ID, ORDER_ENTRY_NUMBER),
      type: GenericConfigurator.OwnerType.ORDER_ENTRY,
    };
    OWNER_PRODUCT = {
      id: PRODUCT_CODE,
      type: GenericConfigurator.OwnerType.PRODUCT,
    };
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  describe('readConfigurationForCartEntry', () => {
    it('should not dispatch ReadCartEntryConfiguration action in case configuration is present', () => {
      const productConfigurationLoaderState: LoaderState<Configurator.Configuration> = {
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
      const params: GenericConfigurator.ReadConfigurationFromCartEntryParameters = {
        owner: OWNER_CART_ENTRY,
        cartEntryNumber: OWNER_CART_ENTRY.id,
        cartId: CART_GUID,
        userId: OCC_USER_ID_ANONYMOUS,
      };
      const productConfigurationLoaderState: LoaderState<Configurator.Configuration> = {
        value: { configId: '' },
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

      const productConfigurationLoaderState: LoaderState<Configurator.Configuration> = {
        value: { configId: '' },
      };

      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(productConfigurationLoaderState)
      );

      expect(
        serviceUnderTest.readConfigurationForCartEntry(OWNER_CART_ENTRY)
      ).toBeObservable(cold('-----|', {}));
    });
  });

  describe('readConfigurationForOrderEntry', () => {
    it('should not dispatch ReadOrderEntryConfiguration action in case configuration is present', () => {
      const productConfigurationLoaderState: LoaderState<Configurator.Configuration> = {
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
      const params: GenericConfigurator.ReadConfigurationFromOrderEntryParameters = {
        owner: OWNER_ORDER_ENTRY,
        orderEntryNumber: '' + ORDER_ENTRY_NUMBER,
        orderId: ORDER_ID,
        userId: OCC_USER_ID_CURRENT,
      };
      const productConfigurationLoaderState: LoaderState<Configurator.Configuration> = {
        value: { configId: '' },
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
        ownerKey: OWNER_PRODUCT.key,
      };

      spyOn(store, 'dispatch').and.callThrough();

      serviceUnderTest.addToCart(PRODUCT_CODE, CONFIG_ID, OWNER_PRODUCT.key);

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
});
