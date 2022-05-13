import { NgModule } from '@angular/core';
import { PickupInStoreComponentModule } from './components/pickup-in-store-components.module';
import { PickupInStoreCoreModule } from './core/pickup-in-store-core.module';

@NgModule({
  imports: [PickupInStoreCoreModule, PickupInStoreComponentModule],
})
export class PickupInStoreModule {}
