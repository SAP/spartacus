import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ActiveCartService } from '../../../cart/facade/active-cart.service';
import { Cart } from '../../../model/cart.model';
import { ConfiguratorTextfield } from '../../../model/configurator-textfield.model';
import { GenericConfigurator } from '../../../model/generic-configurator.model';
import { OCC_USER_ID_ANONYMOUS } from '../../../occ/utils/occ-constants';
import { ProcessesLoaderState } from '../../../state/utils/processes-loader/processes-loader-state';
import * as ConfiguratorActions from '../store/actions/configurator-textfield.action';
import { StateWithConfigurationTextfield } from '../store/configuration-textfield-state';
import { ConfiguratorTextfieldService } from './configurator-textfield.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
const owner: GenericConfigurator.Owner = {
  id: PRODUCT_CODE,
  type: GenericConfigurator.OwnerType.PRODUCT,
};
const ATTRIBUTE_NAME = 'AttributeName';
const ATTRIBUTE_VALUE = 'AttributeValue';
const SUCCESS = 'SUCCESS';
const CHANGED_VALUE = 'theNewValue';
const CART_CODE = '0000009336';
const CART_GUID = 'e767605d-7336-48fd-b156-ad50d004ca10';

const productConfiguration: ConfiguratorTextfield.Configuration = {
  configurationInfos: [
    { configurationLabel: ATTRIBUTE_NAME, configurationValue: ATTRIBUTE_VALUE },
  ],
  owner: {
    id: PRODUCT_CODE,
    type: GenericConfigurator.OwnerType.PRODUCT,
  },
};

const changedAttribute: ConfiguratorTextfield.ConfigurationInfo = {
  configurationLabel: ATTRIBUTE_NAME,
  configurationValue: CHANGED_VALUE,
};

const changedProductConfiguration: ConfiguratorTextfield.Configuration = {
  configurationInfos: [
    {
      configurationLabel: ATTRIBUTE_NAME,
      configurationValue: CHANGED_VALUE,
      status: SUCCESS,
    },
  ],
  owner: {
    id: PRODUCT_CODE,
    type: GenericConfigurator.OwnerType.PRODUCT,
  },
};

const cart: Cart = {
  code: CART_CODE,
  guid: CART_GUID,
  user: { uid: OCC_USER_ID_ANONYMOUS },
};

const cartState: ProcessesLoaderState<Cart> = {
  value: cart,
};

class MockActiveCartService {
  requireLoadedCart(): Observable<ProcessesLoaderState<Cart>> {
    return of(cartState);
  }
}

describe('ConfiguratorTextfieldService', () => {
  let serviceUnderTest: ConfiguratorTextfieldService;
  let store: Store<StateWithConfigurationTextfield>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        ConfiguratorTextfieldService,
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    serviceUnderTest = TestBed.inject(
      ConfiguratorTextfieldService as Type<ConfiguratorTextfieldService>
    );
    store = TestBed.inject(
      Store as Type<Store<StateWithConfigurationTextfield>>
    );

    spyOn(store, 'dispatch').and.stub();
    spyOn(store, 'select').and.returnValue(of(productConfiguration));
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should create a configuration, accessing the store', () => {
    const configurationFromStore = serviceUnderTest.createConfiguration(owner);

    expect(configurationFromStore).toBeDefined();

    configurationFromStore.subscribe(configuration =>
      expect(configuration.configurationInfos.length).toBe(1)
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.CreateConfiguration({
        productCode: owner.id,
        owner: owner,
      })
    );
  });

  it('should access the store with selector', () => {
    serviceUnderTest.createConfiguration(owner);
    expect(store.select).toHaveBeenCalled();
  });

  it('should update a configuration, accessing the store', () => {
    spyOn(
      serviceUnderTest,
      'createNewConfigurationWithChange'
    ).and.callThrough();

    spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
      of(productConfiguration)
    );
    serviceUnderTest.updateConfiguration(changedAttribute);

    expect(
      serviceUnderTest.createNewConfigurationWithChange
    ).toHaveBeenCalledWith(changedAttribute, productConfiguration);

    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.UpdateConfiguration(changedProductConfiguration)
    );
  });

  it('should create new configuration with changed value', () => {
    const result = serviceUnderTest.createNewConfigurationWithChange(
      changedAttribute,
      productConfiguration
    );

    expect(result).toBeDefined();
    expect(result.configurationInfos[0].configurationValue).toBe(CHANGED_VALUE);
    expect(result.configurationInfos[0].status).toBe(SUCCESS);
  });

  it('should create new configuration with same value if label could not be found', () => {
    changedAttribute.configurationLabel = 'unknownLabel';
    const result = serviceUnderTest.createNewConfigurationWithChange(
      changedAttribute,
      productConfiguration
    );

    expect(result).toBeDefined();
    expect(result.configurationInfos[0].configurationValue).toBe(
      ATTRIBUTE_VALUE
    );
  });

  it('should get cart, fill addToCartParameters and call callAddToCartActionWithConfigurationData', () => {
    spyOn(
      serviceUnderTest,
      'callAddToCartActionWithConfigurationData'
    ).and.stub();

    const addToCartParams: ConfiguratorTextfield.AddToCartParameters = {
      cartId: CART_GUID,
      userId: OCC_USER_ID_ANONYMOUS,
      productCode: PRODUCT_CODE,
      quantity: 1,
    };

    serviceUnderTest.addToCart(PRODUCT_CODE);

    expect(
      serviceUnderTest.callAddToCartActionWithConfigurationData
    ).toHaveBeenCalledWith(addToCartParams);
  });

  it('should enrich addToCartParameters with configuration and call addToCart action', () => {
    const addToCartParams: ConfiguratorTextfield.AddToCartParameters = {
      cartId: CART_GUID,
      userId: OCC_USER_ID_ANONYMOUS,
      productCode: PRODUCT_CODE,
      quantity: 1,
      configuration: productConfiguration,
    };

    spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
      of(productConfiguration)
    );
    serviceUnderTest.callAddToCartActionWithConfigurationData(addToCartParams);

    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.AddToCart(addToCartParams)
    );
  });

  describe('getCartId', () => {
    it('should return cart guid if user is anonymous', () => {
      expect(serviceUnderTest.getCartId(cart)).toBe(CART_GUID);
    });

    it('should return cart code if user is not anonymous', () => {
      const namedCart: Cart = {
        code: CART_CODE,
        guid: CART_GUID,
        user: { name: 'Ulf Becker', uid: 'ulf.becker@rustic-hw.com' },
      };
      expect(serviceUnderTest.getCartId(namedCart)).toBe(CART_CODE);
    });
  });

  describe('getUserId', () => {
    it('should return anonymous user id if user is anonymous', () => {
      expect(serviceUnderTest.getUserId(cart)).toBe(OCC_USER_ID_ANONYMOUS);
    });
  });
});
