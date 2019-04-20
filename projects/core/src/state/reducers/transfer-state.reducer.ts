import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  makeStateKey,
  StateKey,
  TransferState,
} from '@angular/platform-browser';
import { INIT } from '@ngrx/store';
import { deepMerge } from '../../config/utils/deep-merge';
import { StateConfig, StateTransferType } from '../config/state-config';
import { getStateSlice } from '../utils/get-state-slice';

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
  keys: { [key: string]: StateTransferType }
) {
  return function(reducer) {
    return function(state, action: any) {
      const newState = reducer(state, action);

      if (newState) {
        let partialState = {};
        for (const key of Object.keys(keys)) {
          const stateSlice = getStateSlice(key, newState);
          partialState = deepMerge(partialState, stateSlice);
        }

        transferState.set(CX_KEY, partialState);
      }

      return newState;
    };
  };
}

export function getBrowserTransferStateReducer(
  transferState: TransferState,
  keys: { [key: string]: StateTransferType }
) {
  return function(reducer) {
    return function(state, action: any) {
      if (action.type === INIT && transferState.hasKey(CX_KEY)) {
        const cxKey = transferState.get(CX_KEY, {});
        let mergedState = {};
        for (const key of Object.keys(keys)) {
          const transferredStateSlice = getStateSlice(key, cxKey);
          mergedState = deepMerge(mergedState, transferredStateSlice);
        }

        state = deepMerge({}, state, mergedState);
      }
      return reducer(state, action);
    };
  };
}
