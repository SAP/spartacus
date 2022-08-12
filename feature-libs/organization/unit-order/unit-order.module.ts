import { NgModule } from '@angular/core';
import { UnitOrderComponentsModule } from './components/unit-order-components.module';
import { UnitOrderCoreModule } from './core/unit-order-core.module';
import { UnitOrderOccModule } from './occ';

@NgModule({
  imports: [
    UnitOrderCoreModule.forRoot(),
    UnitOrderOccModule,
    UnitOrderComponentsModule,
  ],
})
export class OrderHistoryModule {}
