import { ConfiguratorTextfieldActions } from '../actions/index';
import { ConfigurationTextfieldState } from '../configuration-textfield-state';

export const initialState: ConfigurationTextfieldState = {
  content: null,
};

export function reducer(
  state = initialState,
  action:
    | ConfiguratorTextfieldActions.CreateConfiguration
    | ConfiguratorTextfieldActions.CreateConfigurationSuccess
    | ConfiguratorTextfieldActions.ReadCartEntryConfigurationSuccess
    | ConfiguratorTextfieldActions.UpdateConfiguration
    | ConfiguratorTextfieldActions.RemoveConfiguration
): ConfigurationTextfieldState {
  switch (action.type) {
    case ConfiguratorTextfieldActions.CREATE_CONFIGURATION_SUCCESS:
    case ConfiguratorTextfieldActions.READ_CART_ENTRY_CONFIGURATION_SUCCESS:
    case ConfiguratorTextfieldActions.UPDATE_CONFIGURATION: {
      return {
        content: { ...action.payload },
      };
    }
    case ConfiguratorTextfieldActions.REMOVE_CONFIGURATION: {
      return state;
    }
  }
  return state;
}
