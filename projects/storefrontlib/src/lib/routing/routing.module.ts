import { NgModule } from '@angular/core';

import { ConfigModule, Config } from '@spartacus/core';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule, MetaReducer, META_REDUCERS } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { getStorageSyncReducer } from './store/reducers';
import {
  reducerToken,
  CustomSerializer,
  reducerProvider
} from './store/reducers/router.reducer';
import { effects } from './store/effects/index';
import {
  defaultRoutingModuleConfig,
  RoutingModuleConfig,
  StorageSyncType
} from './routing-module-config';

import { RouterModule } from '@angular/router';

export function getMetaReducers(
  config: RoutingModuleConfig
): MetaReducer<any>[] {
  const metaReducers: MetaReducer<any>[] = [];
  if (config.storageSyncType !== StorageSyncType.NO_STORAGE) {
    const storageSyncReducer = getStorageSyncReducer(config);
    metaReducers.push(storageSyncReducer);
  }

  return metaReducers;
}

@NgModule({
  imports: [
    RouterModule.forRoot([], { scrollPositionRestoration: 'enabled' }),
    StoreModule.forRoot(reducerToken),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    ConfigModule.withConfig(defaultRoutingModuleConfig)
  ],
  providers: [
    reducerProvider,
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    },
    {
      provide: META_REDUCERS,
      deps: [Config],
      useFactory: getMetaReducers
    },
    { provide: RoutingModuleConfig, useExisting: Config }
  ]
})
export class RoutingModule {}
