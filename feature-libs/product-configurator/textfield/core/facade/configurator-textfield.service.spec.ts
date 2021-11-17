import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import {
  ActiveCartService,
  Cart,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';
import { ConfiguratorTextfieldActions } from '../state/actions/index';
import {
  ConfigurationTextfieldState,
  StateWithConfigurationTextfield,
} from '../state/configuration-textfield-state';
import { ConfiguratorTextfieldService } from './configurator-textfield.service';
import createSpy = jasmine.createSpy;

const PRODUCT_CODE = 'CONF_LAPTOP';

const ATTRIBUTE_NAME = 'AttributeName';
const ATTRIBUTE_VALUE = 'AttributeValue';

const CHANGED_VALUE = 'theNewValue';
const CART_CODE = '0000009336';
const CART_GUID = 'e767605d-7336-48fd-b156-ad50d004ca10';
const CART_ENTRY_NUMBER = '2';
const ORDER_NUMBER = '0001';
const ORDER_ENTRY_NUMBER = '10';
const owner = ConfiguratorModelUtils.createOwner(
  CommonConfigurator.OwnerType.PRODUCT,
  PRODUCT_CODE
);

const ownerCartRelated = ConfiguratorModelUtils.createOwner(
  CommonConfigurator.OwnerType.CART_ENTRY,
  CART_ENTRY_NUMBER
);

const ownerOrderRelated = ConfiguratorModelUtils.createOwner(
  CommonConfigurator.OwnerType.ORDER_ENTRY,
  ORDER_NUMBER + '+' + ORDER_ENTRY_NUMBER
);

const readFromCartEntryParams: CommonConfigurator.ReadConfigurationFromCartEntryParameters =
  {
    userId: 'anonymous',
    cartId: CART_GUID,
    cartEntryNumber: CART_ENTRY_NUMBER,
    owner: ownerCartRelated,
  };

const readFromOrderEntryParams: CommonConfigurator.ReadConfigurationFromOrderEntryParameters =
  {
    userId: OCC_USER_ID_CURRENT,
    orderId: ORDER_NUMBER,
    orderEntryNumber: ORDER_ENTRY_NUMBER,
    owner: ownerOrderRelated,
  };

const productConfiguration: ConfiguratorTextfield.Configuration = {
  configurationInfos: [
    { configurationLabel: ATTRIBUTE_NAME, configurationValue: ATTRIBUTE_VALUE },
  ],
  owner: ConfiguratorModelUtils.createOwner(
    CommonConfigurator.OwnerType.PRODUCT,
    PRODUCT_CODE
  ),
};

const loaderState: ConfigurationTextfieldState = {
  loaderState: { value: productConfiguration },
};

const loaderStateNothingPresent: ConfigurationTextfieldState = {
  loaderState: { value: undefined },
};

const updateCartEntryParams: ConfiguratorTextfield.UpdateCartEntryParameters = {
  cartId: CART_GUID,
  userId: OCC_USER_ID_ANONYMOUS,
  cartEntryNumber: CART_ENTRY_NUMBER,
  configuration: productConfiguration,
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
      status: ConfiguratorTextfield.ConfigurationStatus.SUCCESS,
    },
  ],
  owner: ConfiguratorModelUtils.createOwner(
    CommonConfigurator.OwnerType.PRODUCT,
    PRODUCT_CODE
  ),
};

const cart: Cart = {
  code: CART_CODE,
  guid: CART_GUID,
  user: { uid: OCC_USER_ID_ANONYMOUS },
};

const cartState: any = {
  value: cart,
};

class MockActiveCartService {
  requireLoadedCart(): any {
    return of(cartState);
  }
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_ANONYMOUS);
  }
}

describe('ConfiguratorTextfieldService', () => {
  let serviceUnderTest: ConfiguratorTextfieldService;
  let store: Store<StateWithConfigurationTextfield>;
  const mockConfigLoaderStateReturned = createSpy('select').and.returnValue(
    () => of(loaderState)
  );
  const mockConfigLoaderStateNothingPresent = createSpy(
    'select'
  ).and.returnValue(() => of(loaderStateNothingPresent));
  const mockConfigReturned = createSpy('select').and.returnValue(() =>
    of(productConfiguration)
  );

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          ConfiguratorTextfieldService,
          {
            provide: ActiveCartService,
            useClass: MockActiveCartService,
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
      ConfiguratorTextfieldService as Type<ConfiguratorTextfieldService>
    );
    store = TestBed.inject(
      Store as Type<Store<StateWithConfigurationTextfield>>
    );

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should return a configuration if one is present on createConfiguration', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(
      mockConfigLoaderStateReturned
    );
    const configurationFromStore = serviceUnderTest.createConfiguration(owner);

    expect(configurationFromStore).toBeDefined();

    configurationFromStore
      .subscribe((configuration) =>
        expect(configuration.configurationInfos.length).toBe(1)
      )
      .unsubscribe();
  });

  it('should create a configuration if nothing is present in store yet', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(
      mockConfigLoaderStateNothingPresent
    );
    const configurationFromStore = serviceUnderTest.createConfiguration(owner);

    expect(configurationFromStore).toBeDefined();

    configurationFromStore
      .subscribe(() =>
        expect(store.dispatch).toHaveBeenCalledWith(
          new ConfiguratorTextfieldActions.CreateConfiguration({
            productCode: owner.id,
            owner: owner,
          })
        )
      )
      .unsubscribe();
  });

  it('should dispatch the correct action when readFromCartEntry is called', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockConfigReturned);
    const configurationFromStore =
      serviceUnderTest.readConfigurationForCartEntry(ownerCartRelated);

    expect(configurationFromStore).toBeDefined();

    configurationFromStore
      .subscribe((configuration) =>
        expect(configuration.configurationInfos.length).toBe(1)
      )
      .unsubscribe();

    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorTextfieldActions.ReadCartEntryConfiguration(
        readFromCartEntryParams
      )
    );
  });

  it('should dispatch the correct action when readConfigurationForOrderEntry is called', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockConfigReturned);
    const configurationFromStore =
      serviceUnderTest.readConfigurationForOrderEntry(ownerOrderRelated);

    expect(configurationFromStore).toBeDefined();

    configurationFromStore
      .subscribe((configuration) =>
        expect(configuration.configurationInfos.length).toBe(1)
      )
      .unsubscribe();

    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorTextfieldActions.ReadOrderEntryConfiguration(
        readFromOrderEntryParams
      )
    );
  });

  it('should access the store when calling createConfiguration', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(
      mockConfigLoaderStateReturned
    );
    serviceUnderTest
      .createConfiguration(owner)
      .subscribe((configurationFromStore) =>
        expect(configurationFromStore).toBe(productConfiguration)
      )
      .unsubscribe();
  });

  it('should update a configuration, accessing the store', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValues(mockConfigReturned);
    spyOn(
      serviceUnderTest,
      'createNewConfigurationWithChange'
    ).and.callThrough();

    serviceUnderTest.updateConfiguration(changedAttribute);

    expect(
      serviceUnderTest.createNewConfigurationWithChange
    ).toHaveBeenCalledWith(changedAttribute, productConfiguration);

    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorTextfieldActions.UpdateConfiguration(
        changedProductConfiguration
      )
    );
  });

  it('should create new configuration with changed value', () => {
    const attribute: ConfiguratorTextfield.ConfigurationInfo = {
      configurationLabel: ATTRIBUTE_NAME,
      configurationValue: CHANGED_VALUE,
    };
    const result = serviceUnderTest.createNewConfigurationWithChange(
      attribute,
      productConfiguration
    );

    expect(result).toBeDefined();
    expect(result.configurationInfos[0].configurationValue).toBe(CHANGED_VALUE);
    expect(result.configurationInfos[0].status).toBe(
      ConfiguratorTextfield.ConfigurationStatus.SUCCESS
    );
  });

  it('should create new configuration with same value if label could not be found', () => {
    const unknownAttribute: ConfiguratorTextfield.ConfigurationInfo = {
      configurationLabel: 'unknownLabel',
    };
    const result = serviceUnderTest.createNewConfigurationWithChange(
      unknownAttribute,
      productConfiguration
    );

    expect(result).toBeDefined();
    expect(result.configurationInfos[0].configurationValue).toBe(
      ATTRIBUTE_VALUE
    );
  });

  it('should dispatch addToCart action with correct parameters on calling addToCart', () => {
    const addToCartParams: ConfiguratorTextfield.AddToCartParameters = {
      cartId: CART_GUID,
      userId: OCC_USER_ID_ANONYMOUS,
      productCode: PRODUCT_CODE,
      configuration: productConfiguration,
      quantity: 1,
    };

    const addToCartAction = new ConfiguratorTextfieldActions.AddToCart(
      addToCartParams
    );

    serviceUnderTest.addToCart(PRODUCT_CODE, productConfiguration);

    expect(store.dispatch).toHaveBeenCalledWith(addToCartAction);
  });

  it('should dispatch corresponding action in case updateCartEntry was triggered', () => {
    serviceUnderTest.updateCartEntry(CART_ENTRY_NUMBER, productConfiguration);
    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorTextfieldActions.UpdateCartEntryConfiguration(
        updateCartEntryParams
      )
    );
  });
});
