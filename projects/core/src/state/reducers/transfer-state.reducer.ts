import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { deepMerge } from '../../config/utils/deep-merge';

const INIT_ACTION = '@ngrx/store/init';
const CX_KEY = makeStateKey<string>('cx-state');

export function getTransferStateReducer(
  transferState: TransferState,
  platformId
) {
  if (isPlatformBrowser(platformId)) {
    return getBrowserTransferStateReducer(transferState);
  } else if (isPlatformServer(platformId)) {
    return getServerTransferStateReducer(transferState);
  } else {
    return reducer => reducer;
  }
}

function getServerTransferStateReducer(transferState: TransferState) {
  return function(reducer) {
    return function(state, action: any) {
      const newState = reducer(state, action);

      if (newState) {
        const { siteContext, product, cms } = newState;
        transferState.set(CX_KEY, { siteContext, product, cms });
        console.log('set state');
      }

      return newState;
    };
  };
}

function getBrowserTransferStateReducer(transferState: TransferState) {
  return function(reducer) {
    return function(state, action: any) {
      if (action.type === INIT_ACTION && transferState.hasKey(CX_KEY)) {
        console.log('get state - before', state);
        state = deepMerge({}, state, transferState.get(CX_KEY, {}));
        console.log('get state - after', state);
      }
      return reducer(state, action);
    };
  };
}
