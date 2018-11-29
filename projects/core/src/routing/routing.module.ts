import { NgModule } from '@angular/core';

import { ConfigModule, Config } from '../config';

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
import { effects } from './store/effects';
import {
  RoutingModuleConfig,
  StorageSyncType
} from './config/routing-module-config';

import { RouterModule } from '@angular/router';
import { RoutingService } from './facade/routing.service';

import { ROUTING_FEATURE } from './state';
import { defaultConfig } from './config/default-config';
import { ConfigurableRoutesModule } from './configurable-routes/configurable-routes.module';

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
    ConfigurableRoutesModule,
    RouterModule.forRoot([], { scrollPositionRestoration: 'enabled' }),
    StoreModule.forFeature(ROUTING_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
    StoreRouterConnectingModule.forRoot({
      stateKey: ROUTING_FEATURE // name of reducer key
    }),
    ConfigModule.withConfig(defaultConfig)
  ],
  providers: [
    RoutingService,
    reducerProvider,
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    },
    {
      provide: META_REDUCERS,
      deps: [RoutingModuleConfig],
      useFactory: getMetaReducers
    },
    { provide: RoutingModuleConfig, useExisting: Config }
  ]
})
export class RoutingModule {}
