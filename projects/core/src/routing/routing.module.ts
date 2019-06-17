import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterState,
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { ConfigurableRoutesModule } from './configurable-routes/configurable-routes.module';
import { RoutingService } from './facade/routing.service';
import { effects } from './store/effects/index';
import {
  CustomSerializer,
  reducerProvider,
  reducerToken,
} from './store/reducers/router.reducer';
import { ROUTING_FEATURE } from './store/state';

@NgModule({
  imports: [
    ConfigurableRoutesModule,
    RouterModule.forRoot([], {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
    StoreModule.forFeature(ROUTING_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
      stateKey: ROUTING_FEATURE, // name of reducer key
    }),
  ],
  providers: [
    RoutingService,
    reducerProvider,
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer,
    },
  ],
})
export class RoutingModule {}
