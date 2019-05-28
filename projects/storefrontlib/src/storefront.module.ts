import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  AuthModule,
  ConfigModule,
  CxApiModule,
  I18nModule,
  OccModule,
  PersonalizationModule,
  provideConfig,
  SmartEditModule,
  StateModule,
} from '@spartacus/core';
import { CartPageModule } from './cms-components/cart/cart-page/cart-page.module';
import { CmsLibModule, ProductPageModule } from './cms-components/index';
import { CmsModule } from './cms-structure/cms.module';
import { RoutingModule } from './cms-structure/routing/routing.module';
import { provideConfigFromMetaTags } from './config/provide-config-from-meta-tags';
import { StorefrontModuleConfig } from './config/storefront-config';
import { LayoutModule } from './layout/layout.module';
import { OrderConfirmationPageModule } from './lib/ui/pages/order-confirmation-page/order-confirmation-page.module';

@NgModule({
  imports: [
    OccModule,
    StateModule,
    AuthModule.forRoot(),
    CmsLibModule,
    CmsModule,
    CxApiModule,
    ConfigModule.forRoot(),
    RoutingModule,
    SmartEditModule.forRoot(),
    PersonalizationModule.forRoot(),
    I18nModule.forRoot(),

    LayoutModule,
    // partial usage:
    ProductPageModule,
    // as longs as we do not have #2661 in place we need a specific cart page module
    CartPageModule,
    // temp add here till it gets removed by #2691
    OrderConfirmationPageModule,
  ],
  providers: [...provideConfigFromMetaTags()],
  declarations: [],
})
export class StorefrontModule {
  static withConfig(config?: StorefrontModuleConfig): ModuleWithProviders {
    return {
      ngModule: StorefrontModule,
      providers: [provideConfig(config), ...provideConfigFromMetaTags()],
    };
  }
}
