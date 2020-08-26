import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { select, Store, StoreModule } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ActiveCartService } from '../../../cart/facade/active-cart.service';
import { GenericConfigurator } from '../../../model/generic-configurator.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { GenericConfigUtilsService } from '../../generic/utils/config-utils.service';
import { ConfiguratorActions } from '../store/actions/index';
import {
  ConfigurationState,
  CONFIGURATION_FEATURE,
  StateWithConfiguration,
} from '../store/configuration-state';
import * as fromReducers from '../store/reducers/index';
import { ConfiguratorSelectors } from '../store/selectors';
import { Configurator } from './../../../model/configurator.model';
import { productConfigurationWithConflicts } from './configuration-test-data';
import { ConfiguratorCartService } from './configurator-cart.service';
import { ConfiguratorCommonsService } from './configurator-commons.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
let OWNER_PRODUCT: GenericConfigurator.Owner = {};
let OWNER_CART_ENTRY: GenericConfigurator.Owner = {};
let OWNER_ORDER_ENTRY: GenericConfigurator.Owner = {};

const CONFIG_ID = '1234-56-7890';
const GROUP_ID_1 = '123ab';
const GROUP_ID_2 = '1234-56-7892';
const GROUP_ID_3 = '23456-45-2';
const GROUP_ID_31 = '23456-75-2';
const GROUP_ID_4_ROOT = '23456-45-3';
const GROUP_NAME = 'Software';
const GROUP_NAME_2 = 'Hardware';
const GROUP_NAME_LEVEL1_CHILD = 'Child group 1';
const GROUP_NAME_LEVEL1_CHILD_2 = 'Child group 2';
const GROUP_ROOT = 'Root level group';
const ATTRIBUTE_NAME_1 = 'Attribute_1';
const ATTRIBUTE_NAME_2 = 'Attribute_DropDown';
const ATTRIBUTE_NAME_3_1 = 'Attribute_1';
const ATTRIBUTE_NAME_3_2 = 'Attribute_DropDown';

const ORDER_ID = '0000011';
const ORDER_ENTRY_NUMBER = 2;

const group1: Configurator.Group = {
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
};

const group2: Configurator.Group = {
  id: GROUP_ID_2,
  name: GROUP_NAME_2,
  groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
};

const group31: Configurator.Group = {
  id: GROUP_ID_31,
  name: GROUP_NAME_LEVEL1_CHILD_2,
  groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
};

const group3: Configurator.Group = {
  id: GROUP_ID_3,
  name: GROUP_NAME_LEVEL1_CHILD,
  groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
  subGroups: [group1, group2],
  attributes: [
    {
      name: ATTRIBUTE_NAME_3_1,
      uiType: Configurator.UiType.STRING,
      userInput: 'input',
    },
    {
      name: ATTRIBUTE_NAME_3_2,
      uiType: Configurator.UiType.DROPDOWN,
      userInput: null,
    },
  ],
};

const group4: Configurator.Group = {
  id: GROUP_ID_4_ROOT,
  name: GROUP_ROOT,
  groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
  subGroups: [group3, group31],
};

let productConfiguration: Configurator.Configuration = {
  configId: CONFIG_ID,
};

let productConfigurationMultiLevel: Configurator.Configuration = {
  configId: CONFIG_ID,
};

const productConfigurationChanged: Configurator.Configuration = {
  configId: CONFIG_ID,
};

const configurationState: ConfigurationState = {
  configurations: { entities: {} },
};

let configCartObservable;
let configOrderObservable;
let isStableObservable;

class MockActiveCartService {
  isStable(): Observable<boolean> {
    return isStableObservable;
  }
}

class MockConfiguratorCartService {
  readConfigurationForCartEntry() {
    return configCartObservable;
  }
  readConfigurationForOrderEntry() {
    return configOrderObservable;
  }
}

function mergeChangesAndGetFirstGroup(
  serviceUnderTest: ConfiguratorCommonsService,
  changedAttribute: Configurator.Attribute,
  configuration: Configurator.Configuration
) {
  const configurationForSendingChanges = serviceUnderTest.createConfigurationExtract(
    changedAttribute,
    configuration
  );
  expect(configurationForSendingChanges).toBeDefined();
  const groups = configurationForSendingChanges.groups;
  expect(groups).toBeDefined();
  expect(groups.length).toBe(1);
  const groupForUpdateRequest = groups[0];
  return groupForUpdateRequest;
}

function callGetOrCreate(
  serviceUnderTest: ConfiguratorCommonsService,
  owner: GenericConfigurator.Owner
) {
  const productConfigurationLoaderState: LoaderState<Configurator.Configuration> = {
    value: productConfiguration,
  };
  const productConfigurationLoaderStateChanged: LoaderState<Configurator.Configuration> = {
    value: productConfigurationChanged,
  };
  const obs = cold('x-y', {
    x: productConfigurationLoaderState,
    y: productConfigurationLoaderStateChanged,
  });
  spyOnProperty(ngrxStore, 'select').and.returnValue(() => () => obs);
  const configurationObs = serviceUnderTest.getOrCreateConfiguration(owner);
  return configurationObs;
}

describe('ConfiguratorCommonsService', () => {
  let serviceUnderTest: ConfiguratorCommonsService;
  let configuratorUtils: GenericConfigUtilsService;
  let store: Store<StateWithConfiguration>;
  let configuratorCartService: ConfiguratorCartService;
  configOrderObservable = of(productConfiguration);
  configCartObservable = of(productConfiguration);
  isStableObservable = of(true);

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
          provide: ConfiguratorCartService,
          useClass: MockConfiguratorCartService,
        },
        {
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    serviceUnderTest = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );
    configuratorUtils = TestBed.inject(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
    );

    OWNER_PRODUCT = {
      id: PRODUCT_CODE,
      type: GenericConfigurator.OwnerType.PRODUCT,
    };

    OWNER_CART_ENTRY = {
      id: '3',
      type: GenericConfigurator.OwnerType.CART_ENTRY,
    };

    OWNER_ORDER_ENTRY = {
      id: configuratorUtils.getComposedOwnerId(ORDER_ID, ORDER_ENTRY_NUMBER),
      type: GenericConfigurator.OwnerType.ORDER_ENTRY,
    };

    productConfiguration = {
      configId: CONFIG_ID,
      productCode: PRODUCT_CODE,
      owner: OWNER_PRODUCT,
      groups: [group1, group2],
    };

    productConfigurationMultiLevel = {
      configId: CONFIG_ID,
      productCode: PRODUCT_CODE,
      owner: OWNER_PRODUCT,
      groups: [group4],
    };

    configuratorUtils.setOwnerKey(OWNER_PRODUCT);
    configuratorUtils.setOwnerKey(OWNER_CART_ENTRY);

    configurationState.configurations.entities[OWNER_PRODUCT.key] = {
      ...productConfiguration,
      loading: false,
    };
    store = TestBed.inject(Store as Type<Store<StateWithConfiguration>>);
    configuratorCartService = TestBed.inject(
      ConfiguratorCartService as Type<ConfiguratorCartService>
    );
    spyOn(serviceUnderTest, 'createConfigurationExtract').and.callThrough();
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should call matching action on removeConfiguration', () => {
    spyOn(store, 'dispatch').and.callThrough();

    spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
      of(productConfiguration)
    );

    serviceUnderTest.removeConfiguration(productConfiguration.owner);
    expect(store.dispatch).toHaveBeenCalledTimes(2);

    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.RemoveConfiguration({
        ownerKey: productConfiguration.owner.key,
      })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new ConfiguratorActions.SetInteractionState({
        entityKey: productConfiguration.owner.key,
        interactionState: productConfiguration.interactionState,
      })
    );
  });

  it('should get pending changes from store', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValue(() => () => of(true));

    let hasPendingChanges = null;
    serviceUnderTest
      .hasPendingChanges(OWNER_PRODUCT)
      .subscribe((pendingChanges) => {
        hasPendingChanges = pendingChanges;
      });
    expect(hasPendingChanges).toBe(true);
  });

  it('should get configuration loading state from store', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
      of(configurationState.configurations.entities[OWNER_PRODUCT.key])
    );

    let isLoading = null;
    serviceUnderTest
      .isConfigurationLoading(OWNER_PRODUCT)
      .subscribe((loading) => {
        isLoading = loading;
      });
    expect(isLoading).toBe(false);
  });

  it('should be able to get configuration from store', () => {
    spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
      of(productConfiguration)
    );
    let configurationFromStore = null;
    store
      .pipe(select(ConfiguratorSelectors.getConfigurationFactory(PRODUCT_CODE)))
      .subscribe((configuration) => {
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
      groupId: GROUP_ID_1,
    };
    serviceUnderTest.updateConfiguration(PRODUCT_CODE, changedAttribute);

    expect(serviceUnderTest.createConfigurationExtract).toHaveBeenCalled();
  });

  it('should do nothing on update in case cart updates are pending', () => {
    isStableObservable = of(false);
    const changedAttribute: Configurator.Attribute = {
      name: ATTRIBUTE_NAME_1,
      groupId: GROUP_ID_1,
    };
    serviceUnderTest.updateConfiguration(PRODUCT_CODE, changedAttribute);
    expect(serviceUnderTest.createConfigurationExtract).toHaveBeenCalledTimes(
      0
    );
  });

  describe('getConfigurationWithOverview', () => {
    it('should get an overview from occ, accessing the store', () => {
      expect(productConfiguration.overview).toBeUndefined();
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(productConfiguration)
      );
      spyOn(store, 'dispatch').and.callThrough();
      serviceUnderTest
        .getConfigurationWithOverview(productConfiguration)
        .subscribe(() => {
          expect(store.dispatch).toHaveBeenCalledWith(
            new ConfiguratorActions.GetConfigurationOverview(
              productConfiguration
            )
          );
          //TODO: Add "done" callback
        })
        .unsubscribe();
    });

    it('should not dispatch an action if overview is already present', (done) => {
      const configurationWithOverview: Configurator.Configuration = {
        configId: CONFIG_ID,
        overview: {},
      };
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(configurationWithOverview)
      );
      spyOn(store, 'dispatch').and.callThrough();
      serviceUnderTest
        .getConfigurationWithOverview(productConfiguration)
        .subscribe(() => {
          expect(store.dispatch).toHaveBeenCalledTimes(0);
          done();
        })
        .unsubscribe();
    });
  });

  describe('createConfigurationExtract', () => {
    it('should create a new configuration object for changes received, containing one group', () => {
      const changedAttribute: Configurator.Attribute = {
        name: ATTRIBUTE_NAME_1,
        groupId: GROUP_ID_1,
      };

      const groupForUpdateRequest = mergeChangesAndGetFirstGroup(
        serviceUnderTest,
        changedAttribute,
        productConfiguration
      );
      expect(groupForUpdateRequest.id).toBe(GROUP_ID_1);
      //group name not needed for update
      expect(groupForUpdateRequest.name).toBeUndefined();
      expect(groupForUpdateRequest.groupType).toBe(
        Configurator.GroupType.ATTRIBUTE_GROUP
      );
    });

    it('should be able to handle multilevel configurations as well, returning a projection of the original configuration with only the path to the changes', () => {
      const changedAttribute: Configurator.Attribute = {
        name: ATTRIBUTE_NAME_1,
        groupId: GROUP_ID_1,
      };

      const groupForUpdateRequest = mergeChangesAndGetFirstGroup(
        serviceUnderTest,
        changedAttribute,
        productConfigurationMultiLevel
      );
      expect(groupForUpdateRequest.id).toBe(GROUP_ID_4_ROOT);
      expect(groupForUpdateRequest.name).toBeUndefined();
      expect(groupForUpdateRequest.groupType).toBe(
        Configurator.GroupType.ATTRIBUTE_GROUP
      );

      expect(groupForUpdateRequest.subGroups.length).toBe(1);
      expect(groupForUpdateRequest.subGroups[0].subGroups.length).toBe(1);
      expect(
        groupForUpdateRequest.subGroups[0].subGroups[0].attributes
      ).toEqual([changedAttribute]);
    });

    it('should create a new configuration object for changes received, containing exactly one attribute as part of the current group', () => {
      const changedAttribute: Configurator.Attribute = {
        name: ATTRIBUTE_NAME_1,
        groupId: GROUP_ID_1,
      };

      const groupForUpdateRequest = mergeChangesAndGetFirstGroup(
        serviceUnderTest,
        changedAttribute,
        productConfiguration
      );
      const attributes = groupForUpdateRequest.attributes;
      expect(attributes).toBeDefined(
        'We expect changed attributes in configuration for the update request'
      );
      expect(attributes.length).toBe(1);
      expect(attributes[0]).toBe(changedAttribute);
    });

    it('should throw an error if group for change is not part of the configuration', () => {
      const changedAttribute: Configurator.Attribute = {
        name: ATTRIBUTE_NAME_1,
        groupId: 'unknown',
      };

      expect(function () {
        serviceUnderTest.createConfigurationExtract(
          changedAttribute,
          productConfiguration
        );
      }).toThrow();
    });
  });

  describe('getConfiguration', () => {
    it('should return an unchanged observable of product configurations in case configurations carry valid config IDs', () => {
      const obs = cold('x-y', {
        x: productConfiguration,
        y: productConfigurationChanged,
      });
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () => obs);
      const configurationObs = serviceUnderTest.getConfiguration(
        productConfiguration.owner
      );
      expect(configurationObs).toBeObservable(obs);
    });

    it('should filter incomplete configurations from store', () => {
      productConfigurationChanged.configId = '';
      const obs = cold('xy|', {
        x: productConfiguration,
        y: productConfigurationChanged,
      });
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () => obs);

      const configurationObs = serviceUnderTest.getConfiguration(
        productConfiguration.owner
      );

      expect(configurationObs).toBeObservable(
        cold('x-|', {
          x: productConfiguration,
        })
      );
    });
  });

  describe('getOrCreateConfiguration', () => {
    it('should return an unchanged observable of product configurations in case configurations exist and carry valid config IDs', () => {
      productConfigurationChanged.configId = CONFIG_ID;
      const configurationObs = callGetOrCreate(serviceUnderTest, OWNER_PRODUCT);
      expect(configurationObs).toBeObservable(
        cold('x-y', {
          x: productConfiguration,
          y: productConfigurationChanged,
        })
      );
    });

    it('should filter incomplete configurations from store', () => {
      productConfigurationChanged.configId = '';
      const configurationObs = callGetOrCreate(serviceUnderTest, OWNER_PRODUCT);
      expect(configurationObs).toBeObservable(
        cold('x-', {
          x: productConfiguration,
        })
      );
    });

    it('should delegate to config cart service for cart bound configurations', () => {
      spyOn(
        configuratorCartService,
        'readConfigurationForCartEntry'
      ).and.callThrough();

      serviceUnderTest.getOrCreateConfiguration(OWNER_CART_ENTRY);

      expect(
        configuratorCartService.readConfigurationForCartEntry
      ).toHaveBeenCalledWith(OWNER_CART_ENTRY);
    });

    it('should delegate to config cart service for order bound configurations', () => {
      spyOn(
        configuratorCartService,
        'readConfigurationForOrderEntry'
      ).and.callThrough();

      serviceUnderTest.getOrCreateConfiguration(OWNER_ORDER_ENTRY);

      expect(
        configuratorCartService.readConfigurationForOrderEntry
      ).toHaveBeenCalledWith(OWNER_ORDER_ENTRY);
    });

    it('should create a new configuration if not existing yet', () => {
      const productConfigurationLoaderState: LoaderState<Configurator.Configuration> = {
        loading: false,
      };

      const obs = cold('x', {
        x: productConfigurationLoaderState,
      });
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () => obs);
      spyOn(store, 'dispatch').and.callThrough();

      const configurationObs = serviceUnderTest.getOrCreateConfiguration(
        OWNER_PRODUCT
      );

      expect(configurationObs).toBeObservable(cold('', {}));
      expect(store.dispatch).toHaveBeenCalledWith(
        new ConfiguratorActions.CreateConfiguration(OWNER_PRODUCT)
      );
    });

    it('should not create a new configuration if not existing yet but status is loading', () => {
      const productConfigurationLoaderState: LoaderState<Configurator.Configuration> = {
        loading: true,
      };

      const obs = cold('x', {
        x: productConfigurationLoaderState,
      });
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () => obs);
      spyOn(store, 'dispatch').and.callThrough();

      const configurationObs = serviceUnderTest.getOrCreateConfiguration(
        OWNER_PRODUCT
      );

      expect(configurationObs).toBeObservable(cold('', {}));
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should not create a new configuration if existing yet but erroneous', () => {
      const productConfigurationLoaderState: LoaderState<Configurator.Configuration> = {
        loading: false,
        error: true,
      };

      const obs = cold('x', {
        x: productConfigurationLoaderState,
      });
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () => obs);
      spyOn(store, 'dispatch').and.callThrough();

      const configurationObs = serviceUnderTest.getOrCreateConfiguration(
        OWNER_PRODUCT
      );

      expect(configurationObs).toBeObservable(cold('', {}));
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });
  });

  describe('buildGroupPath', () => {
    it('should create a group path for a single level model', () => {
      const groupPath: Configurator.Group[] = [];
      serviceUnderTest.buildGroupPath(
        GROUP_ID_1,
        productConfiguration.groups,
        groupPath
      );
      expect(groupPath.length).toBe(1);
      expect(groupPath[0].id).toBe(GROUP_ID_1);
    });

    it('should create an empty group path for a single level model in case ID does not match', () => {
      const groupPath: Configurator.Group[] = [];
      serviceUnderTest.buildGroupPath(
        'Not known',
        productConfiguration.groups,
        groupPath
      );
      expect(groupPath.length).toBe(0);
    });

    it('should create a group path for a multi level model', () => {
      const groupPath: Configurator.Group[] = [];
      serviceUnderTest.buildGroupPath(
        GROUP_ID_1,
        productConfigurationMultiLevel.groups,
        groupPath
      );
      expect(groupPath.length).toBe(
        3,
        'Expected path or 3 groups but was: ' + JSON.stringify(groupPath)
      );
      expect(groupPath[2].name).toBe(GROUP_ROOT);
      expect(groupPath[0].name).toBe(GROUP_NAME);
    });

    it('should create an empty group path for a multi level model in case ID does not match', () => {
      const groupPath: Configurator.Group[] = [];
      serviceUnderTest.buildGroupPath(
        'Not known',
        productConfigurationMultiLevel.groups,
        groupPath
      );
      expect(groupPath.length).toBe(0);
    });
  });

  describe('isConfigurationCreated', () => {
    it('should tell from undefined config', () => {
      const configuration: Configurator.Configuration = undefined;
      expect(serviceUnderTest.isConfigurationCreated(configuration)).toBe(
        false
      );
    });
    it('should tell from config ID', () => {
      const configuration: Configurator.Configuration = { configId: 'a' };
      expect(serviceUnderTest.isConfigurationCreated(configuration)).toBe(true);
    });
    it('should tell from blank config ID', () => {
      const configuration: Configurator.Configuration = { configId: '' };
      expect(serviceUnderTest.isConfigurationCreated(configuration)).toBe(
        false
      );
    });
  });

  describe('hasConflicts', () => {
    it('should return false in case of no conflicts', (done) => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(productConfiguration)
      );
      serviceUnderTest
        .hasConflicts(OWNER_PRODUCT)
        .pipe()
        .subscribe((hasConflicts) => {
          expect(hasConflicts).toBe(false);
          done();
        })
        .unsubscribe();
    });

    it('should return true in case of conflicts', (done) => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(productConfigurationWithConflicts)
      );
      serviceUnderTest
        .hasConflicts(OWNER_PRODUCT)
        .pipe()
        .subscribe((hasConflicts) => {
          expect(hasConflicts).toBe(true);
          done();
        })
        .unsubscribe();
    });
  });
});
