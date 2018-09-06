import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';

import { ConfigService } from './config.service';
import { AppRoutingModule } from './app-routing.module';
import { config } from './config';

import {
  AuthModule,
  OccModule,
  UiModule,
  CmsLibModule,
  CmsModule,
  RoutingModule,
  UiFrameworkModule,
  SiteContextModule
} from 'storefrontlib';

// bootstrap
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AuthModule.forRoot(config),
    RoutingModule.forRoot(config),
    OccModule.forRoot(config),
    SiteContextModule.forRoot(config),

    AppRoutingModule,

    CmsLibModule,
    CmsModule.forRoot(config),
    UiModule,
    UiFrameworkModule
  ],

  providers: [
    ConfigService,
    {
      // TODO: configure locale
      provide: LOCALE_ID,
      useValue: 'en-US'
    }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
