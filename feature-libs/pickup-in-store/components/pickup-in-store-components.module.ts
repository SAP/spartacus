import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import {
  defaultPickupOptionsDialogLayoutConfig,
  PickupDeliveryOptionDialogModule,
  StoreListModule,
  StoreSearchModule,
} from './container/index';
import { PickupOptionsModule } from './presentational/index';

@NgModule({
  imports: [
    ReactiveFormsModule,
    PickupDeliveryOptionDialogModule,
    PickupOptionsModule,
    StoreListModule,
    StoreSearchModule,
  ],
  providers: [provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig)],
})
export class PickupInStoreComponentsModule {}
