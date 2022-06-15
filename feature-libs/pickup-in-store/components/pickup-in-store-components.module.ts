import { NgModule } from '@angular/core';
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
    PickupDeliveryOptionDialogModule,
    PickupDeliveryOptionsModule,
    StoreListModule,
    StoreSearchModule,
  ],
  providers: [provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig)],
})
export class PickupInStoreComponentsModule {}
