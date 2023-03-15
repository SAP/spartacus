import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';

import { Configurator } from '../../model/configurator.model';
import { ConfiguratorActions } from '../actions/index';
import { ConfiguratorTestUtils } from './../../../testing/configurator-test-utils';
import * as StateReduce from './configurator.reducer';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '1234-234';
const CART_ID = '000000001';
const ENTRY_NUMBER = '0';
const USER_ID = 'user';
const GROUP_ID_1 = 'GROUP';
const GROUP_ID_2 = 'firstGroup';
const ATTRIBUTE_NAME = 'ATTR_1';
const VALUE_CODE = 'VAL';
const CONFLICT_GUID = '5A6542';

const OWNER: CommonConfigurator.Owner = {
  type: CommonConfigurator.OwnerType.PRODUCT,
  id: PRODUCT_CODE,
  key: CommonConfigurator.OwnerType.PRODUCT + '/' + PRODUCT_CODE,
  configuratorType: ConfiguratorType.VARIANT,
};

const INTERACTION_STATE: Configurator.InteractionState = {
  currentGroup: GROUP_ID_2,
  groupsVisited: {},
  menuParentGroup: undefined,
  issueNavigationDone: true,
  showConflictSolverDialog: undefined,
  newConfiguration: undefined,
};

const ATTR_VALUE: Configurator.Value = { valueCode: VALUE_CODE };
const ATTRIBUTE: Configurator.Attribute = {
  name: ATTRIBUTE_NAME,
  values: [ATTR_VALUE],
};
const ATTRIBUTES: Configurator.Attribute[] = [ATTRIBUTE];
const GROUPS: Configurator.Group[] = [
  {
    ...ConfiguratorTestUtils.createGroup(GROUP_ID_2),
    attributes: ATTRIBUTES,
  },
  ConfiguratorTestUtils.createGroup('secondGroup'),
];
const PRICE_DETAILS: Configurator.PriceDetails = {
  value: 123,
  currencyIso: 'EUR',
};

const CONFIGURATION: Configurator.Configuration = {
  configId: 'ds',
  productCode: PRODUCT_CODE,
  owner: OWNER,
  groups: GROUPS,
  flatGroups: [],
  isCartEntryUpdateRequired: false,
  interactionState: INTERACTION_STATE,
};

const CONFIGURATION_WITH_CONFLICTS_WO_ATTRIBUTE_GROUP: Configurator.Configuration =
  {
    ...CONFIGURATION,
    flatGroups: [
      ConfiguratorTestUtils.createGroup(
        Configurator.ConflictIdPrefix + CONFLICT_GUID
      ),
    ],
    interactionState: {},
  };
const CONFIGURATION_WITH_CONFLICTS: Configurator.Configuration = {
  ...CONFIGURATION,
  flatGroups: [
    ConfiguratorTestUtils.createGroup(
      Configurator.ConflictIdPrefix + CONFLICT_GUID
    ),
    {
      ...ConfiguratorTestUtils.createGroup(GROUP_ID_1),
      attributes: [{ name: ATTRIBUTE_NAME }],
    },
  ],
  interactionState: {},
};

const CONFIGURATION_IMMEDIATE_CONFLICT_RESOLUTION: Configurator.Configuration =
  {
    ...CONFIGURATION,
    immediateConflictResolution: true,
    consistent: false,
    flatGroups: [
      ConfiguratorTestUtils.createGroup(
        Configurator.ConflictIdPrefix + '5A6542'
      ),
    ],
    interactionState: {},
  };
const CONFIGURATION_WITHOUT_OV: Configurator.Configuration = {
  configId: 'ds',
  productCode: PRODUCT_CODE,
  owner: OWNER,
  groups: GROUPS,
  flatGroups: [],
  isCartEntryUpdateRequired: false,
  interactionState: INTERACTION_STATE,
};
const CURRENT_GROUP = 'currentGroupId';
const PARENT_GROUP = 'parentGroupId';

describe('Configurator reducer', () => {
  describe('Undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = StateReduce;
      const action = {} as any;
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('CreateConfigurationSuccess action', () => {
    it('should put configuration into the state', () => {
      const action = new ConfiguratorActions.CreateConfigurationSuccess(
        CONFIGURATION
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state).toEqual(CONFIGURATION);
      expect(state.interactionState.currentGroup).toEqual(
        CONFIGURATION.groups[0].id
      );
    });

    it('should take current group from flatGroups if current group in interaction state is undefined', () => {
      const configurationWithoutCurrentGroup: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration('A', OWNER),
        productCode: PRODUCT_CODE,
        overview: { configId: CONFIG_ID, productCode: PRODUCT_CODE },
        flatGroups: [
          ConfiguratorTestUtils.createGroup('flatFirstGroup'),
          ConfiguratorTestUtils.createGroup('flatFirstGroup'),
        ],
      };
      const action = new ConfiguratorActions.CreateConfigurationSuccess(
        configurationWithoutCurrentGroup
      );
      const state = StateReduce.configuratorReducer(undefined, action);
      expect(state.interactionState.currentGroup).toEqual('flatFirstGroup');
    });

    it('should update the new configuration flag in the interaction state', () => {
      const action = new ConfiguratorActions.CreateConfigurationSuccess({
        ...CONFIGURATION,
        newConfiguration: true,
      });
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.interactionState.newConfiguration).toBe(true);
    });
  });

  describe('ReadCartEntryConfigurationSuccess action', () => {
    it('should put configuration into the state', () => {
      const action = new ConfiguratorActions.ReadCartEntryConfigurationSuccess(
        CONFIGURATION
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state).toEqual(CONFIGURATION);
      expect(state.interactionState.currentGroup).toEqual(
        CONFIGURATION.groups[0].id
      );
    });

    it('should set menuParentGroup in case first group is conflict', () => {
      const action = new ConfiguratorActions.ReadCartEntryConfigurationSuccess(
        CONFIGURATION_WITH_CONFLICTS
      );
      const state = StateReduce.configuratorReducer(undefined, action);
      expect(state.interactionState.menuParentGroup).toEqual(
        Configurator.ConflictHeaderId
      );
    });

    it('should set current group to first attribute group in case immediateConflictResolution is active', () => {
      const action = new ConfiguratorActions.ReadCartEntryConfigurationSuccess({
        ...CONFIGURATION_WITH_CONFLICTS,
        immediateConflictResolution: true,
      });
      const state = StateReduce.configuratorReducer(undefined, action);
      expect(state.interactionState.currentGroup).toEqual(GROUP_ID_1);
    });

    it('should set current group to undefined in case immediateConflictResolution is active but no attribute group exists', () => {
      const action = new ConfiguratorActions.ReadCartEntryConfigurationSuccess({
        ...CONFIGURATION_WITH_CONFLICTS_WO_ATTRIBUTE_GROUP,
        immediateConflictResolution: true,
      });
      const state = StateReduce.configuratorReducer(undefined, action);
      expect(state.interactionState.currentGroup).toBeUndefined();
    });
  });

  describe('ReadConfigurationSuccess action', () => {
    it('should put configuration into the state', () => {
      const action = new ConfiguratorActions.ReadConfigurationSuccess(
        CONFIGURATION
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state).toEqual(CONFIGURATION);
      expect(state.interactionState.currentGroup).toEqual(
        CONFIGURATION.groups[0].id
      );
    });
  });

  describe('UpdateConfigurationSuccess action', () => {
    it('should not put configuration into the state because first we need to check for pending changes', () => {
      const { initialState } = StateReduce;
      const action = new ConfiguratorActions.UpdateConfigurationSuccess(
        CONFIGURATION
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('UpdateConfigurationFail action', () => {
    it('should not put configuration into the state', () => {
      const { initialState } = StateReduce;
      const action: ConfiguratorActions.ConfiguratorAction =
        new ConfiguratorActions.UpdateConfigurationFail({
          configuration: CONFIGURATION,
          error: null,
        });
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('UpdateConfiguration action', () => {
    it('should not put configuration into the state because it is only triggering the update process', () => {
      const { initialState } = StateReduce;
      const action: ConfiguratorActions.ConfiguratorAction =
        new ConfiguratorActions.UpdateConfiguration(CONFIGURATION);
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('UpdateConfigurationFinalizeSuccess action', () => {
    it('should put configuration into the state', () => {
      const action = new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
        CONFIGURATION
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.owner).toEqual(CONFIGURATION.owner);
      expect(state.configId).toEqual(CONFIGURATION.configId);
      expect(state.productCode).toEqual(CONFIGURATION.productCode);
    });

    it('should set attribute that states that a cart update is required', () => {
      const action = new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
        CONFIGURATION
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.isCartEntryUpdateRequired).toEqual(true);
    });

    it('should remove the overview facet in order to trigger a re-read later on', () => {
      const action = new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
        CONFIGURATION
      );
      const configurationWithOverview: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(
          'A',
          ConfiguratorModelUtils.createInitialOwner()
        ),
        overview: { configId: CONFIG_ID, productCode: PRODUCT_CODE },
      };
      const state = StateReduce.configuratorReducer(
        configurationWithOverview,
        action
      );

      expect(state.overview).toBeUndefined();
    });

    it('should check on conflict solver dialog', () => {
      const action = new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
        CONFIGURATION_IMMEDIATE_CONFLICT_RESOLUTION
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.interactionState.showConflictSolverDialog).toEqual(true);
    });

    it('should detect that conflict solver dialog is not needed in case immediateConflictResolution is not set but conflicts are present', () => {
      const action = new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
        {
          ...CONFIGURATION_IMMEDIATE_CONFLICT_RESOLUTION,
          immediateConflictResolution: false,
        }
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.interactionState.showConflictSolverDialog).toEqual(false);
    });

    it('should set the new configuration flag in the interaction state to false, only if it was true before', () => {
      const testConfig = structuredClone(CONFIGURATION);
      testConfig.interactionState.newConfiguration = true;
      const action = new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
        testConfig
      );
      const state = StateReduce.configuratorReducer(testConfig, action);

      expect(state.interactionState.newConfiguration).toBe(false);
    });

    it('should set the new configuration flag in the interaction state to undefined, if was undefined before', () => {
      const action = new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
        CONFIGURATION
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.interactionState.newConfiguration).not.toBeDefined();
    });
  });

  describe('UpdateCartEntry action', () => {
    it('should set attribute that states that a cart update is not required anymore but an backend update is pending', () => {
      const params: Configurator.UpdateConfigurationForCartEntryParameters = {
        configuration: CONFIGURATION,
        cartId: CART_ID,
        userId: USER_ID,
        cartEntryNumber: ENTRY_NUMBER,
      };
      const action = new ConfiguratorActions.UpdateCartEntry(params);
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.isCartEntryUpdateRequired).toEqual(false);
    });
  });

  describe('UpdatePriceSummarySuccess action', () => {
    it('should keep the existing groups even if it does not provide any groups in its data', () => {
      const actionProvidingState =
        new ConfiguratorActions.CreateConfigurationSuccess(CONFIGURATION);
      const firstState = StateReduce.configuratorReducer(
        undefined,
        actionProvidingState
      );
      const configurationWithPriceSummary: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(
          'A',
          ConfiguratorModelUtils.createInitialOwner()
        ),
      };
      const action = new ConfiguratorActions.UpdatePriceSummarySuccess(
        configurationWithPriceSummary
      );
      const state = StateReduce.configuratorReducer(firstState, action);
      expect(state.groups.length).toBe(2);
    });

    it('should write price summary into state', () => {
      const configurationWithPriceSummary: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(
          'A',
          ConfiguratorModelUtils.createInitialOwner()
        ),
        priceSummary: { basePrice: PRICE_DETAILS },
      };
      const action = new ConfiguratorActions.UpdatePriceSummarySuccess(
        configurationWithPriceSummary
      );
      const state = StateReduce.configuratorReducer(undefined, action);
      expect(state.priceSummary).toBe(
        configurationWithPriceSummary.priceSummary
      );
    });

    it('should merge supplement data into existing groups ', () => {
      const actionProvidingState =
        new ConfiguratorActions.CreateConfigurationSuccess(CONFIGURATION);
      const firstState = StateReduce.configuratorReducer(
        undefined,
        actionProvidingState
      );
      const configurationWithPriceSummary: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(
          'A',
          ConfiguratorModelUtils.createInitialOwner()
        ),
        priceSupplements: [
          {
            attributeUiKey: GROUP_ID_2 + '@' + ATTRIBUTE_NAME,
            valueSupplements: [
              {
                attributeValueKey: VALUE_CODE,
                priceValue: PRICE_DETAILS,
                obsoletePriceValue: PRICE_DETAILS,
              },
            ],
          },
        ],
      };
      const action = new ConfiguratorActions.UpdatePriceSummarySuccess(
        configurationWithPriceSummary
      );
      const result = StateReduce.configuratorReducer(firstState, action);
      const attributes = result.groups[0].attributes;
      if (attributes) {
        const values = attributes[0].values;
        if (values) {
          expect(values[0].valuePrice).toEqual(PRICE_DETAILS);
        } else {
          fail();
        }
      } else {
        fail();
      }
    });
  });

  describe('RemoveConfiguration action', () => {
    it('should set the initial state', () => {
      const action1 = new ConfiguratorActions.ReadConfigurationSuccess(
        CONFIGURATION
      );
      let state = StateReduce.configuratorReducer(undefined, action1);

      expect(state.configId).toEqual('ds');

      const action2 = new ConfiguratorActions.RemoveConfiguration({
        ownerKey: PRODUCT_CODE,
      });
      state = StateReduce.configuratorReducer(undefined, action2);

      expect(state.configId).toEqual('');
    });
  });

  describe('SetInteractionState action', () => {
    it('interaction state should be set', () => {
      const { initialState } = StateReduce;

      const state = StateReduce.configuratorReducer(
        initialState,
        new ConfiguratorActions.SetInteractionState({
          entityKey: PRODUCT_CODE,
          interactionState: {
            currentGroup: CURRENT_GROUP,
          },
        })
      );

      expect(state.interactionState.currentGroup).toEqual(CURRENT_GROUP);
    });
  });

  describe('SetCurrentGroup action', () => {
    it('should change the current group', () => {
      const { initialState } = StateReduce;

      const state = StateReduce.configuratorReducer(
        initialState,
        new ConfiguratorActions.SetCurrentGroup({
          entityKey: PRODUCT_CODE,
          currentGroup: CURRENT_GROUP,
        })
      );

      expect(state.interactionState.currentGroup).toEqual(CURRENT_GROUP);
    });
  });

  describe('SetMenuParentGroup action', () => {
    it('should change the parentGroup group', () => {
      const { initialState } = StateReduce;

      const state = StateReduce.configuratorReducer(
        initialState,
        new ConfiguratorActions.SetMenuParentGroup({
          entityKey: PRODUCT_CODE,
          menuParentGroup: PARENT_GROUP,
        })
      );

      expect(state.interactionState.menuParentGroup).toEqual(PARENT_GROUP);
    });
  });

  describe('Group Status reducers', () => {
    it('should reduce Group Visited with initial state', () => {
      const { initialState } = StateReduce;

      const action = new ConfiguratorActions.SetGroupsVisited({
        entityKey: PRODUCT_CODE,
        visitedGroups: ['group1', 'group2', 'group3'],
      });

      const state = StateReduce.configuratorReducer(initialState, action);

      expect(state.interactionState.groupsVisited).toEqual({
        group1: true,
        group2: true,
        group3: true,
      });
    });

    it('should reduce Group Visited with existing state', () => {
      const initialState = {
        ...StateReduce.initialState,
        interactionState: {
          groupsVisited: {
            group1: true,
            group2: true,
            group3: true,
          },
        },
      };

      const action = new ConfiguratorActions.SetGroupsVisited({
        entityKey: PRODUCT_CODE,
        visitedGroups: ['group4'],
      });

      const state = StateReduce.configuratorReducer(initialState, action);

      expect(state.interactionState.groupsVisited).toEqual({
        group1: true,
        group2: true,
        group3: true,
        group4: true,
      });
    });
  });

  describe('SearchVariantsSuccess action', () => {
    it('should put the variants list into the state', () => {
      const variants: Configurator.Variant[] = [
        {
          productCode: PRODUCT_CODE,
        },
      ];
      const action = new ConfiguratorActions.SearchVariantsSuccess({
        ownerKey: CONFIGURATION.owner.key,
        variants: variants,
      });
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.variants).toEqual(variants);
    });
  });

  describe('GetConfigurationOverviewSuccess action', () => {
    it('should put configuration overview into the state', () => {
      const overview: Configurator.Overview = {
        configId: CONFIG_ID,
        productCode: PRODUCT_CODE,
        possibleGroups: undefined,
      };
      const action = new ConfiguratorActions.GetConfigurationOverviewSuccess({
        ownerKey: CONFIGURATION.owner.key,
        overview: overview,
      });
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.overview).toEqual(overview);
    });

    it('should copy price summary from OV to configuration', () => {
      const priceSummary: Configurator.PriceSummary = {};
      const overview: Configurator.Overview = {
        configId: CONFIG_ID,
        productCode: PRODUCT_CODE,
        priceSummary: priceSummary,
      };
      const action = new ConfiguratorActions.GetConfigurationOverviewSuccess({
        ownerKey: CONFIGURATION.owner.key,
        overview: overview,
      });
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.priceSummary).toBe(priceSummary);
    });

    it('should fill possible groups', () => {
      const sourceOverview: Configurator.Overview = {
        configId: CONFIG_ID,
        productCode: PRODUCT_CODE,
        groups: [{ id: '1' }, { id: '2' }],
      };
      const targetOverview: Configurator.Overview = {
        ...sourceOverview,
        possibleGroups: sourceOverview.groups,
      };
      const action = new ConfiguratorActions.GetConfigurationOverviewSuccess({
        ownerKey: CONFIGURATION.owner.key,
        overview: sourceOverview,
      });
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.overview).toEqual(targetOverview);
    });
  });

  describe('UpdateConfigurationOverviewSuccess action', () => {
    it('should put configuration overview into the state', () => {
      const overview: Configurator.Overview = {
        configId: CONFIG_ID,
        productCode: PRODUCT_CODE,
      };
      const action = new ConfiguratorActions.UpdateConfigurationOverviewSuccess(
        {
          ownerKey: CONFIGURATION.owner.key,
          overview: overview,
        }
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.overview).toEqual(overview);
    });
  });

  describe('ReadOrderEntryConfigurationSuccess action', () => {
    it('should put configuration overview into the state', () => {
      const overview: Configurator.Overview = {
        configId: CONFIG_ID,
        productCode: PRODUCT_CODE,
      };
      CONFIGURATION.overview = overview;
      const action = new ConfiguratorActions.ReadOrderEntryConfigurationSuccess(
        CONFIGURATION
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.overview).toEqual(overview);
    });

    it('should copy price summary from OV to configuration', () => {
      const priceSummary: Configurator.PriceSummary = {};
      const overview: Configurator.Overview = {
        configId: CONFIG_ID,
        productCode: PRODUCT_CODE,
        priceSummary: priceSummary,
      };
      CONFIGURATION.overview = overview;
      const action = new ConfiguratorActions.ReadOrderEntryConfigurationSuccess(
        CONFIGURATION
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.priceSummary).toBe(priceSummary);
    });

    it('should not copy price summary from OV to configuration if not yet available', () => {
      const action = new ConfiguratorActions.ReadOrderEntryConfigurationSuccess(
        CONFIGURATION_WITHOUT_OV
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.priceSummary).toBeUndefined();
    });
  });

  describe('SetNextOwnerCartEntry action', () => {
    it('should set next owner', () => {
      const action = new ConfiguratorActions.SetNextOwnerCartEntry({
        configuration: CONFIGURATION,
        cartEntryNo: '1',
      });
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.nextOwner).toBeDefined();
      expect(state.nextOwner?.type).toBe(
        CommonConfigurator.OwnerType.CART_ENTRY
      );
    });
  });

  describe('ChangeGroup action', () => {
    it('should set conflict resolution mode', () => {
      const action = new ConfiguratorActions.ChangeGroup({
        configuration: CONFIGURATION,
        groupId: GROUP_ID_1,
        conflictResolutionMode: true,
      });
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.interactionState.isConflictResolutionMode).toBe(true);
    });
  });

  describe('DismissConflictDialog action', () => {
    it('should discard conflictSolverDialog setting', () => {
      const action = new ConfiguratorActions.DissmissConflictDialoge(OWNER.key);
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.interactionState.showConflictSolverDialog).toBe(false);
    });
  });

  describe('CheckConflictSolverDialog action', () => {
    it('should not touch respective setting in case configuration has no conflicts', () => {
      const action = new ConfiguratorActions.CheckConflictDialoge(OWNER.key);
      const state = StateReduce.configuratorReducer(CONFIGURATION, action);

      expect(state.interactionState.showConflictSolverDialog).toBe(undefined);
    });
    it('should set respective setting in case configuration has conflicts and enforces immediate conflict resolution', () => {
      const action = new ConfiguratorActions.CheckConflictDialoge(OWNER.key);
      const state = StateReduce.configuratorReducer(
        CONFIGURATION_IMMEDIATE_CONFLICT_RESOLUTION,
        action
      );

      expect(state.interactionState.showConflictSolverDialog).toBe(true);
    });
  });
});
