import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { appRoutes } from "./routes";

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from "@ngrx/router-store";
import { StoreModule, MetaReducer } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducers, effects, CustomSerializer } from "./store";
import { GetPageContextService } from "./services/get-page-context.service";

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    GetPageContextService
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
