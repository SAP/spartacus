import { NgModule } from '@angular/core';

import { CheckoutLoginComponent } from './checkout-login.component';
import { ConfigModule, CmsConfig } from '@spartacus/core';

@NgModule({
  imports: [
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        GuestCheckoutLoginComponent: {
          selector: 'cx-checkout-login'
        }
      }
    })
  ],
  declarations: [CheckoutLoginComponent],
  exports: [CheckoutLoginComponent],
  entryComponents: [CheckoutLoginComponent]
})
export class CheckoutLoginModule {}
