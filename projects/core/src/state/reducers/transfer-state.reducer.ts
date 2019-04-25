import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  makeStateKey,
  StateKey,
  TransferState,
} from '@angular/platform-browser';
import { INIT } from '@ngrx/store';
import { deepMerge } from '../../config/utils/deep-merge';
import { StateConfig, StateConfigType } from '../config/state-config';
import { getKeysOfType, getStateSlice } from '../utils/get-state-slice';

export const CX_KEY: StateKey<string> = makeStateKey<string>('cx-state');

export function getTransferStateReducer(
  platformId,
  transferState?: TransferState,
  config?: StateConfig
) {
  if (transferState && config && config.state && config.state.keys) {
    const ssrConfigKeys = getKeysOfType(
      config.state.keys,
      StateConfigType.TRANSFER_STATE
    );

    if (isPlatformBrowser(platformId)) {
      return getBrowserTransferStateReducer(transferState, ssrConfigKeys);
    } else if (isPlatformServer(platformId)) {
      return getServerTransferStateReducer(transferState, ssrConfigKeys);
    }
  }

  return undefined;
}

export function getServerTransferStateReducer(
  transferState: TransferState,
  keys: string[]
) {
  return function(reducer) {
    return function(state, action: any) {
      const newState = reducer(state, action);

      if (newState) {
        const stateSlice = getStateSlice(keys, newState);
        transferState.set(CX_KEY, stateSlice);
      }

      return newState;
    };
  };
}

export function getBrowserTransferStateReducer(
  transferState: TransferState,
  keys: string[]
) {
  return function(reducer) {
    return function(state, action: any) {
      if (action.type === INIT && transferState.hasKey(CX_KEY)) {
        const cxKey = transferState.get(CX_KEY, {});
        const transferredStateSlice = getStateSlice(keys, cxKey);

        state = deepMerge({}, state, transferredStateSlice);
      }
      return reducer(state, action);
    };
  };
}
