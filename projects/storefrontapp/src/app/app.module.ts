import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';

import { ConfigService } from './config.service';
import { AppRoutingModule } from './app-routing.module';

import {
  AuthModule,
  OccModule,
  UiModule,
  CmsLibModule,
  CmsModule,
  RoutingModule,
  UiFrameworkModule,
  SiteContextModule
} from 'storefrontlib';

// bootstrap
import { AppComponent } from './app.component';

import { UserModule } from 'storefrontlib';
import { CartModule } from 'storefrontlib';
import { CheckoutModule } from 'storefrontlib';
import { GlobalMessageModule } from 'storefrontlib';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    AuthModule.forRoot(ConfigService),
    RoutingModule.forRoot(ConfigService),
    OccModule.forRoot(ConfigService),
    SiteContextModule.forRoot(ConfigService),

    AppRoutingModule,

    CmsLibModule,
    CmsModule.forRoot(ConfigService),
    SiteContextModule.forRoot(ConfigService),
    CheckoutModule,
    RoutingModule.forRoot(ConfigService),
    RouterModule.forRoot(appRoutes),
    ProductModule,
    UserModule,
    CartModule,
    GlobalMessageModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
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
export class AppModule { }
