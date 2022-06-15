import { NgModule } from '@angular/core';
import { PickupDeliveryOptionDialogModule } from './pickup-delivery-option-dialog/index';
import { PickupDeliveryOptionsModule } from './pickup-delivery-options/index';
import { StoreListModule } from './store-list/index';
import { StoreSearchModule } from './store-search/store-search.module';

@NgModule({
  imports: [
    PickupDeliveryOptionDialogModule,
    PickupDeliveryOptionsModule,
    StoreListModule,
    StoreSearchModule,
  ],
  exports: [
    PickupDeliveryOptionDialogModule,
    PickupDeliveryOptionsModule,
    StoreListModule,
    StoreSearchModule,
  ],
})
export class PickupInStoreComponentsModule {}
