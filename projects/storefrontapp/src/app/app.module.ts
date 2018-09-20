import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

<<<<<<< HEAD
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
=======
import { MainComponent, StorefrontModule } from 'storefrontlib';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
>>>>>>> develop

@NgModule({
  imports: [
    BrowserModule,
<<<<<<< HEAD
    AuthModule.forRoot(config),
    RoutingModule.forRoot(config),
    OccModule.forRoot(config),
    SiteContextModule.forRoot(config),

    AppRoutingModule,

    CmsLibModule,
    CmsModule.forRoot(config),
    UiModule,
    UiFrameworkModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
=======
    RouterModule.forRoot([]),
    StorefrontModule.withConfig({
      server: {
        baseUrl: environment.occBaseUrl,
        occPrefix: '/rest/v2/'
      }
>>>>>>> develop
    })
  ],
  bootstrap: [MainComponent]
})
export class AppModule {}
