import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  IconModule,
  OutletPosition,
  ProductListOutlets,
  provideOutlet,
} from '@spartacus/storefront';
import { ConfigureProductComponent } from './configure-product.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ConfigureProductComponent: {
          component: ConfigureProductComponent,
        },
      },
    }),
    UrlModule,
    I18nModule,
    IconModule,
  ],
  providers: [
    provideOutlet({
      id: ProductListOutlets.ITEM_ACTIONS,
      position: OutletPosition.AFTER,
      component: ConfigureProductComponent,
    }),
  ],
  declarations: [ConfigureProductComponent],
  exports: [ConfigureProductComponent],
})
export class ConfigureProductModule {}
