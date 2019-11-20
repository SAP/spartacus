import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { CartService } from '../../../cart/facade/cart.service';
import { Cart } from '../../../model/cart.model';
import { OCC_USER_ID_ANONYMOUS } from '../../../occ/utils/occ-constants';
import * as ConfiguratorActions from '../store/actions/configurator.action';
import { StateWithConfiguration } from '../store/configuration-state';
import { Configurator } from './../../../model/configurator.model';
import { ConfiguratorCommonsService } from './configurator-commons.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '1234-56-7890';
const GROUP_ID_1 = '1234-56-7891';
const GROUP_NAME = 'Software';
const ATTRIBUTE_NAME_1 = 'Attribute_1';
const ATTRIBUTE_NAME_2 = 'Attribute_DropDown';
const CART_CODE = '0000009336';
const CART_GUID = 'e767605d-7336-48fd-b156-ad50d004ca10';

const productConfiguration: Configurator.Configuration = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
  groups: [
    {
      id: GROUP_ID_1,
      name: GROUP_NAME,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      attributes: [
        {
          name: ATTRIBUTE_NAME_1,
          uiType: Configurator.UiType.STRING,
          userInput: 'input',
        },
        {
          name: ATTRIBUTE_NAME_2,
          uiType: Configurator.UiType.DROPDOWN,
          userInput: null,
        },
      ],
    },
  ],
};

class MockCartService {}

function mergeChangesAndGetFirstGroup(
  serviceUnderTest: ConfiguratorCommonsService,
  changedAttribute: Configurator.Attribute
) {
  const configurationForSendingChanges = serviceUnderTest.createConfigurationExtract(
    GROUP_ID_1,
    changedAttribute,
    productConfiguration
  );
  expect(configurationForSendingChanges).toBeDefined();
  const groups = configurationForSendingChanges.groups;
  expect(groups).toBeDefined();
  expect(groups.length).toBe(1);
  const groupForUpdateRequest = groups[0];
  return groupForUpdateRequest;
}

describe('ConfiguratorCommonsService', () => {
  let serviceUnderTest: ConfiguratorCommonsService;
  let store: Store<StateWithConfiguration>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        ConfiguratorCommonsService,
        {
          provide: CartService,
          useClass: MockCartService,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    serviceUnderTest = TestBed.get(ConfiguratorCommonsService as Type<
      ConfiguratorCommonsService
    >);
    store = TestBed.get(Store as Type<Store<StateWithConfiguration>>);

    spyOn(serviceUnderTest, 'createConfigurationExtract').and.callThrough();
    spyOn(store, 'dispatch').and.stub();
    spyOn(store, 'pipe').and.returnValue(of(productConfiguration));
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should create a configuration, accessing the store', () => {
    const configurationFromStore = serviceUnderTest.createConfiguration(
      PRODUCT_CODE
    );

    expect(configurationFromStore).toBeDefined();
    let productCode: string;
    configurationFromStore.subscribe(
      configuration => (productCode = configuration.productCode)
    );
    expect(productCode).toBe(PRODUCT_CODE);
    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.CreateConfiguration(productCode)
    );
  });

  it('should read a configuration, accessing the store', () => {
    const configurationFromStore = serviceUnderTest.readConfiguration(
      CONFIG_ID,
      PRODUCT_CODE,
      GROUP_ID_1
    );

    expect(configurationFromStore).toBeDefined();
    let productCode: string;
    configurationFromStore.subscribe(
      configuration => (productCode = configuration.productCode)
    );
    expect(productCode).toBe(PRODUCT_CODE);
    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.ReadConfiguration({
        configId: CONFIG_ID,
        productCode: PRODUCT_CODE,
        groupId: GROUP_ID_1,
      })
    );
  });

  it('should update a configuration, accessing the store', () => {
    const changedAttribute: Configurator.Attribute = {
      name: ATTRIBUTE_NAME_1,
    };

    serviceUnderTest.updateConfiguration(
      PRODUCT_CODE,
      GROUP_ID_1,
      changedAttribute
    );
    expect(serviceUnderTest.createConfigurationExtract).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.UpdateConfiguration(
        serviceUnderTest.createConfigurationExtract(
          GROUP_ID_1,
          changedAttribute,
          productConfiguration
        )
      )
    );
  });

  it('should create a new configuration object for changes received, containing one group', () => {
    const changedAttribute: Configurator.Attribute = {
      name: ATTRIBUTE_NAME_1,
    };

    const groupForUpdateRequest = mergeChangesAndGetFirstGroup(
      serviceUnderTest,
      changedAttribute
    );
    expect(groupForUpdateRequest.id).toBe(GROUP_ID_1);
    //group name not needed for update
    expect(groupForUpdateRequest.name).toBeUndefined();
    expect(groupForUpdateRequest.groupType).toBe(
      Configurator.GroupType.ATTRIBUTE_GROUP
    );
  });

  it('should create a new configuration object for changes received, containing exactly one attribute as part of the current group', () => {
    const changedAttribute: Configurator.Attribute = {
      name: ATTRIBUTE_NAME_1,
    };

    const groupForUpdateRequest = mergeChangesAndGetFirstGroup(
      serviceUnderTest,
      changedAttribute
    );
    const attributes = groupForUpdateRequest.attributes;
    expect(attributes).toBeDefined();
    expect(attributes.length).toBe(1);
    expect(attributes[0]).toBe(changedAttribute);
  });

  it('should send no group for change in case it is not part of the configuration', () => {
    const changedAttribute: Configurator.Attribute = {
      name: ATTRIBUTE_NAME_1,
    };

    const configurationForSendingChanges = serviceUnderTest.createConfigurationExtract(
      'unknown',
      changedAttribute,
      productConfiguration
    );
    expect(configurationForSendingChanges).toBeDefined();
    const groups = configurationForSendingChanges.groups;
    expect(groups).toBeDefined();
    expect(groups.length).toBe(0);
  });

  it('should return cart guid if user is anonymous', () => {
    const cart: Cart = {
      code: CART_CODE,
      guid: CART_GUID,
      user: { uid: OCC_USER_ID_ANONYMOUS },
    };
    expect(serviceUnderTest.getCartId(cart)).toBe(CART_GUID);
  });

  it('should return cart code if user is not anonymous', () => {
    const cart: Cart = {
      code: CART_CODE,
      guid: CART_GUID,
      user: { name: 'Ulf Becker', uid: 'ulf.becker@rustic-hw.com' },
    };
    expect(serviceUnderTest.getCartId(cart)).toBe(CART_CODE);
  });
});
