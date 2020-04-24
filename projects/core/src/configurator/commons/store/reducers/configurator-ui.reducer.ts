import * as ConfiguratorUiActions from '../actions/configurator-ui.action';
import { UiState } from '../configuration-state';

export const initialState: UiState = {
  currentGroup: null,
  menuParentGroup: null,
  groupsComplete: null,
  groupsError: null,
  groupsVisited: null,
};

export function reducer(
  state = initialState,
  action: ConfiguratorUiActions.ConfiguratorUiAction
): UiState {
  switch (action.type) {
    case ConfiguratorUiActions.SET_UI_STATE: {
      const content = { ...action.payload };

      return {
        ...state,
        ...content,
      };
    }
    case ConfiguratorUiActions.SET_CURRENT_GROUP: {
      const newCurrentGroup: string = action.payload;
      const changedState = { currentGroup: newCurrentGroup };

      return {
        ...state,
        ...changedState,
      };
    }
    case ConfiguratorUiActions.SET_MENU_PARENT_GROUP: {
      const newMenuParentGroup: string = action.payload;
      const changedState = { menuParentGroup: newMenuParentGroup };

      return {
        ...state,
        ...changedState,
      };
    }
    case ConfiguratorUiActions.CREATE_UI_STATE:
    case ConfiguratorUiActions.REMOVE_UI_STATE: {
      return state;
    }
    case ConfiguratorUiActions.SET_GROUPS_VISITED: {
      const groupIds: string[] = action.payload;
      groupIds.forEach((groupId) => (state.groupsVisited[groupId] = true));
      return state;
    }
  }
  return state;
}
