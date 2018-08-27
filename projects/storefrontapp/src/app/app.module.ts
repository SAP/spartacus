import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';

import { ConfigService } from './config.service';
import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    AuthModule.forRoot(ConfigService),
    RoutingModule.forRoot(ConfigService),
    OccModule.forRoot(ConfigService),
    SiteContextModule.forRoot(ConfigService),

    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    CmsLibModule,
    CmsModule.forRoot(ConfigService),
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
export class AppModule { }
