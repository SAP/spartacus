import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';

import { ConfigService } from './config.service';
import { AppRoutingModule } from './app-routing.module';

import {
  OccModule,
  UiModule,
  CmsLibModule,
  UiFrameworkModule } from 'storefrontlib';

import {
  CmsModule,
  RoutingModule,
  UserModule } from 'storefrontlib';

// bootstrap
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    RoutingModule.forRoot(ConfigService),
    OccModule.forRoot(ConfigService),

    AppRoutingModule,

    UserModule,
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
export class AppModule {}
