import * as ConfiguratorActions from '../actions/configurator-textfield.action';
import { ConfigurationTextfieldState } from '../configuration-textfield-state';

export const initialState: ConfigurationTextfieldState = {
  content: null,
  refresh: false,
};

export function reducer(
  state = initialState,
  action:
    | ConfiguratorActions.CreateConfiguration
    | ConfiguratorActions.CreateConfigurationSuccess
    | ConfiguratorActions.UpdateConfiguration
    | ConfiguratorActions.RemoveConfiguration
): ConfigurationTextfieldState {
  switch (action.type) {
    case ConfiguratorActions.CREATE_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.UPDATE_CONFIGURATION: {
      const content = { ...action.payload };

      return {
        content: content,
        refresh: false,
      };
    }
    case ConfiguratorActions.REMOVE_CONFIGURATION: {
      return state;
    }
  }
  return state;
}
