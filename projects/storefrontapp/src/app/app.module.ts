import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { config } from './config';

import { MainComponent, StorefrontLibModule } from 'storefrontlib';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, StorefrontLibModule],
  bootstrap: [MainComponent],
  providers: [{ provide: 'APP_CONFIG', useValue: config }]
})
export class AppModule {}
