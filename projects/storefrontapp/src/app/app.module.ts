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
<<<<<<< HEAD
        baseUrl: 'https://10.27.165.187:9002'
=======
        baseUrl: environment.occBaseUrl,
        occPrefix: '/rest/v2/'
>>>>>>> feature/SPA-1104
      }
    })
  ],
  bootstrap: [MainComponent]
})
export class AppModule {}
