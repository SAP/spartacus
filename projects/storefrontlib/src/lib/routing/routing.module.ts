import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';

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
import { ConfigService, StorageSyncType } from './config.service';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

export function overrideOccModuleConfig(configOverride: any) {
  return { ...new ConfigService(), ...configOverride };
}

export const ROUTING_MODULE_CONFIG_OVERRIDE: InjectionToken<
  string
> = new InjectionToken<string>('OCC_MODULE_CONFIG_OVERRIDE');

export function getMetaReducers(config: ConfigService): MetaReducer<any>[] {
  const metaReducers: MetaReducer<any>[] = [];
  if (config.storageSyncType !== StorageSyncType.NO_STORAGE) {
    const storageSyncReducer = getStorageSyncReducer(config);
    metaReducers.push(storageSyncReducer);
  }

  metaReducers.push(storeFreeze); // Should not be used in production (SPA-488)

  return metaReducers;
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducerToken),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument() // Should not be used in production (SPA-488)
  ],
  providers: [
    reducerProvider,
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    },
    ConfigService,
    {
      provide: META_REDUCERS,
      deps: [ConfigService],
      useFactory: getMetaReducers
    }
  ]
})
export class RoutingModule {
  static forRoot(configOverride?: any): ModuleWithProviders {
    return {
      ngModule: RoutingModule,
      providers: [
        {
          provide: ROUTING_MODULE_CONFIG_OVERRIDE,
          useValue: configOverride
        },
        {
          provide: ConfigService,
          useFactory: overrideOccModuleConfig,
          deps: [ROUTING_MODULE_CONFIG_OVERRIDE]
        }
      ]
    };
  }
}
