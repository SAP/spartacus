import { Configurator } from 'projects/core/src/model';
import { ConfiguratorUiActions } from '../actions/index';
import * as uiReducer from './configurator-ui.reducer';

const CURRENT_GROUP = 'currentGroupId';
const PARENT_GROUP = 'parentGroupId';
const PRODUCT_CODE = 'CONF_PRODUCT';

describe('Configurator UI reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = uiReducer;
      const action = {} as any;
      const state = uiReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('SetUiState action', () => {
    it('should set the current group', () => {
      const { initialState } = uiReducer;
      const action = new ConfiguratorUiActions.SetUiState(PRODUCT_CODE, {
        currentGroup: CURRENT_GROUP,
      });
      const state = uiReducer.reducer(initialState, action);

      expect(state.currentGroup).toEqual(CURRENT_GROUP);
    });
  });

  describe('CreateUiState action', () => {
    it('should set the initial state', () => {
      const { initialState } = uiReducer;
      const action = new ConfiguratorUiActions.CreateUiState(PRODUCT_CODE);
      const state = uiReducer.reducer(initialState, action);

      expect(state.currentGroup).toEqual(null);
    });
  });

  describe('SetCurrentGroup action', () => {
    it('should change the current group', () => {
      const { initialState } = uiReducer;
      uiReducer.reducer(
        initialState,
        new ConfiguratorUiActions.CreateUiState(PRODUCT_CODE)
      );

      const state = uiReducer.reducer(
        initialState,
        new ConfiguratorUiActions.SetCurrentGroup(PRODUCT_CODE, CURRENT_GROUP)
      );

      expect(state.currentGroup).toEqual(CURRENT_GROUP);
    });
  });

  describe('SetMenuParentGroup action', () => {
    it('should change the parentGroup group', () => {
      const { initialState } = uiReducer;
      uiReducer.reducer(
        initialState,
        new ConfiguratorUiActions.CreateUiState(PRODUCT_CODE)
      );

      const state = uiReducer.reducer(
        initialState,
        new ConfiguratorUiActions.SetMenuParentGroup(PRODUCT_CODE, PARENT_GROUP)
      );

      expect(state.menuParentGroup).toEqual(PARENT_GROUP);
    });
  });

  describe('RemoveUiState action', () => {
    it('should set the initial state', () => {
      const { initialState } = uiReducer;
      const action = new ConfiguratorUiActions.RemoveUiState(PRODUCT_CODE);
      const state = uiReducer.reducer(initialState, action);

      expect(state.currentGroup).toEqual(null);
    });
  });

  describe('Group Status reducers', () => {
    it('should reduce Group Visited with initial state', () => {
      const { initialState } = uiReducer;

      const action = new ConfiguratorUiActions.SetGroupsVisited(PRODUCT_CODE, [
        'group1',
        'group2',
        'group3',
      ]);

      const state = uiReducer.reducer(initialState, action);

      expect(state.groupsVisited).toEqual({
        entities: {
          group1: true,
          group2: true,
          group3: true,
        },
      });
    });

    it('should reduce Group Visited with existing state', () => {
      const { initialState } = uiReducer;
      initialState.groupsVisited = {
        entities: {
          group1: true,
          group2: true,
          group3: true,
        },
      };

      const action = new ConfiguratorUiActions.SetGroupsVisited(PRODUCT_CODE, [
        'group4',
      ]);

      const state = uiReducer.reducer(initialState, action);

      expect(state.groupsVisited).toEqual({
        entities: {
          group1: true,
          group2: true,
          group3: true,
          group4: true,
        },
      });
    });

    it('should reduce Group Complete Reducer with initial state', () => {
      const { initialState } = uiReducer;

      const action = new ConfiguratorUiActions.SetGroupsCompleted(
        PRODUCT_CODE,
        ['group1', 'group2', 'group3']
      );

      const state = uiReducer.reducer(initialState, action);

      expect(state.groupsStatus).toEqual({
        entities: {
          group1: Configurator.GroupStatus.COMPLETE,
          group2: Configurator.GroupStatus.COMPLETE,
          group3: Configurator.GroupStatus.COMPLETE,
        },
      });
    });

    it('should reduce Group Complete Reducer with existing state', () => {
      const { initialState } = uiReducer;
      initialState.groupsStatus = {
        entities: {
          group1: Configurator.GroupStatus.COMPLETE,
          group2: Configurator.GroupStatus.ERROR,
          group3: Configurator.GroupStatus.COMPLETE,
        },
      };

      const action = new ConfiguratorUiActions.SetGroupsCompleted(
        PRODUCT_CODE,
        ['group4']
      );

      const state = uiReducer.reducer(initialState, action);

      expect(state.groupsStatus).toEqual({
        entities: {
          group1: Configurator.GroupStatus.COMPLETE,
          group2: Configurator.GroupStatus.ERROR,
          group3: Configurator.GroupStatus.COMPLETE,
          group4: Configurator.GroupStatus.COMPLETE,
        },
      });
    });

    it('should reduce Group Error Reducer with initial state', () => {
      const { initialState } = uiReducer;

      const action = new ConfiguratorUiActions.SetGroupsError(PRODUCT_CODE, [
        'group1',
        'group2',
        'group3',
      ]);

      const state = uiReducer.reducer(initialState, action);

      expect(state.groupsStatus).toEqual({
        entities: {
          group1: Configurator.GroupStatus.ERROR,
          group2: Configurator.GroupStatus.ERROR,
          group3: Configurator.GroupStatus.ERROR,
        },
      });
    });

    it('should reduce Group Error Reducer with existing state', () => {
      const { initialState } = uiReducer;
      initialState.groupsStatus = {
        entities: {
          group1: Configurator.GroupStatus.ERROR,
          group2: Configurator.GroupStatus.COMPLETE,
          group3: Configurator.GroupStatus.ERROR,
        },
      };

      const action = new ConfiguratorUiActions.SetGroupsError(PRODUCT_CODE, [
        'group4',
      ]);

      const state = uiReducer.reducer(initialState, action);

      expect(state.groupsStatus).toEqual({
        entities: {
          group1: Configurator.GroupStatus.ERROR,
          group2: Configurator.GroupStatus.COMPLETE,
          group3: Configurator.GroupStatus.ERROR,
          group4: Configurator.GroupStatus.ERROR,
        },
      });
    });
  });
});
