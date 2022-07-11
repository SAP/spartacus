import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';

import {
  defaultPickupOptionsDialogLayoutConfig,
  PickupDeliveryOptionDialogModule,
} from './pickup-delivery-option-dialog/index';
import { PickupDeliveryOptionsModule } from './pickup-delivery-options/index';
import { StoreListModule } from './store-list/index';
import { StoreSearchModule } from './store-search/store-search.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    PickupDeliveryOptionDialogModule,
    PickupDeliveryOptionsModule,
    StoreListModule,
    StoreSearchModule,
  ],
  providers: [provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig)],
})
export class PickupInStoreComponentsModule {}
