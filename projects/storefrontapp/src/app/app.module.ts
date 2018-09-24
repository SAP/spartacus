import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { config } from './config';

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
  SiteContextModule,
  MainComponent
} from 'storefrontlib';

@NgModule({
  imports: [
    BrowserModule,
    AuthModule.forRoot(config),
    RoutingModule.forRoot(config),
    OccModule.forRoot(config),
    SiteContextModule.forRoot(config),

    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    CmsLibModule,
    CmsModule.forRoot(config),
    UiModule,
    UiFrameworkModule
  ],
  bootstrap: [MainComponent]
})
export class AppModule {}
