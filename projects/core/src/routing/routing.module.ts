import { NgModule } from '@angular/core';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  reducerToken,
  CustomSerializer,
  reducerProvider
} from './store/reducers/router.reducer';
import { effects } from './store/effects/index';

import { RouterModule } from '@angular/router';
import { RoutingService } from './facade/routing.service';

import { ROUTING_FEATURE } from './state';
import { ConfigurableRoutesModule } from './configurable-routes/configurable-routes.module';

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
    })
  ],
  providers: [
    RoutingService,
    reducerProvider,
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    }
  ]
})
export class RoutingModule {}
