import { NgModule } from "@angular/core";

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from "@ngrx/router-store";
import { StoreModule, MetaReducer } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducers, effects, CustomSerializer } from "./store";

// Angular CLI environment
import { environment } from "../../environments/environment";

// not used in production
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { storeFreeze } from "ngrx-store-freeze";

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }]
})
export class RoutingModule {}
