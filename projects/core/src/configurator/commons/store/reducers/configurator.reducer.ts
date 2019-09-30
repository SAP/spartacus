import { ConfiguratorActions } from '../actions/index';
import { ConfigurationState } from '../configuration-state';

export const initialState: ConfigurationState = {
  content: null,
  refresh: false,
};

export function reducer(
  state = initialState,
  action:
    | ConfiguratorActions.CreateConfiguration
    | ConfiguratorActions.CreateConfigurationSuccess
    | ConfiguratorActions.ReadConfiguration
    | ConfiguratorActions.ReadConfigurationSuccess
    | ConfiguratorActions.UpdateConfiguration
    | ConfiguratorActions.UpdateConfigurationSuccess
): ConfigurationState {
  switch (action.type) {
    case ConfiguratorActions.READ_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.UPDATE_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.CREATE_CONFIGURATION_SUCCESS: {
      const content = { ...action.payload };

      return {
        content: content,
        refresh: false,
      };
    }
  }
  return state;
}
