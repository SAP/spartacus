import { NgModule } from '@angular/core';
import { PickupInStoreComponentsModule } from './components/pickup-in-store-components.module';
import { PickupInStoreCoreModule } from './core/pickup-in-store-core.module';

@NgModule({
  imports: [PickupInStoreCoreModule, PickupInStoreComponentsModule],
})
export class PickupInStoreModule {}
