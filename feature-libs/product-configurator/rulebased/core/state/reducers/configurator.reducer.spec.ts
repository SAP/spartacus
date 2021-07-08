import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorActions } from '../actions/index';
import { ConfiguratorTestUtils } from './../../../shared/testing/configurator-test-utils';
import * as StateReduce from './configurator.reducer';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '1234-234';
const CART_ID = '000000001';
const ENTRY_NUMBER = '0';
const USER_ID = 'user';
const owner: CommonConfigurator.Owner = {
  type: CommonConfigurator.OwnerType.PRODUCT,
  id: PRODUCT_CODE,
  key: CommonConfigurator.OwnerType.PRODUCT + '/' + PRODUCT_CODE,
  configuratorType: ConfiguratorType.VARIANT,
};

const interactionState: Configurator.InteractionState = {
  currentGroup: 'firstGroup',
  groupsVisited: {},
  menuParentGroup: undefined,
  issueNavigationDone: true,
};

const groups: Configurator.Group[] = [
  ConfiguratorTestUtils.createGroup('firstGroup'),
  ConfiguratorTestUtils.createGroup('secondGroup'),
];

const configuration: Configurator.Configuration = {
  configId: 'ds',
  productCode: PRODUCT_CODE,
  owner: owner,
  groups: groups,
  flatGroups: [],
  isCartEntryUpdateRequired: false,
  interactionState: interactionState,
};
const configurationWithoutOv: Configurator.Configuration = {
  configId: 'ds',
  productCode: PRODUCT_CODE,
  owner: owner,
  groups: groups,
  flatGroups: [],
  isCartEntryUpdateRequired: false,
  interactionState: interactionState,
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
        configuration
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state).toEqual(configuration);
      expect(state.interactionState.currentGroup).toEqual(
        configuration.groups[0].id
      );
    });
    it('should take current group from flatGroups if current group in interaction state is undefined', () => {
      const configurationWithoutCurrentGroup: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration('A', owner),
        productCode: PRODUCT_CODE,
        overview: { configId: CONFIG_ID },
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
  });

  describe('ReadCartEntryConfigurationSuccess action', () => {
    it('should put configuration into the state', () => {
      const action = new ConfiguratorActions.ReadCartEntryConfigurationSuccess(
        configuration
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state).toEqual(configuration);
      expect(state.interactionState.currentGroup).toEqual(
        configuration.groups[0].id
      );
    });
  });

  describe('ReadConfigurationSuccess action', () => {
    it('should put configuration into the state', () => {
      const action = new ConfiguratorActions.ReadConfigurationSuccess(
        configuration
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state).toEqual(configuration);
      expect(state.interactionState.currentGroup).toEqual(
        configuration.groups[0].id
      );
    });
  });

  describe('UpdateConfigurationSuccess action', () => {
    it('should not put configuration into the state because first we need to check for pending changes', () => {
      const { initialState } = StateReduce;
      const action = new ConfiguratorActions.UpdateConfigurationSuccess(
        configuration
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('UpdateConfigurationFail action', () => {
    it('should not put configuration into the state', () => {
      const { initialState } = StateReduce;
      const action: ConfiguratorActions.ConfiguratorAction = new ConfiguratorActions.UpdateConfigurationFail(
        {
          configuration: configuration,
          error: null,
        }
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('UpdateConfiguration action', () => {
    it('should not put configuration into the state because it is only triggering the update process', () => {
      const { initialState } = StateReduce;
      const action: ConfiguratorActions.ConfiguratorAction = new ConfiguratorActions.UpdateConfiguration(
        configuration
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('UpdateConfigurationFinalizeSuccess action', () => {
    it('should put configuration into the state', () => {
      const action = new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
        configuration
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.owner).toEqual(configuration.owner);
      expect(state.configId).toEqual(configuration.configId);
      expect(state.productCode).toEqual(configuration.productCode);
    });

    it('should set attribute that states that a cart update is required', () => {
      const action = new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
        configuration
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.isCartEntryUpdateRequired).toEqual(true);
    });

    it('should remove the overview facet in order to trigger a re-read later on', () => {
      const action = new ConfiguratorActions.UpdateConfigurationFinalizeSuccess(
        configuration
      );
      const configurationWithOverview: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(
          'A',
          ConfiguratorModelUtils.createInitialOwner()
        ),
        overview: { configId: CONFIG_ID },
      };
      const state = StateReduce.configuratorReducer(
        configurationWithOverview,
        action
      );

      expect(state.overview).toBeUndefined();
    });
  });

  describe('UpdateCartEntry action', () => {
    it('should set attribute that states that a cart update is not required anymore but an backend update is pending', () => {
      const params: Configurator.UpdateConfigurationForCartEntryParameters = {
        configuration: configuration,
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
    it('should keep the existing groups although it does not provide groups in its data', () => {
      const actionProvidingState = new ConfiguratorActions.CreateConfigurationSuccess(
        configuration
      );
      const firstState = StateReduce.configuratorReducer(
        undefined,
        actionProvidingState
      );
      const configurationWithPriceSummary: Configurator.Configuration = {
        ...ConfiguratorTestUtils.createConfiguration(
          'A',
          ConfiguratorModelUtils.createInitialOwner()
        ),
        priceSummary: { basePrice: { value: 0, currencyIso: 'EUR' } },
      };
      const action = new ConfiguratorActions.UpdatePriceSummarySuccess(
        configurationWithPriceSummary
      );
      const state = StateReduce.configuratorReducer(firstState, action);

      expect(state.groups.length).toBe(2);
    });
  });

  describe('RemoveConfiguration action', () => {
    it('should set the initial state', () => {
      const action1 = new ConfiguratorActions.ReadConfigurationSuccess(
        configuration
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

  describe('GetConfigurationOverviewSuccess action', () => {
    it('should put configuration overview into the state', () => {
      const priceSummary: Configurator.PriceSummary = {};
      const overview: Configurator.Overview = {
        configId: CONFIG_ID,
        priceSummary: priceSummary,
      };
      const action = new ConfiguratorActions.GetConfigurationOverviewSuccess({
        ownerKey: configuration.owner.key,
        overview: overview,
      });
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.overview).toEqual(overview);
      expect(state.priceSummary).toBe(priceSummary);
    });
  });

  describe('GetConfigurationOverviewSuccess action', () => {
    it('should put configuration overview into the state', () => {
      const overview: Configurator.Overview = { configId: CONFIG_ID };
      const action = new ConfiguratorActions.GetConfigurationOverviewSuccess({
        ownerKey: configuration.owner.key,
        overview: overview,
      });
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.overview).toEqual(overview);
    });

    it('should copy price summary from OV to configuration', () => {
      const priceSummary: Configurator.PriceSummary = {};
      const overview: Configurator.Overview = {
        configId: CONFIG_ID,
        priceSummary: priceSummary,
      };
      const action = new ConfiguratorActions.GetConfigurationOverviewSuccess({
        ownerKey: configuration.owner.key,
        overview: overview,
      });
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.priceSummary).toBe(priceSummary);
    });
  });

  describe('ReadOrderEntryConfigurationSuccess action', () => {
    it('should put configuration overview into the state', () => {
      const overview: Configurator.Overview = { configId: CONFIG_ID };
      configuration.overview = overview;
      const action = new ConfiguratorActions.ReadOrderEntryConfigurationSuccess(
        configuration
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.overview).toEqual(overview);
    });

    it('should copy price summary from OV to configuration', () => {
      const priceSummary: Configurator.PriceSummary = {};
      const overview: Configurator.Overview = {
        configId: CONFIG_ID,
        priceSummary: priceSummary,
      };
      configuration.overview = overview;
      const action = new ConfiguratorActions.ReadOrderEntryConfigurationSuccess(
        configuration
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.priceSummary).toBe(priceSummary);
    });

    it('should not copy price summary from OV to configuration if not yet available', () => {
      const action = new ConfiguratorActions.ReadOrderEntryConfigurationSuccess(
        configurationWithoutOv
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.priceSummary).toBeUndefined();
    });
  });

  describe('SetNextOwnerCartEntry action', () => {
    it('should set next owner', () => {
      const action = new ConfiguratorActions.SetNextOwnerCartEntry({
        configuration: configuration,
        cartEntryNo: '1',
      });
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.nextOwner).toBeDefined();
      expect(state.nextOwner?.type).toBe(
        CommonConfigurator.OwnerType.CART_ENTRY
      );
    });
  });

  describe('Update Configuration Value Prices', () => {
    describe('getAttributeName', () => {
      it('should return undefined because attribute UI key is null', () => {
        expect(StateReduce.getAttributeName(null)).toBeUndefined();
      });

      it('should return undefined because attribute UI key is undefined', () => {
        expect(StateReduce.getAttributeName(undefined)).toBeUndefined();
      });

      it('should return attribute name', () => {
        expect(
          StateReduce.getAttributeName('groupId@subGroupId@attributeId')
        ).toEqual('attributeId');
      });
    });

    describe('getKey', () => {
      it('should return undefined because both key and name are null', () => {
        expect(StateReduce.getKey(null, null)).toBeUndefined();
      });

      it('should return undefined because both key and name are undefined', () => {
        expect(StateReduce.getKey(undefined, undefined)).toBeUndefined();
      });

      it('should return undefined because the key is undefined', () => {
        expect(StateReduce.getKey(undefined, 'attributeId')).toBeUndefined();
      });

      it('should return undefined because the name is undefined', () => {
        expect(
          StateReduce.getKey('groupId@subGroupId@attributeId', undefined)
        ).toBeUndefined();
      });

      it('should return a key', () => {
        expect(
          StateReduce.getKey('groupId@subGroupId@attributeId', 'attributeId')
        ).toEqual('groupId@subGroupId');
      });
    });

    describe('getGroup', () => {
      it('should return undefined because there are no groups', () => {
        const groups: Configurator.Group[] = [];
        expect(
          StateReduce.getGroup(groups, 'groupId@subGroupId@attributeId')
        ).toBeUndefined();
      });

      it('should return undefined because there is no search group in the groups list', () => {
        const groups: Configurator.Group[] = [];
        for (let index = 1; index <= 4; index++) {
          const groupId = 'group' + index;
          const group: Configurator.Group = ConfiguratorTestUtils.createGroup(
            groupId
          );
          groups.push(group);
        }

        expect(
          StateReduce.getGroup(groups, 'groupId@subGroupId@attributeId')
        ).toBeUndefined();
      });

      it('should return undefined because attribute UI key is undefined or null', () => {
        const groups: Configurator.Group[] = [];
        for (let index = 1; index <= 4; index++) {
          const groupId = 'group' + index;
          const group: Configurator.Group = ConfiguratorTestUtils.createGroup(
            groupId
          );
          groups.push(group);
        }

        expect(StateReduce.getGroup(groups, null)).toBeUndefined();
      });

      it('should return a searched group', () => {
        const groups: Configurator.Group[] = [];
        for (let index = 1; index <= 4; index++) {
          const groupId = 'group' + index;
          const group: Configurator.Group = ConfiguratorTestUtils.createGroup(
            groupId
          );
          groups.push(group);
        }

        const result = StateReduce.getGroup(
          groups,
          'group3@subGroupId@attributeId'
        );
        expect(result.id).toEqual('group3');
      });
    });

    describe('getAttribute', () => {
      it('should return undefined because there are no attribute', () => {
        const attributes: Configurator.Attribute[] = [];
        expect(
          StateReduce.getAttribute(attributes, 'attributeId')
        ).toBeUndefined();
      });

      it('should return undefined because there is no search attribute in the attributes list', () => {
        const attributes: Configurator.Attribute[] = ConfiguratorTestUtils.createListOfAttributes(
          1,
          5,
          0
        );
        expect(
          StateReduce.getAttribute(attributes, 'attributeId')
        ).toBeUndefined();
      });

      it('should return undefined because attribute name is undefined or null null', () => {
        const attributes: Configurator.Attribute[] = ConfiguratorTestUtils.createListOfAttributes(
          1,
          5,
          0
        );
        expect(StateReduce.getAttribute(attributes, null)).toBeUndefined();
      });

      it('should return a searched attribute', () => {
        const attributes: Configurator.Attribute[] = ConfiguratorTestUtils.createListOfAttributes(
          1,
          5,
          0
        );

        const result = StateReduce.getAttribute(attributes, 'attribute_1_3');
        expect(result.name).toEqual('attribute_1_3');
      });
    });

    describe('getValue', () => {
      it('should return undefined because there are no values', () => {
        const values: Configurator.Value[] = [];
        expect(StateReduce.getValue(values, 'valueId')).toBeUndefined();
      });

      it('should return undefined because there is no search value in the values list', () => {
        const values: Configurator.Value[] = ConfiguratorTestUtils.createListOfValues(
          1,
          5
        );
        expect(StateReduce.getValue(values, 'value_1_10')).toBeUndefined();
      });

      it('should return undefined because value code is undefined or null', () => {
        const values: Configurator.Value[] = ConfiguratorTestUtils.createListOfValues(
          1,
          5
        );
        expect(StateReduce.getValue(values, null)).toBeUndefined();
      });

      it('should return a searched value', () => {
        const values: Configurator.Value[] = ConfiguratorTestUtils.createListOfValues(
          1,
          5
        );
        const result = StateReduce.getValue(values, 'value_1_3');
        expect(result.valueCode).toEqual('value_1_3');
      });
    });

    describe('updateValuePrices', () => {
      it('should not update value prices because the list of groups is empty', () => {
        const groups: Configurator.Group[] = [];
        const attributeSupplements: Configurator.AttributeSupplement[] = [];
        StateReduce.updateValuePrices(groups, attributeSupplements);
        expect(groups?.length).toBe(0);
      });

      it('should update value prices for simple product', () => {
        const groups: Configurator.Group[] = ConfiguratorTestUtils.createListOfGroups(
          1,
          0,
          3,
          3
        );
        const attributeSupplements: Configurator.AttributeSupplement[] = ConfiguratorTestUtils.createListOfAttributeSupplements(
          false,
          1,
          0,
          1,
          3
        );
        StateReduce.updateValuePrices(groups, attributeSupplements);

        expect(groups.length).toBe(1);
        expect(groups[0].subGroups.length).toBe(0);
        expect(groups[0].attributes.length).toBe(3);

        const values = groups[0].attributes[0].values;
        const valueSupplements = attributeSupplements[0].valueSupplements;
        expect(values.length).toBe(3);
        expect(values[0].valueCode).toEqual(
          valueSupplements[0].attributeValueKey
        );
        expect(values[0].valuePrice.formattedValue).toEqual(
          valueSupplements[0].priceValue.formattedValue
        );
        expect(values[1].valueCode).toEqual(
          valueSupplements[1].attributeValueKey
        );
        expect(values[1].valuePrice.formattedValue).toEqual(
          valueSupplements[1].priceValue.formattedValue
        );
        expect(values[2].valueCode).toEqual(
          valueSupplements[2].attributeValueKey
        );
        expect(values[2].valuePrice.formattedValue).toEqual(
          valueSupplements[2].priceValue.formattedValue
        );
      });

      it('should update value prices for complex product', () => {
        const groups: Configurator.Group[] = ConfiguratorTestUtils.createListOfGroups(
          3,
          3,
          3,
          3
        );
        const attributeSupplements: Configurator.AttributeSupplement[] = ConfiguratorTestUtils.createListOfAttributeSupplements(
          true,
          1,
          3,
          1,
          3
        );
        StateReduce.updateValuePrices(groups, attributeSupplements);

        expect(groups.length).toBe(3);
        expect(groups[0].subGroups.length).toBe(1);
        expect(groups[0].attributes.length).toBe(0);
        expect(groups[0].subGroups[0].subGroups.length).toBe(1);
        expect(groups[0].subGroups[0].attributes.length).toBe(0);
        expect(groups[0].subGroups[0].subGroups[0].subGroups.length).toBe(1);
        expect(groups[0].subGroups[0].subGroups[0].attributes.length).toBe(0);
        expect(
          groups[0].subGroups[0].subGroups[0].subGroups[0].subGroups.length
        ).toBe(0);
        expect(
          groups[0].subGroups[0].subGroups[0].subGroups[0].attributes.length
        ).toBe(3);

        const values =
          groups[0].subGroups[0].subGroups[0].subGroups[0].attributes[0].values;
        const valueSupplements = attributeSupplements[0].valueSupplements;

        expect(values[0].valuePrice.formattedValue).toEqual(
          valueSupplements[0].priceValue.formattedValue
        );
        expect(values[1].valueCode).toEqual(
          valueSupplements[1].attributeValueKey
        );
        expect(values[1].valuePrice.formattedValue).toEqual(
          valueSupplements[1].priceValue.formattedValue
        );
        expect(values[2].valueCode).toEqual(
          valueSupplements[2].attributeValueKey
        );
        expect(values[2].valuePrice.formattedValue).toEqual(
          valueSupplements[2].priceValue.formattedValue
        );
      });
    });
  });
});
