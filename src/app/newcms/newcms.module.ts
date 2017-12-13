import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { reducers, effects } from "./store";

// components
import * as fromComponents from "./components";

// guards
import * as fromGuards from "./guards";

// services
import * as fromServices from "./services";
import { ConfigService } from "./config.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature("cms", reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services, ...fromGuards.guards, ConfigService],
  declarations: [...fromComponents.components],
  exports: [...fromComponents.components]
})
export class NewCmsModule {
  static forRoot(config: any): any {
    return {
      ngModule: NewCmsModule,
      providers: [
        {
          provide: ConfigService,
          useExisting: config
        }
      ]
    };
  }
}
