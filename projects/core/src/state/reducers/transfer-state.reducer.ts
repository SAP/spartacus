import {
  makeStateKey,
  StateKey,
  TransferState
} from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { deepMerge } from '../../config/utils/deep-merge';
import { StateConfig } from '../config/state-config';
import { getStateSlice } from '../utils/get-state-slice';

export const INIT_ACTION = '@ngrx/store/init';
export const CX_KEY: StateKey<string> = makeStateKey<string>('cx-state');

export function getTransferStateReducer(
  platformId,
  transferState?: TransferState,
  config?: StateConfig
) {
  if (
    transferState &&
    config &&
    config.state &&
    config.state.ssrTransfer &&
    config.state.ssrTransfer.keys
  ) {
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

export function getServerTransferStateReducer(
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

export function getBrowserTransferStateReducer(
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
