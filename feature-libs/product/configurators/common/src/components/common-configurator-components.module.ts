import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfigPriceSummaryComponent } from './config-price-summary/config-price-summary.component';
import { ConfigProductTitleComponent } from './config-product-title/config-product-title.component';
import { ConfigTabBarComponent } from './config-tab-bar/config-tab-bar.component';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    I18nModule,
    UrlModule,
    IconModule,
  ],
  declarations: [
    ConfigProductTitleComponent,
    ConfigTabBarComponent,
    ConfigPriceSummaryComponent,
  ],
  exports: [
    ConfigProductTitleComponent,
    ConfigTabBarComponent,
    ConfigPriceSummaryComponent,
  ],
  entryComponents: [
    ConfigProductTitleComponent,
    ConfigTabBarComponent,
    ConfigPriceSummaryComponent,
  ],
})
export class CommonConfiguratorComponentsModule {}
