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
});
