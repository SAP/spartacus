import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { StoreListModule } from '../store-list';
import { StoreSearchModule } from '../store-search/store-search.module';
import { PickupDeliveryOptionDialogComponent } from './pickup-delivery-option-dialog.component';

@NgModule({
  imports: [I18nModule, IconModule, StoreListModule, StoreSearchModule],
  entryComponents: [PickupDeliveryOptionDialogComponent],
  declarations: [PickupDeliveryOptionDialogComponent],
  exports: [PickupDeliveryOptionDialogComponent],
})
export class PickupDeliveryOptionsDialogModule {}
