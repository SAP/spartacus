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
        const stateSlice = getStateSlice(Object.keys(keys), newState);
        transferState.set(CX_KEY, stateSlice);
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
        const transferredStateSlice = getStateSlice(Object.keys(keys), cxKey);

        state = deepMerge({}, state, transferredStateSlice);
      }
      return reducer(state, action);
    };
  };
}
