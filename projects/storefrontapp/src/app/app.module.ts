import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MainComponent, StorefrontModule } from 'storefrontlib';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    StorefrontModule.withConfig({
      server: {
        baseUrl: 'https://localhost:9002',
        occPrefix: '/rest/v2/'
      }
    })
  ],
  bootstrap: [MainComponent]
})
export class AppModule {}
