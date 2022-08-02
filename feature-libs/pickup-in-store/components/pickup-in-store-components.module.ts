import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideDefaultConfig } from '@spartacus/core';
import {
  CartPickupOptionsContainerModule,
  defaultPickupOptionsDialogLayoutConfig,
  PdpPickupOptionsContainerModule,
} from './container/index';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CartPickupOptionsContainerModule,
    PdpPickupOptionsContainerModule,
  ],
  providers: [provideDefaultConfig(defaultPickupOptionsDialogLayoutConfig)],
})
export class PickupInStoreComponentsModule {}
