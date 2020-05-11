import { Configurator } from '../../../../model/configurator.model';
import * as ConfiguratorUiActions from '../actions/configurator-ui.action';
import { UiState } from '../configuration-state';

export const initialState: UiState = {
  currentGroup: null,
  menuParentGroup: null,
  groupsStatus: { entities: {} },
  groupsVisited: { entities: {} },
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

      const changedState = {
        groupsVisited: {
          entities: {},
        },
      };

      //Set Current state items
      Object.keys(state.groupsVisited.entities).forEach(
        (groupId) => (changedState.groupsVisited.entities[groupId] = true)
      );

      //Add new Groups
      groupIds.forEach(
        (groupId) => (changedState.groupsVisited.entities[groupId] = true)
      );

      return {
        ...state,
        ...changedState,
      };
    }
    case ConfiguratorUiActions.SET_GROUPS_COMPLETED: {
      return setGroupStatus(
        state,
        action.completedGroups,
        Configurator.GroupStatus.COMPLETE
      );
    }
    case ConfiguratorUiActions.SET_GROUPS_ERROR: {
      return setGroupStatus(
        state,
        action.errorGroups,
        Configurator.GroupStatus.ERROR
      );
    }
  }
  return state;
}

function setGroupStatus(
  state: UiState,
  groups: string[],
  status: Configurator.GroupStatus
): UiState {
  const changedState: UiState = {
    groupsStatus: { entities: {} },
  };

  //Set Current state items
  Object.keys(state.groupsStatus.entities).forEach(
    (groupId) =>
      (changedState.groupsStatus.entities[groupId] =
        state.groupsStatus.entities[groupId])
  );

  //Add status for groups
  groups.forEach(
    (groupId) => (changedState.groupsStatus.entities[groupId] = status)
  );

  return {
    ...state,
    ...changedState,
  };
}
