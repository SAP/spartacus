import { Configurator } from '../../../../model/configurator.model';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
import * as ConfiguratorActions from '../actions/configurator.action';

export const initialState: Configurator.Configuration = { configId: '' };
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
      result.overview = undefined;
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

      const result: Configurator.Configuration = {
        ...state,
        overview: content,
        priceSummary: content.priceSummary,
      };

      return result;
    }
    case ConfiguratorActions.READ_ORDER_ENTRY_CONFIGURATION_SUCCESS: {
      const configuration = { ...action.payload };

      const result: Configurator.Configuration = {
        ...state,
        ...configuration,
        priceSummary: configuration.overview.priceSummary,
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
  }
  return state;
}
function takeOverChanges(
  action:
    | ConfiguratorActions.CreateConfigurationSuccess
    | ConfiguratorActions.ReadConfigurationSuccess
    | ConfiguratorActions.UpdatePriceSummarySuccess
    | ConfiguratorActions.UpdateConfigurationFinalizeSuccess
    | ConfiguratorActions.ReadCartEntryConfigurationSuccess
    | ConfiguratorActions.ReadOrderEntryConfigurationSuccess,
  state: Configurator.Configuration
) {
  const content = { ...action.payload };
  const result = {
    ...state,
    ...content,
  };
  return result;
}
