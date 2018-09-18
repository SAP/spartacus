import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MainComponent, StorefrontModule } from 'storefrontlib';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    StorefrontModule.withConfig({
      server: {
        baseUrl: environment.occBaseUrl,
      }
    })
  ],
  bootstrap: [MainComponent]
})
export class AppModule {}
