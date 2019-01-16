import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { deepMerge } from '../../config/utils/deep-merge';
import { StateConfig } from '../config/state-config';

const INIT_ACTION = '@ngrx/store/init';
const CX_KEY = makeStateKey<string>('cx-state');

export function getTransferStateReducer(
  transferState: TransferState,
  platformId,
  config: StateConfig
) {
  if (config.state.ssrTransfer && config.state.ssrTransfer.keys) {
    if (isPlatformBrowser(platformId)) {
      return getBrowserTransferStateReducer(
        transferState,
        config.state.ssrTransfer.keys
      );
    } else if (isPlatformServer(platformId)) {
      return getServerTransferStateReducer(
        transferState,
        config.state.ssrTransfer.keys
      );
    }
  }

  return undefined;
}

export function getStateSlice(state: any, keys: object): any {
  return Object.keys(keys).reduce((acc, key) => {
    const keyValue = keys[key];
    if (typeof keyValue === 'object') {
      acc[key] = getStateSlice(state[key], keyValue);
    } else if (keyValue) {
      acc[key] = state[key];
    }
    return acc;
  }, {});
}

function getServerTransferStateReducer(
  transferState: TransferState,
  keys: object
) {
  return function(reducer) {
    return function(state, action: any) {
      const newState = reducer(state, action);

      if (newState) {
        transferState.set(CX_KEY, getStateSlice(newState, keys));
      }

      return newState;
    };
  };
}

function getBrowserTransferStateReducer(
  transferState: TransferState,
  keys: any
) {
  return function(reducer) {
    return function(state, action: any) {
      if (action.type === INIT_ACTION && transferState.hasKey(CX_KEY)) {
        console.log('get state - before', state);
        const transferedState = getStateSlice(
          transferState.get(CX_KEY, {}),
          keys
        );
        state = deepMerge({}, state, transferedState);
        console.log('get state - after', state);
      }
      return reducer(state, action);
    };
  };
}
