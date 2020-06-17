import { Configurator } from '../../../../model/configurator.model';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
import {
  ConfiguratorAction,
  CreateConfigurationSuccess,
  GetConfigurationOverviewSuccess,
  ReadCartEntryConfigurationSuccess,
  ReadConfigurationSuccess,
  ReadOrderEntryConfigurationSuccess,
  RemoveConfiguration,
  SetCurrentGroup,
  SetGroupsCompleted,
  SetGroupsError,
  SetGroupsVisited,
  SetMenuParentGroup,
  SetNextOwnerCartEntry,
  UpdateCartEntry,
  UpdateCartEntrySuccess,
  UpdateConfiguration,
  UpdateConfigurationFail,
  UpdateConfigurationFinalizeSuccess,
  UpdateConfigurationSuccess,
} from './../actions/configurator.action';
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
  isCartEntryUpdateRequired: false,
  interactionState: {
    currentGroup: null,
    groupsStatus: {},
    groupsVisited: {},
    menuParentGroup: null,
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
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('CreateConfigurationSuccess action', () => {
    it('should put configuration into the state', () => {
      const action: ConfiguratorAction = new CreateConfigurationSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(configuration);
    });
  });
  describe('ReadCartEntryConfigurationSuccess action', () => {
    it('should put configuration into the state', () => {
      const action: ConfiguratorAction = new ReadCartEntryConfigurationSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(configuration);
    });
  });
  describe('ReadConfigurationSuccess action', () => {
    it('should put configuration into the state', () => {
      const action: ConfiguratorAction = new ReadConfigurationSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(configuration);
    });
  });
  describe('UpdateConfigurationSuccess action', () => {
    it('should not put configuration into the state because first we need to check for pending changes', () => {
      const { initialState } = StateReduce;
      const action: ConfiguratorAction = new UpdateConfigurationSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('UpdateConfigurationFail action', () => {
    it('should not put configuration into the state', () => {
      const { initialState } = StateReduce;
      const action: ConfiguratorAction = new UpdateConfigurationFail({
        configuration: configuration,
        error: null,
      });
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('UpdateConfiguration action', () => {
    it('should not put configuration into the state because it is only triggering the update process', () => {
      const { initialState } = StateReduce;
      const action: ConfiguratorAction = new UpdateConfiguration(configuration);
      const state = StateReduce.reducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('UpdateConfigurationFinalizeSuccess action', () => {
    it('should put configuration into the state', () => {
      const action: ConfiguratorAction = new UpdateConfigurationFinalizeSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state.owner).toEqual(configuration.owner);
      expect(state.configId).toEqual(configuration.configId);
      expect(state.productCode).toEqual(configuration.productCode);
    });

    it('should set attribute that states that a cart update is required', () => {
      const action: ConfiguratorAction = new UpdateConfigurationFinalizeSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state.isCartEntryUpdateRequired).toEqual(true);
    });

    it('should remove the overview facet in order to trigger a re-read later on', () => {
      const action: ConfiguratorAction = new UpdateConfigurationFinalizeSuccess(
        configuration
      );
      const configurationWithOverview: Configurator.Configuration = {
        configId: 'A',
        overview: {},
      };
      const state = StateReduce.reducer(configurationWithOverview, action);

      expect(state.overview).toBeUndefined();
    });
  });

  describe('UpdateCartEntry action', () => {
    it('should set attribute that states that a cart update is not required anymore but an backend update is pending', () => {
      const params: Configurator.UpdateConfigurationForCartEntryParameters = {
        configuration: configuration,
      };
      const action: ConfiguratorAction = new UpdateCartEntry(params);
      const state = StateReduce.reducer(undefined, action);

      expect(state.isCartEntryUpdateRequired).toEqual(false);
      expect(state.isCartEntryUpdatePending).toEqual(true);
    });
  });

  describe('UpdateCartEntrySuccess action', () => {
    it('should remove attribute that states that an backend update is pending', () => {
      const action: ConfiguratorAction = new UpdateCartEntrySuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state.isCartEntryUpdatePending).toEqual(false);
    });
  });

  describe('RemoveConfiguration action', () => {
    it('should set the initial state', () => {
      const action1: ConfiguratorAction = new ReadConfigurationSuccess(
        configuration
      );
      let state = StateReduce.reducer(undefined, action1);

      expect(state.configId).toEqual('ds');

      const action2: ConfiguratorAction = new RemoveConfiguration({
        ownerKey: configuration.productCode,
      });
      state = StateReduce.reducer(undefined, action2);

      expect(state.configId).toEqual('');
    });
  });

  describe('SetCurrentGroup action', () => {
    it('should change the current group', () => {
      const { initialState } = StateReduce;

      const state = StateReduce.reducer(
        initialState,
        new SetCurrentGroup(PRODUCT_CODE, CURRENT_GROUP)
      );

      expect(state.interactionState.currentGroup).toEqual(CURRENT_GROUP);
    });
  });

  describe('SetMenuParentGroup action', () => {
    it('should change the parentGroup group', () => {
      const { initialState } = StateReduce;

      const state = StateReduce.reducer(
        initialState,
        new SetMenuParentGroup(PRODUCT_CODE, PARENT_GROUP)
      );

      expect(state.interactionState.menuParentGroup).toEqual(PARENT_GROUP);
    });
  });

  describe('Group Status reducers', () => {
    it('should reduce Group Visited with initial state', () => {
      const { initialState } = StateReduce;

      const action = new SetGroupsVisited(PRODUCT_CODE, [
        'group1',
        'group2',
        'group3',
      ]);

      const state = StateReduce.reducer(initialState, action);

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

      const action = new SetGroupsVisited(PRODUCT_CODE, ['group4']);

      const state = StateReduce.reducer(initialState, action);

      expect(state.interactionState.groupsVisited).toEqual({
        group1: true,
        group2: true,
        group3: true,
        group4: true,
      });
    });

    it('should reduce Group Complete Reducer with initial state', () => {
      const { initialState } = StateReduce;

      const action = new SetGroupsCompleted(PRODUCT_CODE, [
        'group1',
        'group2',
        'group3',
      ]);

      const state = StateReduce.reducer(initialState, action);

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

      const action = new SetGroupsCompleted(PRODUCT_CODE, ['group4']);

      const state = StateReduce.reducer(initialState, action);

      expect(state.interactionState.groupsStatus).toEqual({
        group1: Configurator.GroupStatus.COMPLETE,
        group2: Configurator.GroupStatus.ERROR,
        group3: Configurator.GroupStatus.COMPLETE,
        group4: Configurator.GroupStatus.COMPLETE,
      });
    });

    it('should reduce Group Error Reducer with initial state', () => {
      const { initialState } = StateReduce;

      const action = new SetGroupsError(PRODUCT_CODE, [
        'group1',
        'group2',
        'group3',
      ]);

      const state = StateReduce.reducer(initialState, action);

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

      const action = new SetGroupsError(PRODUCT_CODE, ['group4']);

      const state = StateReduce.reducer(initialState, action);

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
      const action: ConfiguratorAction = new GetConfigurationOverviewSuccess({
        ownerKey: configuration.owner.key,
        overview: overview,
      });
      const state = StateReduce.reducer(undefined, action);

      expect(state.overview).toEqual(overview);
      expect(state.priceSummary).toBe(priceSummary);
    });
  });

  describe('GetConfigurationOverviewSuccess action', () => {
    it('should put configuration overview into the state', () => {
      const overview: Configurator.Overview = {};
      const action: ConfiguratorAction = new GetConfigurationOverviewSuccess({
        ownerKey: configuration.owner.key,
        overview: overview,
      });
      const state = StateReduce.reducer(undefined, action);

      expect(state.overview).toEqual(overview);
    });

    it('should copy price summary from OV to configuration', () => {
      const priceSummary: Configurator.PriceSummary = {};
      const overview: Configurator.Overview = { priceSummary: priceSummary };
      const action: ConfiguratorAction = new GetConfigurationOverviewSuccess({
        ownerKey: configuration.owner.key,
        overview: overview,
      });
      const state = StateReduce.reducer(undefined, action);

      expect(state.priceSummary).toBe(priceSummary);
    });
  });

  describe('ReadOrderEntryConfigurationSuccess action', () => {
    it('should put configuration overview into the state', () => {
      const overview: Configurator.Overview = {};
      configuration.overview = overview;
      const action: ConfiguratorAction = new ReadOrderEntryConfigurationSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state.overview).toEqual(overview);
    });

    it('should copy price summary from OV to configuration', () => {
      const priceSummary: Configurator.PriceSummary = {};
      const overview: Configurator.Overview = { priceSummary: priceSummary };
      configuration.overview = overview;
      const action: ConfiguratorAction = new ReadOrderEntryConfigurationSuccess(
        configuration
      );
      const state = StateReduce.reducer(undefined, action);

      expect(state.priceSummary).toBe(priceSummary);
    });
  });

  describe('SetNextOwnerCartEntry action', () => {
    it('should set next owner', () => {
      const action: ConfiguratorAction = new SetNextOwnerCartEntry({
        configuration: configuration,
        cartEntryNo: '1',
      });
      const state = StateReduce.reducer(undefined, action);

      expect(state.nextOwner).toBeDefined();
      expect(state.nextOwner.type).toBe(
        GenericConfigurator.OwnerType.CART_ENTRY
      );
    });
  });
});
