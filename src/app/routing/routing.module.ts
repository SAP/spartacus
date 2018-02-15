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
  getStorageSyncReducerFunction
} from './store';

// Angular CLI environment
import { environment } from '../../environments/environment';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { ConfigService } from './config.service';

function getMetaReducers(config: ConfigService): Array<MetaReducer<any>> {
  const metaReducers: MetaReducer<any>[] = [];
  // if there's a storage type set
  if (config.determineStorage()) {
    const storageSyncReducer = getStorageSyncReducerFunction(config);
    metaReducers.push(storageSyncReducer);
  }

  if (!environment.production) {
    metaReducers.push(storeFreeze);
  }
  return metaReducers;
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [
    ConfigService,
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    {
      provide: META_REDUCERS,
      deps: [ConfigService],
      useFactory: getMetaReducers
    }
  ]
})
export class RoutingModule {}
