import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { Configurator } from '../../model/configurator.model';
import { ConfiguratorActions } from '../actions/index';
import { ConfiguratorStateUtils } from '../configurator-state-utils';

export const initialState: Configurator.Configuration = {
  configId: '',
  groups: [],
  flatGroups: [],
  interactionState: {
    currentGroup: undefined,
    groupsVisited: {},
    menuParentGroup: undefined,
  },
  owner: ConfiguratorModelUtils.createInitialOwner(),
};
export const initialStatePendingChanges = 0;

export function configuratorReducer(
  state = initialState,
  action:
    | ConfiguratorActions.ConfiguratorAction
    | ConfiguratorActions.ConfiguratorCartAction
): Configurator.Configuration {
  switch (action.type) {
    case ConfiguratorActions.UPDATE_CONFIGURATION_FINALIZE_SUCCESS: {
      const result: Configurator.Configuration = takeOverChanges(action, state);
      result.isCartEntryUpdateRequired = true;
      result.overview = undefined;
      return result;
    }
    case ConfiguratorActions.UPDATE_CART_ENTRY: {
      const result = { ...state };
      result.isCartEntryUpdateRequired = false;
      return result;
    }
    case ConfiguratorActions.CREATE_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.READ_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.READ_CART_ENTRY_CONFIGURATION_SUCCESS: {
      return setInitialCurrentGroup(takeOverChanges(action, state));
    }

    case ConfiguratorActions.UPDATE_PRICE_SUMMARY_SUCCESS: {
      return setInitialCurrentGroup(takeOverPricingChanges(action, state));
    }

    case ConfiguratorActions.GET_CONFIGURATION_OVERVIEW_SUCCESS: {
      const content = { ...action.payload.overview };

      const result: Configurator.Configuration = {
        ...state,
        overview: content,
        priceSummary: content.priceSummary,
        interactionState: {
          ...state.interactionState,
          issueNavigationDone: false,
        },
      };

      return result;
    }
    case ConfiguratorActions.READ_ORDER_ENTRY_CONFIGURATION_SUCCESS: {
      const configuration = { ...action.payload };

      const result: Configurator.Configuration = {
        ...state,
        ...configuration,
        priceSummary: configuration.overview?.priceSummary,
      };

      return result;
    }
    case ConfiguratorActions.SET_NEXT_OWNER_CART_ENTRY: {
      const content = { ...action.payload.configuration };
      content.nextOwner = ConfiguratorModelUtils.createOwner(
        CommonConfigurator.OwnerType.CART_ENTRY,
        action.payload.cartEntryNo
      );
      const result = {
        ...state,
        ...content,
      };

      return result;
    }
    case ConfiguratorActions.SET_INTERACTION_STATE: {
      const newInteractionState: Configurator.InteractionState =
        action.payload.interactionState;

      return {
        ...state,
        interactionState: newInteractionState,
      };
    }
    case ConfiguratorActions.SET_CURRENT_GROUP: {
      const newCurrentGroup: string = action.payload.currentGroup;

      return {
        ...state,
        interactionState: {
          ...state.interactionState,
          currentGroup: newCurrentGroup,
        },
      };
    }
    case ConfiguratorActions.SET_MENU_PARENT_GROUP: {
      const newMenuParentGroup = action.payload.menuParentGroup;

      return {
        ...state,
        interactionState: {
          ...state.interactionState,
          menuParentGroup: newMenuParentGroup,
        },
      };
    }
    case ConfiguratorActions.SET_GROUPS_VISITED: {
      const groupIds: string[] = action.payload.visitedGroups;

      const changedInteractionState: Configurator.InteractionState = {
        groupsVisited: {},
      };

      //Set Current state items
      if (state.interactionState.groupsVisited) {
        Object.keys(state.interactionState.groupsVisited).forEach((groupId) =>
          setGroupsVisited(changedInteractionState, groupId)
        );
      }

      //Add new Groups
      groupIds.forEach((groupId) =>
        setGroupsVisited(changedInteractionState, groupId)
      );

      return {
        ...state,
        interactionState: {
          ...state.interactionState,
          groupsVisited: changedInteractionState.groupsVisited,
        },
      };
    }
  }
  return state;
}

function setGroupsVisited(
  changedInteractionState: Configurator.InteractionState,
  groupId: string
) {
  const groupsVisited = changedInteractionState.groupsVisited;
  if (groupsVisited) {
    groupsVisited[groupId] = true;
  }
}

function setInitialCurrentGroup(
  state: Configurator.Configuration
): Configurator.Configuration {
  if (state.interactionState.currentGroup) {
    return state;
  }
  let initialCurrentGroup;
  const flatGroups = state.flatGroups;
  if (flatGroups && flatGroups.length > 0) {
    initialCurrentGroup = flatGroups[0]?.id;
  }

  const result = {
    ...state,
    interactionState: {
      ...state.interactionState,
      currentGroup: initialCurrentGroup,
    },
  };

  return result;
}

function takeOverChanges(
  action:
    | ConfiguratorActions.CreateConfigurationSuccess
    | ConfiguratorActions.ReadConfigurationSuccess
    | ConfiguratorActions.UpdateConfigurationFinalizeSuccess
    | ConfiguratorActions.ReadCartEntryConfigurationSuccess
    | ConfiguratorActions.ReadOrderEntryConfigurationSuccess,
  state: Configurator.Configuration
): Configurator.Configuration {
  const content = { ...action.payload };
  const groups = content.groups.length > 0 ? content.groups : state.groups;

  const result: Configurator.Configuration = {
    ...state,
    ...content,
    groups: groups,
    interactionState: {
      ...state.interactionState,
      ...content.interactionState,
      issueNavigationDone: true,
    },
  };
  return result;
}

function takeOverPricingChanges(
  action: ConfiguratorActions.UpdatePriceSummarySuccess,
  state: Configurator.Configuration
): Configurator.Configuration {
  const content = { ...action.payload };
  const priceSupplements = content.priceSupplements;
  const groups =
    priceSupplements && priceSupplements.length > 0
      ? ConfiguratorStateUtils.mergeGroupsWithSupplements(
          state.groups,
          priceSupplements
        )
      : state.groups;

  const result = {
    ...state,
    ...content,
    groups: groups,
    interactionState: {
      ...state.interactionState,
      ...content.interactionState,
      issueNavigationDone: true,
    },
  };
  return result;
}
