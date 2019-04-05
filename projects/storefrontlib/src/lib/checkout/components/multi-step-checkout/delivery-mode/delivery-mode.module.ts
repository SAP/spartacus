import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfigModule, CmsConfig } from '@spartacus/core';
import { DeliveryModeComponent } from './delivery-mode.component';
import { ShippingAddressSetGuard } from '../../../guards/shipping-address-set.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MultistepCheckoutDeliveryMode: {
          selector: 'cx-delivery-mode',
          guards: [ShippingAddressSetGuard]
        },
      },
    }),
  ],
  providers: [ShippingAddressSetGuard],
  declarations: [DeliveryModeComponent],
  entryComponents: [DeliveryModeComponent],
  exports: [DeliveryModeComponent],
})
export class DeliveryModeModule {}
