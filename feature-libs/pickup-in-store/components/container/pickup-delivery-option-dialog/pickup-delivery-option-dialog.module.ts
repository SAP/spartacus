import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, SpinnerModule } from '@spartacus/storefront';
import { StoreListModule } from '../store-list/index';
import { StoreSearchModule } from '../store-search/index';
import { PickupDeliveryOptionDialogComponent } from './pickup-delivery-option-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    StoreListModule,
    StoreSearchModule,
    SpinnerModule,
  ],
  entryComponents: [PickupDeliveryOptionDialogComponent],
  declarations: [PickupDeliveryOptionDialogComponent],
  exports: [PickupDeliveryOptionDialogComponent],
})
export class PickupDeliveryOptionDialogModule {}
