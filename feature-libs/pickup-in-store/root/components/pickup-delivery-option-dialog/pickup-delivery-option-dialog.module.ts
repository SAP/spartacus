import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { PickupDeliveryOptionDialogComponent } from './pickup-delivery-option-dialog.component';
@NgModule({
  imports: [I18nModule, IconModule],
  entryComponents: [PickupDeliveryOptionDialogComponent],
  declarations: [PickupDeliveryOptionDialogComponent],
  exports: [PickupDeliveryOptionDialogComponent],
})
export class PickupDeliveryOptionsDialogModule {}
