import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';

import { ConfigService } from './config.service';

import { appRoutes } from './app.routes';

// bootstrap
import { AppComponent } from './app.component';
import {CheckoutModule} from '../../../storefrontlib/src/lib/checkout/checkout.module';
import {CartModule} from '../../../storefrontlib/src/lib/cart/cart.module';
import {GlobalMessageModule} from '../../../storefrontlib/src/lib/global-message/global-message.module';
import {OccModule} from '../../../storefrontlib/src/lib/occ/occ.module';
import {CmsLibModule} from '../../../storefrontlib/src/lib/cms-lib/cms-lib.module';
import {UiModule} from '../../../storefrontlib/src/lib/ui/ui.module';
import {UiFrameworkModule} from '../../../storefrontlib/src/lib/ui/ui-framework/ui-framework.module';
import {CmsModule} from '../../../storefrontlib/src/lib/cms/cms.module';
import {SiteContextModule} from '../../../storefrontlib/src/lib/site-context/site-context.module';
import {UserModule} from '../../../storefrontlib/src/lib/user/user.module';
import {ProductModule} from '../../../storefrontlib/src/lib/product/product.module';
import {RoutingModule} from '../../../storefrontlib/src/lib/routing/routing.module';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    OccModule.forRoot(ConfigService),
    CmsLibModule,
    UiModule,
    UiFrameworkModule,

    CmsModule.forRoot(ConfigService),
    SiteContextModule.forRoot(ConfigService),
    CheckoutModule,
    RoutingModule.forRoot(ConfigService),
    RouterModule.forRoot(appRoutes),
    ProductModule,
    UserModule,
    CartModule,
    GlobalMessageModule
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
