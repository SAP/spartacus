import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import {
  CartPickupOptionsContainerModule,
  defaultPickupOptionsDialogLayoutConfig,
  PdpPickupOptionsContainerModule,
  PickupDeliveryInfoContainerModule,
} from './container/index';
@NgModule({
  imports: [
    ReactiveFormsModule,
    CartPickupOptionsContainerModule,
    PdpPickupOptionsContainerModule,
    PickupDeliveryInfoContainerModule,
  ],
  providers: [provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig)],
})
export class PickupInStoreComponentsModule {}
