import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { config } from './config';

import { MainComponent, StorefrontModule } from 'storefrontlib';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot([]), StorefrontModule],
  bootstrap: [MainComponent],
  providers: [{ provide: 'APP_CONFIG', useValue: config }]
})
export class AppModule {}
