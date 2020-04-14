import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { CartNotEmptyGuard } from '../../../cart/cart-not-empty.guard';
import { CheckoutAuthGuard } from '../../guards/checkout-auth.guard';
import { PlaceOrderComponent } from './place-order.component';
import { FormErrorsModule } from '../../../../shared/index';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPlaceOrder: {
          component: PlaceOrderComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [PlaceOrderComponent],
  entryComponents: [PlaceOrderComponent],
  exports: [PlaceOrderComponent],
})
export class PlaceOrderModule {}
