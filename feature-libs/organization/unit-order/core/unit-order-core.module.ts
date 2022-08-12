import { ModuleWithProviders, NgModule } from '@angular/core';
import { UnitOrderConnector } from './connectors';
import { UnitOrderStoreModule } from './store/unit-order-store.module';

@NgModule({
  imports: [UnitOrderStoreModule],
})
export class UnitOrderCoreModule {
  static forRoot(): ModuleWithProviders<UnitOrderCoreModule> {
    return {
      ngModule: UnitOrderCoreModule,
      providers: [UnitOrderConnector],
    };
  }
}
