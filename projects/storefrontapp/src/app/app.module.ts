import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';

import { ConfigService } from './config.service';

import { ClientAuthenticationModule } from 'storefrontlib';
import { OccModule } from 'storefrontlib';
import { UiModule } from 'storefrontlib';
import { CmsLibModule } from 'storefrontlib';
import { UiFrameworkModule } from 'storefrontlib';

import { CmsModule } from 'storefrontlib';
import { RoutingModule } from 'storefrontlib';
import { SiteContextModule } from 'storefrontlib';
import { ProductModule } from 'storefrontlib';

import { appRoutes } from './app.routes';

// bootstrap
import { AppComponent } from './app.component';
import { UserModule } from 'storefrontlib';
import { CartModule } from 'storefrontlib';
import { CheckoutModule } from 'storefrontlib';

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
    ClientAuthenticationModule,
    RoutingModule.forRoot(ConfigService),
    RouterModule.forRoot(appRoutes),
    ProductModule,
    UserModule,
    CartModule
  ],

  providers: [
    ConfigService,
    {
      // TODO: configure locale
      provide: LOCALE_ID,
      useValue: 'nl-NL'
    }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
