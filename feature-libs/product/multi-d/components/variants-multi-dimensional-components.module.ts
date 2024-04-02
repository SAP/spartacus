import { NgModule } from '@angular/core';
import { OrderGridModule } from './order-grid/order-grid.module';
import { VariantsMultiDimensionalModule } from './variants-multi-dimensional/variants-multi-dimensional.module';

@NgModule({
  imports: [VariantsMultiDimensionalModule, OrderGridModule],
})
export class VariantsMultiDimensionalComponentsModule {}
