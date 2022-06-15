import { NgModule } from '@angular/core';
import { PickupInStoreCoreModule } from '@spartacus/pickup-in-store/core';
import { PickupInStoreComponentsModule } from './components';

@NgModule({
  imports: [PickupInStoreCoreModule, PickupInStoreComponentsModule],
})
export class PickupInStoreModule {}
