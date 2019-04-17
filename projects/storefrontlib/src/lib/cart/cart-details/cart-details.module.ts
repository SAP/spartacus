import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  UrlTranslationModule,
  ConfigModule,
  CmsConfig,
  I18nModule,
} from '@spartacus/core';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { CartDetailsComponent } from './cart-details.component';
import { PromotionsModule } from '../../checkout/components/promotions/promotions.module';

@NgModule({
  imports: [
    CartSharedModule,
    CommonModule,
    RouterModule,
    UrlTranslationModule,
    PromotionsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CartComponent: {
          selector: 'cx-cart-details',
        },
      },
    }),
    I18nModule,
  ],
  declarations: [CartDetailsComponent],
  exports: [CartDetailsComponent],
  entryComponents: [CartDetailsComponent],
})
export class CartDetailsModule {}
