import { NgModule } from '@angular/core';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule, MetaReducer, META_REDUCERS } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  reducers,
  effects,
  CustomSerializer,
  getStorageSyncReducer
} from './store';
import { ConfigService, StorageSyncType } from './config.service';

// Angular CLI environment
// import { environment } from '../../environments/environment';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

export function getMetaReducers(config: ConfigService): MetaReducer<any>[] {
  const metaReducers: MetaReducer<any>[] = [];
  if (config.storageSyncType !== StorageSyncType.NO_STORAGE) {
    const storageSyncReducer = getStorageSyncReducer(config);
    metaReducers.push(storageSyncReducer);
  }

  // if (!environment.production) {
     metaReducers.push(storeFreeze);
  // }
  return metaReducers;
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    // environment.production ? [] : StoreDevtoolsModule.instrument()
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    {
      provide: META_REDUCERS,
      deps: [ConfigService],
      useFactory: getMetaReducers
    }
  ]
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
