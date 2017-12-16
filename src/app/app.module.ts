import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID } from "@angular/core";

import { ConfigService } from "./config.service";
// import { RouterModule } from './router/router.module';

import { DataModule } from "./data/data.module";
import { OccModule } from "./occ/occ.module";
import { UiModule } from "./ui/ui.module";
//import { CmsModule } from "./cms/cms.module";
import { CmsLibModule } from "./cms-lib/cms-lib.module";
import { UiFrameworkModule } from "./ui/ui-framework/ui-framework.module";

import { NewCmsModule } from "./newcms/newcms.module";
import { RoutingModule } from "./routing/routing.module";

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from "@ngrx/router-store";
import { StoreModule, MetaReducer } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

// not used in production
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { storeFreeze } from "ngrx-store-freeze";

// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false
};

// bootstrap
import { AppComponent } from "./app.component";

@NgModule({
  imports: [
    BrowserModule,
    environment.development ? StoreDevtoolsModule.instrument() : [],
    // RouterModule,
    OccModule.forRoot(ConfigService),
    DataModule.forRoot(ConfigService),
    //CmsModule.forRoot(ConfigService),
    CmsLibModule,
    UiModule,
    UiFrameworkModule,
    NewCmsModule.forRoot(ConfigService),
    RoutingModule
  ],

  providers: [
    ConfigService,
    {
      // TODO: configure locale
      provide: LOCALE_ID,
      useValue: "nl-NL"
    }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
