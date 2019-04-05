import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DeliveryModeComponent } from './delivery-mode.component';
import { ConfigModule, CmsConfig } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MultistepCheckoutDeliveryMode: {
          selector: 'cx-delivery-mode',
        },
      },
    }),
  ],
  declarations: [DeliveryModeComponent],
  entryComponents: [DeliveryModeComponent],
  exports: [DeliveryModeComponent],
})
export class DeliveryModeModule {}
