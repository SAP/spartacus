import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  UrlModule,
  CheckoutModule,
  I18nModule,
  ConfigModule,
  CmsConfig,
} from '@spartacus/core';
import { PlaceOrderComponent } from './place-order.component';

@NgModule({
  imports: [
    CommonModule,
    CheckoutModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPlaceOrder: {
          selector: 'cx-place-order',
        },
      },
    }),
  ],
  declarations: [PlaceOrderComponent],
  exports: [PlaceOrderComponent],
})
export class PlaceOrderModule {}
