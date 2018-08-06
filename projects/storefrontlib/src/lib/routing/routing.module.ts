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

// not used in production
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { storeFreeze } from 'ngrx-store-freeze';

export function getMetaReducers(config: ConfigService): MetaReducer<any>[] {
  const metaReducers: MetaReducer<any>[] = [];
  // if (config.storageSyncType !== StorageSyncType.NO_STORAGE) {
  //   const storageSyncReducer = getStorageSyncReducer(config);
  //   metaReducers.push(storageSyncReducer);
  // }

  // metaReducers.push(storeFreeze); // Should not be used in production (SPA-488)

  return metaReducers;
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    // StoreDevtoolsModule.instrument() // Should not be used in production (SPA-488)
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
