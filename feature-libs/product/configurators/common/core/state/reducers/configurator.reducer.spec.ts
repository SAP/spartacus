import { GenericConfigurator } from '@spartacus/core';
import { ConfiguratorActions } from '../actions/index';
import { Configurator } from './../../model/configurator.model';
import * as StateReduce from './configurator.reducer';

const productCode = 'CONF_LAPTOP';
const owner: GenericConfigurator.Owner = {
  type: GenericConfigurator.OwnerType.PRODUCT,
  id: productCode,
};
const configuration: Configurator.Configuration = {
  configId: 'ds',
  productCode: productCode,
  owner: owner,
  groups: [
    {
      id: 'firstGroup',
    },
    {
      id: 'secondGroup',
    },
  ],
  isCartEntryUpdateRequired: false,
  interactionState: {
    currentGroup: 'firstGroup',
    groupsStatus: {},
    groupsVisited: {},
    menuParentGroup: null,
    issueNavigationDone: true,
  },
};
const CURRENT_GROUP = 'currentGroupId';
const PARENT_GROUP = 'parentGroupId';
const PRODUCT_CODE = 'CONF_PRODUCT';

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
        configId: 'A',
        overview: {},
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
      };
      const action = new ConfiguratorActions.UpdateCartEntry(params);
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.isCartEntryUpdateRequired).toEqual(false);
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
        ownerKey: configuration.productCode,
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

    it('should reduce Group Complete Reducer with initial state', () => {
      const { initialState } = StateReduce;

      const action = new ConfiguratorActions.SetGroupsCompleted({
        entityKey: PRODUCT_CODE,
        completedGroups: ['group1', 'group2', 'group3'],
      });

      const state = StateReduce.configuratorReducer(initialState, action);

      expect(state.interactionState.groupsStatus).toEqual({
        group1: Configurator.GroupStatus.COMPLETE,
        group2: Configurator.GroupStatus.COMPLETE,
        group3: Configurator.GroupStatus.COMPLETE,
      });
    });

    it('should reduce Group Complete Reducer with existing state', () => {
      const initialState = {
        ...StateReduce.initialState,
        interactionState: {
          groupsStatus: {
            group1: Configurator.GroupStatus.COMPLETE,
            group2: Configurator.GroupStatus.ERROR,
            group3: Configurator.GroupStatus.COMPLETE,
          },
        },
      };

      const action = new ConfiguratorActions.SetGroupsCompleted({
        entityKey: PRODUCT_CODE,
        completedGroups: ['group4'],
      });

      const state = StateReduce.configuratorReducer(initialState, action);

      expect(state.interactionState.groupsStatus).toEqual({
        group1: Configurator.GroupStatus.COMPLETE,
        group2: Configurator.GroupStatus.ERROR,
        group3: Configurator.GroupStatus.COMPLETE,
        group4: Configurator.GroupStatus.COMPLETE,
      });
    });

    it('should reduce Group Error Reducer with initial state', () => {
      const { initialState } = StateReduce;

      const action = new ConfiguratorActions.SetGroupsError({
        entityKey: PRODUCT_CODE,
        errorGroups: ['group1', 'group2', 'group3'],
      });

      const state = StateReduce.configuratorReducer(initialState, action);

      expect(state.interactionState.groupsStatus).toEqual({
        group1: Configurator.GroupStatus.ERROR,
        group2: Configurator.GroupStatus.ERROR,
        group3: Configurator.GroupStatus.ERROR,
      });
    });

    it('should reduce Group Error Reducer with existing state', () => {
      const initialState = {
        ...StateReduce.initialState,
        interactionState: {
          groupsStatus: {
            group1: Configurator.GroupStatus.ERROR,
            group2: Configurator.GroupStatus.COMPLETE,
            group3: Configurator.GroupStatus.ERROR,
          },
        },
      };

      const action = new ConfiguratorActions.SetGroupsError({
        entityKey: PRODUCT_CODE,
        errorGroups: ['group4'],
      });

      const state = StateReduce.configuratorReducer(initialState, action);

      expect(state.interactionState.groupsStatus).toEqual({
        group1: Configurator.GroupStatus.ERROR,
        group2: Configurator.GroupStatus.COMPLETE,
        group3: Configurator.GroupStatus.ERROR,
        group4: Configurator.GroupStatus.ERROR,
      });
    });
  });

  describe('GetConfigurationOverviewSuccess action', () => {
    it('should put configuration overview into the state', () => {
      const priceSummary: Configurator.PriceSummary = {};
      const overview: Configurator.Overview = { priceSummary: priceSummary };
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
      const overview: Configurator.Overview = {};
      const action = new ConfiguratorActions.GetConfigurationOverviewSuccess({
        ownerKey: configuration.owner.key,
        overview: overview,
      });
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.overview).toEqual(overview);
    });

    it('should copy price summary from OV to configuration', () => {
      const priceSummary: Configurator.PriceSummary = {};
      const overview: Configurator.Overview = { priceSummary: priceSummary };
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
      const overview: Configurator.Overview = {};
      configuration.overview = overview;
      const action = new ConfiguratorActions.ReadOrderEntryConfigurationSuccess(
        configuration
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.overview).toEqual(overview);
    });

    it('should copy price summary from OV to configuration', () => {
      const priceSummary: Configurator.PriceSummary = {};
      const overview: Configurator.Overview = { priceSummary: priceSummary };
      configuration.overview = overview;
      const action = new ConfiguratorActions.ReadOrderEntryConfigurationSuccess(
        configuration
      );
      const state = StateReduce.configuratorReducer(undefined, action);

      expect(state.priceSummary).toBe(priceSummary);
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
      expect(state.nextOwner.type).toBe(
        GenericConfigurator.OwnerType.CART_ENTRY
      );
    });
  });
});
