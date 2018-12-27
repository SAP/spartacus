import { NgModule } from '@angular/core';

import { ConfigModule, Config } from '../config/index';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule, MetaReducer, META_REDUCERS, Action } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { getStorageSyncReducer } from './store/reducers';
import {
  reducerToken,
  CustomSerializer,
  reducerProvider
} from './store/reducers/router.reducer';
import { effects } from './store/effects/index';
import {
  RoutingModuleConfig,
  StorageSyncType
} from './config/routing-module-config';

import { RouterModule } from '@angular/router';
import { RoutingService } from './facade/routing.service';

import { ROUTING_FEATURE } from './state';
import { defaultConfig } from './config/default-config';
import { ConfigurableRoutesModule } from './configurable-routes/configurable-routes.module';
import { WindowRef } from '../window/window-ref';

export function getMetaReducers(
  config: RoutingModuleConfig,
  winRef: WindowRef
): MetaReducer<any, Action>[] {
  const metaReducers: MetaReducer<any, Action>[] = [];
  if (winRef.nativeWindow && config.storageSyncType !== StorageSyncType.NO_STORAGE) {
    const storageSyncReducer = getStorageSyncReducer(config, winRef);
    metaReducers.push(storageSyncReducer);
  }

  return metaReducers;
}

@NgModule({
  imports: [
    ConfigurableRoutesModule,
    RouterModule.forRoot([], {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }),
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
      deps: [RoutingModuleConfig, WindowRef],
      useFactory: getMetaReducers
    },
    { provide: RoutingModuleConfig, useExisting: Config }
  ]
})
export class RoutingModule {}
