import { NgModule } from '@angular/core';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule, MetaReducer, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';

import { reducers, effects, CustomSerializer } from './store';

// Angular CLI environment
import { environment } from '../../environments/environment';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { ConfigService, STORAGE_SYNC_TYPE } from './config.service';

function storageSyncReducer(
  reducer: ActionReducer<any>
  // config: ConfigService
): ActionReducer<any> {
  // let storage;
  // switch (config.storageSyncType) {
  //   case STORAGE_SYNC_TYPE.LOCAL_STORAGE: {
  //     storage = localStorage;
  //     break;
  //   }
  //   case STORAGE_SYNC_TYPE.SESSION_STORAGE: {
  //     storage = sessionStorage;
  //     break;
  //   }
  // }

  // const storageSyncConfig: LocalStorageConfig = {
  //   keys: ['user'],
  //   rehydrate: true
  // };
  // if (storage) {
  //   storageSyncConfig.storage = storage;
  // }

  // return localStorageSync(storageSyncConfig)(reducer);

  return localStorageSync({
    keys: ['user'],
    rehydrate: true,
    storage: sessionStorage
  })(reducer);
}

export const metaReducers: MetaReducer<any>[] = [storageSyncReducer];
if (!environment.production) {
  metaReducers.push(storeFreeze);
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }]
})
export class RoutingModule {
  static forRoot(config: any): any {
    return {
      ngModule: RoutingModule,
      providers: [
        {
          provide: ConfigService,
          useExisting: config
        }
      ]
    };
  }
}
