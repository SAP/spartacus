import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';

import { ConfigService } from './config.service';

import { OccModule } from 'storefrontlib';
import { UiModule } from 'storefrontlib';
import { CmsLibModule } from 'storefrontlib';
import { UiFrameworkModule } from 'storefrontlib';

import { CmsModule } from 'storefrontlib';
import { RoutingModule } from 'storefrontlib';
import { SiteContextModule } from 'storefrontlib';
import { ProductModule } from 'storefrontlib';
import { ServicesModule } from 'storefrontlib';

import { appRoutes } from './app.routes';

// bootstrap
import { AppComponent } from './app.component';

import { UserModule } from 'storefrontlib';
import { CartModule } from 'storefrontlib';
import { CheckoutModule } from 'storefrontlib';
import { StoreFinderModule } from 'storefrontlib';

@NgModule({
  imports: [
    BrowserModule,
    OccModule.forRoot(ConfigService),
    CmsLibModule,
    UiModule,
    UiFrameworkModule,
    ServicesModule,

    CmsModule.forRoot(ConfigService),
    SiteContextModule.forRoot(ConfigService),
    CheckoutModule,
    RoutingModule.forRoot(ConfigService),
    RouterModule.forRoot(appRoutes),
    ProductModule,
    UserModule,
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
