import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

    CmsLibModule,
    CmsModule.forRoot(config),
    UiModule,
    UiFrameworkModule
  ],
  bootstrap: [MainComponent]
})
export class AppModule {}
