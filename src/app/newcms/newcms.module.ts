import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
//import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducers, effects } from "./store";

// components
import * as fromComponents from "./components";

// containers
//import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';

// services
import * as fromServices from "./services";

import { ConfigService } from "./config.service";

// routes
/*export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.PizzasGuard],
    component: fromContainers.ProductsComponent,
  },
  {
    path: 'new',
    canActivate: [fromGuards.PizzasGuard, fromGuards.ToppingsGuard],
    component: fromContainers.ProductItemComponent,
  },
  {
    path: ':pizzaId',
    canActivate: [fromGuards.PizzaExistsGuards, fromGuards.ToppingsGuard],
    component: fromContainers.ProductItemComponent,
  },
];*/

@NgModule({
  imports: [
    CommonModule,
    //ReactiveFormsModule,
    HttpClientModule,
    //RouterModule.forChild(ROUTES),
    StoreModule.forFeature('cms', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [...fromServices.services, ...fromGuards.guards, ConfigService],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components]
})
export class NewCmsModule {}
