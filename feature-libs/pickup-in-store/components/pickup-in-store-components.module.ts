import { NgModule } from '@angular/core';
import { PickupDeliveryOptionDialogModule } from './pickup-delivery-option-dialog';
import { PickupDeliveryOptionsModule } from './pickup-delivery-options';
import { StoreListModule } from './store-list';
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
  providers: [],
})
export class PickupInStoreComponentsModule {}
