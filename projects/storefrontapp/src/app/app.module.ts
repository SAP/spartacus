import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';

import { ConfigService } from './config.service';

import {
  OccModule,
  UiModule,
  CmsLibModule,
  UiFrameworkModule } from 'storefrontlib';

import {
  CmsModule,
  RoutingModule,
  SiteContextModule,
  ProductModule } from 'storefrontlib';

import { appRoutes } from './app.routes';

// bootstrap
import { AppComponent } from './app.component';

import {
  UserModule,
  CartModule,
  CheckoutModule,
  GlobalMessageModule,
  StoreFinderModule } from 'storefrontlib';

@NgModule({
  imports: [
    BrowserModule,
    OccModule.forRoot(ConfigService),
    CmsLibModule,
    UiModule,
    UiFrameworkModule,

    CmsModule.forRoot(ConfigService),
    SiteContextModule.forRoot(ConfigService),
    CheckoutModule,
    RoutingModule.forRoot(ConfigService),
    RouterModule.forRoot(appRoutes),
    ProductModule,
    UserModule,
    CartModule,
    GlobalMessageModule,
    CartModule,
    StoreFinderModule
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
