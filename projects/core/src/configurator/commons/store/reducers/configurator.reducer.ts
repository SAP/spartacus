import { Configurator } from '../../../../model/configurator.model';
import * as ConfiguratorActions from '../actions/configurator.action';
import { ChangeCounter } from '../configuration-state';

export const initialState: Configurator.Configuration = { configId: '' };
export const initialStatePendingChanges: ChangeCounter = {};

export function reducer(
  state = initialState,
  action: ConfiguratorActions.ConfiguratorAction
): Configurator.Configuration {
  switch (action.type) {
    case ConfiguratorActions.UPDATE_CONFIGURATION_FINALIZE: {
      const content = { ...action.payload };

      return {
        ...state,
        ...content,
      };
    }
    case ConfiguratorActions.CREATE_CONFIGURATION_SUCCESS: {
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
): ChangeCounter {
  switch (action.type) {
    case ConfiguratorActions.UPDATE_CONFIGURATION_SUCCESS: {
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
  counter: ChangeCounter
): ChangeCounter {
  const content: ChangeCounter = {};
  let pendingChanges: number = counter.pendingChanges;

  if (!pendingChanges) {
    pendingChanges = 0;
  }
  content.pendingChanges = increment + pendingChanges;

  return content;
}
