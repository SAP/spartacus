import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterState,
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { Config } from '../config/config.module';
import { RoutingConfig } from './configurable-routes/config/routing-config';
import { ConfigurableRoutesService } from './configurable-routes/configurable-routes.service';
import { RoutingEventModule } from './event/routing-event.module';
import { effects } from './store/effects/index';
import {
  CustomSerializer,
  reducerProvider,
  reducerToken,
} from './store/reducers/router.reducer';
import { ROUTING_FEATURE } from './store/routing-state';

export function initConfigurableRoutes(
  service: ConfigurableRoutesService
): () => void {
  const result = () => service.init(); // workaround for AOT compilation (see https://stackoverflow.com/a/51977115)
  return result;
}

@NgModule({
  imports: [
    StoreModule.forFeature(ROUTING_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
      stateKey: ROUTING_FEATURE, // name of reducer key
    }),
    RoutingEventModule,
  ],
})
export class RoutingModule {
  static forRoot(): ModuleWithProviders<RoutingModule> {
    return {
      ngModule: RoutingModule,
      providers: [
        reducerProvider,
        {
          provide: RouterStateSerializer,
          useClass: CustomSerializer,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initConfigurableRoutes,
          deps: [ConfigurableRoutesService],
          multi: true,
        },
        { provide: RoutingConfig, useExisting: Config },
      ],
    };
  }
}
