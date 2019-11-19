import { Configurator } from '../../../../model/configurator.model';
import * as ConfiguratorActions from '../actions/configurator.action';
import { PendingChangesCounter } from '../configuration-state';

export const initialState: Configurator.Configuration = { configId: '' };
export const initialStatePendingChanges: PendingChangesCounter = {};

export function reducer(
  state = initialState,
  action: ConfiguratorActions.ConfiguratorAction
): Configurator.Configuration {
  switch (action.type) {
    case ConfiguratorActions.UPDATE_CONFIGURATION_FINALIZE_SUCCESS:
    case ConfiguratorActions.CREATE_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.READ_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.UPDATE_CONFIGURATION_PRICE_SUCCESS: {
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
): PendingChangesCounter {
  switch (action.type) {
    case ConfiguratorActions.UPDATE_CONFIGURATION_SUCCESS:
    case ConfiguratorActions.UPDATE_CONFIGURATION_FAIL: {
      const content = addToPendingChanges(-1, state);
      return {
        ...state,
        ...content,
      };
    }
    case ConfiguratorActions.UPDATE_CONFIGURATION: {
      const content = addToPendingChanges(1, state);
      return {
        ...state,
        ...content,
      };
    }
  }
  return state;
}

function addToPendingChanges(
  increment: number,
  counter: PendingChangesCounter
): PendingChangesCounter {
  const content: PendingChangesCounter = {};
  let pendingChanges: number = counter.pendingChanges;

  if (!pendingChanges) {
    pendingChanges = 0;
  }
  content.pendingChanges = increment + pendingChanges;

  return content;
}
