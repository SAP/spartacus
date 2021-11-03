import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartValidationWarningsComponent } from './cart-warnings/cart-validation-warnings.component';
import { CartItemValidationWarningComponent } from './cart-item-warning/cart-item-validation-warning.component';
import { I18nModule, UrlModule, CmsConfig, provideConfig } from '@spartacus/core';
import { IconModule } from '../../misc';
import { CartValidationGuard } from './guards';


@NgModule({
  imports: [
    CommonModule, RouterModule, I18nModule, UrlModule, IconModule
  ],
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutCostCenterComponent: {
          guards: [CartValidationGuard],
        },
        CheckoutPaymentType: {
          guards: [CartValidationGuard],
        },
        CheckoutShippingAddress: {
          guards: [CartValidationGuard],
        }
      },
    })
  ],
  declarations: [CartValidationWarningsComponent, CartItemValidationWarningComponent],
  exports: [CartValidationWarningsComponent, CartItemValidationWarningComponent]
})
export class CartValidationModule {}
