import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';

import { ConfigService } from './config.service';

import { DataModule } from './data/data.module';
import { OccModule } from './occ/occ.module';
import { UiModule } from './ui/ui.module';
// import { CmsModule } from "./cms/cms.module";
import { CmsLibModule } from './cms-lib/cms-lib.module';
import { UiFrameworkModule } from './ui/ui-framework/ui-framework.module';

import { NewCmsModule } from './newcms/newcms.module';
import { RoutingModule } from './routing/routing.module';
import { SiteContextModule } from './site-context/site-context.module';

import { appRoutes } from './app.routes';

// bootstrap
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    OccModule.forRoot(ConfigService),
    DataModule.forRoot(ConfigService),
    // CmsModule.forRoot(ConfigService),
    CmsLibModule,
    UiModule,
    UiFrameworkModule,

    NewCmsModule.forRoot(ConfigService),
    SiteContextModule.forRoot(ConfigService),
    RoutingModule,
    RouterModule.forRoot(appRoutes)
  ],

  providers: [
    ConfigService,
    {
      // TODO: configure locale
      provide: LOCALE_ID,
      useValue: 'nl-NL'
    }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
