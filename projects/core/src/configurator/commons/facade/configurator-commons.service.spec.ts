import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { select, Store, StoreModule } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { CartService } from '../../../cart/facade/cart.service';
import { Cart } from '../../../model/cart.model';
import { OCC_USER_ID_ANONYMOUS } from '../../../occ/utils/occ-constants';
import * as ConfiguratorActions from '../store/actions/configurator.action';
import {
  CONFIGURATION_FEATURE,
  StateWithConfiguration,
} from '../store/configuration-state';
import * as fromReducers from '../store/reducers/index';
import { ConfiguratorSelectors } from '../store/selectors';
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
const productConfigurationChanged: Configurator.Configuration = {
  configId: CONFIG_ID,
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
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CONFIGURATION_FEATURE,
          fromReducers.getConfiguratorReducers
        ),
      ],
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
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
  });
  it('should be able to get configuration from store', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
      of(productConfiguration)
    );
    let configurationFromStore = null;
    store
      .pipe(select(ConfiguratorSelectors.getConfigurationFactory(PRODUCT_CODE)))
      .subscribe(configuration => {
        configurationFromStore = configuration;
      });
    expect(configurationFromStore).toBe(productConfiguration);
  });

  it('should update a configuration, accessing the store', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
      of(productConfiguration)
    );
    store.dispatch(
      new ConfiguratorActions.CreateConfigurationSuccess(productConfiguration)
    );
    const changedAttribute: Configurator.Attribute = {
      name: ATTRIBUTE_NAME_1,
    };
    serviceUnderTest.updateConfiguration(
      PRODUCT_CODE,
      GROUP_ID_1,
      changedAttribute
    );

    expect(serviceUnderTest.createConfigurationExtract).toHaveBeenCalled();
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

  it('should return anonymous user id if user is anonymous', () => {
    const cart: Cart = {
      code: CART_CODE,
      guid: CART_GUID,
      user: { uid: OCC_USER_ID_ANONYMOUS },
    };
    expect(serviceUnderTest.getUserId(cart)).toBe(OCC_USER_ID_ANONYMOUS);
  });

  describe('getConfiguration', () => {
    it('should return an unchanged observable of product configurations in case configurations carry valid config IDs', () => {
      const obs = cold('x-y', {
        x: productConfiguration,
        y: productConfigurationChanged,
      });
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () => obs);
      const configurationObs = serviceUnderTest.getConfiguration(PRODUCT_CODE);
      expect(configurationObs).toBeObservable(obs);
    });

    it('should filter incomplete configurations from store', () => {
      productConfigurationChanged.configId = '';
      const obs = cold('xy|', {
        x: productConfiguration,
        y: productConfigurationChanged,
      });
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () => obs);

      const configurationObs = serviceUnderTest.getConfiguration(PRODUCT_CODE);

      expect(configurationObs).toBeObservable(
        cold('x-|', {
          x: productConfiguration,
        })
      );
    });
  });
});
