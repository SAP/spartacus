import { Provider } from '@angular/core';
import { getStorageSyncReducer } from './store-sync.reducer';
import { Config } from '../../config/config.module';
import { WindowRef } from '../../window/window-ref';
import { META_REDUCER } from '../meta-reducer';

export * from './store-sync.reducer';
export * from './transfer-state.reducer';

export const stateMetaReducers: Provider[] = [
  {
    provide: META_REDUCER,
    useFactory: getStorageSyncReducer,
    deps: [Config, WindowRef],
    multi: true
  }
  // {
  //   provide: META_REDUCER,
  //   useFactory: getStorageSyncReducer,
  //   deps: [Config, WindowRef],
  //   multi: true
  // }
];
