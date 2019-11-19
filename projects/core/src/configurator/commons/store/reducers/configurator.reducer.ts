import { Configurator } from '../../../../model/configurator.model';
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
    case ConfiguratorActions.UPDATE_PRICE_SUMMARY_SUCCESS: {
      const content = { ...action.payload };

      return {
        ...state,
        ...content,
      };
    }
  }
  return state;
}

export function reducerPendingChanges(
  state = initialStatePendingChanges,
  action: ConfiguratorActions.ConfiguratorAction
): number {
  switch (action.type) {
    case ConfiguratorActions.UPDATE_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.UPDATE_CONFIGURATION_FAIL: {
      return addToPendingChanges(-1, state);
    }
    case ConfiguratorActions.UPDATE_CONFIGURATION: {
      return addToPendingChanges(1, state);
    }
  }
  return state;
}

function addToPendingChanges(increment: number, counter: number): number {
  let content = 0;
  let pendingChanges: number = counter;

  if (!pendingChanges) {
    pendingChanges = 0;
  }
  content = increment + pendingChanges;

  return content;
}
