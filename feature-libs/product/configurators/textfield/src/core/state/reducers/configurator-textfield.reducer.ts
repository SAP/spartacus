import { ConfiguratorTextfield } from '../../model/configurator-textfield.model';
import { ConfiguratorActions } from '../actions/configurator-textfield.action';
import { ConfiguratorTextfieldActions } from '../actions/index';

export const initialState: ConfiguratorTextfield.Configuration = {
  configurationInfos: [],
  owner: {},
};

export function reducer(
  state = initialState,
  action: ConfiguratorActions
): ConfiguratorTextfield.Configuration {
  switch (action.type) {
    case ConfiguratorTextfieldActions.CREATE_CONFIGURATION_SUCCESS:
    case ConfiguratorTextfieldActions.READ_CART_ENTRY_CONFIGURATION_SUCCESS:
    case ConfiguratorTextfieldActions.UPDATE_CONFIGURATION: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ConfiguratorTextfieldActions.REMOVE_CONFIGURATION: {
      return initialState;
    }
  }
  return state;
}
