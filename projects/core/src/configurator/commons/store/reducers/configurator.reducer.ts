import { Configurator } from '../../../../model/configurator.model';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
import * as ConfiguratorActions from '../actions/configurator.action';

export const initialState: Configurator.Configuration = {
  configId: '',
  interactionState: {
    currentGroup: null,
    groupsStatus: {},
    groupsVisited: {},
    menuParentGroup: null,
  },
};
export const initialStatePendingChanges = 0;

export function reducer(
  state = initialState,
  action: ConfiguratorActions.ConfiguratorAction
): Configurator.Configuration {
  switch (action.type) {
    case ConfiguratorActions.UPDATE_CART_ENTRY_SUCCESS: {
      const result = { ...state };
      result.isCartEntryUpdatePending = false;
      return result;
    }
    case ConfiguratorActions.UPDATE_CONFIGURATION_FINALIZE_SUCCESS: {
      const result: Configurator.Configuration = takeOverChanges(action, state);
      result.isCartEntryUpdateRequired = true;
      return result;
    }
    case ConfiguratorActions.UPDATE_CART_ENTRY: {
      const result = { ...state };
      result.isCartEntryUpdateRequired = false;
      result.isCartEntryUpdatePending = true;
      return result;
    }
    case ConfiguratorActions.CREATE_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.READ_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.READ_CART_ENTRY_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.UPDATE_PRICE_SUMMARY_SUCCESS: {
      return takeOverChanges(action, state);
    }
    case ConfiguratorActions.GET_CONFIGURATION_OVERVIEW_SUCCESS: {
      const content = { ...action.payload.overview };

      const result = {
        ...state,
        overview: content,
      };

      return result;
    }
    case ConfiguratorActions.SET_NEXT_OWNER_CART_ENTRY: {
      const content = { ...action.payload.configuration };
      content.nextOwner = {
        type: GenericConfigurator.OwnerType.CART_ENTRY,
        id: action.payload.cartEntryNo,
      };
      const result = {
        ...state,
        ...content,
      };

      return result;
    }
    case ConfiguratorActions.SET_CURRENT_GROUP: {
      const newCurrentGroup: string = action.payload;
      const changedState: Configurator.Configuration = {
        configId: state.configId,
        interactionState: { currentGroup: newCurrentGroup },
      };

      return {
        ...state,
        ...changedState,
      };
    }
    case ConfiguratorActions.SET_MENU_PARENT_GROUP: {
      const newMenuParentGroup: string = action.payload;
      const changedState: Configurator.Configuration = {
        configId: state.configId,
        interactionState: { menuParentGroup: newMenuParentGroup },
      };

      return {
        ...state,
        ...changedState,
      };
    }
    case ConfiguratorActions.SET_GROUPS_VISITED: {
      const groupIds: string[] = action.payload;

      const changedState: Configurator.Configuration = {
        configId: state.configId,
        interactionState: {
          groupsVisited: {},
        },
      };

      //Set Current state items
      Object.keys(state.interactionState.groupsVisited).forEach(
        (groupId) =>
          (changedState.interactionState.groupsVisited[groupId] = true)
      );

      //Add new Groups
      groupIds.forEach(
        (groupId) =>
          (changedState.interactionState.groupsVisited[groupId] = true)
      );

      return {
        ...state,
        ...changedState,
      };
    }
    case ConfiguratorActions.SET_GROUPS_COMPLETED: {
      return setGroupStatus(
        state,
        action.completedGroups,
        Configurator.GroupStatus.COMPLETE
      );
    }
    case ConfiguratorActions.SET_GROUPS_ERROR: {
      return setGroupStatus(
        state,
        action.errorGroups,
        Configurator.GroupStatus.ERROR
      );
    }
  }
  return state;
}
function takeOverChanges(
  action:
    | ConfiguratorActions.CreateConfigurationSuccess
    | ConfiguratorActions.ReadConfigurationSuccess
    | ConfiguratorActions.UpdatePriceSummarySuccess
    | ConfiguratorActions.UpdateConfigurationFinalizeSuccess
    | ConfiguratorActions.ReadCartEntryConfigurationSuccess,
  state: Configurator.Configuration
) {
  const content = { ...action.payload };
  const result = {
    ...state,
    ...content,
  };
  return result;
}

function setGroupStatus(
  state: Configurator.Configuration,
  groups: string[],
  status: Configurator.GroupStatus
): Configurator.Configuration {
  const changedState: Configurator.Configuration = {
    configId: state.configId,
    interactionState: {
      groupsStatus: {},
    },
  };

  //Set Current state items
  Object.keys(state.interactionState.groupsStatus).forEach(
    (groupId) =>
      (changedState.interactionState.groupsStatus[groupId] =
        state.interactionState.groupsStatus[groupId])
  );

  //Add status for groups
  groups.forEach(
    (groupId) => (changedState.interactionState.groupsStatus[groupId] = status)
  );

  return {
    ...state,
    ...changedState,
  };
}
