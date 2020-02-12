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
    case ConfiguratorActions.UPDATE_CONFIGURATION_FINALIZE_SUCCESS:
    case ConfiguratorActions.CREATE_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.READ_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.READ_CART_ENTRY_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.UPDATE_PRICE_SUMMARY_SUCCESS: {
      const content = { ...action.payload };

      const result = {
        ...state,
        ...content,
      };

      return result;
    }
    case ConfiguratorActions.GET_CONFIGURATION_OVERVIEW_SUCCESS: {
      const content = { ...action.payload };

      const result = {
        ...state,
        overview: content,
      };

      return result;
    }
    case ConfiguratorActions.SET_NEXT_OWNER_CART_ENTRY: {
      const content = { ...action.configuration };
      content.nextOwner = {
        type: GenericConfigurator.OwnerType.CART_ENTRY,
        id: action.cartEntryNo,
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
