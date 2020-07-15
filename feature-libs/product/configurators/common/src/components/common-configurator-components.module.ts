import { NgModule } from '@angular/core';
import { ConfigAttributeModule } from './config-attribute/config-attribute.module';
import { ConfigFormModule } from './config-form/config-form.module';
import { ConfigPriceSummaryModule } from './config-price-summary/config-price-summary.module';
import { ConfigProductTitleModule } from './config-product-title/config-product-title.module';
import { ConfigTabBarModule } from './config-tab-bar/config-tab-bar.module';

@NgModule({
  imports: [
    ConfigPriceSummaryModule,
    ConfigProductTitleModule,
    ConfigTabBarModule,
    ConfigAttributeModule,
    ConfigFormModule,
  ],
})
export class CommonConfiguratorComponentsModule {}
